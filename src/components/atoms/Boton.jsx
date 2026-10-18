import React from 'react';
import { Button } from 'react-bootstrap';

const Boton = ({
  texto,
  children,
  tipo = 'button',
  type,
  variante = 'warning',
  variant,
  alHacerClic,
  onClick,
  deshabilitado = false,
  disabled,
  tamano,
  size,
  claseAdicional = ''
}) => {
  const claseFinal = claseAdicional ? `${claseAdicional} fw-bold` : 'w-100 fw-bold';

  return (
    <Button
      variant={variant || variante}
      type={type || tipo}
      onClick={alHacerClic || onClick}
      disabled={disabled || deshabilitado}
      size={size || tamano}
      className={claseFinal.trim()}
    >
      {texto || children}
    </Button>
  );
};

export default Boton;