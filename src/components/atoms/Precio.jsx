import { formatearPrecio } from '../../utils/formatearPrecio';

function Precio(props) {
  return <p className="fw-bold fs-5 text-danger mb-2">{formatearPrecio(props.valor)}</p>;
}

export default Precio;