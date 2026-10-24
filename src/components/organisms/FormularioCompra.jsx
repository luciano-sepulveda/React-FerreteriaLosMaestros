import { useState } from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';
import { formatearPrecio } from '../../utils/formatearPrecio';
import { validarRequerido, validarEmail, validarRut } from '../../utils/validaciones';

const FormularioCompra = ({
  totalPagar = 0,
  tipoEntrega = 'retiro',
  datosIniciales,
  alConfirmarCompra,
  alCancelar
}) => {
  const [datos, setDatos] = useState({
    nombreCompleto: datosIniciales?.nombreCompleto || '',
    rut: datosIniciales?.rut || '',
    correo: datosIniciales?.correo || '',
    telefono: datosIniciales?.telefono || '',
    direccionEntrega: datosIniciales?.direccionEntrega || '',
    comuna: datosIniciales?.comuna || 'La Serena',
    tipoCliente: datosIniciales?.tipoCliente || (datosIniciales?.rol?.toLowerCase().includes('contratista') ? 'contratista' : 'particular'),
    medioPago: 'webpay',
    observaciones: ''
  });

  const [errores, setErrores] = useState({});
  const [procesando, setProcesando] = useState(false);

  const manejarCambio = (campo, valor) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
    if (errores[campo]) {
      setErrores((prev) => ({ ...prev, [campo]: '' }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    const errorNombre = validarRequerido(datos.nombreCompleto, 'Nombre completo');
    if (errorNombre) nuevosErrores.nombreCompleto = errorNombre;

    const errorRut = validarRut(datos.rut);
    if (errorRut) nuevosErrores.rut = errorRut;

    const errorEmail = validarEmail(datos.correo);
    if (errorEmail) nuevosErrores.correo = errorEmail;

    const errorTelefono = validarRequerido(datos.telefono, 'Teléfono');
    if (errorTelefono) nuevosErrores.telefono = errorTelefono;

    if (tipoEntrega === 'despacho') {
      const errorDireccion = validarRequerido(datos.direccionEntrega, 'Dirección de entrega');
      if (errorDireccion) nuevosErrores.direccionEntrega = errorDireccion;
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    if (!validarFormulario()) return;

    setProcesando(true);
    setTimeout(() => {
      setProcesando(false);
      if (alConfirmarCompra) {
        alConfirmarCompra({
          ...datos,
          tipoEntrega,
          totalPagar,
          fecha: new Date().toLocaleDateString('es-CL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        });
      }
    }, 400);
  };

  return (
    <Card className="border-0 shadow-sm rounded-4">
      <Card.Header className="bg-dark text-white py-3">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0 text-warning">Finalizar Compra / Facturación</h5>
          <Etiqueta variante="success" esPildora={true}>
            Total: {formatearPrecio(totalPagar)}
          </Etiqueta>
        </div>
      </Card.Header>

      <Card.Body className="p-4">
        <Form onSubmit={manejarEnvio}>
          <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">
            1. Datos del Comprador
          </h6>

          <Row>
            <Col md={6}>
              <CampoFormulario
                etiqueta="Nombre y Apellidos *"
                marcador="Ej: Juan Pérez Morales"
                valor={datos.nombreCompleto}
                alCambiar={(e) => manejarCambio('nombreCompleto', e.target.value)}
                error={errores.nombreCompleto}
              />
            </Col>

            <Col md={6}>
              <CampoFormulario
                etiqueta="RUT o Cédula de Identidad *"
                marcador="Ej: 12345678-9"
                valor={datos.rut}
                alCambiar={(e) => manejarCambio('rut', e.target.value)}
                error={errores.rut}
                ayuda="Para boleta o factura de venta"
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <CampoFormulario
                tipo="email"
                etiqueta="Correo Electrónico *"
                marcador="juan@ejemplo.cl"
                valor={datos.correo}
                alCambiar={(e) => manejarCambio('correo', e.target.value)}
                error={errores.correo}
              />
            </Col>

            <Col md={6}>
              <CampoFormulario
                tipo="tel"
                etiqueta="Teléfono de Contacto *"
                marcador="+56 9 1234 5678"
                valor={datos.telefono}
                alCambiar={(e) => manejarCambio('telefono', e.target.value)}
                error={errores.telefono}
              />
            </Col>
          </Row>

          <h6 className="fw-bold text-dark border-bottom pb-2 mb-3 mt-3">
            2. Tipo de Cliente y Entrega
          </h6>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold small">Perfil de Cliente</Form.Label>
                <Form.Select
                  value={datos.tipoCliente}
                  onChange={(e) => manejarCambio('tipoCliente', e.target.value)}
                  className="py-2"
                >
                  <option value="particular">Particular (Boleta)</option>
                  <option value="contratista">Contratista / Empresa (Factura)</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold small">Medio de Pago</Form.Label>
                <Form.Select
                  value={datos.medioPago}
                  onChange={(e) => manejarCambio('medioPago', e.target.value)}
                  className="py-2"
                >
                  <option value="webpay">💳 Webpay / Débito y Crédito (Instantáneo)</option>
                  <option value="transferencia">🏦 Transferencia Bancaria Electrónica</option>
                  {datos.tipoCliente === 'contratista' && (
                    <option value="cuentacorriente">🏗️ Cuenta Corriente Contratista (Crédito a 30 días)</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {tipoEntrega === 'despacho' && (
            <div className="p-3 bg-light rounded-3 border mb-3">
              <h6 className="fw-bold text-dark mb-2">Dirección de Despacho a Faena / Obra</h6>
              <Row>
                <Col md={8}>
                  <CampoFormulario
                    etiqueta="Dirección (Calle, Número, Obra) *"
                    marcador="Ej: Av. Francisco de Aguirre 450, Faena 2"
                    valor={datos.direccionEntrega}
                    alCambiar={(e) => manejarCambio('direccionEntrega', e.target.value)}
                    error={errores.direccionEntrega}
                  />
                </Col>
                <Col md={4}>
                  <CampoFormulario
                    etiqueta="Ciudad / Comuna"
                    valor={datos.comuna}
                    alCambiar={(e) => manejarCambio('comuna', e.target.value)}
                  />
                </Col>
              </Row>
            </div>
          )}

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold small">Indicaciones u Observaciones (opcional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Ej: Horario preferente para entrega, persona autorizada a recibir, etc."
              value={datos.observaciones}
              onChange={(e) => manejarCambio('observaciones', e.target.value)}
            />
          </Form.Group>

          <div className="d-flex flex-wrap gap-2 justify-content-end">
            <div className="ancho-minimo-180">
              <Boton
                texto="Volver al Carrito"
                variante="outline-secondary"
                alHacerClic={alCancelar}
                deshabilitado={procesando}
              />
            </div>
            <div className="ancho-minimo-220">
              <Boton
                tipo="submit"
                texto={procesando ? '⏳ Procesando Pedido...' : '✓ Confirmar y Finalizar Compra'}
                variante="warning"
                deshabilitado={procesando}
              />
            </div>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FormularioCompra;
