import Carrito from '../molecules/Carrito';
import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';

const ListaCarrito = ({
  elementos = [],
  alModificarCantidad,
  alEliminar,
  alVaciar,
  alIrAlCatalogo
}) => {
  if (elementos.length === 0) {
    return (
      <div className="bg-white p-5 rounded-4 shadow-sm text-center border">
        <div className="fs-1 mb-3">🛒</div>
        <h4 className="fw-bold text-dark mb-2">Tu carrito está vacío</h4>
        <p className="text-muted mb-4">
          Explora nuestro catálogo de materiales, herramientas y suministros para comenzar a comprar o cotizar.
        </p>
        <div className="d-inline-block ancho-maximo-240 w-100">
          <Boton
            texto="Explorar Catálogo"
            variante="warning"
            alHacerClic={alIrAlCatalogo}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-4 shadow-sm border">
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <div className="d-flex align-items-center gap-2">
          <h5 className="fw-bold text-dark mb-0">Artículos Seleccionados</h5>
          <Etiqueta variante="warning" esPildora={true}>
            {elementos.reduce((total, item) => total + item.cantidad, 0)} items
          </Etiqueta>
        </div>

        {alVaciar && (
          <div className="w-auto">
            <Boton
              texto="Vaciar carrito"
              variante="outline-danger"
              tamano="sm"
              alHacerClic={alVaciar}
              claseAdicional="px-3"
            />
          </div>
        )}
      </div>

      <div className="d-flex flex-column gap-2">
        {elementos.map((item) => (
          <Carrito
            key={item.producto.id}
            elemento={item}
            alModificarCantidad={alModificarCantidad}
            alEliminar={alEliminar}
          />
        ))}
      </div>
    </div>
  );
};

export default ListaCarrito;
