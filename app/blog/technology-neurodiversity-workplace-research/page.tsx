"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, TrendingUp, Users, Brain, ChartBar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainNavigationMenu } from "@/components/main-navigation-menu";

export default function TechnologyNeurodiversityResearchPost() {
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

      {/* Hero Header */}
      <div className="relative h-[50vh] min-h-[400px] mb-12 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop"
            alt="Technology and Neurodiversity Research"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-purple-900/70 to-transparent" />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="container px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-white/20 backdrop-blur text-white px-3 py-1 rounded-full text-sm">
                  Research Analysis
                </span>
                <span className="text-white/80 text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  August 13, 2025
                </span>
                <span className="text-white/80 text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  7 min read
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-medium mb-6 tracking-tight text-white">
                Technology Aiding Neurodiverse Employees: Key Research Findings on Workplace Innovation
              </h1>
              <p className="text-xl text-white/90">
                Analyzing a comprehensive bibliometric study revealing how customizable technology transforms neurodivergent workplace experiences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="container px-4 py-8">
        <div className="max-w-3xl mx-auto prose prose-lg">
          
          {/* Introduction */}
          <div className="not-prose bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-12">
            <p className="text-lg text-zinc-700 leading-relaxed">
              A recent bibliometric analysis from Amrita University examined 40 research publications to understand how technology supports neurodiverse individuals in workplace settings. The findings reveal that <strong>inclusive, customizable technology significantly enhances support for neurodivergent individuals in learning, work, and social contexts</strong>, aligning perfectly with Tekimax's mission.
            </p>
          </div>

          {/* Research Scope Section */}
          <div className="not-prose mb-12">
            <h2 className="text-2xl font-medium mb-6 flex items-center gap-3">
              <ChartBar className="h-6 w-6 text-indigo-600" />
              The Research Landscape: A Growing Field
            </h2>
            
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
              <p className="text-zinc-700 mb-6">
                The study, conducted by Anu Thomas Samuel, Varsha Sreekumar, and Dr. Nimmi PM, analyzed research trends from 2009 to 2024, revealing a significant surge in neurodiversity-focused technology research:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-indigo-50 rounded-xl">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">72</div>
                  <p className="text-sm text-zinc-600">Initial publications identified</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">40</div>
                  <p className="text-sm text-zinc-600">Documents analyzed in detail</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2022-23</div>
                  <p className="text-sm text-zinc-600">Sharp increase in research</p>
                </div>
              </div>
              
              <p className="text-sm text-zinc-600 italic">
                The research shows peaks in 2011, 2017, and especially from 2021 onwards, indicating growing recognition of neurodiversity's importance in technology and workplace settings.
              </p>
            </div>
          </div>

          {/* Key Findings Section */}
          <div className="not-prose mb-12">
            <h2 className="text-2xl font-medium mb-6 flex items-center gap-3">
              <Brain className="h-6 w-6 text-purple-600" />
              Critical Findings: Technology as an Empowerment Tool
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="font-medium mb-3">1. Redefining Work Through Technology</h3>
                <p className="text-zinc-600 mb-3">
                  The research confirms that "technology, in various forms, can redefine work by making processes more efficient and providing real-time support for those who need it, potentially revolutionizing how work is accomplished."
                </p>
                <ul className="space-y-2 text-sm text-zinc-600">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>AI reduces cognitive load by automating repetitive tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Real-time assistance helps with task switching and memory support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Customizable interfaces accommodate diverse sensory needs</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                <h3 className="font-medium mb-3">2. Natural Part of Human Evolution</h3>
                <p className="text-zinc-600">
                  The researchers emphasize that neurocognitive variations including Autism Spectrum Disorder (ASD), ADHD, Dyslexia, and Dyspraxia "are not uncommon but are a natural part of human evolution." This perspective shift is crucial for developing truly inclusive technologies.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="font-medium mb-3">3. Strengths-Based Approach</h3>
                <p className="text-zinc-600 mb-3">
                  The analysis revealed common strengths among neurodivergent individuals that technology can amplify:
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/70 rounded-lg p-3">
                    <strong className="text-green-700">ADHD:</strong> Creativity, energy, problem-solving
                  </div>
                  <div className="bg-white/70 rounded-lg p-3">
                    <strong className="text-green-700">Autism:</strong> Pattern recognition, attention to detail
                  </div>
                  <div className="bg-white/70 rounded-lg p-3">
                    <strong className="text-green-700">Dyslexia:</strong> Spatial reasoning, big-picture thinking
                  </div>
                  <div className="bg-white/70 rounded-lg p-3">
                    <strong className="text-green-700">Dyspraxia:</strong> Creative problem-solving
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Research Network Analysis */}
          <div className="not-prose mb-12">
            <h2 className="text-2xl font-medium mb-6 flex items-center gap-3">
              <Users className="h-6 w-6 text-blue-600" />
              Global Research Network: Leaders and Collaborations
            </h2>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <p className="text-zinc-700 mb-4">
                The bibliometric analysis revealed key patterns in neurodiversity research:
              </p>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h4 className="font-medium text-sm mb-2">Geographic Distribution</h4>
                  <p className="text-xs text-zinc-600 mb-2">
                    The United States and United Kingdom dominate as central research hubs, with emerging contributions from Japan, Canada, Australia, and Saudi Arabia.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">USA (Central Hub)</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">UK (Secondary Hub)</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Japan</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Canada</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h4 className="font-medium text-sm mb-2">Key Research Themes</h4>
                  <p className="text-xs text-zinc-600 mb-2">
                    "Neurodiversity" emerged as the most central keyword with highest connectivity, followed by "autism" (40 links) and "disability" (35 links).
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h4 className="font-medium text-sm mb-2">Publishing Trends</h4>
                  <p className="text-xs text-zinc-600">
                    Top journals include Journal of Enabling Technologies, Journal of Autism and Developmental Disorders, and Frontiers in Psychology, indicating interdisciplinary interest.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Workplace Implementation */}
          <div className="not-prose mb-12">
            <h2 className="text-2xl font-medium mb-6 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
              Workplace Implementation: From Research to Reality
            </h2>
            
            <p className="text-zinc-600 mb-6">
              The study highlights successful workplace implementations and ongoing challenges:
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h4 className="font-medium mb-2">DXC Technology's Neurodiversity Hub</h4>
                <p className="text-zinc-600 text-sm">
                  Creating equal employment opportunities by focusing on contextual support rather than intrinsic deficits, providing a model for other organizations.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-6 py-2">
                <h4 className="font-medium mb-2">Sustainable IT Employment Programs</h4>
                <p className="text-zinc-600 text-sm">
                  Netherlands-based initiatives demonstrating how contextual support enables neurodivergent individuals to thrive in technology roles.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6 py-2">
                <h4 className="font-medium mb-2">Participatory Design Approaches</h4>
                <p className="text-zinc-600 text-sm">
                  Involving neurodivergent individuals directly in technology design ensures tools genuinely meet their needs.
                </p>
              </div>
            </div>
          </div>

          {/* Challenges Identified */}
          <div className="not-prose mb-12">
            <h2 className="text-2xl font-medium mb-6">Challenges That Remain</h2>
            
            <div className="bg-red-50 rounded-2xl p-6">
              <p className="text-zinc-700 mb-4">
                The research also identified significant barriers that persist:
              </p>
              <ul className="space-y-3 text-zinc-600">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <div>
                    <strong>Higher unemployment rates:</strong> Neurodivergent individuals face employment challenges due to misunderstanding of their abilities and lack of workplace accommodations
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <div>
                    <strong>Recruitment bias:</strong> Traditional hiring processes favor neurotypical communication styles (eye contact, small talk) over actual job capabilities
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <div>
                    <strong>"Masking" pressure:</strong> Many neurodivergent employees suppress their natural behaviors to fit in, leading to burnout and mental health issues
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <div>
                    <strong>Geographic disparities:</strong> Research and support concentrated in US/UK, with limited resources in regions like India
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Alignment with Tekimax Mission */}
          <div className="not-prose mb-12">
            <h2 className="text-2xl font-medium mb-6">How This Research Validates Tekimax's Approach</h2>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
              <p className="text-zinc-700 mb-6">
                The study's conclusions directly support Tekimax's mission and methodology:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <Brain className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Human-Machine Cognition Collaboration</h4>
                    <p className="text-sm text-zinc-600">
                      The research confirms that AI can "reduce the experience of repetitive tasks by automating them and boost productivity and job satisfaction through the development of human skills."
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 rounded-full p-2 mt-1">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Fostering Creative & Socially Aware Society</h4>
                    <p className="text-sm text-zinc-600">
                      The study emphasizes that "studying neurodiversity and the role of technology in supporting it is crucial, as it can foster a more creative and socially aware society."
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 rounded-full p-2 mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Competitive Advantage Through Diversity</h4>
                    <p className="text-sm text-zinc-600">
                      Research shows neurodivergent employees bring "new methods of thinking and problem solving... innovative solutions and can be an organizational competitive gain."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Future Directions */}
          <div className="not-prose mb-12">
            <h2 className="text-2xl font-medium mb-6">The Path Forward: Research Recommendations</h2>
            
            <p className="text-zinc-600 mb-6">
              The researchers conclude with key recommendations for advancing the field:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h4 className="font-medium text-sm mb-2">Expand Global Research</h4>
                <p className="text-xs text-zinc-600">
                  Address geographic disparities by supporting research in underrepresented regions
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h4 className="font-medium text-sm mb-2">Inclusive Design Practices</h4>
                <p className="text-xs text-zinc-600">
                  Involve neurodivergent individuals directly in technology development
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h4 className="font-medium text-sm mb-2">Ethical Frameworks</h4>
                <p className="text-xs text-zinc-600">
                  Develop guidelines for data privacy and responsible AI use
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h4 className="font-medium text-sm mb-2">Systemic Change</h4>
                <p className="text-xs text-zinc-600">
                  Transform recruitment, workplace culture, and educational systems
                </p>
              </div>
            </div>
          </div>

          {/* Study Citation */}
          <div className="not-prose mt-12 p-6 bg-gray-50 rounded-xl">
            <p className="text-sm text-zinc-600">
              <strong>Study Reference:</strong> Samuel, A.T., Sreekumar, V., & Nimmi, P.M. (2025). "Technology aiding Neurodiverse Employees: A Bibliometric Analysis." Proceedings of Sustainability, Entrepreneurship, Equity and Digital Strategies (SEEDS 2024), Atlantis Press.
            </p>
          </div>

        </div>

        {/* Back to Blog */}
        <div className="max-w-3xl mx-auto mt-16">
          <Button asChild className="bg-black text-white hover:bg-zinc-800 rounded-xl">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}