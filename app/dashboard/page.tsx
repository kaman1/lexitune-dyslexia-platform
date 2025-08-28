"use client";

import * as React from "react";
import Image from "next/image";
import { Home, Settings, CreditCard, HelpCircle, Search } from "lucide-react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

// Feature data for the carousel
const readingFeatures = [
  {
    src: "https://images.unsplash.com/photo-1724245047328-431c55de6cb7?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Personalized Practice Generation",
    category: "AI Core",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Our AI dynamically creates decodable texts, word lists, and phonemic awareness drills tailored to your current reading level and progress.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Adaptive Learning</h4>
            <p className="text-sm text-blue-700 dark:text-blue-200">Content adjusts to your individual progress and learning pace</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">OG Fidelity</h4>
            <p className="text-sm text-green-700 dark:text-green-200">Maintains Orton-Gillingham methodology principles</p>
          </div>
        </div>
      </div>
    )
  },
  {
    src: "https://images.unsplash.com/photo-1659698328281-53fc377cebcb?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "AI Voice for Multisensory Learning",
    category: "Voice Technology",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Advanced AI voice technology provides accurate phoneme modeling and immediate pronunciation feedback for enhanced multisensory learning.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Precise Pronunciation</h4>
            <p className="text-sm text-purple-700 dark:text-purple-200">Accurate phoneme modeling for clear sound recognition</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Instant Feedback</h4>
            <p className="text-sm text-orange-700 dark:text-orange-200">Immediate correction and guidance during reading practice</p>
          </div>
        </div>
      </div>
    )
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1664372145591-f7cc308ff5da?q=80&w=996&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "24/7 At-Home OG Support",
    category: "Accessibility",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Round-the-clock access to AI-powered reading instruction and practice sessions, bringing Orton-Gillingham methodology into your home.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-pink-900 dark:text-pink-100 mb-2">Flexible Scheduling</h4>
            <p className="text-sm text-pink-700 dark:text-pink-200">Practice anytime that fits your schedule and energy levels</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Consistent Practice</h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-200">Maintains learning momentum outside traditional hours</p>
          </div>
        </div>
      </div>
    )
  },
  {
    src: "/2.mp4",
    title: "Video Tips & Tutorials",
    category: "Learning Resources",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Access comprehensive video tutorials and tips to enhance your reading journey with step-by-step guidance and expert insights.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Step-by-Step Guides</h4>
            <p className="text-sm text-red-700 dark:text-red-200">Detailed tutorials for every reading technique and strategy</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Expert Insights</h4>
            <p className="text-sm text-blue-700 dark:text-blue-200">Professional tips and best practices from reading specialists</p>
          </div>
        </div>
      </div>
    )
  },
  {
    src: "https://images.unsplash.com/photo-1625014053925-88bef4805a76?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Visual-Spatial Processing Support",
    category: "Cognitive Enhancement",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Leverages your natural visual-spatial strengths to enhance word recognition, text pattern recognition, and reading comprehension.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-cyan-900 dark:text-cyan-100 mb-2">Word Visualization</h4>
            <p className="text-sm text-cyan-700 dark:text-cyan-200">Enhanced ability to visualize words and text patterns</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Pattern Recognition</h4>
            <p className="text-sm text-emerald-700 dark:text-emerald-200">Improved ability to recognize text structures and patterns</p>
          </div>
        </div>
      </div>
    )
  },
  {
    src: "https://images.unsplash.com/photo-1703801602658-ee1840697ef8?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Data-Driven Progress Tracking",
    category: "Analytics",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Comprehensive analytics track your progress across hundreds of micro-skills, identifying learning gaps and providing precise intervention guidance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Skill Gap Analysis</h4>
            <p className="text-sm text-indigo-700 dark:text-indigo-200">Identifies specific areas needing attention and reteaching</p>
          </div>
          <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">Progress Trends</h4>
            <p className="text-sm text-teal-700 dark:text-teal-200">Long-term tracking shows improvement patterns over time</p>
          </div>
        </div>
      </div>
    )
  }
];

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const router = useRouter();

  // Filter features based on category and search query
  const filteredFeatures = readingFeatures.filter(feature => {
    const matchesCategory = selectedCategory === "all" || feature.category === selectedCategory;
    const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feature.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const carouselItems = filteredFeatures.map((feature, index) => (
    <Card key={index} card={feature} index={index} />
  ));

  const handleVideoEnter = () => {
    router.push('/videos');
  };

  // Get unique categories for the dropdown
  const categories = ["all", ...Array.from(new Set(readingFeatures.map(f => f.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      {/* Header - 30% of page */}
      <div className="h-[30vh] relative overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1724245047328-431c55de6cb7?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="AI Core background"
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Top Navigation */}
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-4">
          {/* Pill-shaped Navigation Menu */}
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-3">
            <button className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors">
              <Home className="h-4 w-4" />
              <span className="text-sm font-medium">Home</span>
            </button>
            <div className="w-px h-4 bg-white/30"></div>
            <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
              <Settings className="h-4 w-4" />
              <span className="text-sm font-medium">Settings</span>
            </button>
            <div className="w-px h-4 bg-white/30"></div>
            <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
              <CreditCard className="h-4 w-4" />
              <span className="text-sm font-medium">Plan</span>
            </button>
            <div className="w-px h-4 bg-white/30"></div>
            <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
              <HelpCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Help</span>
            </button>
          </div>
          
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Christian's avatar"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        
        {/* Header Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="text-left text-white ml-16 max-w-4xl" style={{marginLeft: '15%'}}>
            <h1 className="text-3xl md:text-4xl font-medium mb-3">
              Welcome back Christian
            </h1>
            <p className="text-base md:text-lg opacity-90 max-w-2xl">
              Your personalized AI-enhanced reading support platform, designed to unlock your reading potential through Orton-Gillingham methodology.
            </p>
          </div>
        </div>
      </div>

      {/* AI-Enhanced Reading Features Carousel */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-8 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-3 text-left" style={{color: '#333B68'}}>
                Your AI-Enhanced Reading Features
              </h2>
              <p className="text-base text-zinc-600 text-left max-w-2xl">
                Explore our comprehensive suite of AI-powered tools designed to support your reading journey with personalized, research-backed approaches.
              </p>
            </div>
            
            {/* Search and Filter Section */}
            <div className="flex items-center space-x-3">
              {/* Dropdown Filter */}
              <Select onValueChange={setSelectedCategory} defaultValue="all">
                <SelectTrigger className="w-auto bg-white rounded-full px-3 py-2 h-auto border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Search Bar */}
              <div className="bg-black rounded-full px-3 py-2 flex items-center space-x-2 shadow-sm">
                <Search className="h-4 w-4 text-white" />
                <input
                  type="text"
                  placeholder="Search features..."
                  className="bg-transparent text-white placeholder-white/70 text-sm outline-none border-none w-32"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <Carousel items={carouselItems} onVideoEnter={handleVideoEnter} />
      </div>

      {/* Disclaimer */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <p className="text-xs text-gray-500 text-left max-w-2xl">
          *This platform is for educational and support purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical concerns.
        </p>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">
              © 2024 TEKIMAX. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                Terms of Service
              </a>
              <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                Privacy Policy
              </a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
