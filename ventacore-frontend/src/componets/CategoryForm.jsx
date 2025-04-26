import React, { useState, useEffect } from "react";

const CategoryForm = ({ onSubmit, editingCategory }) => {
  const [name, setName] = useState("");

  // 🔥 Cuando editingCategory cambia, actualiza el nombre en el input
  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name || "");
    } else {
      setName("");
    }
  }, [editingCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: editingCategory?.id, name });
    setName(""); // 🔥 Limpia el formulario después de enviar
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-100 rounded">
      <label className="block mb-2">Nombre de Categoría:</label>
      <input
        type="text"
        className="border px-3 py-2 w-full rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        {editingCategory ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};

export default CategoryForm;
