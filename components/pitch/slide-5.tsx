export function PitchSlide5() {
  return (
    <div className="min-h-[70vh]">
      <h2 className="text-3xl font-medium mb-12 tracking-tight">Business Model</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h3 className="text-xl font-medium mb-6">Revenue Streams</h3>

          <div className="space-y-8">
            <div className="flex">
              <div className="mr-4 mt-1">
                <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center text-white text-sm">
                  1
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">SaaS Subscriptions</h4>
                <p className="text-sm text-zinc-600">
                  Tiered subscription model based on user count, features, and support level
                </p>
                <div className="mt-2 flex items-center">
                  <div className="h-2 w-24 bg-black mr-2"/>
                  <span className="text-xs text-zinc-500">75% of revenue</span>
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="mr-4 mt-1">
                <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center text-white text-sm">
                  2
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Professional Services</h4>
                <p className="text-sm text-zinc-600">Implementation, training, and custom integration services</p>
                <div className="mt-2 flex items-center">
                  <div className="h-2 w-16 bg-black mr-2"/>
                  <span className="text-xs text-zinc-500">15% of revenue</span>
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="mr-4 mt-1">
                <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center text-white text-sm">
                  3
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Enterprise Customization</h4>
                <p className="text-sm text-zinc-600">
                  Custom features, integrations, and dedicated support for enterprise clients
                </p>
                <div className="mt-2 flex items-center">
                  <div className="h-2 w-10 bg-black mr-2"/>
                  <span className="text-xs text-zinc-500">10% of revenue</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-6">Unit Economics</h3>

          <div className="space-y-6 mb-8">
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium">Customer Acquisition Cost (CAC)</p>
                <p className="text-zinc-600">$15,000</p>
              </div>
              <p className="text-xs text-zinc-500">Average for mid-market customer</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium">Annual Contract Value (ACV)</p>
                <p className="text-zinc-600">$45,000</p>
              </div>
              <p className="text-xs text-zinc-500">Average for mid-market customer</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium">Gross Margin</p>
                <p className="text-zinc-600">85%</p>
              </div>
              <p className="text-xs text-zinc-500">SaaS industry benchmark: 70-85%</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium">LTV:CAC Ratio</p>
                <p className="text-zinc-600">4.5:1</p>
              </div>
              <p className="text-xs text-zinc-500">SaaS industry benchmark: 3:1</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium">CAC Payback Period</p>
                <p className="text-zinc-600">12 months</p>
              </div>
              <p className="text-xs text-zinc-500">SaaS industry benchmark: 12-18 months</p>
            </div>
          </div>

          <div className="p-4 bg-zinc-900 text-white">
            <p className="font-medium mb-2">Key Metrics Target (Year 3)</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm">ARR</p>
                <p className="text-xl font-medium">$10M+</p>
              </div>
              <div>
                <p className="text-sm">Customers</p>
                <p className="text-xl font-medium">200+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
