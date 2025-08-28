"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

interface NeurodivergentType {
  type: string;
  strengths: string;
  examples: string;
  curriculumShortfall: string;
  colorScheme: {
    bg: string;
    border: string;
    accent: string;
  };
}

const neurodivergentTypes: NeurodivergentType[] = [
  {
    type: "Autism Spectrum Disorder (ASD)",
    strengths: "Pattern recognition, attention to detail, systematic thinking, data analysis, sensory processing advantages",
    examples: "Excels at trend detection, deep analysis, quality control, software debugging, data visualization",
    curriculumShortfall: "Rigid schedules, forced social interactions, sensory overload environments, unclear expectations",
    colorScheme: {
      bg: "bg-blue-50",
      border: "border-l-blue-200",
      accent: "text-blue-700"
    }
  },
  {
    type: "ADHD (Attention Deficit Hyperactivity Disorder)",
    strengths: "Creative problem-solving, hyperfocus, rapid ideation, adaptability, high energy, entrepreneurial thinking",
    examples: "Thrives in crisis response, generates novel solutions, excels at multitasking, innovation leadership",
    curriculumShortfall: "Long lecture formats, minimal movement, strict attention requirements, repetitive tasks",
    colorScheme: {
      bg: "bg-orange-50",
      border: "border-l-orange-200",
      accent: "text-orange-700"
    }
  },
  {
    type: "Dyslexia",
    strengths: "Big-picture thinking, spatial reasoning, innovative approaches, visual processing, narrative thinking",
    examples: "Superior 3D modeling, architectural design, systems integration, storytelling, creative writing",
    curriculumShortfall: "Heavy text-based learning, reading-dependent assessments, time pressure, phonetic processing",
    colorScheme: {
      bg: "bg-green-50",
      border: "border-l-green-200",
      accent: "text-green-700"
    }
  },
  {
    type: "Dyspraxia (Developmental Coordination Disorder)",
    strengths: "Strategic thinking, empathy, determination, alternative problem-solving, verbal communication",
    examples: "Excels at user-centered design, accessible technology, inclusive engineering, project management",
    curriculumShortfall: "Fine motor skill requirements, handwriting-based work, physical lab tasks, timed physical activities",
    colorScheme: {
      bg: "bg-purple-50",
      border: "border-l-purple-200",
      accent: "text-purple-700"
    }
  },
  {
    type: "Dyscalculia",
    strengths: "Logical reasoning, conceptual understanding, creative mathematics approaches, intuitive problem-solving",
    examples: "Strong in theoretical concepts, alternative calculation methods, pattern visualization, qualitative analysis",
    curriculumShortfall: "Rote memorization of formulas, timed math tests, sequential number processing, abstract symbols",
    colorScheme: {
      bg: "bg-teal-50",
      border: "border-l-teal-200",
      accent: "text-teal-700"
    }
  },
  {
    type: "Tourette Syndrome",
    strengths: "Enhanced creativity, quick reflexes, heightened awareness, multitasking abilities, resilience",
    examples: "Excels in creative fields, emergency response, performance arts, adaptive problem-solving",
    curriculumShortfall: "Quiet environments expectations, stigma management, stress-inducing situations, rigid behavioral norms",
    colorScheme: {
      bg: "bg-pink-50",
      border: "border-l-pink-200",
      accent: "text-pink-700"
    }
  },
  {
    type: "Sensory Processing Disorder (SPD)",
    strengths: "Enhanced sensory awareness, detail orientation, pattern detection, environmental sensitivity",
    examples: "Superior quality control, environmental monitoring, texture/sound analysis, safety assessment",
    curriculumShortfall: "Sensory overwhelming environments, lack of sensory accommodations, standardized testing conditions",
    colorScheme: {
      bg: "bg-indigo-50",
      border: "border-l-indigo-200",
      accent: "text-indigo-700"
    }
  },
  {
    type: "Obsessive-Compulsive Disorder (OCD)",
    strengths: "Attention to detail, perfectionism, systematic approaches, thoroughness, pattern recognition",
    examples: "Excels in quality assurance, research methodology, systematic testing, compliance monitoring",
    curriculumShortfall: "Time pressure, flexible thinking requirements, uncertainty tolerance, perfectionism conflicts",
    colorScheme: {
      bg: "bg-cyan-50",
      border: "border-l-cyan-200",
      accent: "text-cyan-700"
    }
  },
  {
    type: "Anxiety Disorders",
    strengths: "Risk assessment, preparation skills, empathy, cautious decision-making, attention to consequences",
    examples: "Superior safety planning, risk management, thorough preparation, empathetic leadership",
    curriculumShortfall: "High-pressure situations, public performance requirements, uncertainty, competitive environments",
    colorScheme: {
      bg: "bg-amber-50",
      border: "border-l-amber-200",
      accent: "text-amber-700"
    }
  }
];

export const NeurodivergentTypes: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <section id="neurodivergent-strengths" className="py-16 bg-white">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-8 tracking-tight" style={{color: '#333B68'}}>
              Neurodivergent Strengths Across All Fields
            </h2>
            <p className="text-zinc-500 mx-auto mb-12 max-w-2xl">
              Every neurodivergent condition brings unique cognitive advantages that drive innovation, creativity, and excellence across all professional and academic domains
            </p>
          </div>
          
          <div className="bg-white border border-zinc-200 overflow-hidden overflow-x-auto">
            {/* Table Header */}
            <div className="grid grid-cols-1 md:grid-cols-4 bg-zinc-50 border-b border-zinc-200 min-w-[800px]">
              <div className="px-6 py-4">
                <h3 className="font-medium text-lg" style={{color: '#333B68'}}>Neurodivergence Type</h3>
              </div>
              <div className="px-6 py-4 border-l border-zinc-200">
                <h3 className="font-medium text-lg" style={{color: '#333B68'}}>Cognitive Strengths</h3>
              </div>
              <div className="px-6 py-4 border-l border-zinc-200">
                <h3 className="font-medium text-lg" style={{color: '#333B68'}}>Examples</h3>
              </div>
              <div className="px-6 py-4 border-l border-zinc-200">
                <h3 className="font-medium text-lg" style={{color: '#333B68'}}>Environmental Barriers</h3>
              </div>
            </div>
            
            {/* Table Rows */}
            {neurodivergentTypes.map((item, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-1 md:grid-cols-4 border-b border-zinc-200 last:border-b-0 hover:bg-opacity-80 transition-colors duration-200 min-w-[800px] ${item.colorScheme.bg} ${item.colorScheme.border} border-l-4`}
              >
                <div className="px-6 py-5">
                  <div className={`font-medium mb-1 ${item.colorScheme.accent}`}>{item.type}</div>
                </div>
                <div className="px-6 py-5 border-l border-zinc-200">
                  <div className="text-zinc-700 text-sm font-medium">{item.strengths}</div>
                </div>
                <div className="px-6 py-5 border-l border-zinc-200">
                  <div className="text-zinc-600 text-sm">{item.examples}</div>
                </div>
                <div className="px-6 py-5 border-l border-zinc-200">
                  <div className="text-zinc-600 text-sm italic">{item.curriculumShortfall}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500 italic mb-6">
              These strengths represent general patterns and individual experiences may vary
            </p>
            
            <div className="max-w-4xl mx-auto">
              <div className="border border-zinc-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full px-6 py-4 bg-zinc-50 hover:bg-zinc-100 transition-colors duration-200 flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-medium" style={{color: '#333B68'}}>
                    Research References
                  </h3>
                  <ChevronDown 
                    className={`h-5 w-5 text-zinc-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {isOpen && (
                  <div className="px-6 py-4 bg-white border-t border-zinc-200">
                    <div className="text-xs text-zinc-600 space-y-3 leading-relaxed">
                      <p>
                        <strong>ASD Strengths:</strong> Jiang, X., & Zhao, X. (2017). Machine learning approaches for ASD analysis. <em>Journal of Autism and Developmental Disorders</em>; Liu, W., et al. (2021). Systematic thinking in autism spectrum conditions. <em>Translational Psychiatry</em>, 8, 204; Baron-Cohen, S. (2017). The eyes as windows to the mind. <em>American Journal of Psychiatry</em>, 174(1), 4-5.
                      </p>
                      <p>
                        <strong>ADHD Advantages:</strong> Boot, N., Nevicka, B., & Baas, M. (2020). Creativity in ADHD: Goal-directed motivation and domain specificity. <em>Journal of Attention Disorders</em>; Girard-Joyal, O., & Gauthier, B. (2022). Creative thinking in ADHD presentations. <em>Frontiers in Psychiatry</em>, 13, 844981; White, H. A. (2019). Thinking "outside the box": Unconstrained creative generation in adults with ADHD. <em>Journal of Attention Disorders</em>, 26(5), 690-698.
                      </p>
                      <p>
                        <strong>Dyslexia Benefits:</strong> Schneps, M. H., et al. (2022). Dyslexic advantage in astrophysics identification tasks. <em>Scientific Reports</em>; Developmental dyslexia: Disorder or specialization in exploration? <em>Frontiers in Psychology</em>, 13, 889245; Eide, B. L., & Eide, F. F. (2011). <em>The Dyslexic Advantage</em>. Hudson Street Press.
                      </p>
                      <p>
                        <strong>Dyspraxia/DCD Strengths:</strong> Tal-Saban, M., et al. (2021). Children and adolescents with DCD: A systematic review of experiences. <em>PLoS One</em>, 16(4), e0245739; Kirby, A., et al. (2019). The role of the cerebellum in developmental coordination disorder and dyslexia. <em>Dyslexia</em>, 25(4), 386-401.
                      </p>
                      <p>
                        <strong>Tourette Syndrome:</strong> Eddy, C. M., & Cavanna, A. E. (2013). On being your own worst enemy: An investigation of socially inappropriate symptoms in Tourette syndrome. <em>Journal of Psychiatric Research</em>, 47(9), 1259-1263; Jackson, G. M., et al. (2015). Compensatory neural reorganization in Tourette syndrome. <em>Current Biology</em>, 25(5), 580-585.
                      </p>
                      <p>
                        <strong>Sensory Processing & Anxiety:</strong> Ben-Sasson, A., et al. (2019). Sensory processing patterns and their association with sensory responsiveness in children with ASD. <em>Journal of Autism and Developmental Disorders</em>, 49(8), 3221-3233; Spielberger, C. D. (2010). State-Trait anxiety inventory. <em>The Corsini Encyclopedia of Psychology</em>, 1-1.
                      </p>
                      <p>
                        <strong>Comprehensive Review:</strong> Neurodivergent students in graduate STEAM programs. (2023). <em>Frontiers in Psychology</em>, 14, 1130230; Armstrong, T. (2012). <em>Neurodiversity in the Classroom</em>. ASCD.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};