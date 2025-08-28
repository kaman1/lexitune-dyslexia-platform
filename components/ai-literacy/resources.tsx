"use client"

import type React from "react"

import { motion } from "framer-motion"
import { FileText, Book, Video, LinkIcon, Download, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Resource {
  title: string
  description: string
  link: string
  type: "article" | "guide" | "video" | "tool" | "template"
  icon: React.ReactNode
}

export function AiResources() {
  const resources: Resource[] = [
    {
      title: "Prompt Engineering Guide",
      description: "Learn how to craft effective prompts to get the best results from LLMs.",
      link: "#",
      type: "guide",
      icon: <Book className="h-5 w-5" />,
    },
    {
      title: "LLM Selection Framework",
      description: "A downloadable framework to help you select the right LLM for your specific business needs.",
      link: "#",
      type: "template",
      icon: <Download className="h-5 w-5" />,
    },
    {
      title: "Customer Interview Analysis Template",
      description: "A template for using LLMs to analyze customer interviews and extract actionable insights.",
      link: "#",
      type: "template",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "AI Implementation ROI Calculator",
      description: "Calculate the potential return on investment for implementing LLMs in your business.",
      link: "#",
      type: "tool",
      icon: <LinkIcon className="h-5 w-5" />,
    },
    {
      title: "LLM Security Best Practices",
      description: "Essential security considerations when implementing LLMs in your business.",
      link: "#",
      type: "article",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Video Tutorial: Getting Started with OpenAI API",
      description: "A step-by-step guide to setting up and using the OpenAI API for business applications.",
      link: "#",
      type: "video",
      icon: <Video className="h-5 w-5" />,
    },
  ]

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "article":
        return "Article"
      case "guide":
        return "Guide"
      case "video":
        return "Video"
      case "tool":
        return "Tool"
      case "template":
        return "Template"
      default:
        return type
    }
  }

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight text-center">Resources & Tools</h2>
          <p className="text-zinc-600 mb-12 text-center">
            Access practical resources to help you implement LLMs effectively in your business.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border border-zinc-200 p-6 hover:border-zinc-300 transition-colors"
              >
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center mr-4 flex-shrink-0">
                    {resource.icon}
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="font-medium">{resource.title}</h3>
                      <span className="ml-2 text-xs bg-zinc-100 px-2 py-0.5">{getTypeLabel(resource.type)}</span>
                    </div>
                    <p className="text-sm text-zinc-600 mb-4">{resource.description}</p>
                    <Link href={resource.link} className="text-sm font-medium flex items-center hover:underline">
                      Access Resource <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-zinc-600 mb-4">Need personalized guidance on implementing LLMs in your business?</p>
            <Link
              href="#"
              className="inline-flex items-center justify-center bg-black text-white px-6 py-3 font-medium text-sm hover:bg-zinc-800 transition-colors"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
