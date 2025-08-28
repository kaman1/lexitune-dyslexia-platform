"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Target, Zap, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const InfoCard = React.forwardRef<
  HTMLDivElement,
  {
    className?: string;
    children?: React.ReactNode;
    title: string;
    description: string;
    icon: React.ReactNode;
    borderColor?: string;
    iconColor?: string;
  }
>(({ className, children, title, description, icon, borderColor = "border-zinc-300", iconColor = "text-black" }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-20 flex flex-col border-l-4 pl-4 py-2 bg-white p-4",
        "hover:bg-zinc-50 transition-all duration-300",
        borderColor,
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={iconColor}>{icon}</div>
        <h4 className="font-medium">{title}</h4>
      </div>
      <p className="text-sm text-zinc-500">{description}</p>
      {children}
    </div>
  );
});

InfoCard.displayName = "InfoCard";

interface AboutTekimaxProps {
  className?: string;
}

export const AboutTekimax = React.forwardRef<HTMLDivElement, AboutTekimaxProps>(
  ({ className }, ref) => {
    return (
      <section
        id="about"
        className="py-24 md:py-32 bg-zinc-50 relative overflow-hidden"
      >
        {/* Logo Stamp Background */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-5">
          <Image
            src="/tekimax-logomark-black.png"
            alt=""
            width={476}
            height={476}
            className="object-contain"
          />
        </div>
        

        <div className="container px-4 relative z-10">
          <div className="max-w-2xl mx-auto mb-20">
            <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight text-center">
              About Tekimax
            </h2>
            <p className="text-zinc-500 text-center">
              We are a team of educators, engineers, and designers dedicated to helping individuals with Dyslexia. We create innovative, AI-powered tools that make learning more accessible and engaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 max-w-4xl mx-auto">
            {/* Left column - Company */}
            <div>
              <h3 className="text-lg font-medium mb-8 tracking-tight">
                Our Company
              </h3>
              <div className="space-y-6">
                <InfoCard
                  title="Personalized Learning"
                  description="Our tools adapt to each user's unique needs, providing a personalized learning experience that builds confidence and skills."
                  icon={<Target className="h-5 w-5" />}
                  borderColor="border-red-600"
                  iconColor="text-red-600"
                />
                <InfoCard
                  title="AI-Powered Tools"
                  description="We use the latest AI technology to create innovative tools that are both effective and engaging."
                  icon={<Zap className="h-5 w-5" />}
                  borderColor="border-yellow-600"
                  iconColor="text-yellow-600"
                />
              </div>
            </div>

            {/* Right column - Values */}
            <div>
              <h3 className="text-lg font-medium mb-8 tracking-tight">
                Our Values
              </h3>
              <div className="space-y-6">
                <InfoCard
                  title="Social Impact"
                  description="We are committed to making a positive impact on the lives of individuals with Dyslexia."
                  icon={<BookOpen className="h-5 w-5" />}
                  borderColor="border-green-600"
                  iconColor="text-green-600"
                />
                <InfoCard
                  title="Accessibility"
                  description="We believe that everyone should have access to high-quality learning tools, regardless of their learning differences."
                  icon={<Users className="h-5 w-5" />}
                  borderColor="border-blue-600"
                  iconColor="text-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Partner Ecosystem Section */}
          <div className="max-w-4xl mx-auto">
            {/* <div className="text-center mb-12">
              <h3 className="text-xl md:text-2xl font-medium mb-4 tracking-tight">
                AI Tools for Your Organization
              </h3>
              <p className="text-zinc-500 mb-8">
                We build AI tools to help teach people.
              </p>
            </div> */}

            {/* <div className="bg-white rounded-lg shadow-sm border p-8">
              <h4 className="text-lg font-medium mb-4">Partner Applications</h4>
              <p className="text-zinc-600 mb-6">
                Third-party applications from our trusted partners that
                integrate with our AI tools ecosystem.
              </p>

              <div className="bg-zinc-50 rounded-lg p-6 text-center">
                <h5 className="font-medium mb-3">No Partner Apps Yet</h5>
                <p className="text-sm text-zinc-600 mb-4">
                  We're building an ecosystem of trusted partners. Be among the
                  first to join our marketplace and integrate your application
                  with our AI tools platform.
                </p>
                <p className="text-sm text-zinc-600 mb-6">
                  Submit your application and we'll review your integration
                  proposal.
                </p>
                <Button
                  className="bg-black text-white hover:bg-zinc-800"
                  onClick={() =>
                    window.open(
                      "https://www.forms.tekimax.com/?formId=kd7e95cszm24xg3q2ksvv8rb1d7hrtb8",
                      "_blank"
                    )
                  }
                >
                  Apply to Partner
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    );
  }
);