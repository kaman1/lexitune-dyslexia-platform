"use client";

import { Shield, Zap } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function SplitHero() {
  const [videoError, setVideoError] = useState(false);

  return (
    <>
      <section className="relative h-[82.5vh] overflow-hidden">
        {/* Logo Stamp Background */}
        <div className="absolute top-10 right-10 z-5 opacity-10">
          <Image
            src="/tekimax-logomark-white.png"
            alt=""
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
        
        {/* Background */}
        <div className="absolute inset-0 z-0">
          {/* Fallback image - always visible */}
          <Image
            src="https://images.unsplash.com/photo-1625014053925-88bef4805a76?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Dyslexia STEAM education visualization"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          {/* Video overlay - only if no error */}
          {!videoError && (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setVideoError(true)}
              onLoadStart={() => console.log('Hero video loading started')}
              onCanPlay={() => console.log('Hero video can play')}
            >
              <source
                src="/video.mp4"
                type="video/mp4"
              />
            </video>
          )}

        </div>

        {/* Content container */}
        <div className="max-w-[1536px] mx-auto px-4 h-full relative z-20">
          <div className="flex flex-col h-full justify-end md:justify-center items-start pb-8 md:pt-16 text-left max-w-sm md:max-w-4xl ml-4 md:ml-8 lg:ml-12">
            {/* Main heading - no overlay */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 text-white text-left leading-tight animate-in fade-in slide-in-from-left duration-1000 delay-300">
              Empowering<br />Neurodivergent<br />Minds
            </h1>
                          <p className="mt-6 text-lg text-gray-200 max-w-3xl">
                Comprehensive support and adaptive learning tools for all neurodivergent learners - from ADHD and Autism to Dyslexia and beyond. Evidence-based strategies that celebrate cognitive differences and unlock potential.
              </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-in fade-in slide-in-from-left duration-1000 delay-700">
              <div className="flex flex-col">
                <a
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 hover:scale-105 hover:shadow-lg transition-all duration-300 rounded-xl transform"
                  style={{ backgroundColor: '#2563EB' }}
                >
                  Create Account
                </a>
                <p className="text-xs italic text-white/70 mt-2 transition-opacity duration-300 hover:text-white/90">
                  Beta only allows a limited pool of users
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Slider */}
      {/* <PartnersSlider /> */}
    </>
  );
}
