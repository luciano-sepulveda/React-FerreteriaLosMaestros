import { Badge } from 'react-bootstrap';

const Descuento = ({
  porcentaje,
  claseAdicional = ''
}) => {
  if (!porcentaje) return null;

  return (
    <Badge
      bg="danger"
      className={`px-2 py-1 fw-bold text-uppercase shadow-sm ${claseAdicional}`.trim()}
    >
      -{porcentaje}% DCTO
    </Badge>
  );
};

export default Descuento;
