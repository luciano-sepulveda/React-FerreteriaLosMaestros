import { Badge } from 'react-bootstrap';

function Descuento(props) {
  if (!props.porcentaje) return null;

  return (
    <Badge
      bg="danger"
      className={`px-2 py-1 fw-bold text-uppercase shadow-sm ${props.claseAdicional || ''}`.trim()}
    >
      -{props.porcentaje}% DCTO
    </Badge>
  );
}

export default Descuento;
