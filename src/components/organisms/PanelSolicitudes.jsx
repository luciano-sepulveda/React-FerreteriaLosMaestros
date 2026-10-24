import ComprobanteCompra from './ComprobanteCompra';
import TablaPedidos from './TablaPedidos';

const PanelSolicitudes = ({
  solicitudes = [],
  pedidoDetalle,
  alVerDetalle,
  alVolverSolicitudes
}) => {
  return (
    <div className="bg-white p-4 rounded-4 shadow-sm border">
      <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">
        Historial de Solicitudes y Pedidos Recibidos
      </h5>

      {pedidoDetalle ? (
        <ComprobanteCompra
          orden={pedidoDetalle}
          alVolverAlCatalogo={alVolverSolicitudes}
          textoVolver="Volver a solicitudes"
        />
      ) : (
        <TablaPedidos
          pedidos={solicitudes}
          alVerDetalle={alVerDetalle}
        />
      )}
    </div>
  );
};

export default PanelSolicitudes;
