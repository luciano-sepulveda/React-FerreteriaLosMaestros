import { usuariosIniciales } from '../data/usuarios';

const CLAVE = 'ferreteria_usuarios';

function leer() {
  const guardado = localStorage.getItem(CLAVE);
  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(usuariosIniciales));
    return [...usuariosIniciales];
  }
  try {
    return JSON.parse(guardado);
  } catch {
    return [...usuariosIniciales];
  }
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function listarUsuarios() {
  return leer();
}

export function obtenerUsuario(id) {
  const idNum = Number(id);
  return leer().find((u) => u.id === idNum) ?? null;
}

export function obtenerUsuarioPorCorreo(correo) {
  if (!correo) return null;
  const correoNormalizado = correo.toLowerCase().trim();
  return leer().find((u) => (u.correo || '').toLowerCase().trim() === correoNormalizado) ?? null;
}

export function crearUsuario(datos) {
  const lista = leer();
  const nuevoId = Math.max(0, ...lista.map((u) => u.id)) + 1;
  const nuevo = { ...datos, id: nuevoId };
  guardar([...lista, nuevo]);
  return nuevo;
}

export function actualizarUsuario(id, cambios) {
  const idNum = Number(id);
  const lista = leer().map((u) => (u.id === idNum ? { ...u, ...cambios } : u));
  guardar(lista);
  return lista.find((u) => u.id === idNum) ?? null;
}
