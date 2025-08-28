"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Search, FileText, BarChart2, Users, Mail, Briefcase, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import { DottedPattern } from "../ui/dotted-pattern"

type ApplicationCategory = "customer" | "marketing" | "operations" | "product" | "hr" | "strategy"

interface Application {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: ApplicationCategory
  example: string
  implementation: string
}

export function AiApplications() {
  const [activeCategory, setActiveCategory] = useState<ApplicationCategory | "all">("all")

  const categories = [
    { id: "all", label: "All Applications", icon: <Briefcase className="h-4 w-4" /> },
    { id: "customer", label: "Customer Discovery", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "marketing", label: "Marketing & Sales", icon: <Mail className="h-4 w-4" /> },
    { id: "operations", label: "Operations", icon: <BarChart2 className="h-4 w-4" /> },
    { id: "product", label: "Product Development", icon: <Lightbulb className="h-4 w-4" /> },
    { id: "hr", label: "HR & Training", icon: <Users className="h-4 w-4" /> },
    { id: "strategy", label: "Strategy & Planning", icon: <FileText className="h-4 w-4" /> },
  ]

  const applications: Application[] = [
    {
      id: "customer-interviews",
      title: "Customer Interview Analysis",
      description: "Analyze customer interview transcripts to identify patterns, pain points, and opportunities.",
      icon: <MessageSquare className="h-5 w-5 text-white" />,
      category: "customer",
      example: "Analyzing 50+ customer interviews to identify common pain points and feature requests.",
      implementation:
        "Upload interview transcripts to an LLM and prompt it to categorize feedback, identify themes, and extract actionable insights.",
    },
    {
      id: "market-research",
      title: "Market Research Synthesis",
      description: "Synthesize large volumes of market research data to identify trends and opportunities.",
      icon: <Search className="h-5 w-5 text-white" />,
      category: "customer",
      example: "Analyzing competitor websites, product reviews, and industry reports to identify market gaps.",
      implementation:
        "Feed market research documents to an LLM and ask it to summarize key findings, compare competitors, and identify potential opportunities.",
    },
    {
      id: "content-creation",
      title: "Marketing Content Creation",
      description: "Generate marketing copy, social media posts, and email campaigns tailored to your brand voice.",
      icon: <Mail className="h-5 w-5 text-white" />,
      category: "marketing",
      example: "Creating a series of email nurture campaigns for different customer segments.",
      implementation:
        "Provide the LLM with your brand guidelines, target audience information, and specific campaign goals to generate draft content.",
    },
    {
      id: "data-analysis",
      title: "Business Data Analysis",
      description: "Extract insights from business data and generate reports with actionable recommendations.",
      icon: <BarChart2 className="h-5 w-5 text-white" />,
      category: "operations",
      example: "Analyzing quarterly sales data to identify trends and recommend inventory adjustments.",
      implementation: "Provide structured data to the LLM along with specific questions or analysis goals.",
    },
    {
      id: "product-specs",
      title: "Product Specification Development",
      description: "Generate detailed product specifications based on customer requirements and market research.",
      icon: <FileText className="h-5 w-5 text-white" />,
      category: "product",
      example: "Creating detailed feature specifications for a new software product based on customer feedback.",
      implementation:
        "Feed customer requirements and market research to the LLM and ask it to generate structured product specifications.",
    },
    {
      id: "training-materials",
      title: "Training Material Creation",
      description: "Develop customized training materials and learning resources for employees.",
      icon: <Users className="h-5 w-5 text-white" />,
      category: "hr",
      example: "Creating role-specific onboarding materials for new hires across different departments.",
      implementation:
        "Provide the LLM with learning objectives, existing materials, and target audience information to generate tailored training content.",
    },
    {
      id: "strategic-planning",
      title: "Strategic Planning Support",
      description: "Generate strategic options and evaluate potential scenarios based on business data.",
      icon: <Briefcase className="h-5 w-5 text-white" />,
      category: "strategy",
      example: "Developing a 3-year growth strategy with multiple scenarios based on market conditions.",
      implementation:
        "Feed the LLM with market data, company information, and strategic objectives to generate strategic options and evaluation frameworks.",
    },
    {
      id: "customer-segmentation",
      title: "Customer Segmentation",
      description:
        "Analyze customer data to identify meaningful segments for targeted marketing and product development.",
      icon: <Users className="h-5 w-5 text-white" />,
      category: "customer",
      example: "Identifying 5 distinct customer segments based on behavior, needs, and value to the business.",
      implementation:
        "Provide customer data to the LLM and ask it to identify patterns and create meaningful segment profiles.",
    },
  ]

  const filteredApplications =
    activeCategory === "all" ? applications : applications.filter((app) => app.category === activeCategory)

  return (
    <section id="applications" className="py-24 md:py-32 bg-zinc-50 relative overflow-hidden">
      {/* Add dotted pattern to top-right corner */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4">
        <DottedPattern color="#000000" dotSize={1} spacing={25} opacity={0.05} />
      </div>

      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight text-center">
            Business Applications of LLMs
          </h2>
          <p className="text-zinc-600 mb-12 text-center">
            Large Language Models can be applied across virtually every business function. Explore specific applications
            below to understand how LLMs can transform your operations.
          </p>

          {/* Category Filter */}
          <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 md:justify-center">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as ApplicationCategory | "all")}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full",
                    activeCategory === category.id
                      ? "bg-black text-white"
                      : "bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-100",
                  )}
                >
                  {category.icon}
                  <span className="ml-2">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Applications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredApplications.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border border-zinc-200 bg-white overflow-hidden relative"
              >
                {/* Add dotted pattern to bottom-right corner for even items */}
                {index % 2 === 0 && (
                  <div className="absolute bottom-0 right-0 w-1/3 h-1/3">
                    <DottedPattern color="#000000" dotSize={1} spacing={15} opacity={0.05} />
                  </div>
                )}

                {/* Add dotted pattern to top-left corner for odd items */}
                {index % 2 === 1 && (
                  <div className="absolute top-0 left-0 w-1/3 h-1/3">
                    <DottedPattern color="#000000" dotSize={1} spacing={15} opacity={0.05} />
                  </div>
                )}

                <div className="flex">
                  {/* Left side - Color bar (2%) */}
                  <div className="w-[2%] bg-black">
                    <div className="h-full flex items-center justify-center p-2">{app.icon}</div>
                  </div>

                  {/* Right side - Content (98%) */}
                  <div className="p-6 flex-1">
                    <h3 className="text-lg font-medium mb-2">{app.title}</h3>
                    <p className="text-sm text-zinc-600 mb-4">{app.description}</p>

                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="text-xs font-medium text-zinc-900">EXAMPLE</p>
                        <p className="text-xs text-zinc-500">{app.example}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-zinc-900">IMPLEMENTATION</p>
                        <p className="text-xs text-zinc-500">{app.implementation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
