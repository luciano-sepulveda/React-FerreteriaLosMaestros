import { useMemo } from 'react';
import { Container, Breadcrumb } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DetalleProducto from '../components/organisms/DetalleProducto';
import { obtenerProducto } from '../services/productoService';
import useCarrito from '../hooks/useCarrito';
import useTituloPagina from '../hooks/useTituloPagina';

const PaginaDetalleProducto = () => {
  const { id } = useParams();
  const navegar = useNavigate();
  const { agregarAlCarrito } = useCarrito();
  const producto = useMemo(() => (id ? obtenerProducto(id) : null), [id]);

  useTituloPagina(producto ? `${producto.nombre} - Ferretería Los Maestros` : 'Detalle de Producto');

  const manejarAgregarAlCarrito = (prod, cantidad) => {
    agregarAlCarrito(prod, cantidad);
  };

  const manejarCotizar = (prod, cantidad) => {
    agregarAlCarrito(prod, cantidad);
    navegar('/carrito');
  };

  const manejarVolver = () => {
    navegar('/catalogo');
  };

  return (
    <Container className="py-4">
      <Breadcrumb className="small mb-3">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
          Inicio
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/catalogo' }}>
          Catálogo
        </Breadcrumb.Item>
        {producto && (
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/categoria/${encodeURIComponent(producto.categoria)}` }}>
            {producto.categoria}
          </Breadcrumb.Item>
        )}
        <Breadcrumb.Item active>
          {producto ? producto.nombre : 'Detalle'}
        </Breadcrumb.Item>
      </Breadcrumb>

      <DetalleProducto
        producto={producto}
        alAgregarAlCarrito={manejarAgregarAlCarrito}
        alCotizar={manejarCotizar}
        alVolver={manejarVolver}
      />
    </Container>
  );
};

export default PaginaDetalleProducto;
