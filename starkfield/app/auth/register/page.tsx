'use client'
import RegisterChain from '@/app/components/registerChain';
import React, { useState } from 'react';
import { FaGoogle, FaFacebookF } from "react-icons/fa6";

const FarmChainAuth = () => {
  
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex items-center md:justify-center pt-20 lg:pt-22 mb-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        {/* <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">🌾</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Farm Chain</h1>
            <p className="text-sm text-gray-600">Connecting Agriculture</p>
          </div>
        </div> */}

        {/* Toggle Buttons */}
        {/* <div className="flex bg-gray-100 rounded-2xl p-2 mb-6 mt-22 lg:mt-32">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              isLogin
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              !isLogin
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign Up
          </button>
        </div> */}

        {/* Form Container */}
        <div className="bg-white lg:rounded-3xl shadow-xl p-8">
          <RegisterChain/>
          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                <span className="mr-5 text-2xl"><FaGoogle/></span>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                <span className="mr-5 text-2xl"><FaFacebookF/></span>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmChainAuth;