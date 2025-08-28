import type React from "react";
import type { Metadata } from "next";
import { AuthProvider } from "@/components/providers/auth-provider";

export const metadata: Metadata = {
  title: "Investor Pitch Deck | Tekimax",
  description: "Confidential investor presentation for Tekimax",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PitchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
