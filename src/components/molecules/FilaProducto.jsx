import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';
import Stock from '../atoms/Stock';
import { formatearPrecio } from '../../utils/formatearPrecio';
import { obtenerEstadoStock } from '../../utils/stockUtils';

const FilaProducto = ({
  producto,
  alEditar,
  alEliminar
}) => {
  const estadoStock = obtenerEstadoStock(producto.stock, producto.stockMinimo);

  return (
    <tr>
      <td>
        <Etiqueta variante="light">{producto.codigo}</Etiqueta>
      </td>
      <td>
        <strong>{producto.nombre}</strong>
        <span className="d-block text-muted texto-tamano-chico">{producto.unidad}</span>
      </td>
      <td>{producto.categoria}</td>
      <td>{producto.marca}</td>
      <td className="text-end fw-semibold">{formatearPrecio(producto.precioVenta)}</td>
      <td className="text-center">
        <Stock texto={estadoStock.texto} variante={estadoStock.variante} />
      </td>
      <td className="text-center">
        <div className="d-inline-flex gap-1">
          <Boton
            variante="outline-primary"
            tamano="sm"
            claseAdicional="py-1 px-2 w-auto"
            alHacerClic={() => alEditar && alEditar(producto)}
            texto="✏️"
          />
          <Boton
            variante="outline-danger"
            tamano="sm"
            claseAdicional="py-1 px-2 w-auto"
            alHacerClic={() => alEliminar && alEliminar(producto.id, producto.nombre)}
            texto="🗑️"
          />
        </div>
      </td>
    </tr>
  );
};

export default FilaProducto;
