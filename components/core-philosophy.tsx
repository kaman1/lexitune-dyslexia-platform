"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { DottedPattern } from "./ui/dotted-pattern";

export function CorePhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.6, 1, 1, 0.6]
  );

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="pt-16 pb-24 md:pb-32 bg-black relative overflow-hidden"
    >
      {/* Add dotted pattern to top-right corner */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4">
        <DottedPattern color="#ffffff" dotSize={1} spacing={25} opacity={0.1} />
      </div>
      


      <div className="container px-4 bg-black relative z-10">
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight text-center text-white">
            Our Mission and Vision
          </h2>
        </div>

        <motion.div style={{ opacity }} className="max-w-6xl mx-auto">
          {/* Core Beliefs */}
          <div className="mb-20 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="border-l-2 border-zinc-700 pl-4 py-1">
                  <h4 className="font-medium mb-2 text-white">
                    Our Mission
                  </h4>
                  <p className="text-sm text-zinc-300">
                    We believe that with the right tools, individuals with Dyslexia can unlock their unique strengths and thrive. Our mission is to create a world where Dyslexia is not a barrier to success, but a different way of thinking that can be harnessed for innovation and creativity.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-l-2 border-zinc-700 pl-4 py-1">
                  <h4 className="font-medium mb-2 text-white">
                    Our Vision
                  </h4>
                  <p className="text-sm text-zinc-300">
                    To be the leading provider of AI-powered tools and resources for individuals with Dyslexia, empowering them to reach their full potential in school, work, and life.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Callout */}
          {/* <div className="mb-20">
            <div className="bg-zinc-800/50 border border-zinc-700 p-8 text-center relative overflow-hidden">
              {/* Subtle pattern overlay */}
          {/* <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-8 w-12 h-12 bg-white rounded-full" />
                <div className="absolute bottom-6 left-12 w-8 h-8 bg-white rounded-full" />
                <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-white rounded-full" />
              </div>

              <div className="relative z-10">
                <blockquote className="text-lg md:text-xl text-white font-medium mb-4 leading-relaxed">
                  "Do you want to be a mentally lazy person who outsources
                  everything to machines, or would you rather be an independent
                  problem solver for whom the internet is just one useful tool?"
                </blockquote>
                <p className="text-zinc-300 text-sm">
                  <strong className="text-white">The choice is yours.</strong>
                </p>
              </div>
            </div>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
