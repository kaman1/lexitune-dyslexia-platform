"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, Loader2 } from "lucide-react"

export function InvestorContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    investmentFocus: "",
    message: "",
  })
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    try {
      // In a real implementation, this would use the Resend API
      // const response = await fetch('/api/send', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // if (!response.ok) throw new Error('Failed to send message');
      setFormState("success")
    } catch (error) {
      setFormState("error")
      setErrorMessage("There was an error sending your message. Please try again.")
    }
  }

  if (formState === "success") {
    return (
      <div className="bg-white border border-zinc-200 p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="text-xl font-medium mb-2">Message Sent Successfully</h3>
        <p className="text-zinc-600 mb-6">
          Thank you for your interest in Tekimax. Our investor relations team will contact you shortly.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setFormData({
              name: "",
              email: "",
              company: "",
              investmentFocus: "",
              message: "",
            })
            setFormState("idle")
          }}
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-zinc-200 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Smith"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company/Firm *</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            placeholder="Acme Capital"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="investmentFocus">Investment Focus</Label>
          <select
            id="investmentFocus"
            name="investmentFocus"
            value={formData.investmentFocus}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select an option</option>
            <option value="Seed">Seed</option>
            <option value="Series A">Series A</option>
            <option value="Series B+">Series B+</option>
            <option value="Growth">Growth</option>
            <option value="Strategic">Strategic</option>
          </select>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Please share details about your investment interests and any specific questions you have."
          rows={5}
        />
      </div>

      {formState === "error" && <div className="text-red-500 mb-4 text-sm">{errorMessage}</div>}

      <div className="flex justify-end">
        <Button type="submit" disabled={formState === "submitting"} className="bg-black text-white hover:bg-zinc-800">
          {formState === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </div>

      <p className="text-xs text-zinc-500 mt-6">
        By submitting this form, you agree to our privacy policy and consent to being contacted by our investor
        relations team. We respect your privacy and will keep your information confidential.
      </p>
    </form>
  )
}
