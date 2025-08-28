"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Building2,
  Users,
  Lightbulb,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SolutionCard = React.forwardRef<
  HTMLDivElement,
  {
    className?: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
  }
>(({ className, title, description, icon, features }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "p-6 bg-white border border-zinc-200 rounded-lg",
        "hover:border-zinc-300 hover:shadow-sm transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-zinc-50 rounded-lg">
          <div className="text-black">{icon}</div>
        </div>
        <h4 className="font-medium">{title}</h4>
      </div>
      <p className="text-sm text-zinc-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-sm text-zinc-600"
          >
            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
});

SolutionCard.displayName = "SolutionCard";

interface CustomSolutionsProps {
  className?: string;
}

export const CustomSolutions = React.forwardRef<
  HTMLDivElement,
  CustomSolutionsProps
>(({ className }, ref) => {
  return (
    <section
      id="custom-solutions"
      ref={ref}
      className={cn(
        "py-24 md:py-32 bg-zinc-50 relative overflow-hidden",
        className
      )}
    >
      {/* Background patterns */}
      <div className="absolute bottom-0 right-0 w-80 h-60 overflow-hidden">
        <div className="relative w-full h-full">
          <div className="absolute bottom-8 right-16 w-14 h-14 bg-zinc-200 opacity-50" />
          <div className="absolute bottom-20 right-32 w-10 h-10 bg-zinc-200 opacity-40" />
          <div className="absolute bottom-32 right-8 w-12 h-12 bg-zinc-200 opacity-30" />
        </div>
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-6 tracking-tight">
            Custom Solutions for Your Organization
          </h2>
          <p className="text-lg text-zinc-600 leading-relaxed">
            We build similar custom AI solutions tailored to your organization's
            specific needs, workflows, and industry requirements. From concept
            to deployment, we work with you to create the perfect fit.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main value proposition */}
          <div className="bg-white rounded-2xl p-8 md:p-12 mb-16 border border-zinc-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-medium mb-4 tracking-tight">
                  Tailored AI Solutions
                </h3>
                <p className="text-zinc-600 mb-6">
                  Every organization is unique. That's why we don't believe in
                  one-size-fits-all solutions. We analyze your specific
                  challenges, understand your workflow, and build custom AI
                  tools that integrate seamlessly with your existing processes.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-black rounded-full" />
                    <span className="text-sm text-zinc-600">
                      Custom workflow integration
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-black rounded-full" />
                    <span className="text-sm text-zinc-600">
                      Industry-specific solutions
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-black rounded-full" />
                    <span className="text-sm text-zinc-600">
                      Scalable architecture
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-black rounded-full" />
                    <span className="text-sm text-zinc-600">
                      Ongoing support & training
                    </span>
                  </div>
                </div>

                <Button
                  className="bg-black text-white hover:bg-zinc-800"
                  onClick={() => window.open("/contact", "_blank")}
                >
                  Discuss Your Project
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-lg p-6">
                  <div className="text-center">
                    <Building2 className="h-16 w-16 mx-auto mb-4 text-zinc-600" />
                    <h4 className="font-medium mb-2">Your Organization</h4>
                    <p className="text-sm text-zinc-600">
                      We start with understanding your unique needs
                    </p>
                  </div>
                </div>

                {/* Connection arrow */}
                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 hidden md:block">
                  <ArrowRight className="h-6 w-6 text-zinc-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Solution types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SolutionCard
              title="Process Automation"
              description="Streamline repetitive tasks and optimize workflows with intelligent automation."
              icon={<Lightbulb className="h-5 w-5" />}
              features={[
                "Workflow analysis & optimization",
                "Custom automation tools",
                "Integration with existing systems",
                "Performance monitoring",
              ]}
            />

            <SolutionCard
              title="Data Analytics Platforms"
              description="Transform your data into actionable insights with custom analytics solutions."
              icon={<Building2 className="h-5 w-5" />}
              features={[
                "Custom dashboard development",
                "Real-time data processing",
                "Predictive analytics",
                "Data visualization tools",
              ]}
            />

            <SolutionCard
              title="Learning & Development"
              description="Build internal expertise with custom AI literacy and training programs."
              icon={<Users className="h-5 w-5" />}
              features={[
                "Custom curriculum design",
                "Interactive learning modules",
                "Progress tracking systems",
                "Team collaboration tools",
              ]}
            />
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-black text-white rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl font-medium mb-4 tracking-tight">
                Ready to Build Something Amazing?
              </h3>
              <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
                Let's discuss how we can create a custom AI solution that
                transforms your organization's capabilities and drives
                meaningful results.
              </p>
              <Button
                variant="secondary"
                className="bg-white text-black hover:bg-zinc-100"
                onClick={() => window.open("/contact", "_blank")}
              >
                Start Your Project
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

CustomSolutions.displayName = "CustomSolutions";
