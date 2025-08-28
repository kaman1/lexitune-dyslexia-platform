"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainNavigationMenu } from "@/components/main-navigation-menu";

export default function NeurodivergentMindsAIGovernance() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/tekimax-logo-darkRGB-1.png"
                alt="Tekimax"
                width={120}
                height={30}
                className="object-contain"
              />
            </Link>
            <MainNavigationMenu />
          </div>
        </div>
      </header>

      <div className="container px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Button asChild className="bg-black text-white hover:bg-zinc-800 rounded-xl">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Hero Image */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8 relative">
            <Image
              src="https://plus.unsplash.com/premium_photo-1694822449585-a2444c288b96?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Diverse team collaboration in AI governance and technology"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-medium mb-6 tracking-tight">
              How Neurodivergent Minds Can Humanize AI Governance
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>August 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>6 min read</span>
              </div>
            </div>

            <p className="text-lg text-zinc-600 leading-relaxed">
              As global institutions race to set standards for AI, there is a narrow window to make inclusion the default rather than an afterthought. Research shows that neurodivergent individuals could be AI's most important architects, yet their voices are often excluded from policy discussions.
            </p>
          </header>

          {/* Article Content */}
          <article className="prose prose-zinc max-w-none">
            <h2 className="text-2xl font-medium mb-4 tracking-tight">The Current State of AI Governance</h2>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              The World Economic Forum emphasizes that as global institutions work to establish AI standards, there exists a critical opportunity to build inclusion into the foundation rather than treating it as an afterthought. The organization's research indicates that the future of equitable, ethical, and innovative technology cannot be realized without incorporating neurodivergent perspectives.
            </p>

            <p className="text-zinc-700 mb-8 leading-relaxed">
              Currently, most AI frameworks reflect neurotypical assumptions, systematically excluding the very individuals who could help break through conventional thinking patterns. This exclusion occurs because neurodivergent needs are often perceived as too complex or niche for mainstream policy consideration.
            </p>

            <h2 className="text-2xl font-medium mb-4 tracking-tight">Research Findings on Neurodivergent Contributions</h2>
            
            <div className="bg-zinc-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium mb-3">Productivity and Innovation Impact</h3>
              <p className="text-zinc-700 mb-4">
                According to a 2022 Deloitte report cited by the World Economic Forum, teams with neurodivergent members demonstrate 30% higher productivity in innovation-focused roles compared to neurotypical teams.
              </p>
              
              <h3 className="text-lg font-medium mb-3">Beyond User Status</h3>
              <p className="text-zinc-700 mb-4">
                The research indicates that neurodivergent individuals with autism, ADHD, dyslexia, and other cognitive differences are not merely users of AI technology - they could serve as its most vital architects and designers.
              </p>

              <h3 className="text-lg font-medium mb-3">Design Impact on Effectiveness</h3>
              <p className="text-zinc-700">
                Studies show that AI systems and marketing approaches that overlook cognitive diversity are measurably less effective and less innovative than those designed with neurodivergent perspectives in mind.
              </p>
            </div>

            <h2 className="text-2xl font-medium mb-4 tracking-tight">Corporate Success Stories</h2>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              The World Economic Forum highlights examples from companies like SAP and Microsoft, which demonstrate that when neurodivergent voices are empowered in AI development processes, the resulting technology becomes more creative, just, and fundamentally human-centered.
            </p>

            <p className="text-zinc-700 mb-8 leading-relaxed">
              These organizations show that designing for the full spectrum of human thinking benefits everyone, not just neurodivergent users. This approach leads to more robust, inclusive, and innovative AI solutions that better serve diverse populations.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium mb-3">Key Research Insight</h3>
              <p className="text-zinc-700">
                "When we design for the full spectrum of human thinking, everyone benefits. Neurodivergent individuals could be AI's most vital architects, yet most AI frameworks reflect neurotypical assumptions, excluding the very people who could help them break through the noise."
              </p>
            </div>

            <h2 className="text-2xl font-medium mb-4 tracking-tight">Policy Implications and Recommendations</h2>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              The World Economic Forum's analysis suggests that current policy frameworks systematically exclude neurodivergent perspectives by categorizing their needs as too complex or specialized. This approach represents a missed opportunity for more effective AI governance.
            </p>

            <p className="text-zinc-700 mb-8 leading-relaxed">
              The research calls for a fundamental shift in how AI governance approaches inclusion - moving from afterthought accommodation to foundational design principles that incorporate diverse cognitive styles from the beginning of policy development.
            </p>

            <h2 className="text-2xl font-medium mb-4 tracking-tight">The AI Governance Alliance Context</h2>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              This research forms part of the World Economic Forum's broader AI Governance Alliance initiatives, which convene leading voices from industry, government, academia, and civil society. The Alliance advocates for transparent, accountable AI systems aligned with human and societal values.
            </p>

            <p className="text-zinc-700 mb-8 leading-relaxed">
              The inclusion of neurodivergent perspectives in this framework represents a critical component of creating AI governance that truly serves all populations rather than defaulting to neurotypical assumptions about how humans interact with technology.
            </p>

            <div className="border-l-4 border-green-600 pl-6 py-4 mb-8 bg-green-50">
              <p className="text-zinc-700 font-medium">
                The research demonstrates that including neurodivergent minds in AI governance isn't just about fairness - it's about building more effective, innovative, and human-centered artificial intelligence systems that benefit everyone.
              </p>
            </div>

            <h2 className="text-2xl font-medium mb-4 tracking-tight">Future Directions</h2>
            <p className="text-zinc-700 mb-12 leading-relaxed">
              The World Economic Forum's findings suggest that the window for building inclusive AI governance is narrow but significant. Organizations and policymakers have the opportunity now to establish frameworks that harness the unique cognitive strengths of neurodivergent individuals, creating AI systems that are more creative, ethical, and effective for all users.
            </p>

            {/* References Section */}
            <div className="border-t border-zinc-200 pt-12 mt-16">
              <h2 className="text-xl font-medium mb-6 tracking-tight">References & Further Reading</h2>
              
              <div className="space-y-4">
                <div className="bg-zinc-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Primary Source</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a 
                        href="https://www.weforum.org/stories/2025/07/how-neurodivergent-minds-can-humanize-ai-governance/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        How neurodivergent minds can help humanize AI governance - World Economic Forum
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="bg-zinc-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Supporting Research</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <span className="text-zinc-700">
                        Deloitte (2022). Neurodivergent productivity and innovation in teams research report
                      </span>
                    </li>
                    <li>
                      <span className="text-zinc-700">
                        SAP and Microsoft corporate inclusion case studies referenced in WEF analysis
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-zinc-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Related WEF Initiatives</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a 
                        href="https://initiatives.weforum.org/ai-governance-alliance/home"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        AI Governance Alliance - Design of transparent and inclusive AI systems
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://initiatives.weforum.org/ai-governance-alliance/the-frontier-minds"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        AI Governance Alliance - MINDS Program
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}