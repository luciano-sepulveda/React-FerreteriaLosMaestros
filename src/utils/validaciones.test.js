import { describe, it, expect } from 'vitest';
import { validarCorreo } from './validaciones';

describe('validarCorreo', () => {
    it('rechaza un correo sin arroba', () => {
        const mensaje = validarCorreo('usuario.dominio.cl');

        expect(mensaje).not.toBe('');
        expect(mensaje).toContain('válido');
    });
});