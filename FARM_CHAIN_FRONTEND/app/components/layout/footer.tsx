import React from "react";
import { 
  Users, Globe, MessageCircle
} from 'lucide-react';

const Footer = () => {
  return (
    <div>
        {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                  {/* Brand Column */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl">🌾</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-black">Farm Chain</h3>
                        <p className="text-gray-400 text-sm">Connecting Agriculture</p>
                      </div>
                    </div>
                    <p className="text-gray-400 leading-relaxed max-w-md">
                      Empowering farmers worldwide through technology, community, and sustainable practices. 
                      Growing together for a better tomorrow.
                    </p>
                    <div className="flex space-x-4">
                      <button className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors">
                        <Globe className="w-5 h-5" />
                      </button>
                      <button className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                      <button className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                        <Users className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
      
                  {/* Quick Links */}
                  <div>
                    <h4 className="font-bold text-lg mb-4">Platform</h4>
                    <div className="space-y-3">
                      <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors">Community</a>
                      <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors">Marketplace</a>
                      <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors">Weather Hub</a>
                      <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors">Analytics</a>
                      <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors">Mobile App</a>
                    </div>
                  </div>
      
                  {/* Resources */}
                  <div>
                    <h4 className="font-bold text-lg mb-4">Resources</h4>
                    <div className="space-y-3">
                      <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors">Help Center</a>
                      <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors">API Docs</a>
                      <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors">Farming Guides</a>
                      <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors">Webinars</a>
                      <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors">Blog</a>
                    </div>
                  </div>
      
                  {/* Company */}
                  <div>
                    <h4 className="font-bold text-lg mb-4">Company</h4>
                    <div className="space-y-3">
                      <a href="https://hackmd.io/@Pero4l/HJZD_iMall" target="blank" className="block text-gray-400 hover:text-green-400 transition-colors">Documentation</a>
                      <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors">About Us</a>
                      <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors">Careers</a>
                      <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors">Press</a>
                      <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors">Contact</a>
                      <a href="#" className="block text-gray-400 hover:text-green-400 transition-colors">Privacy</a>
                    </div>
                  </div>
                </div>
      
                <div className="border-t border-gray-800 mt-12 pt-8">
                  <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-gray-400">
                      © 2025 Farm Chain. All rights reserved. Cultivating connections worldwide.
                    </p>
                    <div className="flex items-center space-x-6">
                      <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Terms</a>
                      <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Privacy</a>
                      <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Cookies</a>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm font-medium">All systems operational</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
    </div>
  )
}

export default Footer;
