'use client';

import React from 'react'
import {
  MessageCircle,
  MapPin,
  Star,
  Truck,
  Leaf,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "next-themes";

type MarketplaceItem = {
  id: number;
  title: string;
  quantity?: string;
  price: string;
  pricePerUnit?: string;
  seller: string;
  location: string;
  rating: number;
  image: string;
  certified?: string;
  harvestDate?: string;
  category: string;
  condition?: string;
  shipping?: string;
  specifications?: string;
  availability?: string;
  verified?: boolean;
  insurance?: string;
  varieties?: string;
  readyDate?: string;
  organic?: boolean;
  guarantee?: string;
  flowerSource?: string;
  tested?: string;
  wholesale?: boolean;
};

const MarketPage = () => {

  const { theme } = useTheme();

     const marketplaceItems: MarketplaceItem[] = [
    {
      id: 1,
      title: "Premium Organic Wheat",
      quantity: "5,000 lbs",
      price: "$2,450",
      pricePerUnit: "$0.49/lb",
      seller: "Sunset Organic Farm",
      location: "Nebraska, USA",
      rating: 4.9,
      image: "bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400",
      certified: "USDA Organic",
      harvestDate: "This week",
      category: "grain",
      condition: "Fresh",
      shipping: "Available",
    },
    {
      id: 2,
      title: "John Deere 5075E Tractor",
      condition: "Excellent (2019)",
      price: "$850/week",
      pricePerUnit: "$120/day",
      seller: "Equipment Solutions Co-op",
      location: "Iowa, USA",
      rating: 4.8,
      image: "bg-gradient-to-br from-green-600 via-green-500 to-emerald-600",
      specifications: "75 HP, 4WD, 450 hours",
      availability: "Next week",
      category: "equipment",
      verified: true,
      insurance: "Included",
    },
    {
      id: 3,
      title: "Heirloom Tomato Seedlings",
      quantity: "500 plants",
      price: "$375",
      pricePerUnit: "$0.75 each",
      seller: "Heritage Seeds Farm",
      location: "California, USA",
      rating: 5.0,
      image: "bg-gradient-to-br from-red-500 via-pink-400 to-orange-500",
      varieties: "Cherokee Purple, Brandywine",
      readyDate: "April 15th",
      category: "seeds",
      organic: true,
      guarantee: "90% germination",
    },
    {
      id: 4,
      title: "Raw Honey Bulk Sale",
      quantity: "200 jars (12 oz each)",
      price: "$1,800",
      pricePerUnit: "$9/jar",
      seller: "Golden Bee Apiary",
      location: "Montana, USA",
      rating: 4.9,
      image: "bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500",
      flowerSource: "Wildflower & Clover",
      harvestDate: "Last month",
      category: "products",
      tested: "Lab certified pure",
      wholesale: true,
    },
  ];

  return (
    <div>
         <div className="space-y-8">
                        {/* market header */}
                        <div className={`${theme === 'dark' ? "border-1 bg-gradient-to-br from-white/10 to-white/15 " : "bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600"} rounded-3xl shadow-2xl text-white p-8 relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-black/10"></div>
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                              <div>
                                <h2 className="text-3xl font-black mb-2">
                                  Farm Marketplace 🛒
                                </h2>
                                <p className={theme === 'dark' ? 'text-white text-lg' :  'text-blue-100 text-lg'}>
                                  Buy, sell, and trade agricultural products & equipment
                                </p>
                              </div>
                              <div className="text-6xl opacity-20">🏪</div>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                              <div className="text-center">
                                <div className="text-2xl font-bold">2,847</div>
                                <div className={`text-sm ${ theme === 'dark' ? 'text-white' : 'text-blue-200' } `}>
                                  Active Listings
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold">$4.2M</div>
                                <div className={`text-sm ${ theme === 'dark' ? 'text-white' : 'text-blue-200' } `}>
                                  Total Volume
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold">98.5%</div>
                                <div className={`  text-sm${ theme === 'dark' ? 'text-white' : 'text-blue-200' }`}>
                                  Success Rate
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
        
                        {/* Market content */}
                        <div className="grid lg:grid-cols-2 gap-8">
                          {marketplaceItems.map((item) => (
                            <div
                              key={item.id}
                              className={` ${theme === 'dark' ? 'bg-black text-white' : 'bg-white'} rounded-b-3xl shadow-xl border-1 border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105`}
                            >
                              <div
                                className={`h-48 ${item.image} flex items-center justify-center text-white text-6xl relative`}
                              >
                                <div className="absolute inset-0 bg-black/20 "></div>
                                <span className="relative z-10">
                                  {item.category === "equipment"
                                    ? "🚜"
                                    : item.category === "grain"
                                    ? "🌾"
                                    : item.category === "products"
                                    ? "🍯"
                                    : "🌱"}
                                </span>
                                {item.certified && (
                                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    {item.certified}
                                  </div>
                                )}
                                {item.verified && (
                                  <CheckCircle className="absolute top-4 left-4 w-8 h-8 text-white bg-blue-500 rounded-full p-1" />
                                )}
                              </div>
        
                              <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex-1">
                                    <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-bold text-xl  mb-2` }>
                                      {item.title}
                                    </h3>
                                    <div className="flex items-center space-x-4 mb-2">
                                      <span
                                        className={`text-3xl font-black text-green-600 ${ theme === 'dark' ? 'text-green-400' : 'text-green-600' }`}>
                                        {item.price}
                                      </span>
                                      <span
                                        className={`text-sm ${ theme === 'dark' ? 'text-white' : 'text-gray-500'}`}  >
                                        ({item.pricePerUnit})
                                      </span>
                                    </div>

                                    {item.quantity && (
                                      <p className={`font-medium ${ theme === 'dark' ? ' text-white' : 'text-gray-600 '}`}>
                                        Quantity: {item.quantity}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className={`${ theme === 'dark' ? 'text-white' : ' text-gray-700'} text-sm font-semibold`}>
                                      {item.rating}
                                    </span>
                                  </div>
                                </div>
        
                                <div className="space-y-3 mb-6">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className={`${ theme === 'dark' ? 'text-white' : 'text-gray-500'}`}>Seller:</span>
                                    <span className={` font-semibold ${ theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                      {item.seller}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className={`${ theme === 'dark' ? 'text-white' : 'text-gray-500'}`}>Location:</span>
                                    <span className={` ont-medium flex items-center${ theme === 'dark' ? 'text-white' : 'text-gray-700 '}`}>
                                      <MapPin className="w-4 h-4 mr-1" />
                                      {item.location}
                                    </span>
                                  </div>
                                  {item.condition && (
                                    <div className="flex items-center justify-between text-sm">
                                      <span className={`${ theme === 'dark' ? 'text-white' : 'text-gray-500'}`}>Condition:</span>
                                      <span className={` font-medium ${ theme === 'dark' ? 'text-white' : 'text-gray-700'} `}>
                                        {item.condition}
                                      </span>
                                    </div>
                                  )}
                                  {item.harvestDate && (
                                    <div className="flex items-center justify-between text-sm">
                                      <span className={`${ theme === 'dark' ? 'text-white' : 'text-gray-500'  }`}>Harvest:</span>
                                      <span className={` font-medium  ${ theme === 'dark' ? 'text-white' : 'text-green-700' }`}>
                                        {item.harvestDate}
                                      </span>
                                    </div>
                                  )}
                                </div>
        
                                <div className="flex flex-wrap gap-2 mb-6">
                                  {item.organic && (
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                                      <Leaf className="w-3 h-3 mr-1" />
                                      Organic
                                    </span>
                                  )}
                                  {item.shipping && (
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                                      <Truck className="w-3 h-3 mr-1" />
                                      Shipping Available
                                    </span>
                                  )}
                                  {item.wholesale && (
                                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                                      Wholesale
                                    </span>
                                  )}
                                </div>
        
                                <div className="grid grid-cols-2 gap-3">
                                  <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                                    <MessageCircle className="w-4 h-4" />
                                    <span>Contact</span>
                                  </button>
                                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                                    <ShoppingCart className="w-4 h-4" />
                                    <span>Buy Now</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
    </div>
  )
}

export default MarketPage
