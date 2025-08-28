"use client";

import Image from "next/image";
import { Brain, Cpu, Users, AlertCircle } from "lucide-react";

export function MicrosoftPartnership() {
  return (
    <section className="relative py-16 bg-white/10">
      
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 font-medium text-sm rounded-xl">
                <Cpu className="h-4 w-4" />
                Current Development Focus
              </div>
              
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight" style={{color: '#333B68'}}>
                We Are Starting with NeuroSteam
              </h2>
              
              <p className="text-zinc-600 leading-relaxed">
                NeuroSteam is our ADHD-focused solution combining haptic feedback, adaptive learning, and engagement improvement for ADHD learners. Our platform features real-time sentiment analysis with teacher notifications for student intervention.
              </p>

              {/* Key Features */}
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4 py-2 bg-white hover:bg-zinc-50 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium text-zinc-800">Haptic & Sensory Integration</h4>
                  </div>
                  <p className="text-sm text-zinc-600">Hardware peripheral integration for tactile learning experiences</p>
                </div>
                
                <div className="border-l-4 border-green-600 pl-4 py-2 bg-white hover:bg-zinc-50 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium text-zinc-800">Adaptive Learning & Engagement</h4>
                  </div>
                  <p className="text-sm text-zinc-600">Personalized learning paths that adapt to ADHD cognitive patterns</p>
                </div>
                
                <div className="border-l-4 border-orange-600 pl-4 py-2 bg-white hover:bg-zinc-50 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <h4 className="font-medium text-zinc-800">Sentiment Analysis & Teacher Alerts</h4>
                  </div>
                  <p className="text-sm text-zinc-600">Real-time detection of student frustration with actionable intervention guidance</p>
                </div>
              </div>

            </div>

            {/* Right Side - Microsoft Partnership */}
            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <div className="text-center">
                <div className="relative w-full h-48 rounded-lg overflow-hidden mb-8">
                  <Image
                    src="/m+t.png"
                    alt="Tekimax Microsoft for Startups Partnership"
                    fill
                    className="object-contain rounded-lg hover:scale-105 transition-transform duration-300 ease-out"
                    priority
                  />
                </div>
                
                <h3 className="text-xl font-medium mb-4" style={{color: '#333B68'}}>
                  Microsoft for Startups Founders Hub Partner
                </h3>
                
                <p className="text-zinc-600 text-sm leading-relaxed">
                  We're proud to be part of the Microsoft for Startups Founders Hub program, where Microsoft provides comprehensive startup support, Azure credits, and advanced AI tools to help us build the first neurodivergent-specific adaptive learning platform powered by cutting-edge AI technology.
                </p>
              </div>

              {/* Partnership Benefits */}
              <div className="space-y-3 text-sm mt-6">
                <div className="flex items-center gap-2 text-zinc-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Access to OpenAI and advanced AI services</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Enterprise-grade cloud infrastructure and security</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Technical mentorship and startup acceleration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}