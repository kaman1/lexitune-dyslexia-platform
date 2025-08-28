"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { 
  BrainCircuit, 
  GraduationCap, 
  Briefcase, 
  Lightbulb,
  ChevronRight
} from "lucide-react";

interface Solution {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const solutions: Solution[] = [
  {
    title: "Personalized Learning",
    description: "Our app adapts to each user's unique needs, creating a personalized learning journey that builds confidence and skills.",
    icon: <BrainCircuit className="h-8 w-8" />,
    color: "blue"
  },
  {
    title: "Skill Development",
    description: "We focus on developing core skills in reading, writing, and spelling through engaging, multi-sensory activities.",
    icon: <GraduationCap className="h-8 w-8" />,
    color: "green"
  },
  {
    title: "Lifelong Learning",
    description: "Our goal is to empower individuals with the tools and confidence they need to become lifelong learners.",
    icon: <Briefcase className="h-8 w-8" />,
    color: "purple"
  },
  {
    title: "Innovative Approach",
    description: "We use the latest research and technology to create an innovative and effective learning experience.",
    icon: <Lightbulb className="h-8 w-8" />,
    color: "orange"
  }
];

export const SolutionsSection: React.FC = () => {
  const getIconColor = (color: string) => {
    switch (color) {
      case "blue": return "text-blue-500";
      case "green": return "text-green-500";
      case "purple": return "text-purple-500";
      case "orange": return "text-orange-500";
      default: return "text-gray-500";
    }
  };

  const getBgColor = (color: string) => {
    switch (color) {
      case "blue": return "bg-blue-50";
      case "green": return "bg-green-50";
      case "purple": return "bg-purple-50";
      case "orange": return "bg-orange-50";
      default: return "bg-gray-50";
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-medium mb-4 tracking-tight" style={{color: '#333B68'}}>
            Our Solution
          </h2>
          <p className="text-zinc-500 mx-auto max-w-2xl">
            We are building a comprehensive ecosystem to support individuals with Dyslexia, fostering a world where everyone can thrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className={cn(
                "p-8 rounded-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl",
                getBgColor(solution.color)
              )}
            >
              <div className="flex items-start gap-6">
                <div className={cn("flex-shrink-0", getIconColor(solution.color))}>
                  {solution.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3" style={{color: '#333B68'}}>
                    {solution.title}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get in Touch
            <ChevronRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};