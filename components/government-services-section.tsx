"use client";

import {
  CheckCircle,
  Bell,
  MessageSquare,
  Info,
  AlertTriangle,
  Megaphone,
  Users,
  Search,
  Calendar,
  Wrench,
  FileText,
} from "lucide-react";
import { DottedPattern } from "./ui/dotted-pattern";
import { useRouter } from "next/navigation";

export function GovernmentServicesSection() {
  const router = useRouter();

  return (
    <section
      id="government-services"
      className="py-24 md:py-32 bg-zinc-900 text-white relative overflow-hidden"
    >
      {/* Add dotted pattern to top-right corner */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3">
        <DottedPattern
          color="#ffffff"
          dotSize={1.5}
          spacing={25}
          opacity={0.15}
        />
      </div>

      <div className="container px-4">
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight text-center text-white">
            AI-Powered Communication for Local Government
          </h2>
          <p className="text-zinc-300 text-center mb-8">
            We help municipalities connect with constituents through a
            centralized communication platform that organizes information,
            improves customer service, and ensures the right information reaches
            the right people.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center mr-3">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <span className="text-zinc-300">Smart Alerts</span>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center mr-3">
                <Search className="h-5 w-5 text-white" />
              </div>
              <span className="text-zinc-300">Info Discovery</span>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center mr-3">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-zinc-300">Community Feedback</span>
            </div>
          </div>
        </div>

        {/* Origin Story */}
        <div className="max-w-4xl mx-auto mb-16 border border-zinc-800 p-8 bg-zinc-800/50 backdrop-blur-sm">
          <h3 className="text-lg font-medium mb-6 text-white">
            From Military to Municipality
          </h3>
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <p className="text-zinc-300 mb-4">
                This project evolved from our Enhanced Situational Awareness
                Platform (ESAP) originally developed for the Air Force Special
                Operations Command (AFSOC). In 2019, our team of Army veterans
                participated in the Hacking for Defense (H4D) program at the
                University of West Florida, creating a solution that was awarded
                a Small Business Innovation Research (SBIR) grant.
              </p>
              <p className="text-zinc-300 mb-8">
                We've adapted this military-grade technology to help local
                governments organize communication and distribute critical
                information, bridging the gap between government departments and
                constituents.
              </p>
              <div className="flex items-center mb-4">
                <div className="border border-zinc-700 rounded-lg px-3 py-2 bg-zinc-800/50">
                  <span className="text-zinc-300 text-sm">
                    Currently in{" "}
                    <span className="text-white font-medium">TRL 3</span>{" "}
                    development phase
                  </span>
                  <div className="mt-1 text-xs text-zinc-400">
                    <span className="italic">
                      Technology Readiness Level 3:
                    </span>{" "}
                    Analytical and experimental proof of concept - active R&D
                    with key functions demonstrated in relevant environments.
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-700">
                <a
                  href="https://www.sbir.gov/portfolio/1614961"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs text-zinc-300 hover:text-white bg-zinc-700 hover:bg-zinc-600 rounded px-3 py-1.5 transition-colors"
                >
                  View SBIR.gov Portfolio
                </a>
              </div>
            </div>
            <div className="md:col-span-2 border border-zinc-700 p-4 bg-zinc-800">
              <h4 className="text-sm font-medium mb-2 text-white">
                Project Timeline
              </h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-zinc-700 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-xs text-white">1</span>
                  </div>
                  <div>
                    <p className="text-xs text-white font-medium">2019</p>
                    <p className="text-xs text-zinc-300">H4D program at UWF</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-zinc-700 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-xs text-white">2</span>
                  </div>
                  <div>
                    <p className="text-xs text-white font-medium">2019</p>
                    <p className="text-xs text-zinc-300">SBIR Grant Awarded</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-zinc-700 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-xs text-white">3</span>
                  </div>
                  <div>
                    <p className="text-xs text-white font-medium">Present</p>
                    <p className="text-xs text-zinc-300">
                      Civilian Application
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Government Services Features */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Left column */}
          <div className="space-y-8">
            <div className="border border-zinc-800 p-6 bg-zinc-800/50 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <Search className="h-5 w-5 mr-3 text-white" />
                <h3 className="text-lg font-medium text-white">
                  Information Access
                </h3>
              </div>
              <p className="text-zinc-300 mb-4">
                Help constituents easily find accurate information about
                government services, events, and resources through an AI-powered
                search system.
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-300">
                    Smart search for government resources
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-300">
                    24/7 access to critical information
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-zinc-800 p-6 bg-zinc-800/50 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <MessageSquare className="h-5 w-5 mr-3 text-white" />
                <h3 className="text-lg font-medium text-white">
                  Customer Support
                </h3>
              </div>
              <p className="text-zinc-300 mb-4">
                Enhance government responsiveness with AI-assisted customer
                service that routes inquiries and provides timely responses.
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-300">
                    Automated response to common questions
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-300">
                    Smart routing to appropriate departments
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            <div className="border border-zinc-800 p-6 bg-zinc-800/50 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <Bell className="h-5 w-5 mr-3 text-white" />
                <h3 className="text-lg font-medium text-white">
                  Targeted Alerts
                </h3>
              </div>
              <p className="text-zinc-300 mb-4">
                Deliver relevant notifications to constituents based on
                location, preferences, and needs - ensuring information reaches
                those who need it most.
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-300">Emergency and weather alerts</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-300">
                    Personalized community updates
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-zinc-800 p-6 bg-zinc-800/50 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 mr-3 text-white" />
                <h3 className="text-lg font-medium text-white">
                  Feedback Collection
                </h3>
              </div>
              <p className="text-zinc-300 mb-4">
                Organize constituent feedback and responses to improve
                government services and better understand community needs.
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-300">Streamlined input collection</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-300">
                    AI analysis of community sentiment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 inline-block border border-zinc-700 rounded-lg p-4 bg-zinc-800/30">
            <p className="text-zinc-300 text-sm">
              <span className="text-white font-medium">
                Situational Awareness
              </span>{" "}
              is key to effective governance. Our platform connects constituents
              and government agencies with the right information at the right
              time.
            </p>
          </div>

          <button
            type="button"
            className="bg-white text-zinc-900 py-2 px-6 rounded-full font-medium hover:bg-zinc-100 transition-colors"
            onClick={() => {
              // Navigate to contact page with query parameter
              const contactUrl = "/contact?inquiry=local_government";
              router.push(contactUrl);
            }}
          >
            Learn More About Government Solutions
          </button>
        </div>
      </div>

      {/* Add dotted pattern to bottom-left corner */}
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4">
        <DottedPattern
          color="#ffffff"
          dotSize={1.5}
          spacing={25}
          opacity={0.15}
        />
      </div>
    </section>
  );
}
