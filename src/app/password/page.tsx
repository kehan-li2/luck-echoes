"use client";

import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const PasswordFormContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [isResetMode, setIsResetMode] = useState(false);

  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      setIsResetMode(true);
    }
  }, [token]);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      await axios.post("/api/users/forgetPassword", { email });
      setMessage("Password reset link sent! Please check your email.");
    } catch (err: unknown) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data.message || "Failed to send reset link"
          : "Failed to send reset link"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("/api/users/resetPassword", { token, password });
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: unknown) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data.message || "Failed to reset password"
          : "Failed to reset password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 to-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {isResetMode ? "Reset Password" : "Forgot Password"}
        </h2>

        {message && (
          <p className="text-green-600 text-center p-2 bg-green-50 rounded">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-500 text-center p-2 bg-red-50 rounded">
            {error}
          </p>
        )}

        {!isResetMode ? (
          <form onSubmit={handleRequestReset} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                required
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-lg w-full p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 text-white rounded-lg ${isLoading ? "bg-yellow-400" : "bg-yellow-600 hover:bg-yellow-700"
                } transition-colors`}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="New Password"
                value={password}
                required
                minLength={8}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-lg w-full p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                required
                minLength={8}
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border rounded-lg w-full p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 text-white rounded-lg ${isLoading ? "bg-yellow-400" : "bg-yellow-600 hover:bg-yellow-700"
                } transition-colors`}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const ForgotPasswordPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <PasswordFormContent />
    </Suspense>
  );
};

export default ForgotPasswordPage;