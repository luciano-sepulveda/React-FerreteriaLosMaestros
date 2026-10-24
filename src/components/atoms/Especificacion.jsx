
const Especificacion = ({
  etiqueta,
  valor,
  claseAdicional = ''
}) => {
  return (
    <div className={`p-2 bg-light rounded border ${claseAdicional}`.trim()}>
      <span className="text-muted small d-block texto-tamano-chico">
        {etiqueta}
      </span>
      <span className="fw-semibold text-dark small">
        {valor || 'No especificado'}
      </span>
    </div>
  );
};

export default Especificacion;
