import { productosIniciales } from '../data/productos';
import { verificarStockBajo } from '../utils/stockUtils';

const CLAVE = 'ferreteria_productos';

function leer() {
  const guardado = localStorage.getItem(CLAVE);
  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(productosIniciales));
    return [...productosIniciales];
  }
  try {
    const lista = JSON.parse(guardado);
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
  } catch {
    return [...productosIniciales];
  }
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function listarProductos() {
  return leer();
}

export function obtenerProducto(id) {
  const idNum = Number(id);
  return leer().find((p) => p.id === idNum) ?? null;
}

export function listarOfertas() {
  return leer().filter((p) => Boolean(p.enOferta));
}

export function listarCriticos() {
  return leer().filter((p) => verificarStockBajo(p.stock, p.stockMinimo));
}

export function crearProducto(datos) {
  const lista = leer();
  const nuevoId = Math.max(0, ...lista.map((p) => p.id)) + 1;
  const nuevo = { ...datos, id: nuevoId };
  guardar([...lista, nuevo]);
  return nuevo;
}

export function actualizarProducto(id, cambios) {
  const idNum = Number(id);
  const lista = leer().map((p) => (p.id === idNum ? { ...p, ...cambios } : p));
  guardar(lista);
  return lista.find((p) => p.id === idNum) ?? null;
}

export function eliminarProducto(id) {
  const idNum = Number(id);
  guardar(leer().filter((p) => p.id !== idNum));
}

export function reiniciarProductos() {
  localStorage.setItem(CLAVE, JSON.stringify(productosIniciales));
  return [...productosIniciales];
}
