import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';

const FilaUsuario = ({
  usuario,
  alEditar,
  alVerHistorial
}) => {
  return (
    <tr>
      <td className="fw-semibold">{usuario.nombreCompleto}</td>
      <td>{usuario.rut}</td>
      <td>{usuario.correo}</td>
      <td>{usuario.telefono}</td>
      <td>
        <Etiqueta variante={usuario.rol === 'Administrador Bodega' ? 'dark' : usuario.rol?.includes('Crédito') ? 'warning' : 'secondary'}>
          {usuario.rol || 'Particular'}
        </Etiqueta>
      </td>
      <td>{usuario.razonSocial || 'Particular'}</td>
      <td className="text-center">
        <div className="d-inline-flex gap-1">
          {alEditar && (
            <Boton
              variante="outline-primary"
              tamano="sm"
              claseAdicional="py-1 px-2 w-auto"
              alHacerClic={() => alEditar(usuario)}
              texto="✏️"
            />
          )}
          {alVerHistorial && (
            <Boton
              variante="outline-secondary"
              tamano="sm"
              claseAdicional="py-1 px-2 w-auto"
              alHacerClic={() => alVerHistorial(usuario)}
              texto="📜 Historial"
            />
          )}
        </div>
      </td>
    </tr>
  );
};

export default FilaUsuario;
