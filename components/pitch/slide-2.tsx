export function PitchSlide2() {
  return (
    <div className="min-h-[70vh]">
      <h2 className="text-3xl font-medium mb-12 tracking-tight">The Problem</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="border-l-2 border-black pl-6 py-2">
            <h3 className="text-xl font-medium mb-2">Misaligned Initiatives</h3>
            <p className="text-zinc-600">
              Organizations waste resources on projects that don't address real customer needs or align with strategic
              goals.
            </p>
          </div>

          <div className="border-l-2 border-black pl-6 py-2">
            <h3 className="text-xl font-medium mb-2">Ineffective Discovery</h3>
            <p className="text-zinc-600">
              Teams lack the skills and structured processes needed to conduct effective customer interviews.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="border-l-2 border-black pl-6 py-2">
            <h3 className="text-xl font-medium mb-2">Decision Paralysis</h3>
            <p className="text-zinc-600">
              Leadership struggles to make confident decisions without clear, data-driven insights.
            </p>
          </div>

          <div className="border-l-2 border-black pl-6 py-2">
            <h3 className="text-xl font-medium mb-2">Insight Isolation</h3>
            <p className="text-zinc-600">
              Valuable customer insights remain siloed within teams instead of informing organization-wide strategy.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-zinc-50 border border-zinc-200">
        <p className="text-lg font-medium text-center">
          The result: 70% of new initiatives fail to meet business objectives
        </p>
      </div>
    </div>
  )
}
