"use client";
import React, { useState } from "react";
import {
  Home,
  Users,
  MessageCircle,
  Store,
  Cloud,
  Plus,
  Bot,
  Heart,
  MessageSquare,
  Share,
  TrendingUp,
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Filter,
  Star,
  Calendar,
  DollarSign,
  Truck,
  Leaf,
  BarChart3,
  Camera,
  Video,
  Mic,
  Send,
  Phone,
  Mail,
  Globe,
  Zap,
  Target,
  ShoppingCart,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  PieChart,
  Search,
} from "lucide-react";
import { useActiveTab } from "@/app/context/ActiveTabContext";
import { useTheme } from "next-themes";

// NAVBAR
import MainNavPage from "./navbar/page";

// TABS
import WeatherPage from "../tabs/weather/page";
import Dashboard from "../tabs/dashboard/page";
import Profile from "../tabs/personal_profile/page";
import Message from "../tabs/message/page";
import MarketPage from "../tabs/market_place/page";
import AnalyticsPage from "../tabs/analytics/page";
import Feed from "../tabs/feed/page";
import Notification from "../tabs/notification/page";
import UserProfile from "../user_profile/UserProfile";
import AIChat from "../tabs/ai_bot/page";

// SIDE BAR
import WeatherSide from "../tabs/weather/weather_side/page";

/* ================ SMALL COMPONENTS ================ */
import CreatePost from "../create_post/page";
import SettingsPage from "../settings/page";

const TabButton: React.FC<{
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick: (id: string) => void;
  badge?: number;
}> = ({ id, icon: Icon, label, isActive, onClick, badge }) => {
  const { theme } = useTheme();

  return (
    <button
      onClick={() => onClick(id)}
      className={`relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 w-full ${
        isActive
          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transform scale-105"
          : theme === "dark"
          ? "text-white hover:bg-gray-800 hover:text-gray-100 hover:scale-105"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:scale-105"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-semibold">{label}</span>
      {badge && badge > 0 && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
};

/* ================= MAIN COMPONENT ================= */
const FarmChain: React.FC = () => {
  const { activeTab, setActiveTab, selectedUserId } = useActiveTab();
  const [notifications, setNotifications] = useState(3);
  const [mainMenu, setMainMenu] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  // Only render theme-dependent UI after hydration
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent rendering until client-side
    return null;
  }

  return (
    <>
      {/* MAIN NAV */}
      <MainNavPage />
      <div
        suppressHydrationWarning
        className={`min-h-screen ${
          theme === "dark"
            ? "bg-black"
            : "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
        }`}
      >
        {/* BODY */}
        <div className="max-w-[1600px] mx-auto px-2 py-8 mt-20 lg:mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:mt-9">
            {/*left Sidebar */}
            <div className="lg:col-span-2 relative">
              <div
                className={`hidden lg:block ${
                  theme === "dark" ? "bg-black" : "bg-white"
                } rounded-3xl shadow-xl border border-gray-100 p-4 sticky top-2`}
              >
                <nav onClick={() => setMainMenu(false)} className="space-y-2">
                  <TabButton
                    id="dashboard"
                    icon={Home}
                    label="Dashboard"
                    isActive={activeTab === "dashboard"}
                    onClick={setActiveTab}
                  />
                  <TabButton
                    id="feed"
                    icon={TrendingUp}
                    label="Feed"
                    isActive={activeTab === "feed"}
                    onClick={setActiveTab}
                  />
                  <TabButton
                    id="messages"
                    icon={MessageCircle}
                    label="Messages"
                    isActive={activeTab === "messages"}
                    onClick={setActiveTab}
                    badge={2}
                  />
                  <TabButton
                    id="marketplace"
                    icon={Store}
                    label="Marketplace"
                    isActive={activeTab === "marketplace"}
                    onClick={setActiveTab}
                  />
                  <TabButton
                    id="weather"
                    icon={Cloud}
                    label="Weather"
                    isActive={activeTab === "weather"}
                    onClick={setActiveTab}
                  />
                  <TabButton
                    id="analytics"
                    icon={BarChart3}
                    label="Analytics"
                    isActive={activeTab === "analytics"}
                    onClick={setActiveTab}
                  />

                  <TabButton
                    id="AI_bot"
                    icon={Bot}
                    label="AI Bot"
                    isActive={activeTab === "AI_bot"}
                    onClick={setActiveTab}
                  />
                </nav>

                {/*  CREATE POST BUTTON ON LG */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => {
                      setActiveTab("create_post");
                    }}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Create Post</span>
                  </button>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                    <Store className="w-5 h-5" />
                    <span>List Product</span>
                  </button>
                </div>
              </div>
            </div>

            {/* TABS */}

            {/* Dashboard */}
            <div className="lg:col-span-7">
              {activeTab === "dashboard" && <Dashboard />}

              {/* profile */}
              {activeTab === "profile" && <Profile />}

              {/* Feed */}
              {activeTab === "feed" && <Feed />}

              {/* Message tab */}
              {activeTab === "messages" && <Message />}

              {/* Marketplace tab */}
              {activeTab === "marketplace" && <MarketPage />}

              {/* Weather tab */}
              {activeTab === "weather" && <WeatherPage />}

              {/* Analytics tab */}
              {activeTab === "analytics" && <AnalyticsPage />}

              {activeTab === "notification" && <Notification />}

              {/* Create post */}
              {activeTab === "create_post" && <CreatePost />}

              {/* Settings */}
              {activeTab === "settings" && <SettingsPage />}

              {/* User Profile */}
              {activeTab === "user_profile" && (
                <React.Suspense fallback={null}>
                  <UserProfile userId={selectedUserId ?? undefined} />
                </React.Suspense>
              )}

               {/* Ai bot */}
              {activeTab === "AI_bot" && <AIChat />}
            </div>

            {/* TABS END */}

            {/* Right Sidebar */}
            <div className="lg:col-span-3">
              <div className="space-y-6 sticky top-28">
                {/* weather */}
                <WeatherSide />

                {/* trending now */}
                <div
                  className={`${
                    theme === "dark" ? "bg-black text-white" : "bg-white"
                  } rounded-3xl shadow-xl border border-gray-100 p-6`}
                >
                  <h3
                    className={`font-bold text-lg  mb-6 flex items-center  ${
                      theme === "dark" ? "bg-black text-white" : "text-gray-900"
                    }`}
                  >
                    <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                    Trending Topics
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        tag: "#OrganicFarming",
                        posts: "2.1k posts",
                        trend: "+12%",
                      },
                      {
                        tag: "#ClimateResilience",
                        posts: "891 posts",
                        trend: "+45%",
                      },
                      {
                        tag: "#SustainableAgriculture",
                        posts: "1.5k posts",
                        trend: "+8%",
                      },
                      {
                        tag: "#PrecisionFarming",
                        posts: "743 posts",
                        trend: "+23%",
                      },
                      {
                        tag: "#CropRotation",
                        posts: "564 posts",
                        trend: "+15%",
                      },
                    ].map((topic, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-3 hover:bg-white/15 rounded-xl transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-green-600 group-hover:text-green-700">
                              {topic.tag}
                            </p>
                            <p
                              className={`${
                                theme === "dark"
                                  ? "text-gray-100"
                                  : "text-gray-500"
                              } text-xs`}
                            >
                              {topic.posts}
                            </p>
                          </div>
                          <span className="text-green-500 text-sm font-bold">
                            {topic.trend}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* market price */}
                <div
                  className={`${
                    theme === "dark" ? "bg-black text-white" : "bg-white"
                  } rounded-3xl shadow-xl border border-gray-100 p-6`}
                >
                  <h3
                    className={`font-bold text-lg  mb-6 flex items-center  ${
                      theme === "dark" ? "bg-black text-white" : "text-gray-900"
                    }`}
                  >
                    <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                    Market Prices
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        crop: "Corn",
                        price: "$6.45",
                        change: "+2.3%",
                        status: "up",
                      },
                      {
                        crop: "Soybeans",
                        price: "$14.23",
                        change: "-1.2%",
                        status: "down",
                      },
                      {
                        crop: "Wheat",
                        price: "$8.91",
                        change: "+0.8%",
                        status: "up",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-3 ${
                          theme === "dark" ? "border-1" : "bg-gray-50"
                        }  rounded-xl`}
                      >
                        <div>
                          <p
                            className={`font-semibold  ${
                              theme === "dark" ? "" : "text-gray-900"
                            }`}
                          >
                            {item.crop}
                          </p>
                          <p
                            className={`text-sm ${
                              theme === "dark" ? "" : "text-gray-600"
                            }`}
                          >
                            per bushel
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-bold text-lg  ${
                              theme === "dark" ? "" : "text-gray-900"
                            }`}
                          >
                            {item.price}
                          </p>
                          <span
                            className={`text-sm font-semibold ${
                              item.status === "up"
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            {item.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* online users */}
                <div
                  className={`${
                    theme === "dark" ? "bg-black text-white" : "bg-white"
                  } rounded-3xl shadow-xl border border-gray-100 p-6`}
                >
                  <h3
                    className={`font-bold text-lg  mb-6 flex items-center  ${
                      theme === "dark" ? "bg-black text-white" : "text-gray-900"
                    }`}
                  >
                    <Users className="w-5 h-5 mr-2 text-blue-500" />
                    Farmers Online
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Sarah Johnson",
                        farm: "Organic Valley",
                        status: "online",
                        avatar: "SJ",
                      },
                      {
                        name: "Mike Chen",
                        farm: "Green Acres",
                        status: "online",
                        avatar: "MC",
                      },
                      {
                        name: "AgriTech Co.",
                        farm: "Commercial",
                        status: "busy",
                        avatar: "AC",
                      },
                      {
                        name: "Emma Rodriguez",
                        farm: "Heritage Farm",
                        status: "online",
                        avatar: "ER",
                      },
                      {
                        name: "Tech Innovations",
                        farm: "Smart Farming",
                        status: "online",
                        avatar: "TI",
                      },
                    ].map((farmer, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-2 hover:bg-white/15 rounded-xl cursor-pointer transition-colors"
                      >
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {farmer.avatar}
                          </div>
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                              farmer.status === "online"
                                ? "bg-green-500"
                                : farmer.status === "busy"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                            }`}
                          ></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-semibold ${
                              theme === "dark" ? "" : "text-gray-900"
                            } truncate`}
                          >
                            {farmer.name}
                          </p>
                          <p className="text-gray-400 text-xs truncate flex items-center">
                            <Globe className="w-3 h-3 mr-1" />
                            {farmer.farm}
                          </p>
                        </div>
                        <button
                          className={`p-2  ${
                            theme === "dark"
                              ? "hover:bg-white/15"
                              : "hover:bg-green-100"
                          } rounded-full transition-colors`}
                          title="Send Message"
                        >
                          <MessageCircle className="w-4 h-4 text-green-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    className={`w-full mt-4 text-center text-green-600  ${
                      theme === "dark"
                        ? "hover:bg-white/15"
                        : "hover:bg-green-700"
                    } font-semibold text-sm py-2 hover:bg-green-50 rounded-xl transition-colors`}
                  >
                    View All (1,247 online)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmChain;
