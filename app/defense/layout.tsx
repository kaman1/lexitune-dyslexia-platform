import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Defense Contracting | Tekimax",
  description: "SBIR contracts, defense capabilities, and dual-use technology solutions",
}

export default function DefenseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
