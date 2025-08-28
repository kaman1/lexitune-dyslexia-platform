"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function PitchSlide1() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <Image
          src="https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/vmby46tevqgow4x9b48u"
          alt="Tekimax Logo"
          width={240}
          height={60}
          className="h-16 w-auto"
        />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl md:text-6xl font-medium mb-8 tracking-tight"
      >
        Better Decisions <br /> Through Data
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-xl text-zinc-600 max-w-2xl"
      >
        Transforming how organizations make strategic decisions by combining
        human intuition with AI-powered analysis
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 text-sm text-zinc-400"
      >
        Confidential Investor Presentation | 2025
      </motion.div>
    </div>
  );
}
