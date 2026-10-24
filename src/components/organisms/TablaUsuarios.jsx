import { Table } from 'react-bootstrap';
import FilaUsuario from '../molecules/FilaUsuario';

const TablaUsuarios = ({
  usuarios = [],
  alEditarUsuario,
  alVerHistorial
}) => {
  return (
    <div className="table-responsive">
      <Table hover className="align-middle small">
        <thead className="table-light">
          <tr>
            <th>Nombre</th>
            <th>RUT</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Perfil</th>
            <th>Razón Social</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usr) => (
            <FilaUsuario
              key={usr.id}
              usuario={usr}
              alEditar={alEditarUsuario}
              alVerHistorial={alVerHistorial}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TablaUsuarios;
