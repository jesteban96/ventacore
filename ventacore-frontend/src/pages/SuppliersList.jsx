import React, { useEffect, useState } from "react";
import axios from "axios";
import SupplierTable from "../componets/SupplierTable";
import API_URL from "../config/api";
import Swal from "sweetalert2";
import SupplierForm from "../componets/SupplierForm";

const SuppliersList = () => {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/suppliers/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSuppliers();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo eliminar el proveedor", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Proveedores</h1>

      {editingSupplier && (
        <SupplierForm
        editingSupplier={editingSupplier}
        onSaved={() => {
          fetchSuppliers(); // ✅ Recarga sin refrescar la página completa
          setEditingSupplier(null); // Limpia selección de edición
        }}
      />
      
      )}

      <SupplierTable suppliers={suppliers} onEdit={setEditingSupplier} onDelete={handleDelete} />
    </div>
  );
};

export default SuppliersList;