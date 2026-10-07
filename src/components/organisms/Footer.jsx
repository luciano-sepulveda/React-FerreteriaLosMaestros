import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto text-center border-top border-warning">
      <Container>
        <small>
          &copy; {new Date().getFullYear()} Ferretería Los Maestros — La Serena, Chile.
        </small>
      </Container>
    </footer>
  );
};

export default Footer;