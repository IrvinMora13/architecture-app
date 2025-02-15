import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <h2>Bienvenido a la Aplicación de Arquitectura</h2>
      <p>Este es un sistema para registrar obras y ver su avance.</p>
      <div>
        <Link to="/login" className="btn btn-primary me-3">Iniciar sesión</Link>
        <Link to="/register" className="btn btn-secondary">Registrar usuario</Link>
      </div>
    </div>
  );
};

export default Home;
