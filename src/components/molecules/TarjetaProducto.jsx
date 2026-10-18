import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Precio from '../atoms/Precio';
import Stock from '../atoms/Stock';
import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';
import Descuento from '../atoms/Descuento';
import ControlCantidad from './ControlCantidad';

const TarjetaProducto = ({
  producto,
  alCotizar,
  onCotizar,
  alAgregarAlCarrito,
  alComprar,
  alVerDetalle,
  onVerDetalle
}) => {
  const navegar = useNavigate();
  const [cantidad, setCantidad] = useState(1);
  const [agregadoReciente, setAgregadoReciente] = useState(false);

  const {
    id,
    codigo,
    nombre,
    marca,
    categoria,
    unidad,
    precioVenta,
    precioAnterior,
    enOferta,
    porcentajeDescuento,
    stock,
    stockMinimo,
    descripcion
  } = producto;

  const sinStock = stock <= 0;
  const manejadorCotizar = alCotizar || onCotizar;
  const manejadorAgregar = alAgregarAlCarrito || alComprar;

  const manejarAgregarCarrito = () => {
    if (manejadorAgregar && !sinStock) {
      manejadorAgregar(producto, cantidad);
      setAgregadoReciente(true);
      setTimeout(() => setAgregadoReciente(false), 1800);
    }
  };

  const manejarVer = () => {
    if (alVerDetalle || onVerDetalle) {
      (alVerDetalle || onVerDetalle)(producto);
    } else {
      navegar(`/producto/${id}`);
    }
  };

  return (
    <Card className="h-100 shadow-sm border-0 rounded-3 d-flex flex-column">
      <Card.Body className="d-flex flex-column p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Etiqueta variante="light" claseAdicional="text-secondary border small">
            {codigo}
          </Etiqueta>
          <Stock stock={stock} stockMinimo={stockMinimo} />
        </div>

        <span className="text-muted small mb-1">{categoria} · {marca}</span>
        <Card.Title
          className="h6 fw-bold text-dark text-truncate cursor-pointer"
          title={nombre}
          onClick={manejarVer}
          style={{ cursor: 'pointer' }}
        >
          {nombre}
        </Card.Title>

        <Card.Text className="text-muted small flex-grow-1" style={{ minHeight: '38px' }}>
          {descripcion || `Unidad de venta: ${unidad}`}
        </Card.Text>

        <div className="mt-2 pt-2 border-top">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="text-muted small">Precio Venta (IVA inc.)</span>
            {enOferta && <Descuento porcentaje={porcentajeDescuento} />}
          </div>
          <div className="d-flex align-items-baseline gap-2">
            <Precio valor={precioVenta} />
            {precioAnterior && (
              <span className="text-muted text-decoration-line-through small">
                {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(precioAnterior)}
              </span>
            )}
          </div>
        </div>

        {/* Control de cantidad para agregar/comprar */}
        {!sinStock && (
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-muted small">Cantidad:</span>
            <ControlCantidad
              cantidad={cantidad}
              stockMaximo={stock}
              alCambiar={setCantidad}
              tamano="sm"
            />
          </div>
        )}

        {/* Acciones principales: Comprar/Agregar, Cotizar y Ver Detalle */}
        <div className="d-flex flex-column gap-2 mt-auto">
          <Boton
            texto={
              sinStock
                ? 'Sin Stock'
                : agregadoReciente
                ? '✓ ¡Agregado!'
                : '🛒 Agregar / Comprar'
            }
            variante={agregadoReciente ? 'success' : 'warning'}
            alHacerClic={manejarAgregarCarrito}
            deshabilitado={sinStock}
          />

          <div className="d-flex gap-2">
            <Boton
              texto="📄 Cotizar"
              variante="outline-dark"
              alHacerClic={() => manejadorCotizar && manejadorCotizar(producto, cantidad)}
            />
            <Boton
              texto="🔍 Ver"
              variante="outline-secondary"
              alHacerClic={manejarVer}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TarjetaProducto;
