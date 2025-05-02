import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import API_URL from "../config/api";

const ProductForm = ({ editingProduct, categories, onSaved }) => {
  const [form, setForm] = useState({
    name: "",
    code: "",
    price: "",
    stock: "",
    photo: "",
    category_id: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (editingProduct) {
      setForm({
        id: editingProduct.id || "",
        name: editingProduct.name || "",
        code: editingProduct.code || "",
        price: editingProduct.price || "",
        stock: editingProduct.stock || "",
        photo: editingProduct.photo || "",
        category_id: editingProduct.category?.id || editingProduct.category_id || "",
      });
    } else {
      setForm({
        name: "",
        code: "",
        price: "",
        stock: "",
        photo: "",
        category_id: "",
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.name.trim() || !form.code.trim()) {
      Swal.fire("Campos requeridos", "El nombre y el código son obligatorios", "warning");
      return false;
    }
    if (form.price <= 0) {
      Swal.fire("Error", "El precio debe ser mayor que 0", "error");
      return false;
    }
    if (form.stock < 0) {
      Swal.fire("Error", "El stock no puede ser negativo", "error");
      return false;
    }
    if (!form.category_id) {
      Swal.fire("Error", "Selecciona una categoría", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const productData = {
      name: form.name.trim(),
      code: form.code.trim(),
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      photo: form.photo,
      category_id: parseInt(form.category_id),
    };

    try {
      if (form.id) {
        // 🟡 Actualización
        const result = await Swal.fire({
          title: "¿Deseas actualizar este producto?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí, actualizar",
          cancelButtonText: "Cancelar",
        });

        if (!result.isConfirmed) return;

        await axios.put(`${API_URL}/products/${form.id}/`, productData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire("Actualizado", "Producto actualizado exitosamente", "success");
      } else {
        // 🟢 Creación
        await axios.post(`${API_URL}/products/`, productData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire("Creado", "Producto creado exitosamente", "success");
      }

      // 🔄 Llama callback de éxito
      if (onSaved) onSaved();

      // ✅ Limpia el formulario solo si se guardó correctamente
      setForm({
        name: "",
        code: "",
        price: "",
        stock: "",
        photo: "",
        category_id: "",
      });
    } catch (error) {
      console.error("Error al guardar producto:", error);

      const msg = error.response?.data?.detail || "No se pudo guardar el producto";
      Swal.fire("Error", msg, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold">{form.id ? "Editar Producto" : "Agregar Producto"}</h2>

      <input type="hidden" value={form.id || ""} />

      <div>
        <label className="block mb-1">Código:</label>
        <input
          name="code"
          value={form.code}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Nombre:</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Precio:</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          step="0.01"
        />
      </div>

      <div>
        <label className="block mb-1">Stock:</label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Foto (URL):</label>
        <input
          type="text"
          name="photo"
          value={form.photo}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Categoría:</label>
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        {form.id ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};

export default ProductForm;
