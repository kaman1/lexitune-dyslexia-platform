export function PitchSlide7() {
  return (
    <div className="min-h-[70vh]">
      <h2 className="text-3xl font-medium mb-12 tracking-tight">Competitive Landscape</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h3 className="text-xl font-medium mb-6">Market Positioning</h3>

          <div className="border border-zinc-200 p-6 bg-white">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">Customer Research Tools</p>
                <div className="h-1 w-full bg-zinc-100">
                  <div className="h-1 bg-black w-3/5"/>
                </div>
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">AI Integration</p>
                <div className="h-1 w-full bg-zinc-100">
                  <div className="h-1 bg-black w-4/5"/>
                </div>
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Decision Support</p>
                <div className="h-1 w-full bg-zinc-100">
                  <div className="h-1 bg-black w-4/5"/>
                </div>
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Enterprise Integration</p>
                <div className="h-1 w-full bg-zinc-100">
                  <div className="h-1 bg-black w-3/5"/>
                </div>
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-200">
              <p className="text-sm font-medium mb-2">Competitive Advantage</p>
              <p className="text-sm text-zinc-600">
                Tekimax uniquely combines customer discovery skill development, AI-powered analysis, and decision
                support in a single integrated platform.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-6">Competitor Analysis</h3>

          <div className="space-y-6">
            <div className="border-l-2 border-black pl-4 py-2">
              <p className="font-medium">Customer Research Platforms</p>
              <p className="text-sm text-zinc-600 mb-2">
                Focus on data collection but lack AI-powered analysis and decision support
              </p>
              <p className="text-xs text-zinc-500">Key players: UserTesting, Dovetail, Lookback</p>
            </div>

            <div className="border-l-2 border-black pl-4 py-2">
              <p className="font-medium">Business Intelligence Tools</p>
              <p className="text-sm text-zinc-600 mb-2">
                Strong in data visualization but weak in qualitative insights and customer discovery
              </p>
              <p className="text-xs text-zinc-500">Key players: Tableau, Power BI, Looker</p>
            </div>

            <div className="border-l-2 border-black pl-4 py-2">
              <p className="font-medium">AI Analysis Platforms</p>
              <p className="text-sm text-zinc-600 mb-2">
                Provide AI-powered insights but lack integrated customer discovery capabilities
              </p>
              <p className="text-xs text-zinc-500">Key players: Anthropic, Cohere, Palantir</p>
            </div>

            <div className="border-l-2 border-zinc-400 pl-4 py-2">
              <p className="font-medium text-zinc-500">Tekimax Differentiation</p>
              <p className="text-sm text-zinc-500">
                End-to-end solution from skill development to decision support with human-AI synergy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
