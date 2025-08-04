import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";

export default function Admin() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setOrders(data);
  };

  const addProduct = async () => {
    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, price, image }),
    });
    setName("");
    setPrice("");
    setImage("");
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      <h3 className="text-xl font-semibold mb-2">Add Product</h3>
      <div className="mb-4 space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button
          onClick={addProduct}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2">Products</h3>
      <ul className="mb-8">
        {products.map((p) => (
          <li key={p._id} className="flex justify-between border p-2 mb-2">
            {p.name} - ₹{p.price}
            <button
              onClick={() => deleteProduct(p._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-2">Orders</h3>
      <ul>
        {orders.map((o) => (
          <li key={o._id} className="border p-2 mb-2">
            User: {o.userId} | Total: ₹{o.total} | Items:{" "}
            {o.items.map((i) => `${i.productId} x${i.quantity}`).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}