import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Tab, Nav, Alert, Badge } from 'react-bootstrap';
import {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  listarCriticos,
  reiniciarProductos
} from '../services/productoService';
import FormularioProducto from '../components/organisms/FormularioProducto';
import Boton from '../components/atoms/Boton';
import Etiqueta from '../components/atoms/Etiqueta';
import Stock from '../components/atoms/Stock';
import { formatearPrecio } from '../utils/formatearPrecio';
import useTituloPagina from '../hooks/useTituloPagina';

const Administracion = () => {
  useTituloPagina('Panel de Administración - Ferretería Los Maestros');

  const [productos, setProductos] = useState([]);
  const [criticos, setCriticos] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [pestanaActiva, setPestanaActiva] = useState('dashboard');
  const [productoEditando, setProductoEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [filtroTexto, setFiltroTexto] = useState('');

  const cargarDatos = () => {
    const prods = listarProductos();
    setProductos(prods);
    setCriticos(listarCriticos());

    // Cargar usuarios
    const usrs = JSON.parse(localStorage.getItem('ferreteria_usuarios') || '[]');
    setUsuarios(usrs);

    // Cargar órdenes o pedidos si existen
    const ordenesGuardadas = JSON.parse(localStorage.getItem('ferreteria_pedidos') || '[]');
    setSolicitudes(ordenesGuardadas);
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
    setMostrarFormulario(false);
    cargarDatos();
  };

  const manejarEliminar = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el producto "${nombre}"?`)) {
      eliminarProducto(id);
      mostrarAlerta('info', `Producto "${nombre}" eliminado del catálogo.`);
      cargarDatos();
    }
  };

  const manejarReponerStock = (id, stockActual) => {
    actualizarProducto(id, { stock: stockActual + 25 });
    mostrarAlerta('success', `Se han añadido +25 unidades al stock.`);
    cargarDatos();
  };

  const manejarReiniciar = () => {
    if (window.confirm('¿Deseas restablecer todos los productos a los valores iniciales de fábrica?')) {
      reiniciarProductos();
      mostrarAlerta('warning', 'Catálogo restablecido a sus valores originales.');
      cargarDatos();
    }
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(filtroTexto.toLowerCase()) ||
    p.codigo.toLowerCase().includes(filtroTexto.toLowerCase()) ||
    p.categoria.toLowerCase().includes(filtroTexto.toLowerCase())
  );

  return (
    <Container fluid className="py-4 px-md-5">
      {/* Encabezado del Panel */}
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
            claseAdicional="px-3"
          />
          <Boton
            texto="➕ Nuevo Producto"
            variante="warning"
            tamano="sm"
            alHacerClic={() => {
              setProductoEditando(null);
              setMostrarFormulario(true);
              setPestanaActiva('catalogo');
            }}
            claseAdicional="px-3"
          />
        </div>
      </div>

      {mensaje.texto && (
        <Alert variant={mensaje.tipo} dismissible onClose={() => setMensaje({ tipo: '', texto: '' })}>
          {mensaje.texto}
        </Alert>
      )}

      {/* Pestañas de Navegación del Panel */}
      <Tab.Container activeKey={pestanaActiva} onSelect={(k) => setPestanaActiva(k)}>
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="dashboard" className="fw-semibold text-dark">
              📊 Resumen Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="catalogo" className="fw-semibold text-dark">
              📦 Catálogo y CRUD ({productos.length})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="criticos" className="fw-semibold text-danger">
              ⚠️ Ítems Críticos ({criticos.length})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="solicitudes" className="fw-semibold text-dark">
              📄 Solicitudes y Pedidos ({solicitudes.length})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="usuarios" className="fw-semibold text-dark">
              👥 Usuarios Registrados ({usuarios.length})
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          {/* 1. DASHBOARD */}
          <Tab.Pane eventKey="dashboard">
            <Row className="g-3 mb-4">
              <Col sm={6} lg={3}>
                <Card className="border-0 shadow-sm rounded-4 p-3 bg-white border-start border-warning border-4">
                  <span className="text-muted small">Total Catálogo</span>
                  <h3 className="fw-bold text-dark mt-1">{productos.length} ítems</h3>
                  <small className="text-secondary">Distribuido en 9 categorías</small>
                </Card>
              </Col>

              <Col sm={6} lg={3}>
                <Card className="border-0 shadow-sm rounded-4 p-3 bg-white border-start border-danger border-4">
                  <span className="text-muted small">Stock Crítico (Bajo)</span>
                  <h3 className="fw-bold text-danger mt-1">{criticos.length} productos</h3>
                  <small className="text-danger">Requieren orden de reposición</small>
                </Card>
              </Col>

              <Col sm={6} lg={3}>
                <Card className="border-0 shadow-sm rounded-4 p-3 bg-white border-start border-success border-4">
                  <span className="text-muted small">Unidades en Bodega</span>
                  <h3 className="fw-bold text-success mt-1">
                    {productos.reduce((acc, p) => acc + (p.stock || 0), 0)} u.
                  </h3>
                  <small className="text-muted">Valorizadas con IVA inc.</small>
                </Card>
              </Col>

              <Col sm={6} lg={3}>
                <Card className="border-0 shadow-sm rounded-4 p-3 bg-white border-start border-primary border-4">
                  <span className="text-muted small">Clientes Registrados</span>
                  <h3 className="fw-bold text-primary mt-1">{usuarios.length || 3} cuentas</h3>
                  <small className="text-muted">Particulares y Contratistas</small>
                </Card>
              </Col>
            </Row>

            {/* Acciones directas del Dashboard */}
            <Row className="g-4">
              <Col lg={7}>
                <Card className="border-0 shadow-sm rounded-4 p-4 bg-white">
                  <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">Atención Rápida de Bodega</h5>
                  {criticos.length > 0 ? (
                    <div>
                      <p className="text-muted small">
                        Los siguientes productos han caído bajo el umbral mínimo de seguridad:
                      </p>
                      <Table hover responsive className="small align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Código</th>
                            <th>Producto</th>
                            <th>Stock</th>
                            <th>Mínimo</th>
                            <th>Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {criticos.map((item) => (
                            <tr key={item.id}>
                              <td><Etiqueta variante="light">{item.codigo}</Etiqueta></td>
                              <td className="fw-semibold">{item.nombre}</td>
                              <td><span className="badge bg-danger">{item.stock}</span></td>
                              <td>{item.stockMinimo}</td>
                              <td>
                                <button
                                  className="btn btn-sm btn-outline-success py-0"
                                  onClick={() => manejarReponerStock(item.id, item.stock)}
                                >
                                  +25 Reponer
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  ) : (
                    <p className="text-success small mb-0">✓ No hay productos con quiebre de stock en este momento.</p>
                  )}
                </Card>
              </Col>

              <Col lg={5}>
                <Card className="border-0 shadow-sm rounded-4 p-4 bg-dark text-white">
                  <h5 className="fw-bold text-warning border-bottom border-secondary pb-2 mb-3">
                    Perfil del Administrador
                  </h5>
                  <p className="small text-light opacity-75 mb-1">
                    <strong>Usuario Activo:</strong> Administrador de Faenas / Bodega
                  </p>
                  <p className="small text-light opacity-75 mb-1">
                    <strong>Sucursal:</strong> Balmaceda 1420, La Serena
                  </p>
                  <p className="small text-light opacity-75 mb-3">
                    <strong>Permisos:</strong> CRUD Catálogo, Control de Stock, Validación de Pedidos
                  </p>
                  <div className="p-3 bg-secondary bg-opacity-25 rounded-3 text-center">
                    <span className="small text-warning fw-bold d-block">Sistema Los Maestros v2.0</span>
                    <small className="text-light opacity-75">React + Bootstrap + LocalStorage</small>
                  </div>
                </Card>
              </Col>
            </Row>
          </Tab.Pane>

          {/* 2. CATÁLOGO Y CRUD COMPLETO */}
          <Tab.Pane eventKey="catalogo">
            {mostrarFormulario && (
              <div className="mb-4">
                <FormularioProducto
                  productoAEditar={productoEditando}
                  alGuardar={manejarGuardarProducto}
                  alCancelar={() => {
                    setMostrarFormulario(false);
                    setProductoEditando(null);
                  }}
                />
              </div>
            )}

            <div className="bg-white p-4 rounded-4 shadow-sm border">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <input
                  type="search"
                  className="form-control form-control-sm"
                  style={{ maxWidth: '320px' }}
                  placeholder="Buscar por código, nombre o categoría..."
                  value={filtroTexto}
                  onChange={(e) => setFiltroTexto(e.target.value)}
                />

                <button
                  className="btn btn-warning btn-sm fw-bold"
                  onClick={() => {
                    setProductoEditando(null);
                    setMostrarFormulario(true);
                  }}
                >
                  ➕ Agregar Producto
                </button>
              </div>

              <div className="table-responsive">
                <Table hover bordered className="align-middle small">
                  <thead className="table-dark">
                    <tr>
                      <th>Código</th>
                      <th>Nombre del Producto</th>
                      <th>Categoría</th>
                      <th>Marca</th>
                      <th className="text-end">Precio Venta</th>
                      <th className="text-center">Stock</th>
                      <th className="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosFiltrados.map((item) => (
                      <tr key={item.id}>
                        <td><Etiqueta variante="light">{item.codigo}</Etiqueta></td>
                        <td>
                          <strong>{item.nombre}</strong>
                          <span className="d-block text-muted" style={{ fontSize: '0.75rem' }}>{item.unidad}</span>
                        </td>
                        <td>{item.categoria}</td>
                        <td>{item.marca}</td>
                        <td className="text-end fw-semibold">{formatearPrecio(item.precioVenta)}</td>
                        <td className="text-center">
                          <Stock stock={item.stock} stockMinimo={item.stockMinimo} />
                        </td>
                        <td className="text-center">
                          <div className="d-inline-flex gap-1">
                            <button
                              className="btn btn-sm btn-outline-primary py-1 px-2"
                              title="Editar"
                              onClick={() => {
                                setProductoEditando(item);
                                setMostrarFormulario(true);
                                window.scrollTo({ top: 120, behavior: 'smooth' });
                              }}
                            >
                              ✏️
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger py-1 px-2"
                              title="Eliminar"
                              onClick={() => manejarEliminar(item.id, item.nombre)}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Tab.Pane>

          {/* 3. ÍTEMS CRÍTICOS */}
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

              {criticos.length === 0 ? (
                <div className="text-center py-4 text-success">
                  <p className="fs-5 mb-0">✓ No hay productos en nivel crítico. Todo el inventario está sobre el mínimo.</p>
                </div>
              ) : (
                <Table hover responsive className="align-middle small">
                  <thead className="table-light">
                    <tr>
                      <th>Código</th>
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th className="text-center">Stock Actual</th>
                      <th className="text-center">Stock Mínimo</th>
                      <th className="text-center">Déficit</th>
                      <th className="text-end">Acción Rápida</th>
                    </tr>
                  </thead>
                  <tbody>
                    {criticos.map((prod) => (
                      <tr key={prod.id}>
                        <td><Etiqueta variante="light">{prod.codigo}</Etiqueta></td>
                        <td className="fw-semibold">{prod.nombre}</td>
                        <td>{prod.categoria}</td>
                        <td className="text-center fw-bold text-danger">{prod.stock}</td>
                        <td className="text-center text-muted">{prod.stockMinimo}</td>
                        <td className="text-center text-danger fw-bold">
                          -{Math.max(0, prod.stockMinimo - prod.stock)} u.
                        </td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-success fw-bold"
                            onClick={() => manejarReponerStock(prod.id, prod.stock)}
                          >
                            📥 Reponer +25 u.
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </Tab.Pane>

          {/* 4. SOLICITUDES Y PEDIDOS */}
          <Tab.Pane eventKey="solicitudes">
            <div className="bg-white p-4 rounded-4 shadow-sm border">
              <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">
                Historial de Solicitudes y Pedidos Recibidos
              </h5>

              {solicitudes.length === 0 ? (
                <div className="text-center py-5">
                  <div className="fs-1 mb-2">📋</div>
                  <h6 className="fw-bold text-dark">No hay pedidos registrados en el historial</h6>
                  <p className="text-muted small">
                    Cuando los clientes completen el carrito o cotizaciones aparecerán aquí para su preparación y despacho.
                  </p>
                </div>
              ) : (
                <Table hover responsive className="align-middle small">
                  <thead className="table-light">
                    <tr>
                      <th>Folio</th>
                      <th>Fecha</th>
                      <th>Cliente</th>
                      <th>Tipo</th>
                      <th>Entrega</th>
                      <th className="text-end">Total</th>
                      <th className="text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solicitudes.map((sol, index) => (
                      <tr key={index}>
                        <td><Etiqueta variante="light">{sol.folio}</Etiqueta></td>
                        <td>{sol.fecha}</td>
                        <td>{sol.nombreCompleto}</td>
                        <td>
                          <Badge bg={sol.esCotizacion ? 'info' : 'success'}>
                            {sol.esCotizacion ? 'Cotización' : 'Compra'}
                          </Badge>
                        </td>
                        <td>{sol.tipoEntrega}</td>
                        <td className="text-end fw-bold">{formatearPrecio(sol.totalPagar)}</td>
                        <td className="text-center">
                          <Badge bg="warning" text="dark">En preparación</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </Tab.Pane>

          {/* 5. GESTIÓN DE USUARIOS */}
          <Tab.Pane eventKey="usuarios">
            <div className="bg-white p-4 rounded-4 shadow-sm border">
              <h5 className="fw-bold text-dark border-bottom pb-2 mb-3">
                Directorio de Usuarios y Clientes
              </h5>

              <Table hover responsive className="align-middle small">
                <thead className="table-light">
                  <tr>
                    <th>Nombre</th>
                    <th>RUT</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Perfil</th>
                    <th>Razón Social</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-warning">
                    <td className="fw-bold">Don Mario Sepúlveda</td>
                    <td>7.654.321-0</td>
                    <td>admin@ferreterialosmaestros.cl</td>
                    <td>+56 51 222 3344</td>
                    <td><Badge bg="dark">Administrador Bodega</Badge></td>
                    <td>Ferretería Los Maestros Ltda.</td>
                  </tr>
                  <tr>
                    <td className="fw-semibold">Constructora Elqui SpA</td>
                    <td>76.999.888-1</td>
                    <td>compras@constructoraelqui.cl</td>
                    <td>+56 9 8877 6655</td>
                    <td><Badge bg="warning" text="dark">Contratista (Crédito)</Badge></td>
                    <td>Constructora Elqui SpA</td>
                  </tr>
                  {usuarios.map((usr, i) => (
                    <tr key={i}>
                      <td className="fw-semibold">{usr.nombreCompleto}</td>
                      <td>{usr.rut}</td>
                      <td>{usr.correo}</td>
                      <td>{usr.telefono}</td>
                      <td><Badge bg="secondary">{usr.rol || 'Particular'}</Badge></td>
                      <td>{usr.razonSocial || 'Particular'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default Administracion;
