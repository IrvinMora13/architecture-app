import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactComponent as DashboardIcon } from '../assets/icons/dashboard.svg';
import { ReactComponent as AccountCircle } from '../assets/icons/account_circle_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg';
import { ReactComponent as ConstrucctionIcon } from '../assets/icons/foundation_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg';
import { ReactComponent as MenuIcon } from '../assets/icons/menu_open_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg';
import { ReactComponent as ReportsIcon } from '../assets/icons/lab_profile_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg';
import styles from "../styles/SideBar.module.css";

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean, toggleSidebar: () => void }) => {
  const { logout } = useAuth();

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        <MenuIcon />
      </button>
      <div className={styles.brand}>Construcciones S.A.</div>
      <ul>
        <li>
          <Link to="/dashboard">
            <DashboardIcon />
            {isOpen && "Dashboard"}
          </Link>
        </li>
        <li>
          <Link to="/dashboard/obras">
            <ConstrucctionIcon />
            {isOpen && "Obras"}
          </Link>
        </li>
        <li>
          <Link to="/dashboard/reportes">
            <ReportsIcon />
            {isOpen && "Reportes"}
          </Link>
        </li>
        <li>
          <Link to="/dashboard/perfil">
            <AccountCircle />
            {isOpen && "Perfil"}
          </Link>
        </li>
        <li className={styles.logout}>
          <button className="btn btn-danger d-flex align-items-center gap-2" onClick={logout}>
            <LogoutIcon />
            {isOpen && "Cerrar Sesión"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
