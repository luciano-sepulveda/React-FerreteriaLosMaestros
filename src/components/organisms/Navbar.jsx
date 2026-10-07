import React from 'react';
import { Navbar as BsNavbar, Container, Nav, Button } from 'react-bootstrap';

const Navbar = () => {
  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" className="shadow-sm sticky-top">
      <Container>
        {/* Logo / Nombre de la empresa */}
        <BsNavbar.Brand href="#inicio" className="fw-bold text-warning fs-4">
          Ferretería Los Maestros
        </BsNavbar.Brand>

        {/* Botón hamburguesa para móviles (< 768px) */}
        <BsNavbar.Toggle aria-controls="menu-navegacion" />

        {/* Opciones del menú */}
        <BsNavbar.Collapse id="menu-navegacion">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link href="#catalogo">Catálogo</Nav.Link>
            <Nav.Link href="#cobertura">Mapa de Cobertura</Nav.Link>
            <Nav.Link href="#pedidos">Mis Pedidos</Nav.Link>
          </Nav>
          
          {/* Acción secundaria / Login */}
          <Nav className="ms-auto">
            <Button variant="outline-warning" size="sm" className="fw-semibold">
              Iniciar Sesión
            </Button>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;