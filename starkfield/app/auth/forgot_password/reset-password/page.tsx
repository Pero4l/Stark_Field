"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword() {
  const [newPassword, setnewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const email = typeof window !== "undefined" ? localStorage.getItem("fc-email") : "";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("fc-reset-token") : "";



  useEffect(() => {
      if (!email) window.location.href = "/auth/login";
    }, [email]);
  
  const handleReset = async () => {
    if (newPassword !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://farmchain.onrender.com/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({email, newPassword }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Password reset successfully!");
         setTimeout(() => {
          window.location.href = "/auth/login";
        }, 2000);
        localStorage.removeItem("fc-reset-token");
        localStorage.removeItem("fc-email");
       
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch {
      setMessage("Network error.");
    }

    setLoading(false);
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex md:items-center justify-center p- pt-16">
      <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
      <div className="max-w-md mx-auto p-6 pt-32 lg:pt-16 bg-white shadow-2xl">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Reset Password</h1>
      <p className="mb-6 text-gray-600">Enter your new password.</p>

      <input
        className="w-full border p-3 rounded-lg mb-4 bg-gray-200 text-gray-600 placeholder-gray-600 outline-none"
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setnewPassword(e.target.value)}
      />

      <input
        className="w-full border p-3 rounded-lg mb-4 bg-gray-200 text-gray-600 placeholder-gray-600 outline-none"
        type="password"
        placeholder="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />

      <button
        onClick={handleReset}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
      >
        {loading ? "Saving..." : "Reset Password"}
      </button>

      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
    </div>
  );
}
