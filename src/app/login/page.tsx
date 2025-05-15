"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface LoginResponse {
  token: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<LoginResponse>('/api/users/login', { email, password });

      console.log('Login response:', response.data);

      if (!response.data.token) {
        setError('Login failed: No token received');
        return;
      }

      localStorage.setItem('token', response.data.token);
      router.push('/home');
    } catch (err: any) {
      console.error("Error during login:", err);
      setError(err.response?.data.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-white">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
