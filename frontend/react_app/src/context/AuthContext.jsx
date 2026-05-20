// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService, logout as logoutService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
const [role, setRole] = useState(() => localStorage.getItem("role"));
  const navigate = useNavigate();

  const login = async (username, password) => {
    const data = await loginService(username, password);
    localStorage.setItem("token", data.access_token);
    
    // Decodifica el token para extraer el rol
    const payload = JSON.parse(atob(data.access_token.split(".")[1]));
    localStorage.setItem("role", payload.role);
    
    setToken(data.access_token);
    setRole(payload.role);
    navigate("/home");
  };

  const logout = () => {
    logoutService();
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}