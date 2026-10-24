import { Card, Table, Row, Col } from 'react-bootstrap';
import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';
import { FilaResumen } from '../molecules/ResumenTotal';
import { formatearPrecio } from '../../utils/formatearPrecio';

const ComprobanteCompra = ({
  orden,
  alVolverAlCatalogo,
  textoVolver = '← Volver al Catálogo'
}) => {
  if (!orden) return null;

  const esCotizacion = Boolean(orden.esCotizacion);
  const folio = orden.folio || (esCotizacion ? 'COT-000001' : 'ORD-000001');

  const manejarImprimir = () => {
    window.print();
  };

  return (
    <Card className="border-0 shadow-lg rounded-4 overflow-hidden my-3">
      <Card.Header className="bg-dark text-white p-4 border-bottom border-warning border-3">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="fs-4">🔨</span>
              <h4 className="fw-bold text-warning mb-0">Ferretería Los Maestros</h4>
            </div>
            <small className="text-light opacity-75">
              RUT: 76.543.210-K · Casa Matriz: Balmaceda 1420, La Serena · Fono: +56 51 222 3344
            </small>
          </div>

          <div className="text-end">
            <Etiqueta variante={esCotizacion ? 'info' : 'success'} esPildora={true} claseAdicional="fs-6 px-3 py-2">
              {esCotizacion ? 'Documento de Cotización' : '✓ Compra Aprobada'}
            </Etiqueta>
            <div className="fw-bold text-white mt-1">Folio: #{folio}</div>
            <small className="text-light opacity-75 d-block">{orden.fecha}</small>
          </div>
        </div>
      </Card.Header>

      <Card.Body className="p-4">
        <div className={`p-3 rounded-3 mb-4 text-center ${esCotizacion ? 'bg-light text-dark border' : 'bg-success bg-opacity-10 text-success border border-success'}`}>
          <h5 className="fw-bold mb-1">
            {esCotizacion ? '📄 Cotización Generada con Éxito' : '🎉 ¡Gracias por tu compra! Tu pedido ha sido registrado'}
          </h5>
          <p className="mb-0 small">
            {esCotizacion
              ? 'Esta cotización tiene una validez de 15 días corridos y reserva de stock sujeta a confirmación.'
              : `Hemos enviado el detalle y boleta electrónica a ${orden.correo || 'tu correo registrado'}.`}
          </p>
        </div>

        <Row className="mb-4 g-3">
          <Col md={6}>
            <div className="p-3 bg-light rounded-3 h-100 border">
              <h6 className="fw-bold text-dark border-bottom pb-2 mb-2">Datos del Cliente</h6>
              <p className="small mb-1"><strong>Nombre:</strong> {orden.nombreCompleto || 'Cliente Particular'}</p>
              <p className="small mb-1"><strong>RUT:</strong> {orden.rut || 'No especificado'}</p>
              <p className="small mb-1"><strong>Correo:</strong> {orden.correo || 'No especificado'}</p>
              <p className="small mb-0"><strong>Teléfono:</strong> {orden.telefono || 'No especificado'}</p>
            </div>
          </Col>

          <Col md={6}>
            <div className="p-3 bg-light rounded-3 h-100 border">
              <h6 className="fw-bold text-dark border-bottom pb-2 mb-2">Modalidad de Entrega y Pago</h6>
              <p className="small mb-1">
                <strong>Entrega:</strong>{' '}
                {orden.tipoEntrega === 'despacho'
                  ? `🚚 Despacho a obra: ${orden.direccionEntrega || ''}, ${orden.comuna || 'La Serena'}`
                  : '🏪 Retiro en sucursal La Serena (Balmaceda 1420)'}
              </p>
              <p className="small mb-1">
                <strong>Medio de pago:</strong>{' '}
                {orden.medioPago === 'webpay'
                  ? 'Webpay / Débito y Crédito'
                  : orden.medioPago === 'cuentacorriente'
                  ? 'Cuenta Corriente Contratista (30 días)'
                  : 'Transferencia Bancaria Electrónica'}
              </p>
              <p className="small mb-0">
                <strong>Tipo Documento:</strong> {orden.tipoCliente === 'contratista' ? 'Factura Electrónica' : 'Boleta Electrónica'}
              </p>
            </div>
          </Col>
        </Row>

        <h6 className="fw-bold text-dark mb-2">Detalle de Productos</h6>
        <div className="table-responsive mb-3">
          <Table bordered hover className="align-middle small">
            <thead className="table-dark">
              <tr>
                <th>Código</th>
                <th>Producto</th>
                <th className="text-center">Cant.</th>
                <th className="text-end">Precio Unit. (IVA inc.)</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orden.items && orden.items.map((item) => (
                <tr key={item.producto?.id || item.codigo}>
                  <td>
                    <Etiqueta variante="light" claseAdicional="border">
                      {item.producto?.codigo || item.codigo}
                    </Etiqueta>
                  </td>
                  <td>
                    <strong>{item.producto?.nombre || item.nombre}</strong>
                    <span className="d-block text-muted">
                      {item.producto?.marca || ''} · {item.producto?.categoria || ''}
                    </span>
                  </td>
                  <td className="text-center fw-bold">{item.cantidad}</td>
                  <td className="text-end">{formatearPrecio(item.producto?.precioVenta || item.precioVenta || 0)}</td>
                  <td className="text-end fw-bold text-dark">{formatearPrecio(item.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="row justify-content-end mb-4">
          <div className="col-md-6 col-lg-5">
            <div className="p-3 bg-light rounded-3 border">
              <FilaResumen etiqueta="Subtotal Neto" valor={orden.subtotalNeto || 0} />
              <FilaResumen etiqueta="IVA (19%)" valor={orden.montoIva || 0} />
              {orden.costoDespacho > 0 && (
                <FilaResumen etiqueta="Despacho a faena" valor={orden.costoDespacho} />
              )}
              <FilaResumen etiqueta="Valor Total a Pagar" valor={orden.totalPagar || 0} esTotal={true} />
            </div>
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2 justify-content-between pt-3 border-top">
          <div className="ancho-minimo-180">
            <Boton
              texto="🖨️ Imprimir / Guardar PDF"
              variante="outline-dark"
              alHacerClic={manejarImprimir}
              claseAdicional="px-3"
            />
          </div>

          <div className="ancho-minimo-220">
            <Boton
              texto={textoVolver}
              variante="warning"
              alHacerClic={alVolverAlCatalogo}
              claseAdicional="px-4"
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ComprobanteCompra;
