import { Link } from "react-router-dom";
import { ReactComponent as DashboardIcon } from '../assets/icons/dashboard.svg';
import { ReactComponent as AccountCircle } from '../assets/icons/account_circle_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg';
import { ReactComponent as ConstrucctionIcon } from '../assets/icons/foundation_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg';
import { ReactComponent as MenuIcon } from '../assets/icons/menu_open_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg';
import { ReactComponent as ReportsIcon } from '../assets/icons/lab_profile_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg';

const Sidebar = () => {
  return (
    <div id="sidebar" className="sidebar">
      <h2>Construcciones S.A.</h2>
      <ul>
        <li>Logo</li>
        <button id="toggle-button">
          <MenuIcon/>
        </button>
        <p>Construcctions</p>
        <li>
          <Link to="/dashboard"> 
          <DashboardIcon/>
          Dashboard
          </Link>
          </li>
        <li>
          <Link to="/dashboard/obras">
          <ConstrucctionIcon/>
          Obras
          </Link>
        </li>
        <li>
          <Link to="/dashboard/reportes">
          <ReportsIcon/>
          Reportes
          </Link>
        </li>
        <li>
          <Link to="/dashboard/perfil">
          <AccountCircle/>
          Perfil
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
