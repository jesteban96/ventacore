import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "../componets/CategoryForm";
import CategoryTable from "../componets/CategoryTable";
import API_URL from "../config/api";

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
      } else {
        await axios.post(`${API_URL}/categories/`, category, {
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
      await axios.delete(`${API_URL}/categories/${id}/`, {
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
