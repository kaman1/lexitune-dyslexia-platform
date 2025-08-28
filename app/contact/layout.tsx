import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Tekimax",
  description: "Get in touch with the Tekimax team for inquiries about our products and services",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
