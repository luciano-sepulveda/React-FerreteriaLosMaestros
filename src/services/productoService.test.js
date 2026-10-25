import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { actualizarProducto, obtenerProducto } from './productoService';

describe('productoService', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('actualizar Producto cambia el stock y queda guardado', () => {
        actualizarProducto(1, { stock: 5 });

        expect(obtenerProducto(1).stock).toBe(5);
    });
});