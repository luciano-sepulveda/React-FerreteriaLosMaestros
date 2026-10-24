import { Card } from 'react-bootstrap';

const PerfilAdministrador = ({ usuario }) => {
  const nombre = usuario?.nombreCompleto || 'Administrador de Faenas / Bodega';
  const rol = usuario?.rol || 'Administrador Bodega';
  const sucursal = usuario?.sucursal || 'Balmaceda 1420, La Serena';
  const permisos = usuario?.permisos || 'CRUD Catálogo, Control de Stock, Validación de Pedidos';
  const correo = usuario?.correo || 'admin@ferreterialosmaestros.cl';
  const telefono = usuario?.telefono || '+56 51 222 3344';

  return (
    <Card className="border-0 shadow-sm rounded-4 p-4 bg-dark text-white">
      <h5 className="fw-bold text-warning border-bottom border-secondary pb-2 mb-3">
        Perfil del Administrador
      </h5>
      <p className="small text-light opacity-75 mb-1">
        <strong>Nombre:</strong> {nombre}
      </p>
      <p className="small text-light opacity-75 mb-1">
        <strong>Rol:</strong> {rol}
      </p>
      <p className="small text-light opacity-75 mb-1">
        <strong>Correo:</strong> {correo}
      </p>
      <p className="small text-light opacity-75 mb-1">
        <strong>Teléfono:</strong> {telefono}
      </p>
      <p className="small text-light opacity-75 mb-1">
        <strong>Sucursal:</strong> {sucursal}
      </p>
      <p className="small text-light opacity-75 mb-3">
        <strong>Permisos:</strong> {permisos}
      </p>
      <div className="p-3 bg-secondary bg-opacity-25 rounded-3 text-center">
        <span className="small text-warning fw-bold d-block">Sistema Los Maestros v2.0</span>
        <small className="text-light opacity-75">React + Bootstrap + LocalStorage</small>
      </div>
    </Card>
  );
};

export default PerfilAdministrador;
