"use client";

import { TopNavigation } from "@/components/top-navigation";
import { SplitHero } from "@/components/split-hero";
import { FutureEducationSection } from "@/components/future-education-section";
import { NeurodivergentCards } from "@/components/neurodivergent-cards";
import { OrtonGillinghamSection } from "@/components/orton-gillingham-section";
import { ComingSoonSection } from "@/components/coming-soon-section";
import { FooterWaitlist } from "@/components/footer-waitlist";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopNavigation />
      <main className="flex-grow">
        <SplitHero />
        <div id="ai-support">
          <OrtonGillinghamSection />
        </div>
        <div id="research-methods">
          <FutureEducationSection />
        </div>
        <div id="cognitive-strengths">
          <NeurodivergentCards />
        </div>
        <div id="coming-soon">
          <ComingSoonSection />
        </div>
      </main>
      <FooterWaitlist />
    </div>
  );
}
