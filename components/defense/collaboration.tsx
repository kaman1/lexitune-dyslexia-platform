"use client"
import { DottedPattern } from "../ui/dotted-pattern"
import { Handshake, FileText, Users, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DefenseCollaboration() {
  return (
    <section className="py-24 md:py-32 bg-zinc-900 text-white relative overflow-hidden">
      {/* Add dotted pattern to top-right corner */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3">
        <DottedPattern color="#ffffff" dotSize={1.5} spacing={25} opacity={0.15} />
      </div>

      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight">Collaboration Opportunities</h2>
            <p className="text-zinc-300 max-w-2xl mx-auto">
              We're actively seeking partnerships with defense agencies, prime contractors, and research institutions to
              advance dual-use technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="border border-zinc-800 p-8 bg-zinc-800/50 backdrop-blur-sm relative overflow-hidden">
              {/* Add dotted pattern to bottom-left corner */}
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2">
                <DottedPattern color="#ffffff" dotSize={1} spacing={20} opacity={0.1} />
              </div>

              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-zinc-700 flex items-center justify-center mr-4">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-medium">SBIR/STTR Programs</h3>
              </div>
              <p className="text-zinc-300 mb-6">
                We're open to collaborating on SBIR/STTR proposals across multiple defense agencies, bringing our
                expertise in mixed reality, AI, and data visualization to address mission-critical challenges.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start">
                  <Lightbulb className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-300">Joint proposal development</p>
                </div>
                <div className="flex items-start">
                  <Lightbulb className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-300">Technical expertise and innovation</p>
                </div>
                <div className="flex items-start">
                  <Lightbulb className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-300">Proven methodology and approach</p>
                </div>
              </div>
            </div>

            <div className="border border-zinc-800 p-8 bg-zinc-800/50 backdrop-blur-sm relative overflow-hidden">
              {/* Add dotted pattern to top-right corner */}
              <div className="absolute top-0 right-0 w-1/2 h-1/2">
                <DottedPattern color="#ffffff" dotSize={1} spacing={20} opacity={0.1} />
              </div>

              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-zinc-700 flex items-center justify-center mr-4">
                  <Handshake className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-medium">Strategic Partnerships</h3>
              </div>
              <p className="text-zinc-300 mb-6">
                We seek partnerships with prime contractors, research institutions, and technology providers to develop
                and deploy innovative solutions for defense and commercial applications.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start">
                  <Users className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-300">Complementary capabilities and expertise</p>
                </div>
                <div className="flex items-start">
                  <Users className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-300">Joint research and development</p>
                </div>
                <div className="flex items-start">
                  <Users className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-300">Technology transition and commercialization</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-medium mb-6">Interested in Collaborating?</h3>
            <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">
              We're always looking for new opportunities to collaborate on innovative defense and dual-use technologies.
              Contact us to discuss how we can work together.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-black hover:bg-zinc-100">Contact Our Defense Team</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Add dotted pattern to bottom-left corner */}
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4">
        <DottedPattern color="#ffffff" dotSize={1.5} spacing={25} opacity={0.15} />
      </div>
    </section>
  )
}
