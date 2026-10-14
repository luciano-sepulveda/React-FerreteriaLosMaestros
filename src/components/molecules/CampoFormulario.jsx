import React from 'react';
import { Form } from 'react-bootstrap';

const CampoFormulario = ({
  id,
  identificador,
  etiqueta,
  label,
  tipo = 'text',
  type,
  marcador = '',
  placeholder = '',
  valor,
  value,
  alCambiar,
  onChange,
  error = '',
  deshabilitado = false,
  disabled,
  autocompletar = 'off',
  autoComplete,
  ayuda = ''
}) => {
  const tieneError = Boolean(error);
  const idCampo = identificador || id;
  const textoEtiqueta = etiqueta || label;
  const tipoCampo = type || tipo;
  const textoMarcador = placeholder || marcador;
  const valorCampo = valor !== undefined ? valor : value;
  const manejadorCambio = alCambiar || onChange;
  const estaDeshabilitado = disabled !== undefined ? disabled : deshabilitado;
  const modoAutocompletar = autoComplete || autocompletar;

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
          {error}
        </Form.Control.Feedback>
      ) : ayuda ? (
        <Form.Text className="text-muted small">{ayuda}</Form.Text>
      ) : null}
    </Form.Group>
  );
};

export default CampoFormulario;
