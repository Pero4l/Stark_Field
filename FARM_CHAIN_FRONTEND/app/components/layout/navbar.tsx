"use client";
import React, { useState } from "react";
import Button from "../atoms/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  return (
    <div>
      {/* Header */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">🌾</span>
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  FarmChain
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  Connecting Agriculture
                </p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/#home"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/#features"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                Features
              </Link>
              <Link
                href="/#marketplace"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                Marketplace
              </Link>
              <Link
                href="/#pricing"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/#testimonials"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                Stories
              </Link>

              <Button onClose={() => setIsMenuOpen(false)} />
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-green-600"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4 pt-4">
                <Link
                  href="/#home"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Home
                </Link>

                <Link
                  href="/#features"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Features
                </Link>

                <Link
                  href="/#marketplace"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Marketplace
                </Link>

                <Link
                  href="/#pricing"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Pricing
                </Link>

                <Link
                  href="/#testimonials"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Stories
                </Link>

                <Button onClose={() => setIsMenuOpen(false)} />
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
