// Reglas de negocio para inventario y stock (Guía 13 - Caso Forma E)
// "Cuando el stock baja del stock mínimo, el producto muestra una alerta de reposición.
// La comparación stock < stockMinimo va en una función de utils."

/**
 * Determina si un producto requiere reposición de stock.
 * @param {number} stock - Stock actual del producto.
 * @param {number} stockMinimo - Umbral de stock mínimo permitido.
 * @returns {boolean} true si el stock es menor o igual al stock mínimo.
 */
export function verificarStockBajo(stock, stockMinimo) {
  if (typeof stock !== 'number' || typeof stockMinimo !== 'number') {
    return false;
  }
  return stock <= stockMinimo;
}

/**
 * Retorna el estado descriptivo del stock para etiquetas y badges.
 * @param {number} stock 
 * @param {number} stockMinimo 
 * @returns {{ texto: string, variante: 'success' | 'warning' | 'danger', requiereAlerta: boolean }}
 */
export function obtenerEstadoStock(stock, stockMinimo) {
  if (stock <= 0) {
    return { texto: 'Sin stock', variante: 'danger', requiereAlerta: true };
  }
  if (stock <= stockMinimo) {
    return { texto: `Reponer (Stock: ${stock} / Min: ${stockMinimo})`, variante: 'warning', requiereAlerta: true };
  }
  return { texto: `Disponible (${stock} un.)`, variante: 'success', requiereAlerta: false };
}
