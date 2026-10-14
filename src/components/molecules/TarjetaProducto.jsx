import React from 'react';
import { Card } from 'react-bootstrap';
import Precio from '../atoms/Precio';
import Stock from '../atoms/Stock';
import Boton from '../atoms/Boton';


const TarjetaProducto = ({ producto, alCotizar, onCotizar, alVerDetalle, onVerDetalle }) => {
  const {
    codigo,
    nombre,
    marca,
    categoria,
    unidad,
    precioVenta,
    stock,
    stockMinimo,
    descripcion
  } = producto;

  const manejadorCotizar = alCotizar || onCotizar;
  const manejadorVerDetalle = alVerDetalle || onVerDetalle;

  return (
    <Card className="h-100 shadow-sm border-0 rounded-3 d-flex flex-column">
      <Card.Body className="d-flex flex-column p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="badge bg-light text-secondary border small">{codigo}</span>
          <Stock stock={stock} stockMinimo={stockMinimo} />
        </div>

        <span className="text-muted small mb-1">{categoria} · {marca}</span>
        <Card.Title className="h6 fw-bold text-dark text-truncate" title={nombre}>
          {nombre}
        </Card.Title>

        <Card.Text className="text-muted small flex-grow-1" style={{ minHeight: '38px' }}>
          {descripcion || `Unidad de venta: ${unidad}`}
        </Card.Text>

        <div className="mt-2 pt-2 border-top">
          <span className="text-muted small d-block">Precio Venta (IVA inc.)</span>
          <Precio valor={precioVenta} />
        </div>

        <div className="d-flex gap-2 mt-2">
          <Boton
            texto="Cotizar"
            variante="warning"
            alHacerClic={() => manejadorCotizar && manejadorCotizar(producto)}
          />
          {manejadorVerDetalle && (
            <Boton
              texto="Ver"
              variante="outline-secondary"
              alHacerClic={() => manejadorVerDetalle(producto)}
            />
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TarjetaProducto;
