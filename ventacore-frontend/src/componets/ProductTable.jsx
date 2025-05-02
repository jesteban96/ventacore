import React from "react";
import Swal from "sweetalert2";
import SkeletonRow from "./SkeletonRow"; // 👈 Nuevo componente

const ProductTable = ({ products, onEdit, onDelete, loading }) => {
  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto permanentemente.",
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
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Foto</th>
            <th className="py-2 px-4 border">Código</th>
            <th className="py-2 px-4 border">Nombre</th>
            <th className="py-2 px-4 border">Precio</th>
            <th className="py-2 px-4 border">Cantidad</th>
            <th className="py-2 px-4 border">Categoría</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-6 text-gray-500">
                No hay productos disponibles.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className="text-center hover:bg-gray-100">
                <td className="py-2 px-4 border">{product.id}</td>
                <td className="py-2 px-4 border">
                  {product.photo ? (
                    <img
                      src={product.photo}
                      alt={product.name}
                      className="w-16 h-16 object-cover mx-auto rounded"
                    />
                  ) : (
                    <span className="text-gray-400">Sin foto</span>
                  )}
                </td>
                <td className="py-2 px-4 border">{product.code}</td>
                <td className="py-2 px-4 border">{product.name}</td>
                <td className="py-2 px-4 border">${product.price.toFixed(2)}</td>
                <td className="py-2 px-4 border">{product.stock}</td>
                <td className="py-2 px-4 border">
                  {product.category?.name || "Sin categoría"}
                </td>
                <td className="py-6 px-4 flex justify-center gap-2 border">
                  <button
                    onClick={() => onEdit({ ...product })}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
