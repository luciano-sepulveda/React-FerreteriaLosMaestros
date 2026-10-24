import Boton from '../atoms/Boton';
import FormularioUsuario from './FormularioUsuario';
import TablaUsuarios from './TablaUsuarios';
import TablaPedidos from './TablaPedidos';

const PanelUsuarios = ({
  usuarios = [],
  mostrarFormularioUsuario,
  usuarioEditando,
  usuarioHistorial,
  pedidosHistorialUsuario = [],
  alNuevoUsuario,
  alGuardarUsuario,
  alCancelarUsuario,
  alEditarUsuario,
  alVerHistorial,
  alVolverUsuarios,
  alVerDetallePedido
}) => {
  return (
    <div className="bg-white p-4 rounded-4 shadow-sm border">
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <div>
          <h5 className="fw-bold text-dark mb-0">Directorio de Usuarios y Clientes</h5>
          <small className="text-muted">Particulares, contratistas y administradores.</small>
        </div>
        <Boton
          variante="warning"
          tamano="sm"
          claseAdicional="w-auto px-3 fw-bold"
          alHacerClic={alNuevoUsuario}
          texto="➕ Nuevo Usuario"
        />
      </div>

      {mostrarFormularioUsuario && (
        <FormularioUsuario
          usuarioAEditar={usuarioEditando}
          alGuardar={alGuardarUsuario}
          alCancelar={alCancelarUsuario}
        />
      )}

      {usuarioHistorial ? (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold mb-0">
              Historial de compras y cotizaciones de: {usuarioHistorial.nombreCompleto} ({usuarioHistorial.correo})
            </h6>
            <Boton
              variante="outline-dark"
              tamano="sm"
              claseAdicional="w-auto px-3"
              alHacerClic={alVolverUsuarios}
              texto="← Volver a usuarios"
            />
          </div>
          <TablaPedidos
            pedidos={pedidosHistorialUsuario}
            alVerDetalle={alVerDetallePedido}
          />
        </div>
      ) : (
        <TablaUsuarios
          usuarios={usuarios}
          alEditarUsuario={alEditarUsuario}
          alVerHistorial={alVerHistorial}
        />
      )}
    </div>
  );
};

export default PanelUsuarios;
