import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

const LayoutPrincipal = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutPrincipal;