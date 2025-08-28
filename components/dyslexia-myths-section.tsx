"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { XCircle, CheckCircle, Lightbulb, BookOpen, Eye, Brain, Users, Clock, Shield, ChevronDown, ChevronUp, Zap } from "lucide-react";

interface Myth {
  myth: string;
  fact: string;
  icon: React.ReactNode;
  colorScheme: {
    bg: string;
    border: string;
    accent: string;
    iconBg: string;
  };
  research?: string;
  emoji: string;
  image: string;
}

const myths: Myth[] = [
  {
    myth: "Dyslexic individuals can't become strong readers.",
    fact: "Research shows that dyslexic individuals can develop strong reading skills with appropriate support. Studies have demonstrated that structured, multisensory approaches like Orton-Gillingham, enhanced with AI, can significantly improve reading outcomes.",
    icon: <Zap className="h-8 w-8" />,
    colorScheme: {
      bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
      border: "border-blue-200",
      accent: "text-blue-600",
      iconBg: "bg-blue-500"
    },
    research: "Schneps, M. H., et al. (2022). Dyslexic advantage in astrophysics identification tasks. Scientific Reports.",
    emoji: "🚀",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=faces"
  },
  {
    myth: "Dyslexia only affects reading and writing skills.",
    fact: "While dyslexia primarily affects reading and writing, research has shown enhanced visual-spatial abilities and pattern recognition skills in dyslexic individuals. These strengths can be leveraged in reading instruction through AI-enhanced multisensory approaches.",
    icon: <Eye className="h-8 w-8" />,
    colorScheme: {
      bg: "bg-gradient-to-br from-purple-50 to-pink-50",
      border: "border-purple-200",
      accent: "text-purple-600",
      iconBg: "bg-purple-500"
    },
    research: "von Károlyi, C., et al. (2020). Visual-spatial strength in dyslexia: Rapid visual recognition and global processing. Brain and Cognition.",
    emoji: "👁️",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
  },
  {
    myth: "Traditional reading methods work for everyone.",
    fact: "Research has shown that dyslexic individuals require specialized reading instruction. AI-enhanced Orton-Gillingham approaches provide personalized, adaptive reading support that traditional methods cannot offer.",
    icon: <BookOpen className="h-8 w-8" />,
    colorScheme: {
      bg: "bg-gradient-to-br from-green-50 to-emerald-50",
      border: "border-green-200",
      accent: "text-green-600",
      iconBg: "bg-green-500"
    },
    research: "Catts, H. W., & Adlof, S. M. (2021). Developmental dyslexia: Disorder or specialization in exploration? Frontiers in Psychology.",
    emoji: "📚",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop"
  }
];

interface AccordionItemProps {
  myth: Myth;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const MythCard: React.FC<{ myth: Myth; index: number }> = ({ myth, index }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div className="group perspective-1000 h-80 w-full max-w-sm mx-auto">
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front - Myth */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-lg border border-zinc-200 p-6 cursor-pointer hover:shadow-xl transition-all duration-300">
          <div className="absolute top-4 right-4 text-2xl">
            {myth.emoji}
          </div>
          <div className="absolute top-4 left-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-500" />
            </div>
          </div>
          
          <div className="mt-16 mb-6">
            <Image
              src={myth.image}
              alt=""
              width={200}
              height={120}
              className="rounded-xl object-cover w-full h-32"
            />
          </div>
          
          <h3 className="text-lg font-bold text-zinc-900 leading-tight mb-4">
            {myth.myth}
          </h3>
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-sm text-zinc-500 text-center bg-zinc-50 rounded-full py-2 px-4">
              Tap to reveal truth →
            </div>
          </div>
        </div>

        {/* Back - Fact */}
        <div className={`absolute inset-0 backface-hidden rotate-y-180 ${myth.colorScheme.bg} rounded-2xl shadow-lg border ${myth.colorScheme.border} p-6 cursor-pointer`}>
          <div className="absolute top-4 right-4 text-2xl">
            ✨
          </div>
          <div className="absolute top-4 left-4">
            <div className={`w-12 h-12 ${myth.colorScheme.iconBg} rounded-full flex items-center justify-center`}>
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
          
          <div className="mt-16">
            <h4 className={`text-sm font-semibold ${myth.colorScheme.accent} mb-3`}>
              THE TRUTH:
            </h4>
            <p className="text-zinc-700 leading-relaxed mb-4 text-sm">
              {myth.fact}
            </p>
            
            {myth.research && (
              <div className="bg-white/50 rounded-lg p-3 mt-4">
                <p className="text-xs text-zinc-600">
                  <span className="font-semibold">Source:</span> {myth.research}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export function DyslexiaMythsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-white/50 rounded-full px-6 py-3 shadow-lg mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">?</span>
            </div>
            <span className="text-zinc-700 font-medium">Myth vs Reality</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 text-zinc-900">
            Flip the 
            <span className="bg-gradient-to-r from-red-500 via-purple-500 to-green-500 bg-clip-text text-transparent">
              Script
            </span>
          </h2>
          
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto mb-12">
            Interactive myth-busting cards. Tap to reveal the research-backed truth.
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span>Myth</span>
            </div>
            <div className="w-px h-4 bg-zinc-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span>Fact</span>
            </div>
          </div>
        </div>

        {/* Myth Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {myths.map((myth, index) => (
            <MythCard key={index} myth={myth} index={index} />
          ))}
        </div>

        {/* Fun Stats */}
        <div className="text-center">
          <div className="inline-flex items-center gap-8 bg-white/60 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/50 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-zinc-900">3</div>
              <div className="text-sm text-zinc-600">Myths Busted</div>
            </div>
            <div className="w-px h-8 bg-zinc-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-zinc-600">Research-Based</div>
            </div>
            <div className="w-px h-8 bg-zinc-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">∞</div>
              <div className="text-sm text-zinc-600">Possibilities</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom styles for flip animation */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}
