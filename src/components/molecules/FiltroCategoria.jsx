import Boton from '../atoms/Boton';

const FiltroCategoria = ({
  categoriaSeleccionada,
  categorias = [],
  alSeleccionarCategoria
}) => {
  return (
    <div className="d-flex flex-wrap gap-2 mb-4">
      <Boton
        tipo="button"
        variante={!categoriaSeleccionada ? 'dark' : 'outline-secondary'}
        tamano="sm"
        claseAdicional="w-auto px-3"
        alHacerClic={() => alSeleccionarCategoria && alSeleccionarCategoria('')}
        texto="Todas las categorías"
      />

      {categorias.map((categoria) => {
        const estaActiva = categoriaSeleccionada === categoria;
        return (
          <Boton
            key={categoria}
            tipo="button"
            variante={estaActiva ? 'warning' : 'outline-secondary'}
            tamano="sm"
            claseAdicional={`w-auto px-3 ${estaActiva ? 'text-dark' : ''}`}
            alHacerClic={() => alSeleccionarCategoria && alSeleccionarCategoria(categoria)}
            texto={categoria}
          />
        );
      })}
    </div>
  );
};

export default FiltroCategoria;
