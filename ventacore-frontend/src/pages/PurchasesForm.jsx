// src/pages/PurchasesForm.jsx
import React from "react";
import PurchaseForm from "../componets/PurchaseForm";

const PurchasesForm = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nueva Compra</h1>
      <PurchaseForm />
    </div>
  );
};

export default PurchasesForm;
