import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const CategoryForm = ({ onSubmit, editingCategory }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name || "");
    } else {
      setName("");
    }
  }, [editingCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      Swal.fire("Error", "El nombre de la categoría no puede estar vacío.", "error");
      return;
    }

    const action = editingCategory ? "Actualizar" : "Crear";

    const result = await Swal.fire({
      title: `¿Deseas ${action.toLowerCase()} esta categoría?`,
      text: `Nombre: ${name}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${action}`,
    });

    if (result.isConfirmed) {
      onSubmit({ id: editingCategory?.id, name: name.trim() });
      setName(""); // 🔥 Limpia el formulario después
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-100 rounded shadow">
      <label className="block mb-2 font-semibold">Nombre de Categoría:</label>
      <input
        type="text"
        className="border px-3 py-2 w-full rounded focus:ring focus:ring-blue-200"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
      >
        {editingCategory ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};

export default CategoryForm;
