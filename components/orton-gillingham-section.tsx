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
              src="https://images.unsplash.com/photo-1724245047328-431c55de6cb7?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="AI-powered neurodivergent support platform"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                AI-Powered Neurodivergent Support
              </h2>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                Comprehensive suite of tools and apps designed to empower your unique learning journey.
              </p>
            </div>
          </div>

          {/* Content with Text on Left, Cards on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Text */}
            <div>
              <h2 className="text-3xl font-medium mb-6 tracking-tight" style={{color: '#333B68'}}>
                Your Comprehensive Neurodivergent Support Platform
              </h2>
              <p className="text-zinc-600 mb-6 leading-relaxed">
                Our AI platform provides personalized tools and apps designed specifically for neurodivergent individuals, featuring research-backed approaches and adaptive technology.
              </p>
              <p className="text-zinc-600 mb-8 leading-relaxed">
                From reading support and time management to cognitive load optimization and accessibility controls, every feature is crafted to enhance your learning experience and support your unique cognitive profile.
              </p>
            </div>

            {/* Right Column - Feature Cards in Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold mb-3" style={{color: '#333B68'}}>
                  AI Reading Tutor
                </h4>
                <p className="text-zinc-600 text-sm">
                  Personalized Orton-Gillingham instruction with AI-generated decodable texts and multisensory learning approaches.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Mic className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold mb-3" style={{color: '#333B68'}}>
                  Pomodoro Timer
                </h4>
                <p className="text-zinc-600 text-sm">
                  Built-in focus timer with customizable work/break intervals to maintain concentration and prevent cognitive overload.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold mb-3" style={{color: '#333B68'}}>
                  Task Management
                </h4>
                <p className="text-zinc-600 text-sm">
                  Intelligent task organization with priority setting, progress tracking, and adaptive reminders for learning goals.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold mb-3" style={{color: '#333B68'}}>
                  Cognitive Load Management
                </h4>
                <p className="text-zinc-600 text-sm">
                  AI-powered system that monitors cognitive fatigue and adapts content complexity for optimal learning conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
