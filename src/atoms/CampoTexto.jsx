import React from 'react';
import { Form } from 'react-bootstrap';

const CampoTexto = ({ label, type, placeholder, value, onChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-semibold">{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </Form.Group>
  );
};

export default CampoTexto;