import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';

const FilaCategoria = ({
  categoria,
  alEditar
}) => {
  return (
    <tr>
      <td>
        <Etiqueta variante="light">{categoria}</Etiqueta>
      </td>
      <td className="text-end">
        <Boton
          variante="outline-primary"
          tamano="sm"
          claseAdicional="py-1 px-2 w-auto"
          alHacerClic={() => alEditar && alEditar(categoria)}
          texto="✏️ Editar"
        />
      </td>
    </tr>
  );
};

export default FilaCategoria;
