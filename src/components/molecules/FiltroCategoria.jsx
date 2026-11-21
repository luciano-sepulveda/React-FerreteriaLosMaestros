import Boton from '../atoms/Boton';

function FiltroCategoria(props) {
  const listaCategorias = props.categorias || [];

  return (
    <div className="d-flex flex-wrap gap-2 mb-4">
      <Boton
        tipo="button"
        variante={!props.categoriaSeleccionada ? 'dark' : 'outline-secondary'}
        tamano="sm"
        claseAdicional="w-auto px-3"
        alHacerClic={() => props.alSeleccionarCategoria && props.alSeleccionarCategoria('')}
        texto="Todas las categorías"
      />

      {listaCategorias.map((categoria) => {
        const estaActiva = props.categoriaSeleccionada === categoria;
        return (
          <Boton
            key={categoria}
            tipo="button"
            variante={estaActiva ? 'warning' : 'outline-secondary'}
            tamano="sm"
            claseAdicional={`w-auto px-3 ${estaActiva ? 'text-dark' : ''}`}
            alHacerClic={() => props.alSeleccionarCategoria && props.alSeleccionarCategoria(categoria)}
            texto={categoria}
          />
        );
      })}
    </div>
  );
}

export default FiltroCategoria;
