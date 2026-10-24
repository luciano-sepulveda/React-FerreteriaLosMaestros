import { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import { validarCorreo, validarClave } from '../../utils/validaciones';

const FormularioLogin = ({ alEnviar, estaCargando = false }) => {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [errores, setErrores] = useState({ correo: '', clave: '' });
  const [mensajeExito, setMensajeExito] = useState('');

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    const errorCorreo = validarCorreo(correo);
    const errorClave = validarClave(clave);

    setErrores({
      correo: errorCorreo,
      clave: errorClave
    });

    if (errorCorreo !== '' || errorClave !== '') {
      setMensajeExito('');
      return;
    }

    setMensajeExito('Usuario validado con éxito. Redirigiendo al catálogo');
    if (alEnviar) {
      alEnviar({
        correo,
        clave
      });
    }
  };

  const manejarCambioCorreo = (evento) => {
    const nuevoValor = evento.target.value;
    setCorreo(nuevoValor);
    if (errores.correo) {
      setErrores((erroresPrevios) => ({
        ...erroresPrevios,
        correo: validarCorreo(nuevoValor)
      }));
    }
  };

  const manejarCambioClave = (evento) => {
    const nuevoValor = evento.target.value;
    setClave(nuevoValor);
    if (errores.clave) {
      setErrores((erroresPrevios) => ({
        ...erroresPrevios,
        clave: validarClave(nuevoValor)
      }));
    }
  };

  return (
    <Form onSubmit={manejarEnvio} noValidate>
      {mensajeExito && (
        <Alert variant="success" className="py-2 small text-center mb-3">
          {mensajeExito}
        </Alert>
      )}

      <CampoFormulario
        identificador="login-correo"
        etiqueta="Correo electrónico"
        tipo="email"
        marcador="contratista@maestros.cl"
        valor={correo}
        alCambiar={manejarCambioCorreo}
        error={errores.correo}
        autocompletar="email"
        ayuda="Usa tu correo institucional o de contratista registrado."
      />

      <CampoFormulario
        identificador="login-clave"
        etiqueta="Contraseña"
        tipo="password"
        marcador="••••••••"
        valor={clave}
        alCambiar={manejarCambioClave}
        error={errores.clave}
        autocompletar="current-password"
        ayuda="Mínimo 6 caracteres."
      />

      <div className="mt-4">
        <Boton
          texto={estaCargando ? 'Ingresando...' : 'Iniciar Sesión'}
          tipo="submit"
          variante="warning"
          deshabilitado={estaCargando}
        />
      </div>
    </Form>
  );
};

export default FormularioLogin;
