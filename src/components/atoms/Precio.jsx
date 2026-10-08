import React from 'react';
import { formatearPrecio } from '../../utils/formatearPrecio';

const Precio = ({ valor }) => {
  return <p className="fw-bold fs-5 text-danger mb-2">{formatearPrecio(valor)}</p>;
};

export default Precio;