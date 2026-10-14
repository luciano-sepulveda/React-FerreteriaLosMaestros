import React from 'react';
import { Card } from 'react-bootstrap';
import FormularioLogin from './FormularioLogin';


const TarjetaLogin = ({ alLoginExitoso, onLoginExitoso }) => {
  const manejadorExito = alLoginExitoso || onLoginExitoso;

  return (
    <Card className="shadow-sm p-4 rounded-3 border-0 bg-white">
      <Card.Body>
        <div className="text-center mb-4">
          <div className="d-inline-flex p-3 rounded-circle bg-warning bg-opacity-25 mb-2">
            <span className="fs-3">🔨</span>
          </div>
          <h3 className="fw-bold text-dark mb-1">Ferretería Los Maestros</h3>
          <p className="text-muted small">Acceso para clientes y contratistas</p>
        </div>

        <FormularioLogin alEnviar={manejadorExito} />
      </Card.Body>
    </Card>
  );
};

export default TarjetaLogin;