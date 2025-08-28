"use client"

import { TopNavigation } from "@/components/top-navigation"
import { FooterWaitlist } from "@/components/footer-waitlist"
import { PrivacyContent } from "@/components/legal/privacy-content"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopNavigation />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-zinc-900 text-white py-16 md:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-medium mb-6">Privacy Policy</h1>
              <p className="text-zinc-300">Last Updated: February 26, 2025</p>
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <PrivacyContent />
            </div>
          </div>
        </section>
      </main>

      <FooterWaitlist />
    </div>
  )
}
