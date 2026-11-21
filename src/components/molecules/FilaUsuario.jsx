import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';

function FilaUsuario(props) {
  return (
    <tr>
      <td className="fw-semibold">{props.usuario.nombreCompleto}</td>
      <td>{props.usuario.rut}</td>
      <td>{props.usuario.correo}</td>
      <td>{props.usuario.telefono}</td>
      <td>
        <Etiqueta variante={props.usuario.rol === 'Administrador Bodega' ? 'dark' : props.usuario.rol?.includes('Crédito') ? 'warning' : 'secondary'}>
          {props.usuario.rol || 'Particular'}
        </Etiqueta>
      </td>
      <td>{props.usuario.razonSocial || 'Particular'}</td>
      <td className="text-center">
        <div className="d-inline-flex gap-1">
          {props.alEditar && (
            <Boton
              variante="outline-primary"
              tamano="sm"
              claseAdicional="py-1 px-2 w-auto"
              alHacerClic={() => props.alEditar(props.usuario)}
              texto="✏️"
            />
          )}
          {props.alVerHistorial && (
            <Boton
              variante="outline-secondary"
              tamano="sm"
              claseAdicional="py-1 px-2 w-auto"
              alHacerClic={() => props.alVerHistorial(props.usuario)}
              texto="📜 Historial"
            />
          )}
        </div>
      </td>
    </tr>
  );
}

export default FilaUsuario;
