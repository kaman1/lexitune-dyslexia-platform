"use client";

import { SplitHero } from "@/components/split-hero";
import { FutureEducationSection } from "@/components/future-education-section";
import { NeurodivergentCards } from "@/components/neurodivergent-cards";
import { OrtonGillinghamSection } from "@/components/orton-gillingham-section";
import { DyslexiaMythsSection } from "@/components/dyslexia-myths-section";
import { NeurodiversitySupportSection } from "@/components/neurodiversity-support-section";

export default function Home() {
  return (
    <main>
      <SplitHero />
      <FutureEducationSection />
      <NeurodivergentCards />
      <OrtonGillinghamSection />
      <DyslexiaMythsSection />
      <NeurodiversitySupportSection />
    </main>
  );
}
