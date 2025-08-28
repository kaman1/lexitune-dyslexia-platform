import type React from "react"
import { Github } from "lucide-react"
import Link from "next/link"

interface GitHubButtonProps {
  href: string
  variant?: "light" | "dark"
  className?: string
  children: React.ReactNode
}

export function GitHubButton({ href, variant = "dark", className = "", children }: GitHubButtonProps) {
  if (variant === "light") {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center px-4 py-2 bg-white text-black hover:bg-zinc-100 transition-colors font-medium text-sm ${className}`}
      >
        <Github className="mr-2 h-4 w-4" />
        {children}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center px-4 py-2 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors font-medium text-sm ${className}`}
    >
      <Github className="mr-2 h-4 w-4" />
      {children}
    </Link>
  )
}
