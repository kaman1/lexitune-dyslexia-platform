"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";

// Get the Convex URL from environment variables
const convexUrl =
  process.env.NEXT_PUBLIC_CONVEX_URL || "https://convex.tekimax.com";

// Create the Convex client
const convex = new ConvexReactClient(convexUrl);

export function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
