"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allow, setAllow] = useState(false);

  const isTokenExpired = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (!payload.exp) return true;

      return Date.now() > payload.exp * 1000;
    } catch (error) {
      return true; // any error = expired/invalid token
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("farmchain_token");
    
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("farmchain_token"); // remove invalid token
      router.replace("/auth/login");
    } else {
      setAllow(true); // valid token
    }
  }, [router]);

  if (!allow) return null; // or loader

  return <>{children}</>;
}
