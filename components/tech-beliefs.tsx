"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Database, Code, Lightbulb, Target, BarChart2, Users } from "lucide-react"
import { DottedPattern } from "./ui/dotted-pattern"

export function TechBeliefs() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  return (
    <section id="tech-beliefs" ref={sectionRef} className="py-24 md:py-32 bg-zinc-50 relative overflow-hidden">
      {/* Add dotted pattern to top-right corner */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4">
        <DottedPattern color="#000000" dotSize={1} spacing={25} opacity={0.05} />
      </div>

      <div className="container px-4">
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight text-center">Tech & Beliefs</h2>
          <p className="text-zinc-500 text-center">
            Our technology and philosophy are built on the belief that better data leads to better decisions, and that
            combining human intuition with AI creates outcomes greater than either could achieve alone.
          </p>
        </div>

        <motion.div style={{ opacity }} className="max-w-4xl mx-auto">
          {/* Pain Points */}
          <div className="mb-20">
            <div className="flex items-center mb-8">
              <div className="flex-grow h-px bg-zinc-200"></div>
              <h3 className="text-xl font-medium px-4">The Problems We Solve</h3>
              <div className="flex-grow h-px bg-zinc-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex">
                <div className="mr-4 mt-1">
                  <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Misaligned Initiatives</h4>
                  <p className="text-sm text-zinc-500">
                    Organizations waste resources on projects that don't address real customer needs or align with
                    strategic goals.
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
                  <h4 className="font-medium mb-2">Ineffective Discovery</h4>
                  <p className="text-sm text-zinc-500">
                    Teams lack the skills and structured processes needed to conduct effective customer interviews.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 mt-1">
                  <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                    <BarChart2 className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Decision Paralysis</h4>
                  <p className="text-sm text-zinc-500">
                    Leadership struggles to make confident decisions without clear, data-driven insights.
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
                  <h4 className="font-medium mb-2">Insight Isolation</h4>
                  <p className="text-sm text-zinc-500">
                    Valuable customer insights remain siloed within teams instead of informing organization-wide
                    strategy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technology */}
          <div className="mb-20 relative">
            {/* Add dotted pattern to bottom-right corner */}
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3">
              <DottedPattern color="#000000" dotSize={1} spacing={20} opacity={0.05} />
            </div>

            <div className="flex items-center mb-8">
              <div className="flex-grow h-px bg-zinc-200 border-dashed border-t border-zinc-300"></div>
              <h3 className="text-xl font-medium px-4">Our Technology</h3>
              <div className="flex-grow h-px bg-zinc-200 border-dashed border-t border-zinc-300"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center mb-4">
                  <Database className="h-5 w-5 mr-2" />
                  <h4 className="font-medium">Data Architecture</h4>
                </div>
                <p className="text-sm text-zinc-500 mb-4">
                  Our platform is built on a secure, scalable data architecture that centralizes customer insights while
                  maintaining strict privacy controls.
                </p>
                <ul className="text-sm text-zinc-500 space-y-2">
                  <li>• Centralized insight repository</li>
                  <li>• Structured and unstructured data analysis</li>
                  <li>• Enterprise-grade security</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Code className="h-5 w-5 mr-2" />
                  <h4 className="font-medium">AI Integration</h4>
                </div>
                <p className="text-sm text-zinc-500 mb-4">
                  We leverage advanced language models to analyze customer interviews, identify patterns, and generate
                  actionable insights.
                </p>
                <ul className="text-sm text-zinc-500 space-y-2">
                  <li>• Natural language processing</li>
                  <li>• Sentiment and intent analysis</li>
                  <li>• Pattern recognition across datasets</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Core Beliefs */}
          <div className="relative">
            {/* Add dotted pattern to bottom-left corner */}
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3">
              <DottedPattern color="#000000" dotSize={1} spacing={20} opacity={0.05} />
            </div>

            <div className="flex items-center mb-8">
              <div className="flex-grow h-px bg-zinc-200 border-dotted border-t-2 border-zinc-300"></div>
              <h3 className="text-xl font-medium px-4">Core Beliefs</h3>
              <div className="flex-grow h-px bg-zinc-200 border-dotted border-t-2 border-zinc-300"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="border-l-2 border-black pl-4 py-1">
                  <h4 className="font-medium mb-2">Human-AI Synergy</h4>
                  <p className="text-sm text-zinc-500">
                    We believe the most powerful outcomes come from combining human intuition, creativity, and empathy
                    with AI's analytical capabilities.
                  </p>
                </div>

                <div className="border-l-2 border-black pl-4 py-1">
                  <h4 className="font-medium mb-2">Data-Driven Decisions</h4>
                  <p className="text-sm text-zinc-500">
                    Strategic decisions should be based on validated insights rather than assumptions or hierarchical
                    authority.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-l-2 border-black pl-4 py-1">
                  <h4 className="font-medium mb-2">Democratized Insights</h4>
                  <p className="text-sm text-zinc-500">
                    Customer insights should be accessible across the organization, not siloed within specific teams or
                    departments.
                  </p>
                </div>

                <div className="border-l-2 border-black pl-4 py-1">
                  <h4 className="font-medium mb-2">Public Good</h4>
                  <p className="text-sm text-zinc-500">
                    The power of data-driven decision making should be available to public sector and non-profit
                    organizations, not just commercial enterprises.
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
