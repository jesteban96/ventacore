import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, BarChart, ShoppingCart, Users, LogOut } from "lucide-react";
import useAuthStore from "../store/authStore";

const Sidebar = () => {
    const { logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Hook para redirigir

  // Función para cerrar sesión
  const handleLogout = () => {
    logout();
    navigate("/"); // Redirigir a la pantalla de login
  };

  return (
    <>
      {/* Botón para abrir el menú en móviles */}
      <button
        className="md:hidden p-3 fixed top-4 left-4  bg-blue-600 text-white rounded z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0  bg-blue-800 text-white w-64 p-5 transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0 h-screen" : "-translate-x-full h-100hv"} md:translate-x-0 md:relative md:w-60`}
      >
        {/* Contenedor del título y botón de cerrar en móviles */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          {/* Botón para cerrar el sidebar en móviles */}
          <button
            className="md:hidden p-2 bg-red-500 rounded"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-3 hover:bg-blue-700 rounded"
              >
                <BarChart className="mr-3" /> Estadísticas
              </Link>
            </li>
            <li>
              <Link
                to="/ventas"
                className="flex items-center p-3 hover:bg-blue-700 rounded"
              >
                <ShoppingCart className="mr-3" /> Ventas
              </Link>
            </li>
            <li>
              <Link
                to="/clientes"
                className="flex items-center p-3 hover:bg-blue-700 rounded"
              >
                <Users className="mr-3" /> Clientes
              </Link>
            </li>
            <li>
              <button
                className="flex items-center p-3 hover:bg-red-700 rounded w-full"
                onClick={handleLogout}
              >
                <LogOut className="mr-3" /> Cerrar sesión
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
