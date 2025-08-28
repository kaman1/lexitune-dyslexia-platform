import { ConvexHttpClient } from "convex/browser";

// Initialize Convex client
export const convexClient = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

// Export a function to get a fresh client to avoid stale references
export function getConvexClient() {
  return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");
} 