// src/components/auth/RequireAuth.tsx
"use client";

import { useAuth } from "@/firebase/hooks/AuthProvider";
import { redirect } from "next/navigation";
import { useEffect } from "react";

// src/components/auth/RequireAuth.tsx

// src/components/auth/RequireAuth.tsx

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      redirect("/login");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-y-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
