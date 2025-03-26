import React from "react";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const INACTIVITY_LIMIT = 15 * 60 * 1000; // 🔥 5 minutos de inactividad

const ProtectedRoute = () => {
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        logout(); // 🔥 Cierra sesión si el usuario está inactivo
        navigate("/");
      }, INACTIVITY_LIMIT);
    };

    // Eventos para detectar actividad del usuario
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer(); // Inicia el contador al cargar

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [token, logout, navigate]);

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
