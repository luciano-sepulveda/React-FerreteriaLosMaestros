import React from 'react';
import { Card } from 'react-bootstrap';
import { formatearPrecio } from '../../utils/formatearPrecio';

export const FilaResumen = ({
  etiqueta,
  valor,
  esTotal = false,
  esGratis = false,
  textoSecundario = '',
  varianteColor = ''
}) => {
  return (
    <div
      className={`d-flex justify-content-between align-items-center py-2 ${
        esTotal ? 'border-top border-dark border-2 pt-3 mt-2' : 'border-bottom'
      }`}
    >
      <div>
        <span className={esTotal ? 'fw-bold fs-5 text-dark' : 'text-muted small'}>
          {etiqueta}
        </span>
        {textoSecundario && (
          <small className="d-block text-muted" style={{ fontSize: '0.75rem' }}>
            {textoSecundario}
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
                : varianteColor
                ? `fw-semibold ${varianteColor}`
                : 'fw-semibold text-dark'
            }
          >
            {formatearPrecio(valor)}
          </span>
        )}
      </div>
    </div>
  );
};

const ResumenTotal = ({
  subtotalNeto = 0,
  montoIva = 0,
  totalPagar = 0,
  costoEnvio = 0,
  esEnvioGratis = true,
  children
}) => {
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

      {children}
    </div>
  );
};

export default ResumenTotal;
