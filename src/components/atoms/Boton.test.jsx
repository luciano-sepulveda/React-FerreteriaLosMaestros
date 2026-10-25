import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Boton from './Boton';

describe('Boton', () => {
    it('ejecuta alHacerClic al hacer clic', async () => {
        const alHacerClic = vi.fn();
        render(<Boton texto="Agregar" alHacerClic={alHacerClic} />);

        await userEvent.click(screen.getByRole('button', { name: 'Agregar' }));

        expect(alHacerClic).toHaveBeenCalledTimes(1);
    });
});