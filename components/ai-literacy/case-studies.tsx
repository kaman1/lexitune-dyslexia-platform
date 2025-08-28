"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface CaseStudy {
  id: string
  title: string
  company: string
  businessSize: "entrepreneur" | "smb" | "enterprise"
  challenge: string
  solution: string
  results: string[]
  industry: string
}

export function AiCaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0)

  const caseStudies: CaseStudy[] = [
    {
      id: "cs1",
      title: "Streamlining Customer Discovery for Product Development",
      company: "TechStart",
      businessSize: "entrepreneur",
      industry: "SaaS",
      challenge:
        "As a solo founder, TechStart's CEO struggled to efficiently analyze customer interviews to inform product development decisions.",
      solution:
        "Implemented an LLM-powered workflow to transcribe, analyze, and extract insights from customer interviews, automatically categorizing feedback and identifying patterns.",
      results: [
        "Reduced analysis time from 10+ hours to under 2 hours per week",
        "Identified 3 critical feature priorities that had been overlooked",
        "Accelerated product development cycle by 40%",
      ],
    },
    {
      id: "cs2",
      title: "Enhancing Marketing Content Creation and Personalization",
      company: "GrowthRetail",
      businessSize: "smb",
      industry: "E-commerce",
      challenge:
        "GrowthRetail struggled to create personalized marketing content for different customer segments with their limited marketing team.",
      solution:
        "Deployed LLMs to generate segment-specific email campaigns, product descriptions, and social media content based on customer data and brand guidelines.",
      results: [
        "Increased email open rates by 35% and click-through rates by 28%",
        "Reduced content creation time by 60%",
        "Enabled personalization across 5 distinct customer segments",
      ],
    },
    {
      id: "cs3",
      title: "Transforming Customer Support with AI-Powered Analysis",
      company: "ServiceCorp",
      businessSize: "enterprise",
      industry: "Financial Services",
      challenge:
        "ServiceCorp needed to improve customer satisfaction and reduce support costs across their global operation with thousands of daily support interactions.",
      solution:
        "Implemented an LLM system to analyze support tickets, identify common issues, suggest solutions, and provide insights for product improvements.",
      results: [
        "Reduced average resolution time by 45%",
        "Identified and addressed top 10 recurring issues, reducing related tickets by 60%",
        "Improved customer satisfaction scores from 7.2 to 8.9",
      ],
    },
    {
      id: "cs4",
      title: "Accelerating Market Research for Strategic Decision-Making",
      company: "ConsultPro",
      businessSize: "smb",
      industry: "Consulting",
      challenge:
        "ConsultPro's small team struggled to efficiently analyze large volumes of market research to provide timely strategic recommendations to clients.",
      solution:
        "Leveraged LLMs to synthesize industry reports, competitor analysis, and market trends into actionable insights and strategic recommendations.",
      results: [
        "Reduced research synthesis time by 70%",
        "Expanded service offerings to include rapid market analysis",
        "Increased client retention rate by 25% due to faster, more comprehensive insights",
      ],
    },
  ]

  const nextCase = () => {
    setActiveIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1))
  }

  const prevCase = () => {
    setActiveIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1))
  }

  const activeCase = caseStudies[activeIndex]

  const getBusinessSizeLabel = (size: string) => {
    switch (size) {
      case "entrepreneur":
        return "Entrepreneur"
      case "smb":
        return "Small Business"
      case "enterprise":
        return "Enterprise"
      default:
        return size
    }
  }

  return (
    <section className="py-24 md:py-32 bg-zinc-50">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight text-center">
            Real-World Success Stories
          </h2>
          <p className="text-zinc-600 mb-12 text-center">
            Explore how organizations of different sizes have successfully implemented LLMs to address specific business
            challenges.
          </p>

          <div className="relative">
            <div className="border border-zinc-200 bg-white p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">{activeCase.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block bg-zinc-100 px-2 py-1 text-xs font-medium">{activeCase.company}</span>
                    <span className="inline-block bg-zinc-100 px-2 py-1 text-xs font-medium">
                      {activeCase.industry}
                    </span>
                    <span className="inline-block bg-zinc-100 px-2 py-1 text-xs font-medium">
                      {getBusinessSizeLabel(activeCase.businessSize)}
                    </span>
                  </div>
                </div>
                <div className="flex mt-4 md:mt-0">
                  <button
                    onClick={prevCase}
                    className="h-8 w-8 flex items-center justify-center border border-zinc-200 mr-2 hover:bg-zinc-50"
                    aria-label="Previous case study"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextCase}
                    className="h-8 w-8 flex items-center justify-center border border-zinc-200 hover:bg-zinc-50"
                    aria-label="Next case study"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-l-2 border-black pl-4 py-1">
                  <h4 className="font-medium mb-2">Challenge</h4>
                  <p className="text-sm text-zinc-600">{activeCase.challenge}</p>
                </div>
                <div className="border-l-2 border-black pl-4 py-1">
                  <h4 className="font-medium mb-2">Solution</h4>
                  <p className="text-sm text-zinc-600">{activeCase.solution}</p>
                </div>
                <div className="border-l-2 border-black pl-4 py-1">
                  <h4 className="font-medium mb-2">Results</h4>
                  <ul className="text-sm text-zinc-600 space-y-2">
                    {activeCase.results.map((result, index) => (
                      <li key={index} className="flex">
                        <span className="text-black mr-2">•</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn("h-2 w-2 rounded-full mx-1", index === activeIndex ? "bg-black" : "bg-zinc-300")}
                  aria-label={`Go to case study ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
