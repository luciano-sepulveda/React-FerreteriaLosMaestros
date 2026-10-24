import { CATEGORIAS } from '../data/productos';
import { listarProductos, actualizarProducto } from './productoService';

const CLAVE = 'ferreteria_categorias';

function leer() {
  const guardado = localStorage.getItem(CLAVE);
  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(CATEGORIAS));
    return [...CATEGORIAS];
  }
  try {
    return JSON.parse(guardado);
  } catch {
    return [...CATEGORIAS];
  }
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function listarCategorias() {
  return leer();
}

export function crearCategoria(nombre) {
  if (!nombre || !nombre.trim()) {
    throw new Error('El nombre de la categoría es obligatorio.');
  }

  const nombreLimpio = nombre.trim();
  const lista = leer();
  const existe = lista.some((cat) => cat.toLowerCase() === nombreLimpio.toLowerCase());

  if (existe) {
    throw new Error('La categoría ya existe.');
  }

  const nuevaLista = [...lista, nombreLimpio];
  guardar(nuevaLista);
  return nuevaLista;
}

export function actualizarCategoria(nombreActual, nombreNuevo) {
  if (!nombreNuevo || !nombreNuevo.trim()) {
    throw new Error('El nuevo nombre de la categoría es obligatorio.');
  }

  const nombreActualLimpio = nombreActual.trim();
  const nombreNuevoLimpio = nombreNuevo.trim();
  const lista = leer();

  if (nombreActualLimpio.toLowerCase() !== nombreNuevoLimpio.toLowerCase()) {
    const existe = lista.some((cat) => cat.toLowerCase() === nombreNuevoLimpio.toLowerCase());
    if (existe) {
      throw new Error('Ya existe una categoría con ese nombre.');
    }
  }

  const nuevaLista = lista.map((cat) => (cat === nombreActualLimpio ? nombreNuevoLimpio : cat));
  guardar(nuevaLista);

  const productos = listarProductos();
  productos.forEach((p) => {
    if (p.categoria === nombreActualLimpio) {
      actualizarProducto(p.id, { categoria: nombreNuevoLimpio });
    }
  });

  return nuevaLista;
}
