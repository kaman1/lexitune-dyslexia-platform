"use client";

import * as React from "react";
import Image from "next/image";
import { Check, Users, Mic, BarChart3, Clock, Zap } from "lucide-react";

export function AIAugmentationSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-gray-50">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              <span>AI Augmentation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{color: '#333B68'}}>
              How AI Enhances Reading Instruction
            </h2>
            <p className="text-lg text-zinc-600 max-w-3xl mx-auto leading-relaxed">
              AI doesn't replace trained educators—it enhances their reach and resources while preserving the human-centered, individualized spirit of Orton-Gillingham instruction.
            </p>
          </div>

          {/* Augmentation Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Personalized Practice */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{color: '#333B68'}}>
                Personalized Practice Generation
              </h3>
              <p className="text-zinc-600 mb-4">
                LLMs dynamically generate decodable texts, word lists, and phonemic awareness drills tailored to each student's current scope and sequence.
              </p>
              <ul className="text-sm text-zinc-500 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Maintains OG fidelity</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Adapts to individual progress</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Structured lesson planning aid</span>
                </li>
              </ul>
            </div>

            {/* AI Voice */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Mic className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{color: '#333B68'}}>
                AI Voice for Multisensory Engagement
              </h3>
              <p className="text-zinc-600 mb-4">
                AI voice technology reinforces the auditory aspect of OG's multisensory approach with precision and patience.
              </p>
              <ul className="text-sm text-zinc-500 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Accurate phoneme modeling</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Immediate pronunciation feedback</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Endless repetition without frustration</span>
                </li>
              </ul>
            </div>

            {/* Data-Driven Insights */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{color: '#333B68'}}>
                Data-Driven Insight & Precision Review
              </h3>
              <p className="text-zinc-600 mb-4">
                AI tools track progress across hundreds of micro-skills, providing educators with precise intervention guidance.
              </p>
              <ul className="text-sm text-zinc-500 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Trend analysis across skills</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Identifies reteaching needs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Personalized intervention guidance</span>
                </li>
              </ul>
            </div>

            {/* 24/7 Accessibility */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{color: '#333B68'}}>
                24/7 At-Home OG Support
              </h3>
              <p className="text-zinc-600 mb-4">
                LLM-powered apps bring OG-like instruction into homes, maintaining consistency and engagement outside traditional hours.
              </p>
              <ul className="text-sm text-zinc-500 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Conversational AI drills</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Gamified reinforcement</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Consistent practice access</span>
                </li>
              </ul>
            </div>

            {/* Lesson Planning Aid */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{color: '#333B68'}}>
                Enhanced Lesson Planning
              </h3>
              <p className="text-zinc-600 mb-4">
                Educators can use LLMs to quickly build structured lesson plans following OG principles, saving time while maintaining quality.
              </p>
              <ul className="text-sm text-zinc-500 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Rapid lesson plan generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>OG principle adherence</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Time-saving for educators</span>
                </li>
              </ul>
            </div>

            {/* Human-Centered Approach */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4" style={{color: '#333B68'}}>
                Human-Centered Augmentation
              </h3>
              <p className="text-zinc-600 mb-4">
                AI amplifies educator capabilities while preserving the essential human connection and individualized attention that makes OG effective.
              </p>
              <ul className="text-sm text-zinc-500 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Preserves human connection</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Amplifies educator reach</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Maintains individualized attention</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
