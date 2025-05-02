// src/pages/ProductsList.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ProductTable from "../componets/ProductTable";
import ProductForm from "../componets/ProductForm";
import API_URL from "../config/api";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/products/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const productsMapped = response.data.map((product) => ({
        id: product.id,
        code: product.code,
        name: product.name,
        price: product.price,
        stock: product.stock,
        photo: product.photo,
        category: product.category,
        category_id: product.category?.id || "",
      }));
      setProducts(productsMapped);
    } catch (error) {
      Swal.fire("Error", "No se pudieron cargar los productos", "error");
    } finally {
      setLoading(false);
    }
  };

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

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/products/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchProducts();
        Swal.fire("¡Eliminado!", "Producto eliminado exitosamente.", "success");
      } catch (error) {
        console.error("Error deleting product", error);
        Swal.fire({
          title: "Error",
          text: error.response?.data?.detail || "No se pudo eliminar el producto.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }
  };

  const handleSave = async (product) => {
    try {
      if (product.id) {
        const result = await Swal.fire({
          title: "¿Deseas actualizar este producto?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí, actualizar",
          cancelButtonText: "Cancelar",
        });

        if (!result.isConfirmed) return;

        await axios.put(`${API_URL}/products/${product.id}/`, product, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire("¡Actualizado!", "Producto actualizado exitosamente.", "success");
      } else {
        await axios.post(`${API_URL}/products/`, product, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire("¡Creado!", "Producto creado exitosamente.", "success");
      }

      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error("Error saving product", error);
      Swal.fire("Error", "No se pudo guardar el producto", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Productos</h1>

      {editingProduct && (
        <ProductForm
        editingProduct={editingProduct}
        categories={categories}
        onSaved={() => {
          fetchProducts(); // ✅ Recarga sin refrescar la página completa
          setEditingProduct(null); // Limpia selección de edición
        }}
      />
      
      )}

      <ProductTable
        products={products}
        onDelete={handleDelete}
        onEdit={setEditingProduct}
        loading={loading}
      />
    </div>
  );
};

export default ProductsList;
