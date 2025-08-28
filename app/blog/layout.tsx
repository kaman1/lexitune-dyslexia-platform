import type { Metadata } from "next";
import { LayoutWrapper } from "@/components/layout-wrapper";

export const metadata: Metadata = {
  title: "Blog - Tekimax",
  description: "Insights on AI, education, and the future of neurodivergent empowerment",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}