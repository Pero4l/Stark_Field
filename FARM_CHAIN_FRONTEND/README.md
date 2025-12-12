This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


'use client'

import React, { useState } from "react";
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
} from "lucide-react";
import { useTheme } from "next-themes";

type Notification = {
  id: number;
  type: "message" | "order" | "alert" | "success" | "social" | "promo";
  title: string;
  message: string;
  time: string;
  unread: boolean;
  icon: string;
  color: string;
};

const notifications: Notification[] = [
  {
    id: 1,
    type: "message",
    title: "New Message from Sarah",
    message: "Hey! Just wanted to check in about our meeting tomorrow.",
    time: "2 min ago",
    unread: true,
    icon: "message",
    color: "blue",
  },
  {
    id: 2,
    type: "order",
    title: "Order Shipped",
    message: "Your order #12345 has been shipped and is on the way!",
    time: "1 hour ago",
    unread: true,
    icon: "package",
    color: "purple",
  },
  {
    id: 3,
    type: "success",
    title: "Payment Successful",
    message: "Your payment of $99.99 has been processed successfully.",
    time: "3 hours ago",
    unread: false,
    icon: "check",
    color: "green",
  },
  {
    id: 4,
    type: "social",
    title: "New Follower",
    message: "John Doe started following you. Check out their profile!",
    time: "5 hours ago",
    unread: false,
    icon: "users",
    color: "pink",
  },
  {
    id: 5,
    type: "promo",
    title: "Special Offer!",
    message: "Get 50% off on all premium plans. Limited time only!",
    time: "1 day ago",
    unread: false,
    icon: "gift",
    color: "orange",
  },
  {
    id: 6,
    type: "alert",
    title: "Security Alert",
    message: "New login detected from Chrome on Windows.",
    time: "2 days ago",
    unread: false,
    icon: "alert",
    color: "red",
  },
];

const NotificationCenter = () => {
    const { theme } = useTheme();
  const [notificationList, setNotificationList] = useState(notifications);
  const unreadCount = notificationList.filter((n) => n.unread).length;

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "message":
        return <MessageCircle className="w-5 h-5" />;
      case "package":
        return <Package className="w-5 h-5" />;
      case "check":
        return <CheckCircle className="w-5 h-5" />;
      case "users":
        return <Users className="w-5 h-5" />;
      case "gift":
        return <Gift className="w-5 h-5" />;
      case "alert":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string; gradient: string } } = {
      blue: {
        bg: "bg-blue-100",
        text: "text-blue-600",
        gradient: "from-blue-500 to-cyan-500",
      },
      purple: {
        bg: "bg-purple-100",
        text: "text-purple-600",
        gradient: "from-purple-500 to-pink-500",
      },
      green: {
        bg: "bg-green-100",
        text: "text-green-600",
        gradient: "from-green-500 to-emerald-500",
      },
      pink: {
        bg: "bg-pink-100",
        text: "text-pink-600",
        gradient: "from-pink-500 to-rose-500",
      },
      orange: {
        bg: "bg-orange-100",
        text: "text-orange-600",
        gradient: "from-orange-500 to-amber-500",
      },
      red: {
        bg: "bg-red-100",
        text: "text-red-600",
        gradient: "from-red-500 to-rose-500",
      },
    };
    return colors[color] || colors.blue;
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
        {/* Header */}
        <div className={`${theme === 'dark' ? "border-1" : "bg-gradient-to-br from-green-600 via-gray-700 to-green-300"} rounded-3xl shadow-2xl text-white lg:p-10 p-4 py-10 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between ">
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
        </div>

        {/* Actions Bar */}
        <div className={`${theme === 'dark' ? "" : "bg-white"} rounded-2xl shadow-lg border border-gray-100 p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className={`font-semibold  ${theme === 'dark' ? "" : "text-gray-700"}`}>Quick Actions</span>
            </div>
            <button
              onClick={markAllAsRead}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-md"
            >
              Mark All as Read
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className={`${theme === 'dark' ? "" : "bg-white"} rounded-3xl shadow-xl border border-gray-100 p-6 space-y-6`}>
          <div className="divide-y divide-gray-100">
            {notificationList.map((notification) => {
              const colorClasses = getColorClasses(notification.color);
              return (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gradient-to-r ${theme === 'dark' ? "hover:from-white/15" : "hover:from-gray-50"}  hover:to-transparent cursor-pointer transition-all group ${
                    notification.unread ? "bg-blue-100/40" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${colorClasses.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform`}
                    >
                      {getIcon(notification.icon)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4
                          className={`font-bold text-gray-900 ${
                            notification.unread ? `${theme === 'dark' ? "text-white" : "text-gray-900"}` : ` ${theme === 'dark' ? "text-white" : "text-gray-600"}`
                          }`}
                        >
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className={`text-sm ${theme === 'dark' ? "text-white" : "text-gray-500"} whitespace-nowrap`}>
                            {notification.time}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded-lg transition-all"
                          >
                            <X className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                      <p
                        className={`text-sm leading-relaxed ${
                          notification.unread
                            ? `font-medium ${theme === 'dark' ? "text-gray-200" : "text-gray-700"}`
                            : `${theme === 'dark' ? "text-gray-200" : "text-gray-600"}`
                        }`}
                      >
                        {notification.message}
                      </p>
                    </div>

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

        {/* Empty State (shown when no notifications) */}
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