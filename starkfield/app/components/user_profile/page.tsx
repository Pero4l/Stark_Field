import React from "react";
import UserProfile from "./UserProfile";

export default function Page() {
  // This is a server page wrapper that provides a Suspense boundary
  // so the client-only `UserProfile` (which uses `useSearchParams`) can
  // safely perform CSR bailout without causing the prerender error.
  return (
    <React.Suspense fallback={null}>
      <UserProfile />
    </React.Suspense>
  );
}
