"use client"

import { TopNavigation } from "@/components/top-navigation"
import { FooterWaitlist } from "@/components/footer-waitlist"
import { TermsContent } from "@/components/legal/terms-content"

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopNavigation />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-zinc-900 text-white py-16 md:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-medium mb-6">Terms of Service</h1>
              <p className="text-zinc-300">Last Updated: February 26, 2025</p>
            </div>
          </div>
        </section>

        {/* Terms of Service Content */}
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <TermsContent />
            </div>
          </div>
        </section>
      </main>

      <FooterWaitlist />
    </div>
  )
}
