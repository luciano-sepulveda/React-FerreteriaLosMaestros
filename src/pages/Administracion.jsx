import { useState, useEffect } from 'react';
import { Container, Tab, Nav, Alert, Badge } from 'react-bootstrap';
import {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  listarCriticos,
  reiniciarProductos
} from '../services/productoService';
import {
  listarCategorias,
  crearCategoria,
  actualizarCategoria
} from '../services/categoriaService';
import {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario
} from '../services/usuarioService';
import {
  listarPedidos,
  listarPedidosPorCorreo
} from '../services/pedidoService';
import {
  contarPedidosPorTipo,
  calcularMontoCompras,
  obtenerProductosMasSolicitados
} from '../utils/reportesUtils';
import useTituloPagina from '../hooks/useTituloPagina';

import Boton from '../components/atoms/Boton';
import Etiqueta from '../components/atoms/Etiqueta';
import FormularioProducto from '../components/organisms/FormularioProducto';
import FormularioCategoria from '../components/organisms/FormularioCategoria';
import FormularioUsuario from '../components/organisms/FormularioUsuario';
import ResumenDashboard from '../components/organisms/ResumenDashboard';
import TablaInventario from '../components/organisms/TablaInventario';
import TablaCriticos from '../components/organisms/TablaCriticos';
import TablaPedidos from '../components/organisms/TablaPedidos';
import TablaUsuarios from '../components/organisms/TablaUsuarios';
import TablaCategorias from '../components/organisms/TablaCategorias';
import PanelReportes from '../components/organisms/PanelReportes';
import PerfilAdministrador from '../components/organisms/PerfilAdministrador';
import ComprobanteCompra from '../components/organisms/ComprobanteCompra';

const Administracion = () => {
  useTituloPagina('Panel de Administración - Ferretería Los Maestros');

  const [productos, setProductos] = useState([]);
  const [criticos, setCriticos] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [pestanaActiva, setPestanaActiva] = useState('dashboard');

  const [productoEditando, setProductoEditando] = useState(null);
  const [mostrarFormularioProducto, setMostrarFormularioProducto] = useState(false);

  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [mostrarFormularioCategoria, setMostrarFormularioCategoria] = useState(false);

  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [mostrarFormularioUsuario, setMostrarFormularioUsuario] = useState(false);

  const [pedidoDetalle, setPedidoDetalle] = useState(null);
  const [usuarioHistorial, setUsuarioHistorial] = useState(null);

  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [filtroTexto, setFiltroTexto] = useState('');

  const cargarDatos = () => {
    setProductos(listarProductos());
    setCriticos(listarCriticos());
    setUsuarios(listarUsuarios());
    setSolicitudes(listarPedidos());
    setCategorias(listarCategorias());
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const mostrarAlerta = (tipo, texto) => {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje({ tipo: '', texto: '' }), 4000);
  };

  const manejarGuardarProducto = (datosProducto) => {
    if (productoEditando) {
      actualizarProducto(productoEditando.id, datosProducto);
      mostrarAlerta('success', `✓ Producto "${datosProducto.nombre}" actualizado correctamente.`);
    } else {
      crearProducto(datosProducto);
      mostrarAlerta('success', `✓ Nuevo producto "${datosProducto.nombre}" agregado al catálogo.`);
    }
    setProductoEditando(null);
    setMostrarFormularioProducto(false);
    cargarDatos();
  };

  const manejarEliminarProducto = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el producto "${nombre}"?`)) {
      eliminarProducto(id);
      mostrarAlerta('info', `Producto "${nombre}" eliminado del catálogo.`);
      cargarDatos();
    }
  };

  const manejarReponerStock = (id, stockActual) => {
    actualizarProducto(id, { stock: stockActual + 25 });
    mostrarAlerta('success', 'Se han añadido +25 unidades al stock.');
    cargarDatos();
  };

  const manejarReiniciar = () => {
    if (window.confirm('¿Deseas restablecer todos los productos a los valores iniciales de fábrica?')) {
      reiniciarProductos();
      mostrarAlerta('warning', 'Catálogo restablecido a sus valores originales.');
      cargarDatos();
    }
  };

  const manejarGuardarCategoria = (nombreCategoria) => {
    try {
      if (categoriaEditando) {
        actualizarCategoria(categoriaEditando, nombreCategoria);
        mostrarAlerta('success', `✓ Categoría actualizada a "${nombreCategoria}".`);
      } else {
        crearCategoria(nombreCategoria);
        mostrarAlerta('success', `✓ Nueva categoría "${nombreCategoria}" creada.`);
      }
      setCategoriaEditando(null);
      setMostrarFormularioCategoria(false);
      cargarDatos();
    } catch (err) {
      mostrarAlerta('danger', err.message);
    }
  };

  const manejarGuardarUsuario = (datosUsuario) => {
    if (usuarioEditando) {
      actualizarUsuario(usuarioEditando.id, datosUsuario);
      mostrarAlerta('success', `✓ Usuario "${datosUsuario.nombreCompleto}" actualizado.`);
    } else {
      crearUsuario(datosUsuario);
      mostrarAlerta('success', `✓ Nuevo usuario "${datosUsuario.nombreCompleto}" registrado.`);
    }
    setUsuarioEditando(null);
    setMostrarFormularioUsuario(false);
    cargarDatos();
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(filtroTexto.toLowerCase()) ||
    p.codigo.toLowerCase().includes(filtroTexto.toLowerCase()) ||
    p.categoria.toLowerCase().includes(filtroTexto.toLowerCase())
  );

  const totalUnidades = productos.reduce((acc, p) => acc + (p.stock || 0), 0);
  const usuarioAdministrador = usuarios.find((u) => u.rol === 'Administrador Bodega') || usuarios[0];

  const pedidosHistorialUsuario = usuarioHistorial
    ? listarPedidosPorCorreo(usuarioHistorial.correo)
    : [];

  return (
    <Container fluid className="py-4 px-md-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="fs-3">⚙️</span>
            <h1 className="h3 fw-bold text-dark mb-0">Panel de Administración</h1>
            <Etiqueta variante="dark" esPildora={true} claseAdicional="ms-2">
              Bodega Central La Serena
            </Etiqueta>
          </div>
          <p className="text-muted small mb-0">
            Control de inventario, stock crítico, gestión de catálogo y usuarios autorizados.
          </p>
        </div>

        <div className="d-flex gap-2 mt-2 mt-md-0">
          <Boton
            texto="🔄 Restablecer Datos"
            variante="outline-secondary"
            tamano="sm"
            alHacerClic={manejarReiniciar}
            claseAdicional="px-3 w-auto"
          />
          <Boton
            texto="➕ Nuevo Producto"
            variante="warning"
            tamano="sm"
            alHacerClic={() => {
              setProductoEditando(null);
              setMostrarFormularioProducto(true);
              setPestanaActiva('catalogo');
            }}
            claseAdicional="px-3 w-auto"
          />
        </div>
      </div>

      {mensaje.texto && (
        <Alert variant={mensaje.tipo} dismissible onClose={() => setMensaje({ tipo: '', texto: '' })}>
          {mensaje.texto}
        </Alert>
      )}

      <Tab.Container activeKey={pestanaActiva} onSelect={(k) => setPestanaActiva(k)}>
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="dashboard" className="fw-semibold text-dark">
              📊 Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="catalogo" className="fw-semibold text-dark">
              📦 Catálogo ({productos.length})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="criticos" className="fw-semibold text-danger">
              ⚠️ Ítems críticos ({criticos.length})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="solicitudes" className="fw-semibold text-dark">
              📄 Solicitudes ({solicitudes.length})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="categorias" className="fw-semibold text-dark">
              🏷️ Categorías ({categorias.length})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="usuarios" className="fw-semibold text-dark">
              👥 Usuarios ({usuarios.length})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="reportes" className="fw-semibold text-dark">
              📈 Reportes
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="perfil" className="fw-semibold text-dark">
              👤 Perfil
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="dashboard">
            <ResumenDashboard
              cantidadProductos={productos.length}
              cantidadCategorias={categorias.length}
              cantidadCriticos={criticos.length}
              totalUnidades={totalUnidades}
              cantidadUsuarios={usuarios.length}
              criticos={criticos}
              usuarioAdministrador={usuarioAdministrador}
              alCambiarPestana={setPestanaActiva}
              alReponerStock={manejarReponerStock}
            />
          </Tab.Pane>

          <Tab.Pane eventKey="catalogo">
            {mostrarFormularioProducto && (
              <div className="mb-4">
                <FormularioProducto
                  productoAEditar={productoEditando}
                  alGuardar={manejarGuardarProducto}
                  alCancelar={() => {
                    setMostrarFormularioProducto(false);
                    setProductoEditando(null);
                  }}
                />
              </div>
            )}

            <TablaInventario
              productos={productosFiltrados}
              filtroTexto={filtroTexto}
              alCambiarFiltro={setFiltroTexto}
              alNuevoProducto={() => {
                setProductoEditando(null);
                setMostrarFormularioProducto(true);
              }}
              alEditarProducto={(item) => {
                setProductoEditando(item);
                setMostrarFormularioProducto(true);
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              alEliminarProducto={manejarEliminarProducto}
            />
          </Tab.Pane>

          <Tab.Pane eventKey="criticos">
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

              <TablaCriticos criticos={criticos} alReponerStock={manejarReponerStock} />
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="solicitudes">
            <div className="bg-white p-4 rounded-4 shadow-sm border">
              <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">
                Historial de Solicitudes y Pedidos Recibidos
              </h5>

              {pedidoDetalle ? (
                <ComprobanteCompra
                  orden={pedidoDetalle}
                  alVolverAlCatalogo={() => setPedidoDetalle(null)}
                  textoVolver="Volver a solicitudes"
                />
              ) : (
                <TablaPedidos
                  pedidos={solicitudes}
                  alVerDetalle={(pedido) => setPedidoDetalle(pedido)}
                />
              )}
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="categorias">
            <div className="bg-white p-4 rounded-4 shadow-sm border">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                <div>
                  <h5 className="fw-bold text-dark mb-0">Gestión de Categorías</h5>
                  <small className="text-muted">Clasificación de productos del catálogo.</small>
                </div>
                <Boton
                  variante="warning"
                  tamano="sm"
                  claseAdicional="w-auto px-3 fw-bold"
                  alHacerClic={() => {
                    setCategoriaEditando(null);
                    setMostrarFormularioCategoria(true);
                  }}
                  texto="➕ Nueva Categoría"
                />
              </div>

              {mostrarFormularioCategoria && (
                <FormularioCategoria
                  categoriaAEditar={categoriaEditando}
                  alGuardar={manejarGuardarCategoria}
                  alCancelar={() => {
                    setMostrarFormularioCategoria(false);
                    setCategoriaEditando(null);
                  }}
                />
              )}

              <TablaCategorias
                categorias={categorias}
                alEditarCategoria={(cat) => {
                  setCategoriaEditando(cat);
                  setMostrarFormularioCategoria(true);
                }}
              />
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="usuarios">
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
                  alHacerClic={() => {
                    setUsuarioEditando(null);
                    setMostrarFormularioUsuario(true);
                  }}
                  texto="➕ Nuevo Usuario"
                />
              </div>

              {mostrarFormularioUsuario && (
                <FormularioUsuario
                  usuarioAEditar={usuarioEditando}
                  alGuardar={manejarGuardarUsuario}
                  alCancelar={() => {
                    setMostrarFormularioUsuario(false);
                    setUsuarioEditando(null);
                  }}
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
                      alHacerClic={() => setUsuarioHistorial(null)}
                      texto="← Volver a usuarios"
                    />
                  </div>
                  <TablaPedidos
                    pedidos={pedidosHistorialUsuario}
                    alVerDetalle={(pedido) => {
                      setPedidoDetalle(pedido);
                      setPestanaActiva('solicitudes');
                    }}
                  />
                </div>
              ) : (
                <TablaUsuarios
                  usuarios={usuarios}
                  alEditarUsuario={(usr) => {
                    setUsuarioEditando(usr);
                    setMostrarFormularioUsuario(true);
                  }}
                  alVerHistorial={(usr) => setUsuarioHistorial(usr)}
                />
              )}
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="reportes">
            <PanelReportes
              conteoPedidos={contarPedidosPorTipo(solicitudes)}
              montoTotalCompras={calcularMontoCompras(solicitudes)}
              productosMasSolicitados={obtenerProductosMasSolicitados(solicitudes)}
            />
          </Tab.Pane>

          <Tab.Pane eventKey="perfil">
            <PerfilAdministrador usuario={usuarioAdministrador} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default Administracion;
