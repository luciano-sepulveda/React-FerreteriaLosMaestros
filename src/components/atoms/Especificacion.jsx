
function Especificacion(props) {
  return (
    <div className={`p-2 bg-light rounded border ${props.claseAdicional || ''}`.trim()}>
      <span className="text-muted small d-block texto-tamano-chico">
        {props.etiqueta}
      </span>
      <span className="fw-semibold text-dark small">
        {props.valor || 'No especificado'}
      </span>
    </div>
  );
}

export default Especificacion;
