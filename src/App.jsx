import React, { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Sandar Store</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white shadow rounded-lg p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded"
              />
              <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">₹{product.price}</p>
              <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
import React, { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    console.log("Cart:", cart);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Sandar Store</h1>
          <div>
            🛒 <span className="font-semibold">{cart.length}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white shadow rounded-lg p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded"
              />
              <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">₹{product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

export default function App() {
  return (
    <Router>
      <nav className="bg-white shadow p-4 flex justify-between">
        <Link to="/" className="text-xl font-bold">Sandar Store</Link>
        <Link to="/login" className="text-blue-600">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
import Checkout from "./Checkout";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/checkout" element={<Checkout />} />
</Routes>
import Admin from "./Admin";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/admin" element={<Admin />} />
</Routes>