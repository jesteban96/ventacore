import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Menu} from "lucide-react";

import * as XLSX from "xlsx";

Chart.register(...registerables);

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ventasData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "Ventas Mensuales",
        data: [12000, 15000, 18000, 22000, 20000, 25000],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const productosMasVendidos = [
    { id: 1, nombre: "Producto A", ventas: 500 },
    { id: 2, nombre: "Producto B", ventas: 450 },
    { id: 3, nombre: "Producto C", ventas: 400 },
  ];

  const descargarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(productosMasVendidos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos Vendidos");
    XLSX.writeFile(workbook, "ProductosMasVendidos.xlsx");
  };

  const descargarImagen = (chartRef, nombreArchivo) => {
    const link = document.createElement("a");
    link.href = chartRef.current.toBase64Image();
    link.download = nombreArchivo;
    link.click();
  };

  const ventasChartRef = React.useRef(null);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        {/* Contenedor para alinear el botón y el título */}
        <div className="flex items-center gap-3 mb-4">
          {/* Botón para abrir/cerrar el menú en móviles */}
          <button
            className="md:hidden p-2 bg-blue-600 text-white rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        </div>

        {/* Sección de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-600">Total Ventas</h3>
            <p className="text-2xl font-bold text-blue-600">$125,000</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-600">Ganancia Neta</h3>
            <p className="text-2xl font-bold text-green-600">$50,000</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-600">Egresos</h3>
            <p className="text-2xl font-bold text-red-600">$30,000</p>
          </div>
        </div>

        {/* Gráficos */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-xl font-semibold text-gray-600 mb-4">Ventas Mensuales</h3>
          <Bar ref={ventasChartRef} data={ventasData} />
          <button
            onClick={() => descargarImagen(ventasChartRef, "ventas_mensuales.png")}
            className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Descargar Gráfico
          </button>
        </div>

        {/* Tabla de productos más vendidos */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-600 mb-4">Productos Más Vendidos</h3>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">ID</th>
                <th className="border p-2">Nombre</th>
                <th className="border p-2">Ventas</th>
              </tr>
            </thead>
            <tbody>
              {productosMasVendidos.map((producto) => (
                <tr key={producto.id} className="text-center">
                  <td className="border p-2">{producto.id}</td>
                  <td className="border p-2">{producto.nombre}</td>
                  <td className="border p-2">{producto.ventas}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={descargarExcel}
            className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Descargar Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
