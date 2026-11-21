import { Badge } from 'react-bootstrap';

function Stock(props) {
  return (
    <Badge bg={props.variante || 'secondary'} className="px-2 py-1 fw-semibold">
      {props.texto}
    </Badge>
  );
}

export default Stock;