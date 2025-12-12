"use client";

import React from "react";
import {
  TrendingUp,
  Droplets,
  Calendar,
  Zap,
  Target,
  Clock,
} from "lucide-react";
import { useTheme } from 'next-themes'
import {useCurrentUser} from '@/app/components/currentUser';

type Insight = {
  title: string;
  value: string;
  status: string;
  icon: React.ReactNode;
};

type Post = {
  id: number;
  farmer: string;
  location: string;
  avatar: string;
  time: string;
  verified: boolean;
  farmSize: string;
  content: string;
  images?: string[];
  video?: boolean;
  likes: number;
  comments: number;
  shares: number;
  type: string;
  price?: string;
  tags?: string[];
  category: string;
};

const farmingInsights: Insight[] = [
  {
    title: "Soil Moisture",
    value: "72%",
    status: "optimal",
    icon: <Droplets className="w-6 h-6" />,
  },
  {
    title: "Growing Days",
    value: "145",
    status: "good",
    icon: <Calendar className="w-6 h-6" />,
  },
  {
    title: "Market Price",
    value: "+12%",
    status: "up",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    title: "Yield Prediction",
    value: "94%",
    status: "excellent",
    icon: <Target className="w-6 h-6" />,
  },
];

const posts: Post[] = [
  {
    id: 1,
    farmer: "Sarah Johnson",
    location: "Iowa, USA",
    avatar: "SJ",
    time: "2 hours ago",
    verified: true,
    farmSize: "50 acres",
    content:
      "BREAKTHROUGH HARVEST! My companion planting experiment yielded 40% more tomatoes than last season! Planting basil and marigolds alongside tomatoes not only increased yield but naturally repelled pests. Zero pesticides used! Who wants the detailed planting schedule?",
    images: [
      "bg-gradient-to-br from-red-500 via-orange-400 to-yellow-500",
      "bg-gradient-to-br from-green-500 to-emerald-600",
    ],
    likes: 142,
    comments: 34,
    shares: 18,
    type: "success-story",
    tags: ["#OrganicFarming", "#CompanionPlanting", "#SustainableAgriculture"],
    category: "small-scale",
  },
  {
    id: 2,
    farmer: "AgriTech Solutions",
    location: "California, USA",
    avatar: "AS",
    time: "4 hours ago",
    verified: true,
    farmSize: "2,500 acres",
    content:
      "WEATHER ALERT: Severe drought conditions predicted for Central Valley next month. We're implementing advanced drip irrigation and moisture sensors across all fields. Sharing our water conservation protocol with the community - together we can overcome this challenge.",
    video: true,
    likes: 1200,
    comments: 67,
    shares: 45,
    type: "alert",
    tags: ["#DroughtAlert", "#WaterConservation", "#SmartFarming"],
    category: "commercial",
  },
  {
    id: 3,
    farmer: "Miguel Rodriguez",
    location: "Texas, USA",
    avatar: "MR",
    time: "8 hours ago",
    verified: false,
    farmSize: "15 acres",
    content:
      "TRADE OPPORTUNITY: 800 lbs of premium organic corn ready for harvest next week. Looking to trade for quality hay or small equipment rental. This corn tested 99% organic certified. Local Houston area preferred but willing to arrange transport for serious inquiries.",
    likes: 67,
    comments: 29,
    shares: 12,
    type: "trade",
    price: "$1,200 value",
    tags: ["#OrganicCorn", "#TradeOpportunity", "#Houston"],
    category: "small-scale",
  },
  {
    id: 4,
    farmer: "Sarah Johnson",
    location: "Iowa, USA",
    avatar: "SJ",
    time: "2 hours ago",
    verified: true,
    farmSize: "50 acres",
    content:
      "BREAKTHROUGH HARVEST! My companion planting experiment yielded 40% more tomatoes than last season! Planting basil and marigolds alongside tomatoes not only increased yield but naturally repelled pests. Zero pesticides used! Who wants the detailed planting schedule?",
    images: [
      "bg-gradient-to-br from-red-500 via-orange-400 to-yellow-500",
      "bg-gradient-to-br from-green-500 to-emerald-600",
    ],
    likes: 142,
    comments: 34,
    shares: 18,
    type: "success-story",
    tags: ["#OrganicFarming", "#CompanionPlanting", "#SustainableAgriculture"],
    category: "small-scale",
  },
  {
    id: 5,
    farmer: "AgriTech Solutions",
    location: "California, USA",
    avatar: "AS",
    time: "4 hours ago",
    verified: true,
    farmSize: "2,500 acres",
    content:
      "WEATHER ALERT: Severe drought conditions predicted for Central Valley next month. We're implementing advanced drip irrigation and moisture sensors across all fields. Sharing our water conservation protocol with the community - together we can overcome this challenge.",
    video: true,
    likes: 289,
    comments: 67,
    shares: 45,
    type: "alert",
    tags: ["#DroughtAlert", "#WaterConservation", "#SmartFarming"],
    category: "commercial",
  },
  {
    id: 6,
    farmer: "Miguel Rodriguez",
    location: "Texas, USA",
    avatar: "MR",
    time: "8 hours ago",
    verified: false,
    farmSize: "15 acres",
    content:
      "TRADE OPPORTUNITY: 800 lbs of premium organic corn ready for harvest next week. Looking to trade for quality hay or small equipment rental. This corn tested 99% organic certified. Local Houston area preferred but willing to arrange transport for serious inquiries.",
    likes: 67,
    comments: 29,
    shares: 12,
    type: "trade",
    price: "$1,200 value",
    tags: ["#OrganicCorn", "#TradeOpportunity", "#Houston"],
    category: "small-scale",
  },
];

const dashboard = () => {
  const user = useCurrentUser();
  

const { theme, setTheme } = useTheme();

  return (
    <div>
      <div className="space-y-8">

        {/* hheader */}
        <div className={`${theme === 'dark' ? " bg-gradient-to-br from-white/10 to-white/15 text-white border-1" : "bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600"} rounded-3xl shadow-2xl text-white md:p-8 p-3 py-8 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black mb-2 flex items-center">
                  <Zap className="w-8 h-8 mr-3" />
                  Welcome back, {user.user?.currentUser ?? 'Farmer'} 🌱
                </h2>
                <p className={` text-lg ${theme === 'dark' ? 'text-white' : 'text-green-100'}`}>
                  Your farm is thriving. Here's what's happening today.
                </p>
              </div>
              <div className={`text-7xl ${theme === 'dark' ? "opacity-70" : 'opacity-20'}`}>🚜</div>
            </div>
          </div>
        </div>



    {/* insights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {farmingInsights.map((insight, idx) => (
            <div
              key={idx}
              className={` ${theme === 'dark' ? 'bg-black text-white' : 'bg-white'} rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-1 lg:p-3 rounded-xl bg-green-100 text-green-600">
                  {insight.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-green-600">
                  {insight.status.toUpperCase()}
                </span>
              </div>
              <h3 className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-600'} text-sm font-medium mb-2`}>
                {insight.title}
              </h3>
              <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-2xl font-black text-gray-900`}>
                {insight.value}
              </p>
            </div>
          ))}
        </div>

        {/* recent activity */}

        <div className={`${theme === 'dark' ? 'text-white bg-black' : 'bg-white'} rounded-3xl shadow-xl border border-gray-100 p-5`}>
          <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6 flex items-center`}>
            <Clock className={`w-7 h-7 mr-3 ${theme === 'dark' ? 'text-white' : 'text-green-500'}`}  />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {posts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className={`flex items-center space-x-4 py-4 ${theme === 'dark' ? 'hover:bg-white/15 hover:px-2' : 'hover:bg-gray-50 '} rounded-2xl transition-colors cursor-pointer`}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${theme === 'dark' ? 'text-white ' : 'text-gray-900'}`}>{post.farmer}</h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-white ' :  'text-gray-600'}`}>
                    {post.content.substring(0, 60)}...
                  </p>
                </div>
                <span className={`text-sm ${theme === 'dark' ? 'text-white ' :  'text-gray-500'}`}>{post.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
