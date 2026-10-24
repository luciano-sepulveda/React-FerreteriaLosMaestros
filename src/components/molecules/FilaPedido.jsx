import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';
import { formatearPrecio } from '../../utils/formatearPrecio';

const FilaPedido = ({
  pedido,
  alVerDetalle
}) => {
  return (
    <tr>
      <td>
        <Etiqueta variante="light">{pedido.folio}</Etiqueta>
      </td>
      <td>{pedido.fecha}</td>
      <td>{pedido.nombreCompleto}</td>
      <td>
        <Etiqueta variante={pedido.esCotizacion ? 'info' : 'success'}>
          {pedido.esCotizacion ? 'Cotización' : 'Compra'}
        </Etiqueta>
      </td>
      <td>{pedido.tipoEntrega}</td>
      <td className="text-end fw-bold">{formatearPrecio(pedido.totalPagar)}</td>
      <td className="text-center">
        <Etiqueta variante="warning" claseAdicional="text-dark">
          {pedido.estado || 'En preparación'}
        </Etiqueta>
      </td>
      {alVerDetalle && (
        <td className="text-center">
          <Boton
            variante="outline-dark"
            tamano="sm"
            claseAdicional="py-1 px-2 w-auto"
            alHacerClic={() => alVerDetalle(pedido)}
            texto="🔍 Detalle"
          />
        </td>
      )}
    </tr>
  );
};

export default FilaPedido;
