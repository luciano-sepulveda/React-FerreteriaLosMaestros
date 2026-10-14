import React from 'react';
import { Button } from 'react-bootstrap';


const Boton = ({
  texto,
  tipo = 'button',
  type,
  variante = 'warning',
  variant,
  alHacerClic,
  onClick,
  deshabilitado = false,
  disabled
}) => {
  return (
    <Button
      variant={variant || variante}
      type={type || tipo}
      onClick={alHacerClic || onClick}
      disabled={disabled || deshabilitado}
      className="w-100 fw-bold"
    >
      {texto}
    </Button>
  );
};

export default Boton;