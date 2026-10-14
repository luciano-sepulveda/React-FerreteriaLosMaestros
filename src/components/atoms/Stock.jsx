import React from 'react';
import { Badge } from 'react-bootstrap';
import { obtenerEstadoStock } from '../../utils/stockUtils';

const Stock = ({ texto, fondo, bg, stock, stockMinimo }) => {
  if (typeof stock === 'number' && typeof stockMinimo === 'number') {
    const estado = obtenerEstadoStock(stock, stockMinimo);
    return (
      <Badge bg={estado.variante} className="px-2 py-1 fw-semibold">
        {estado.texto}
      </Badge>
    );
  }

  return <Badge bg={bg || fondo || 'secondary'} className="px-2 py-1 fw-semibold">{texto}</Badge>;
};

export default Stock;