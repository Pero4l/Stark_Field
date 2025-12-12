'use client'
import React from 'react'
import { 
   Users, TrendingUp, Shield, Zap,
  ShoppingCart, Cloud,
} from 'lucide-react';


const FeaturePage = () => {

    const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Global Farming Community",
      description: "Connect with 25,000+ farmers worldwide. Share knowledge, collaborate on projects, and build lasting partnerships.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "Smart Marketplace",
      description: "Buy and sell crops, equipment, and services with verified farmers. Advanced filtering and secure transactions.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Weather Intelligence",
      description: "Get hyper-local weather forecasts, alerts, and farming recommendations powered by advanced meteorological data.",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Farm Analytics",
      description: "Track yield predictions, market trends, and optimize your farming operations with data-driven insights.",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verified Network",
      description: "Trade with confidence through our verification system. All members are authenticated for security and trust.",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Alerts",
      description: "Stay ahead with instant notifications about weather changes, market opportunities, and community updates.",
      color: "from-yellow-500 to-orange-600"
    }
  ];

  return (
    <div>
        {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Everything You Need to
              <br />
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Grow Your Farm
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From community connections to smart trading, Farm Chain provides all the tools 
              modern farmers need to succeed in today's agricultural landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className={`inline-flex p-4 bg-gradient-to-r ${feature.color} rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default FeaturePage