import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CarritoProvider } from './Carrito';
import useCarrito from '../hooks/useCarrito';

describe('CarritoProvider', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('calcula el neto y el IVA a partir del total', () => {
        const { result } = renderHook(() => useCarrito(), { wrapper: CarritoProvider });
        const producto = { id: 1, nombre: 'Cemento', precioVenta: 11900, stock: 10 };

        act(() => {
            result.current.agregarAlCarrito(producto, 1);
        });

        expect(result.current.totalPagar).toBe(11900);
        expect(result.current.subtotalNeto).toBe(10000);
        expect(result.current.montoIva).toBe(1900);
    });

    it('no agrega al carrito un producto sin stock', () => {
        const { result } = renderHook(() => useCarrito(), { wrapper: CarritoProvider });
        const productoSinStock = { id: 2, nombre: 'Martillo', precioVenta: 5000, stock: 0 };

        act(() => {
            result.current.agregarAlCarrito(productoSinStock, 1);
        });

        expect(result.current.elementosCarrito).toHaveLength(0);
    });
});