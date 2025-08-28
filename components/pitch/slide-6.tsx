export function PitchSlide6() {
  return (
    <div className="min-h-[70vh]">
      <h2 className="text-3xl font-medium mb-12 tracking-tight">Go-to-Market Strategy</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h3 className="text-xl font-medium mb-6">Acquisition Channels</h3>

          <div className="space-y-6">
            <div className="border-l-2 border-black pl-4 py-2">
              <p className="font-medium">Content Marketing & SEO</p>
              <p className="text-sm text-zinc-600">
                Thought leadership content focused on customer discovery, AI implementation, and data-driven decision
                making
              </p>
            </div>

            <div className="border-l-2 border-black pl-4 py-2">
              <p className="font-medium">Strategic Partnerships</p>
              <p className="text-sm text-zinc-600">
                Alliances with consulting firms, AI providers, and industry-specific solution providers
              </p>
            </div>

            <div className="border-l-2 border-black pl-4 py-2">
              <p className="font-medium">Direct Sales</p>
              <p className="text-sm text-zinc-600">
                Enterprise-focused sales team targeting key accounts in high-value industries
              </p>
            </div>

            <div className="border-l-2 border-black pl-4 py-2">
              <p className="font-medium">Open Source Community</p>
              <p className="text-sm text-zinc-600">
                Building awareness and credibility through our open source initiatives
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-6">Growth Strategy</h3>

          <div className="space-y-8">
            <div className="flex">
              <div className="mr-4 mt-1">
                <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center text-white text-sm">
                  1
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Land & Expand</h4>
                <p className="text-sm text-zinc-600">
                  Start with team-level deployments and expand across departments as value is demonstrated
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="mr-4 mt-1">
                <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center text-white text-sm">
                  2
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Vertical Specialization</h4>
                <p className="text-sm text-zinc-600">
                  Develop industry-specific solutions for high-value verticals (healthcare, financial services, etc.)
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="mr-4 mt-1">
                <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center text-white text-sm">
                  3
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">International Expansion</h4>
                <p className="text-sm text-zinc-600">
                  Expand into key international markets after establishing strong U.S. presence
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-zinc-50 border border-zinc-200">
            <h4 className="font-medium mb-4">Key Milestones</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm">Product-Market Fit</p>
                <p className="text-sm font-medium">Q3 2025</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">$1M ARR</p>
                <p className="text-sm font-medium">Q2 2026</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">$5M ARR</p>
                <p className="text-sm font-medium">Q4 2027</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">International Expansion</p>
                <p className="text-sm font-medium">Q2 2028</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
