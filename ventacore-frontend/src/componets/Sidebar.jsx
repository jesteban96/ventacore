import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, BarChart, ShoppingCart, Users, Package, FileText, LogOut, ChevronDown } from "lucide-react";
import useAuthStore from "../store/authStore";

const Sidebar = () => {
  const { logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <>
      {/* Botón para abrir/cerrar menú en móviles */}
      <button className="md:hidden p-3 fixed top-4 left-4 bg-blue-600 text-white rounded" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 bg-blue-800 text-white w-64 p-5 transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0 h-screen" : "-translate-x-full h-screen"} md:translate-x-0 md:relative md:w-60`}>
        {/* Título y botón cerrar en móviles */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button className="md:hidden p-2 bg-red-500 rounded" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/dashboard" className="flex items-center p-3 hover:bg-blue-700 rounded">
                <BarChart className="mr-3" /> Estadísticas
              </Link>
            </li>

            {/* Ventas */}
            <li>
              <button className="flex items-center justify-between w-full p-3 hover:bg-blue-700 rounded" onClick={() => toggleMenu("ventas")}>  
                <div className="flex items-center">
                  <ShoppingCart className="mr-3" /> Ventas
                </div>
                <ChevronDown className={`transform transition-transform ${openMenu === "ventas" ? "rotate-180" : "rotate-0"}`} />
              </button>
              {openMenu === "ventas" && (
                <ul className="pl-6 space-y-2">
                  <li><Link to="/ventas" className="block p-2 hover:bg-blue-600 rounded">Realizar Venta</Link></li>
                  <li><Link to="/cotizaciones" className="block p-2 hover:bg-blue-600 rounded">Cotizaciones</Link></li>
                </ul>
              )}
            </li>

            {/* Inventario */}
            <li>
              <button className="flex items-center justify-between w-full p-3 hover:bg-blue-700 rounded" onClick={() => toggleMenu("inventario")}>  
                <div className="flex items-center">
                  <Package className="mr-3" /> Inventario
                </div>
                <ChevronDown className={`transform transition-transform ${openMenu === "inventario" ? "rotate-180" : "rotate-0"}`} />
              </button>
              {openMenu === "inventario" && (
                <ul className="pl-6 space-y-2">
                  <li><Link to="/productos" className="block p-2 hover:bg-blue-600 rounded">Productos</Link></li>
                  <li><Link to="/categorias" className="block p-2 hover:bg-blue-600 rounded">Categorías</Link></li>
                  <li><Link to="/proveedores" className="block p-2 hover:bg-blue-600 rounded">Proveedores</Link></li>
                </ul>
              )}
            </li>

            {/* Finanzas */}
            <li>
              <button className="flex items-center justify-between w-full p-3 hover:bg-blue-700 rounded" onClick={() => toggleMenu("finanzas")}>  
                <div className="flex items-center">
                  <FileText className="mr-3" /> Finanzas
                </div>
                <ChevronDown className={`transform transition-transform ${openMenu === "finanzas" ? "rotate-180" : "rotate-0"}`} />
              </button>
              {openMenu === "finanzas" && (
                <ul className="pl-6 space-y-2">
                  <li><Link to="/egresos" className="block p-2 hover:bg-blue-600 rounded">Egresos</Link></li>
                  <li><Link to="/balance" className="block p-2 hover:bg-blue-600 rounded">Balance</Link></li>
                </ul>
              )}
            </li>

            {/* Cerrar sesión */}
            <li>
              <button className="flex items-center p-3 hover:bg-red-700 rounded w-full" onClick={handleLogout}>
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
