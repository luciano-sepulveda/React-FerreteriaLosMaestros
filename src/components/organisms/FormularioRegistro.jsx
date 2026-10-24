import { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import {
  validarCorreo,
  validarClave,
  validarRequerido,
  validarRut
} from '../../utils/validaciones';

const FormularioRegistro = ({ alRegistrarExitoso, alIrALogin }) => {
  const [datos, setDatos] = useState({
    nombreCompleto: '',
    rut: '',
    correo: '',
    telefono: '',
    clave: '',
    confirmarClave: '',
    tipoCliente: 'particular',
    razonSocial: ''
  });

  const [errores, setErrores] = useState({});
  const [esperando, setEsperando] = useState(false);

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

    const errorClave = validarClave(datos.clave);
    if (errorClave) nuevosErrores.clave = errorClave;

    if (datos.clave !== datos.confirmarClave) {
      nuevosErrores.confirmarClave = 'Las contraseñas no coinciden.';
    }

    if (datos.tipoCliente === 'contratista') {
      const errorRazon = validarRequerido(datos.razonSocial, 'Razón Social / Empresa');
      if (errorRazon) nuevosErrores.razonSocial = errorRazon;
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    if (!validar()) return;

    setEsperando(true);
    setTimeout(() => {
      setEsperando(false);
      const datosParaRegistrar = {
        nombreCompleto: datos.nombreCompleto,
        rut: datos.rut,
        correo: datos.correo,
        telefono: datos.telefono,
        tipoCliente: datos.tipoCliente,
        razonSocial: datos.razonSocial,
        rol: datos.tipoCliente === 'contratista' ? 'Contratista' : 'Particular',
        fechaRegistro: new Date().toLocaleDateString('es-CL')
      };

      if (alRegistrarExitoso) {
        alRegistrarExitoso(datosParaRegistrar);
      }
    }, 400);
  };

  return (
    <Form onSubmit={manejarEnvio} noValidate>
      <CampoFormulario
        etiqueta="Nombre y Apellidos *"
        marcador="Ej: Carlos Silva Gómez"
        valor={datos.nombreCompleto}
        alCambiar={(e) => manejarCambio('nombreCompleto', e.target.value)}
        error={errores.nombreCompleto}
      />

      <Row>
        <Col md={6}>
          <CampoFormulario
            etiqueta="RUT *"
            marcador="12345678-9"
            valor={datos.rut}
            alCambiar={(e) => manejarCambio('rut', e.target.value)}
            error={errores.rut}
          />
        </Col>
        <Col md={6}>
          <CampoFormulario
            tipo="tel"
            etiqueta="Teléfono *"
            marcador="+56 9 8765 4321"
            valor={datos.telefono}
            alCambiar={(e) => manejarCambio('telefono', e.target.value)}
            error={errores.telefono}
          />
        </Col>
      </Row>

      <CampoFormulario
        tipo="email"
        etiqueta="Correo Electrónico *"
        marcador="carlos@ejemplo.cl"
        valor={datos.correo}
        alCambiar={(e) => manejarCambio('correo', e.target.value)}
        error={errores.correo}
      />

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold small">Tipo de Cuenta</Form.Label>
        <Form.Select
          value={datos.tipoCliente}
          onChange={(e) => manejarCambio('tipoCliente', e.target.value)}
          className="py-2"
        >
          <option value="particular">Particular (Compras al contado / boleta)</option>
          <option value="contratista">Contratista (Beneficio crédito 30 días / factura)</option>
        </Form.Select>
      </Form.Group>

      {datos.tipoCliente === 'contratista' && (
        <CampoFormulario
          etiqueta="Razón Social o Nombre de Fantasía *"
          marcador="Ej: Constructora del Elqui SpA"
          valor={datos.razonSocial}
          alCambiar={(e) => manejarCambio('razonSocial', e.target.value)}
          error={errores.razonSocial}
          ayuda="Requerido para activar cuenta corriente y compras a crédito"
        />
      )}

      <Row>
        <Col md={6}>
          <CampoFormulario
            tipo="password"
            etiqueta="Contraseña *"
            marcador="Mínimo 6 caracteres"
            valor={datos.clave}
            alCambiar={(e) => manejarCambio('clave', e.target.value)}
            error={errores.clave}
          />
        </Col>
        <Col md={6}>
          <CampoFormulario
            tipo="password"
            etiqueta="Confirmar Contraseña *"
            marcador="Repite tu contraseña"
            valor={datos.confirmarClave}
            alCambiar={(e) => manejarCambio('confirmarClave', e.target.value)}
            error={errores.confirmarClave}
          />
        </Col>
      </Row>

      <div className="mt-4">
        <Boton
          tipo="submit"
          texto={esperando ? 'Registrando...' : 'Crear Cuenta'}
          variante="warning"
          deshabilitado={esperando}
        />
      </div>

      {alIrALogin && (
        <div className="text-center mt-3 border-top pt-3">
          <small className="text-muted">
            ¿Ya tienes cuenta?{' '}
            <Boton
              tipo="button"
              variante="link"
              tamano="sm"
              claseAdicional="p-0 fw-bold text-dark text-decoration-none d-inline w-auto"
              alHacerClic={alIrALogin}
              texto="Iniciar Sesión aquí"
            />
          </small>
        </div>
      )}
    </Form>
  );
};

export default FormularioRegistro;
