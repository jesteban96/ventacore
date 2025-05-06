import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./componets/Dashboard";
import ProtectedRoute from "./componets/ProtectedRoute";
import Categories from "./pages/Categories"; 
import ProductForm from "./pages/ProductsForm";
import ProductsList from "./pages/ProductsList";
import SuppliersForm from "./pages/SuppliersForm";
import SuppliersList from "./pages/SuppliersList";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} /> {/* Nueva ruta */}
          <Route path="/productsform" element={<ProductForm />} />
          <Route path="/productslist" element={<ProductsList />} />
          <Route path="/suppliersform" element={<SuppliersForm/>}/>
          <Route path="/supplierslist" element={<SuppliersList/>}/>
          <Route path="/*" />
        </Route>
      </Routes>
    
  );
}

export default App;
