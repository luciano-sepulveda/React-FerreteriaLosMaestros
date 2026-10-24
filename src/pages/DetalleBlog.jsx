import { Container, Card, Breadcrumb } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { articulosBlog } from '../data/articulosBlog';
import Boton from '../components/atoms/Boton';
import Etiqueta from '../components/atoms/Etiqueta';
import useTituloPagina from '../hooks/useTituloPagina';

const DetalleBlog = () => {
  const { id } = useParams();
  const navegar = useNavigate();

  const articulo = articulosBlog.find((item) => item.id === Number(id));

  useTituloPagina(articulo ? `${articulo.titulo} - Blog Los Maestros` : 'Artículo de Blog');

  if (!articulo) {
    return (
      <Container className="py-5 text-center">
        <div className="bg-white p-5 rounded-4 shadow-sm border">
          <h3 className="fw-bold text-dark mb-2">Artículo no encontrado</h3>
          <p className="text-muted mb-4">La entrada que buscas no existe o ha sido movida.</p>
          <div className="d-inline-block" style={{ maxWidth: '200px' }}>
            <Boton
              texto="← Volver al Blog"
              variante="warning"
              alHacerClic={() => navegar('/blog')}
            />
          </div>
        </div>
      </Container>
    );
  }

  const {
    titulo,
    contenidoCompleto,
    fecha,
    autor,
    categoria,
    tiempoLectura,
    icono
  } = articulo;

  return (
    <Container className="py-5" style={{ maxWidth: '860px' }}>
      <Breadcrumb className="small mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
          Inicio
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/blog' }}>
          Blog
        </Breadcrumb.Item>
        <Breadcrumb.Item active className="text-truncate" style={{ maxWidth: '300px' }}>
          {titulo}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card className="border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
        <Card.Header className="bg-dark text-white p-4 border-bottom border-warning border-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="fs-3">{icono}</span>
            <Etiqueta variante="warning" esPildora={true} claseAdicional="text-dark">
              {categoria}
            </Etiqueta>
            <small className="text-light opacity-75">⏱️ {tiempoLectura} de lectura</small>
          </div>
          <h1 className="h2 fw-bold text-white mb-2">{titulo}</h1>
          <div className="d-flex flex-wrap gap-3 small text-light opacity-75">
            <span>📅 {fecha}</span>
            <span>✍️ {autor}</span>
          </div>
        </Card.Header>

        <Card.Body className="p-4 p-md-5">
          <div className="text-secondary fs-6" style={{ lineHeight: '1.8', whiteSpace: 'pre-line' }}>
            {contenidoCompleto}
          </div>

          <div className="mt-5 pt-4 border-top d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div className="small text-muted">
              ¿Tienes dudas técnicas para tu obra? Escríbenos a <strong>contacto@ferreterialosmaestros.cl</strong>
            </div>
            <div style={{ minWidth: '180px' }}>
              <Boton
                texto="← Volver a Artículos"
                variante="outline-dark"
                alHacerClic={() => navegar('/blog')}
              />
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DetalleBlog;
