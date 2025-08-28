"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MainNavigationMenu } from "@/components/main-navigation-menu";
import { MobileSidebar } from "@/components/mobile-sidebar";

export function TopNavigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white border-b" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1536px] mx-auto px-4 flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-105">
            <div className="h-8 overflow-hidden flex items-center">
              <Image
                src={
                  scrolled
                    ? "/images/tekimax-logo.png"
                    : "/images/tekimax-logo-white.png"
                }
                alt="Tekimax Logo"
                width={120}
                height={30}
                priority
                className="h-8 w-auto transition-opacity duration-300 hover:opacity-90"
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <MainNavigationMenu />
        </div>

        {/* Mobile Navigation - Using our new MobileSidebar */}
        <div className="md:hidden">
          <MobileSidebar scrolled={scrolled} />
        </div>
      </div>
    </header>
  );
}
