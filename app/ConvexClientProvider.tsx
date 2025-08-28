
import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

// In Next.js client components, we access NEXT_PUBLIC_ variables directly
const convexUrl = (process.env.NEXT_PUBLIC_CONVEX_URL as string) || "";
const convex = new ConvexReactClient(convexUrl);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
