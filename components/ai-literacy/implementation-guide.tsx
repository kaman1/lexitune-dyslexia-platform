"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImplementationStep {
  id: string
  title: string
  description: string
  details: string[]
  tips: string[]
}

export function AiImplementationGuide() {
  const [expandedStep, setExpandedStep] = useState<string | null>("assess")

  const toggleStep = (stepId: string) => {
    if (expandedStep === stepId) {
      setExpandedStep(null)
    } else {
      setExpandedStep(stepId)
    }
  }

  const implementationSteps: ImplementationStep[] = [
    {
      id: "assess",
      title: "1. Assess Your Needs",
      description: "Identify specific business challenges that LLMs could help address.",
      details: [
        "Conduct an audit of current processes that involve text-based tasks or decision-making.",
        "Identify pain points where automation or enhanced analysis could provide value.",
        "Prioritize potential applications based on business impact and implementation feasibility.",
      ],
      tips: [
        "Start with processes that are time-consuming but don't require complex judgment.",
        "Consider both customer-facing and internal applications.",
        "Involve stakeholders from different departments to identify diverse use cases.",
      ],
    },
    {
      id: "select",
      title: "2. Select the Right Tools",
      description: "Choose appropriate LLM platforms and tools based on your specific requirements.",
      details: [
        "Evaluate different LLM providers (OpenAI, Anthropic, Google, etc.) based on capabilities, pricing, and integration options.",
        "Consider whether you need general-purpose LLMs or specialized models for specific tasks.",
        "Assess whether you need direct API access or if no-code/low-code platforms would be sufficient.",
      ],
      tips: [
        "Start with established platforms that offer good documentation and support.",
        "Consider data privacy requirements when selecting providers.",
        "Look for platforms that offer transparent pricing based on your expected usage patterns.",
      ],
    },
    {
      id: "pilot",
      title: "3. Run a Pilot Project",
      description: "Implement a small-scale pilot to test the effectiveness of LLMs for your specific use case.",
      details: [
        "Select a well-defined, limited-scope use case for your initial implementation.",
        "Establish clear success metrics to evaluate the pilot's effectiveness.",
        "Document the implementation process, challenges, and solutions for future reference.",
      ],
      tips: [
        "Choose a use case that can demonstrate quick wins and tangible value.",
        "Involve end-users in the pilot to gather feedback on usability and effectiveness.",
        "Be prepared to iterate based on initial results and feedback.",
      ],
    },
    {
      id: "integrate",
      title: "4. Integrate with Existing Systems",
      description: "Connect LLM capabilities with your existing business systems and workflows.",
      details: [
        "Identify integration points between LLMs and your current tech stack.",
        "Develop APIs or use existing connectors to facilitate data flow between systems.",
        "Ensure proper data handling and security measures throughout the integration process.",
      ],
      tips: [
        "Leverage existing APIs and integration platforms when possible.",
        "Consider implementing a middleware layer for more complex integrations.",
        "Document all integration points for future maintenance and troubleshooting.",
      ],
    },
    {
      id: "train",
      title: "5. Train Your Team",
      description: "Ensure your team understands how to effectively work with and leverage LLM capabilities.",
      details: [
        "Develop role-specific training materials for different user groups.",
        "Provide hands-on training sessions for direct users of the LLM tools.",
        "Create guidelines for prompt engineering and effective LLM interaction.",
      ],
      tips: [
        "Focus on practical, job-relevant applications rather than technical details.",
        "Create a repository of effective prompts and use cases for reference.",
        "Designate LLM champions within teams to provide ongoing support and guidance.",
      ],
    },
    {
      id: "monitor",
      title: "6. Monitor, Evaluate, and Iterate",
      description: "Continuously assess performance and refine your LLM implementation.",
      details: [
        "Establish ongoing monitoring of LLM outputs for quality and accuracy.",
        "Collect user feedback to identify improvement opportunities.",
        "Track key performance indicators to quantify business impact.",
      ],
      tips: [
        "Implement a systematic feedback loop for continuous improvement.",
        "Regularly review and update prompts based on performance data.",
        "Stay informed about new LLM capabilities and features that could enhance your implementation.",
      ],
    },
  ]

  return (
    <section id="implementation" className="py-24 md:py-32 bg-white">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight text-center">Implementation Guide</h2>
          <p className="text-zinc-600 mb-12 text-center">
            Successfully implementing LLMs in your business requires a structured approach. Follow this step-by-step
            guide to ensure effective adoption and maximize value.
          </p>

          <div className="space-y-4">
            {implementationSteps.map((step) => (
              <div key={step.id} className="border border-zinc-200">
                <button
                  onClick={() => toggleStep(step.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center mr-4",
                        expandedStep === step.id ? "bg-black text-white" : "bg-zinc-100 text-black",
                      )}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-zinc-600">{step.description}</p>
                    </div>
                  </div>
                  {expandedStep === step.id ? (
                    <ChevronUp className="h-5 w-5 text-zinc-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-zinc-400" />
                  )}
                </button>

                {expandedStep === step.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="pt-4 border-t border-zinc-200">
                      <h4 className="text-sm font-medium mb-3">Key Actions</h4>
                      <ul className="space-y-2 mb-6">
                        {step.details.map((detail, index) => (
                          <li key={index} className="flex text-sm">
                            <span className="text-black mr-2">•</span>
                            <span className="text-zinc-600">{detail}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="bg-zinc-50 p-4 rounded-sm">
                        <h4 className="text-sm font-medium mb-3">Pro Tips</h4>
                        <ul className="space-y-2">
                          {step.tips.map((tip, index) => (
                            <li key={index} className="flex text-sm">
                              <span className="text-black mr-2">•</span>
                              <span className="text-zinc-600">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
