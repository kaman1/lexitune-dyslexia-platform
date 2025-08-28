"use client"
import { DottedPattern } from "../ui/dotted-pattern"
import { CheckCircle, FileText, Clock } from "lucide-react"

export function DefensePastPerformance() {
  return (
    <section className="py-24 md:py-32 bg-zinc-50 relative overflow-hidden">
      {/* Add dotted pattern to top-right corner */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4">
        <DottedPattern color="#000000" dotSize={1} spacing={25} opacity={0.05} />
      </div>

      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight">Past Performance</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              Our track record of successful defense contracts demonstrates our ability to deliver innovative solutions
              that meet mission-critical requirements.
            </p>
          </div>

          <div className="border border-zinc-200 p-8 bg-white mb-12">
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className="md:w-1/3">
                <h3 className="text-xl font-medium mb-4">SBIR Phase I</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Contract Number</p>
                      <p className="text-sm text-zinc-500">FA8649-19-P-A272</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Solicitation</p>
                      <p className="text-sm text-zinc-500">19.2</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Topic Code</p>
                      <p className="text-sm text-zinc-500">AF192-001</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Agency Tracking</p>
                      <p className="text-sm text-zinc-500">F192-001-1304</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <h4 className="font-medium mb-4">Project Overview</h4>
                <p className="text-sm text-zinc-500 mb-6">
                  In our Phase I feasibility study, developed using the Hacking for Defense framework and lean startup
                  methodology, we demonstrated the transformative impact of real-time multi-user interactions for AFSOC.
                  Our collaborative platform enabled multiple users to simultaneously interact with complex data
                  streams, dramatically enhancing situational awareness and accelerating data-driven decision-making.
                </p>

                <h4 className="font-medium mb-4">Topic</h4>
                <p className="text-sm text-zinc-500 mb-6">
                  Open Call for Innovative Defense-Related Dual-Purpose Technologies/Solutions with a Clear Air Force
                  Stakeholder Need
                </p>

                <h4 className="font-medium mb-4">Key Achievements</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-500">
                      Developed proof-of-concept for multi-user interaction with complex data streams
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-500">
                      Enhanced situational awareness through innovative visualization techniques
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-500">Accelerated data-driven decision-making processes</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-500">
                      Validated approach using Hacking for Defense framework and lean startup methodology
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add dotted pattern to bottom-left corner */}
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4">
        <DottedPattern color="#000000" dotSize={1} spacing={25} opacity={0.05} />
      </div>
    </section>
  )
}
