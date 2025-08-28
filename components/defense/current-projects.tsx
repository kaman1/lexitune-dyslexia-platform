"use client"
import { DottedPattern } from "../ui/dotted-pattern"
import { CheckCircle, Eye } from "lucide-react"
import Image from "next/image"

export function DefenseCurrentProjects() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Add dotted pattern to top-left corner */}
      <div className="absolute top-0 left-0 w-1/4 h-1/4">
        <DottedPattern color="#000000" dotSize={1} spacing={25} opacity={0.05} />
      </div>

      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight">Current Projects</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              We're developing advanced solutions that address critical challenges in both defense and commercial
              sectors.
            </p>
          </div>

          <div className="border border-zinc-200 bg-white overflow-hidden mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center mr-4">
                    <Eye className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-medium">Immersive MR Inspection</h3>
                </div>
                <div className="mb-6">
                  <span className="inline-block bg-zinc-100 px-2 py-1 text-xs font-medium mb-2">TRL 1</span>
                  <span className="inline-block bg-zinc-100 px-2 py-1 text-xs font-medium mb-2 ml-2">Dual-use</span>
                </div>
                <p className="text-sm text-zinc-500 mb-6">
                  Our solution harnesses the power of mixed reality and advanced 3D data processing to transform asset
                  inspections and modernization planning across both defense and commercial sectors. By delivering
                  immersive visualization, real‑time multi-user collaboration, and automated documentation through
                  intuitive annotation tools, we enable teams to quickly identify discrepancies, streamline maintenance
                  workflows, and make data‑driven decisions that reduce costly rework and accelerate innovation.
                </p>

                <h4 className="font-medium mb-4">Key Capabilities</h4>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-500">Immersive visualization of complex assets and systems</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-500">Real-time multi-user collaboration in mixed reality</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-500">Automated documentation through intuitive annotation tools</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-500">Streamlined maintenance workflows and decision support</p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-100 p-8 flex items-center justify-center">
                <div className="relative h-64 w-full">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Immersive MR Inspection"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                    <p className="text-center font-medium">Immersive MR Inspection Visualization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-zinc-500 mb-4">
              Our dual-use approach ensures that innovations developed for defense applications can be adapted for
              commercial use, maximizing impact and sustainability.
            </p>
          </div>
        </div>
      </div>

      {/* Add dotted pattern to bottom-right corner */}
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4">
        <DottedPattern color="#000000" dotSize={1} spacing={25} opacity={0.05} />
      </div>
    </section>
  )
}
