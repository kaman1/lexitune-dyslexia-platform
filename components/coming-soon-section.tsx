"use client";

import React from "react";
import Image from "next/image";
import { Smartphone, Watch, Headphones, Zap, ArrowRight } from "lucide-react";

export function ComingSoonSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-900">
            Mobile & Wearable Experience
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Take your neurodivergent support everywhere with our upcoming mobile app, smartwatch integration, and peripheral devices.
          </p>
        </div>

        {/* Coming Soon Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Mobile App */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Smartphone className="h-6 w-6 text-blue-600" />
            </div>
            
            <div className="mb-4">
              <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full mb-3">
                Q2 2024
              </span>
              <h3 className="text-xl font-semibold text-zinc-900 mb-3">Mobile App</h3>
            </div>
            
            <p className="text-zinc-600 text-sm mb-4 leading-relaxed">
              Full-featured mobile experience with AI reading tutor, Pomodoro timer, task management, and cognitive load monitoring.
            </p>
            
            <ul className="space-y-2 text-sm text-zinc-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Offline learning capabilities</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Voice-activated features</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Cross-device sync</span>
              </li>
            </ul>
          </div>

          {/* Smartwatch */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Watch className="h-6 w-6 text-purple-600" />
            </div>
            
            <div className="mb-4">
              <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-1 rounded-full mb-3">
                Q3 2024
              </span>
              <h3 className="text-xl font-semibold text-zinc-900 mb-3">Smartwatch App</h3>
            </div>
            
            <p className="text-zinc-600 text-sm mb-4 leading-relaxed">
              Wearable support with quick Pomodoro sessions, focus reminders, and cognitive load alerts.
            </p>
            
            <ul className="space-y-2 text-sm text-zinc-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                <span>Haptic focus reminders</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                <span>Quick timer controls</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                <span>Stress level monitoring</span>
              </li>
            </ul>
          </div>

          {/* Peripherals */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Headphones className="h-6 w-6 text-green-600" />
            </div>
            
            <div className="mb-4">
              <span className="inline-block bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full mb-3">
                Q4 2024
              </span>
              <h3 className="text-xl font-semibold text-zinc-900 mb-3">Smart Peripherals</h3>
            </div>
            
            <p className="text-zinc-600 text-sm mb-4 leading-relaxed">
              AI-powered headphones, focus lamps, and sensory tools for optimal learning environments.
            </p>
            
            <ul className="space-y-2 text-sm text-zinc-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>Noise-canceling AI</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>Adaptive lighting</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>Biometric feedback</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-zinc-50 border border-zinc-200 rounded-xl px-8 py-6">
            <div className="text-left">
              <p className="text-lg font-semibold text-zinc-900 mb-1">Be First to Experience</p>
              <p className="text-sm text-zinc-600">Join the waitlist for early access</p>
            </div>
            <button className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-xl font-semibold">
              Join Waitlist
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
