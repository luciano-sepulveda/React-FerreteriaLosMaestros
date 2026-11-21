import { formatearPrecio } from '../../utils/formatearPrecio';

export function FilaResumen(props) {
  const esTotal = props.esTotal || false;
  const esGratis = props.esGratis || false;

  return (
    <div
      className={`d-flex justify-content-between align-items-center py-2 ${
        esTotal ? 'border-top border-dark border-2 pt-3 mt-2' : 'border-bottom'
      }`}
    >
      <div>
        <span className={esTotal ? 'fw-bold fs-5 text-dark' : 'text-muted small'}>
          {props.etiqueta}
        </span>
        {props.textoSecundario && (
          <small className="d-block text-muted texto-tamano-chico">
            {props.textoSecundario}
          </small>
        )}
      </div>

      <div className="text-end">
        {esGratis ? (
          <span className="badge bg-success fw-bold">Gratis</span>
        ) : (
          <span
            className={
              esTotal
                ? 'fw-bold fs-4 text-danger'
                : props.varianteColor
                ? `fw-semibold ${props.varianteColor}`
                : 'fw-semibold text-dark'
            }
          >
            {formatearPrecio(props.valor)}
          </span>
        )}
      </div>
    </div>
  );
}

function ResumenTotal(props) {
  const subtotalNeto = props.subtotalNeto || 0;
  const montoIva = props.montoIva || 0;
  const totalPagar = props.totalPagar || 0;
  const costoEnvio = props.costoEnvio || 0;
  const esEnvioGratis = props.esEnvioGratis !== undefined ? props.esEnvioGratis : true;

  return (
    <div className="p-3 bg-white rounded-3 border shadow-sm">
      <h6 className="fw-bold text-dark border-bottom pb-2 mb-2">Desglose de Valores</h6>

      <FilaResumen
        etiqueta="Subtotal Neto"
        valor={subtotalNeto}
        textoSecundario="Sin impuestos (19% IVA)"
      />

      <FilaResumen
        etiqueta="IVA (19%)"
        valor={montoIva}
        textoSecundario="Impuesto al valor agregado"
      />

      <FilaResumen
        etiqueta="Entrega"
        valor={costoEnvio}
        esGratis={esEnvioGratis}
        textoSecundario={esEnvioGratis ? 'Retiro en tienda sin costo' : 'Despacho a faena'}
      />

      <FilaResumen
        etiqueta="Total a Pagar"
        valor={totalPagar + (esEnvioGratis ? 0 : costoEnvio)}
        esTotal={true}
      />

      {props.children}
    </div>
  );
}

export default ResumenTotal;
