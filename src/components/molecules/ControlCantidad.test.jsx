import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ControlCantidad from './ControlCantidad';

describe('ControlCantidad', () => {
    it('deshabilita el botón + al llegar al stock máximo', () => {
        render(<ControlCantidad cantidad={5} stockMaximo={5} alCambiar={vi.fn()} />);

        expect(screen.getByRole('button', { name: '+' })).toBeDisabled();
    });
});