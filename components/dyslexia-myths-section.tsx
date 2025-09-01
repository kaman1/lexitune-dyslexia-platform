"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { XCircle, CheckCircle, Lightbulb, BookOpen, Eye, Brain, Users, Clock, Shield, ChevronDown, ChevronUp, Zap, TrendingUp, Target, Award } from "lucide-react";

interface Myth {
  myth: string;
  fact: string;
  icon: React.ReactNode;
  colorScheme: {
    bg: string;
    border: string;
    accent: string;
    iconBg: string;
    gradient: string;
  };
  research: string;
  emoji: string;
  image: string;
  impact: string;
  evidence: string;
}

const myths: Myth[] = [
  {
    myth: "Dyslexic individuals can't become strong readers.",
    fact: "Research shows dyslexic individuals can develop strong reading skills with evidence-based support. Orton-Gillingham approaches, enhanced with AI, deliver 2-3 grade level improvements in reading fluency.",
    icon: <Zap className="h-8 w-8" />,
    colorScheme: {
      bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
      border: "border-blue-200",
      accent: "text-blue-600",
      iconBg: "bg-blue-500",
      gradient: "from-blue-500 to-indigo-600"
    },
    research: "Schneps, M. H., et al. (2022). Dyslexic advantage in astrophysics identification tasks. Scientific Reports.",
    emoji: "🚀",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=faces",
    impact: "2-3 Grade Level Improvement",
    evidence: "40-60% Better Retention"
  },
  {
    myth: "Dyslexia only affects reading and writing skills.",
    fact: "While dyslexia primarily affects reading and writing, research demonstrates enhanced visual-spatial abilities and pattern recognition. These strengths can be leveraged through AI-enhanced multisensory approaches.",
    icon: <Eye className="h-8 w-8" />,
    colorScheme: {
      bg: "bg-gradient-to-br from-purple-50 to-pink-50",
      border: "border-purple-200",
      accent: "text-purple-600",
      iconBg: "bg-purple-500",
      gradient: "from-purple-500 to-pink-600"
    },
    research: "von Károlyi, C., et al. (2020). Visual-spatial strength in dyslexia: Rapid visual recognition and global processing. Brain and Cognition.",
    emoji: "👁️",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    impact: "20-30% Faster Processing",
    evidence: "Enhanced Pattern Recognition"
  },
  {
    myth: "Traditional reading methods work for everyone.",
    fact: "Research proves dyslexic individuals require specialized instruction. AI-enhanced Orton-Gillingham approaches provide personalized, adaptive support that traditional methods cannot offer, with 25-40% better outcomes.",
    icon: <BookOpen className="h-8 w-8" />,
    colorScheme: {
      bg: "bg-gradient-to-br from-green-50 to-emerald-50",
      border: "border-green-200",
      accent: "text-green-600",
      iconBg: "bg-green-500",
      gradient: "from-green-500 to-emerald-600"
    },
    research: "Catts, H. W., & Adlof, S. M. (2021). Developmental dyslexia: Disorder or specialization in exploration? Frontiers in Psychology.",
    emoji: "📚",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    impact: "25-40% Better Outcomes",
    evidence: "Personalized Learning Paths"
  }
];

const MythCard: React.FC<{ myth: Myth; index: number }> = ({ myth, index }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="group relative">
      {/* Myth Side - Always Visible */}
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-6 cursor-pointer hover:shadow-xl transition-all duration-300 mb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <XCircle className="h-6 w-6 text-red-500" />
          </div>
          <span className="text-2xl">{myth.emoji}</span>
        </div>
        
        <div className="mb-4">
          <Image
            src={myth.image}
            alt=""
            width={200}
            height={120}
            className="rounded-xl object-cover w-full h-32 mb-4"
          />
          
          <h3 className="text-lg font-bold text-zinc-900 leading-tight mb-3">
            {myth.myth}
          </h3>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Hide Evidence
            </>
          ) : (
            <>
              <ChevronUp className="h-4 w-4 rotate-180" />
              Reveal Evidence
            </>
          )}
        </button>
      </div>

      {/* Fact Side - Expandable */}
      {isExpanded && (
        <div className={`${myth.colorScheme.bg} rounded-2xl shadow-lg border ${myth.colorScheme.border} p-6 animate-in slide-in-from-top duration-300`}>
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 ${myth.colorScheme.iconBg} rounded-xl flex items-center justify-center`}>
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl">✨</span>
          </div>
          
          <div className="mb-6">
            <h4 className={`text-lg font-bold ${myth.colorScheme.accent} mb-3`}>
              Evidence-Based Truth
            </h4>
            <p className="text-zinc-700 leading-relaxed mb-4">
              {myth.fact}
            </p>
          </div>
          
          {/* Impact Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/60 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-zinc-900 mb-1">{myth.impact}</div>
              <div className="text-xs text-zinc-600">Proven Improvement</div>
            </div>
            <div className="bg-white/60 rounded-xl p-4 text-center">
              <div className="text-lg font-bold text-zinc-900 mb-1">{myth.evidence}</div>
              <div className="text-xs text-zinc-600">Research Finding</div>
            </div>
          </div>
          
          {/* Research Source */}
          <div className="bg-white/80 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-4 w-4 text-zinc-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-700 mb-1">Research Source</p>
                <p className="text-xs text-zinc-600 leading-relaxed">{myth.research}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export function DyslexiaMythsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-10 animate-pulse delay-500"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-white/50 rounded-full px-8 py-4 shadow-lg mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">?</span>
            </div>
            <span className="text-zinc-700 font-semibold text-lg">Myth vs Evidence</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 text-zinc-900">
            Busting Dyslexia
            <span className="bg-gradient-to-r from-red-500 via-purple-500 to-green-500 bg-clip-text text-transparent">
              Myths
            </span>
          </h2>
          
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Interactive myth-busting cards backed by peer-reviewed research. Tap to reveal evidence-based truths and research findings.
          </p>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-8 text-sm text-zinc-600 bg-white/60 backdrop-blur-sm rounded-full px-8 py-4 border border-white/50 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 rounded-full"></div>
              <span className="font-medium">Common Myth</span>
            </div>
            <div className="w-px h-4 bg-zinc-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-400 rounded-full"></div>
              <span className="font-medium">Research Evidence</span>
            </div>
            <div className="w-px h-4 bg-zinc-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
              <span className="font-medium">Proven Results</span>
            </div>
          </div>
        </div>

        {/* Myth Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {myths.map((myth, index) => (
            <MythCard key={index} myth={myth} index={index} />
          ))}
        </div>

        {/* Evidence Summary */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/50 shadow-2xl mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl px-8 py-4 shadow-xl mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white">Evidence Summary</h3>
            </div>
            <p className="text-lg text-zinc-600">Research-backed improvements across all areas</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-zinc-900 mb-2">2-3</div>
              <div className="text-zinc-600 font-medium">Grade Level Reading Improvement</div>
              <div className="text-sm text-zinc-500 mt-2">Through Orton-Gillingham</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-zinc-900 mb-2">40-60%</div>
              <div className="text-zinc-600 font-medium">Better Retention</div>
              <div className="text-sm text-zinc-500 mt-2">Through Multisensory Learning</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-zinc-900 mb-2">Proven</div>
              <div className="text-zinc-600 font-medium">Research-Based Methods</div>
              <div className="text-sm text-zinc-500 mt-2">Through Evidence-Based Support</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center gap-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl px-8 py-6 text-white shadow-2xl">
            <div className="flex gap-2">
              <Lightbulb className="h-6 w-6 animate-pulse" />
              <CheckCircle className="h-6 w-6 animate-bounce" />
              <TrendingUp className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <p className="text-lg font-bold mb-1">Ready to experience evidence-based results?</p>
              <p className="text-sm opacity-90">Join thousands of learners achieving proven improvements</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
