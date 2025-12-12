'use client'

import React, { useState, useEffect } from "react";
import {
  Bell,
  MessageCircle,
  Package,
  CheckCircle,
  Users,
  Gift,
  AlertCircle,
  Zap,
  X,
  ThumbsUp,
  UserRoundCheck
} from "lucide-react";
import { useTheme } from "next-themes";
import { useCurrentUser } from "@/app/components/currentUser";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type Notification = {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  icon: React.ReactNode; 
  color: string;
};


const NotificationCenter = () => {
  const { theme } = useTheme();
  const { token } = useCurrentUser();
  const [notificationList, setNotificationList] = useState<Notification[]>([]);

  const unreadCount = notificationList.filter((n) => n.unread).length;

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string; gradient: string } } = {
      blue: { bg: "bg-blue-100", text: "text-blue-600", gradient: "from-blue-500 to-cyan-500" },
      purple: { bg: "bg-purple-100", text: "text-purple-600", gradient: "from-purple-500 to-pink-500" },
      green: { bg: "bg-green-100", text: "text-green-600", gradient: "from-green-500 to-emerald-500" },
      pink: { bg: "bg-pink-100", text: "text-pink-600", gradient: "from-pink-500 to-rose-500" },
      orange: { bg: "bg-orange-100", text: "text-orange-600", gradient: "from-orange-500 to-amber-500" },
      red: { bg: "bg-red-100", text: "text-red-600", gradient: "from-red-500 to-rose-500" },
    };
    return colors[color] || colors.blue;
  };

  const typeConfig: { [key: string]: { title: string; icon: React.ReactNode; color: string } } = {
    post: { title: "Post Update", icon: <CheckCircle className="w-5 h-5" />, color: "green" },
    message: { title: "New Message", icon: <MessageCircle className="w-5 h-5" />, color: "blue" },
    order: { title: "Order Update", icon: <Package className="w-5 h-5" />, color: "purple" },
    alert: { title: "Alert", icon: <AlertCircle className="w-5 h-5" />, color: "red" },
    social: { title: "Social Activity", icon: <Users className="w-5 h-5" />, color: "pink" },
    promo: { title: "Promotion", icon: <Gift className="w-5 h-5" />, color: "orange" },
    like: { title: "Social Activity", icon: <ThumbsUp className="w-5 h-5" />, color: "blue" },
    account: { title: "Welcome to FarmChain", icon: <UserRoundCheck className="w-5 h-5" />, color: "orange" },
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch("https://farmchain.onrender.com/user/notification", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log("Notification Response:", data);

      const mapped = Array.isArray(data.data)
        ? data.data.map((n: any) => {
            const cfg = typeConfig[n.type] || typeConfig["alert"];
            return {
              id: n.id,
              type: n.type,
              title: cfg.title,
              message: n.notification || "",
              time: dayjs(n.createdAt).fromNow(),
              unread: !n.is_read,
              icon: cfg.icon,
              color: cfg.color,
            };
          })
        : [];

      setNotificationList(mapped);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const deleteNotification = async (id: number) => {
    try {
      const res = await fetch(`https://farmchain.onrender.com/user/notification/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        removeNotification(id);
        console.log("Notification deleted:", id);
      } else {
        console.error("Failed to delete notification:", data.message);
      }
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const markAsRead = (id: number) => {
    setNotificationList(
      notificationList.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotificationList(notificationList.map((n) => ({ ...n, unread: false })));
  };

  const removeNotification = (id: number) => {
    setNotificationList(notificationList.filter((n) => n.id !== id));
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? "" : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"}`}>
      <div className="max-w-3x mx-auto space-y-8">
        {/* HEADER */}
        <div className={`${theme === 'dark' ? "border-1" : "bg-gradient-to-br from-green-600 via-gray-700 to-green-300"} rounded-3xl shadow-2xl text-white lg:p-10 p-4 py-10 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Bell className="w-8 h-8" />
                <h2 className="text-4xl font-black">Notifications</h2>
              </div>
              <p className="text-purple-100 text-lg">
                Stay updated with your latest activities
              </p>
            </div>
            <div className="text-center">
              <div className="lg:w-20 lg:h-20 p-3 px-5 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-2">
                <span className="text-4xl font-black">{unreadCount}</span>
              </div>
              <p className="text-sm text-purple-100">Unread</p>
            </div>
          </div>
        </div>

        {/* ACTION BAR */}
        <div className={`${theme === 'dark' ? "" : "bg-white"} rounded-2xl shadow-lg border border-gray-100 p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className={`font-semibold ${theme === 'dark' ? "" : "text-gray-700"}`}>
                Quick Actions
              </span>
            </div>
            <button
              onClick={markAllAsRead}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-md"
            >
              Mark All as Read
            </button>
          </div>
        </div>

        {/* NOTIFICATION LIST */}
        <div className={`${theme === 'dark' ? "" : "bg-white"} rounded-3xl shadow-xl border border-gray-100 p-1 space-y-6`}>
          <div className="divide-y divide-gray-100 rounded-2xl overflow-hidden">
            {notificationList.map((notification) => {
              const colorClasses = getColorClasses(notification.color);
              return (
                <div
                  key={notification.id}
                  className={`p-4 py-5 hover:bg-gradient-to-r ${theme === 'dark' ? "hover:from-white/15" : "hover:from-gray-50"} hover:to-transparent cursor-pointer transition-all group ${notification.unread ? "bg-blue-100/40" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-4">
                    {/* ICON */}
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${colorClasses.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform`}
                    >
                      {notification.icon}
                    </div>

                    {/* TEXT */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4
                          className={`font-bold ${notification.unread ? (theme === 'dark' ? "text-white" : "text-gray-900") : (theme === 'dark' ? "text-white" : "text-gray-600")}`}
                        >
                          {notification.title}
                        </h4>

                        <div className="flex items-center -space-x-9 lg:space-x-3 ml-4">
                          <span className={`text-sm ${theme === 'dark' ? "text-white" : "text-gray-500"} whitespace-nowrap`}>
                            {notification.time}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/30 rounded-lg transition-all"
                          >
                            <X className="w-4 h-4 text-gray-200" />
                          </button>
                        </div>
                      </div>

                      <p className={`text-sm leading-relaxed ${notification.unread ? `font-medium ${theme === 'dark' ? "text-gray-200" : "text-gray-700"}` : `${theme === 'dark' ? "text-gray-200" : "text-gray-600"}`}`}>
                        {notification.message}
                      </p>
                    </div>

                    {/* UNREAD DOT */}
                    {notification.unread && (
                      <div className="flex-shrink-0">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse shadow-lg"></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* EMPTY STATE */}
        {notificationList.length === 0 && (
          <div className={`${theme === 'dark' ? "" : "bg-white"} rounded-3xl shadow-xl border border-gray-100 p-12 text-center`}>
            <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              All Caught Up! 🎉
            </h3>
            <p className="text-gray-600">
              You have no notifications at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
