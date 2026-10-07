import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TarjetaLogin from '../components/organisms/TarjetaLogin';

const Login = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={5} xl={4}>
          <TarjetaLogin />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;