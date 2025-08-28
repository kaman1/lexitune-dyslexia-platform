import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement | TEKIMAX - ADA & WCAG Compliance",
  description: "TEKIMAX's commitment to digital accessibility, ADA compliance, WCAG guidelines, and inclusive design for all users including those with disabilities.",
  robots: "noindex, nofollow",
};

export default function AccessibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}