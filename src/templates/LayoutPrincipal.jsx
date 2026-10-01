import React from 'react';
import Navbar from '../organisms/Navbar';
import { Container } from 'react-bootstrap';

const LayoutPrincipal = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Navbar superior */}
      <Navbar />

      {/* Contenido principal inyectado según la página */}
      <main className="flex-grow-1">
        {children}
      </main>

      {/* Footer sencillo de la Ferretería */}
      <footer className="bg-dark text-light py-3 mt-auto text-center border-top border-warning">
        <Container>
          <small>
            &copy; {new Date().getFullYear()} Ferretería Los Maestros — La Serena, Chile.
          </small>
        </Container>
      </footer>
    </div>
  );
};

export default LayoutPrincipal;