import { Badge } from 'react-bootstrap';

const Etiqueta = ({
  texto,
  children,
  variante = 'warning',
  esPildora = false,
  claseAdicional = ''
}) => {
  return (
    <Badge
      bg={variante}
      pill={esPildora}
      className={`px-2 py-1 fw-semibold ${claseAdicional}`.trim()}
    >
      {texto || children}
    </Badge>
  );
};

export default Etiqueta;
