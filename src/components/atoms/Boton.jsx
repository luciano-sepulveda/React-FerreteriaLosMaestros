import React from 'react';
import { Button } from 'react-bootstrap';

const Boton = ({ texto, type = 'button', variant = 'warning', onClick }) => {
  return (
    <Button variant={variant} type={type} onClick={onClick} className="w-100 fw-bold">
      {texto}
    </Button>
  );
};

export default Boton;