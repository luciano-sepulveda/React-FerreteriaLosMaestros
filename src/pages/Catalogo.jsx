import { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import TarjetaProducto from '../components/molecules/TarjetaProducto';
import FiltroCategoria from '../components/molecules/FiltroCategoria';
import Boton from '../components/atoms/Boton';
import { listarProductos } from '../services/productoService';
import { listarCategorias } from '../services/categoriaService';
import useTituloPagina from '../hooks/useTituloPagina';
import useCarrito from '../hooks/useCarrito';
import { verificarStockBajo } from '../utils/stockUtils';

const Catalogo = () => {
  const parametros = useParams();
  const navegar = useNavigate();
  const { agregarAlCarrito } = useCarrito();
  const [productos, setProductos] = useState(() => listarProductos());
  const [categorias, setCategorias] = useState(() => listarCategorias());
  const [mensajeNotificacion, setMensajeNotificacion] = useState('');

  useEffect(() => {
    setProductos(listarProductos());
    setCategorias(listarCategorias());
  }, []);

  let productosVisibles = productos;
  let titulo = 'Catálogo Completo';
  let subtitulo = 'Materiales, herramientas y suministros en stock para contratistas y particulares.';

  if (parametros.nombre) {
    const categoriaSeleccionada = decodeURIComponent(parametros.nombre);
    productosVisibles = productos.filter(
      (prod) => prod.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase()
    );
    titulo = `Categoría: ${categoriaSeleccionada}`;
    subtitulo = `Mostrando ${productosVisibles.length} productos en ${categoriaSeleccionada}.`;
  } else if (parametros.texto) {
    const textoBuscado = decodeURIComponent(parametros.texto).toLowerCase();
    productosVisibles = productos.filter(
      (prod) =>
        prod.nombre.toLowerCase().includes(textoBuscado) ||
        prod.codigo.toLowerCase().includes(textoBuscado) ||
        prod.marca.toLowerCase().includes(textoBuscado) ||
        prod.categoria.toLowerCase().includes(textoBuscado)
    );
    titulo = `Resultados para "${decodeURIComponent(parametros.texto)}"`;
    subtitulo = `Se encontraron ${productosVisibles.length} productos coincidentes.`;
  }

  useTituloPagina(titulo);

  const productosConStockBajo = productosVisibles.filter((prod) =>
    verificarStockBajo(prod.stock, prod.stockMinimo)
  );

  const manejarSeleccionarCategoria = (categoria) => {
    if (!categoria) {
      navegar('/catalogo');
    } else {
      navegar(`/categoria/${encodeURIComponent(categoria)}`);
    }
  };

  const manejarAgregarAlCarrito = (producto, cantidad = 1) => {
    agregarAlCarrito(producto, cantidad);
    setMensajeNotificacion(
      `🛒 ¡Agregado al carrito!: ${cantidad}x ${producto.nombre}. Puedes ver tus valores totales arriba.`
    );
    setTimeout(() => {
      setMensajeNotificacion('');
    }, 4000);
  };

  const manejarCotizar = (producto, cantidad = 1) => {
    agregarAlCarrito(producto, cantidad);
    navegar('/carrito');
  };

  return (
    <Container className="py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 border-bottom pb-3">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">{titulo}</h1>
          <p className="text-muted small mb-0">{subtitulo}</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Badge bg="dark" className="px-3 py-2 fs-6">
            {productosVisibles.length} {productosVisibles.length === 1 ? 'producto' : 'productos'}
          </Badge>
          <Boton
            variante="outline-warning"
            tamano="sm"
            claseAdicional="w-auto px-3 fw-bold"
            alHacerClic={() => navegar('/carrito')}
            texto="Ver Carrito y Totales →"
          />
        </div>
      </div>

      {mensajeNotificacion && (
        <Alert variant="success" dismissible onClose={() => setMensajeNotificacion('')} className="py-2 d-flex justify-content-between align-items-center">
          <span>{mensajeNotificacion}</span>
          <Boton
            variante="success"
            tamano="sm"
            claseAdicional="w-auto px-3 fw-bold ms-3"
            alHacerClic={() => navegar('/carrito')}
            texto="Ir a Pagar"
          />
        </Alert>
      )}

      {productosConStockBajo.length > 0 && (
        <Alert variant="warning" className="py-2 small d-flex align-items-center">
          <span className="me-2 fs-5">⚠️</span>
          <span>
            <strong>Atención bodeguero / ventas:</strong> Hay <strong>{productosConStockBajo.length}</strong> producto(s) en esta lista con stock igual o menor al mínimo (requiere reposición).
          </span>
        </Alert>
      )}

      <FiltroCategoria
        categoriaSeleccionada={parametros.nombre ? decodeURIComponent(parametros.nombre) : ''}
        categorias={categorias}
        alSeleccionarCategoria={manejarSeleccionarCategoria}
      />

      {productosVisibles.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-3 shadow-sm my-4">
          <p className="text-muted fs-5 mb-3">No se encontraron productos para esta búsqueda o categoría.</p>
          <Boton
            variante="warning"
            claseAdicional="w-auto px-4 fw-bold mx-auto"
            alHacerClic={() => navegar('/catalogo')}
            texto="Ver Todo el Catálogo"
          />
        </div>
      ) : (
        <Row className="g-4">
          {productosVisibles.map((productoItem) => (
            <Col key={productoItem.id} xs={12} sm={6} md={6} lg={4} xl={4}>
              <TarjetaProducto
                producto={productoItem}
                alAgregarAlCarrito={manejarAgregarAlCarrito}
                alCotizar={manejarCotizar}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Catalogo;