import React from 'react';
import { CATEGORIAS } from '../../data/productos';


const FiltroCategoria = ({ categoriaSeleccionada, alSeleccionarCategoria, onSeleccionarCategoria }) => {
  const manejadorSeleccion = alSeleccionarCategoria || onSeleccionarCategoria;

  return (
    <div className="d-flex flex-wrap gap-2 mb-4">
      <button
        type="button"
        className={`btn btn-sm ${!categoriaSeleccionada ? 'btn-dark fw-bold' : 'btn-outline-secondary'}`}
        onClick={() => manejadorSeleccion && manejadorSeleccion('')}
      >
        Todas las categorías
      </button>

      {CATEGORIAS.map((categoria) => {
        const estaActiva = categoriaSeleccionada === categoria;
        return (
          <button
            key={categoria}
            type="button"
            className={`btn btn-sm ${estaActiva ? 'btn-warning fw-bold text-dark' : 'btn-outline-secondary'}`}
            onClick={() => manejadorSeleccion && manejadorSeleccion(categoria)}
          >
            {categoria}
          </button>
        );
      })}
    </div>
  );
};

export default FiltroCategoria;
