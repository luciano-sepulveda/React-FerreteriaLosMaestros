import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import { validarRequerido } from '../../utils/validaciones';

const FormularioCategoria = ({
  categoriaAEditar = '',
  alGuardar,
  alCancelar
}) => {
  const [nombre, setNombre] = useState(categoriaAEditar || '');
  const [error, setError] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    const errorValidacion = validarRequerido(nombre, 'Nombre de categoría');
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    try {
      alGuardar(nombre.trim());
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Card className="border-0 shadow-sm rounded-4 mb-4">
      <Card.Header className="bg-dark text-white py-3">
        <h5 className="fw-bold mb-0 text-warning">
          {categoriaAEditar ? 'Editar Categoría' : 'Nueva Categoría'}
        </h5>
      </Card.Header>
      <Card.Body className="p-4">
        <Form onSubmit={manejarEnvio}>
          <CampoFormulario
            etiqueta="Nombre de la Categoría *"
            marcador="Ej: Aislación y Techos"
            valor={nombre}
            alCambiar={(e) => {
              setNombre(e.target.value);
              if (error) setError('');
            }}
            error={error}
          />

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Boton
              variante="outline-secondary"
              tamano="sm"
              claseAdicional="w-auto px-4"
              alHacerClic={alCancelar}
              texto="Cancelar"
            />
            <Boton
              tipo="submit"
              variante="warning"
              tamano="sm"
              claseAdicional="w-auto px-4 fw-bold"
              texto="Guardar Categoría"
            />
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FormularioCategoria;
