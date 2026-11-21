import { Form } from 'react-bootstrap';

function CampoFormulario(props) {
  const tieneError = Boolean(props.error);
  const idCampo = props.identificador || props.id;
  const textoEtiqueta = props.etiqueta || props.label;
  const tipoCampo = props.type || props.tipo || 'text';
  const textoMarcador = props.placeholder || props.marcador || '';
  const valorCampo = props.valor !== undefined ? props.valor : (props.value !== undefined ? props.value : '');
  const manejadorCambio = props.alCambiar || props.onChange;
  const estaDeshabilitado = props.disabled !== undefined ? props.disabled : (props.deshabilitado || false);
  const modoAutocompletar = props.autoComplete || props.autocompletar || 'off';

  return (
    <Form.Group controlId={idCampo} className="mb-3 text-start">
      {textoEtiqueta && <Form.Label className="fw-semibold small mb-1">{textoEtiqueta}</Form.Label>}
      <Form.Control
        type={tipoCampo}
        placeholder={textoMarcador}
        value={valorCampo}
        onChange={manejadorCambio}
        isInvalid={tieneError}
        disabled={estaDeshabilitado}
        autoComplete={modoAutocompletar}
        className="py-2"
      />
      {tieneError ? (
        <Form.Control.Feedback type="invalid" className="d-block small mt-1">
          {props.error}
        </Form.Control.Feedback>
      ) : props.ayuda ? (
        <Form.Text className="text-muted small">{props.ayuda}</Form.Text>
      ) : null}
    </Form.Group>
  );
}

export default CampoFormulario;
