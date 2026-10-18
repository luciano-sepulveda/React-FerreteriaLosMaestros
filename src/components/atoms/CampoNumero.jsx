import React from 'react';
import { Form } from 'react-bootstrap';

const CampoNumero = ({
  identificador,
  valor = 1,
  minimo = 1,
  maximo = 999,
  alCambiar,
  deshabilitado = false,
  nombre,
  claseAdicional = ''
}) => {
  const manejarCambio = (evento) => {
    if (alCambiar) {
      const nuevoValor = parseInt(evento.target.value, 10);
      alCambiar(isNaN(nuevoValor) ? minimo : nuevoValor);
    }
  };

  return (
    <Form.Control
      id={identificador}
      name={nombre}
      type="number"
      value={valor}
      min={minimo}
      max={maximo}
      onChange={manejarCambio}
      disabled={deshabilitado}
      className={`text-center fw-bold ${claseAdicional}`.trim()}
      style={{ maxWidth: '80px' }}
      aria-label="Cantidad seleccionada"
    />
  );
};

export default CampoNumero;
