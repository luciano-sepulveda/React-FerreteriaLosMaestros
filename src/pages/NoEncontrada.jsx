import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useTituloPagina from '../hooks/useTituloPagina';


const NoEncontrada = () => {
  useTituloPagina('Página No Encontrada');
  const navegar = useNavigate();

  return (
    <Container className="py-5 text-center">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="display-1 fw-bold text-warning mb-3">404</div>
          <h2 className="fw-bold mb-3">Página no encontrada</h2>
          <p className="text-muted mb-4">
            La sección o producto que buscas no existe o fue removido en el catálogo de Ferretería Los Maestros.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="warning" className="fw-bold px-4" onClick={() => navegar('/catalogo')}>
              Ir al Catálogo
            </Button>
            <Button variant="outline-secondary" onClick={() => navegar('/')}>
              Volver al Inicio
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NoEncontrada;
