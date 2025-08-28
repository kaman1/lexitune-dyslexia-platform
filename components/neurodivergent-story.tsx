"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Brain, TrendingUp, Users, DollarSign, GraduationCap } from "lucide-react";

interface StoryCard {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  stats: {
    primary: string;
    secondary: string;
    label: string;
  };
  hoverStats: {
    stat1: { value: string; label: string };
    stat2: { value: string; label: string };
    stat3: { value: string; label: string };
  };
  icon: React.ReactNode;
  borderColor: string;
}

const storyCards: StoryCard[] = [
  {
    id: "neurodivergent-types",
    title: "Neurodivergent Superpowers",
    description: "Common types include ASD, ADHD, Dyslexia, Dyspraxia, and Dyscalculia - each bringing unique cognitive advantages to STEAM fields",
    backgroundImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    stats: {
      primary: "30-85%",
      secondary: "Unemployment Rate",
      label: "Neurodivergent adults vs. 3.7% general population"
    },
    hoverStats: {
      stat1: { value: "34-40%", label: "ASD STEAM Participation vs 15-20% Others" },
      stat2: { value: "Pattern Recognition", label: "Superior ability in systematic analysis" },
      stat3: { value: "Hyperfocus", label: "Extended concentration on complex tasks" }
    },
    icon: <Brain className="h-6 w-6" />,
    borderColor: "#8B83ED"
  },
  {
    id: "stem-participation", 
    title: "STEAM Excellence",
    description: "Neurodivergent individuals demonstrate exceptional performance in Science, Technology, Engineering, Arts, and Mathematics through specialized cognitive patterns",
    backgroundImage: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=600&fit=crop",
    stats: {
      primary: "42-50%",
      secondary: "Higher Dropout Rates",
      label: "STEAM programs for neurodivergent students"
    },
    hoverStats: {
      stat1: { value: "58%", label: "Graduation rate vs 79% neurotypical" },
      stat2: { value: "34%", label: "College attendance rate for ASD vs 46% overall" },
      stat3: { value: "80%", label: "Success rate in 2-year STEAM programs" }
    },
    icon: <TrendingUp className="h-6 w-6" />,
    borderColor: "#6DBDEF"
  },
  {
    id: "workforce-needs",
    title: "STEAM Workforce Demand", 
    description: "Growing STEAM job market with significant talent gaps that neurodivergent individuals are uniquely positioned to fill through their specialized skills",
    backgroundImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    stats: {
      primary: "2M+",
      secondary: "Unfilled STEAM Jobs",
      label: "By 2025 - neurodivergent talent can help fill this gap"
    },
    hoverStats: {
      stat1: { value: "36.8M", label: "Current STEAM workers (24% of total workforce)" },
      stat2: { value: "11%", label: "STEAM growth rate vs 5% overall by 2033" },
      stat3: { value: "800K+", label: "Annual job openings in STEAM fields" }
    },
    icon: <Users className="h-6 w-6" />,
    borderColor: "#69C4B4"
  },
  {
    id: "economic-impact",
    title: "Economic Opportunity",
    description: "Massive economic losses from neurodivergent underutilization - tapping this talent pool could significantly boost STEAM innovation and economic growth",
    backgroundImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    stats: {
      primary: "$57B",
      secondary: "Annual Economic Loss",
      label: "From ASD underemployment alone"
    },
    hoverStats: {
      stat1: { value: "85%", label: "ASD unemployment/underemployment rate" },
      stat2: { value: "GDP Impact", label: "Billions in lost economic growth potential" },
      stat3: { value: "Innovation Gap", label: "Untapped potential for breakthrough discoveries" }
    },
    icon: <DollarSign className="h-6 w-6" />,
    borderColor: "#F2C94C"
  }
];

export const NeurodivergentStory: React.FC = () => {
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container px-4 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-medium mb-8 tracking-tight" style={{color: '#333B68'}}>
            The Neurodivergent STEAM Story
          </h2>
          <p className="text-zinc-500 mx-auto mb-12 max-w-2xl">
            Data-driven insights revealing the untapped potential and systemic barriers facing neurodivergent talent in STEAM fields
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-hide px-8 pb-8">
          {storyCards.map((card) => (
            <div
              key={card.id}
              className={cn(
                "flex-shrink-0 relative cursor-pointer transition-all duration-500 ease-in-out",
                hoveredCard === card.id 
                  ? "w-[80%] max-w-4xl" 
                  : hoveredCard 
                    ? "w-80" 
                    : "w-96"
              )}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div 
                className={cn(
                  "bg-white overflow-hidden relative transition-all duration-500",
                  hoveredCard === card.id ? "h-[700px]" : "h-[500px]"
                )}
              >
                {/* Background Image - Faded */}
                <div className="absolute inset-0">
                  <Image
                    src={card.backgroundImage}
                    alt={card.title}
                    fill
                    className="object-cover opacity-20"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Top Section - Title and Description */}
                  <div className="p-8 flex-1">
                    <div 
                      className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-white text-sm font-medium"
                      style={{ backgroundColor: card.borderColor }}
                    >
                      {card.icon}
                      <span>{card.title.split(' ')[0]}</span>
                    </div>
                    
                    <h3 className="text-3xl font-medium mb-4 leading-tight tracking-tight" style={{color: '#333B68'}}>
                      {card.title}
                    </h3>
                    <p className="text-zinc-500 text-lg leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Section - Stats */}
                  <div className="p-8 pt-0">
                    {hoveredCard === card.id ? (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-4xl font-bold mb-2" style={{color: card.borderColor}}>
                              {card.stats.primary}
                            </div>
                            <div className="text-lg font-medium text-zinc-800 mb-1">
                              {card.stats.secondary}
                            </div>
                            <div className="text-sm text-zinc-600 mb-6">
                              {card.stats.label}
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="p-4 bg-zinc-50">
                              <div className="text-xl font-bold mb-1" style={{color: card.borderColor}}>
                                {card.hoverStats.stat1.value}
                              </div>
                              <div className="text-sm text-zinc-600">
                                {card.hoverStats.stat1.label}
                              </div>
                            </div>
                            
                            <div className="p-4 bg-zinc-50">
                              <div className="text-xl font-bold mb-1" style={{color: card.borderColor}}>
                                {card.hoverStats.stat2.value}
                              </div>
                              <div className="text-sm text-zinc-600">
                                {card.hoverStats.stat2.label}
                              </div>
                            </div>
                            
                            <div className="p-4 bg-zinc-50">
                              <div className="text-xl font-bold mb-1" style={{color: card.borderColor}}>
                                {card.hoverStats.stat3.value}
                              </div>
                              <div className="text-sm text-zinc-600">
                                {card.hoverStats.stat3.label}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2" style={{color: card.borderColor}}>
                          {card.stats.primary}
                        </div>
                        <div className="text-lg font-medium text-zinc-800 mb-1">
                          {card.stats.secondary}
                        </div>
                        <div className="text-sm text-zinc-600">
                          {card.stats.label}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* References Section */}
      <div className="mt-16 bg-zinc-50 py-12">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center" style={{color: '#333B68'}}>
              References
            </h3>
            <div className="space-y-4 text-sm text-zinc-600">
              <p>
                <strong>1.</strong> U.S. Department of Labor, Office of Disability Employment Policy. "Disability Employment Statistics." <em>ODEP Employment Data</em>, 2024, 
                <a href="https://www.dol.gov/agencies/odep" className="text-blue-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  dol.gov/agencies/odep
                </a>.
              </p>
              <p>
                <strong>2.</strong> National Center for Education Statistics. "Students with Disabilities in STEAM Fields." <em>NCES Annual Report</em>, U.S. Department of Education, 2025,
                <a href="https://nces.ed.gov" className="text-blue-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  nces.ed.gov
                </a>.
              </p>
              <p>
                <strong>3.</strong> Bureau of Labor Statistics. "Employment Projections: STEAM Occupations." <em>BLS Occupational Outlook</em>, U.S. Department of Labor, 2024,
                <a href="https://www.bls.gov/emp" className="text-blue-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  bls.gov/emp
                </a>.
              </p>
              <p>
                <strong>4.</strong> Specialisterne Foundation. "Neurodiversity Employment Gap Analysis." <em>Global Autism Employment Report</em>, Specialisterne International, 2024.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};