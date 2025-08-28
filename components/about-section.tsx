export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="container px-4">
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight text-center">About Tekimax</h2>
          <p className="text-zinc-500 text-center">
            We've built Tekimax to solve a critical challenge: making better strategic decisions based on real insights
            rather than assumptions for both businesses and community organizations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
          <div>
            <h3 className="text-lg font-medium mb-8">Our Value Proposition</h3>
            <div className="space-y-8">
              <div className="border-b border-zinc-200 pb-6">
                <h4 className="font-medium mb-2">Team Empowerment</h4>
                <p className="text-sm text-zinc-500">
                  We equip teams at all levels with the skills and practice needed for effective customer discovery,
                  enabling them to gather meaningful insights that drive product development.
                </p>
              </div>
              <div className="border-b border-zinc-200 pb-6">
                <h4 className="font-medium mb-2">Leadership Confidence</h4>
                <p className="text-sm text-zinc-500">
                  We provide leadership with data-driven confidence to greenlight projects that meet rigorous validation
                  criteria, reducing the risk of building products without market fit.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Community Impact</h4>
                <p className="text-sm text-zinc-500">
                  Our open source initiatives extend our mission beyond commercial success, helping public sector and
                  non-profit organizations make better decisions with limited resources.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-8">Market Positioning</h3>
            <div className="border border-zinc-200 p-6 bg-white">
              <div className="grid grid-cols-1 gap-6">
                <div className="border-b border-zinc-200 pb-4">
                  <p className="text-sm font-medium mb-2">Corporate Training & L&D</p>
                  <div className="h-1 w-full bg-zinc-100">
                    <div className="h-1 bg-black w-3/4"></div>
                  </div>
                </div>
                <div className="border-b border-zinc-200 pb-4">
                  <p className="text-sm font-medium mb-2">AI-driven Business Solutions</p>
                  <div className="h-1 w-full bg-zinc-100">
                    <div className="h-1 bg-black w-4/5"></div>
                  </div>
                </div>
                <div className="border-b border-zinc-200 pb-4">
                  <p className="text-sm font-medium mb-2">SaaS Market</p>
                  <div className="h-1 w-full bg-zinc-100">
                    <div className="h-1 bg-black w-2/3"></div>
                  </div>
                </div>
                <div className="border-b border-zinc-200 pb-4">
                  <p className="text-sm font-medium mb-2">Public Sector Solutions</p>
                  <div className="h-1 w-full bg-zinc-100">
                    <div className="h-1 bg-black w-4/5"></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-zinc-500 mt-6">
                The combined scale and growth trajectory of these sectors underscore a significant market opportunity
                for our integrated solution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
