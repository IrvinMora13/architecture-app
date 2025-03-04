import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import ChartBar from "../../components/ChartBar";
import styles from "../../styles/Dashboard.module.css";

interface Project {
  name: string;
  type_id: number;
  progress_percentage: string;
}

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    axios.get<Project[]>("http://localhost:5000/api/auth/active-projects")
      .then(response => {
        const projects = response.data;
        setLabels(projects.map(proj => proj.name));
        setData(projects.map(proj => parseFloat(proj.progress_percentage))); // Convertir a número
      })
      .catch(error => console.error("Error al obtener datos:", error));
  }, [user, loading, navigate]);
    

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="row">
          <div className={`${styles.dashboardContainer} ${isSidebarOpen ? styles.expanded : styles.collapsed}`}>
            <h1>Panel de Control</h1>
          </div>
        </div>
        <div className="row">
          <div className="dashboard-stats ms-5 row">
            <div className="col-6">
            <ChartBar labels={labels} data={data} title="Avance de Proyectos (%)" />
            </div>
            <div className="col-6">

            </div>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;
