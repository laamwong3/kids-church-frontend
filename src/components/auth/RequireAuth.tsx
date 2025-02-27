"use client";

import { useAuth } from "@/firebase/hooks/AuthProvider";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      redirect("/login");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
