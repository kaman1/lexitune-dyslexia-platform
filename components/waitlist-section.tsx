"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function WaitlistSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this to your API
    console.log("Email submitted:", email)
    setSubmitted(true)
    setEmail("")
  }

  return (
    <section className="py-16 bg-black text-white">
      <div className="container px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-xl font-medium mb-6">Join the Waitlist</h2>
          <p className="text-sm text-zinc-400 mb-8">
            Be among the first to experience our data-driven decision platform when we launch.
          </p>

          {submitted ? (
            <div className="bg-zinc-900 p-6 border border-zinc-800">
              <p className="text-sm">Thank you for joining our waitlist. We'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-white"
              />
              <Button type="submit" className="bg-white text-black hover:bg-zinc-200">
                Join Waitlist
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
