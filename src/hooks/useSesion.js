import { useContext } from 'react';
import { SesionContext } from '../context/SesionContexto';

const useSesion = () => {
  const contexto = useContext(SesionContext);
  if (!contexto) {
    throw new Error('useSesion debe ser utilizado dentro de un SesionProvider');
  }
  return contexto;
};

export default useSesion;
