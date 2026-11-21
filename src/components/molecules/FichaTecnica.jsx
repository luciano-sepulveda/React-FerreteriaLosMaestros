import { Row, Col } from 'react-bootstrap';
import Especificacion from '../atoms/Especificacion';
import Stock from '../atoms/Stock';
import Etiqueta from '../atoms/Etiqueta';
import { obtenerEstadoStock } from '../../utils/stockUtils';

function FichaTecnica(props) {
  if (!props.producto) return null;

  const estadoStock = obtenerEstadoStock(props.producto.stock, props.producto.stockMinimo);

  return (
    <div className="p-3 bg-white rounded-3 border shadow-sm mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <h6 className="fw-bold text-dark mb-0">Ficha Técnica y Disponibilidad</h6>
        <div className="d-flex align-items-center gap-2">
          <Etiqueta variante="light" claseAdicional="border">
            {props.producto.codigo}
          </Etiqueta>
          <Stock texto={estadoStock.texto} variante={estadoStock.variante} />
        </div>
      </div>

      <Row className="g-2">
        <Col xs={6} md={4}>
          <Especificacion etiqueta="Categoría" valor={props.producto.categoria} />
        </Col>
        <Col xs={6} md={4}>
          <Especificacion etiqueta="Subcategoría" valor={props.producto.subcategoria} />
        </Col>
        <Col xs={6} md={4}>
          <Especificacion etiqueta="Marca" valor={props.producto.marca} />
        </Col>
        <Col xs={6} md={4}>
          <Especificacion etiqueta="Unidad de Venta" valor={props.producto.unidad} />
        </Col>
        <Col xs={6} md={4}>
          <Especificacion etiqueta="Stock en Bodega" valor={`${props.producto.stock} unidades`} />
        </Col>
        <Col xs={6} md={4}>
          <Especificacion etiqueta="Stock Mínimo" valor={`${props.producto.stockMinimo} unidades`} />
        </Col>
      </Row>
    </div>
  );
}

export default FichaTecnica;
