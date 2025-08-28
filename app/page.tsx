"use client";

import { SplitHero } from "@/components/split-hero";
import { FutureEducationSection } from "@/components/future-education-section";
import { NeurodivergentCards } from "@/components/neurodivergent-cards";
import { OrtonGillinghamSection } from "@/components/orton-gillingham-section";
import { DyslexiaMythsSection } from "@/components/dyslexia-myths-section";
import { NeurodiversitySupportSection } from "@/components/neurodiversity-support-section";
import { InteractiveFooter } from "@/components/interactive-footer";

export default function Home() {
  return (
    <main>
      <SplitHero />
      <FutureEducationSection />
      <NeurodivergentCards />
      <OrtonGillinghamSection />
      <DyslexiaMythsSection />
      <NeurodiversitySupportSection />
      <InteractiveFooter />
    </main>
  );
}
