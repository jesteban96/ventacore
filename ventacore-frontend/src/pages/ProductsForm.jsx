import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ProductForm from "../componets/ProductForm";
import API_URL from "../config/api";

const ProductsForm = () => {
  const [categories, setCategories] = useState([]);
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

  const handleSave = async (product) => {
    try {
      await axios.post(`${API_URL}/products/`, product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("¡Creado!", "Producto creado exitosamente.", "success");
    } catch (error) {
      console.error("Error saving product", error);
      Swal.fire("Error", "No se pudo guardar el producto", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agregar Producto</h1>
      <ProductForm 
        onSubmit={handleSave}
        categories={categories}
      />
    </div>
  );
};

export default ProductsForm;
