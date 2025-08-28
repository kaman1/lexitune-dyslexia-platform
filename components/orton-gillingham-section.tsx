"use client";

import * as React from "react";
import Image from "next/image";
import { Check, Users, Mic, BarChart3, Clock } from "lucide-react";

export function OrtonGillinghamSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-gray-50">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-16">
            <Image
              src="https://images.unsplash.com/photo-1650844228078-6c3cb119abcd?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="AI-augmented Orton-Gillingham reading instruction"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                AI-Augmented Orton-Gillingham
              </h2>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                The future of reading instruction, combining proven methodology with AI-powered personalization.
              </p>
            </div>
          </div>

          {/* Content with Text on Left, Cards on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Text */}
            <div>
              <h2 className="text-3xl font-medium mb-6 tracking-tight" style={{color: '#333B68'}}>
                AI-Augmented Orton-Gillingham: The Future of Reading Instruction
              </h2>
              <p className="text-zinc-600 mb-6 leading-relaxed">
                Orton-Gillingham is the gold standard for structured, multisensory reading instruction. Our AI doesn't replace trained educators—it amplifies their reach and resources while preserving the human-centered, individualized spirit of the approach.
              </p>
              <p className="text-zinc-600 mb-8 leading-relaxed">
                We use Large Language Models and AI voice technology to augment traditional OG methods, providing personalized practice, dynamic lesson planning, and 24/7 accessibility without diluting the proven methodology.
              </p>
            </div>

            {/* Right Column - Cards in Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold mb-3" style={{color: '#333B68'}}>
                  Personalized Practice Generation
                </h4>
                <p className="text-zinc-600 text-sm">
                  LLMs dynamically generate decodable texts, word lists, and phonemic awareness drills tailored to each student's current scope and sequence.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Mic className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold mb-3" style={{color: '#333B68'}}>
                  AI Voice for Multisensory Engagement
                </h4>
                <p className="text-zinc-600 text-sm">
                  AI voice technology reinforces the auditory aspect of OG's multisensory approach with precision and patience.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold mb-3" style={{color: '#333B68'}}>
                  Data-Driven Insight & Precision Review
                </h4>
                <p className="text-zinc-600 text-sm">
                  AI tools track progress across hundreds of micro-skills, providing educators with precise intervention guidance.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold mb-3" style={{color: '#333B68'}}>
                  24/7 At-Home OG Support
                </h4>
                <p className="text-zinc-600 text-sm">
                  LLM-powered apps bring OG-like instruction into homes, maintaining consistency and engagement outside traditional hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
