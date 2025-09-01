"use client";

import * as React from "react";
import Image from "next/image";
import { Clock, Users, Target, Palette, Brain, Shield, Heart, Globe, UserCheck, CheckCircle, Zap } from "lucide-react";

const supportStrategies = [
  {
    icon: Clock,
    title: "Time Magic",
    description: "Master your unique rhythm",
    emoji: "⏰",
    color: "from-blue-400 to-blue-600",
    image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=300&h=200&fit=crop",
    strategies: [
      "🍅 Pomodoro technique (20-25 min focus blocks)",
      "👥 Body-doubling sessions for accountability",
      "📅 Buffer zones for smooth transitions"
    ]
  },
  {
    icon: Users,
    title: "Squad Goals",
    description: "Find your neurodivergent tribe",
    emoji: "🤝",
    color: "from-purple-400 to-purple-600",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop",
    strategies: [
      "🌐 Join neurodivergent communities online",
      "💬 Practice self-advocacy in safe spaces",
      "🎯 Create accountability partnerships"
    ]
  },
  {
    icon: Target,
    title: "Priority Matrix",
    description: "Energy-based task management",
    emoji: "🎯",
    color: "from-green-400 to-green-600",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=300&h=200&fit=crop",
    strategies: [
      "⚡ Match tasks to your energy levels",
      "⏱️ 2-minute rule for quick wins",
      "🎨 Visual priority systems that click"
    ]
  },
  {
    icon: Palette,
    title: "Sensory Studio",
    description: "Design your perfect environment",
    emoji: "🎨",
    color: "from-orange-400 to-orange-600",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
    strategies: [
      "🎧 Curate your sound environment",
      "💡 Optimize lighting for your needs",
      "🧸 Build a sensory toolkit"
    ]
  },
  {
    icon: Brain,
    title: "Mental RAM",
    description: "Optimize your cognitive resources",
    emoji: "🧠",
    color: "from-pink-400 to-pink-600",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
    strategies: [
      "📱 External brain systems (apps, calendars)",
      "🗂️ Decision templates for routine choices",
      "😴 Schedule cognitive rest periods"
    ]
  },
  {
    icon: Shield,
    title: "Advocacy Toolkit",
    description: "Communicate your needs powerfully",
    emoji: "🛡️",
    color: "from-indigo-400 to-indigo-600",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=300&h=200&fit=crop",
    strategies: [
      "📝 Develop clear accommodation language",
      "💪 Practice safe disclosure strategies",
      "📊 Track what works for you"
    ]
  }
];

const quickActions = [
  { action: "⏱️ Set up Pomodoro timer", time: "2 min", impact: "High" },
  { action: "🎨 Create color-coded task board", time: "10 min", impact: "High" },
  { action: "👥 Schedule body-doubling session", time: "5 min", impact: "Medium" },
  { action: "🎧 Test optimal sound environment", time: "15 min", impact: "High" },
  { action: "📝 Draft self-advocacy note", time: "20 min", impact: "Medium" },
  { action: "🌐 Find neurodiversity community", time: "15 min", impact: "High" },
  { action: "🧸 Experiment with fidget tools", time: "5 min", impact: "Low" },
  { action: "📊 Start accommodation tracker", time: "10 min", impact: "High" }
];

export function NeurodiversitySupportSection() {
  const [selectedStrategy, setSelectedStrategy] = React.useState(0);

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-gradient-to-r from-yellow-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-white/50 rounded-full px-8 py-4 shadow-lg mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-zinc-700 font-semibold text-lg">Your Toolkit</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 text-zinc-900">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Evidence-Based
            </span>
            <br />Neurodivergent Support
          </h2>
          
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto mb-8">
            Research-backed strategies with proven improvement rates. Each strategy designed by research, validated by outcomes.
          </p>
        </div>

        {/* Horizontal Scrolling Strategy Cards */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-zinc-900 mb-8 text-center">🧠 Strategy Collection</h3>
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
            {supportStrategies.map((strategy, index) => {
              const IconComponent = strategy.icon;
              return (
                <div
                  key={index}
                  className={`flex-shrink-0 w-80 bg-white rounded-2xl shadow-xl border border-white/50 p-6 transition-all duration-300 hover:scale-105 cursor-pointer ${
                    selectedStrategy === index ? 'ring-4 ring-indigo-200 ring-opacity-50' : ''
                  }`}
                  onClick={() => setSelectedStrategy(index)}
                >
                  <div className="relative mb-4">
                    <Image
                      src={strategy.image}
                      alt={strategy.title}
                      width={300}
                      height={160}
                      className="rounded-xl object-cover w-full h-40"
                    />
                    <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${strategy.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl">{strategy.emoji}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-zinc-900 mb-2">{strategy.title}</h4>
                    <p className="text-zinc-600 text-sm mb-4">{strategy.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    {strategy.strategies.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-sm text-zinc-700 bg-zinc-50 rounded-lg px-3 py-2">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-zinc-500">← Scroll horizontally to explore all strategies →</p>
          </div>
        </div>

        {/* Quick Action Dashboard */}
        <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/50 shadow-2xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl px-8 py-4 shadow-xl mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white">Action Dashboard</h3>
            </div>
            <p className="text-lg text-zinc-600">Pick your impact level and dive in! 🚀</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-zinc-200 hover:border-indigo-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                    item.impact === 'High' ? 'bg-red-500' : item.impact === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-zinc-500">{item.time}</div>
                    <div className={`text-xs font-semibold ${
                      item.impact === 'High' ? 'text-red-600' : item.impact === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {item.impact} Impact
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium text-zinc-800 group-hover:text-indigo-600 transition-colors">
                  {item.action}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl px-8 py-6 text-white shadow-2xl">
            <div className="flex gap-2">
              <Heart className="h-6 w-6 animate-pulse" />
              <Brain className="h-6 w-6 animate-bounce" />
              <Zap className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <p className="text-lg font-bold mb-1">You've got this! 💪</p>
              <p className="text-sm opacity-90">"Nothing about us, without us" - Built by neurodivergent minds</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
