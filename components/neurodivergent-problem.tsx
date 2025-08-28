"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { 
  AlertTriangle, 
  Brain, 
  Users, 
  TrendingDown
} from "lucide-react";

export const NeurodivergentProblem: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-zinc-50 to-white -mb-28">
      {/* Logo Stamp Background */}
      <div className="absolute top-0 right-16 opacity-5 z-0">
        <Image
          src="/tekimax-logomark-black.png"
          alt=""
          width={900}
          height={900}
          className="object-contain"
        />
      </div>
      
      <div className="container px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-800 font-medium mb-6 rounded-xl">
              <AlertTriangle className="h-5 w-5" />
              The Opportunity
            </div>
            <h2 className="text-3xl font-medium mb-8 tracking-tight" style={{color: '#333B68'}}>
              The Dyslexia Opportunity
            </h2>
            <p className="text-zinc-500 mx-auto mb-12 max-w-2xl">
              People with Dyslexia have unique cognitive strengths. By providing the right tools and support, we can help them unlock their full potential.
            </p>
          </div>

          {/* Problem Stats Grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            <div className="bg-white p-8 shadow-lg border-l-4 border-red-500 rounded-r-xl">
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="h-8 w-8 text-red-500" />
                <h3 className="text-lg font-bold text-zinc-800">Low Graduation</h3>
              </div>
              <div className="text-3xl font-bold text-red-600 mb-2">49.5%</div>
              <p className="text-sm text-zinc-600 mb-3">Six-year graduation rate for students with disabilities vs 68% average</p>
              <p className="text-xs text-zinc-500">
                Source: <a href="https://www.bestcolleges.com/research/students-with-disabilities-higher-education-statistics/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">Students with Disabilities Higher Education Statistics (2024)</a>
              </p>
            </div>

            <div className="bg-white p-8 shadow-lg border-l-4 border-orange-500 rounded-r-xl">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-orange-500" />
                <h3 className="text-lg font-bold text-zinc-800">Underemployment</h3>
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">85%</div>
              <p className="text-sm text-zinc-600 mb-3">Unemployment/underemployment rate for college-educated autistic adults</p>
              <p className="text-xs text-zinc-500">
                Source: <a href="https://mydisabilityjobs.com/statistics/autism-employment/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">Autism Employment Statistics (2024)</a>
              </p>
            </div>

            <div className="bg-white p-8 shadow-lg border-l-4 border-yellow-500 rounded-r-xl">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="h-8 w-8 text-yellow-600" />
                <h3 className="text-lg font-bold text-zinc-800">STEM Growth</h3>
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">8.0%</div>
              <p className="text-sm text-zinc-600 mb-3">STEM job growth rate vs 3.7% average, 500K+ new computing jobs projected</p>
              <p className="text-xs text-zinc-500">
                Source: <a href="https://www.bls.gov/emp/tables/stem-employment.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">Bureau of Labor Statistics Employment Projections</a>
              </p>
            </div>

            <div className="bg-white p-8 shadow-lg border-l-4 border-red-600 rounded-r-xl">
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="h-8 w-8 text-red-600" />
                <h3 className="text-lg font-bold text-zinc-800">Economic Impact</h3>
              </div>
              <div className="text-3xl font-bold text-red-600 mb-2">$461B</div>
              <p className="text-sm text-zinc-600 mb-3">Projected autism economic burden by 2025, with $1B from underemployment</p>
              <p className="text-xs text-zinc-500">
                Source: <a href="https://www.hks.harvard.edu/publications/economic-burden-childhood-autism-spectrum-disorders" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">Harvard Kennedy School Research</a>
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};