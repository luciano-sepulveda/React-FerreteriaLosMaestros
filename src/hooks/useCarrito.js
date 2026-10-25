import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContexto';

const useCarrito = () => {
  const contexto = useContext(CarritoContext);
  if (!contexto) {
    throw new Error('useCarrito debe ser utilizado dentro de un CarritoProvider');
  }
  return contexto;
};

export default useCarrito;
