import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutPrincipal from './components/templates/LayoutPrincipal';
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import NoEncontrada from './pages/NoEncontrada';
import { CarritoProvider } from './context/Carrito';

const App = () => {
  return (
    <CarritoProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutPrincipal />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/categoria/:nombre" element={<Catalogo />} />
            <Route path="/buscar/:texto" element={<Catalogo />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NoEncontrada />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  );
};

export default App;