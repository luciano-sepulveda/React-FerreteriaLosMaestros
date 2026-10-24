const CLAVE = 'ferreteria_pedidos';

function leer() {
  const guardado = localStorage.getItem(CLAVE);
  if (!guardado) {
    return [];
  }
  try {
    return JSON.parse(guardado);
  } catch {
    return [];
  }
}

function guardar(lista) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
  } catch (error) {
    throw new Error('No se pudo guardar el pedido: ' + error.message, { cause: error });
  }
}

export function listarPedidos() {
  return leer();
}

export function obtenerPedido(folio) {
  return leer().find((p) => p.folio === folio) ?? null;
}

export function listarPedidosPorCorreo(correo) {
  if (!correo) return [];
  const correoMinusculas = correo.toLowerCase().trim();
  return leer().filter((p) => (p.correo || '').toLowerCase().trim() === correoMinusculas);
}

export function crearPedido(datos) {
  if (!datos || !datos.items || !Array.isArray(datos.items) || datos.items.length === 0) {
    throw new Error('El pedido debe incluir al menos un ítem.');
  }

  const lista = leer();
  const nuevoPedido = {
    ...datos,
    estado: 'En preparación'
  };

  guardar([...lista, nuevoPedido]);
  return nuevoPedido;
}
