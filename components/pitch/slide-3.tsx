export function PitchSlide3() {
  return (
    <div className="min-h-[70vh]">
      <h2 className="text-3xl font-medium mb-12 tracking-tight">
        Our Solution
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h3 className="text-xl font-medium mb-6">Tekimax Platform</h3>
          <p className="text-zinc-600 mb-8">
            We provide a comprehensive platform that combines human-led customer
            discovery with AI-powered analysis to drive better strategic
            decisions.
          </p>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium">Customer Discovery</p>
                <p className="text-sm text-zinc-500">
                  Structured interview frameworks and AI-powered practice
                  sessions to develop critical skills.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium">Insight Analysis</p>
                <p className="text-sm text-zinc-500">
                  AI-enhanced analysis of customer interviews to identify
                  patterns and extract actionable insights.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-medium">Decision Support</p>
                <p className="text-sm text-zinc-500">
                  Comprehensive dashboards that provide leadership with
                  data-driven confidence to greenlight projects.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 text-white p-8 flex flex-col justify-center">
          <h3 className="text-xl font-medium mb-6">Key Differentiators</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full border border-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                ✓
              </div>
              <p>
                Human-AI synergy that combines the best of both capabilities
              </p>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full border border-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                ✓
              </div>
              <p>
                End-to-end solution from skill development to decision support
              </p>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full border border-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                ✓
              </div>
              <p>
                Centralized insight repository that breaks down organizational
                silos
              </p>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full border border-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                ✓
              </div>
              <p>
                Open source components that extend our mission beyond commercial
                success
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
