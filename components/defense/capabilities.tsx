"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { DottedPattern } from "../ui/dotted-pattern"
import { Database, Code, Lightbulb, Target, BarChart2, Users } from "lucide-react"

export function DefenseCapabilities() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Add dotted pattern to top-right corner */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4">
        <DottedPattern color="#000000" dotSize={1} spacing={25} opacity={0.05} />
      </div>

      <div className="container px-4">
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight text-center">Capabilities</h2>
          <p className="text-zinc-500 text-center">
            Our team brings together expertise in AI, mixed reality, and data visualization to deliver innovative
            solutions for defense and commercial applications.
          </p>
        </div>

        <motion.div style={{ opacity }} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="border border-zinc-200 p-6 bg-white">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center mr-4">
                  <Target className="h-5 w-5 text-zinc-900" />
                </div>
                <h3 className="font-medium">Technology Readiness</h3>
              </div>
              <p className="text-sm text-zinc-500 mb-4">
                <span className="font-medium">TRL 1</span>
              </p>
              <p className="text-sm text-zinc-500">
                At TRL 1, our proof-of-concept prototypes validate our innovative AI solution. We are focused on
                refining and scaling our technology for robust, real-world performance.
              </p>
            </div>

            <div className="border border-zinc-200 p-6 bg-white">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center mr-4">
                  <BarChart2 className="h-5 w-5 text-zinc-900" />
                </div>
                <h3 className="font-medium">Commercial Readiness</h3>
              </div>
              <p className="text-sm text-zinc-500 mb-4">
                <span className="font-medium">CFRL 1</span>
              </p>
              <p className="text-sm text-zinc-500">
                Our project has garnered early market traction through targeted customer interviews and idea validation,
                laying the foundation for scalable commercial success.
              </p>
            </div>

            <div className="border border-zinc-200 p-6 bg-white">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center mr-4">
                  <Lightbulb className="h-5 w-5 text-zinc-900" />
                </div>
                <h3 className="font-medium">Mission Funding Readiness</h3>
              </div>
              <p className="text-sm text-zinc-500 mb-4">
                <span className="font-medium">MFRL 1</span>
              </p>
              <p className="text-sm text-zinc-500">
                We pursue dual-use funding by targeting both commercial markets and mission-driven applications,
                exploring strategic partnerships and government grants for R&D.
              </p>
            </div>
          </div>

          <div className="border border-zinc-200 p-8 bg-white">
            <h3 className="text-xl font-medium mb-6">Core Competencies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex">
                <div className="mr-4 mt-1">
                  <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                    <Database className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Mixed Reality Development</h4>
                  <p className="text-sm text-zinc-500">
                    Creating immersive experiences that blend digital information with the physical world for enhanced
                    situational awareness.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 mt-1">
                  <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                    <Code className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">AI-Enhanced Analysis</h4>
                  <p className="text-sm text-zinc-500">
                    Leveraging artificial intelligence to process complex data streams and extract actionable insights.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 mt-1">
                  <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Multi-User Collaboration</h4>
                  <p className="text-sm text-zinc-500">
                    Enabling real-time collaboration across distributed teams for enhanced decision-making and
                    operational efficiency.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 mt-1">
                  <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Dual-Use Innovation</h4>
                  <p className="text-sm text-zinc-500">
                    Developing technologies with applications across both defense and commercial sectors for maximum
                    impact and sustainability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add dotted pattern to bottom-right corner */}
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4">
        <DottedPattern color="#000000" dotSize={1} spacing={25} opacity={0.05} />
      </div>
    </section>
  )
}
