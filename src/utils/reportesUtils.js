export function contarPedidosPorTipo(pedidos = []) {
  const compras = pedidos.filter((p) => !p.esCotizacion).length;
  const cotizaciones = pedidos.filter((p) => Boolean(p.esCotizacion)).length;
  return {
    compras,
    cotizaciones,
    total: pedidos.length
  };
}

export function calcularMontoCompras(pedidos = []) {
  return pedidos
    .filter((p) => !p.esCotizacion)
    .reduce((acumulador, p) => acumulador + (Number(p.totalPagar) || 0), 0);
}

export function obtenerProductosMasSolicitados(pedidos = []) {
  const conteoPorProducto = {};

  pedidos.forEach((pedido) => {
    if (pedido.items && Array.isArray(pedido.items)) {
      pedido.items.forEach((item) => {
        const id = item.producto?.id || item.codigo || 'desconocido';
        const nombre = item.producto?.nombre || item.nombre || 'Producto sin nombre';
        const codigo = item.producto?.codigo || item.codigo || 'S/C';
        const cantidad = Number(item.cantidad) || 0;

        if (!conteoPorProducto[id]) {
          conteoPorProducto[id] = {
            id,
            codigo,
            nombre,
            cantidadAcumulada: 0
          };
        }
        conteoPorProducto[id].cantidadAcumulada += cantidad;
      });
    }
  });

  return Object.values(conteoPorProducto)
    .sort((a, b) => b.cantidadAcumulada - a.cantidadAcumulada)
    .slice(0, 5);
}
