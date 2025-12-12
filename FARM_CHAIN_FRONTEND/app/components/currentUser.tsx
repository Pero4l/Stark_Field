"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  userId: number;
  currentUser: string;
  location: string;
  email: string;
  avatarUrl: string;
};

type UserProfile = {
  name: string;
  location: string;
  avatar: string;
  cover_avatar: string;
  bio: string;
  organization: string;
  verified: boolean;
  share_account: string;
  followers: number;
  following: number;
  totalPost: number;
  posts: Array<any>;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  logout: () => void;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};


const UserContext = createContext<UserContextType | null>(null);

export const useCurrentUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx)
    throw new Error("useCurrentUser must be used inside CurrentUserProvider");
  return ctx;
};

export default function CurrentUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize from localStorage synchronously on first render in the client.
  // `use client` at the top ensures this component runs only on the client.
  const [user, setUser] = useState<User | null>(() => {
    try {
      if (typeof window === "undefined") return null;
      const s = localStorage.getItem("farmchain_user");
      if (!s || s === "undefined" || s === "null") return null;
      return JSON.parse(s);
    } catch (err) {
      // if corrupted, remove the key and start fresh
      try {
        localStorage.removeItem("farmchain_user");
      } catch {}
      return null;
    }
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      if (typeof window === "undefined") return null;
      const s = localStorage.getItem("userProfile");
      if (!s || s === "undefined" || s === "null") return null;
      return JSON.parse(s);
    } catch (err) {
      try {
        localStorage.removeItem("userProfile");
      } catch {}
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      if (typeof window === "undefined") return null;
      const s = localStorage.getItem("farmchain_token");
      if (!s || s === "undefined" || s === "null") return null;
      return s;
    } catch (err) {
      try {
        localStorage.removeItem("farmchain_token");
      } catch {}
      return null;
    }
  });

  // Keep localStorage in sync whenever these values change.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (user) localStorage.setItem("farmchain_user", JSON.stringify(user));
      else localStorage.removeItem("farmchain_user");
    } catch {}
  }, [user]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (userProfile)
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
      else localStorage.removeItem("userProfile");
    } catch {}
  }, [userProfile]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (token) localStorage.setItem("farmchain_token", token);
      else localStorage.removeItem("farmchain_token");
    } catch {}
  }, [token]);

  // Explicit logout helper that clears user state and all related storage keys.
  const logout = () => {
    setUser(null);
    setUserProfile(null);
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("farmchain_user");
        localStorage.removeItem("userProfile");
        localStorage.removeItem("farmchain_token");
        localStorage.removeItem("isLoggedIn");
      }
    } catch {}
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userProfile,
        setUserProfile,
        logout,
        token,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
