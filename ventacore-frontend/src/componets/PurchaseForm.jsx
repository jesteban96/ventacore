// src/components/PurchaseForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import API_URL from "../config/api";

const PurchaseForm = ({ onSaved }) => {
  const token = localStorage.getItem("token");

  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    supplier_id: "",
    invoice_number: "",
    items: [],
  });
  const [item, setItem] = useState({ product_id: "", quantity: "", purchase_price: "" });

  useEffect(() => {
    fetchSuppliers();
    fetchProducts();
  }, []);

  const fetchSuppliers = async () => {
    const res = await axios.get(`${API_URL}/suppliers/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSuppliers(res.data);
  };

  const fetchProducts = async () => {
    const res = await axios.get(`${API_URL}/products/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(res.data);
  };

  const addItem = () => {
    if (!item.product_id || !item.quantity || !item.purchase_price) {
      Swal.fire("Error", "Completa todos los campos del producto", "error");
      return;
    }
    setForm({ ...form, items: [...form.items, item] });
    setItem({ product_id: "", quantity: "", purchase_price: "" });
  };

  const removeItem = (index) => {
    const newItems = [...form.items];
    newItems.splice(index, 1);
    setForm({ ...form, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.supplier_id || !form.invoice_number || form.items.length === 0) {
      Swal.fire("Error", "Completa todos los campos y agrega al menos un producto", "error");
      return;
    }

    try {
      await axios.post(`${API_URL}/purchases/`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("¡Guardado!", "Compra registrada con éxito", "success");
      setForm({ supplier_id: "", invoice_number: "", items: [] });
      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.response?.data?.detail || "Error inesperado", "error");
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded-xl mb-6">
      <h2 className="text-xl font-bold mb-4">Registrar Compra</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <select
            value={form.supplier_id}
            onChange={(e) => setForm({ ...form, supplier_id: e.target.value })}
            className="w-full border rounded p-2"
          >
            <option value="">Selecciona proveedor</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Número de factura"
            value={form.invoice_number}
            onChange={(e) => setForm({ ...form, invoice_number: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="border p-4 rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Agregar productos</h3>
          <div className="grid md:grid-cols-3 gap-3 mb-3">
            <select
              value={item.product_id}
              onChange={(e) => setItem({ ...item, product_id: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="">Producto</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Cantidad"
              value={item.quantity}
              onChange={(e) => setItem({ ...item, quantity: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Precio compra"
              value={item.purchase_price}
              onChange={(e) => setItem({ ...item, purchase_price: e.target.value })}
              className="border p-2 rounded"
            />
          </div>
          <button type="button" onClick={addItem} className="bg-blue-600 text-white px-4 py-1 rounded">
            Agregar producto
          </button>

          {form.items.length > 0 && (
            <ul className="mt-4 space-y-2">
              {form.items.map((it, idx) => {
                const product = products.find(p => p.id == it.product_id);
                return (
                  <li key={idx} className="flex justify-between items-center bg-white p-2 border rounded">
                    <span>{product?.name || "Producto"} - {it.quantity} x ${it.purchase_price}</span>
                    <button onClick={() => removeItem(idx)} className="text-red-500 text-sm">Eliminar</button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Registrar Compra
        </button>
      </form>
    </div>
  );
};

export default PurchaseForm;
