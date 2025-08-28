"use client"
import { User, Users, Building2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { DottedPattern } from "../ui/dotted-pattern"

export function AiForBusinessSize() {
  return (
    <section className="py-24 md:py-32 bg-zinc-900 text-white relative overflow-hidden">
      {/* Add dotted pattern to top-right corner */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3">
        <DottedPattern color="#ffffff" dotSize={1.5} spacing={25} opacity={0.15} />
      </div>

      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight text-center">
            LLM Implementation by Business Size
          </h2>
          <p className="text-zinc-300 mb-16 text-center">
            The approach to implementing LLMs varies based on your organization's size, resources, and needs. Explore
            tailored strategies for different business scales.
          </p>

          <div className="space-y-16">
            {/* Entrepreneurs Section */}
            <div id="entrepreneurs" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="bg-zinc-800 p-8 rounded-sm text-center relative overflow-hidden">
                  {/* Add dotted pattern to bottom-right corner */}
                  <div className="absolute bottom-0 right-0 w-1/2 h-1/2">
                    <DottedPattern color="#ffffff" dotSize={1} spacing={15} opacity={0.1} />
                  </div>

                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-zinc-700 flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Entrepreneurs & Solopreneurs</h3>
                  <p className="text-zinc-400 text-sm">
                    Leverage LLMs to compete with larger organizations by automating tasks and enhancing your
                    capabilities.
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <h4 className="text-lg font-medium mb-4">Key Strategies</h4>
                <ul className="space-y-4 mb-6">
                  <li className="flex">
                    <div className="mr-3 mt-1 text-white">•</div>
                    <div>
                      <p className="font-medium">Start with No-Code Tools</p>
                      <p className="text-sm text-zinc-400">
                        Utilize user-friendly platforms like ChatGPT, Claude, or Bard that require minimal technical
                        expertise.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-3 mt-1 text-white">•</div>
                    <div>
                      <p className="font-medium">Focus on Time-Saving Applications</p>
                      <p className="text-sm text-zinc-400">
                        Prioritize applications that automate time-consuming tasks like content creation, email
                        responses, and research.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-3 mt-1 text-white">•</div>
                    <div>
                      <p className="font-medium">Leverage for Customer Research</p>
                      <p className="text-sm text-zinc-400">
                        Use LLMs to analyze market trends, customer feedback, and competitor strategies to inform your
                        business decisions.
                      </p>
                    </div>
                  </li>
                </ul>
                <Link href="#applications" className="inline-flex items-center text-white hover:underline">
                  Explore Applications <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Small Business Section */}
            <div id="small-business" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="bg-zinc-800 p-8 rounded-sm text-center relative overflow-hidden">
                  {/* Add dotted pattern to top-left corner */}
                  <div className="absolute top-0 left-0 w-1/2 h-1/2">
                    <DottedPattern color="#ffffff" dotSize={1} spacing={15} opacity={0.1} />
                  </div>

                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-zinc-700 flex items-center justify-center">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Small & Medium Businesses</h3>
                  <p className="text-zinc-400 text-sm">
                    Implement cost-effective LLM solutions to enhance customer service, marketing, and operational
                    efficiency.
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <h4 className="text-lg font-medium mb-4">Key Strategies</h4>
                <ul className="space-y-4 mb-6">
                  <li className="flex">
                    <div className="mr-3 mt-1 text-white">•</div>
                    <div>
                      <p className="font-medium">Develop a Phased Approach</p>
                      <p className="text-sm text-zinc-400">
                        Start with high-impact, low-complexity applications and gradually expand to more sophisticated
                        use cases.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-3 mt-1 text-white">•</div>
                    <div>
                      <p className="font-medium">Invest in API Integration</p>
                      <p className="text-sm text-zinc-400">
                        Connect LLMs to your existing systems through APIs to automate workflows and enhance customer
                        interactions.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-3 mt-1 text-white">•</div>
                    <div>
                      <p className="font-medium">Train Key Team Members</p>
                      <p className="text-sm text-zinc-400">
                        Develop internal expertise by training select employees to become LLM specialists who can
                        support broader adoption.
                      </p>
                    </div>
                  </li>
                </ul>
                <Link href="#implementation" className="inline-flex items-center text-white hover:underline">
                  Implementation Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Enterprise Section */}
            <div id="enterprise" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="bg-zinc-800 p-8 rounded-sm text-center relative overflow-hidden">
                  {/* Add dotted pattern to bottom-left corner */}
                  <div className="absolute bottom-0 left-0 w-1/2 h-1/2">
                    <DottedPattern color="#ffffff" dotSize={1} spacing={15} opacity={0.1} />
                  </div>

                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-zinc-700 flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Large Organizations</h3>
                  <p className="text-zinc-400 text-sm">
                    Scale AI implementation across departments to drive innovation, improve decision-making, and
                    maintain competitive advantage.
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <h4 className="text-lg font-medium mb-4">Key Strategies</h4>
                <ul className="space-y-4 mb-6">
                  <li className="flex">
                    <div className="mr-3 mt-1 text-white">•</div>
                    <div>
                      <p className="font-medium">Develop a Comprehensive AI Strategy</p>
                      <p className="text-sm text-zinc-400">
                        Create a cohesive strategy that aligns LLM implementation with broader business objectives and
                        existing AI initiatives.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-3 mt-1 text-white">•</div>
                    <div>
                      <p className="font-medium">Establish a Center of Excellence</p>
                      <p className="text-sm text-zinc-400">
                        Create a dedicated team responsible for LLM governance, best practices, and cross-departmental
                        implementation.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-3 mt-1 text-white">•</div>
                    <div>
                      <p className="font-medium">Consider Custom Fine-Tuning</p>
                      <p className="text-sm text-zinc-400">
                        Invest in fine-tuning models for specific use cases to improve performance and reduce costs at
                        scale.
                      </p>
                    </div>
                  </li>
                </ul>
                <Link href="/contact" className="inline-flex items-center text-white hover:underline">
                  Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add dotted pattern to bottom-left corner */}
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4">
        <DottedPattern color="#ffffff" dotSize={1.5} spacing={25} opacity={0.15} />
      </div>
    </section>
  )
}
