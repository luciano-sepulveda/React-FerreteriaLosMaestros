# Nombre del equipo

Ferretería Los Maestros Con React

## Integrantes

| Nombre completo | Correo institucional |
| --- | --- |
| Luciano Sepulveda Valdes | luci.sepulveda@duocuc.cl |
| Sergio Peralta | serg.peralta@duocuc.cl |

## Caso

Ferretería Los Maestros.

## Descripción del caso

Ferretería Los Maestros es un negocio familiar de La Serena, con 22 años de trayectoria, que vende materiales de construcción, herramientas y artículos de ferretería general a particulares y contratistas. La ferretería funcionaba con procesos manuales, lo que llevaba a problemas y errores como vender productos sin stock, más de 40 llamadas diarias solo para hacer cotizaciones y problemas en los pagos.

El sistema digitaliza la consulta de stock en tiempo real, el flujo de pedidos (retiro en tienda o despacho), el control de cuentas corrientes de contratistas y la administración de usuarios y roles.

## Estructura del proyecto

```
src/
├── App.jsx
├── main.jsx
├── index.css
├── assets/
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
├── components/
│   ├── atoms/
│   │   ├── Boton.jsx
│   │   ├── CampoNumero.jsx
│   │   ├── Descuento.jsx
│   │   ├── Especificacion.jsx
│   │   ├── Etiqueta.jsx
│   │   ├── Precio.jsx
│   │   └── Stock.jsx
│   ├── molecules/
│   │   ├── BannerOferta.jsx
│   │   ├── CampoFormulario.jsx
│   │   ├── Carrito.jsx
│   │   ├── ControlCantidad.jsx
│   │   ├── FichaTecnica.jsx
│   │   ├── FilaCategoria.jsx
│   │   ├── FilaPedido.jsx
│   │   ├── FilaProducto.jsx
│   │   ├── FilaUsuario.jsx
│   │   ├── FiltroCategoria.jsx
│   │   ├── ResumenTotal.jsx
│   │   ├── TarjetaArticulo.jsx
│   │   ├── TarjetaIndicador.jsx
│   │   └── TarjetaProducto.jsx
│   ├── organisms/
│   │   ├── ComprobanteCompra.jsx
│   │   ├── DetalleProducto.jsx
│   │   ├── ErrorSolicitud.jsx
│   │   ├── Footer.jsx
│   │   ├── FormularioCategoria.jsx
│   │   ├── FormularioCompra.jsx
│   │   ├── FormularioContacto.jsx
│   │   ├── FormularioLogin.jsx
│   │   ├── FormularioProducto.jsx
│   │   ├── FormularioRegistro.jsx
│   │   ├── FormularioUsuario.jsx
│   │   ├── ListaCarrito.jsx
│   │   ├── Navbar.jsx
│   │   ├── PanelCategorias.jsx
│   │   ├── PanelCriticos.jsx
│   │   ├── PanelReportes.jsx
│   │   ├── PanelSolicitudes.jsx
│   │   ├── PanelUsuarios.jsx
│   │   ├── PerfilAdministrador.jsx
│   │   ├── ResumenDashboard.jsx
│   │   ├── ResumenTotales.jsx
│   │   ├── TablaCategorias.jsx
│   │   ├── TablaCriticos.jsx
│   │   ├── TablaInventario.jsx
│   │   ├── TablaPedidos.jsx
│   │   ├── TablaUsuarios.jsx
│   │   └── TarjetaLogin.jsx
│   └── templates/
│       └── LayoutPrincipal.jsx
├── pages/
│   ├── Administracion.jsx
│   ├── Blog.jsx
│   ├── Carrito.jsx
│   ├── Catalogo.jsx
│   ├── Contacto.jsx
│   ├── DetalleBlog.jsx
│   ├── DetalleProducto.jsx
│   ├── Inicio.jsx
│   ├── Login.jsx
│   ├── NoEncontrada.jsx
│   ├── Nosotros.jsx
│   ├── Ofertas.jsx
│   └── Registro.jsx
├── services/
│   ├── categoriaService.js
│   ├── pedidoService.js
│   ├── productoService.js
│   └── usuarioService.js
├── context/
│   ├── Carrito.jsx
│   ├── CarritoContexto.js
│   ├── Sesion.jsx
│   └── SesionContexto.js
├── hooks/
│   ├── useCarrito.js
│   ├── useSesion.js
│   └── useTituloPagina.js
├── utils/
│   ├── formatearPrecio.js
│   ├── reportesUtils.js
│   ├── stockUtils.js
│   └── validaciones.js
└── data/
    ├── articulosBlog.js
    ├── productos.js
    └── usuarios.js
```

## Tecnologías utilizadas

- React
- Vite
- React Bootstrap
- React Router

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

## Material complementario

https://drive.google.com/drive/folders/1Ohfo5ks348yBIH9QcuKaWfnINH91GmTV?usp=sharing

## Bitácora

| Fecha | Integrante | Trabajo |
| --- | --- | --- |
| 24/10/2026 | Luciano-Sepulveda | Pedidos |
| 24/10/2026 | Luciano-Sepulveda | Pantalla de error |
| 24/10/2026 | Luciano-Sepulveda | Sesión y usuarios |
| 24/10/2026 | Luciano-Sepulveda | Panel de administración |
| 24/10/2026 | Luciano-Sepulveda | Limpieza |
| 24/10/2026 | Luciano-Sepulveda | Corrección de errores de lint |
