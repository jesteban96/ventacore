import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, BarChart, ShoppingCart, Users, Package, FileText, LogOut, ChevronDown, LayoutDashboard, PackageOpen } from "lucide-react";
import useAuthStore from "../store/authStore";

const Sidebar = () => {
  const { logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [openInventario, setOpenInventario] = useState(false); // 👈 Controla solo Inventario
  const [openProductos, setOpenProductos] = useState(false);   // 👈 Controla solo Productos
  const [openVentas, setOpenVentas] = useState(false);
  const [openFinanzas, setOpenFinanzas] = useState(false);
  const [openProovedores, setOpenProovedores] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Botón móvil */}
      <button className="md:hidden p-3 fixed top-4 left-4 bg-blue-600 text-white rounded" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed h-screen overflow-y-auto top-0 left-0 bg-blue-800 text-white w-64 p-5 transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0 h-screen" : "-translate-x-full"} md:translate-x-0 md:relative md:w-60`}>
        
        {/* Título y botón cerrar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button className="md:hidden p-2 bg-red-500 rounded" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav>
          <ul className="space-y-4">

            {/* Dashboard */}
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => `flex items-center p-3 rounded ${isActive ? "bg-blue-600" : "hover:bg-blue-700"}`}>
                <LayoutDashboard className="mr-3" /> Dashboard
              </NavLink>
            </li>

            {/* Ventas */}
            <li>
              <button className="flex items-center justify-between w-full p-3 hover:bg-blue-700 rounded" onClick={() => setOpenVentas(!openVentas)}>
                <div className="flex items-center">
                  <ShoppingCart className="mr-3" /> Ventas
                </div>
                <ChevronDown className={`transform transition-transform ${openVentas ? "rotate-180" : "rotate-0"}`} />
              </button>
              {openVentas && (
                <ul className="pl-6 space-y-2">
                  <li><NavLink to="/ventas" className="block p-2 hover:bg-blue-600 rounded">Realizar Venta</NavLink></li>
                  <li><NavLink to="/cotizaciones" className="block p-2 hover:bg-blue-600 rounded">Cotizaciones</NavLink></li>
                </ul>
              )}
            </li>

            {/* Inventario */}
            <li>
              <button className="flex items-center justify-between w-full p-3 hover:bg-blue-700 rounded" onClick={() => setOpenInventario(!openInventario)}>
                <div className="flex items-center">
                  <Package className="mr-3" /> Inventario
                </div>
                <ChevronDown className={`transform transition-transform ${openInventario ? "rotate-180" : "rotate-0"}`} />
              </button>

              {openInventario && (
                <ul className="pl-6 space-y-2">

                  {/* Categorías */}
                  <li>
                    <NavLink to="/categories" className={({ isActive }) => `block p-2 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`}>
                      Categorías
                    </NavLink>
                  </li>

                  {/* Productos (Submenú) */}
                  <li>
                    <button className="flex items-center justify-between w-full p-3 hover:bg-blue-600 rounded" onClick={() => setOpenProductos(!openProductos)}>
                      <div className="flex items-center">
                        Productos
                      </div>
                      <ChevronDown className={`transform transition-transform ${openProductos ? "rotate-180" : "rotate-0"}`} />
                    </button>
                    {openProductos && (
                      <ul className="pl-6 space-y-2">
                        <li>
                          <NavLink to="/productsform" className={({ isActive }) => `block p-2 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`}>
                            Agregar Productos
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/productslist" className={({ isActive }) => `block p-2 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`}>
                            Ver Productos
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </li>

                  {/* Proveedores */}
                  <li>
                    <button className="flex items-center justify-between w-full p-3 hover:bg-blue-600 rounded" onClick={() => setOpenProovedores(!openProovedores)}>
                      <div className="flex items-center">
                        Proovedores
                      </div>
                      <ChevronDown className={`transform transition-transform ${openProovedores ? "rotate-180" : "rotate-0"}`} />
                    </button>
                    {openProovedores && (
                      <ul className="pl-6 space-y-2">
                        <li>
                          <NavLink to="/suppliersform" className={({ isActive }) => `block p-2 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`}>
                            Agregar Proovedores
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/supplierslist" className={({ isActive }) => `block p-2 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`}>
                            Ver Proovedores
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>

            {/* Finanzas */}
            <li>
              <button className="flex items-center justify-between w-full p-3 hover:bg-blue-700 rounded" onClick={() => setOpenFinanzas(!openFinanzas)}>
                <div className="flex items-center">
                  <FileText className="mr-3" /> Finanzas
                </div>
                <ChevronDown className={`transform transition-transform ${openFinanzas ? "rotate-180" : "rotate-0"}`} />
              </button>
              {openFinanzas && (
                <ul className="pl-6 space-y-2">
                  <li><NavLink to="/egresos" className="block p-2 hover:bg-blue-600 rounded">Egresos</NavLink></li>
                  <li><NavLink to="/balance" className="block p-2 hover:bg-blue-600 rounded">Balance</NavLink></li>
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
