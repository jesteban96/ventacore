import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import API_URL from "../config/api";
import axios from "axios";

const SupplierForm = ({ editingSupplier, onSaved }) => {
  const [form, setForm] = useState({
    name: "",
    nit: "",
    phone: "",
    email: "",
    address: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (editingSupplier) {
      setForm(editingSupplier);
    } else {
      setForm({
        name: "",
        nit: "",
        phone: "",
        email: "",
        address: "",
      });
    }
  }, [editingSupplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.name || !form.nit || !form.phone || !form.email) {
      Swal.fire("Campos requeridos", "Completa todos los campos obligatorios", "warning");
      return false;
    }
    if (!form.email.includes("@") || !form.email.includes(".")) {
      Swal.fire("Correo inválido", "Ingresa un correo válido", "warning");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editingSupplier) {
        await axios.put(`${API_URL}/suppliers/${editingSupplier.id}/`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Actualizado", "Proveedor actualizado exitosamente", "success");
      } else {
        await axios.post(`${API_URL}/suppliers/`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Creado", "Proveedor creado exitosamente", "success");
      }

      if (onSaved) onSaved();
      setForm({ name: "", nit: "", phone: "", email: "", address: "" });
    } catch (error) {
      console.error("Error al guardar proveedor:", error);
      const msg = error.response?.data?.detail || "No se pudo guardar el proveedor";
      Swal.fire("Error", msg, "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 mb-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <h2 className="md:col-span-2 text-xl font-bold text-gray-700">
        {editingSupplier ? "Editar Proveedor" : "Registrar Proveedor"}
      </h2>

      <div>
        <label className="block mb-1 text-gray-700">Nombre</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-700">NIT</label>
        <input
          type="text"
          name="nit"
          value={form.nit}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-700">Teléfono</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-700">Correo</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div className="md:col-span-2">
        <label className="block mb-1 text-gray-700">Dirección</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="md:col-span-2 text-right">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {editingSupplier ? "Actualizar" : "Guardar"}
        </button>
      </div>
    </form>
  );
};

export default SupplierForm;