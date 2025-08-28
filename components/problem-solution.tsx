"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { 
  AlertTriangle, 
  Brain, 
  Users, 
  TrendingDown, 
  Zap, 
  Bell, 
  Target, 
  Lightbulb,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export const ProblemSolution: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-zinc-50">
      <div className="container px-4">
        {/* Problem Section */}
        <div className="max-w-7xl mx-auto mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-100 text-red-800 font-medium mb-6">
              <AlertTriangle className="h-5 w-5" />
              The Critical Problem
            </div>
            <h2 className="text-3xl font-medium mb-8 tracking-tight" style={{color: '#333B68'}}>
              Neurodivergent Talent Crisis
            </h2>
            <p className="text-zinc-500 mx-auto mb-12 max-w-2xl">
              Despite exceptional capabilities, neurodivergent students face systemic barriers that prevent them from realizing their STEM potential, resulting in massive talent waste and economic losses.
            </p>
          </div>

          {/* Problem Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-8 shadow-lg border-l-4 border-red-500">
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="h-8 w-8 text-red-500" />
                <h3 className="text-lg font-bold text-zinc-800">High Dropout</h3>
              </div>
              <div className="text-3xl font-bold text-red-600 mb-2">42-50%</div>
              <p className="text-sm text-zinc-600 mb-3">Neurodivergent students drop out of STEM programs vs 21% neurotypical</p>
              <p className="text-xs text-zinc-500">Source: National Center for Education Statistics (2025)</p>
            </div>

            <div className="bg-white p-8 shadow-lg border-l-4 border-orange-500">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-orange-500" />
                <h3 className="text-lg font-bold text-zinc-800">Underemployment</h3>
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">85%</div>
              <p className="text-sm text-zinc-600 mb-3">Unemployment/underemployment rate despite high capabilities</p>
              <p className="text-xs text-zinc-500">Source: National Autism Indicators Report (2024)</p>
            </div>

            <div className="bg-white p-8 shadow-lg border-l-4 border-yellow-500">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="h-8 w-8 text-yellow-600" />
                <h3 className="text-lg font-bold text-zinc-800">Talent Gap</h3>
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">2M+</div>
              <p className="text-sm text-zinc-600 mb-3">Unfilled STEM jobs that neurodivergent talent could fill</p>
              <p className="text-xs text-zinc-500">Source: Bureau of Labor Statistics (2024)</p>
            </div>

            <div className="bg-white p-8 shadow-lg border-l-4 border-red-600">
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="h-8 w-8 text-red-600" />
                <h3 className="text-lg font-bold text-zinc-800">Economic Loss</h3>
              </div>
              <div className="text-3xl font-bold text-red-600 mb-2">$57B</div>
              <p className="text-sm text-zinc-600 mb-3">Annual economic loss from ASD underemployment alone</p>
              <p className="text-xs text-zinc-500">Source: Harvard Business Review & Deloitte Analysis (2024)</p>
            </div>
          </div>

          {/* Problem Breakdown */}
          <div className="bg-white p-12 shadow-xl">
            <h3 className="text-3xl font-medium mb-8 text-center tracking-tight" style={{color: '#333B68'}}>
              Evidence-Based Root Causes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h4 className="text-xl font-bold mb-3" style={{color: '#333B68'}}>Rigid Academic Environments</h4>
                <p className="text-zinc-600">Research shows "traditionally rigid academic environments weed out neurodivergent students whose neurological profile falls outside of the perceived norm" (Frontiers in Psychology, 2024)</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="text-xl font-bold mb-3" style={{color: '#333B68'}}>Training Gap</h4>
                <p className="text-zinc-600">Only 40% of educators serving neurodivergent students have specialized training, with 90% self-teaching about ADHD and autism (ADDitude Survey, 2024)</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-yellow-600" />
                </div>
                <h4 className="text-xl font-bold mb-3" style={{color: '#333B68'}}>Systemic Barriers</h4>
                <p className="text-zinc-600">STEM environments have "unique characteristics that stand as barriers," including inflexible schedules, sensory overload, and unclear communication (International Journal of STEM Education, 2024)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Solution Section */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-800 font-medium mb-6">
              <Lightbulb className="h-5 w-5" />
              The TEKIMAX Solution
            </div>
            <h2 className="text-3xl font-medium mb-8 tracking-tight" style={{color: '#333B68'}}>
              Self-Adaptive AI Platform
            </h2>
            <p className="text-zinc-500 mx-auto mb-12 max-w-2xl">
              Our enterprise-grade AI system revolutionizes neurodivergent education by adapting to individual learning patterns, augmenting educator capabilities, and providing real-time intervention strategies.
            </p>
          </div>

          {/* Solution Overview */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-white mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Intelligent Pedagogy Adaptation</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 mt-1 flex-shrink-0" />
                    <p className="text-lg">AI analyzes individual cognitive patterns and learning preferences in real-time</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 mt-1 flex-shrink-0" />
                    <p className="text-lg">Dynamically adjusts content pacing, complexity, and presentation format</p> 
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 mt-1 flex-shrink-0" />
                    <p className="text-lg">Transforms rigid curricula into flexible, modular learning experiences</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 p-8 backdrop-blur-sm">
                <div className="text-center">
                  <Brain className="h-16 w-16 mx-auto mb-4" />
                  <div className="text-4xl font-bold mb-2">25-35%</div>
                  <p className="text-lg opacity-90">Improvement in focus and engagement</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{color: '#333B68'}}>Smart Alert System</h3>
              <p className="text-zinc-600 mb-4">AI monitors student engagement patterns and automatically notifies educators when intervention is needed</p>
              <div className="space-y-2 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Real-time engagement tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Predictive difficulty identification</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Automated educator notifications</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{color: '#333B68'}}>AI-Generated Suggestions</h3>
              <p className="text-zinc-600 mb-4">Platform generates personalized intervention strategies and next-course-of-action recommendations</p>
              <div className="space-y-2 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Personalized intervention strategies</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Evidence-based recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Adaptive difficulty adjustment</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{color: '#333B68'}}>Educator Augmentation</h3>
              <p className="text-zinc-600 mb-4">Amplifies teacher capabilities with multiple intervention options and real-time support tools</p>
              <div className="space-y-2 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Multiple intervention levels</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Real-time coaching assistance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Professional development insights</span>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="bg-zinc-900 text-white p-12">
            <h3 className="text-3xl font-medium text-center mb-12 tracking-tight">Expected Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2" style={{color: '#6DBDEF'}}>60%</div>
                <p className="text-zinc-300">Reduction in dropout rates</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" style={{color: '#69C4B4'}}>3x</div>
                <p className="text-zinc-300">Faster intervention response</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" style={{color: '#F2C94C'}}>85%</div>
                <p className="text-zinc-300">Educator satisfaction increase</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" style={{color: '#8B83ED'}}>$2.1B</div>
                <p className="text-zinc-300">Potential economic value creation</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h3 className="text-3xl font-medium mb-8 tracking-tight" style={{color: '#333B68'}}>
              Transform Neurodivergent Education Today
            </h3>
            <p className="text-zinc-500 mx-auto mb-12 max-w-2xl">
              Join the revolution in neurodivergent STEM education. Our self-adaptive AI platform is ready to unlock the potential of every student.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                Request Demo
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="px-8 py-4 border-2 border-zinc-300 text-zinc-700 font-medium hover:border-zinc-400 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive References Section */}
      <div className="bg-zinc-100 py-16">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-medium mb-12 text-center tracking-tight" style={{color: '#333B68'}}>
              Data Sources & References
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold mb-6" style={{color: '#333B68'}}>Government & Federal Sources</h4>
                <div className="space-y-4 text-sm text-zinc-700">
                  <div className="bg-white p-4 border-l-4 border-blue-500">
                    <p className="font-medium mb-2">High Dropout Rates (42-50%)</p>
                    <p><strong>National Center for Education Statistics (NCES).</strong> "Students with Disabilities in STEM Fields." <em>NCES Annual Report</em>, U.S. Department of Education, 2025. <a href="https://nces.ed.gov" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">nces.ed.gov</a></p>
                  </div>
                  
                  <div className="bg-white p-4 border-l-4 border-green-500">
                    <p className="font-medium mb-2">STEM Job Gap (2M+ Unfilled Jobs)</p>
                    <p><strong>Bureau of Labor Statistics.</strong> "Employment Projections: STEM Occupations." <em>BLS Occupational Outlook</em>, U.S. Department of Labor, 2024. <a href="https://www.bls.gov/emp" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">bls.gov/emp</a></p>
                  </div>

                  <div className="bg-white p-4 border-l-4 border-purple-500">
                    <p className="font-medium mb-2">Additional Federal Data</p>
                    <p><strong>U.S. Department of Labor, Office of Disability Employment Policy.</strong> "Disability Employment Statistics." <em>ODEP Employment Data</em>, 2024. <a href="https://www.dol.gov/agencies/odep" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">dol.gov/agencies/odep</a></p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-6" style={{color: '#333B68'}}>Research & Industry Analysis</h4>
                <div className="space-y-4 text-sm text-zinc-700">
                  <div className="bg-white p-4 border-l-4 border-orange-500">
                    <p className="font-medium mb-2">Unemployment Rate (85%)</p>
                    <p><strong>Drexel University A.J. Drexel Autism Institute.</strong> "National Autism Indicators Report: Transition into Young Adulthood." <em>Life Course Outcomes Research Program</em>, 2024. <a href="https://drexel.edu/autismoutcomes" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">drexel.edu/autismoutcomes</a></p>
                  </div>

                  <div className="bg-white p-4 border-l-4 border-red-500">
                    <p className="font-medium mb-2">Economic Loss ($57B)</p>
                    <p><strong>Deloitte & Harvard Business Review.</strong> "The Economic Case for Disability Inclusion." <em>Corporate Impact Analysis</em>, 2024. Additional analysis from <strong>Buescher, A.V.S., et al.</strong> "Costs of autism spectrum disorders in the United Kingdom and the United States." <em>JAMA Pediatrics</em>, 2014.</p>
                  </div>

                  <div className="bg-white p-4 border-l-4 border-teal-500">
                    <p className="font-medium mb-2">Educational Barriers Research</p>
                    <p><strong>Frontiers in Psychology.</strong> "Experiences of neurodivergent students in graduate STEM programs." <em>Research Article</em>, 2024. <a href="https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1149068/full" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">frontiersin.org</a></p>
                    <p className="mt-2"><strong>International Journal of STEM Education.</strong> "Not a cookie cutter situation: how neurodivergent students experience group work in their STEM courses." 2024.</p>
                    <p className="mt-2"><strong>ADDitude Magazine.</strong> "Teacher Training for ADHD Lags: Few Get Neurodivergent Educator Strategies." <em>Educator Survey</em>, 2024.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white p-8 border border-zinc-200">
              <h4 className="text-lg font-bold mb-4" style={{color: '#333B68'}}>Methodology & Data Reliability</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-zinc-600">
                <div>
                  <p><strong>Data Collection:</strong> Statistics compiled from peer-reviewed studies, federal databases, and longitudinal research programs tracking neurodivergent outcomes in education and employment.</p>
                </div>
                <div>
                  <p><strong>Validation:</strong> All statistics cross-referenced with multiple sources and updated to reflect the most recent available data (2024-2025 reports).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};