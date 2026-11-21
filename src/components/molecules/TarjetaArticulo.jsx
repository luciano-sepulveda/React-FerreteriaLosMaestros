import { Card } from 'react-bootstrap';
import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';

function TarjetaArticulo(props) {
  if (!props.articulo) return null;

  return (
    <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden d-flex flex-column bg-white">
      <Card.Header className="bg-light border-0 py-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <span className="fs-3">{props.articulo.icono || '📝'}</span>
          <Etiqueta variante="warning" esPildora={true} claseAdicional="text-dark small">
            {props.articulo.categoria}
          </Etiqueta>
        </div>
        <small className="text-muted texto-tamano-chico">
          ⏱️ {props.articulo.tiempoLectura}
        </small>
      </Card.Header>

      <Card.Body className="p-3 p-md-4 d-flex flex-column flex-grow-1">
        <small className="text-muted d-block mb-1">{props.articulo.fecha}</small>
        <Card.Title className="h5 fw-bold text-dark mb-2 line-clamp-2">
          {props.articulo.titulo}
        </Card.Title>
        <Card.Text className="text-muted small flex-grow-1 mb-3">
          {props.articulo.resumen}
        </Card.Text>

        <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
          <small className="text-secondary fw-semibold text-truncate ancho-maximo-180">
            ✍️ {props.articulo.autor}
          </small>
          <div className="ancho-minimo-110">
            <Boton
              texto="Leer Más →"
              variante="outline-dark"
              tamano="sm"
              alHacerClic={() => props.alVerArticulo && props.alVerArticulo(props.articulo.id)}
              claseAdicional="px-2"
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TarjetaArticulo;
