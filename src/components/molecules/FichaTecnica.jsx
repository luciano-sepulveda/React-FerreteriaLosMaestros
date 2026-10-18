import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Especificacion from '../atoms/Especificacion';
import Stock from '../atoms/Stock';
import Etiqueta from '../atoms/Etiqueta';

const FichaTecnica = ({ producto }) => {
  if (!producto) return null;

  const {
    codigo,
    categoria,
    subcategoria,
    marca,
    unidad,
    stock,
    stockMinimo
  } = producto;

  return (
    <div className="p-3 bg-white rounded-3 border shadow-sm mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <h6 className="fw-bold text-dark mb-0">Ficha Técnica y Disponibilidad</h6>
        <div className="d-flex align-items-center gap-2">
          <Etiqueta variante="light" claseAdicional="border">
            {codigo}
          </Etiqueta>
          <Stock stock={stock} stockMinimo={stockMinimo} />
        </div>
      </div>

      <Row className="g-2">
        <Col xs={6} md={4}>
          <Especificacion etiqueta="Categoría" valor={categoria} />
        </Col>
        <Col xs={6} md={4}>
          <Especificacion etiqueta="Subcategoría" valor={subcategoria} />
        </Col>
        <Col xs={6} md={4}>
          <Especificacion etiqueta="Marca" valor={marca} />
        </Col>
        <Col xs={6} md={4}>
          <Especificacion etiqueta="Unidad de Venta" valor={unidad} />
        </Col>
        <Col xs={6} md={4}>
          <Especificacion etiqueta="Stock en Bodega" valor={`${stock} unidades`} />
        </Col>
        <Col xs={6} md={4}>
          <Especificacion etiqueta="Stock Mínimo" valor={`${stockMinimo} unidades`} />
        </Col>
      </Row>
    </div>
  );
};

export default FichaTecnica;
