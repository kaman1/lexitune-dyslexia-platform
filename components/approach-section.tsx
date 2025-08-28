"use client";

import type React from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import {
  Brain,
  Lightbulb,
  Users,
  Database,
  BarChart2,
  Repeat,
} from "lucide-react";

const CapabilityCard = forwardRef<
  React.ElementRef<"div">,
  {
    className?: string;
    children?: React.ReactNode;
    title: string;
    description: string;
    icon: React.ReactNode;
  }
>(({ className, children, title, description, icon }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-20 flex flex-col border-l border-zinc-300 pl-4 py-2 bg-white p-4",
        "hover:bg-zinc-50 transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="text-black">{icon}</div>
        <h4 className="font-medium text-black">{title}</h4>
      </div>
      <p className="text-sm text-zinc-600">{description}</p>
      {children}
    </div>
  );
});

CapabilityCard.displayName = "CapabilityCard";

export function ApproachSection() {
  return (
    <section
      id="approach"
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Bottom right pattern */}
      <div className="absolute bottom-0 right-0 w-80 h-60 overflow-hidden">
        <div className="relative w-full h-full">
          <div className="absolute bottom-4 right-24 w-16 h-16 bg-gray-200 opacity-50" />
          <div className="absolute bottom-20 right-40 w-14 h-14 bg-gray-200 opacity-40" />
          <div className="absolute bottom-28 right-8 w-12 h-12 bg-gray-200 opacity-30" />
        </div>
      </div>

      {/* Top left pattern */}
      <div className="absolute top-0 left-0 w-80 h-60 overflow-hidden">
        <div className="relative w-full h-full">
          <div className="absolute top-4 left-24 w-16 h-16 bg-gray-200 opacity-50" />
          <div className="absolute top-20 left-40 w-14 h-14 bg-gray-200 opacity-40" />
          <div className="absolute top-28 left-8 w-12 h-12 bg-gray-200 opacity-30" />
        </div>
      </div>

      <div className="container px-4 relative z-10 bg-white">
        <div className="max-w-2xl mx-auto mb-20">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight text-center text-black">
            What We Do
          </h2>
          <p className="text-zinc-600 text-center">
            We believe that combining human intuition with AI creates outcomes
            greater than either could achieve alone, leading to better decisions
            and more impactful results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 max-w-4xl mx-auto">
          {/* Left column - Human Capabilities */}
          <div>
            <h3 className="text-lg font-medium mb-8 tracking-tight text-black">
              Human Capabilities
            </h3>
            <div className="space-y-6">
              <CapabilityCard
                title="Intuition"
                description="The ability to understand complex situations instinctively, providing context and judgment that AI cannot replicate."
                icon={<Brain className="h-5 w-5" />}
                className="bg-gray-50 border-gray-200 hover:bg-gray-100"
              />
              <CapabilityCard
                title="Creativity"
                description="Generating innovative solutions and approaches that work alongside AI's analytical capabilities."
                icon={<Lightbulb className="h-5 w-5" />}
                className="bg-gray-50 border-gray-200 hover:bg-gray-100"
              />
              <CapabilityCard
                title="Empathy"
                description="Understanding human needs and emotions to ensure AI implementations remain ethically grounded and human-centered."
                icon={<Users className="h-5 w-5" />}
                className="bg-gray-50 border-gray-200 hover:bg-gray-100"
              />
            </div>
          </div>

          {/* Right column - LLM Capabilities */}
          <div>
            <h3 className="text-lg font-medium mb-8 tracking-tight text-black">
              AI Capabilities
            </h3>
            <div className="space-y-6">
              <CapabilityCard
                title="Pattern Recognition"
                description="Identifying complex patterns across large datasets that would be impossible for humans to process manually."
                icon={<Database className="h-5 w-5" />}
                className="bg-gray-50 border-gray-200 hover:bg-gray-100"
              />
              <CapabilityCard
                title="Data-Driven Insights"
                description="Processing vast amounts of information to provide validated insights rather than assumptions."
                icon={<BarChart2 className="h-5 w-5" />}
                className="bg-gray-50 border-gray-200 hover:bg-gray-100"
              />
              <CapabilityCard
                title="Scalable Assistance"
                description="Providing consistent support across teams while breaking down silos of information."
                icon={<Repeat className="h-5 w-5" />}
                className="bg-gray-50 border-gray-200 hover:bg-gray-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
