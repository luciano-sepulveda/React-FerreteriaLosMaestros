import { Badge } from 'react-bootstrap';

const Etiqueta = ({
  texto,
  children,
  variante = 'warning',
  fondo,
  bg,
  esPildora = false,
  claseAdicional = ''
}) => {
  const colorFondo = bg || fondo || variante;
  return (
    <Badge
      bg={colorFondo}
      pill={esPildora}
      className={`px-2 py-1 fw-semibold ${claseAdicional}`.trim()}
    >
      {texto || children}
    </Badge>
  );
};

export default Etiqueta;
