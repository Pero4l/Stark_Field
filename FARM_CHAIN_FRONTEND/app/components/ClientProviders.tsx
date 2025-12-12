"use client";

import CurrentUserProvider from "@/app/components/currentUser";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CurrentUserProvider>
      {children}
    </CurrentUserProvider>
  );
}
