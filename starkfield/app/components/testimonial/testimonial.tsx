'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { 
  CheckCircle, Star
} from 'lucide-react';


const TestimonialPage = () => {

const [currentTestimonial, setCurrentTestimonial] = useState(0);

const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Organic Farm Owner",
      location: "Iowa, USA",
      avatar: "SJ",
      content: "Farm Chain transformed my small organic farm! I've connected with amazing farmers, learned sustainable techniques, and increased my sales by 300% through the marketplace.",
      rating: 5,
      verified: true,
      farmSize: "50 acres"
    },
    {
      name: "Miguel Rodriguez",
      role: "Cooperative Manager",
      location: "Texas, USA", 
      avatar: "MR",
      content: "Managing our 20-farm cooperative became effortless with StarkField. The weather alerts saved us from drought damage, and our community sharing increased yields across all farms.",
      rating: 5,
      verified: true,
      farmSize: "Cooperative - 1,200 acres"
    },
    {
      name: "AgriTech Solutions",
      role: "Commercial Farm",
      location: "California, USA",
      avatar: "AS", 
      content: "The analytics and market insights on StarkField are game-changing. We optimized our crop planning and connected with suppliers globally, reducing costs by 25%.",
      rating: 5,
      verified: true,
      farmSize: "2,500 acres"
    }
  ];

  useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);
  


  return (
    <div>
          {/* Testimonials Section */}
              <section id="testimonials" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                      Stories from Our
                      <br />
                      <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        Growing Community
                      </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      Real farmers sharing real success stories from around the world.
                    </p>
                  </div>
        
                  <div className="relative">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl shadow-2xl border border-gray-100 p-2 py-10 lg:p-12 max-w-4xl mx-auto">
                      <div className="flex items-start space-x-6">
                        <div className="relative flex-shrink-0">
                          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                            {testimonials[currentTestimonial].avatar}
                          </div>
                          {testimonials[currentTestimonial].verified && (
                            <CheckCircle className="absolute -bottom-2 -right-2 w-6 h-6 text-blue-500 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="flex space-x-1">
                              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                              ))}
                            </div>
                            <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                              {testimonials[currentTestimonial].farmSize}
                            </span>
                          </div>
                          <blockquote className="text-xl text-gray-800 w-48 lg:w-auto leading-relaxed mb-6 italic">
                            "{testimonials[currentTestimonial].content}"
                          </blockquote>
                          <div>
                            <p className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</p>
                            <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                            <p className="text-gray-500 text-sm">{testimonials[currentTestimonial].location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
        
                    {/* Testimonial Indicators */}
                    <div className="flex justify-center space-x-3 mt-8">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentTestimonial 
                              ? 'bg-green-600 scale-125' 
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
    </div>
  )
}

export default TestimonialPage