import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-auto border-top border-warning border-3">
      <Container>
        <Row className="g-4 mb-3 text-center text-md-start">
          <Col md={5}>
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
              <span className="fs-4">🔨</span>
              <span className="fw-bold fs-5 text-warning">Ferretería Los Maestros</span>
            </div>
            <p className="small text-light opacity-75 mb-0">
              22 años abasteciendo a particulares y contratistas de La Serena y la IV Región con materiales normados, herramientas profesionales y despacho garantizado a obra.
            </p>
          </Col>

          <Col md={3}>
            <h6 className="fw-bold text-warning mb-2">Enlaces Rápidos</h6>
            <ul className="list-unstyled small mb-0 d-flex flex-column gap-1">
              <li><Link to="/catalogo" className="text-light text-decoration-none opacity-75">Catálogo Completo</Link></li>
              <li><Link to="/ofertas" className="text-light text-decoration-none opacity-75">Ofertas y Remates</Link></li>
              <li><Link to="/nosotros" className="text-light text-decoration-none opacity-75">Quiénes Somos</Link></li>
              <li><Link to="/blog" className="text-light text-decoration-none opacity-75">Blog Técnico</Link></li>
              <li><Link to="/contacto" className="text-light text-decoration-none opacity-75">Contacto y Sucursal</Link></li>
            </ul>
          </Col>

          <Col md={4}>
            <h6 className="fw-bold text-warning mb-2">Casa Matriz</h6>
            <p className="small text-light opacity-75 mb-1">
              📍 Av. Balmaceda 1420, La Serena · Chile
            </p>
            <p className="small text-light opacity-75 mb-1">
              📞 +56 51 222 3344 · WhatsApp: +56 9 7654 3210
            </p>
            <p className="small text-light opacity-75 mb-0">
              🕒 Lun a Vie: 08:00 a 18:30 hrs · Sáb: 08:30 a 14:00 hrs
            </p>
          </Col>
        </Row>

        <div className="border-top border-secondary pt-3 text-center">
          <small className="text-light opacity-50">
            &copy; {new Date().getFullYear()} Ferretería Los Maestros — La Serena, IV Región. Todos los derechos reservados.
          </small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;