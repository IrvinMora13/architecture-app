import React from 'react';
import NavBar from '../../components/NavBar';
import AuthButtons from '../../components/AuthButtons';



const Home = () => {
  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h2>Bienvenido a la Aplicación de Arquitectura</h2>
        <p>Este es un sistema para registrar obras y ver su avance.</p>
        <AuthButtons />
      </div>
    </>
  );
};

export default Home;
