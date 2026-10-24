import { useState } from 'react';
import { Container, Row, Col, Alert, Breadcrumb } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import useCarrito from '../hooks/useCarrito';
import useTituloPagina from '../hooks/useTituloPagina';
import useSesion from '../hooks/useSesion';
import ListaCarrito from '../components/organisms/ListaCarrito';
import ResumenTotales from '../components/organisms/ResumenTotales';
import FormularioCompra from '../components/organisms/FormularioCompra';
import ComprobanteCompra from '../components/organisms/ComprobanteCompra';
import ErrorSolicitud from '../components/organisms/ErrorSolicitud';
import { crearPedido } from '../services/pedidoService';

const Carrito = () => {
  useTituloPagina('Carrito de Compras y Pedidos');
  const navegar = useNavigate();
  const { usuarioActivo } = useSesion();

  const {
    elementosCarrito,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    subtotalNeto,
    montoIva,
    totalPagar
  } = useCarrito();

  const [pasoActual, setPasoActual] = useState('carrito');
  const [tipoEntrega, setTipoEntrega] = useState('retiro');
  const [ordenFinal, setOrdenFinal] = useState(null);
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [mensajeError, setMensajeError] = useState('');

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
      nombreCompleto: usuarioActivo?.nombreCompleto || 'Cotizante Ferretería Los Maestros',
      rut: usuarioActivo?.rut || 'Sin RUT registrado',
      correo: usuarioActivo?.correo || 'contacto@ferreterialosmaestros.cl',
      telefono: usuarioActivo?.telefono || '+56 51 222 3344',
      tipoEntrega,
      items: [...elementosCarrito],
      subtotalNeto,
      montoIva,
      costoDespacho,
      totalPagar: totalConDespacho,
      tipoCliente: usuarioActivo?.tipoCliente || 'particular',
      medioPago: 'cotizacion'
    };

    try {
      const pedidoGuardado = crearPedido(nuevaCotizacion);
      setOrdenFinal(pedidoGuardado);
      setPasoActual('confirmacion');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setMensajeError(error.message || 'Error al guardar la cotización');
      setPasoActual('error');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

    try {
      const pedidoGuardado = crearPedido(ordenGenerada);
      setOrdenFinal(pedidoGuardado);
      vaciarCarrito();
      setPasoActual('confirmacion');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setMensajeError(error.message || 'Error al guardar el pedido');
      setPasoActual('error');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const manejarVolverAlCatalogo = () => {
    setOrdenFinal(null);
    setPasoActual('carrito');
    navegar('/catalogo');
  };

  const manejarReintentar = () => {
    setPasoActual('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <Breadcrumb.Item active>
          {pasoActual === 'confirmacion'
            ? ordenFinal?.esCotizacion
              ? 'Cotización Formal'
              : 'Comprobante de Compra'
            : pasoActual === 'checkout'
            ? 'Finalizar Compra'
            : pasoActual === 'error'
            ? 'Error en Solicitud'
            : 'Carrito de Compras'}
        </Breadcrumb.Item>
      </Breadcrumb>

      {mensajeAlerta && (
        <Alert variant="warning" dismissible onClose={() => setMensajeAlerta('')} className="mb-3">
          {mensajeAlerta}
        </Alert>
      )}

      {pasoActual === 'error' && (
        <ErrorSolicitud
          mensaje={mensajeError}
          alReintentar={manejarReintentar}
          alVolverAlCatalogo={manejarVolverAlCatalogo}
        />
      )}

      {pasoActual === 'confirmacion' && ordenFinal && (
        <ComprobanteCompra
          orden={ordenFinal}
          alVolverAlCatalogo={manejarVolverAlCatalogo}
        />
      )}

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
            datosIniciales={usuarioActivo}
            alConfirmarCompra={manejarConfirmarCompra}
            alCancelar={() => setPasoActual('carrito')}
          />
        </div>
      )}

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
