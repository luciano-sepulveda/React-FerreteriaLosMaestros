import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutPrincipal from './components/templates/LayoutPrincipal';
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPrincipal />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;