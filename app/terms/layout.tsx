import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Tekimax",
  description: "Terms of Service for Tekimax services and products",
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
