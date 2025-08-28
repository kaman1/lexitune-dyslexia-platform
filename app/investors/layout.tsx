import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Investor Relations | Tekimax",
  description: "Investment opportunities and information for potential Tekimax investors",
}

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
