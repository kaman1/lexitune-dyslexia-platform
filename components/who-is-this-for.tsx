"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TargetAudience {
  title: string;
  image: string;
  description: string;
  useCases: string[];
  colorScheme: {
    bg: string;
    border: string;
    accent: string;
  };
}

const targetAudiences: TargetAudience[] = [
  {
    title: "Parents & Homeschool",
    image: "/for/parent.png",
    description: "Supporting your child's unique learning journey at home and school",
    useCases: [
      "Understanding your child's specific reading challenges",
      "Personalized reading and writing exercises",
      "Tracking progress and identifying areas for improvement",
    ],
    colorScheme: {
      bg: "bg-green-50",
      border: "border-green-200",
      accent: "text-green-700"
    }
  },
  {
    title: "Schools",
    image: "/for/school.png",
    description: "Institutional support for inclusive education",
    useCases: [
      "Tools for differentiated instruction in the classroom",
      "Teacher resources for supporting students with Dyslexia",
      "Student performance analytics and insights",
    ],
    colorScheme: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      accent: "text-orange-700"
    }
  },
  {
    title: "Individuals",
    image: "/for/professional.png",
    description: "Empowering neurodivergent innovation in business",
    useCases: [
      "Improve reading and writing skills for personal and professional development",
      "Tools for workplace accommodations",
      "Strategies for leveraging the strengths of a dyslexic thinking style",
    ],
    colorScheme: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      accent: "text-purple-700"
    }
  }
];

interface AccordionItemProps {
  title: string;
  content: string[];
  isOpen: boolean;
  onToggle: () => void;
  colorScheme: {
    bg: string;
    border: string;
    accent: string;
  };
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onToggle, colorScheme }) => (
  <div className="border-b border-gray-300/50 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-100/50 active:bg-gray-100/50 focus:bg-gray-100/50 cursor-pointer transition-smooth group/accordion"
    >
      <span className="font-medium text-gray-800 transition-colors duration-300 group-hover/accordion:text-gray-900">{title}</span>
      {isOpen ? (
        <ChevronUp className="h-4 w-4 text-gray-600 transition-all duration-300 group-hover/accordion:text-gray-800 group-hover/accordion:scale-110" />
      ) : (
        <ChevronDown className="h-4 w-4 text-gray-600 transition-all duration-300 group-hover/accordion:text-gray-800 group-hover/accordion:scale-110" />
      )}
    </button>
    {isOpen && (
      <div className="px-4 pb-3">
        <ul className="space-y-2">
          {content.map((useCase, index) => (
            <li key={index} className={`text-sm leading-relaxed flex items-start gap-2 ${colorScheme.accent}`}>
              <span className="text-gray-400 mt-1">•</span>
              <span className="text-gray-700">{useCase}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

interface CardProps {
  card: TargetAudience;
  index: number;
}

const Card = React.memo(({ card, index }: CardProps) => {
  const [openAccordion, setOpenAccordion] = React.useState<string | null>('useCases');

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div
      className={cn(
        `rounded-3xl h-[45rem] w-full flex flex-col items-start justify-start relative z-10 shadow-lg border ${card.colorScheme.border} overflow-hidden hover-lift transition-smooth-slow group cursor-pointer`
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      <div className="relative z-40 p-4 md:p-6 pb-3 md:pb-4">
        <div className="backdrop-blur-md bg-black/30 rounded-xl p-4 border border-white/20 transition-all duration-500 group-hover:bg-black/40 group-hover:backdrop-blur-lg">
          <h1 className="text-xl md:text-3xl font-bold mb-2 text-white transition-all duration-300 group-hover:scale-105">
            {card.title}
          </h1>
          <p className="text-sm md:text-base text-white/90 leading-relaxed transition-all duration-300 group-hover:text-white">
            {card.description}
          </p>
        </div>
      </div>
      
      {/* Spacer to push accordion to bottom */}
      <div className="flex-1"></div>
      
      {/* Accordion Content */}
      <div className="px-4 md:px-6 pb-4 md:pb-6 w-full relative z-50">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <AccordionItem
            title="Use Cases"
            content={card.useCases}
            isOpen={openAccordion === 'useCases'}
            onToggle={() => toggleAccordion('useCases')}
            colorScheme={card.colorScheme}
          />
        </div>
      </div>
    </div>
  );
});

Card.displayName = "Card";

export const WhoIsThisFor: React.FC = () => {
  return (
    <section className="w-full h-full py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl font-medium mb-8 tracking-tight" 
            style={{color: '#333B68'}}
          >
            Who Is This For?
          </h2>
          <p className="text-zinc-500 mx-auto max-w-2xl">
            Our AI-powered platform adapts to diverse learning and professional development needs across all environments
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {targetAudiences.map((card, index) => (
            <div 
              key={card.title}
              className="animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Card card={card} index={index} />
            </div>
          ))}
        </div>
        
        {/* Disclaimer */}
        <div className="max-w-4xl mx-auto px-4 mt-12">
          <p className="text-xs text-gray-500 italic text-center">
            *Images shown are for representational purposes only and feature actors/models.
          </p>
        </div>
      </div>
    </section>
  );
};