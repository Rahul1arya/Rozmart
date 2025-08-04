import React from "react";

export default function ProductCard({ product, onDelete }) {
  return (
    <div className="border p-4 rounded shadow flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover mb-2 rounded"
      />
      <h3 className="font-bold">{product.name}</h3>
      <p className="text-gray-600 mb-2">₹{product.price}</p>
      {onDelete && (
        <button
          onClick={() => onDelete(product._id)}
          className="mt-auto bg-red-600 text-white py-1 rounded"
        >
          Delete
        </button>
      )}
    </div>
  );
}