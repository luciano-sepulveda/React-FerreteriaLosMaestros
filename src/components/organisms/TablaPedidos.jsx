import { Table } from 'react-bootstrap';
import FilaPedido from '../molecules/FilaPedido';

const TablaPedidos = ({
  pedidos = [],
  alVerDetalle
}) => {
  if (pedidos.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="fs-1 mb-2">📋</div>
        <h6 className="fw-bold text-dark">No hay pedidos registrados en el historial</h6>
        <p className="text-muted small">
          Cuando los clientes completen el carrito o cotizaciones aparecerán aquí para su preparación y despacho.
        </p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <Table hover className="align-middle small">
        <thead className="table-light">
          <tr>
            <th>Folio</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Tipo</th>
            <th>Entrega</th>
            <th className="text-end">Total</th>
            <th className="text-center">Estado</th>
            {alVerDetalle && <th className="text-center">Acción</th>}
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <FilaPedido
              key={pedido.folio}
              pedido={pedido}
              alVerDetalle={alVerDetalle}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TablaPedidos;
