import React from "react";
import Swal from "sweetalert2";

const SupplierTable = ({ suppliers, onEdit, onDelete }) => {
  const handleDelete = (id) => {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el proovedor permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          onDelete(id);
        }
      });
    };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Lista de Proveedores</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-2 py-1">Nombre</th>
            <th className="px-2 py-1">NIT</th>
            <th className="px-2 py-1">Teléfono</th>
            <th className="px-2 py-1">Correo</th>
            <th className="px-2 py-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="border-t">
              <td className="px-2 py-1">{supplier.name}</td>
              <td className="px-2 py-1">{supplier.nit}</td>
              <td className="px-2 py-1">{supplier.phone}</td>
              <td className="px-2 py-1">{supplier.email}</td>
              <td className="px-2 py-1 space-x-2">
                <button
                    onClick={() => onEdit({ ...supplier })}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDelete(supplier.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierTable;