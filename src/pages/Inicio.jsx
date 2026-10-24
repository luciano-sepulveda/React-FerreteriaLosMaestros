import { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TarjetaProducto from '../components/molecules/TarjetaProducto';
import Boton from '../components/atoms/Boton';
import { listarProductos } from '../services/productoService';
import { listarCategorias } from '../services/categoriaService';
import useTituloPagina from '../hooks/useTituloPagina';
import useCarrito from '../hooks/useCarrito';

const Inicio = () => {
  useTituloPagina('Inicio');
  const navegar = useNavigate();
  const { agregarAlCarrito } = useCarrito();
  const [productosDestacados, setProductosDestacados] = useState(() => listarProductos().slice(0, 3));
  const [categorias, setCategorias] = useState(() => listarCategorias());


  const manejarAgregarCarrito = (producto, cantidad = 1) => {
    agregarAlCarrito(producto, cantidad);
  };

  const manejarCotizar = (producto, cantidad = 1) => {
    agregarAlCarrito(producto, cantidad);
    navegar('/carrito');
  };

  return (
    <div>
      <section className="bg-dark text-white py-5 shadow-sm border-bottom border-warning border-3">
        <Container>
          <Row className="align-items-center py-4">
            <Col lg={8} className="text-center text-lg-start mb-4 mb-lg-0">
              <span className="badge bg-warning text-dark fw-bold px-3 py-2 mb-3 text-uppercase">
                22 Años en La Serena · Calidad y Confianza
              </span>
              <h1 className="display-4 fw-extrabold mb-3">
                Ferretería <span className="text-warning">Los Maestros</span>
              </h1>
              <p className="lead text-light opacity-75 mb-4">
                El stock más completo en materiales de construcción, herramientas de alta gama y ferretería general.
                Atención especializada para particulares y contratistas con despacho a obra y retiro en tienda.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <Boton
                  variante="warning"
                  tamano="lg"
                  claseAdicional="px-4 shadow-sm w-auto"
                  alHacerClic={() => navegar('/catalogo')}
                  texto="Explorar Catálogo Completo"
                />
                <Boton
                  variante="outline-light"
                  tamano="lg"
                  claseAdicional="px-4 w-auto"
                  alHacerClic={() => navegar('/login')}
                  texto="Portal Contratistas (Login)"
                />
              </div>
            </Col>
            <Col lg={4} className="text-center">
              <Card className="bg-secondary bg-opacity-25 border-warning text-white p-4 rounded-4 shadow">
                <div className="fs-1 mb-2">🏗️</div>
                <h4 className="fw-bold text-warning">Beneficios Contratistas</h4>
                <ul className="list-unstyled text-start small mt-3 mb-0">
                  <li className="mb-2">✓ Cuenta corriente y pago a 30 días</li>
                  <li className="mb-2">✓ Despacho directo a faenas y obras</li>
                  <li className="mb-2">✓ Alertas de stock en tiempo real</li>
                  <li>✓ Cotizaciones y compras online sin esperas</li>
                </ul>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-white">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark">Nuestras Categorías de Especialidad</h2>
            <p className="text-muted">Encuentra todo lo que necesitas para tu proyecto o faena</p>
          </div>

          <Row className="g-3 justify-content-center">
            {categorias.map((categoriaItem, indice) => (
              <Col key={categoriaItem} xs={6} sm={4} md={4} lg={3} xl={2}>
                <Card
                  className="text-center p-3 h-100 border shadow-sm rounded-3 bg-light tarjeta-categoria-efecto"
                  onClick={() => navegar(`/categoria/${encodeURIComponent(categoriaItem)}`)}
                >
                  <div className="fs-2 mb-2">
                    {indice % 9 === 0 ? '🧱' : indice % 9 === 1 ? '🎨' : indice % 9 === 2 ? '🔨' : indice % 9 === 3 ? '🚰' : indice % 9 === 4 ? '⚡' : indice % 9 === 5 ? '🔩' : indice % 9 === 6 ? '🪵' : indice % 9 === 7 ? '🦺' : '🌱'}
                  </div>
                  <span className="fw-semibold small text-dark d-block">{categoriaItem}</span>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light border-top">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold text-dark mb-1">Productos Destacados en Bodega</h2>
              <p className="text-muted small mb-0">Disponibilidad inmediata para retiro o despacho</p>
            </div>
            <Boton
              variante="outline-dark"
              tamano="sm"
              claseAdicional="w-auto px-3"
              alHacerClic={() => navegar('/catalogo')}
              texto={`Ver todos (${listarProductos().length}) →`}
            />
          </div>

          <Row className="g-4">
            {productosDestacados.map((productoItem) => (
              <Col key={productoItem.id} xs={12} sm={6} lg={4}>
                <TarjetaProducto
                  producto={productoItem}
                  alAgregarAlCarrito={manejarAgregarCarrito}
                  alCotizar={manejarCotizar}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Inicio;