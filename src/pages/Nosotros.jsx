import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useTituloPagina from '../hooks/useTituloPagina';

const Nosotros = () => {
  useTituloPagina('Quiénes Somos - Ferretería Los Maestros');

  return (
    <div>
      {/* Banner de Presentación */}
      <section className="bg-dark text-white py-5 border-bottom border-warning border-3">
        <Container>
          <div className="py-4 text-center text-lg-start">
            <span className="badge bg-warning text-dark fw-bold px-3 py-2 mb-3 text-uppercase">
              Tradición Familiar · La Serena, IV Región
            </span>
            <h1 className="display-4 fw-extrabold mb-3">
              22 Años al Servicio de los <span className="text-warning">Maestros y Contratistas</span>
            </h1>
            <p className="lead text-light opacity-75 mb-0" style={{ maxWidth: '800px' }}>
              Ferretería Los Maestros nació en el año 2004 en el corazón de La Serena con la misión de abastecer materiales de construcción de primera calidad, herramientas profesionales y asesoría técnica directa en mesón.
            </p>
          </div>
        </Container>
      </section>

      {/* Historia y Valores */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="g-4 align-items-center mb-5">
            <Col lg={6}>
              <h2 className="fw-bold text-dark mb-3">Nuestra Trayectoria</h2>
              <p className="text-secondary">
                Lo que comenzó como un pequeño local de tornillería y herramientas manuales, hoy se ha consolidado como un centro de distribución integral con más de 1.500 m² de bodega en Balmaceda.
              </p>
              <p className="text-secondary">
                Atendemos diariamente a particulares, contratistas independientes y empresas constructoras de toda la conurbación La Serena - Coquimbo y el Valle de Elqui, garantizando cubicaciones precisas y abastecimiento oportuno en obra.
              </p>
              <div className="d-flex gap-3 mt-4">
                <Link to="/catalogo" className="btn btn-warning fw-bold px-4">
                  Ver Nuestro Catálogo
                </Link>
                <Link to="/contacto" className="btn btn-outline-dark px-4">
                  Contáctanos
                </Link>
              </div>
            </Col>

            <Col lg={6}>
              <Row className="g-3">
                <Col sm={6}>
                  <Card className="p-3 bg-light border-0 rounded-4 shadow-sm h-100 text-center">
                    <div className="fs-1 mb-2">⏱️</div>
                    <h5 className="fw-bold text-dark">22 Años</h5>
                    <p className="small text-muted mb-0">De experiencia y compromiso ininterrumpido en la región.</p>
                  </Card>
                </Col>
                <Col sm={6}>
                  <Card className="p-3 bg-light border-0 rounded-4 shadow-sm h-100 text-center">
                    <div className="fs-1 mb-2">🚚</div>
                    <h5 className="fw-bold text-dark">Despacho Veloz</h5>
                    <p className="small text-muted mb-0">Entregas en faena dentro de 24 horas hábiles.</p>
                  </Card>
                </Col>
                <Col sm={6}>
                  <Card className="p-3 bg-light border-0 rounded-4 shadow-sm h-100 text-center">
                    <div className="fs-1 mb-2">🤝</div>
                    <h5 className="fw-bold text-dark">Crédito a 30 Días</h5>
                    <p className="small text-muted mb-0">Cuentas corrientes para contratistas calificados.</p>
                  </Card>
                </Col>
                <Col sm={6}>
                  <Card className="p-3 bg-light border-0 rounded-4 shadow-sm h-100 text-center">
                    <div className="fs-1 mb-2">📦</div>
                    <h5 className="fw-bold text-dark">Stock Real</h5>
                    <p className="small text-muted mb-0">Sincronización continua de inventario para evitar quiebres.</p>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Misión y Visión */}
          <Row className="g-4 border-top pt-5">
            <Col md={6}>
              <div className="p-4 bg-light rounded-4 border h-100">
                <h4 className="fw-bold text-dark mb-2">🎯 Nuestra Misión</h4>
                <p className="text-secondary mb-0">
                  Brindar soluciones constructivas integrales a contratistas y familias de la Región de Coquimbo, combinando productos normados, asesoría técnica experta y facilidades comerciales que impulsen el desarrollo de sus proyectos.
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="p-4 bg-light rounded-4 border h-100">
                <h4 className="fw-bold text-dark mb-2">👁️ Nuestra Visión</h4>
                <p className="text-secondary mb-0">
                  Ser la ferretería técnica referente del norte chico, reconocida por su cercanía humana, digitalización en la gestión de pedidos y solvencia en el abastecimiento para la construcción sustentable.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Nosotros;
