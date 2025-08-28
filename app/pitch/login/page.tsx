"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function PitchLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simple client-side authentication
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Get password from environment variable, fallback to secure default if not available
      const envPassword =""
        // process.env.NEXT_PUBLIC_PITCH_DECK_PASSWORD || "";

      if (password === envPassword) {
        // Store authentication in session storage
        sessionStorage.setItem("pitchAuth", "true");
        router.push("/pitch");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Image
              src="https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/vmby46tevqgow4x9b48u"
              alt="Tekimax Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
            <h1 className="text-2xl font-medium mt-6 mb-2">
              Investor Presentation
            </h1>
            <p className="text-zinc-500 text-sm">
              Please sign in to access the pitch deck.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 mb-4 text-sm rounded-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing
                  in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <p className="text-xs text-zinc-400 mt-8">
            This presentation contains confidential information. By accessing
            this content, you agree to maintain its confidentiality.
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 bg-zinc-900 relative">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white max-w-md">
            <h2 className="text-3xl font-medium mb-6">
              Better decisions through data
            </h2>
            <p className="text-zinc-300">
              Tekimax transforms how organizations make strategic decisions by
              combining human intuition with AI-powered analysis, ensuring
              resources are allocated to validated initiatives with real market
              fit.
            </p>
          </div>
        </div>

        {/* Bottom left pattern */}
        <div className="absolute bottom-0 left-0 w-80 h-60 overflow-hidden">
          <div className="relative w-full h-full">
            {/* Square elements only */}
            <div className="absolute bottom-4 left-24 w-16 h-16 bg-gray-600 opacity-80" />
            <div className="absolute bottom-20 left-40 w-14 h-14 bg-gray-600 opacity-70" />
            <div className="absolute bottom-28 left-8 w-12 h-12 bg-gray-700 opacity-60" />
          </div>
        </div>

        {/* Top right pattern - mirrored */}
        <div className="absolute top-0 right-0 w-80 h-60 overflow-hidden">
          <div className="relative w-full h-full">
            {/* Square elements only - mirrored */}
            <div className="absolute top-4 right-24 w-16 h-16 bg-gray-600 opacity-80" />
            <div className="absolute top-20 right-40 w-14 h-14 bg-gray-600 opacity-70" />
            <div className="absolute top-28 right-8 w-12 h-12 bg-gray-700 opacity-60" />
          </div>
        </div>

        <div className="absolute bottom-4 right-4 text-white text-xs opacity-50">
          Confidential Investor Presentation
        </div>
      </div>
    </div>
  );
}
