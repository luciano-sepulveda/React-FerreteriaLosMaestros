import React, { useState } from 'react';
import { Container, Row, Col, Alert, Breadcrumb } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import useCarrito from '../hooks/useCarrito';
import useTituloPagina from '../hooks/useTituloPagina';
import ListaCarrito from '../components/organisms/ListaCarrito';
import ResumenTotales from '../components/organisms/ResumenTotales';
import FormularioCompra from '../components/organisms/FormularioCompra';
import ComprobanteCompra from '../components/organisms/ComprobanteCompra';

const Carrito = () => {
  useTituloPagina('Carrito de Compras y Pedidos');
  const navegar = useNavigate();

  const {
    elementosCarrito,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    subtotalNeto,
    montoIva,
    totalPagar
  } = useCarrito();

  const [pasoActual, setPasoActual] = useState('carrito'); // 'carrito' | 'checkout' | 'confirmacion'
  const [tipoEntrega, setTipoEntrega] = useState('retiro');
  const [ordenFinal, setOrdenFinal] = useState(null);
  const [mensajeAlerta, setMensajeAlerta] = useState('');

  const costoDespacho = tipoEntrega === 'despacho' ? 4990 : 0;
  const totalConDespacho = totalPagar + costoDespacho;

  const manejarIrACatalogo = () => {
    navegar('/catalogo');
  };

  const manejarProcederCompra = () => {
    if (elementosCarrito.length === 0) {
      setMensajeAlerta('Debes tener al menos un producto en el carrito para comprar.');
      return;
    }
    setPasoActual('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const manejarGenerarCotizacion = () => {
    if (elementosCarrito.length === 0) {
      setMensajeAlerta('Debes tener productos en el carrito para generar una cotización formal.');
      return;
    }

    const nuevaCotizacion = {
      folio: `COT-${Date.now().toString().slice(-6)}`,
      esCotizacion: true,
      fecha: new Date().toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      nombreCompleto: 'Cotizante Ferretería Los Maestros',
      rut: 'Sin RUT registrado',
      correo: 'contacto@ferreterialosmaestros.cl',
      telefono: '+56 51 222 3344',
      tipoEntrega,
      items: [...elementosCarrito],
      subtotalNeto,
      montoIva,
      costoDespacho,
      totalPagar: totalConDespacho,
      tipoCliente: 'particular',
      medioPago: 'cotizacion'
    };

    setOrdenFinal(nuevaCotizacion);
    setPasoActual('confirmacion');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const manejarConfirmarCompra = (datosComprador) => {
    const ordenGenerada = {
      ...datosComprador,
      folio: `PED-${Date.now().toString().slice(-6)}`,
      esCotizacion: false,
      items: [...elementosCarrito],
      subtotalNeto,
      montoIva,
      costoDespacho,
      totalPagar: totalConDespacho
    };

    setOrdenFinal(ordenGenerada);
    vaciarCarrito();
    setPasoActual('confirmacion');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const manejarVolverAlCatalogo = () => {
    setOrdenFinal(null);
    setPasoActual('carrito');
    navegar('/catalogo');
  };

  return (
    <Container className="py-4">
      {/* Navegación por migas de pan */}
      <Breadcrumb className="small mb-3">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
          Inicio
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/catalogo' }}>
          Catálogo
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          {pasoActual === 'confirmacion'
            ? ordenFinal?.esCotizacion
              ? 'Cotización Formal'
              : 'Comprobante de Compra'
            : pasoActual === 'checkout'
            ? 'Finalizar Compra'
            : 'Carrito de Compras'}
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* Alerta temporal */}
      {mensajeAlerta && (
        <Alert variant="warning" dismissible onClose={() => setMensajeAlerta('')} className="mb-3">
          {mensajeAlerta}
        </Alert>
      )}

      {/* Vista de Confirmación o Comprobante */}
      {pasoActual === 'confirmacion' && ordenFinal && (
        <ComprobanteCompra
          orden={ordenFinal}
          alVolverAlCatalogo={manejarVolverAlCatalogo}
        />
      )}

      {/* Vista de Checkout / Formulario de Compra */}
      {pasoActual === 'checkout' && (
        <div>
          <div className="mb-3">
            <h1 className="h3 fw-bold text-dark mb-1">Finalizar Compra</h1>
            <p className="text-muted small">
              Completa tus datos para emitir boleta o factura y coordinar el despacho o retiro.
            </p>
          </div>

          <FormularioCompra
            totalPagar={totalConDespacho}
            tipoEntrega={tipoEntrega}
            alConfirmarCompra={manejarConfirmarCompra}
            alCancelar={() => setPasoActual('carrito')}
          />
        </div>
      )}

      {/* Vista Principal del Carrito */}
      {pasoActual === 'carrito' && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
            <div>
              <h1 className="h3 fw-bold text-dark mb-1">Carrito de Compras y Cotización</h1>
              <p className="text-muted small mb-0">
                Revisa los productos seleccionados, ajusta cantidades y calcula los valores totales con IVA.
              </p>
            </div>
          </div>

          <Row className="g-4">
            <Col lg={8}>
              <ListaCarrito
                elementos={elementosCarrito}
                alModificarCantidad={actualizarCantidad}
                alEliminar={eliminarDelCarrito}
                alVaciar={vaciarCarrito}
                alIrAlCatalogo={manejarIrACatalogo}
              />
            </Col>

            <Col lg={4}>
              <ResumenTotales
                subtotalNeto={subtotalNeto}
                montoIva={montoIva}
                totalPagar={totalPagar}
                tipoEntrega={tipoEntrega}
                alCambiarTipoEntrega={setTipoEntrega}
                costoDespacho={costoDespacho}
                alProcederCompra={manejarProcederCompra}
                alGenerarCotizacion={manejarGenerarCotizacion}
                deshabilitado={elementosCarrito.length === 0}
              />
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default Carrito;
