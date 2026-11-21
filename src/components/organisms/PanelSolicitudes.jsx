import ComprobanteCompra from './ComprobanteCompra';
import TablaPedidos from './TablaPedidos';

function PanelSolicitudes(props) {
  const solicitudes = props.solicitudes || [];

  return (
    <div className="bg-white p-4 rounded-4 shadow-sm border">
      <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">
        Historial de Solicitudes y Pedidos Recibidos
      </h5>

      {props.pedidoDetalle ? (
        <ComprobanteCompra
          orden={props.pedidoDetalle}
          alVolverAlCatalogo={props.alVolverSolicitudes}
          textoVolver="Volver a solicitudes"
        />
      ) : (
        <TablaPedidos
          pedidos={solicitudes}
          alVerDetalle={props.alVerDetalle}
        />
      )}
    </div>
  );
}

export default PanelSolicitudes;
