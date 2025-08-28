"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BlogSection() {
  const blogPosts = [
    {
      href: "/blog/neurodivergent-minds-ai-governance",
      image: "https://plus.unsplash.com/premium_photo-1694822449585-a2444c288b96?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Diverse team collaboration in AI governance and technology",
      category: "Research",
      categoryColor: "purple",
      date: "August 2024",
      readTime: "6 min",
      title: "How Neurodivergent Minds Can Humanize AI Governance",
      description: "World Economic Forum research reveals that neurodivergent individuals could be AI's most vital architects, with teams showing 30% higher productivity in innovation-focused roles.",
      featured: true
    },
    {
      href: "/blog/technology-neurodiversity-workplace-research",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop",
      alt: "Technology and Neurodiversity Research",
      category: "Research",
      categoryColor: "indigo",
      date: "August 2025",
      readTime: "7 min",
      title: "Technology Aiding Neurodiverse Employees: Key Research Findings",
      description: "A comprehensive bibliometric analysis of 40 studies reveals how inclusive, customizable technology significantly enhances support for neurodivergent individuals in learning, work, and social contexts.",
      featured: false
    },
    {
      href: "/blog/openai-devday-reflections",
      image: "/hand-tracking-tekimax.jpg",
      alt: "Tekimax Hand Tracking Technology",
      category: "Experience",
      categoryColor: "blue",
      date: "January 2024",
      readTime: "8 min",
      title: "Human-Machine Cognition Collaboration",
      description: "Being interviewed by OpenAI to be featured in the intro video for the historic Dev Day presentation was inspiring. Exploring human-machine cognition collaboration and agentic AI experiences that augment critical thinking.",
      featured: false
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-zinc-50">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-6 tracking-tight">
              Latest Research & Insights
            </h2>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
              Exploring AI innovation, neurodivergent education, and human-machine collaboration through research and real-world experiences
            </p>
          </div>

          {/* Featured Post */}
          {blogPosts
            .filter(post => post.featured)
            .map((post, index) => (
              <div key={index} className="mb-16">
                <Link 
                  href={post.href}
                  className="group block bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 hover:from-purple-100 hover:to-blue-100 transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="aspect-video rounded-xl overflow-hidden relative">
                      <Image
                        src={post.image}
                        alt={post.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 text-sm text-zinc-500 mb-3">
                        <span className={`bg-${post.categoryColor}-100 text-${post.categoryColor}-700 px-2 py-1 rounded-full text-xs font-medium`}>
                          {post.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime} read</span>
                        </div>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-medium mb-4 group-hover:text-purple-700 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-zinc-600 mb-6 text-lg leading-relaxed">
                        {post.description}
                      </p>
                      <div className="flex items-center text-purple-600 font-medium">
                        Read full article
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
          ))}

          {/* Other Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {blogPosts
              .filter(post => !post.featured)
              .map((post, index) => (
                <Link 
                  key={index}
                  href={post.href}
                  className="group block bg-white rounded-2xl p-6 hover:bg-zinc-50 transition-all duration-300 hover:shadow-lg border border-zinc-100"
                >
                  <div className="aspect-video rounded-xl overflow-hidden relative mb-4">
                    <Image
                      src={post.image}
                      alt={post.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                      <span className={`bg-${post.categoryColor}-100 text-${post.categoryColor}-700 px-2 py-1 rounded-full text-xs font-medium`}>
                        {post.category}
                      </span>
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                      <span>•</span>
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-medium mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-zinc-600 line-clamp-3 mb-4">
                      {post.description}
                    </p>
                    <div className="flex items-center text-indigo-600 font-medium text-sm">
                      Read more
                      <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
            ))}
          </div>

          {/* View All Blog Button */}
          <div className="text-center">
            <Button asChild className="bg-black text-white hover:bg-zinc-800 rounded-xl px-8 py-3">
              <Link href="/blog">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}