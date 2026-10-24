import { useState } from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import { validarRequerido, validarCorreo, validarRut } from '../../utils/validaciones';

const FormularioUsuario = ({
  usuarioAEditar = null,
  alGuardar,
  alCancelar
}) => {
  const [datos, setDatos] = useState({
    nombreCompleto: usuarioAEditar?.nombreCompleto || '',
    rut: usuarioAEditar?.rut || '',
    correo: usuarioAEditar?.correo || '',
    telefono: usuarioAEditar?.telefono || '',
    rol: usuarioAEditar?.rol || 'Particular',
    razonSocial: usuarioAEditar?.razonSocial || ''
  });

  const [errores, setErrores] = useState({});

  const manejarCambio = (campo, valor) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
    if (errores[campo]) {
      setErrores((prev) => ({ ...prev, [campo]: '' }));
    }
  };

  const validar = () => {
    const nuevosErrores = {};

    const errorNombre = validarRequerido(datos.nombreCompleto, 'Nombre completo');
    if (errorNombre) nuevosErrores.nombreCompleto = errorNombre;

    const errorRut = validarRut(datos.rut);
    if (errorRut) nuevosErrores.rut = errorRut;

    const errorCorreo = validarCorreo(datos.correo);
    if (errorCorreo) nuevosErrores.correo = errorCorreo;

    const errorTelefono = validarRequerido(datos.telefono, 'Teléfono');
    if (errorTelefono) nuevosErrores.telefono = errorTelefono;

    if (datos.rol.includes('Contratista') && !datos.razonSocial.trim()) {
      nuevosErrores.razonSocial = 'Razón Social es obligatoria para contratistas.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!validar()) return;
    alGuardar(datos);
  };

  return (
    <Card className="border-0 shadow-sm rounded-4 mb-4">
      <Card.Header className="bg-dark text-white py-3">
        <h5 className="fw-bold mb-0 text-warning">
          {usuarioAEditar ? 'Editar Usuario' : 'Nuevo Usuario'}
        </h5>
      </Card.Header>
      <Card.Body className="p-4">
        <Form onSubmit={manejarEnvio}>
          <Row>
            <Col md={6}>
              <CampoFormulario
                etiqueta="Nombre Completo *"
                marcador="Ej: Juan Pérez Morales"
                valor={datos.nombreCompleto}
                alCambiar={(e) => manejarCambio('nombreCompleto', e.target.value)}
                error={errores.nombreCompleto}
              />
            </Col>
            <Col md={6}>
              <CampoFormulario
                etiqueta="RUT *"
                marcador="Ej: 12.345.678-9"
                valor={datos.rut}
                alCambiar={(e) => manejarCambio('rut', e.target.value)}
                error={errores.rut}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <CampoFormulario
                tipo="email"
                etiqueta="Correo Electrónico *"
                marcador="Ej: contacto@empresa.cl"
                valor={datos.correo}
                alCambiar={(e) => manejarCambio('correo', e.target.value)}
                error={errores.correo}
              />
            </Col>
            <Col md={6}>
              <CampoFormulario
                tipo="tel"
                etiqueta="Teléfono *"
                marcador="Ej: +56 9 1234 5678"
                valor={datos.telefono}
                alCambiar={(e) => manejarCambio('telefono', e.target.value)}
                error={errores.telefono}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold small">Rol en el Sistema *</Form.Label>
                <Form.Select
                  value={datos.rol}
                  onChange={(e) => manejarCambio('rol', e.target.value)}
                  className="py-2"
                >
                  <option value="Administrador Bodega">Administrador Bodega</option>
                  <option value="Contratista (Crédito)">Contratista (Crédito)</option>
                  <option value="Contratista">Contratista</option>
                  <option value="Particular">Particular</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <CampoFormulario
                etiqueta="Razón Social"
                marcador="Ej: Constructora Elqui SpA"
                valor={datos.razonSocial}
                alCambiar={(e) => manejarCambio('razonSocial', e.target.value)}
                error={errores.razonSocial}
                ayuda="Obligatorio para empresas y contratistas"
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Boton
              variante="outline-secondary"
              tamano="sm"
              claseAdicional="w-auto px-4"
              alHacerClic={alCancelar}
              texto="Cancelar"
            />
            <Boton
              tipo="submit"
              variante="warning"
              tamano="sm"
              claseAdicional="w-auto px-4 fw-bold"
              texto="Guardar Usuario"
            />
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FormularioUsuario;
