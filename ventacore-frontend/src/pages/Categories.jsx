import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "../componets/CategoryForm";
import CategoryTable from "../componets/CategoryTable";
import API_URL from "../config/api";
import Swal from "sweetalert2";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleSave = async (category) => {
    try {
      if (category.id) {
        await axios.put(`${API_URL}/categories/${category.id}/`, category, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Actualizado", "La categoría fue actualizada exitosamente.", "success");
      } else {
        await axios.post(`${API_URL}/categories/`, category, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Creado", "La categoría fue creada exitosamente.", "success");
      }
      fetchCategories();
      setEditingCategory(null); // 🔥 Limpia el formulario tras guardar
    } catch (error) {
      console.error("Error saving category", error);
      const errorMessage = error.response?.data?.detail || "Error inesperado.";
      Swal.fire("Error", errorMessage, "error"); // ✅ Mensaje del backend mostrado al usuario
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la categoría.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
  
    if (!result.isConfirmed) return;
  
    try {
      await axios.delete(`${API_URL}/categories/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Eliminado", "La categoría fue eliminada.", "success");
      fetchCategories();
    } catch (error) {
      const msg = error.response?.data?.detail || "No se pudo eliminar la categoría.";
      Swal.fire("Error", msg, "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Categorías</h1>
      <CategoryForm onSubmit={handleSave} editingCategory={editingCategory} />
      <CategoryTable categories={categories} onEdit={setEditingCategory} onDelete={handleDelete} />
    </div>
  );
};

export default Categories;
