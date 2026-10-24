import { Container, Row, Col, Card } from 'react-bootstrap';
import FormularioContacto from '../components/organisms/FormularioContacto';
import useTituloPagina from '../hooks/useTituloPagina';

const Contacto = () => {
  useTituloPagina('Contacto y Sucursal - Ferretería Los Maestros');

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <span className="badge bg-warning text-dark fw-bold px-3 py-2 mb-2 text-uppercase">
          Atención al Cliente y Ventas Empresa
        </span>
        <h1 className="display-5 fw-extrabold text-dark">Contáctanos</h1>
        <p className="text-muted mx-auto ancho-maximo-650">
          ¿Necesitas cotizar por volumen, consultar stock en bodega o coordinar un despacho a obra? Estamos a tu disposición en La Serena.
        </p>
      </div>

      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="p-3 bg-light border-0 rounded-4 shadow-sm h-100 text-center">
            <div className="fs-1 mb-2">📍</div>
            <h5 className="fw-bold text-dark">Sucursal Principal</h5>
            <p className="small text-muted mb-1">Av. Balmaceda 1420, La Serena</p>
            <small className="text-secondary">Región de Coquimbo, Chile</small>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-3 bg-light border-0 rounded-4 shadow-sm h-100 text-center">
            <div className="fs-1 mb-2">📞</div>
            <h5 className="fw-bold text-dark">Teléfonos y WhatsApp</h5>
            <p className="small text-muted mb-1">Mesa Central: +56 51 222 3344</p>
            <small className="text-success fw-bold">WhatsApp Faenas: +56 9 7654 3210</small>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-3 bg-light border-0 rounded-4 shadow-sm h-100 text-center">
            <div className="fs-1 mb-2">🕒</div>
            <h5 className="fw-bold text-dark">Horario de Atención</h5>
            <p className="small text-muted mb-1">Lun - Vie: 08:00 a 18:30 hrs</p>
            <small className="text-secondary">Sábados: 08:30 a 14:00 hrs (Continuado)</small>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={7}>
          <FormularioContacto />
        </Col>

        <Col lg={5}>
          <div className="p-4 bg-dark text-white rounded-4 shadow-sm h-100 border border-warning border-2 d-flex flex-column justify-content-between">
            <div>
              <h4 className="fw-bold text-warning mb-3">Servicio Exclusivo Contratistas</h4>
              <p className="small text-light opacity-75 mb-3">
                Si manejas obras continuas o cuadrillas en la IV Región, solicita la apertura de tu cuenta corriente comercial con facturación mensual a 30 días y reserva prioritaria de stock.
              </p>

              <div className="p-3 bg-secondary bg-opacity-25 rounded-3 mb-3">
                <span className="fw-bold d-block text-warning small mb-1">📦 Retiro en Tienda Express:</span>
                <small className="text-light opacity-75">
                  Haz tu pedido online y recógelo listo y embalado en mesón en menos de 45 minutos.
                </small>
              </div>

              <div className="p-3 bg-secondary bg-opacity-25 rounded-3">
                <span className="fw-bold d-block text-warning small mb-1">🚚 Camión Grúa para Descarga:</span>
                <small className="text-light opacity-75">
                  Contamos con camión grúa pluma para descargas de áridos, cemento y perfiles pesados en faena.
                </small>
              </div>
            </div>

            <div className="mt-4 pt-3 border-top border-secondary small text-light opacity-50">
              contacto@ferreterialosmaestros.cl · La Serena, Chile
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
