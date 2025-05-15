"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from 'axios';
import { useRouter, useSearchParams } from "next/navigation";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      setIsResetMode(true);
    }
  }, [token]);

  // Handle Request Password Reset
  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await axios.post("/api/users/forgetPassword", { email });
      setMessage("Password reset link sent! Please check your email.");
    } catch (err: AxiosError) {
      setError(err.response?.data.message || "Failed to send reset link");
    }
  };

  // Handle Password Reset
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("/api/users/resetPassword", {
        token,
        password,
      });

      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: AxiosError) {
      setError(err.response?.data.message || "Failed to reset password");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 to-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {isResetMode ? "Reset Password" : "Forgot Password"}
        </h2>

        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!isResetMode ? (
          // Request Reset Link Form
          <form onSubmit={handleRequestReset} className="space-y-6">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="w-full p-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          // Reset Password Form
          <form onSubmit={handleResetPassword} className="space-y-6">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="w-full p-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
