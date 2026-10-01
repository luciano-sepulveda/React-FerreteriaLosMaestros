import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import CampoTexto from '../atoms/CampoTexto';
import Boton from '../atoms/Boton';

const FormularioLogin = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login intentado con:', { usuario, password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CampoTexto
        label="Correo o Usuario"
        type="text"
        placeholder="ejemplo@maestros.cl"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <CampoTexto
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Boton texto="Iniciar Sesión" type="submit" variant="warning" />
    </Form>
  );
};

export default FormularioLogin;