"use client";

import { useState, useEffect } from "react";
import { TopNavigation } from "@/components/top-navigation";
import { FooterWaitlist } from "@/components/footer-waitlist";
import { GitHubButton } from "@/components/github-button";
import { DottedPattern } from "@/components/ui/dotted-pattern";
import {
  Search,
  Filter,
  AlertCircle,
  Database,
  BarChart2,
  Network,
  Eye,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Types
type RepoCategory =
  | "data-analysis"
  | "real-time-systems"
  | "connector"
  | "mcp-servers"
  | "all";

interface Repository {
  id: string;
  name: string;
  description: string;
  category: RepoCategory[];
  stars: number;
  lastUpdated: string;
  url: string;
  techs: string[];
}

export default function OpenSourcePage() {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<RepoCategory>("all");
  const [expandedRepo, setExpandedRepo] = useState<string | null>(null);

  // Sample repository data
  const repositories: Repository[] = [
    {
      id: "marketpulse",
      name: "MarketPulse",
      description:
        "On-demand local market analysis toolkit powered by Codex CLI & OpenAI models that provides AI-driven market insights for local areas.",
      category: ["data-analysis", "real-time-systems"],
      stars: 0,
      lastUpdated: "2025-04-17",
      url: "https://github.com/TEKIMAX/marketpulse",
      techs: ["Python", "OpenAI", "SQLite", "Pandas"],
    },
    {
      id: "mcpcensus",
      name: "MCP Census Server",
      description:
        "A robust Model Context Protocol (MCP) server for accessing US Census Bureau data via JSON-RPC over HTTP, improving data accessibility for developers.",
      category: ["mcp-servers", "data-analysis"],
      stars: 0,
      lastUpdated: "2025-04-18",
      url: "https://github.com/TEKIMAX/mcp_census_server",
      techs: ["Python", "FastAPI", "JSON-RPC", "MCP", "Census API"],
    },
  ];

  // Filter repositories based on search query and category
  const filteredRepositories = repositories.filter((repo) => {
    const matchesSearch =
      searchQuery === "" ||
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.techs.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      activeCategory === "all" || repo.category.includes(activeCategory);

    return matchesSearch && matchesCategory;
  });

  // Toggle repository details
  const toggleRepo = (repoId: string) => {
    if (expandedRepo === repoId) {
      setExpandedRepo(null);
    } else {
      setExpandedRepo(repoId);
    }
  };

  // Category label mapping
  const categoryLabels: Record<RepoCategory, string> = {
    all: "All",
    "data-analysis": "Data Analysis",
    "real-time-systems": "Real-Time Systems",
    connector: "Data Connectors",
    "mcp-servers": "MCP Servers",
  };

  // Category icon mapping
  const getCategoryIcon = (category: RepoCategory) => {
    switch (category) {
      case "data-analysis":
        return <BarChart2 className="h-5 w-5" />;
      case "real-time-systems":
        return <Eye className="h-5 w-5" />;
      case "connector":
        return <Network className="h-5 w-5" />;
      case "mcp-servers":
        return <Database className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopNavigation />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-zinc-900 text-white py-24 md:py-32 relative overflow-hidden">
          {/* Top right pattern */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3">
            <DottedPattern
              color="#ffffff"
              dotSize={1.5}
              spacing={25}
              opacity={0.15}
            />
          </div>

          {/* Bottom left pattern */}
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4">
            <DottedPattern
              color="#ffffff"
              dotSize={1.5}
              spacing={25}
              opacity={0.15}
            />
          </div>

          <div className="container px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-medium mb-6">
                MCP Servers & Data Analysis Open Source
              </h1>
              <p className="text-zinc-300 text-lg mb-8">
                A collection of tools and frameworks for building data-driven
                solutions including Model Context Protocol (MCP) servers for
                enhanced data accessibility and analysis capabilities.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center mr-3">
                    <Eye className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-zinc-300">Real-Time Systems</span>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center mr-3">
                    <BarChart2 className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-zinc-300">Data Analysis</span>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center mr-3">
                    <Database className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-zinc-300">MCP Servers</span>
                </div>
              </div>

              <GitHubButton
                href="https://github.com/TEKIMAX"
                variant="light"
                className="mt-4"
              >
                View All on GitHub
              </GitHubButton>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-16 bg-zinc-50 border-b border-zinc-200">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              {/* Search bar */}
              <div className="flex items-center bg-white border border-zinc-300 rounded-md p-2 mb-8">
                <Search className="h-5 w-5 text-zinc-400 mx-2" />
                <input
                  type="text"
                  placeholder="Search repositories, technologies, or keywords..."
                  className="flex-grow border-0 focus:ring-0 focus:outline-none text-sm py-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-4 py-2 text-sm rounded-md flex items-center ${
                    activeCategory === "all"
                      ? "bg-black text-white"
                      : "bg-white text-zinc-600 border border-zinc-300 hover:bg-zinc-50"
                  }`}
                  type="button"
                >
                  All
                </button>
                {(Object.keys(categoryLabels) as RepoCategory[])
                  .filter((cat) => cat !== "all")
                  .map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 text-sm rounded-md flex items-center gap-2 ${
                        activeCategory === category
                          ? "bg-black text-white"
                          : "bg-white text-zinc-600 border border-zinc-300 hover:bg-zinc-50"
                      }`}
                      type="button"
                    >
                      {getCategoryIcon(category)}
                      {categoryLabels[category]}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Repository List */}
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-medium mb-8">
                {filteredRepositories.length}
                {activeCategory !== "all"
                  ? ` ${categoryLabels[activeCategory]}`
                  : ""}{" "}
                Repositories
              </h2>

              {filteredRepositories.length === 0 ? (
                <div className="text-center py-12 bg-zinc-50 border border-zinc-200 rounded-md">
                  <AlertCircle className="h-12 w-12 mx-auto text-zinc-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No repositories found
                  </h3>
                  <p className="text-zinc-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredRepositories.map((repo) => (
                    <div
                      key={repo.id}
                      className="border border-zinc-200 bg-white overflow-hidden"
                    >
                      {/* Header - always visible */}
                      <button
                        className="p-6 cursor-pointer w-full text-left bg-white border-none"
                        onClick={() => toggleRepo(repo.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            toggleRepo(repo.id);
                          }
                        }}
                        aria-expanded={expandedRepo === repo.id}
                        type="button"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium flex items-center">
                            {repo.name}
                            <span className="ml-3 text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded-full">
                              {repo.stars} stars
                            </span>
                          </h3>
                          <motion.div
                            animate={{
                              rotate: expandedRepo === repo.id ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="h-5 w-5 text-zinc-400" />
                          </motion.div>
                        </div>
                        <p className="text-zinc-600 mt-2">{repo.description}</p>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {repo.category.map((cat) => (
                            <span
                              key={cat}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800"
                            >
                              {getCategoryIcon(cat)}
                              <span className="ml-1">
                                {categoryLabels[cat]}
                              </span>
                            </span>
                          ))}
                        </div>
                      </button>

                      {/* Expanded details */}
                      <AnimatePresence>
                        {expandedRepo === repo.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-zinc-200 bg-zinc-50"
                          >
                            <div className="p-6">
                              {/* Technologies */}
                              <div className="mb-4">
                                <h4 className="text-sm font-medium mb-2">
                                  Technologies
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {repo.techs.map((tech) => (
                                    <span
                                      key={tech}
                                      className="px-2.5 py-0.5 bg-zinc-200 text-zinc-700 rounded-md text-xs"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Last updated */}
                              <div className="mb-4">
                                <h4 className="text-sm font-medium mb-2">
                                  Last Updated
                                </h4>
                                <p className="text-sm text-zinc-600">
                                  {new Date(
                                    repo.lastUpdated
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>

                              {/* Action buttons */}
                              <div className="flex gap-4 mt-6">
                                <a
                                  href={repo.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center px-4 py-2 bg-black text-white hover:bg-zinc-800 transition-colors text-sm font-medium"
                                >
                                  View Repository
                                  <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                                <a
                                  href={`${repo.url}/issues`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center px-4 py-2 border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 transition-colors text-sm font-medium"
                                >
                                  View Issues
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contributing Section */}
        <section className="py-16 bg-zinc-900 text-white relative overflow-hidden">
          <div className="container px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-medium mb-6">
                Contribute to Our Projects
              </h2>
              <p className="text-zinc-300 mb-8">
                We welcome contributions from the community. Whether you're a
                developer, designer, or domain expert, there are many ways to
                get involved.
              </p>
              <GitHubButton href="https://github.com/TEKIMAX" variant="light">
                Join Our Community
              </GitHubButton>
            </div>
          </div>

          {/* Add dotted pattern to top-right corner */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3">
            <DottedPattern
              color="#ffffff"
              dotSize={1.5}
              spacing={25}
              opacity={0.15}
            />
          </div>
        </section>
      </main>

      <FooterWaitlist />
    </div>
  );
}
