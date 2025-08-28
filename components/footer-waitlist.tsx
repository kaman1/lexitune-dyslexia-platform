"use client";

import React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function FooterWaitlist() {
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Server-safe rendering
  const renderBadge = () => {
    if (!mounted) return null;

    return (
      <div className="flex flex-col items-center justify-center">
        <h4 className="text-sm font-medium mb-3 text-white">
          Partner Programs
        </h4>
        <Link
          href="https://www.hiringourheroes.org/4plus1"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-90 transition-opacity hover:scale-105 duration-300"
        >
          <img
            src="/4+1-badge-li-tw.jpg"
            alt="The Formula 4+1 for Military Spouse Success"
            className="w-24 h-24 rounded-full shadow-lg border-2 border-white"
          />
        </Link>
      </div>
    );
  };

  return (
    <footer className="bg-black py-16 text-white">
      <div className="container px-4">
        {/* Waitlist Section */}
        {/* <div className="max-w-xl mx-auto mb-16 text-center">
          <h2 className="text-xl font-medium mb-6">Join the Waitlist</h2>
          <p className="text-sm text-zinc-400 mb-8">
            Be among the first to experience our data-driven decision platform
            when we launch.
          </p>

          <Button 
            onClick={() => window.open("https://tekimax-dotterel.us.kinde.com/knock-knock", "_blank")}
            className="bg-white text-black hover:bg-zinc-200 px-6 py-5"
          >
            Request Access
          </Button>
        </div> */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src="/images/tekimax-logo-white.png"
                alt="Tekimax Logo"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-zinc-400 text-sm mb-4">info@tekimax.com</p>
          </div>

          {/* <div>
            <h3 className="font-medium mb-4 text-white">Products</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <Link href="#" className="hover:text-zinc-200">
                  Customer Discovery
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-zinc-200">
                  Interview Practice
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-zinc-200">
                  Leadership Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-zinc-200">
                  Open Source
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-white">Resources</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <Link
                  href="https://github.com/TEKIMAX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-200"
                >
                  <Github className="inline-block mr-1 h-3.5 w-3.5" />
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-zinc-200">
                  Non-Profit Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-zinc-200">
                  Government Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-white">Company</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <Link href="#about" className="hover:text-zinc-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-zinc-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-zinc-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-zinc-200">
                  Careers
                </Link>
              </li>
            </ul>
          </div> */}
        </div>

        {/* Company Information */}
        <div className="border-t border-zinc-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-medium mb-3 text-white">
                Company Information
              </h4>
              <p className="text-xs text-zinc-400 mb-1">
                2ENOVATE LLC DBA: TEKIMAX
              </p>
              <p className="text-xs text-zinc-400 mb-1">1120 South Fwy</p>
              <p className="text-xs text-zinc-400 mb-1">Fort Worth, TX 76104</p>
              <p className="text-xs text-zinc-400 mb-1">
                Email: info@TEKIMAX.com
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3 text-white">
                Gov Contracting Info
              </h4>
              <p className="text-xs text-zinc-400 mb-1">UEI: MKHHA23AJ9S8</p>
              <p className="text-xs text-zinc-400 mb-1">CAGE/NCAGE: 7CCP</p>
            </div>
            <div>
              <Link
                href="https://techfw.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 mb-3 hover:opacity-80 transition-opacity"
              >
                <img
                  src="https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/eumxmnokxdkarurcka6g"
                  alt="TechFW Logo"
                  className="h-16 w-auto object-contain mr-2 mb-2 mt-2 ml-2 rounded-full"
                />
              <div className="flex flex-col">
              <h4 className="text-sm font-medium text-white">
                  TechFW Membership
                </h4>
              <p className="text-xs text-zinc-400 mb-1">SmartStart</p>
              </div>
              </Link>
              
            </div>

            {/* 4+1 Formula Badge as third column - With client-side safe rendering */}
            {mounted && renderBadge()}
          </div>
        </div>

        <Separator className="mb-8 bg-zinc-800" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-400">
            © 2025 Tekimax. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex flex-wrap gap-6 text-sm text-zinc-400">
              <Link href="/privacy" className="hover:text-zinc-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-zinc-200">
                Terms of Service
              </Link>
              <Link href="/disclaimer" className="hover:text-zinc-200">
                Disclaimer
              </Link>
              <Link href="/accessibility" className="hover:text-zinc-200">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
