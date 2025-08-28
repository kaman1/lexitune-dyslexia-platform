"use client"

import { TopNavigation } from "@/components/top-navigation"
import { FooterWaitlist } from "@/components/footer-waitlist"
import { DefenseHero } from "@/components/defense/hero"
import { DefenseCapabilities } from "@/components/defense/capabilities"
import { DefensePastPerformance } from "@/components/defense/past-performance"
import { DefenseCurrentProjects } from "@/components/defense/current-projects"
import { DefenseCollaboration } from "@/components/defense/collaboration"

export default function DefensePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopNavigation />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <DefenseHero />

        {/* Capabilities Section */}
        <DefenseCapabilities />

        {/* Past Performance Section */}
        <DefensePastPerformance />

        {/* Current Projects Section */}
        <DefenseCurrentProjects />

        {/* Collaboration Section */}
        <DefenseCollaboration />
      </main>

      <FooterWaitlist />
    </div>
  )
}
