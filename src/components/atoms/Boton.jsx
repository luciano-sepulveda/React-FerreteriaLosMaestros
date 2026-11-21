import { Button } from 'react-bootstrap';

function Boton(props) {
  const claseFinal = props.claseAdicional ? `${props.claseAdicional} fw-bold` : 'w-100 fw-bold';

  return (
    <Button
      variant={props.variant || props.variante || 'warning'}
      type={props.type || props.tipo || 'button'}
      onClick={props.alHacerClic || props.onClick}
      disabled={props.disabled !== undefined ? props.disabled : (props.deshabilitado || false)}
      size={props.size || props.tamano}
      className={claseFinal.trim()}
    >
      {props.texto || props.children}
    </Button>
  );
}

export default Boton;