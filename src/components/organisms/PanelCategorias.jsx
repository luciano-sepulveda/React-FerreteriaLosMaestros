import Boton from '../atoms/Boton';
import FormularioCategoria from './FormularioCategoria';
import TablaCategorias from './TablaCategorias';

function PanelCategorias(props) {
  const categorias = props.categorias || [];

  return (
    <div className="bg-white p-4 rounded-4 shadow-sm border">
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <div>
          <h5 className="fw-bold text-dark mb-0">Gestión de Categorías</h5>
          <small className="text-muted">Clasificación de productos del catálogo.</small>
        </div>
        <Boton
          variante="warning"
          tamano="sm"
          claseAdicional="w-auto px-3 fw-bold"
          alHacerClic={props.alNuevaCategoria}
          texto="Nueva Categoría"
        />
      </div>

      {props.mostrarFormularioCategoria && (
        <FormularioCategoria
          categoriaAEditar={props.categoriaEditando}
          alGuardar={props.alGuardarCategoria}
          alCancelar={props.alCancelarCategoria}
        />
      )}

      <TablaCategorias
        categorias={categorias}
        alEditarCategoria={props.alEditarCategoria}
      />
    </div>
  );
}

export default PanelCategorias;
