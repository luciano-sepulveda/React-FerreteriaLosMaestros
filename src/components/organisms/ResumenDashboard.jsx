import { Row, Col, Card } from 'react-bootstrap';
import TarjetaIndicador from '../molecules/TarjetaIndicador';
import TablaCriticos from './TablaCriticos';
import PerfilAdministrador from './PerfilAdministrador';

const ResumenDashboard = ({
  cantidadProductos = 0,
  cantidadCategorias = 0,
  cantidadCriticos = 0,
  totalUnidades = 0,
  cantidadUsuarios = 0,
  criticos = [],
  usuarioAdministrador,
  alCambiarPestana,
  alReponerStock
}) => {
  return (
    <div>
      <Row className="g-3 mb-4">
        <Col sm={6} lg={3}>
          <TarjetaIndicador
            titulo="Total Catálogo"
            valor={`${cantidadProductos} ítems`}
            detalle={`Distribuido en ${cantidadCategorias} categorías`}
            variante="warning"
            alHacerClic={() => alCambiarPestana('catalogo')}
          />
        </Col>

        <Col sm={6} lg={3}>
          <TarjetaIndicador
            titulo="Stock Crítico (Bajo)"
            valor={`${cantidadCriticos} productos`}
            detalle="Requieren orden de reposición"
            variante="danger"
            alHacerClic={() => alCambiarPestana('criticos')}
          />
        </Col>

        <Col sm={6} lg={3}>
          <TarjetaIndicador
            titulo="Unidades en Bodega"
            valor={`${totalUnidades} u.`}
            detalle="Valorizadas con IVA inc."
            variante="success"
            alHacerClic={() => alCambiarPestana('catalogo')}
          />
        </Col>

        <Col sm={6} lg={3}>
          <TarjetaIndicador
            titulo="Clientes Registrados"
            valor={`${cantidadUsuarios} cuentas`}
            detalle="Particulares y Contratistas"
            variante="primary"
            alHacerClic={() => alCambiarPestana('usuarios')}
          />
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={7}>
          <Card className="border-0 shadow-sm rounded-4 p-4 bg-white">
            <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">Atención Rápida de Bodega</h5>
            {criticos.length > 0 ? (
              <TablaCriticos criticos={criticos} alReponerStock={alReponerStock} modoCompacto={true} />
            ) : (
              <p className="text-success small mb-0">✓ No hay productos con quiebre de stock en este momento.</p>
            )}
          </Card>
        </Col>

        <Col lg={5}>
          <PerfilAdministrador usuario={usuarioAdministrador} />
        </Col>
      </Row>
    </div>
  );
};

export default ResumenDashboard;
