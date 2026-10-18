import React from 'react';

const Especificacion = ({
  etiqueta,
  valor,
  claseAdicional = ''
}) => {
  return (
    <div className={`p-2 bg-light rounded border ${claseAdicional}`.trim()}>
      <span className="text-muted small d-block" style={{ fontSize: '0.75rem' }}>
        {etiqueta}
      </span>
      <span className="fw-semibold text-dark small">
        {valor || 'No especificado'}
      </span>
    </div>
  );
};

export default Especificacion;
