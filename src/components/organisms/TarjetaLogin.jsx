import { useState } from 'react';
import { Card, Nav } from 'react-bootstrap';
import FormularioLogin from './FormularioLogin';
import FormularioRegistro from './FormularioRegistro';

const TarjetaLogin = ({
  alLoginExitoso,
  modoInicial = 'login'
}) => {
  const [modo, setModo] = useState(modoInicial);

  return (
    <Card className="shadow-sm p-3 p-md-4 rounded-4 border-0 bg-white">
      <Card.Body>
        <div className="text-center mb-3">
          <div className="d-inline-flex p-3 rounded-circle bg-warning bg-opacity-25 mb-2">
            <span className="fs-3">🔨</span>
          </div>
          <h3 className="fw-bold text-dark mb-1">Ferretería Los Maestros</h3>
          <p className="text-muted small">
            {modo === 'login'
              ? 'Acceso para clientes y contratistas'
              : 'Crea tu cuenta particular o de contratista'}
          </p>
        </div>

        <Nav variant="pills" justify className="mb-4 bg-light p-1 rounded-3">
          <Nav.Item>
            <Nav.Link
              active={modo === 'login'}
              onClick={() => setModo('login')}
              className={`fw-semibold ${modo === 'login' ? 'bg-warning text-dark' : 'text-muted'} cursor-puntero`}
            >
              Iniciar Sesión
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={modo === 'registro'}
              onClick={() => setModo('registro')}
              className={`fw-semibold ${modo === 'registro' ? 'bg-warning text-dark' : 'text-muted'} cursor-puntero`}
            >
              Crear Cuenta
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {modo === 'login' ? (
          <FormularioLogin
            alEnviar={alLoginExitoso}
          />
        ) : (
          <FormularioRegistro
            alRegistrarExitoso={alLoginExitoso}
            alIrALogin={() => setModo('login')}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default TarjetaLogin;