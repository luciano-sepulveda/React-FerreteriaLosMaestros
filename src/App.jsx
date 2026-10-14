import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutPrincipal from './components/templates/LayoutPrincipal';
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import NoEncontrada from './pages/NoEncontrada';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPrincipal />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/categoria/:nombre" element={<Catalogo />} />
          <Route path="/buscar/:texto" element={<Catalogo />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;