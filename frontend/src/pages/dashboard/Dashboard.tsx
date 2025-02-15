// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/authMe/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <h4>Bienvenido, {user.nombre}</h4>
          <p>Email: {user.email}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Dashboard;
