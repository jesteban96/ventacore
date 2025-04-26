import React from "react";

const CategoryTable = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Nombre</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="text-center">
              <td className="py-2 px-4 border">{category.id}</td>
              <td className="py-2 px-4 border">{category.name}</td>
              <td className="py-2 px-4 border">
                <button 
                  onClick={() => onEdit({ ...category })} // Clona el objeto categoría
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Editar
                </button>
                <button 
                  onClick={() => onDelete(category.id)} 
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
