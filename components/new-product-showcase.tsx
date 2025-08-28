"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  ArrowRight,
  Brain,
  Lightbulb,
  Eye,
  Zap,
  Users,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const StrengthCard = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    title: string;
    description: string;
    icon: React.ReactNode;
    examples: string[];
  }
>(({ className, title, description, icon, examples, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col p-6 bg-white border border-zinc-200",
        "hover:border-zinc-300 hover:shadow-sm transition-all duration-300",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-full">
          <div className="text-blue-600">{icon}</div>
        </div>
        <h4 className="font-medium text-lg">{title}</h4>
      </div>
      <p className="text-zinc-600 mb-4 leading-relaxed">{description}</p>
      <div className="space-y-2">
        {examples.map((example, index) => (
          <div key={index} className="flex items-start gap-2 text-sm text-zinc-600">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span>{example}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

StrengthCard.displayName = "StrengthCard";

interface NewProductShowcaseProps
  extends React.ComponentPropsWithoutRef<"section"> {}

export const NewProductShowcase = React.forwardRef<
  React.ElementRef<"section">,
  NewProductShowcaseProps
>(({ className, ...props }, ref) => {
  return (
    <section
      id="neurodivergent-strengths"
      ref={ref}
      className={cn(
        "pt-0 pb-24 md:pb-32 bg-white relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Full Width Vertical Split Section */}
      <div className="w-full">
        <div className="min-h-[60vh] flex">
          {/* Left Side - Content with Solid Brand Background Color */}
          <div className="w-1/2 flex items-center justify-center px-16" style={{backgroundColor: '#F2C94C'}}>
            <div className="max-w-2xl space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white" style={{backgroundColor: '#333B68'}}>
                  <Brain className="h-4 w-4" />
                  Neurodivergent STEAM Superpowers
                </div>

                <h2 className="text-5xl font-bold tracking-tight leading-tight" style={{color: '#333B68'}}>
                  Leveraging Neurodivergent Strengths in STEAM
                </h2>

                <p className="text-xl leading-relaxed" style={{color: '#333B68'}}>
                  Neurodivergent minds bring unique cognitive advantages to Science, Technology, Engineering, Arts, and Mathematics, transforming perceived "deficits" into innovation superpowers that drive breakthrough discoveries.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Video Background with Overlay and Strengths */}
          <div className="w-1/2 relative overflow-hidden">
            {/* Brand Background */}
            <div className="absolute inset-0">
              <Image
                src="/brand1.png"
                alt="Brand background"
                fill
                className="w-full h-full object-cover"
                priority
              />
            </div>


            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center px-16">
              <div className="max-w-xl space-y-8">
                <div className="space-y-6">
                  <div className="pl-6 py-4 bg-white hover:bg-gray-50 transition-all duration-300" style={{borderLeft: '4px solid #6DBDEF'}}>
                    <h4 className="text-xl font-semibold mb-2" style={{color: '#333B68'}}>Pattern Recognition Excellence</h4>
                    <p style={{color: '#4A5568'}}>Exceptional ability to identify complex patterns and systematic relationships in data and research</p>
                  </div>

                  <div className="pl-6 py-4 bg-white hover:bg-gray-50 transition-all duration-300" style={{borderLeft: '4px solid #8B83ED'}}>
                    <h4 className="text-xl font-semibold mb-2" style={{color: '#333B68'}}>Innovative Problem-Solving</h4>
                    <p style={{color: '#4A5568'}}>Creative approaches to challenges that lead to breakthrough solutions and novel methodologies</p>
                  </div>

                  <div className="pl-6 py-4 bg-white hover:bg-gray-50 transition-all duration-300" style={{borderLeft: '4px solid #69C4B4'}}>
                    <h4 className="text-xl font-semibold mb-2" style={{color: '#333B68'}}>Deep Focus & Attention to Detail</h4>
                    <p style={{color: '#4A5568'}}>Sustained concentration on complex tasks with meticulous attention to critical details</p>
                  </div>

                  <div className="pl-6 py-4 bg-white hover:bg-gray-50 transition-all duration-300" style={{borderLeft: '4px solid #F2C94C'}}>
                    <h4 className="text-xl font-semibold mb-2" style={{color: '#333B68'}}>Spatial Intelligence</h4>
                    <p style={{color: '#4A5568'}}>Superior 3D visualization and spatial reasoning abilities essential for engineering and mathematics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Margin Below Section */}
        <div className="h-24"></div>
      </div>

      <div className="container px-4 relative z-10">

        <div className="max-w-6xl mx-auto">

          {/* Neurodivergent Strengths */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StrengthCard
              title="ADHD Superpowers"
              description="High energy and creativity enable rapid ideation and adaptability in dynamic STEAM environments."
              icon={<Zap className="h-6 w-6" />}
              examples={[
                "Generates novel ideas in coding sprints and lab experiments",
                "Thrives in fast-paced, dynamic problem-solving scenarios", 
                "Excels at rapid prototyping and crisis response situations"
              ]}
            />
            <StrengthCard
              title="Autistic Excellence"
              description="Superior pattern recognition, attention to detail, and exceptional memory drive breakthrough discoveries."
              icon={<Target className="h-6 w-6" />}
              examples={[
                "Enhanced performance in systematic and detail-oriented tasks",
                "Excels in data analysis, debugging, and complex modeling",
                "Exceptional spatial memory and 3D visualization skills"
              ]}
            />
            <StrengthCard
              title="Spatial Intelligence"
              description="Enhanced ability to visualize, manipulate, and navigate 3D spaces drives innovation in STEAM fields."
              icon={<Eye className="h-6 w-6" />}
              examples={[
                "Superior mental rotation and spatial memory abilities",
                "Enhances 3D modeling, CAD software, and GIS analysis",
                "Supports architectural design and mechanical engineering"
              ]}
            />
          </div>

          {/* Statistics Section */}
          <div className="mt-16 bg-zinc-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-medium mb-4">The Opportunity</h3>
              <p className="text-zinc-600">Current challenges and the potential for transformation</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-red-600 mb-2">30-85%</div>
                <p className="text-sm text-zinc-600 mb-2">Unemployment rate for neurodivergent adults vs. 3.7% general population</p>
                <p className="text-xs text-zinc-500">Source: U.S. Department of Labor, ODEP (2024)</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">42-50%</div>
                <p className="text-sm text-zinc-600 mb-2">Higher dropout rates in STEAM programs for neurodivergent students</p>
                <p className="text-xs text-zinc-500">Source: National Center for Education Statistics (2025)</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">2M+</div>
                <p className="text-sm text-zinc-600 mb-2">Unfilled STEAM jobs by 2025 - neurodivergent talent can help fill this gap</p>
                <p className="text-xs text-zinc-500">Source: Bureau of Labor Statistics (2024)</p>
              </div>
            </div>
            
            {/* References Section */}
            <div className="mt-8 pt-6 border-t border-zinc-200">
              <h4 className="text-sm font-medium text-zinc-700 mb-4 text-center">References</h4>
              <div className="space-y-2 text-xs text-zinc-500 max-w-4xl mx-auto">
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
      </div>
    </section>
  );
});

NewProductShowcase.displayName = "NewProductShowcase";
