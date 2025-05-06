import React, { useEffect, useState } from "react";
import axios from "axios";
import SupplierForm from "../componets/SupplierForm";
import API_URL from "../config/api";
import Swal from "sweetalert2";

const SuppliersForm = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get(`${API_URL}/suppliers/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuppliers(res.data);
    } catch (err) {
      console.error("Error al obtener proveedores", err);
    }
  };

  const handleSave = async (supplier) => {
    try {
      if (editingSupplier) {
        await axios.put(`${API_URL}/suppliers/${editingSupplier.id}/`, supplier, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire("Actualizado", "Proveedor actualizado exitosamente", "success");
      } else {
        await axios.post(`${API_URL}/suppliers/`, supplier, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire("Creado", "Proveedor creado exitosamente", "success");
      }
  
      await fetchSuppliers();
      return true; // ✅ éxito
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.response?.data?.detail || "Error inesperado", "error");
      return false;
    }
  };  

  const clearEditing = () => setEditingSupplier(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Proveedores</h1>
      <SupplierForm onSubmit={handleSave} editingSupplier={editingSupplier} clearEditing={clearEditing} />
    </div>
  );
};

export default SuppliersForm;