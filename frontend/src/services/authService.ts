import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; 

export const registerUser = async (email: string, password: string) => {
  try {
    await axios.post(`${API_URL}/register`, { email, password });
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || "Error al registrar" };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem("token", res.data.token);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || "Error al iniciar sesión" };
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    
    const res = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    logoutUser();
    return null;
  }
};
