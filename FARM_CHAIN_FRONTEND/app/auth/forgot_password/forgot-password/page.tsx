"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendOTP = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://farmchain.onrender.com/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("fc-email", email);
        toast.success("OTP sent to your email!");
        setTimeout(() => {
          window.location.href = "/auth/forgot_password/enter-otp";
        }, 1000);
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Network error.");
    }

    setLoading(false);
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex md:items-center justify-center  pt-16">
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
     <div className="max-w-md mx-auto p-8 pt-32 lg:pt-14 bg-white shadow-2xl">
      <h1 className="text-3xl font-bold mb-4 text-green-700 ">Forgot Password</h1>
      <p className="mb-6 text-gray-600">Enter your email to receive a 4-digit OTP.</p>

      <input
        className="w-full  p-3 rounded-lg mb-4 bg-gray-200 text-gray-600 placeholder-gray-600 outline-none"
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleSendOTP}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
      >
        {loading ? "Sending..." : "Send OTP"}
      </button>

      {message && <p className="text-red-500 mt-4">{message}</p>}

      <p className="text-gray-700 mt-3"><em>!!! Note sometime OTP are been sent to spam folder so do make sure to check well.</em></p>
    </div>
   </div>
  );
}
