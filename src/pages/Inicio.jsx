import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LayoutPrincipal from '../components/templates/LayoutPrincipal';
import TarjetaLogin from '../components/organisms/TarjetaLogin';

const Inicio = () => {
  return (
    <LayoutPrincipal>
      <Container className="py-5">
        <Row className="justify-content-center">
          {/* xs=12 (375px), md=8 (768px), lg=5 (1280px) */}
          <Col xs={12} sm={10} md={8} lg={5} xl={4}>
            <TarjetaLogin />
          </Col>
        </Row>
      </Container>
    </LayoutPrincipal>
  );
};

export default Inicio;