"use client"

import { motion } from "framer-motion"
import { Shield, Award, Zap } from "lucide-react"
import { DottedPattern } from "../ui/dotted-pattern"

export function DefenseHero() {
  return (
    <section className="bg-zinc-900 text-white py-24 md:py-32 relative overflow-hidden">
      {/* Add dotted pattern to top-right corner */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3">
        <DottedPattern color="#ffffff" dotSize={1.5} spacing={25} opacity={0.15} />
      </div>

      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-medium mb-6 tracking-tight">Defense Contracting</h1>
            <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
              Delivering innovative dual-use technologies that enhance mission capabilities and drive commercial
              success.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="border border-zinc-800 p-6 bg-zinc-800/50 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-zinc-700 flex items-center justify-center mr-3">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-medium">Defense Credentials</h3>
              </div>
              <p className="text-zinc-400 text-sm mb-4">
                UEI: MKHHA23AJ9S8
                <br />
                CAGE/NCAGE: 7CCP2
              </p>
            </div>

            <div className="border border-zinc-800 p-6 bg-zinc-800/50 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-zinc-700 flex items-center justify-center mr-3">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-medium">SBIR Experience</h3>
              </div>
              <p className="text-zinc-400 text-sm mb-4">
                Proven track record in SBIR Phase I contracts with successful implementation of innovative solutions.
              </p>
            </div>

            <div className="border border-zinc-800 p-6 bg-zinc-800/50 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-zinc-700 flex items-center justify-center mr-3">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-medium">Dual-Use Focus</h3>
              </div>
              <p className="text-zinc-400 text-sm mb-4">
                Developing technologies with applications across both defense and commercial sectors for maximum impact.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add dotted pattern to bottom-left corner */}
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4">
        <DottedPattern color="#ffffff" dotSize={1.5} spacing={25} opacity={0.15} />
      </div>
    </section>
  )
}
