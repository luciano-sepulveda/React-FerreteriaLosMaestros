import { Badge } from 'react-bootstrap';
import TablaCriticos from './TablaCriticos';

const PanelCriticos = ({
  criticos = [],
  alReponerStock
}) => {
  return (
    <div className="bg-white p-4 rounded-4 shadow-sm border">
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <div>
          <h5 className="fw-bold text-danger mb-0">Gestión de Stock Crítico y Reposición</h5>
          <small className="text-muted">Productos que requieren compra urgente a proveedores.</small>
        </div>
        <Badge bg="danger" className="fs-6 px-3 py-2">
          {criticos.length} alertas activas
        </Badge>
      </div>

      <TablaCriticos criticos={criticos} alReponerStock={alReponerStock} />
    </div>
  );
};

export default PanelCriticos;
