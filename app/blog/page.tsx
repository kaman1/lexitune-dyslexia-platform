"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainNavigationMenu } from "@/components/main-navigation-menu";

export default function BlogIndex() {
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

      {/* Hero Header */}
      <div className="relative h-[40vh] min-h-[350px] mb-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/big-data.jpg"
            alt="Research and Innovation"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>
        
        {/* Hero Content */}
        <div className="relative h-full flex items-center">
          <div className="container px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-medium mb-6 tracking-tight text-white">
                Blog and News
              </h1>
              <p className="text-xl text-white/90">
                Insights on AI innovation, neurodivergent education, and human-machine collaboration
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Featured Research */}
          <div className="mb-12">
            <h2 className="text-2xl font-medium mb-8">Featured Research</h2>
            <Link 
              href="/blog/neurodivergent-minds-ai-governance"
              className="group block bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 hover:from-purple-100 hover:to-blue-100 transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="aspect-video rounded-xl overflow-hidden relative">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1694822449585-a2444c288b96?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Diverse team collaboration in AI governance and technology"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 text-sm text-zinc-500 mb-3">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">Research Analysis</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>August 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>6 min read</span>
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-medium mb-4 group-hover:text-purple-700 transition-colors">
                    How Neurodivergent Minds Can Humanize AI Governance
                  </h2>
                  <p className="text-zinc-600 mb-4 text-lg">
                    World Economic Forum research reveals that neurodivergent individuals could be AI's most vital architects, with teams showing 30% higher productivity in innovation-focused roles.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* All Articles */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium mb-8">All Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Research Article */}
              <Link 
                href="/blog/technology-neurodiversity-workplace-research"
                className="group block bg-zinc-50 rounded-2xl p-6 hover:bg-zinc-100 transition-all duration-300 hover:shadow-lg"
              >
                <div className="aspect-video rounded-xl overflow-hidden relative mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop"
                    alt="Technology and Neurodiversity Research"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">Research</span>
                    <Calendar className="h-3 w-3" />
                    <span>August 2025</span>
                    <span>•</span>
                    <Clock className="h-3 w-3" />
                    <span>7 min</span>
                  </div>
                  <h3 className="text-lg font-medium mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    Technology Aiding Neurodiverse Employees: Key Research Findings
                  </h3>
                  <p className="text-sm text-zinc-600 line-clamp-3">
                    Analyzing a comprehensive bibliometric study revealing how customizable technology transforms neurodivergent workplace experiences.
                  </p>
                </div>
              </Link>

              {/* AI Governance Article */}
              <Link 
                href="/blog/neurodivergent-minds-ai-governance"
                className="group block bg-zinc-50 rounded-2xl p-6 hover:bg-zinc-100 transition-all duration-300 hover:shadow-lg"
              >
                <div className="aspect-video rounded-xl overflow-hidden relative mb-4">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1694822449585-a2444c288b96?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Diverse team collaboration in AI governance and technology"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">Research</span>
                    <Calendar className="h-3 w-3" />
                    <span>August 2024</span>
                    <span>•</span>
                    <Clock className="h-3 w-3" />
                    <span>6 min</span>
                  </div>
                  <h3 className="text-lg font-medium mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                    How Neurodivergent Minds Can Humanize AI Governance
                  </h3>
                  <p className="text-sm text-zinc-600 line-clamp-3">
                    Research shows neurodivergent individuals could be AI's most important architects, with teams showing 30% higher productivity in innovation roles.
                  </p>
                </div>
              </Link>

              {/* OpenAI DevDay Post */}
              <Link 
                href="/blog/openai-devday-reflections"
                className="group block bg-zinc-50 rounded-2xl p-6 hover:bg-zinc-100 transition-all duration-300 hover:shadow-lg"
              >
                <div className="aspect-video rounded-xl overflow-hidden relative mb-4">
                  <Image
                    src="/hand-tracking-tekimax.jpg"
                    alt="Tekimax Hand Tracking Technology"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">Experience</span>
                    <Calendar className="h-3 w-3" />
                    <span>January 2024</span>
                    <span>•</span>
                    <Clock className="h-3 w-3" />
                    <span>8 min</span>
                  </div>
                  <h3 className="text-lg font-medium mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    Human-Machine Cognition Collaboration: Reflections from OpenAI's First Dev Day
                  </h3>
                  <p className="text-sm text-zinc-600 line-clamp-3">
                    Exploring human-machine cognition collaboration and agentic AI experiences that augment critical thinking.
                  </p>
                </div>
              </Link>

            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Button asChild className="bg-black text-white hover:bg-zinc-800 rounded-xl">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}