"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FaqItem {
  question: string
  answer: string
}

export function AiLiteracyFaq() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const toggleQuestion = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null)
    } else {
      setExpandedIndex(index)
    }
  }

  const faqItems: FaqItem[] = [
    {
      question: "What's the difference between general-purpose LLMs and specialized models?",
      answer:
        "General-purpose LLMs like GPT-4 or Claude are trained on diverse data and can handle a wide range of tasks, from writing to analysis to creative work. Specialized models are fine-tuned for specific domains or tasks, such as legal document analysis or medical information. General-purpose models offer flexibility, while specialized models typically provide better performance for their specific use case but with less versatility.",
    },
    {
      question: "How much technical expertise do we need to implement LLMs?",
      answer:
        "The required technical expertise varies based on your implementation approach. No-code solutions like ChatGPT or Claude interfaces require minimal technical knowledge. API integrations require basic programming skills. Custom implementations with fine-tuning or complex integrations require more advanced AI/ML expertise. Many businesses start with simpler implementations and gradually build technical capabilities as they expand their LLM usage.",
    },
    {
      question: "What are the data privacy considerations when using LLMs?",
      answer:
        "Key data privacy considerations include: 1) Understanding how LLM providers use your data for training, 2) Being cautious about sharing sensitive or proprietary information, 3) Ensuring compliance with regulations like GDPR or HIPAA, 4) Implementing proper access controls for LLM tools, and 5) Considering on-premises or private cloud deployments for highly sensitive applications. Always review the privacy policies of LLM providers and consider data residency requirements.",
    },
    {
      question: "How do we measure the ROI of implementing LLMs?",
      answer:
        "Measure ROI by tracking: 1) Time savings (hours saved × hourly cost), 2) Quality improvements (error reduction, consistency), 3) Revenue impact (increased conversion rates, customer satisfaction), 4) Cost reduction (reduced headcount needs, operational efficiencies), and 5) Innovation metrics (new products/features enabled). Establish baseline metrics before implementation and track changes over time. Both quantitative and qualitative measures should be considered.",
    },
    {
      question: "What are the limitations of current LLM technology?",
      answer:
        "Current LLMs have several limitations: 1) They can generate plausible-sounding but incorrect information (hallucinations), 2) They have limited reasoning capabilities for complex logical problems, 3) Their knowledge is limited to their training data cutoff date, 4) They lack true understanding of context beyond statistical patterns, 5) They can exhibit biases present in training data, and 6) They have limited ability to perform complex mathematical calculations. Understanding these limitations is crucial for responsible implementation.",
    },
    {
      question: "How can small businesses compete with larger organizations in LLM implementation?",
      answer:
        "Small businesses can compete by: 1) Focusing on specific, high-impact use cases rather than broad implementation, 2) Leveraging no-code/low-code platforms that require less technical expertise, 3) Starting with pre-built solutions tailored to their industry, 4) Joining communities and open-source initiatives to access shared resources, and 5) Emphasizing agility and quick iteration that larger organizations might struggle with. The democratization of AI tools has significantly reduced the barriers to entry.",
    },
  ]

  return (
    <section className="py-24 md:py-32 bg-zinc-50">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-600 mb-12 text-center">
            Get answers to common questions about implementing LLMs in business contexts.
          </p>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-zinc-200 bg-white">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <h3 className="font-medium pr-8">{item.question}</h3>
                  {expandedIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-zinc-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-zinc-400 flex-shrink-0" />
                  )}
                </button>

                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="pt-2 border-t border-zinc-200">
                      <p className="text-zinc-600">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-zinc-600">Have more questions? We're here to help.</p>
            <div className="mt-4">
              <a href="mailto:info@tekimax.com" className="text-black font-medium hover:underline">
                Contact our AI literacy team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
