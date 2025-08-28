"use client"
import { ArrowRight, MessageSquare, Users, BarChart2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ValueProposition() {
  const products = [
    {
      title: "Customer Discovery",
      description: "Gather, analyze, and act on customer insights with our structured discovery platform.",
      icon: <MessageSquare className="h-5 w-5 text-white" />,
      color: "bg-zinc-900",
      action: "create-account",
    },
    {
      title: "Interview Practice",
      description: "Develop better questioning techniques with AI-powered interview simulations.",
      icon: <Users className="h-5 w-5 text-white" />,
      color: "bg-zinc-900",
      action: "create-account",
    },
    {
      title: "Leadership Dashboard",
      description: "Make confident decisions with comprehensive data visualization and analysis tools.",
      icon: <BarChart2 className="h-5 w-5 text-white" />,
      color: "bg-zinc-900",
      action: "coming-soon",
    },
  ]

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-medium mb-8 tracking-tight">Better decisions through data</h2>
              <p className="text-zinc-500 mb-8">
                Tekimax transforms how organizations make strategic decisions by combining human intuition with
                AI-powered analysis, ensuring resources are allocated to validated initiatives with real market fit.
              </p>
              <div className="flex items-center">
                <Link href="#tech-beliefs" className="group flex items-center text-sm font-medium">
                  Learn how it works
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {products.map((product, index) => (
                <div key={index} className="border border-zinc-200 flex overflow-hidden">
                  {/* Left side - Color bar (2%) */}
                  <div className={`w-[2%] ${product.color}`}>
                    <div className="h-full flex items-center justify-center p-2">{product.icon}</div>
                  </div>

                  {/* Right side - Content (98%) */}
                  <div className="p-6 flex-1">
                    <h3 className="text-lg font-medium mb-2">{product.title}</h3>
                    <p className="text-sm text-zinc-500 mb-4">{product.description}</p>
                    <div>
                      {product.action === "create-account" ? (
                        <Button size="sm">Create free account</Button>
                      ) : product.action === "coming-soon" ? (
                        <span className="text-xs bg-zinc-100 px-2 py-1 rounded-full">Coming soon</span>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
