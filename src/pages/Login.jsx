import React, { useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      login(data.token);
      alert("Login success!");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl mb-4 font-bold">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full p-2 border"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}