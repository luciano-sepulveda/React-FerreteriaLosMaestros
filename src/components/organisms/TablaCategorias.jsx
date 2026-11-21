import { Table } from 'react-bootstrap';
import FilaCategoria from '../molecules/FilaCategoria';

function TablaCategorias(props) {
  const categorias = props.categorias || [];

  return (
    <div className="table-responsive">
      <Table hover className="align-middle small">
        <thead className="table-light">
          <tr>
            <th>Nombre de Categoría</th>
            <th className="text-end">Acción</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat) => (
            <FilaCategoria
              key={cat}
              categoria={cat}
              alEditar={props.alEditarCategoria}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TablaCategorias;
