"use client"

import type React from "react"

import { useState } from "react"
import { TopNavigation } from "@/components/top-navigation"
import { FooterWaitlist } from "@/components/footer-waitlist"
import { InvestorContactForm } from "@/components/investor-contact-form"
import { ChevronRight, TrendingUp, Shield, LineChart, Users, BarChart2, Lock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function InvestorsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState("")

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate against a secure backend
    // This is just a simple example
    if (password === "investor123") {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Incorrect password. Please try again.")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <TopNavigation />

        <main className="flex-grow pt-16">
          {/* Password Protected Section */}
          <section className="bg-zinc-900 text-white py-24 md:py-32">
            <div className="container px-4">
              <div className="max-w-md mx-auto text-center">
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-medium mb-6">Investor Relations</h1>
                <p className="text-zinc-300 text-lg mb-8">
                  This page is password protected. Please enter the investor password to continue.
                </p>

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  />
                  {error && <p className="text-red-400 text-sm">{error}</p>}
                  <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200">
                    Access Investor Information
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <FooterWaitlist />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopNavigation />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-zinc-900 text-white py-24 md:py-32">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-medium mb-6">Investor Relations</h1>
              <p className="text-zinc-300 text-lg mb-8">
                Tekimax is transforming how organizations make strategic decisions by combining human intuition with
                AI-powered analysis.
              </p>
              <div className="inline-flex items-center">
                <Link
                  href="#contact"
                  className="bg-white text-black px-6 py-3 font-medium text-sm hover:bg-zinc-100 transition-colors"
                >
                  Connect with Our Team <ChevronRight className="ml-2 h-4 w-4 inline" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="border-b border-zinc-200">
          <div className="container px-4">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === "overview" ? "border-b-2 border-black text-black" : "text-zinc-500 hover:text-black"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("market")}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === "market" ? "border-b-2 border-black text-black" : "text-zinc-500 hover:text-black"
                }`}
              >
                Market Opportunity
              </button>
              <button
                onClick={() => setActiveTab("traction")}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === "traction" ? "border-b-2 border-black text-black" : "text-zinc-500 hover:text-black"
                }`}
              >
                Traction & Metrics
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="py-16">
          <div className="container px-4">
            {activeTab === "overview" && (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-medium mb-8">Company Overview</h2>
                <p className="text-zinc-600 mb-8">
                  Tekimax is a data-driven decision platform that helps organizations make better strategic decisions by
                  combining human intuition with AI-powered analysis. Our suite of tools supports each phase of the
                  discovery and decision process, from customer interviews to executive approval.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="border border-zinc-200 p-6">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center mr-4">
                        <Shield className="h-5 w-5 text-zinc-900" />
                      </div>
                      <h3 className="font-medium">Our Mission</h3>
                    </div>
                    <p className="text-sm text-zinc-600">
                      To democratize data-driven decision making by providing tools that augment human capabilities with
                      AI-powered insights, enabling organizations of all sizes to make better strategic decisions.
                    </p>
                  </div>

                  <div className="border border-zinc-200 p-6">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center mr-4">
                        <TrendingUp className="h-5 w-5 text-zinc-900" />
                      </div>
                      <h3 className="font-medium">Growth Strategy</h3>
                    </div>
                    <p className="text-sm text-zinc-600">
                      Our growth strategy focuses on expanding our enterprise customer base while simultaneously
                      developing our open source community to drive innovation and adoption across sectors.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-medium mb-6">Leadership Team</h3>
                <p className="text-zinc-600 mb-8">
                  Our leadership team brings together expertise in AI, product development, and enterprise software from
                  companies including [redacted for privacy]. With decades of combined experience, our team has a proven
                  track record of building and scaling successful technology companies.
                </p>
              </div>
            )}

            {activeTab === "market" && (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-medium mb-8">Market Opportunity</h2>
                <p className="text-zinc-600 mb-8">
                  Tekimax operates at the intersection of several rapidly growing markets, positioning us to capture
                  significant value as organizations increasingly prioritize data-driven decision making.
                </p>

                <div className="space-y-8 mb-12">
                  <div className="border border-zinc-200 p-6">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center mr-4">
                        <LineChart className="h-5 w-5 text-zinc-900" />
                      </div>
                      <h3 className="font-medium">AI-Powered Business Solutions</h3>
                    </div>
                    <p className="text-sm text-zinc-600 mb-4">
                      The global AI market is projected to grow from $150 billion in 2023 to over $1.3 trillion by 2030,
                      with enterprise applications representing the largest segment.
                    </p>
                    <div className="h-2 w-full bg-zinc-100 rounded-full">
                      <div className="h-2 bg-black rounded-full w-[85%]"></div>
                    </div>
                  </div>

                  <div className="border border-zinc-200 p-6">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center mr-4">
                        <Users className="h-5 w-5 text-zinc-900" />
                      </div>
                      <h3 className="font-medium">Corporate Training & L&D</h3>
                    </div>
                    <p className="text-sm text-zinc-600 mb-4">
                      The corporate training market is expected to reach $487 billion by 2030, with a growing emphasis
                      on data literacy and decision-making skills.
                    </p>
                    <div className="h-2 w-full bg-zinc-100 rounded-full">
                      <div className="h-2 bg-black rounded-full w-[75%]"></div>
                    </div>
                  </div>

                  <div className="border border-zinc-200 p-6">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center mr-4">
                        <BarChart2 className="h-5 w-5 text-zinc-900" />
                      </div>
                      <h3 className="font-medium">Decision Intelligence Software</h3>
                    </div>
                    <p className="text-sm text-zinc-600 mb-4">
                      The decision intelligence market is projected to grow at a CAGR of 15.1% from 2023 to 2030,
                      reaching $25.8 billion as organizations seek to improve strategic decision-making processes.
                    </p>
                    <div className="h-2 w-full bg-zinc-100 rounded-full">
                      <div className="h-2 bg-black rounded-full w-[65%]"></div>
                    </div>
                  </div>
                </div>

                <p className="text-zinc-600">
                  Our unique position at the intersection of these markets allows us to address the growing demand for
                  tools that enhance human decision-making capabilities with AI-powered insights.
                </p>
              </div>
            )}

            {activeTab === "traction" && (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-medium mb-8">Traction & Key Metrics</h2>
                <p className="text-zinc-600 mb-8">
                  Since our founding, Tekimax has demonstrated strong growth across key metrics, validating our product
                  market fit and business model.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                  <div className="border border-zinc-200 p-6 text-center">
                    <div className="text-3xl font-medium mb-2">500+</div>
                    <div className="text-sm text-zinc-500">Organizations</div>
                  </div>
                  <div className="border border-zinc-200 p-6 text-center">
                    <div className="text-3xl font-medium mb-2">10K+</div>
                    <div className="text-sm text-zinc-500">AI Interviews</div>
                  </div>
                  <div className="border border-zinc-200 p-6 text-center">
                    <div className="text-3xl font-medium mb-2">50K+</div>
                    <div className="text-sm text-zinc-500">Customer Insights</div>
                  </div>
                  <div className="border border-zinc-200 p-6 text-center">
                    <div className="text-3xl font-medium mb-2">85%</div>
                    <div className="text-sm text-zinc-500">Retention Rate</div>
                  </div>
                </div>

                <h3 className="text-xl font-medium mb-6">Growth Trajectory</h3>
                <p className="text-zinc-600 mb-8">
                  We've achieved consistent quarter-over-quarter growth of 20%+ in both revenue and user engagement
                  metrics. Our customer acquisition cost (CAC) has decreased by 35% over the past year, while customer
                  lifetime value (LTV) has increased by 40%.
                </p>

                <div className="border border-zinc-200 p-6 mb-8">
                  <h4 className="font-medium mb-4">Revenue Growth (Indexed)</h4>
                  <div className="h-40 flex items-end space-x-4">
                    <div className="flex-1 flex flex-col items-center">
                      <div className="h-[20%] w-full bg-zinc-200"></div>
                      <div className="text-xs mt-2">Q1</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="h-[35%] w-full bg-zinc-300"></div>
                      <div className="text-xs mt-2">Q2</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="h-[55%] w-full bg-zinc-400"></div>
                      <div className="text-xs mt-2">Q3</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="h-[80%] w-full bg-zinc-600"></div>
                      <div className="text-xs mt-2">Q4</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="h-[100%] w-full bg-black"></div>
                      <div className="text-xs mt-2">Current</div>
                    </div>
                  </div>
                </div>

                <p className="text-zinc-600">
                  Note: Specific financial details and customer information are available to qualified investors under
                  NDA. Please contact our investor relations team for more information.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <section id="contact" className="bg-zinc-50 py-16 md:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-medium mb-8 text-center">Connect with Our Investor Relations Team</h2>
              <p className="text-zinc-600 mb-12 text-center">
                Interested in learning more about investment opportunities with Tekimax? Our team is available to
                discuss our growth strategy, financial performance, and vision for the future.
              </p>

              <InvestorContactForm />
            </div>
          </div>
        </section>
      </main>

      <FooterWaitlist />
    </div>
  )
}
