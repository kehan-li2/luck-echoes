"use client";

import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bday, setBday] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    await axios.post("/api/users/register", {
      name,
      email,
      password,
      bday: new Date(bday),
    });

    setSuccess("Registration successful! Please login.");
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data.message || "Registration failed");
    } else {
      setError("Registration failed");
    }
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800">Register</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}
        <form onSubmit={handleRegister} className="space-y-6">
          <input
            type="text"
            placeholder="User Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg w-full p-3 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg w-full p-3 focus:ring-green-500"
          />
          <input
            type="date"
            value={bday}
            required
            onChange={(e) => setBday(e.target.value)}
            className="border rounded-lg w-full p-3 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg w-full p-3 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded-lg w-full p-3 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 text-white w-full p-3 rounded-lg hover:bg-green-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
