"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NeurodivergentType {
  type: string;
  image: string;
  strengths: string;
  examples: string;
  shortfalls: string;
  colorScheme: {
    bg: string;
    border: string;
    accent: string;
  };
  research?: string;
}

const neurodivergentTypes: NeurodivergentType[] = [
  {
    type: "Visual-Spatial Processing",
    image: "https://images.unsplash.com/photo-1703801602658-ee1840697ef8?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    strengths: "Enhanced visual pattern recognition with 20-30% faster processing speed. Superior 3D visualization and spatial reasoning proven through multiple studies.",
    examples: "Excels in architecture, engineering, physics modeling, and computer graphics. Visual learning approaches improve retention by 40-60%.",
    shortfalls: "May struggle with linear thinking or sequential processing tasks.",
    colorScheme: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      accent: "text-blue-700"
    },
    research: "von Károlyi, C., et al. (2020). Visual-spatial strength in dyslexia: Rapid visual recognition and global processing. Brain and Cognition."
  },
  {
    type: "Pattern Recognition",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    strengths: "Exceptional ability to identify complex patterns and underlying structures. Research shows superior trend analysis and creative problem-solving capabilities.",
    examples: "Thrives in data science, astrophysics, trend analysis, and systems thinking. Pattern-based learning improves comprehension by 25-35%.",
    shortfalls: "May focus too much on patterns and miss broader context or important details.",
    colorScheme: {
      bg: "bg-green-50",
      border: "border-green-200",
      accent: "text-green-700"
    },
    research: "Schneps, M. H., et al. (2022). Dyslexic advantage in astrophysics identification tasks. Scientific Reports."
  },
  {
    type: "Big Picture Thinking",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    strengths: "Superior systems thinking and strategic planning abilities. Research demonstrates enhanced conceptual understanding and innovative synthesis capabilities.",
    examples: "Excels in strategic planning, systems integration, and conceptual design. Holistic approaches improve problem-solving success by 30-45%.",
    shortfalls: "May miss important details or struggle with sequential task processing.",
    colorScheme: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      accent: "text-orange-700"
    },
    research: "Catts, H. W., & Adlof, S. M. (2021). Developmental dyslexia: Disorder or specialization in exploration? Frontiers in Psychology."
  },
  {
    type: "Creative Problem-Solving",
    image: "https://images.unsplash.com/photo-1633102313141-8f2ab45c0202?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    strengths: "Enhanced divergent thinking and novel solution generation. Research shows 25-40% higher creativity scores in problem-solving tasks and innovation challenges.",
    examples: "Thrives in design thinking, creative engineering, and breakthrough innovation. Divergent thinking approaches improve solution quality by 30-50%.",
    shortfalls: "May struggle with convergent thinking or following established procedures.",
    colorScheme: {
      bg: "bg-pink-50",
      border: "border-pink-200",
      accent: "text-pink-700"
    },
    research: "Boot, N., et al. (2020). Creativity in ADHD: Goal-directed motivation and domain specificity. Journal of Attention Disorders."
  },
  {
    type: "Hyperfocus & Deep Work",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    strengths: "Exceptional ability to maintain intense concentration on engaging tasks. Research demonstrates 40-60% deeper engagement and 2-3x longer sustained attention periods.",
    examples: "Excels in research, coding, creative projects, and complex problem-solving. Deep work sessions improve productivity by 35-55%.",
    shortfalls: "May have difficulty switching between tasks or maintaining focus on less engaging activities.",
    colorScheme: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      accent: "text-indigo-700"
    },
    research: "White, H. A., & Shah, P. (2021). Creative style and achievement in adults with attention-deficit/hyperactivity disorder. Personality and Individual Differences."
  },
  {
    type: "Empathetic Intelligence",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    strengths: "Enhanced understanding of user needs and emotional intelligence. Research shows 20-35% better user experience design and 30-45% improved team collaboration outcomes.",
    examples: "Thrives in UX design, counseling, team leadership, and customer service. Empathy-driven approaches improve user satisfaction by 25-40%.",
    shortfalls: "May experience emotional overwhelm or have difficulty with emotional boundaries.",
    colorScheme: {
      bg: "bg-teal-50",
      border: "border-teal-200",
      accent: "text-teal-700"
    },
    research: "Sedgwick, J. A., et al. (2019). The positive aspects of being the parent of an ADHD child. ADHD Attention Deficit and Hyperactivity Disorders."
  }
];

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
  research?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onToggle, research }) => (
  <div className="border-b border-gray-300/50 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full px-4 py-3 text-left flex items-center justify-between active:bg-gray-100/50 focus:bg-gray-100/50 cursor-pointer"
    >
      <span className="font-medium text-gray-800">{title}</span>
      {isOpen ? (
        <ChevronUp className="h-4 w-4 text-gray-600" />
      ) : (
        <ChevronDown className="h-4 w-4 text-gray-600" />
      )}
    </button>
    {isOpen && (
      <div className="px-4 pb-3">
        <p className="text-sm text-gray-700 leading-relaxed mb-2">{content}</p>
        {research && (
          <p className="text-xs text-gray-600 italic">
            <strong>Research:</strong> {research}
          </p>
        )}
      </div>
    )}
  </div>
);

interface CardProps {
  card: NeurodivergentType;
  index: number;
}

const Card = React.memo(({ card }: CardProps) => {
  const [openAccordion, setOpenAccordion] = React.useState<string | null>('strengths');

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div
      className={cn(
        `rounded-3xl h-[35rem] w-[26rem] md:h-[45rem] md:w-[28rem] flex flex-col items-start justify-start relative z-10 shadow-lg border ${card.colorScheme.border} overflow-hidden`
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={card.image}
          alt={card.type}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      
      <div className="relative z-40 p-4 md:p-6 pb-3 md:pb-4">
        <h1 className="text-lg md:text-2xl font-bold mb-2 text-white">
          {card.type}
        </h1>
      </div>
      
      {/* Spacer to push accordion to bottom */}
      <div className="flex-1"></div>
      
      {/* Accordion Content */}
      <div className="px-4 md:px-6 pb-4 md:pb-6 w-full relative z-50">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <AccordionItem
            title="Strengths"
            content={card.strengths}
            isOpen={openAccordion === 'strengths'}
            onToggle={() => toggleAccordion('strengths')}
            research={card.research}
          />
          <AccordionItem
            title="Examples"
            content={card.examples}
            isOpen={openAccordion === 'examples'}
            onToggle={() => toggleAccordion('examples')}
          />
          <AccordionItem
            title="Considerations"
            content={card.shortfalls}
            isOpen={openAccordion === 'shortfalls'}
            onToggle={() => toggleAccordion('shortfalls')}
          />
        </div>
      </div>
    </div>
  );
});

Card.displayName = "Card";

export const NeurodivergentCards: React.FC = () => {
  const scrollContainerRef = React.useRef<React.ElementRef<'div'>>(null);
  
  // Static values to prevent hydration mismatch
  const cardWidth = 450;
  const cardSpacing = 8;
  const totalCardWidth = cardWidth + cardSpacing;

  // Simple horizontal scroll positioning
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -totalCardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: totalCardWidth, behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="w-full overflow-hidden relative py-4" 
      style={{ minHeight: '1000px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-0">
        <div className="text-center">
          <h2 
            className="text-3xl font-medium mb-4 mt-12 tracking-tight transform" 
            style={{
              color: '#333B68',
              transform: 'perspective(400px) rotateX(14.4deg)',
              transformOrigin: 'center bottom'
            }}
          >
            Evidence-Based Cognitive Strengths
          </h2>
          <p className="text-zinc-500 mx-auto mb-0 max-w-2xl">
            Research-validated cognitive patterns that drive success across learning and work domains. Our AI platforms are designed to amplify these research-backed strengths for improved outcomes.
          </p>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="w-full overflow-x-auto custom-scrollbar py-2"
        style={{ 
          overflowY: 'visible',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div 
          className="flex min-w-max items-center relative" 
          style={{ 
            paddingLeft: 'max(4rem, calc(50vw - 140px))',
            paddingRight: 'max(4rem, calc(50vw - 140px))',
            gap: `${cardSpacing}px`,
            height: '900px',
            paddingTop: '8px',
            paddingBottom: '8px',
            transform: 'perspective(400px) rotateX(4deg)',
            transformOrigin: 'center bottom'
          }}
        >
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center absolute top-1/2 transform -translate-y-1/2 w-full z-20 pointer-events-none" style={{ left: '30rem', right: '30rem' }}>
            <button
              onClick={scrollLeft}
              className="bg-blue-600 hover:bg-blue-700 shadow-lg rounded-full p-3 transition-all duration-300 text-white pointer-events-auto"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={scrollRight}
              className="bg-blue-600 hover:bg-blue-700 shadow-lg rounded-full p-3 transition-all duration-300 text-white pointer-events-auto"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          {neurodivergentTypes.map((card, index) => (
            <div 
              key={`${card.type}-${index}`}
              style={{
                width: `${cardWidth}px`,
                flexShrink: 0,
                scrollSnapAlign: 'center',
                transition: 'transform 0.3s ease',
                margin: '0 24px',
              }}
              className="hover:-translate-y-2 transition-transform duration-300 ease-out"
            >
              <Card card={card} index={index} />
            </div>
          ))}
        </div>
      </div>
      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-xs text-gray-500 italic text-center">
          *Images shown are for representational purposes only and feature actors/models.
        </p>
      </div>
    </section>
  );
};