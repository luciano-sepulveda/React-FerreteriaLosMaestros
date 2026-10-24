import { useState } from 'react';
import { Container, Row, Col, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BannerOferta from '../components/molecules/BannerOferta';
import TarjetaProducto from '../components/molecules/TarjetaProducto';
import Boton from '../components/atoms/Boton';
import { listarOfertas } from '../services/productoService';
import useCarrito from '../hooks/useCarrito';
import useTituloPagina from '../hooks/useTituloPagina';

const Ofertas = () => {
  useTituloPagina('Ofertas y Remates - Ferretería Los Maestros');
  const navegar = useNavigate();
  const { agregarAlCarrito } = useCarrito();
  const productosEnOferta = listarOfertas();
  const [alerta, setAlerta] = useState('');


  const manejarAgregarCarrito = (producto, cantidad = 1) => {
    agregarAlCarrito(producto, cantidad);
    setAlerta(`🛒 ¡Agregaste ${cantidad}x ${producto.nombre} con precio rebajado al carrito!`);
    setTimeout(() => setAlerta(''), 3500);
  };

  const manejarCotizar = (producto, cantidad = 1) => {
    agregarAlCarrito(producto, cantidad);
  };

  return (
    <Container className="py-4">
      <BannerOferta
        titulo="Ofertas Especiales para Contratistas y Particulares"
        subtitulo="Precios rebajados por tiempo limitado en materiales esenciales, pinturas y herramientas profesionales."
      />

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">Catálogo de Ofertas y Promociones</h1>
          <p className="text-muted small mb-0">
            Aprovecha los descuentos vigentes con disponibilidad inmediata en sucursal o despacho a faena.
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Badge bg="danger" className="px-3 py-2 fs-6">
            🔥 {productosEnOferta.length} ofertas activas
          </Badge>
          <Boton
            variante="warning"
            tamano="sm"
            claseAdicional="w-auto px-3 fw-bold"
            alHacerClic={() => navegar('/carrito')}
            texto="Ver Carrito y Totales →"
          />
        </div>
      </div>

      {alerta && (
        <Alert variant="success" dismissible onClose={() => setAlerta('')} className="py-2 mb-3">
          {alerta}
        </Alert>
      )}

      {productosEnOferta.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm border my-4">
          <p className="text-muted fs-5 mb-3">No hay productos en promoción en este momento.</p>
          <Boton
            variante="warning"
            claseAdicional="w-auto px-4 fw-bold mx-auto"
            alHacerClic={() => navegar('/catalogo')}
            texto="Ver Catálogo General"
          />
        </div>
      ) : (
        <Row className="g-4">
          {productosEnOferta.map((productoItem) => (
            <Col key={productoItem.id} xs={12} sm={6} md={6} lg={4}>
              <TarjetaProducto
                producto={productoItem}
                alAgregarAlCarrito={manejarAgregarCarrito}
                alCotizar={manejarCotizar}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Ofertas;
