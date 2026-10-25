import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { crearPedido } from './pedidoService';
import { obtenerProducto } from './productoService';

describe('crearPedido', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('lanza un error si el pedido no tiene ítems', () => {
        const pedidoVacio = { folio: 'PED-000001', items: [] };

        expect(() => crearPedido(pedidoVacio)).toThrow('al menos un ítem');
    });

    it('descuenta del stock la cantidad comprada', () => {
        const producto = obtenerProducto(1);
        const stockAntes = producto.stock;
        const pedido = {
            folio: 'PED-000002',
            esCotizacion: false,
            items: [{ producto, cantidad: 2, subtotal: 2 * producto.precioVenta }]
        };

        crearPedido(pedido);

        expect(obtenerProducto(1).stock).toBe(stockAntes - 2);
    });
});