import React, { useState } from 'react';
import { Navbar as BsNavbar, Container, Nav, Form, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCarrito } from '../../hooks/useCarrito';
import Etiqueta from '../atoms/Etiqueta';

const Navbar = () => {
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const navegar = useNavigate();
  const { cantidadTotalArticulos } = useCarrito();

  const manejarBuscar = (evento) => {
    evento.preventDefault();
    if (textoBusqueda.trim()) {
      navegar(`/buscar/${encodeURIComponent(textoBusqueda.trim())}`);
      setTextoBusqueda('');
    } else {
      navegar('/catalogo');
    }
  };

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="shadow-sm sticky-top border-bottom border-warning border-2">
      <Container>
        <BsNavbar.Brand as={NavLink} to="/" className="fw-bold text-warning fs-4 d-flex align-items-center gap-2">
          <span>🔨</span>
          <span>Ferretería Los Maestros</span>
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="menu-navegacion" />

        <BsNavbar.Collapse id="menu-navegacion">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link as={NavLink} to="/" end className="fw-semibold">
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/catalogo" className="fw-semibold">
              Catálogo
            </Nav.Link>
            <Nav.Link as={NavLink} to="/ofertas" className="fw-semibold text-warning">
              🔥 Ofertas
            </Nav.Link>
            <Nav.Link as={NavLink} to="/carrito" className="fw-semibold">
              Carrito y Compras
            </Nav.Link>
          </Nav>

          <Form className="d-flex my-2 my-lg-0 me-lg-3" onSubmit={manejarBuscar}>
            <Form.Control
              type="search"
              placeholder="Buscar materiales o herramientas"
              className="me-2 form-control-sm"
              value={textoBusqueda}
              onChange={(evento) => setTextoBusqueda(evento.target.value)}
              aria-label="Buscar"
            />
            <Button variant="outline-warning" size="sm" type="submit" className="fw-semibold">
              Buscar
            </Button>
          </Form>

          <Nav className="ms-lg-2 d-flex flex-row align-items-center gap-2">
            <Button
              as={NavLink}
              to="/carrito"
              variant="outline-warning"
              size="sm"
              className="fw-bold d-flex align-items-center gap-1"
            >
              <span>🛒</span>
              <span>Carrito</span>
              {cantidadTotalArticulos > 0 && (
                <Etiqueta variante="warning" esPildora={true} claseAdicional="text-dark ms-1">
                  {cantidadTotalArticulos}
                </Etiqueta>
              )}
            </Button>

            <Button
              as={NavLink}
              to="/login"
              variant="warning"
              size="sm"
              className="fw-bold text-dark px-3"
            >
              Iniciar Sesión
            </Button>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;