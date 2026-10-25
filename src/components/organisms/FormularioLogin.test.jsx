import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormularioLogin from './FormularioLogin';

describe('FormularioLogin', () => {
    it('muestra los errores de validación al enviar el formulario vacío', async () => {
        render(<FormularioLogin />);

        await userEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }));

        expect(screen.getByText('El correo electrónico es obligatorio.')).toBeInTheDocument();
        expect(screen.getByText('La contraseña es obligatoria.')).toBeInTheDocument();
    });
});