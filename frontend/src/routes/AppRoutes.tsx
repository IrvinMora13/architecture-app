import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import NavBar from "../components/NavBar";

const AppRoutes = () => {
  const location = useLocation();
  const hideNavRoutes = ["/dashboard"]; 

  return (
    <AuthProvider>
      {!hideNavRoutes.includes(location.pathname) && <NavBar />} 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
