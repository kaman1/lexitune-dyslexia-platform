"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { PitchSlide1 } from "@/components/pitch/slide-1";
import { PitchSlide2 } from "@/components/pitch/slide-2";
import { PitchSlide3 } from "@/components/pitch/slide-3";
import { PitchSlide4 } from "@/components/pitch/slide-4";
import { PitchSlide5 } from "@/components/pitch/slide-5";
import { PitchSlide6 } from "@/components/pitch/slide-6";
import { PitchSlide7 } from "@/components/pitch/slide-7";
import { PitchSlide8 } from "@/components/pitch/slide-8";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check authentication on component mount
  useEffect(() => {
    const auth = sessionStorage.getItem("pitchAuth");
    if (auth !== "true") {
      router.push("/pitch/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const slides = [
    <PitchSlide1 key="slide-1" />,
    <PitchSlide2 key="slide-2" />,
    <PitchSlide3 key="slide-3" />,
    <PitchSlide4 key="slide-4" />,
    <PitchSlide5 key="slide-5" />,
    <PitchSlide6 key="slide-6" />,
    <PitchSlide7 key="slide-7" />,
    <PitchSlide8 key="slide-8" />,
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("pitchAuth");
    router.push("/pitch/login");
  };

  if (!isAuthenticated) {
    return null; // Don't render anything until authentication is checked
  }

  // Calculate progress percentage
  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="bg-white min-h-screen flex flex-col relative overflow-hidden">
      {/* Bottom left pattern */}
      <div className="absolute bottom-20 left-0 w-80 h-60 overflow-hidden z-0">
        <div className="relative w-full h-full">
          {/* Square elements */}
          <div className="absolute bottom-4 left-24 w-16 h-16 bg-gray-200 opacity-80" />
          <div className="absolute bottom-20 left-40 w-14 h-14 bg-gray-200 opacity-70" />
          <div className="absolute bottom-28 left-8 w-12 h-12 bg-gray-300 opacity-60" />
        </div>
      </div>

      {/* Top right pattern */}
      <div className="absolute top-20 right-0 w-80 h-60 overflow-hidden z-0">
        <div className="relative w-full h-full">
          {/* Square elements - mirrored */}
          <div className="absolute top-4 right-24 w-16 h-16 bg-gray-200 opacity-80" />
          <div className="absolute top-20 right-40 w-14 h-14 bg-gray-200 opacity-70" />
          <div className="absolute top-28 right-8 w-12 h-12 bg-gray-300 opacity-60" />
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-zinc-100 p-4 relative z-20">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Image
              src="https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/vmby46tevqgow4x9b48u"
              alt="Tekimax Logo"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-1"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100 relative z-20">
        <motion.div
          className="h-full bg-black"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Slide content - centered vertically and horizontally */}
      <div className="flex-grow flex items-center justify-center p-4 md:p-12 relative z-20">
        <div className="w-full max-w-6xl mx-auto flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl"
            >
              {slides[currentSlide]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="p-4 border-t border-zinc-100 flex justify-between items-center relative z-20">
        <div className="flex items-center">
          <Button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            variant="ghost"
            size="icon"
            className={currentSlide === 0 ? "opacity-30" : ""}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            variant="ghost"
            size="icon"
            className={currentSlide === slides.length - 1 ? "opacity-30" : ""}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="text-sm text-zinc-500">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
}
