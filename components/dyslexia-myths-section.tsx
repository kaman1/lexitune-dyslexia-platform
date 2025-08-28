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
}

const myths: Myth[] = [
  {
    myth: "Dyslexic individuals can't become strong readers.",
    fact: "Research shows that dyslexic individuals can develop strong reading skills with appropriate support. Studies have demonstrated that structured, multisensory approaches like Orton-Gillingham, enhanced with AI, can significantly improve reading outcomes.",
    icon: <Zap className="h-6 w-6" />,
    colorScheme: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      accent: "text-blue-700",
      iconBg: "bg-blue-100"
    },
    research: "Schneps, M. H., et al. (2022). Dyslexic advantage in astrophysics identification tasks. Scientific Reports."
  },
  {
    myth: "Dyslexia only affects reading and writing skills.",
    fact: "While dyslexia primarily affects reading and writing, research has shown enhanced visual-spatial abilities and pattern recognition skills in dyslexic individuals. These strengths can be leveraged in reading instruction through AI-enhanced multisensory approaches.",
    icon: <Eye className="h-6 w-6" />,
    colorScheme: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      accent: "text-orange-700",
      iconBg: "bg-orange-100"
    },
    research: "von Károlyi, C., et al. (2020). Visual-spatial strength in dyslexia: Rapid visual recognition and global processing. Brain and Cognition."
  },
  {
    myth: "Traditional reading methods work for everyone.",
    fact: "Research has shown that dyslexic individuals require specialized reading instruction. AI-enhanced Orton-Gillingham approaches provide personalized, adaptive reading support that traditional methods cannot offer.",
    icon: <BookOpen className="h-6 w-6" />,
    colorScheme: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      accent: "text-indigo-700",
      iconBg: "bg-indigo-100"
    },
    research: "Catts, H. W., & Adlof, S. M. (2021). Developmental dyslexia: Disorder or specialization in exploration? Frontiers in Psychology."
  }
];

interface AccordionItemProps {
  myth: Myth;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ myth, isOpen, onToggle, index }) => (
  <div className={cn(
    "border-2 rounded-2xl overflow-hidden transition-all duration-300",
    myth.colorScheme.border,
    isOpen ? "shadow-lg" : "shadow-md hover:shadow-lg"
  )}>
    <button
      onClick={onToggle}
      className={cn(
        "w-full p-6 text-left flex items-center justify-between transition-all duration-300",
        isOpen ? "bg-white" : "bg-white hover:bg-gray-50"
      )}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
          myth.colorScheme.iconBg
        )}>
          <div className={myth.colorScheme.accent}>
            {myth.icon}
          </div>
        </div>
        
        {/* Myth text */}
        <div className="flex items-start gap-3">
          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <h3 className="font-semibold text-lg text-gray-800 leading-tight">
            {myth.myth}
          </h3>
        </div>
      </div>
      
      {/* Chevron icon */}
      <div className="flex-shrink-0">
        {isOpen ? (
          <ChevronUp className="h-6 w-6 text-gray-500 transition-transform duration-300" />
        ) : (
          <ChevronDown className="h-6 w-6 text-gray-500 transition-transform duration-300" />
        )}
      </div>
    </button>
    
    {/* Fact content */}
    {isOpen && (
      <div className={cn(
        "px-6 pb-6 transition-all duration-300",
        myth.colorScheme.bg
      )}>
        <div className="flex items-start gap-3 pt-4">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-gray-700 leading-relaxed mb-3">
              {myth.fact}
            </p>
            {myth.research && (
              <p className="text-sm text-gray-600 italic">
                <strong>Research:</strong> {myth.research}
              </p>
            )}
          </div>
        </div>
      </div>
    )}
  </div>
);

export function DyslexiaMythsSection() {
  const [openAccordion, setOpenAccordion] = React.useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              <span>Reading Support</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{color: '#333B68'}}>
              Reading Myths & Facts
            </h2>
            <p className="text-lg text-zinc-600 max-w-3xl mx-auto leading-relaxed">
              Common misconceptions about reading challenges and the evidence-based truth.
            </p>
          </div>

          {/* Myths Accordion */}
          <div className="space-y-4">
            {myths.map((myth, index) => (
              <AccordionItem
                key={index}
                myth={myth}
                isOpen={openAccordion === index}
                onToggle={() => toggleAccordion(index)}
                index={index}
              />
            ))}
          </div>

          {/* Source Attribution */}
          <div className="text-center mt-16">
            <p className="text-sm text-gray-500">
              Research-based insights on dyslexic cognition and STEAM education • 
              <a 
                href="https://www.understood.org/en/articles/common-myths-about-dyslexia-reading-issues" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                Understood.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
