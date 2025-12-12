import React from 'react'
import { 
  ArrowRight, Play
} from 'lucide-react';
import Link from 'next/link';

const CtaPage = () => {
  return (
    <div>
          {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 relative overflow-hidden">
           <div
          className="absolute inset-0 mb-3 mt-3 opacity-100 lg:bg-cover bg-center"
          style={{
            backgroundImage: "url('/Farmer-image.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-6xl font-black leading-tight">
              Ready to Transform
              <br />
              Your Farm's Future?
            </h2>
            <p className="text-xl lg:text-2xl text-white leading-relaxed">
              Join thousands of farmers who are already growing smarter, trading better, 
              and building stronger communities through Farm Chain.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">

              <Link href='/auth/register' className="group bg-white text-green-600 px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center space-x-3">
                <span>Start Your Journey</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />            
              </Link>

              <button className="group border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all duration-300 hover:scale-110 flex items-center space-x-3">
                <Play className="w-12 h-6 group-hover:scale-125 transition-transform" />
                <span>Schedule Demo</span>
              </button>
            </div>

            <div className="pt-8">
              <p className="text-green-100 mb-4">Trusted by farmers worldwide</p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                {['🇺🇸', '🇨🇦', '🇧🇷', '🇦🇺', '🇮🇳', '🇪🇺'].map((flag, index) => (
                  <span key={index} className="text-3xl hover:scale-125 transition-transform cursor-pointer">
                    {flag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CtaPage