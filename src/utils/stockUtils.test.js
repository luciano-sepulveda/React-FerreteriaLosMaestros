import { describe, it, expect } from 'vitest';
import { obtenerEstadoStock } from './stockUtils';

describe('obtenerEstadoStock', () => {
    it('pide reponer con variante warning y requiereAlerta true cuando el stock está bajo el mínimo', () => {
        const estado = obtenerEstadoStock(5, 10);

        expect(estado.variante).toBe('warning');
        expect(estado.requiereAlerta).toBe(true);
        expect(estado.texto).toContain('Reponer');
    });
});