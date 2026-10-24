import { Card } from 'react-bootstrap';
import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';

const ErrorSolicitud = ({ mensaje, alReintentar, alVolverAlCatalogo }) => {
  return (
    <Card className="border-0 shadow-lg rounded-4 overflow-hidden my-3">
      <Card.Header className="bg-dark text-white p-4 border-bottom border-danger border-3">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="fs-4">⚠️</span>
              <h4 className="fw-bold text-danger mb-0">Ferretería Los Maestros</h4>
            </div>
            <small className="text-light opacity-75">
              RUT: 76.543.210-K · Casa Matriz: Balmaceda 1420, La Serena · Fono: +56 51 222 3344
            </small>
          </div>

          <div className="text-end">
            <Etiqueta variante="danger" esPildora={true} claseAdicional="fs-6 px-3 py-2">
              Error al procesar solicitud
            </Etiqueta>
          </div>
        </div>
      </Card.Header>

      <Card.Body className="p-4">
        <div className="p-4 rounded-3 mb-4 text-center bg-danger bg-opacity-10 text-danger border border-danger">
          <div className="fs-1 mb-2">❌</div>
          <h5 className="fw-bold mb-2">No pudimos procesar tu solicitud</h5>
          <p className="mb-0 small text-dark">
            {mensaje || 'Ocurrió un error inesperado al intentar registrar tu pedido. Por favor, reintenta.'}
          </p>
        </div>

        <div className="d-flex flex-wrap gap-2 justify-content-between pt-3 border-top">
          <div className="ancho-minimo-180">
            <Boton
              texto="← Volver al Catálogo"
              variante="outline-dark"
              alHacerClic={alVolverAlCatalogo}
              claseAdicional="px-3"
            />
          </div>

          <div className="ancho-minimo-220">
            <Boton
              texto="🔄 Reintentar"
              variante="warning"
              alHacerClic={alReintentar}
              claseAdicional="px-4"
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ErrorSolicitud;
