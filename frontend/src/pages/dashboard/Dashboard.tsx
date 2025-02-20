import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../../services/authService";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getCurrentUser();
      if (!userData) {
        navigate("/login");
      } else {
        setUser(userData);
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
              logoutUser();
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
