import React, { useEffect, useState } from "react";

export default function Home({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://rozmart.onrender.com/api/products") // ✅ Render API URL
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
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
  );
}
