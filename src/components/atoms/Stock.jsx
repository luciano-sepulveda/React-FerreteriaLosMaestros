import React from 'react';
import { Badge } from 'react-bootstrap';

const Stock = ({ texto, bg = 'secondary' }) => {
  return <Badge bg={bg}>{texto}</Badge>;
};

export default Stock;