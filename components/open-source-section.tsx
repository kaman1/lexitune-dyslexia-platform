"use client";

import {
  CheckCircle,
  Users,
  Brain,
  Code,
  Database,
  ChevronDown,
} from "lucide-react";
import { GitHubButton } from "./github-button";
import { DottedPattern } from "./ui/dotted-pattern";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function OpenSourceSection() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (cardId: string) => {
    if (expandedCard === cardId) {
      setExpandedCard(null);
    } else {
      setExpandedCard(cardId);
    }
  };

  return (
    <section
      id="open-source"
      className="py-24 md:py-32 bg-zinc-900 text-white relative overflow-hidden"
    >
      {/* Add dotted pattern to top-right corner */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3">
        <DottedPattern
          color="#ffffff"
          dotSize={1.5}
          spacing={25}
          opacity={0.15}
        />
      </div>

      <div className="container px-4">
        <div className="max-w-2xl mx-auto mb-20">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight text-center text-white">
            Open Source Projects
          </h2>
          <p className="text-zinc-300 text-center mb-8">
            We develop open source tools that help organizations make better
            decisions through data analysis and AI integration.
          </p>

          <div className="flex items-center justify-center space-x-6 mb-12">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center mr-3">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-zinc-300">Developer Tools</span>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center mr-3">
                <Database className="h-5 w-5 text-white" />
              </div>
              <span className="text-zinc-300">Data Analysis</span>
            </div>
          </div>

          <p className="text-zinc-300 text-center">
            Our projects provide practical tools for data analysis, market
            research, and information accessibility.
          </p>
        </div>

        {/* Open Source Projects */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16 md:grid-rows-1 md:auto-rows-fr">
          {/* MarketPulse */}
          <button
            type="button"
            className={`border border-zinc-800 p-8 bg-zinc-800/50 backdrop-blur-sm relative overflow-hidden cursor-pointer transition-all duration-300 h-full text-left ${
              expandedCard === "marketpulse" ? "shadow-lg" : ""
            }`}
            onClick={() => toggleCard("marketpulse")}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleCard("marketpulse");
              }
            }}
            aria-expanded={expandedCard === "marketpulse"}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-white">MarketPulse</h3>
              <motion.div
                animate={{ rotate: expandedCard === "marketpulse" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-5 w-5 text-white" />
              </motion.div>
            </div>

            <p className="text-zinc-300 mb-4">
              On-demand local market analysis toolkit powered by Codex CLI &
              OpenAI models that provides AI-driven market insights.
            </p>

            <AnimatePresence>
              {expandedCard === "marketpulse" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-zinc-300 mb-4">
                    MarketPulse leverages public-sector data (U.S. Census
                    Bureau, Socrata portals) and AI to deliver:
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                      <p className="text-zinc-300">
                        Competitor landscape mapping
                      </p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                      <p className="text-zinc-300">
                        Trend summaries across demographics, economy, and news
                      </p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                      <p className="text-zinc-300">Quick SWOT analyses</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                    }}
                    onKeyDown={(e: React.KeyboardEvent) => e.stopPropagation()}
                  >
                    <GitHubButton
                      href="https://github.com/TEKIMAX/marketpulse"
                      variant="light"
                      className="z-20"
                    >
                      Explore on GitHub
                    </GitHubButton>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* MCP Census Server */}
          <button
            type="button"
            className={`border border-zinc-800 p-8 bg-zinc-800/50 backdrop-blur-sm relative overflow-hidden cursor-pointer transition-all duration-300 h-full text-left ${
              expandedCard === "mcpcensus" ? "shadow-lg" : ""
            }`}
            onClick={() => toggleCard("mcpcensus")}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleCard("mcpcensus");
              }
            }}
            aria-expanded={expandedCard === "mcpcensus"}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-white">
                MCP Census Server
              </h3>
              <motion.div
                animate={{ rotate: expandedCard === "mcpcensus" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-5 w-5 text-white" />
              </motion.div>
            </div>

            <p className="text-zinc-300 mb-4">
              A robust Model Context Protocol (MCP) server for accessing US
              Census Bureau data via JSON-RPC over HTTP, improving data
              accessibility for developers.
            </p>

            <AnimatePresence>
              {expandedCard === "mcpcensus" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-zinc-300 mb-4">Features:</p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                      <p className="text-zinc-300">
                        JSON-RPC 2.0 (single and batch requests)
                      </p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                      <p className="text-zinc-300">
                        Pydantic models for request/response validation
                      </p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                      <p className="text-zinc-300">
                        Caching of Census API responses
                      </p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                      <p className="text-zinc-300">
                        Structured logging and API key authentication
                      </p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                      <p className="text-zinc-300">
                        Interactive API docs (Swagger UI)
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                    }}
                    onKeyDown={(e: React.KeyboardEvent) => e.stopPropagation()}
                  >
                    <GitHubButton
                      href="https://github.com/TEKIMAX/mcp_census_server"
                      variant="light"
                    >
                      Explore on GitHub
                    </GitHubButton>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Add dotted pattern to bottom-left corner */}
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4">
        <DottedPattern
          color="#ffffff"
          dotSize={1.5}
          spacing={25}
          opacity={0.15}
        />
      </div>
    </section>
  );
}
