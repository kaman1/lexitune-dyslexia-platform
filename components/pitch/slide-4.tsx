export function PitchSlide4() {
  return (
    <div className="min-h-[70vh]">
      <h2 className="text-3xl font-medium mb-12 tracking-tight">Market Opportunity</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h3 className="text-xl font-medium mb-6">Target Markets</h3>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">AI-driven Business Solutions</p>
                <p className="text-sm text-zinc-500">$1.3T by 2030</p>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full">
                <div className="h-2 bg-black rounded-full w-[85%]"/>
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                The global AI market is projected to grow from $150B in 2023 to over $1.3T by 2030
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Corporate Training & L&D</p>
                <p className="text-sm text-zinc-500">$487B by 2030</p>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full">
                <div className="h-2 bg-black rounded-full w-[75%]"/>
              </div>
              <p className="text-xs text-zinc-500 mt-1">Growing emphasis on data literacy and decision-making skills</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Decision Intelligence Software</p>
                <p className="text-sm text-zinc-500">$25.8B by 2030</p>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full">
                <div className="h-2 bg-black rounded-full w-[65%]"/>
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                CAGR of 15.1% from 2023 to 2030 as organizations seek to improve strategic decision-making
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-6">Customer Segments</h3>

          <div className="space-y-6">
            <div className="border-l-2 border-black pl-4 py-1">
              <p className="font-medium">Enterprise (250+ employees)</p>
              <p className="text-sm text-zinc-600">
                Organizations with complex decision-making processes and multiple stakeholders
              </p>
              <p className="text-xs text-zinc-500 mt-1">Target ACV: $75,000 - $250,000</p>
            </div>

            <div className="border-l-2 border-black pl-4 py-1">
              <p className="font-medium">Mid-Market (50-249 employees)</p>
              <p className="text-sm text-zinc-600">
                Growing companies establishing formal product development and customer discovery processes
              </p>
              <p className="text-xs text-zinc-500 mt-1">Target ACV: $25,000 - $75,000</p>
            </div>

            <div className="border-l-2 border-black pl-4 py-1">
              <p className="font-medium">SMB (10-49 employees)</p>
              <p className="text-sm text-zinc-600">
                Small businesses seeking to compete with larger organizations through data-driven decisions
              </p>
              <p className="text-xs text-zinc-500 mt-1">Target ACV: $5,000 - $25,000</p>
            </div>

            <div className="border-l-2 border-zinc-400 pl-4 py-1">
              <p className="font-medium text-zinc-500">Public Sector & Non-Profit</p>
              <p className="text-sm text-zinc-500">
                Served through our open source initiatives and specialized pricing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
