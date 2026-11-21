import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';
import Stock from '../atoms/Stock';
import { formatearPrecio } from '../../utils/formatearPrecio';
import { obtenerEstadoStock } from '../../utils/stockUtils';

function FilaProducto(props) {
  const estadoStock = obtenerEstadoStock(props.producto.stock, props.producto.stockMinimo);

  return (
    <tr>
      <td>
        <Etiqueta variante="light">{props.producto.codigo}</Etiqueta>
      </td>
      <td>
        <strong>{props.producto.nombre}</strong>
        <span className="d-block text-muted texto-tamano-chico">{props.producto.unidad}</span>
      </td>
      <td>{props.producto.categoria}</td>
      <td>{props.producto.marca}</td>
      <td className="text-end fw-semibold">{formatearPrecio(props.producto.precioVenta)}</td>
      <td className="text-center">
        <Stock texto={estadoStock.texto} variante={estadoStock.variante} />
      </td>
      <td className="text-center">
        <div className="d-inline-flex gap-1">
          <Boton
            variante="outline-primary"
            tamano="sm"
            claseAdicional="py-1 px-2 w-auto"
            alHacerClic={() => props.alEditar && props.alEditar(props.producto)}
            texto="✏️"
          />
          <Boton
            variante="outline-danger"
            tamano="sm"
            claseAdicional="py-1 px-2 w-auto"
            alHacerClic={() => props.alEliminar && props.alEliminar(props.producto.id, props.producto.nombre)}
            texto="🗑️"
          />
        </div>
      </td>
    </tr>
  );
}

export default FilaProducto;
