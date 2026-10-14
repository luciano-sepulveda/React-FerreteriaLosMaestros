import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import TarjetaLogin from '../components/organisms/TarjetaLogin';
import useTituloPagina from '../hooks/useTituloPagina';


const Login = () => {
  useTituloPagina('Iniciar Sesión');
  const navegar = useNavigate();

  const manejarLoginExitoso = (datosUsuario) => {

    const correoUsuario = datosUsuario.correo || datosUsuario.email;
    const usuarioActivo = {
      correo: correoUsuario,
      rol: correoUsuario.includes('admin') ? 'Administrador' : 'Contratista'
    };

    localStorage.setItem('usuario_activo', JSON.stringify(usuarioActivo));


    setTimeout(() => {
      navegar('/catalogo');
    }, 600);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <TarjetaLogin alLoginExitoso={manejarLoginExitoso} />

          <div className="text-center mt-3">
            <p className="text-muted small">
              ¿No tienes cuenta de contratista?{' '}
              <Link to="/catalogo" className="text-dark fw-semibold text-decoration-none">
                Continuar como visitante al Catálogo →
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;