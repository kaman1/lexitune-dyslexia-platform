"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainNavigationMenu } from "@/components/main-navigation-menu";

export default function OpenAIDevDayReflections() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/tekimax-logo-darkRGB-1.png"
                alt="Tekimax"
                width={120}
                height={30}
                className="object-contain"
              />
            </Link>
            <MainNavigationMenu />
          </div>
        </div>
      </header>

      <div className="container px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Button asChild className="bg-black text-white hover:bg-zinc-800 rounded-xl">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Hero Image */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8 relative">
            <Image
              src="/hand-tracking-tekimax.jpg"
              alt="Tekimax Hand Tracking Technology - OpenAI Dev Day"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-medium mb-6 tracking-tight">
              Human-Machine Cognition Collaboration
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>January 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>8 min read</span>
              </div>
            </div>

            <p className="text-lg text-zinc-600 leading-relaxed">
              Being interviewed by OpenAI to be featured in the intro video for the historic Dev Day presentation was inspiring. It was an opportunity to demonstrate the future of human-machine cognition collaboration, where AI augments rather than replaces human intelligence to solve complex challenges.
            </p>
          </header>

          {/* Article Content */}
          <article className="prose prose-zinc max-w-none">
            <h2 className="text-2xl font-medium mb-4 tracking-tight">Interviewed to Represent the Future</h2>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              November 6, 2023, marked a pivotal moment in artificial intelligence history. OpenAI's first Dev Day brought together hundreds of developers from around the world to San Francisco, creating what many called "the biggest day for AI since the launch of GPT-4 in April." As a startup founder focused on neurodivergent education, being interviewed by OpenAI to appear in the Dev Day presentation intro video felt both humbling and inspiring.
            </p>

            <p className="text-zinc-700 mb-8 leading-relaxed">
              The interview process itself was meaningful. OpenAI was looking for how their technology was being used, particularly those creating tangible impact across different sectors. Being interviewed to be part of this historic moment meant our work at Tekimax exemplified how OpenAI&apos;s tools could be applied to tackle genuine challenges and drive innovation.
            </p>

            <h2 className="text-2xl font-medium mb-4 tracking-tight">The Announcements That Changed Everything</h2>
            <p className="text-zinc-700 mb-4 leading-relaxed">
              Three key announcements stood out as game-changers for our work at Tekimax:
            </p>

            <div className="bg-zinc-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium mb-3">GPT-4 Turbo: More Capable, More Affordable</h3>
              <p className="text-zinc-700 mb-4">
                The introduction of GPT-4 Turbo with 3x cheaper input tokens and 2x cheaper output tokens suddenly made advanced AI accessible to startups like ours. This wasn&apos;t just about cost, it was about possibility.
              </p>
              
              <h3 className="text-lg font-medium mb-3">Custom GPTs: AI for Everyone</h3>
              <p className="text-zinc-700 mb-4">
                The GPT Store concept introduced what OpenAI called "an app store for AI." For us in education technology, this represented a future where specialized AI tutors for neurodivergent students could be shared, improved, and scaled globally.
              </p>

              <h3 className="text-lg font-medium mb-3">Assistants API: From Chat to Action</h3>
              <p className="text-zinc-700">
                Perhaps most exciting was the Assistants API, OpenAI&apos;s first agent-oriented product. This opened possibilities for AI that could not just converse but take action, particularly relevant for our adaptive learning platforms.
              </p>
            </div>

            <h2 className="text-2xl font-medium mb-4 tracking-tight">Agentic AI and Human Cognition Augmentation</h2>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              At Tekimax, we've always believed that artificial intelligence should augment human cognition rather than replace it. The advances announced at Dev Day validated this vision of human-machine collaboration and provided the tools to create agentic experiences that enhance critical thinking.
            </p>

            <p className="text-zinc-700 mb-6 leading-relaxed">
              Our focus on building technology for good takes on new dimensions with these capabilities. Imagine AI agents that collaborate with human intelligence to solve complex problems, adapting to cognitive patterns and enhancing decision-making processes. The 128K context window means these systems can maintain awareness of entire problem-solving journeys, providing contextual support that augments rather than replaces human insight.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium mb-3">The Future We're Building</h3>
              <p className="text-zinc-700">
                "The democratization of AI isn&apos;t just about making tools available, it&apos;s about creating human-machine collaboration that empowers diverse communities. Technology should augment human cognition and critical thinking, especially for neurodivergent individuals who bring unique perspectives to problem-solving."
              </p>
            </div>

            <h2 className="text-2xl font-medium mb-4 tracking-tight">Using AI Technology to Solve Real Problems</h2>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              Watching the live stream as the OpenAI team unveiled the future, knowing that our story was part of that presentation, I was struck by the responsibility that comes with access to such powerful technology. As startups using OpenAI&apos;s tools, we&apos;re not just building products, we&apos;re demonstrating how AI can address genuine challenges across various industries and create meaningful impact.
            </p>

            <p className="text-zinc-700 mb-8 leading-relaxed">
              The pace of innovation is breathtaking. What were research projects just months ago became developer-ready APIs that day. But with great power comes great responsibility: ensuring these advances serve not just efficiency but meaningful impact, addressing complex challenges that benefit diverse communities and use cases.
            </p>

            <h2 className="text-2xl font-medium mb-4 tracking-tight">The Future of Human-AI Collaboration</h2>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              Dev Day reminded us that we&apos;re not just witnessing the AI revolution, we&apos;re actively shaping the future of human-machine cognition collaboration. Every agentic experience we create, every critical thinking enhancement we build, is part of this larger transformation toward technology for good.
            </p>

            <p className="text-zinc-700 mb-6 leading-relaxed">
              Our passion for exploring the cutting edge of AI discovery isn&apos;t just about technology, it&apos;s about augmenting human potential. The cognitive partnerships we foster, the neurodivergent community we support, and the collaborative systems we build are all part of a future where artificial intelligence amplifies human intelligence and critical thinking rather than replacing it.
            </p>

            <div className="border-l-4 border-green-600 pl-6 py-4 mb-8 bg-green-50">
              <p className="text-zinc-700 font-medium">
                Being interviewed to be part of OpenAI&apos;s first Dev Day presentation was inspiring and a validation of our vision for human-machine cognition collaboration. It was an opportunity to showcase our commitment to building technology for good, creating agentic AI experiences that augment critical thinking and support the neurodivergent community we serve without replacing human intelligence.
              </p>
            </div>

            <p className="text-zinc-700 mb-12 leading-relaxed">
              As we continue building at Tekimax, being interviewed to demonstrate human-machine cognition collaboration drives our mission forward. We're not just developing AI solutions; we're pioneering agentic experiences that prove how technology can augment human intelligence, enhance critical thinking, and create meaningful impact for neurodivergent communities and beyond.
            </p>

            {/* References Section */}
            <div className="border-t border-zinc-200 pt-12 mt-16">
              <h2 className="text-xl font-medium mb-6 tracking-tight">References & Further Reading</h2>
              
              <div className="space-y-4">
                <div className="bg-zinc-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">OpenAI Official Sources</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a 
                        href="https://openai.com/blog/new-models-and-developer-products-announced-at-devday"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        New models and developer products announced at DevDay
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://openai.com/index/announcing-openai-devday/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        Join us for OpenAI's first developer conference
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="bg-zinc-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Video Documentation</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a 
                        href="https://www.youtube.com/live/U9mJuUkhUzk?feature=shared&t=184"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        OpenAI DevDay 2023 - Full Event Recording
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="bg-zinc-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Analysis & Commentary</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a 
                        href="https://medium.com/@yuqing9196/the-ultimate-summary-of-openai-dev-day-2023-b9cb632e54a1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        The Ultimate Summary of OpenAI Dev Day 2023 - Medium
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://www.pluralsight.com/resources/blog/ai-and-data/openai-devday-2023-takeaways"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        OpenAI DevDay 2023: 5 Key Takeaways - Pluralsight
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}