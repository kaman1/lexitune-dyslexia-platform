"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Brain, Lightbulb, AlertCircle } from "lucide-react"

export function AiLiteracyIntro() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="container px-4">
        <motion.div style={{ opacity }} className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight text-center">
            Understanding Large Language Models
          </h2>
          <p className="text-zinc-600 mb-12 text-center">
            Large Language Models (LLMs) are AI systems trained on vast amounts of text data, enabling them to
            understand, generate, and manipulate human language. For businesses, they represent a transformative
            technology that can augment human capabilities across virtually every department and function.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center mr-4">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-medium">What Makes LLMs Powerful</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-3 mt-1 text-black">•</div>
                  <div>
                    <p className="font-medium">Pattern Recognition</p>
                    <p className="text-sm text-zinc-600">
                      LLMs excel at identifying patterns in text data, enabling them to extract insights from customer
                      feedback, market research, and internal communications.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-3 mt-1 text-black">•</div>
                  <div>
                    <p className="font-medium">Content Generation</p>
                    <p className="text-sm text-zinc-600">
                      From marketing copy to technical documentation, LLMs can generate high-quality content that
                      matches your brand voice and meets specific requirements.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-3 mt-1 text-black">•</div>
                  <div>
                    <p className="font-medium">Language Understanding</p>
                    <p className="text-sm text-zinc-600">
                      LLMs can interpret complex queries, summarize lengthy documents, and extract key information from
                      unstructured text data.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center mr-4">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-medium">Business Relevance</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-3 mt-1 text-black">•</div>
                  <div>
                    <p className="font-medium">Efficiency & Automation</p>
                    <p className="text-sm text-zinc-600">
                      Automate routine tasks like email responses, report generation, and data analysis, freeing up
                      human resources for higher-value activities.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-3 mt-1 text-black">•</div>
                  <div>
                    <p className="font-medium">Enhanced Decision-Making</p>
                    <p className="text-sm text-zinc-600">
                      Analyze large volumes of data to identify trends, generate insights, and support more informed
                      business decisions.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-3 mt-1 text-black">•</div>
                  <div>
                    <p className="font-medium">Competitive Advantage</p>
                    <p className="text-sm text-zinc-600">
                      Organizations that effectively implement LLMs can respond more quickly to market changes, customer
                      needs, and emerging opportunities.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border border-zinc-200 p-6 bg-zinc-50">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-5 w-5 mr-3 text-black" />
              <h4 className="font-medium">Key Considerations</h4>
            </div>
            <p className="text-sm text-zinc-600 mb-4">
              While powerful, LLMs have important limitations and considerations that businesses should understand:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-2 border-black pl-4 py-1">
                <p className="text-sm font-medium">Data Privacy & Security</p>
                <p className="text-xs text-zinc-500">
                  Consider what data you share with LLMs and ensure compliance with privacy regulations.
                </p>
              </div>
              <div className="border-l-2 border-black pl-4 py-1">
                <p className="text-sm font-medium">Hallucinations & Accuracy</p>
                <p className="text-xs text-zinc-500">
                  LLMs can generate plausible-sounding but incorrect information. Verification is essential.
                </p>
              </div>
              <div className="border-l-2 border-black pl-4 py-1">
                <p className="text-sm font-medium">Human Oversight</p>
                <p className="text-xs text-zinc-500">
                  LLMs work best as tools that augment human capabilities, not as complete replacements.
                </p>
              </div>
              <div className="border-l-2 border-black pl-4 py-1">
                <p className="text-sm font-medium">Cost Considerations</p>
                <p className="text-xs text-zinc-500">
                  Balance the benefits of LLM implementation against costs, especially for high-volume applications.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
