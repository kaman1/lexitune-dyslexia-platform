"use client";

import React from "react";

export function FutureEducationSection() {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-8 tracking-tight text-gray-900">
            The Future of Neurodivergent Support
          </h2>
          <p className="text-lg text-zinc-600 mx-auto max-w-3xl leading-relaxed">
            AI doesn't replace human support—it amplifies it. Our adaptive approach preserves the human-centered, individualized spirit while providing personalized strategies and 24/7 accessibility for neurodivergent individuals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300 ease-out">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Adaptive Learning Systems
            </h3>
            <p className="text-zinc-600">
              AI generates personalized learning experiences tailored to each individual's unique cognitive profile, learning style, and support needs, maintaining human-centered fidelity.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300 ease-out">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Multisensory Support
            </h3>
            <p className="text-zinc-600">
              Technology adapts to different sensory preferences, providing visual, auditory, and kinesthetic support options that work with individual needs rather than against them.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300 ease-out">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Data-Driven Personalization
            </h3>
            <p className="text-zinc-600">
              AI tracks progress across multiple domains, identifying patterns and helping create personalized support strategies that evolve with individual growth and changing needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 