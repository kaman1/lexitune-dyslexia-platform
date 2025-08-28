"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function AiLiteracyHero() {
  return (
    <section className="bg-zinc-900 text-white py-24 md:py-32">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl md:text-5xl font-medium mb-6 tracking-tight">AI Literacy for Business</h1>
            <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
              Harness the power of Large Language Models to transform your business operations, enhance customer
              discovery, and drive innovation regardless of your organization's size.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="#applications"
              className="bg-white text-black px-6 py-3 font-medium text-sm hover:bg-zinc-100 transition-colors"
            >
              Explore Applications
            </Link>
            <Link
              href="#implementation"
              className="border border-white px-6 py-3 font-medium text-sm hover:bg-white/10 transition-colors"
            >
              Implementation Guide
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="border border-zinc-800 p-6 bg-zinc-800/50">
              <h3 className="text-lg font-medium mb-3">For Entrepreneurs</h3>
              <p className="text-zinc-400 text-sm mb-4">
                Leverage AI to compete with larger organizations and automate tasks that would otherwise require a team.
              </p>
              <Link href="#entrepreneurs" className="text-sm text-white flex items-center hover:underline">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="border border-zinc-800 p-6 bg-zinc-800/50">
              <h3 className="text-lg font-medium mb-3">For Small Businesses</h3>
              <p className="text-zinc-400 text-sm mb-4">
                Implement cost-effective AI solutions to enhance customer service, marketing, and operational
                efficiency.
              </p>
              <Link href="#small-business" className="text-sm text-white flex items-center hover:underline">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="border border-zinc-800 p-6 bg-zinc-800/50">
              <h3 className="text-lg font-medium mb-3">For Large Organizations</h3>
              <p className="text-zinc-400 text-sm mb-4">
                Scale AI implementation across departments to drive innovation, improve decision-making, and maintain
                competitive advantage.
              </p>
              <Link href="#enterprise" className="text-sm text-white flex items-center hover:underline">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
