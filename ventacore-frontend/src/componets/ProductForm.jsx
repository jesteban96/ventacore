// src/components/ProductForm.jsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import API_URL from "../config/api"; // 🔥 Usamos tu config centralizada

const ProductForm = ({ onSubmit, editingProduct }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [photo, setPhoto] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCategories();
    if (editingProduct) {
      setCode(editingProduct.code || "");
      setName(editingProduct.name || "");
      setPrice(editingProduct.price || "");
      setStock(editingProduct.stock || "");
      setPhoto(editingProduct.photo || "");
      setCategoryId(editingProduct.category_id || "");
    } else {
      resetForm();
    }
  }, [editingProduct]);

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

  const resetForm = () => {
    setCode("");
    setName("");
    setPrice("");
    setStock("");
    setPhoto("");
    setCategoryId("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!code.trim() || !name.trim() || !price || !categoryId) {
      Swal.fire("Campos requeridos", "Completa todos los campos obligatorios.", "warning");
      return;
    }

    onSubmit({
      id: editingProduct?.id,
      code: code,
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      photo,
      category_id: categoryId,
    });

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">{editingProduct ? "Editar Producto" : "Crear Producto"}</h2>

      <label className="block text-gray-700">Código de Barras:</label>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <label className="block text-gray-700">Nombre:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <label className="block text-gray-700">Precio:</label>
      <input
        type="number"
        step="0.01"
        min="0"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <label className="block text-gray-700">Cantidad en Stock:</label>
      <input
        type="number"
        min="0"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <label className="block text-gray-700">URL de la Foto:</label>
      <input
        type="text"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
        className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <label className="block text-gray-700">Categoría:</label>
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      >
        <option value="">Seleccione una categoría</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
      >
        {editingProduct ? "Actualizar Producto" : "Crear Producto"}
      </button>
    </form>
  );
};

export default ProductForm;
