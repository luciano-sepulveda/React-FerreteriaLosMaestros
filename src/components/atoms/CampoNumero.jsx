import { Form } from 'react-bootstrap';

function CampoNumero(props) {
  const valorMinimo = props.minimo !== undefined ? props.minimo : 1;
  const valorMaximo = props.maximo !== undefined ? props.maximo : 999;
  const valorActual = props.valor !== undefined ? props.valor : 1;

  const manejarCambio = (evento) => {
    if (props.alCambiar) {
      const nuevoValor = parseInt(evento.target.value, 10);
      props.alCambiar(isNaN(nuevoValor) ? valorMinimo : nuevoValor);
    }
  };

  return (
    <Form.Control
      id={props.identificador}
      name={props.nombre}
      type="number"
      value={valorActual}
      min={valorMinimo}
      max={valorMaximo}
      onChange={manejarCambio}
      disabled={props.deshabilitado || false}
      className={`text-center fw-bold ancho-maximo-80 ${props.claseAdicional || ''}`.trim()}
      aria-label="Cantidad seleccionada"
    />
  );
}

export default CampoNumero;
