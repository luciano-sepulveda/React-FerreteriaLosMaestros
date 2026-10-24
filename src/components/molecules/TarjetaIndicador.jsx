import { Card } from 'react-bootstrap';

const TarjetaIndicador = ({
  titulo,
  valor,
  detalle,
  variante = 'warning',
  alHacerClic
}) => {
  return (
    <Card
      className={`border-0 shadow-sm rounded-4 p-3 bg-white border-start border-${variante} border-4 ${alHacerClic ? 'cursor-puntero' : ''}`}
      onClick={alHacerClic}
    >
      <span className="text-muted small">{titulo}</span>
      <h3 className={`fw-bold text-${variante === 'warning' ? 'dark' : variante} mt-1 mb-1`}>
        {valor}
      </h3>
      {detalle && <small className="text-secondary">{detalle}</small>}
    </Card>
  );
};

export default TarjetaIndicador;
