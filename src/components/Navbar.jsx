import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">MyShop</Link>
      <div className="space-x-4">
        <Link to="/checkout">Cart</Link>
        <Link to="/login">Login</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}