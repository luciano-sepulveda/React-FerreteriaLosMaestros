import { Table } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import FilaProducto from '../molecules/FilaProducto';

const TablaInventario = ({
  productos = [],
  filtroTexto = '',
  alCambiarFiltro,
  alNuevoProducto,
  alEditarProducto,
  alEliminarProducto
}) => {
  return (
    <div className="bg-white p-4 rounded-4 shadow-sm border">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div className="ancho-maximo-320">
          <CampoFormulario
            tipo="search"
            marcador="Buscar por código, nombre o categoría..."
            valor={filtroTexto}
            alCambiar={(e) => alCambiarFiltro(e.target.value)}
          />
        </div>

        <Boton
          variante="warning"
          tamano="sm"
          claseAdicional="w-auto px-3 fw-bold"
          alHacerClic={alNuevoProducto}
          texto="➕ Agregar Producto"
        />
      </div>

      <div className="table-responsive">
        <Table hover bordered className="align-middle small">
          <thead className="table-dark">
            <tr>
              <th>Código</th>
              <th>Nombre del Producto</th>
              <th>Categoría</th>
              <th>Marca</th>
              <th className="text-end">Precio Venta</th>
              <th className="text-center">Stock</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((item) => (
              <FilaProducto
                key={item.id}
                producto={item}
                alEditar={alEditarProducto}
                alEliminar={alEliminarProducto}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TablaInventario;
