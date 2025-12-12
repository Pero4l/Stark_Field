"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Play,
  Zap,
  Star,
  MessageCircle,
  Heart,
  Share,
} from "lucide-react";

const HeroPage = () => {
  const [stats, setStats] = useState({ farmers: 0, trades: 0, communities: 0 });

  useEffect(() => {
    const animateStats = () => {
      const targetStats = { farmers: 25000, trades: 150000, communities: 500 };
      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;

      let current = { farmers: 0, trades: 0, communities: 0 };

      const timer = setInterval(() => {
        current.farmers = Math.min(
          current.farmers + targetStats.farmers / steps,
          targetStats.farmers
        );
        current.trades = Math.min(
          current.trades + targetStats.trades / steps,
          targetStats.trades
        );
        current.communities = Math.min(
          current.communities + targetStats.communities / steps,
          targetStats.communities
        );

        setStats({
          farmers: Math.floor(current.farmers),
          trades: Math.floor(current.trades),
          communities: Math.floor(current.communities),
        });

        if (current.farmers >= targetStats.farmers) {
          clearInterval(timer);
        }
      }, increment);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateStats();
        observer.disconnect();
      }
    });

    const statsElement = document.getElementById("stats-section");
    if (statsElement) observer.observe(statsElement);

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Background Elements: use public/farmers.jpg as the hero background with a gradient overlay */}
        <div
          className="absolute inset-0 mt-5 lg:bg-cover bg-center"
          style={{ backgroundImage: "url('/sustainability-farms-1.webp')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-green-700/10 to-blue-700/6" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              suppressHydrationWarning
              key={i}
              className="absolute animate-float opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${20 + Math.random() * 20}px`,
              }}
            >
              {
                ["🌱", "🌾", "🚜", "🌽", "🍃", "☀️", "💧"][
                  Math.floor(Math.random() * 7)
                ]
              }
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto pt-2 px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
                  <Zap className="w-4 h-4" />
                  <span>Revolutionizing Agriculture</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
                  Connect.
                  <br />
                  <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    Trade.
                  </span>
                  <br />
                  Thrive.
                </h1>
                <p className="text-xl text-white leading-relaxed max-w-xl">
                  Join the world's largest farming community where knowledge
                  flows freely, trades happen securely, and every harvest brings
                  us closer together.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
               <Link href='/auth/register' className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3">
                  <span>Start Growing Today</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </Link>
                <button className="group flex items-center justify-center space-x-3 px-8 py-4 border-2 border-gray-300 text-gray-100 rounded-2xl font-bold text-lg hover:border-green-500 hover:text-green-600 transition-all duration-300 hover:scale-105">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Watch Demo</span>
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex -space-x-3">
                  {["SJ", "MR", "AS", "GV", "TC"].map((avatar, index) => (
                    <div
                      key={index}
                      className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold border-4 border-white shadow-lg"
                    >
                      {avatar}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-gray-100 font-bold">25,000+ farmers</p>
                  <p className="text-gray-100 font-medium text-sm">
                    already growing together
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Mock App Interface */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        🌾
                      </div>
                      <span className="font-bold">StarkField</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold">
                      Welcome to StarkField! 👋
                    </p>
                    <p className="text-green-100">Your farm is thriving</p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Mock Post */}
                  <div className="border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        MR
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Miguel Rodriguez
                        </p>
                        <p className="text-xs text-gray-500">
                          Texas, USA • 2 hours ago
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-800 mb-3">
                      🌽 Amazing harvest this season! My companion planting
                      technique increased yield by 40%...
                    </p>
                    <div className="flex space-x-4 text-sm">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
                        <Heart className="w-4 h-4" />
                        <span>24</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                        <MessageCircle className="w-4 h-4" />
                        <span>8</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
                        <Share className="w-4 h-4" />
                        <span>3</span>
                      </button>
                    </div>
                  </div>

                  {/* Mock Weather Widget */}
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-4 text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-bold">74°F</p>
                        <p className="text-sm opacity-90">Partly Cloudy</p>
                      </div>
                      <div className="text-3xl">⛅</div>
                    </div>
                  </div>

                  {/* Mock Marketplace Item */}
                  <div className="border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">
                          Organic Wheat - 2000 lbs
                        </p>
                        <p className="text-green-600 font-bold text-lg">$800</p>
                      </div>
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Green Valley Farm • Nebraska
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-8 -right-8 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="text-center">
                  <p className="text-2xl font-black text-green-600">98%</p>
                  <p className="text-xs text-gray-600">Success Rate</p>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="text-center">
                  <p className="text-2xl font-black text-blue-600">24/7</p>
                  <p className="text-xs text-gray-600">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="stats-section"
        className="py-16 bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div className="space-y-2">
              <p className="text-5xl font-black">
                {stats.farmers.toLocaleString()}+
              </p>
              <p className="text-green-100 text-lg font-medium">
                Active Farmers
              </p>
              <p className="text-green-200 text-sm">Growing every day</p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-black">
                {stats.trades.toLocaleString()}+
              </p>
              <p className="text-green-100 text-lg font-medium">
                Successful Trades
              </p>
              <p className="text-green-200 text-sm">Trusted marketplace</p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-black">{stats.communities}+</p>
              <p className="text-green-100 text-lg font-medium">Communities</p>
              <p className="text-green-200 text-sm">Across 85 countries</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroPage;
