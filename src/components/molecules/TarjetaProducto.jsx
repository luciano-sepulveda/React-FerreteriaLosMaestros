import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Precio from '../atoms/Precio';
import Stock from '../atoms/Stock';
import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';
import Descuento from '../atoms/Descuento';
import ControlCantidad from './ControlCantidad';
import { obtenerEstadoStock } from '../../utils/stockUtils';

function TarjetaProducto(props) {
  const navegar = useNavigate();
  const [cantidad, setCantidad] = useState(1);
  const [agregadoReciente, setAgregadoReciente] = useState(false);

  const estadoStock = obtenerEstadoStock(props.producto.stock, props.producto.stockMinimo);
  const sinStock = props.producto.stock <= 0;

  const manejarAgregarCarrito = () => {
    if (props.alAgregarAlCarrito && !sinStock) {
      props.alAgregarAlCarrito(props.producto, cantidad);
      setAgregadoReciente(true);
      setTimeout(() => setAgregadoReciente(false), 1800);
    }
  };

  const manejarVer = () => {
    if (props.alVerDetalle) {
      props.alVerDetalle(props.producto);
    } else {
      navegar(`/producto/${props.producto.id}`);
    }
  };

  return (
    <Card className="h-100 shadow-sm border-0 rounded-3 d-flex flex-column">
      <Card.Body className="d-flex flex-column p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Etiqueta variante="light" claseAdicional="text-secondary border small">
            {props.producto.codigo}
          </Etiqueta>
          <Stock texto={estadoStock.texto} variante={estadoStock.variante} />
        </div>

        <span className="text-muted small mb-1">{props.producto.categoria} · {props.producto.marca}</span>
        <Card.Title
          className="h6 fw-bold text-dark text-truncate cursor-puntero"
          title={props.producto.nombre}
          onClick={manejarVer}
        >
          {props.producto.nombre}
        </Card.Title>

        <Card.Text className="text-muted small flex-grow-1 tarjeta-producto-descripcion">
          {props.producto.descripcion || `Unidad de venta: ${props.producto.unidad}`}
        </Card.Text>

        <div className="mt-2 pt-2 border-top">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="text-muted small">Precio Venta (IVA inc.)</span>
            {props.producto.enOferta && <Descuento porcentaje={props.producto.porcentajeDescuento} />}
          </div>
          <div className="d-flex align-items-baseline gap-2">
            <Precio valor={props.producto.precioVenta} />
            {props.producto.precioAnterior && (
              <span className="text-muted text-decoration-line-through small">
                {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(props.producto.precioAnterior)}
              </span>
            )}
          </div>
        </div>

        {!sinStock && (
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-muted small">Cantidad:</span>
            <ControlCantidad
              cantidad={cantidad}
              stockMaximo={props.producto.stock}
              alCambiar={setCantidad}
              tamano="sm"
            />
          </div>
        )}

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
              alHacerClic={() => props.alCotizar && props.alCotizar(props.producto, cantidad)}
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
}

export default TarjetaProducto;
