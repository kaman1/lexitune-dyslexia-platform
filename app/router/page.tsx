"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RouterPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated and decide where to route them
    const checkAuthAndRoute = async () => {
      try {
        // Try to fetch user info to check authentication status
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          // User is authenticated, redirect to portal
          router.push("/portal");
        } else {
          // User is not authenticated, redirect to login
          router.push("/login");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Default to login on error
        router.push("/login");
      }
    };

    checkAuthAndRoute();
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Redirecting...</h2>
        <p className="mt-2 text-gray-500">Please wait while we redirect you.</p>
      </div>
    </div>
  );
}
