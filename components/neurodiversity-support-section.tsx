"use client";

import { Clock, Users, Target, Palette, Brain, Shield, Heart, Globe, UserCheck, CheckCircle } from "lucide-react";

const supportStrategies = [
  {
    icon: Clock,
    title: "Time-boxing & Focus",
    description: "Time management that works with neurodivergent attention patterns",
    strategies: [
      "Pomodoro: 20-25 min work blocks with 5-10 min breaks (adjust to your attention span)",
      "Body-doubling: work alongside others (virtually or in-person) for natural accountability",
      "Time-blocking with buffer zones for transitions and unexpected needs"
    ]
  },
  {
    icon: Users,
    title: "Peer Support & Community",
    description: "Building meaningful connections and mutual accountability",
    strategies: [
      "Find neurodivergent peer groups or online communities for shared understanding",
      "Set up gentle accountability partnerships with clear boundaries",
      "Practice self-advocacy skills in supportive environments first"
    ]
  },
  {
    icon: Target,
    title: "Task Prioritization",
    description: "Systems that help distinguish urgent from important",
    strategies: [
      "Energy-based scheduling: match high-energy times to demanding tasks",
      "The 2-minute rule: if it takes under 2 minutes, do it immediately",
      "Visual priority systems: colors, symbols, or physical sorting that make sense to you"
    ]
  },
  {
    icon: Palette,
    title: "Sensory Environment Design",
    description: "Creating spaces that support your sensory processing needs",
    strategies: [
      "Identify your sensory preferences: background noise levels, lighting, textures",
      "Create sensory toolkits: fidgets, weighted items, noise-canceling options",
      "Design transition rituals between different sensory environments"
    ]
  },
  {
    icon: Brain,
    title: "Cognitive Load Reduction",
    description: "Managing mental resources and decision fatigue",
    strategies: [
      "External brain systems: calendars, reminders, and visual cues for routine tasks",
      "Decision templates: pre-made frameworks for recurring choices",
      "Cognitive rest periods: scheduled downtime for processing and recovery"
    ]
  },
  {
    icon: Shield,
    title: "Self-Advocacy & Accommodation",
    description: "Building skills to communicate your needs effectively",
    strategies: [
      "Develop your accommodation language: specific, solution-focused requests",
      "Practice disclosure strategies that feel safe and empowering",
      "Build evidence for what works: track patterns and successful strategies"
    ]
  }
];

const quickActions = [
  "Set up a Pomodoro timer on your phone/computer (20 min work / 5 min break)",
  "Create a color-coded task board (physical sticky notes or digital app): Red=Urgent, Yellow=Important, Green=Optional",
  "Invite a coworking partner to a 20-min 'body-doubling' session via Zoom or in-person",
  "Test a noise-blocking method (headphones, white noise app) or find your optimal sound environment",
  "Draft a short self-advocacy note: list your patterns, strengths, and needed accommodations",
  "Contact a local neurodiversity support organization for consultation and community connection",
  "Experiment with fidget tools or movement breaks that signal focus vs. rest time",
  "Document what helps and what doesn't - create your personal accommodation toolkit"
];

export function NeurodiversitySupportSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Practical Neurodiversity Strategies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Evidence-based strategies designed by and for neurodivergent individuals. Start with what works, adapt to your unique needs, and build your personal toolkit.
          </p>
        </div>

        {/* Support Strategies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {supportStrategies.map((strategy, index) => {
            const IconComponent = strategy.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl mr-4">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{strategy.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{strategy.description}</p>
                <ul className="space-y-3">
                  {strategy.strategies.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Quick Action List */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl inline-flex items-center mb-6">
              <CheckCircle className="h-8 w-8 text-white mr-3" />
              <h3 className="text-2xl font-bold text-white">Quick Action List</h3>
            </div>
            <p className="text-lg text-gray-600">
              Start implementing these strategies in the next 24 hours for immediate impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="flex items-start p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200"
              >
                <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <span className="text-gray-800 font-medium">{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Remember: You are the expert on your own neurodivergent experience. These strategies are tested starting points - adapt, combine, and modify them to build your personal toolkit.
          </p>
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
            <p className="text-sm text-gray-700 italic">
              "Nothing about us, without us" - All strategies here are informed by neurodivergent voices, lived experiences, and peer-reviewed research.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
