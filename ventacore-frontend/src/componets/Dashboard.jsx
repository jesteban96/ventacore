import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Dashboard = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirigir al login al cerrar sesión
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Dashboard</h2>
        <p className="text-gray-600 text-center mt-2">Bienvenido al sistema de ventas.</p>

        <button
          onClick={handleLogout}
          className="w-full mt-4 p-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded transition duration-300"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
