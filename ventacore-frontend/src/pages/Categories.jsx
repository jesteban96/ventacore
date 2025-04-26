import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "../componets/CategoryForm";
import CategoryTable from "../componets/CategoryTable";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/categories/", {
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
        await axios.put(`http://127.0.0.1:8000/categories/${category.id}/`, category, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://127.0.0.1:8000/categories/", category, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchCategories();
      setEditingCategory(null); // 🔥 Limpia el formulario tras guardar
    } catch (error) {
      console.error("Error saving category", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/categories/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category", error);
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
