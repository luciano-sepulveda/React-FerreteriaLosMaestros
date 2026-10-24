import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TarjetaArticulo from '../components/molecules/TarjetaArticulo';
import { articulosBlog } from '../data/articulosBlog';
import useTituloPagina from '../hooks/useTituloPagina';

const Blog = () => {
  useTituloPagina('Blog Técnico y Consejos de Obra - Ferretería Los Maestros');
  const navegar = useNavigate();

  const manejarVerArticulo = (id) => {
    navegar(`/blog/${id}`);
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <span className="badge bg-warning text-dark fw-bold px-3 py-2 mb-2 text-uppercase">
          Biblioteca de Consejos y Normativa
        </span>
        <h1 className="display-5 fw-extrabold text-dark">Blog Técnico Los Maestros</h1>
        <p className="text-muted mx-auto ancho-maximo-650">
          Recomendaciones prácticas, guías de dosificación de materiales y normativas vigentes escritas por nuestros especialistas para tus proyectos.
        </p>
      </div>

      <Row className="g-4">
        {articulosBlog.map((articulo) => (
          <Col key={articulo.id} md={6} lg={4}>
            <TarjetaArticulo
              articulo={articulo}
              alVerArticulo={manejarVerArticulo}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Blog;
