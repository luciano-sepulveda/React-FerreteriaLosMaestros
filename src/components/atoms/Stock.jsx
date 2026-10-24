import { Badge } from 'react-bootstrap';

const Stock = ({ texto, variante = 'secondary' }) => {
  return (
    <Badge bg={variante} className="px-2 py-1 fw-semibold">
      {texto}
    </Badge>
  );
};

export default Stock;