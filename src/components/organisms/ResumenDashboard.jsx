import { Row, Col, Card } from 'react-bootstrap';
import TarjetaIndicador from '../molecules/TarjetaIndicador';
import TablaCriticos from './TablaCriticos';
import PerfilAdministrador from './PerfilAdministrador';

function ResumenDashboard(props) {
  const cantidadProductos = props.cantidadProductos || 0;
  const cantidadCategorias = props.cantidadCategorias || 0;
  const cantidadCriticos = props.cantidadCriticos || 0;
  const totalUnidades = props.totalUnidades || 0;
  const cantidadUsuarios = props.cantidadUsuarios || 0;
  const criticos = props.criticos || [];

  return (
    <div>
      <Row className="g-3 mb-4">
        <Col sm={6} lg={3}>
          <TarjetaIndicador
            titulo="Total Catálogo"
            valor={`${cantidadProductos} ítems`}
            detalle={`Distribuido en ${cantidadCategorias} categorías`}
            variante="warning"
            alHacerClic={() => props.alCambiarPestana && props.alCambiarPestana('catalogo')}
          />
        </Col>

        <Col sm={6} lg={3}>
          <TarjetaIndicador
            titulo="Stock Crítico (Bajo)"
            valor={`${cantidadCriticos} productos`}
            detalle="Requieren orden de reposición"
            variante="danger"
            alHacerClic={() => props.alCambiarPestana && props.alCambiarPestana('criticos')}
          />
        </Col>

        <Col sm={6} lg={3}>
          <TarjetaIndicador
            titulo="Unidades en Bodega"
            valor={`${totalUnidades} u.`}
            detalle="Valorizadas con IVA inc."
            variante="success"
            alHacerClic={() => props.alCambiarPestana && props.alCambiarPestana('catalogo')}
          />
        </Col>

        <Col sm={6} lg={3}>
          <TarjetaIndicador
            titulo="Clientes Registrados"
            valor={`${cantidadUsuarios} cuentas`}
            detalle="Particulares y Contratistas"
            variante="primary"
            alHacerClic={() => props.alCambiarPestana && props.alCambiarPestana('usuarios')}
          />
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={7}>
          <Card className="border-0 shadow-sm rounded-4 p-4 bg-white">
            <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">Atención Rápida de Bodega</h5>
            {criticos.length > 0 ? (
              <TablaCriticos criticos={criticos} alReponerStock={props.alReponerStock} modoCompacto={true} />
            ) : (
              <p className="text-success small mb-0">No hay productos con quiebre de stock en este momento.</p>
            )}
          </Card>
        </Col>

        <Col lg={5}>
          <PerfilAdministrador usuario={props.usuarioAdministrador} />
        </Col>
      </Row>
    </div>
  );
}

export default ResumenDashboard;
