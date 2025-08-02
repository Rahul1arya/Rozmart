import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-12">
      © {new Date().getFullYear()} MyShop. All rights reserved.
    </footer>
  );
}