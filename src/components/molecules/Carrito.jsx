import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ControlCantidad from './ControlCantidad';
import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';
import { formatearPrecio } from '../../utils/formatearPrecio';

const Carrito = ({
  elemento,
  alModificarCantidad,
  alEliminar
}) => {
  const { producto, cantidad, subtotal } = elemento;

  const manejarCambioCantidad = (nuevaCantidad) => {
    if (alModificarCantidad) {
      alModificarCantidad(producto.id, nuevaCantidad);
    }
  };

  const manejarEliminar = () => {
    if (alEliminar) {
      alEliminar(producto.id);
    }
  };

  return (
    <div className="p-3 bg-white rounded-3 border mb-2 shadow-sm">
      <Row className="align-items-center g-2">
        <Col xs={12} md={5}>
          <div className="d-flex align-items-center gap-2 mb-1">
            <Etiqueta variante="light" claseAdicional="text-secondary border small">
              {producto.codigo}
            </Etiqueta>
            <span className="text-muted small">{producto.categoria}</span>
          </div>
          <h6 className="fw-bold mb-1 text-dark text-truncate" title={producto.nombre}>
            {producto.nombre}
          </h6>
          <small className="text-muted d-block">
            Precio unitario: <span className="fw-semibold text-dark">{formatearPrecio(producto.precioVenta)}</span>
          </small>
        </Col>

        <Col xs={6} md={3} className="text-md-center">
          <span className="d-block text-muted small mb-1">Cantidad:</span>
          <ControlCantidad
            cantidad={cantidad}
            stockMaximo={producto.stock || 999}
            alCambiar={manejarCambioCantidad}
          />
        </Col>

        <Col xs={4} md={2} className="text-end">
          <span className="d-block text-muted small">Subtotal:</span>
          <span className="fw-bold text-danger fs-6">
            {formatearPrecio(subtotal)}
          </span>
        </Col>

        <Col xs={2} md={2} className="text-end">
          <Boton
            texto="🗑️"
            variante="outline-danger"
            tamano="sm"
            alHacerClic={manejarEliminar}
            claseAdicional="px-2 py-1"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Carrito;
