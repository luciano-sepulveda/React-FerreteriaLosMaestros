import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import TarjetaLogin from '../components/organisms/TarjetaLogin';
import useTituloPagina from '../hooks/useTituloPagina';

const Registro = () => {
  useTituloPagina('Registro de Usuario - Ferretería Los Maestros');
  const navegar = useNavigate();

  const manejarExito = (usuario) => {
    setTimeout(() => {
      navegar('/catalogo');
    }, 600);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <TarjetaLogin modoInicial="registro" alLoginExitoso={manejarExito} />

          <div className="text-center mt-3">
            <p className="text-muted small">
              ¿Prefieres explorar antes?{' '}
              <Link to="/catalogo" className="text-dark fw-semibold text-decoration-none">
                Ir al Catálogo de productos →
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Registro;
