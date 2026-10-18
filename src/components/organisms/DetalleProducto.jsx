import React, { useState } from 'react';
import { Card, Row, Col, Alert } from 'react-bootstrap';
import FichaTecnica from '../molecules/FichaTecnica';
import ControlCantidad from '../molecules/ControlCantidad';
import Precio from '../atoms/Precio';
import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';

const DetalleProducto = ({
  producto,
  alAgregarAlCarrito,
  alCotizar,
  alVolver
}) => {
  const [cantidad, setCantidad] = useState(1);
  const [agregadoMensaje, setAgregadoMensaje] = useState(false);

  if (!producto) {
    return (
      <div className="bg-white p-5 rounded-4 shadow-sm text-center border">
        <h4 className="fw-bold text-dark mb-3">Producto no encontrado</h4>
        <p className="text-muted mb-4">El producto solicitado no existe o no tiene stock asignado.</p>
        <div className="d-inline-block" style={{ maxWidth: '220px' }}>
          <Boton texto="Volver al Catálogo" variante="warning" alHacerClic={alVolver} />
        </div>
      </div>
    );
  }

  const {
    nombre,
    categoria,
    marca,
    precioVenta,
    stock,
    descripcion
  } = producto;

  const sinStock = stock <= 0;

  const manejarAgregar = () => {
    if (alAgregarAlCarrito && !sinStock) {
      alAgregarAlCarrito(producto, cantidad);
      setAgregadoMensaje(true);
      setTimeout(() => setAgregadoMensaje(false), 2500);
    }
  };

  const manejarCotizar = () => {
    if (alCotizar) {
      alCotizar(producto, cantidad);
    }
  };

  return (
    <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-4">
      <Card.Header className="bg-dark text-white p-3 p-md-4 border-bottom border-warning border-3">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div>
            <span className="badge bg-warning text-dark fw-bold px-3 py-1 mb-2 text-uppercase">
              {categoria}
            </span>
            <h2 className="fw-bold text-white mb-0">{nombre}</h2>
            <small className="text-light opacity-75">Marca: {marca}</small>
          </div>
          <div>
            <Boton
              texto="← Volver al Catálogo"
              variante="outline-light"
              tamano="sm"
              alHacerClic={alVolver}
              claseAdicional="px-3"
            />
          </div>
        </div>
      </Card.Header>

      <Card.Body className="p-4">
        {agregadoMensaje && (
          <Alert variant="success" dismissible onClose={() => setAgregadoMensaje(false)} className="py-2 mb-3">
            ✓ ¡Se han agregado <strong>{cantidad}</strong> unidad(es) de <strong>{nombre}</strong> a tu pedido!
          </Alert>
        )}

        <Row className="g-4">
          <Col lg={7}>
            {/* Descripción general */}
            <div className="mb-4">
              <h5 className="fw-bold text-dark border-bottom pb-2 mb-2">Descripción del Producto</h5>
              <p className="text-secondary lead fs-6">
                {descripcion || 'Material garantizado de alta calidad para faenas constructivas y mantención técnica.'}
              </p>
            </div>

            {/* Molécula Ficha Técnica */}
            <FichaTecnica producto={producto} />

            {/* Aviso Contratista */}
            <div className="p-3 bg-light rounded-3 border">
              <h6 className="fw-bold text-dark mb-1">🏗️ Disponibilidad y Despacho</h6>
              <ul className="list-unstyled small text-muted mb-0">
                <li>• Retiro inmediato en sucursal La Serena sin costo adicional.</li>
                <li>• Despacho directo a faena o domicilio dentro de la conurbación La Serena - Coquimbo.</li>
                <li>• Contratistas con cuenta corriente pueden solicitar pago con facturación a 30 días.</li>
              </ul>
            </div>
          </Col>

          <Col lg={5}>
            {/* Tarjeta de compra y cotización */}
            <div className="p-4 bg-light rounded-4 border shadow-sm sticky-top" style={{ top: '80px' }}>
              <span className="text-muted small d-block mb-1">Precio Unitario (IVA incluido)</span>
              <Precio valor={precioVenta} />

              <div className="mt-3 pt-3 border-top">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fw-semibold text-dark">Cantidad a solicitar:</span>
                  <ControlCantidad
                    cantidad={cantidad}
                    stockMaximo={stock}
                    alCambiar={setCantidad}
                    deshabilitado={sinStock}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3 p-2 bg-white rounded border">
                  <span className="small text-muted">Subtotal estimado:</span>
                  <span className="fw-bold text-danger fs-5">
                    {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(precioVenta * cantidad)}
                  </span>
                </div>

                <div className="d-flex flex-column gap-2">
                  <Boton
                    texto={sinStock ? 'Sin Stock Disponible' : '🛒 Agregar al Carrito y Comprar'}
                    variante="warning"
                    alHacerClic={manejarAgregar}
                    deshabilitado={sinStock}
                  />

                  <Boton
                    texto="📄 Agregar a Cotización Formal"
                    variante="outline-dark"
                    alHacerClic={manejarCotizar}
                    deshabilitado={sinStock}
                  />
                </div>

                <small className="text-muted d-block text-center mt-3" style={{ fontSize: '0.75rem' }}>
                  Stock actualizado en tiempo real desde bodega central.
                </small>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DetalleProducto;
