import React from 'react';
import { Navbar as BsNavbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="shadow-sm sticky-top">
      <Container>
        <BsNavbar.Brand as={NavLink} to="/" className="fw-bold text-warning fs-4">
          Ferretería Los Maestros
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="menu-navegacion" />

        <BsNavbar.Collapse id="menu-navegacion">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link as={NavLink} to="/" end eventKey="/">Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/catalogo" eventKey="/catalogo">Catálogo</Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            <Button as={Link} to="/login" variant="outline-warning" size="sm" className="fw-semibold">
              Iniciar Sesión
            </Button>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;