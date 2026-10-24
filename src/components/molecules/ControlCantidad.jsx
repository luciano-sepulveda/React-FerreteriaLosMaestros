import Boton from '../atoms/Boton';
import CampoNumero from '../atoms/CampoNumero';

const ControlCantidad = ({
  cantidad = 1,
  stockMaximo = 999,
  alCambiar,
  deshabilitado = false,
  tamano = 'sm'
}) => {
  const manejarDecrementar = () => {
    if (cantidad > 1 && alCambiar) {
      alCambiar(cantidad - 1);
    }
  };

  const manejarIncrementar = () => {
    if (cantidad < stockMaximo && alCambiar) {
      alCambiar(cantidad + 1);
    }
  };

  const manejarCambioDirecto = (nuevoValor) => {
    if (alCambiar) {
      const valorAjustado = Math.max(1, Math.min(nuevoValor, stockMaximo));
      alCambiar(valorAjustado);
    }
  };

  return (
    <div className="d-inline-flex align-items-center gap-1" role="group" aria-label="Control de cantidad">
      <Boton
        texto="-"
        variante="outline-secondary"
        tamano={tamano}
        alHacerClic={manejarDecrementar}
        deshabilitado={deshabilitado || cantidad <= 1}
        claseAdicional="px-2 py-1"
      />

      <CampoNumero
        valor={cantidad}
        minimo={1}
        maximo={stockMaximo}
        alCambiar={manejarCambioDirecto}
        deshabilitado={deshabilitado}
        claseAdicional="form-control-sm"
      />

      <Boton
        texto="+"
        variante="outline-secondary"
        tamano={tamano}
        alHacerClic={manejarIncrementar}
        deshabilitado={deshabilitado || cantidad >= stockMaximo}
        claseAdicional="px-2 py-1"
      />
    </div>
  );
};

export default ControlCantidad;
