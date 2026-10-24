import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutPrincipal from './components/templates/LayoutPrincipal';
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import DetalleProducto from './pages/DetalleProducto';
import Ofertas from './pages/Ofertas';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Blog from './pages/Blog';
import DetalleBlog from './pages/DetalleBlog';
import Administracion from './pages/Administracion';
import NoEncontrada from './pages/NoEncontrada';
import { CarritoProvider } from './context/Carrito';
import { SesionProvider } from './context/Sesion';

const App = () => {
  return (
    <SesionProvider>
      <CarritoProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<LayoutPrincipal />}>
              <Route path="/" element={<Inicio />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/ofertas" element={<Ofertas />} />
              <Route path="/producto/:id" element={<DetalleProducto />} />
              <Route path="/categoria/:nombre" element={<Catalogo />} />
              <Route path="/buscar/:texto" element={<Catalogo />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<DetalleBlog />} />
              <Route path="/admin" element={<Administracion />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="*" element={<NoEncontrada />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CarritoProvider>
    </SesionProvider>
  );
};

export default App;