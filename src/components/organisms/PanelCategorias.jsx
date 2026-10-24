import Boton from '../atoms/Boton';
import FormularioCategoria from './FormularioCategoria';
import TablaCategorias from './TablaCategorias';

const PanelCategorias = ({
  categorias = [],
  mostrarFormularioCategoria,
  categoriaEditando,
  alNuevaCategoria,
  alGuardarCategoria,
  alCancelarCategoria,
  alEditarCategoria
}) => {
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
          alHacerClic={alNuevaCategoria}
          texto="➕ Nueva Categoría"
        />
      </div>

      {mostrarFormularioCategoria && (
        <FormularioCategoria
          categoriaAEditar={categoriaEditando}
          alGuardar={alGuardarCategoria}
          alCancelar={alCancelarCategoria}
        />
      )}

      <TablaCategorias
        categorias={categorias}
        alEditarCategoria={alEditarCategoria}
      />
    </div>
  );
};

export default PanelCategorias;
