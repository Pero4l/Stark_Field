"use client";
import React, { useState, useEffect } from "react";

export default function EnterOTP() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const email = typeof window !== "undefined" ? localStorage.getItem("fc-email") : "";

  useEffect(() => {
    if (!email) window.location.href = "/forgot-password";
  }, [email]);

  const handleVerifyOTP = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://farmchain.onrender.com/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("fc-reset-token", data.token);
        window.location.href = "/auth/forgot_password/reset-password";
      } else {
        setMessage(data.message || "Invalid OTP");
      }
    } catch {
      setMessage("Network error.");
    }

    setLoading(false);
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex md:items-center justify-center p- pt-16">
     <div className="max-w-md mx-auto p-8 pt-32 lg:pt-16 bg-white shadow-2xl">
      <h1 className="text-3xl font-bold mb-5 text-green-700">Enter OTP</h1>
      <p className="mb-6 text-gray-600">We sent a 4-digit code to your email.</p>

      <input
        className="w-full border p-3 rounded-lg mb-4 text-center tracking-widest text-xl font-bold bg-gray-200 text-gray-600 placeholder-gray-600 outline-none"
        type="text"
        maxLength={4}
        placeholder="----"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        onClick={handleVerifyOTP}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
   </div>
  );
}
