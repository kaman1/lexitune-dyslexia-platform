export function PitchSlide8() {
  return (
    <div className="min-h-[70vh]">
      <h2 className="text-3xl font-medium mb-12 tracking-tight">
        Investment Opportunity
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h3 className="text-xl font-medium mb-6">Funding Round</h3>

          <div className="space-y-6 mb-8">
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium">Round</p>
                <p className="text-zinc-600">Seed</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium">Target Amount</p>
                <p className="text-zinc-600">$3.5M</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium">Pre-Money Valuation</p>
                <p className="text-zinc-600">$12M</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium">Use of Funds</p>
              </div>
              <div className="mt-2">
                <div className="flex items-center mb-2">
                  <div className="w-24 h-4 bg-black mr-3"/>
                  <p className="text-sm">Product Development (45%)</p>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-16 h-4 bg-black mr-3"/>
                  <p className="text-sm">Sales & Marketing (30%)</p>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-8 h-4 bg-black mr-3"/>
                  <p className="text-sm">Operations (15%)</p>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-4 bg-black mr-3"/>
                  <p className="text-sm">Reserve (10%)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-6">Team</h3>

          <div className="space-y-6">
            <div className="flex">
              <div className="h-12 w-12 bg-zinc-200 rounded-full mr-4 flex-shrink-0"/>
              <div>
                <p className="font-medium">Jane Smith</p>
                <p className="text-sm text-zinc-600 mb-1">CEO & Co-Founder</p>
                <p className="text-xs text-zinc-500">
                  Former VP of Product at [Enterprise SaaS], 15+ years in
                  product management and strategy
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="h-12 w-12 bg-zinc-200 rounded-full mr-4 flex-shrink-0"/>
              <div>
                <p className="font-medium">Michael Johnson</p>
                <p className="text-sm text-zinc-600 mb-1">CTO & Co-Founder</p>
                <p className="text-xs text-zinc-500">
                  Former Lead AI Engineer at [Tech Giant], 12+ years in AI/ML
                  and software development
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="h-12 w-12 bg-zinc-200 rounded-full mr-4 flex-shrink-0"/>
              <div>
                <p className="font-medium">Sarah Williams</p>
                <p className="text-sm text-zinc-600 mb-1">
                  VP of Customer Success
                </p>
                <p className="text-xs text-zinc-500">
                  Former Director of Customer Experience at [SaaS Company], 10+
                  years in customer success
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="h-12 w-12 bg-zinc-200 rounded-full mr-4 flex-shrink-0"/>
              <div>
                <p className="font-medium">David Chen</p>
                <p className="text-sm text-zinc-600 mb-1">VP of Engineering</p>
                <p className="text-xs text-zinc-500">
                  Former Engineering Manager at [Tech Company], 8+ years in
                  software engineering
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-black text-white text-center">
        <h3 className="text-xl font-medium mb-4">Contact</h3>
        <p className="mb-2">Jane Smith, CEO</p>
        <p className="text-sm">jane@tekimax.com | (555) 123-4567</p>
      </div>
    </div>
  );
}
