import { Row, Col, Card, Table } from 'react-bootstrap';
import TarjetaIndicador from '../molecules/TarjetaIndicador';
import Etiqueta from '../atoms/Etiqueta';
import { formatearPrecio } from '../../utils/formatearPrecio';

const PanelReportes = ({
  conteoPedidos = { compras: 0, cotizaciones: 0, total: 0 },
  montoTotalCompras = 0,
  productosMasSolicitados = []
}) => {
  return (
    <div>
      <Row className="g-3 mb-4">
        <Col sm={6} lg={3}>
          <TarjetaIndicador
            titulo="Monto Total Ventas"
            valor={formatearPrecio(montoTotalCompras)}
            detalle="Compras confirmadas con IVA"
            variante="success"
          />
        </Col>

        <Col sm={6} lg={3}>
          <TarjetaIndicador
            titulo="Total de Compras"
            valor={`${conteoPedidos.compras} pedidos`}
            detalle="Órdenes cerradas y pagadas"
            variante="primary"
          />
        </Col>

        <Col sm={6} lg={3}>
          <TarjetaIndicador
            titulo="Total Cotizaciones"
            valor={`${conteoPedidos.cotizaciones} docs`}
            detalle="Propuestas formales activas"
            variante="warning"
          />
        </Col>

        <Col sm={6} lg={3}>
          <TarjetaIndicador
            titulo="Total Transacciones"
            valor={`${conteoPedidos.total} registros`}
            detalle="Flujo global de la tienda"
            variante="info"
          />
        </Col>
      </Row>

      <Card className="border-0 shadow-sm rounded-4 p-4 bg-white">
        <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">
          Top 5 Productos Más Solicitados
        </h5>

        {productosMasSolicitados.length === 0 ? (
          <p className="text-muted small mb-0">No hay movimientos suficientes para generar el ranking.</p>
        ) : (
          <div className="table-responsive">
            <Table hover className="align-middle small">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Código</th>
                  <th>Producto</th>
                  <th className="text-end">Cantidad Total Solicitada</th>
                </tr>
              </thead>
              <tbody>
                {productosMasSolicitados.map((item, index) => (
                  <tr key={item.id}>
                    <td>
                      <Etiqueta variante={index === 0 ? 'warning' : 'light'} esPildora={true}>
                        #{index + 1}
                      </Etiqueta>
                    </td>
                    <td>
                      <Etiqueta variante="light">{item.codigo}</Etiqueta>
                    </td>
                    <td className="fw-semibold">{item.nombre}</td>
                    <td className="text-end fw-bold text-dark">
                      {item.cantidadAcumulada} unidades
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PanelReportes;
