import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';

const BannerOferta = ({
  titulo = 'Gran Remate de Temporada',
  subtitulo = 'Descuentos exclusivos en materiales para faena, herramientas eléctricas y suministros.',
  textoBoton = 'Ver Promociones',
  alHacerClic
}) => {
  return (
    <Card className="border-0 bg-dark text-white shadow-sm rounded-4 overflow-hidden mb-4 border-start border-warning border-5">
      <Card.Body className="p-4">
        <Row className="align-items-center">
          <Col md={8}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="fs-4">🔥</span>
              <Etiqueta variante="warning" esPildora={true} claseAdicional="text-dark">
                Oportunidades Maestras
              </Etiqueta>
              <Etiqueta variante="danger" esPildora={true}>
                Hasta 20% OFF
              </Etiqueta>
            </div>
            <h3 className="fw-bold text-white mb-2">{titulo}</h3>
            <p className="text-light opacity-75 mb-0 small">
              {subtitulo}
            </p>
          </Col>

          {textoBoton && alHacerClic && (
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <div className="d-inline-block">
                <Boton
                  texto={textoBoton}
                  variante="warning"
                  alHacerClic={alHacerClic}
                  claseAdicional="px-4 py-2"
                />
              </div>
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BannerOferta;
