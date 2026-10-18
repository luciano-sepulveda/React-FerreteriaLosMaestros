import { productosIniciales } from '../data/productos';

const CLAVE = 'ferreteria_productos';

function leer() {
  const guardado = localStorage.getItem(CLAVE);
  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(productosIniciales));
    return [...productosIniciales];
  }
  try {
    const lista = JSON.parse(guardado);
    // Sincronizar campos de ofertas si venían de version previa
    return lista.map((p) => {
      const inicial = productosIniciales.find((item) => item.id === p.id);
      if (inicial && inicial.enOferta && !p.enOferta) {
        return {
          ...p,
          enOferta: inicial.enOferta,
          porcentajeDescuento: inicial.porcentajeDescuento,
          precioAnterior: inicial.precioAnterior
        };
      }
      return p;
    });
  } catch (error) {
    console.error('Error al parsear productos desde localStorage:', error);
    return [...productosIniciales];
  }
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

// READ (todos los productos)
export function listarProductos() {
  return leer();
}

// READ (un producto por id)
export function obtenerProducto(id) {
  const idNum = Number(id);
  return leer().find((p) => p.id === idNum) ?? null;
}

// READ (productos en oferta)
export function listarOfertas() {
  return leer().filter((p) => Boolean(p.enOferta));
}

// READ (productos críticos con stock bajo)
export function listarCriticos() {
  return leer().filter((p) => p.stock <= p.stockMinimo);
}

// CREATE (crear producto)
export function crearProducto(datos) {
  const lista = leer();
  const nuevoId = Math.max(0, ...lista.map((p) => p.id)) + 1;
  const nuevo = { ...datos, id: nuevoId };
  guardar([...lista, nuevo]);
  return nuevo;
}

// UPDATE (actualizar producto)
export function actualizarProducto(id, cambios) {
  const idNum = Number(id);
  const lista = leer().map((p) => (p.id === idNum ? { ...p, ...cambios } : p));
  guardar(lista);
  return lista.find((p) => p.id === idNum) ?? null;
}

// DELETE (eliminar producto)
export function eliminarProducto(id) {
  const idNum = Number(id);
  guardar(leer().filter((p) => p.id !== idNum));
}

// REINICIAR (restablece los datos de partida)
export function reiniciarProductos() {
  localStorage.setItem(CLAVE, JSON.stringify(productosIniciales));
  return [...productosIniciales];
}
