"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import ReCaptchaV3 from "@/components/recaptcha-v3";

type InquiryType =
  | "general"
  | "product"
  | "customer_discovery"
  | "ai_implementation"
  | "partnership"
  | "investment"
  | "support"
  | "local_government";

export function ContactForm({ inquiryType }: { inquiryType?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: inquiryType || ("" as InquiryType),
    message: "",
  });
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    try {
      // Get reCAPTCHA token
      let recaptchaToken = null;
      
      if (typeof window !== 'undefined' && (window as any).executeRecaptcha) {
        recaptchaToken = await (window as any).executeRecaptcha();
        
        if (!recaptchaToken) {
          throw new Error('reCAPTCHA verification failed. Please refresh and try again.');
        }
      }

      const response = await fetch('/api/submit-form-kv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        })
      });

      if (!response.ok) throw new Error('Failed to send message');
      setFormState("success");
    } catch (error) {
      setFormState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "There was an error sending your message. Please try again."
      );
    }
  };

  if (formState === "success") {
    return (
      <div className="bg-white border border-zinc-200 p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="text-xl font-medium mb-2">Message Sent Successfully</h3>
        <p className="text-zinc-600 mb-6">
          Thank you for contacting Tekimax. Our team will review your inquiry
          and get back to you shortly.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setFormData({
              name: "",
              email: "",
              company: "",
              inquiryType: "" as InquiryType,
              message: "",
            });
            setFormState("idle");
          }}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-zinc-200 p-8"
    >
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
          <Label htmlFor="company">Company/Organization</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Acme Inc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="inquiryType">Inquiry Type *</Label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select an option</option>
            <option value="general">General Inquiry</option>
            <option value="product">Product Information</option>
            <option value="customer_discovery">
              Customer Discovery Services
            </option>
            <option value="ai_implementation">AI Implementation</option>
            <option value="partnership">Partnership Opportunities</option>
            <option value="investment">Investment Information</option>
            <option value="local_government">Local Government Solutions</option>
            <option value="support">Technical Support</option>
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
          placeholder="Please provide details about your inquiry..."
          rows={5}
        />
      </div>

      {formState === "error" && (
        <div className="text-red-500 mb-4 text-sm">{errorMessage}</div>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={formState === "submitting"}
          className="bg-black text-white hover:bg-zinc-800"
        >
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
        By submitting this form, you agree to our{" "}
        <Link href="/privacy" className="underline hover:text-black">
          privacy policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="underline hover:text-black">
          terms of service
        </Link>
        . We'll use your information to respond to your inquiry and may contact
        you about our products or services. You may unsubscribe from these
        communications at any time.
      </p>

      {/* reCAPTCHA v3 - Invisible */}
      <ReCaptchaV3
        siteKey="6LeBEZkrAAAAAKqGBPNay2qveeQp2KDWo9u8Ay-0"
        onVerify={(token) => setRecaptchaToken(token)}
        onError={() => console.error('reCAPTCHA failed')}
        action="contact_submit"
      />
    </form>
  );
}
