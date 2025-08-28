"use client";

export function CognitiveOffloading() {
  return (
    <section className="pt-24 pb-16 relative overflow-hidden" style={{backgroundColor: '#F2C94C'}}>
      {/* Subtle background pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-8 right-16 w-32 h-32 bg-white rounded-full" />
        <div className="absolute bottom-12 left-20 w-24 h-24 bg-white rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div>
              <h2 className="text-3xl font-medium mb-8 tracking-tight" style={{color: '#333B68'}}>
                Neurodivergent STEAM Superpowers
              </h2>
              <h3 className="text-xl font-medium mb-6" style={{color: '#333B68'}}>
                Leveraging Neurodivergent Strengths in STEAM
              </h3>
              <p className="text-zinc-700 mb-8 max-w-xl leading-relaxed">
                Neurodivergent minds bring unique cognitive advantages to Science, Technology, Engineering, Arts, and Mathematics, transforming perceived "deficits" into innovation superpowers that drive breakthrough discoveries.
              </p>
            </div>

            {/* Right side - Features List */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-100">
                <h4 className="font-medium mb-3" style={{color: '#333B68'}}>
                  Pattern Recognition Excellence
                </h4>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Exceptional ability to identify complex patterns and systematic relationships in data and research
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-100">
                <h4 className="font-medium mb-3" style={{color: '#333B68'}}>
                  Innovative Problem-Solving
                </h4>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Creative approaches to challenges that lead to breakthrough solutions and novel methodologies
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-100">
                <h4 className="font-medium mb-3" style={{color: '#333B68'}}>
                  Deep Focus & Attention to Detail
                </h4>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Sustained concentration on complex tasks with meticulous attention to critical details
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-100">
                <h4 className="font-medium mb-3" style={{color: '#333B68'}}>
                  Spatial Intelligence
                </h4>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Superior 3D visualization and spatial reasoning abilities essential for engineering and mathematics
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
