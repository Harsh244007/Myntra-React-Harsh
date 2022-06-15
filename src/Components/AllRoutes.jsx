import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "../Pages/Cart";
import Homepage from "../Pages/Homepage";
import Products from "../Pages/Products";
import Product from "../Pages/Product";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default AllRoutes;
