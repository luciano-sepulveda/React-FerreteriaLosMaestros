import { useState } from 'react';
import { Form, Alert, Row, Col } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import { validarCorreo, validarRequerido } from '../../utils/validaciones';

const FormularioContacto = () => {
  const [datos, setDatos] = useState({
    nombreCompleto: '',
    correo: '',
    telefono: '',
    asunto: 'cotizacion',
    mensaje: ''
  });

  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [esperandoRespuesta, setEsperandoRespuesta] = useState(false);

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

    const errorCorreo = validarCorreo(datos.correo);
    if (errorCorreo) nuevosErrores.correo = errorCorreo;

    const errorTelefono = validarRequerido(datos.telefono, 'Teléfono');
    if (errorTelefono) nuevosErrores.telefono = errorTelefono;

    const errorMensaje = validarRequerido(datos.mensaje, 'Mensaje');
    if (errorMensaje) nuevosErrores.mensaje = errorMensaje;

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!validar()) return;

    setEsperandoRespuesta(true);
    setTimeout(() => {
      setEsperandoRespuesta(false);
      setEnviado(true);
      setDatos({
        nombreCompleto: '',
        correo: '',
        telefono: '',
        asunto: 'cotizacion',
        mensaje: ''
      });
      setTimeout(() => setEnviado(false), 5000);
    }, 800);
  };

  return (
    <Form onSubmit={manejarEnvio} noValidate className="p-4 bg-white rounded-4 shadow-sm border">
      <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">Envíanos un Mensaje Directo</h5>

      {enviado && (
        <Alert variant="success" className="py-2 small">
          ✓ ¡Gracias por contactarnos! Tu solicitud ha sido enviada al equipo de ventas y te responderemos a la brevedad.
        </Alert>
      )}

      <CampoFormulario
        etiqueta="Nombre y Apellidos *"
        marcador="Ej: Marcelo Rojas Castro"
        valor={datos.nombreCompleto}
        alCambiar={(e) => manejarCambio('nombreCompleto', e.target.value)}
        error={errores.nombreCompleto}
      />

      <Row>
        <Col md={6}>
          <CampoFormulario
            tipo="email"
            etiqueta="Correo Electrónico *"
            marcador="marcelo@empresa.cl"
            valor={datos.correo}
            alCambiar={(e) => manejarCambio('correo', e.target.value)}
            error={errores.correo}
          />
        </Col>
        <Col md={6}>
          <CampoFormulario
            tipo="tel"
            etiqueta="Teléfono *"
            marcador="+56 9 1234 5678"
            valor={datos.telefono}
            alCambiar={(e) => manejarCambio('telefono', e.target.value)}
            error={errores.telefono}
          />
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold small">Motivo de Contacto</Form.Label>
        <Form.Select
          value={datos.asunto}
          onChange={(e) => manejarCambio('asunto', e.target.value)}
          className="py-2"
        >
          <option value="cotizacion">📄 Solicitud de cotización por volumen / faena</option>
          <option value="credito">🏗️ Apertura o consulta de cuenta corriente contratista</option>
          <option value="despacho">🚚 Estado o coordinación de despacho a obra</option>
          <option value="general">❓ Consulta general sobre productos y stock</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold small">Mensaje o Detalle del Requerimiento *</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Describe aquí los materiales, cubicación o consulta que necesitas..."
          value={datos.mensaje}
          onChange={(e) => manejarCambio('mensaje', e.target.value)}
          isInvalid={Boolean(errores.mensaje)}
        />
        {errores.mensaje && (
          <Form.Control.Feedback type="invalid" className="d-block small">
            {errores.mensaje}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <div className="mt-3">
        <Boton
          tipo="submit"
          texto={esperandoRespuesta ? 'Enviando Mensaje...' : '✉️ Enviar Mensaje a Ventas'}
          variante="warning"
          deshabilitado={esperandoRespuesta}
        />
      </div>
    </Form>
  );
};

export default FormularioContacto;
