"use client";

import { Watch, Glasses, Headphones, Brain } from "lucide-react";
import * as React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { CollaborationSheet } from "@/components/collaboration-sheet";

export function AISolution() {
  return (
    <section id="solution" className="pt-0 pb-0 bg-white relative overflow-hidden">
      {/* Full Width Vertical Split Section */}
      <div className="w-full">
        <div className="min-h-[50vh] flex flex-col lg:flex-row">
          {/* Left Side - Content with Yellow Background */}
          <div className="w-full lg:w-1/2 flex items-center justify-center px-6 md:px-12 lg:px-16 py-6 lg:py-0" style={{backgroundColor: '#F2C94C'}}>
            <div className="max-w-2xl space-y-6 md:space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white rounded-2xl" style={{backgroundColor: '#333B68'}}>
                  <Brain className="h-4 w-4" />
                  Our Solution
                </div>

                <h2 className="text-2xl md:text-3xl font-medium tracking-tight leading-tight" style={{color: '#333B68'}}>
                  Adaptive Pedagogy Engine™
                </h2>

                <p className="text-sm md:text-base text-zinc-700 leading-relaxed" style={{color: '#333B68'}}>
                  Our AI-powered platform dynamically adapts to each user's unique learning style, creating a personalized experience for individuals with Dyslexia that reduces cognitive load while maximizing engagement and critical thinking.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <CollaborationSheet />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Features with Animated Background */}
          <div className="w-full lg:w-1/2 relative overflow-hidden min-h-[60vh] lg:min-h-auto bg-gray-900">
            {/* Animated Background */}
            <BackgroundLines 
              className="hidden lg:block absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"
              svgOptions={{ duration: 10 }}
            >
              <div></div>
            </BackgroundLines>

            {/* Content */}
            <div className="relative z-20 h-full flex items-center justify-center px-6 md:px-12 lg:px-16 py-6">
              <div className="max-w-4xl space-y-6">
                {/* Features Header */}
                <div className="mb-6 md:mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-white rounded-full mb-3" style={{backgroundColor: '#333B68'}}>
                    <span>Platform Features</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Core Technologies</h3>
                </div>

                {/* Features Grid - 2 columns, responsive */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  <div className="relative pl-4 md:pl-6 py-4 md:py-5 bg-white hover:bg-gray-50 transition-all duration-300 rounded-r-xl shadow-sm hover:shadow-md" style={{borderLeft: '6px solid #F2C94C'}}>
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full" style={{backgroundColor: '#F2C94C', opacity: 0.3}}></div>
                    <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3" style={{color: '#333B68'}}>Adaptive Learning Engine</h4>
                    <p className="text-sm md:text-base leading-relaxed" style={{color: '#4A5568'}}>Software that ingests learning materials and adapts content delivery based on individual learning styles and pedagogical preferences</p>
                  </div>

                  <div className="relative pl-4 md:pl-6 py-4 md:py-5 bg-white hover:bg-gray-50 transition-all duration-300 rounded-r-xl shadow-sm hover:shadow-md" style={{borderLeft: '6px solid #8B83ED'}}>
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full" style={{backgroundColor: '#8B83ED', opacity: 0.3}}></div>
                    <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3" style={{color: '#333B68'}}>Multi-Sensory Feedback</h4>
                    <p className="text-sm md:text-base leading-relaxed" style={{color: '#4A5568'}}>Specialized tactile and sensory feedback systems designed to enhance focus and engagement</p>
                  </div>

                  <div className="relative pl-4 md:pl-6 py-4 md:py-5 bg-white hover:bg-gray-50 transition-all duration-300 rounded-r-xl shadow-sm hover:shadow-md" style={{borderLeft: '6px solid #6DBDEF'}}>
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full" style={{backgroundColor: '#6DBDEF', opacity: 0.3}}></div>
                    <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3" style={{color: '#333B68'}}>Gamification</h4>
                    <p className="text-sm md:text-base leading-relaxed" style={{color: '#4A5568'}}>Interactive gaming elements and rewards systems that boost user engagement and motivation</p>
                  </div>

                  <div className="relative pl-4 md:pl-6 py-4 md:py-5 bg-white hover:bg-gray-50 transition-all duration-300 rounded-r-xl shadow-sm hover:shadow-md" style={{borderLeft: '6px solid #69C4B4'}}>
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full" style={{backgroundColor: '#69C4B4', opacity: 0.3}}></div>
                    <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3" style={{color: '#333B68'}}>Agentic Experience (AX)</h4>
                    <p className="text-sm md:text-base leading-relaxed" style={{color: '#4A5568'}}>Beyond traditional UX, our AX framework creates autonomous, proactive learning experiences that anticipate and adapt to user needs in real-time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}