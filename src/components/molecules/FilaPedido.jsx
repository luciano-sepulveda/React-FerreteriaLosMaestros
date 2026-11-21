import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';
import { formatearPrecio } from '../../utils/formatearPrecio';

function FilaPedido(props) {
  return (
    <tr>
      <td>
        <Etiqueta variante="light">{props.pedido.folio}</Etiqueta>
      </td>
      <td>{props.pedido.fecha}</td>
      <td>{props.pedido.nombreCompleto}</td>
      <td>
        <Etiqueta variante={props.pedido.esCotizacion ? 'info' : 'success'}>
          {props.pedido.esCotizacion ? 'Cotización' : 'Compra'}
        </Etiqueta>
      </td>
      <td>{props.pedido.tipoEntrega}</td>
      <td className="text-end fw-bold">{formatearPrecio(props.pedido.totalPagar)}</td>
      <td className="text-center">
        <Etiqueta variante="warning" claseAdicional="text-dark">
          {props.pedido.estado || 'En preparación'}
        </Etiqueta>
      </td>
      {props.alVerDetalle && (
        <td className="text-center">
          <Boton
            variante="outline-dark"
            tamano="sm"
            claseAdicional="py-1 px-2 w-auto"
            alHacerClic={() => props.alVerDetalle(props.pedido)}
            texto="🔍 Detalle"
          />
        </td>
      )}
    </tr>
  );
}

export default FilaPedido;
