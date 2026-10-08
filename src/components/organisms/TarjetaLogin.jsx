import React from 'react';
import { Card } from 'react-bootstrap';
import FormularioLogin from '../molecules/FormularioLogin';

const TarjetaLogin = () => {
  return (
    <Card className="shadow-sm p-4 rounded-3 border-0">
      <Card.Body>
        <div className="text-center mb-4">
          <h3 className="fw-bold text-dark">Ferretería Los Maestros</h3>
          <p className="text-muted small">Acceso al sistema de ventas y pedidos</p>
        </div>
        <FormularioLogin />
      </Card.Body>
    </Card>
  );
};

export default TarjetaLogin;