import { Card } from 'react-bootstrap';

function TarjetaIndicador(props) {
  const variante = props.variante || 'warning';

  return (
    <Card
      className={`border-0 shadow-sm rounded-4 p-3 bg-white border-start border-${variante} border-4 ${props.alHacerClic ? 'cursor-puntero' : ''}`}
      onClick={props.alHacerClic}
    >
      <span className="text-muted small">{props.titulo}</span>
      <h3 className={`fw-bold text-${variante === 'warning' ? 'dark' : variante} mt-1 mb-1`}>
        {props.valor}
      </h3>
      {props.detalle && <small className="text-secondary">{props.detalle}</small>}
    </Card>
  );
}

export default TarjetaIndicador;
