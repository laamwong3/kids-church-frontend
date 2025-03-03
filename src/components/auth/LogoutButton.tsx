// Create a new file: src/components/auth/LogoutButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Create a new file: src/components/auth/LogoutButton.tsx

// Create a new file: src/components/auth/LogoutButton.tsx

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully logged out");
      router.push("/");
    } catch (error) {
      toast.error("Failed to log out");
      console.error(error);
    }
  };

  return (
    <Button onClick={handleLogout} variant="ghost" size="sm">
      <LogOut className="mr-2 size-4" /> Logout
    </Button>
  );
}
