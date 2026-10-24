import { Card, Form } from 'react-bootstrap';
import ResumenTotal from '../molecules/ResumenTotal';
import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';

const ResumenTotales = ({
  subtotalNeto = 0,
  montoIva = 0,
  totalPagar = 0,
  tipoEntrega = 'retiro',
  alCambiarTipoEntrega,
  costoDespacho = 4990,
  alProcederCompra,
  alGenerarCotizacion,
  deshabilitado = false
}) => {
  const esEnvio = tipoEntrega === 'despacho';
  const totalConEnvio = totalPagar + (esEnvio ? costoDespacho : 0);

  return (
    <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
      <Card.Header className="bg-dark text-white py-3">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0 text-warning">Resumen del Pedido</h5>
          <Etiqueta variante="warning" esPildora={true} claseAdicional="text-dark">
            Valores Totales
          </Etiqueta>
        </div>
      </Card.Header>

      <Card.Body className="p-3 p-md-4">
        {/* Selector de modo de entrega */}
        <div className="mb-3 p-3 bg-light rounded-3 border">
          <label className="fw-bold small text-dark d-block mb-2">Método de Entrega:</label>
          <Form.Check
            type="radio"
            id="entrega-retiro"
            name="tipoEntrega"
            label="🏪 Retiro en sucursal La Serena (Gratis)"
            checked={tipoEntrega === 'retiro'}
            onChange={() => alCambiarTipoEntrega && alCambiarTipoEntrega('retiro')}
            className="small mb-2"
          />
          <Form.Check
            type="radio"
            id="entrega-despacho"
            name="tipoEntrega"
            label="🚚 Despacho a faena / obra (+$4.990)"
            checked={tipoEntrega === 'despacho'}
            onChange={() => alCambiarTipoEntrega && alCambiarTipoEntrega('despacho')}
            className="small"
          />
        </div>

        {/* Molécula con desglose neto, iva y total */}
        <ResumenTotal
          subtotalNeto={subtotalNeto}
          montoIva={montoIva}
          totalPagar={totalConEnvio}
          costoEnvio={costoDespacho}
          esEnvioGratis={!esEnvio}
        />

        {/* Acciones principales: Comprar o Cotizar */}
        <div className="d-flex flex-column gap-2 mt-4">
          <Boton
            texto="💳 Proceder a la Compra"
            variante="warning"
            alHacerClic={alProcederCompra}
            deshabilitado={deshabilitado || totalPagar <= 0}
          />

          <Boton
            texto="📄 Generar Cotización Formal"
            variante="outline-dark"
            alHacerClic={alGenerarCotizacion}
            deshabilitado={deshabilitado || totalPagar <= 0}
          />
        </div>

        <small className="text-muted d-block text-center mt-3" style={{ fontSize: '0.75rem' }}>
          🔒 Transacción protegida. Emisión de boleta o factura con RUT para contratistas.
        </small>
      </Card.Body>
    </Card>
  );
};

export default ResumenTotales;
