export function verificarStockBajo(stock, stockMinimo) {
  if (typeof stock !== 'number' || typeof stockMinimo !== 'number') {
    return false;
  }
  return stock <= stockMinimo;
}

export function obtenerEstadoStock(stock, stockMinimo) {
  if (stock <= 0) {
    return { texto: 'Sin stock', variante: 'danger', requiereAlerta: true };
  }
  if (stock <= stockMinimo) {
    return { texto: `Reponer (Stock: ${stock} / Min: ${stockMinimo})`, variante: 'warning', requiereAlerta: true };
  }
  return { texto: `Disponible (${stock} un.)`, variante: 'success', requiereAlerta: false };
}
