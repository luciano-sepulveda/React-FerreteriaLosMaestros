import { Badge } from 'react-bootstrap';

function Etiqueta(props) {
  return (
    <Badge
      bg={props.variante || 'warning'}
      pill={props.esPildora || false}
      className={`px-2 py-1 fw-semibold ${props.claseAdicional || ''}`.trim()}
    >
      {props.texto || props.children}
    </Badge>
  );
}

export default Etiqueta;
