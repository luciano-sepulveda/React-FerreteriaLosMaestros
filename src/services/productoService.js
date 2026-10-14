import { productosIniciales } from '../data/productos';

const CLAVE = 'ferreteria_productos';

function leer() {
  const guardado = localStorage.getItem(CLAVE);
  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(productosIniciales));
    return [...productosIniciales];
  }
  try {
    return JSON.parse(guardado);
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
