import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import Card from "../../components/Card";
import Chart from "../../components/Chart";
import Table from "../../components/Table";

const Dashboard = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) navigate("/login");
  }, [user, loading, navigate]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <div className="dashboard-main">
          <h1>Panel de Control</h1>
          <div className="dashboard-stats">
            <Card/>
            <Card />
            <Card />
          </div>
          <Chart />
          <Table />
        </div>
      </div>
    </div>
  );
};
  
  export default Dashboard;
