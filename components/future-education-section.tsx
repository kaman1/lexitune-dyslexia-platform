"use client";

import React from "react";

export function FutureEducationSection() {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-8 tracking-tight text-gray-900">
            Research-Backed Neurodivergent Support
          </h2>
          <p className="text-lg text-zinc-600 mx-auto max-w-3xl leading-relaxed">
            Our AI amplifies proven techniques: Orton-Gillingham reading instruction, Pomodoro time management, and evidence-based cognitive strategies. We don't replace human support—we enhance what research shows works.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300 ease-out">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Evidence-Based Learning Systems
            </h3>
            <p className="text-zinc-600">
              AI-powered Orton-Gillingham instruction with proven grade level improvements in reading fluency. Multisensory approaches backed by research showing better retention through cognitive load optimization.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300 ease-out">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Proven Time Management
            </h3>
            <p className="text-zinc-600">
              Pomodoro technique integration with 25-minute focused blocks proven to improve attention span and reduce cognitive fatigue in ADHD. Structured time management enhances executive function.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300 ease-out">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Research-Validated Personalization
            </h3>
            <p className="text-zinc-600">
              AI tracks progress across multiple domains using evidence from research studies. Personalized support strategies evolve with individual growth and changing needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 