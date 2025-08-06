import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./Login";
import Checkout from "./Checkout";
import Admin from "./Admin";

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <Router>
      <nav className="bg-white shadow p-4 flex justify-between">
        <Link to="/" className="text-xl font-bold">Sandar Store</Link>
        <div className="space-x-4">
          <Link to="/checkout" className="text-blue-600">🛒 {cart.length}</Link>
          <Link to="/login" className="text-blue-600">Login</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
