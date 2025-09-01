"use client";

import * as React from "react";
import Image from "next/image";
import { Home, Settings, CreditCard, HelpCircle, Search, Video } from "lucide-react";
import { ResetIcon } from "@radix-ui/react-icons";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { DashboardOnboarding } from "@/components/dashboard-onboarding";
import {
  FloatingPanelBody,
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelRoot,
  FloatingPanelTrigger,
} from "@/components/ui/floating-panel";

// Feature data for the carousel
const readingFeatures = [
  {
    src: "https://images.unsplash.com/photo-1724245047328-431c55de6cb7?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Orton-Gillingham AI Tutor",
    category: "Reading Support",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          AI-powered Orton-Gillingham instruction that provides structured, multisensory learning with personalized decodable texts and phonemic awareness drills.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Multisensory Learning</h4>
            <p className="text-sm text-blue-700 dark:text-blue-200">Visual, auditory, and kinesthetic approaches combined</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Structured Approach</h4>
            <p className="text-sm text-green-700 dark:text-green-200">Systematic phonics instruction following OG methodology</p>
          </div>
        </div>
      </div>
    )
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1676422355760-d7027256faef?q=80&w=892&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Pomodoro Technique",
    category: "Time Management",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Built-in Pomodoro technique timer with customizable work/break intervals to help maintain focus and prevent cognitive overload during learning sessions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Customizable Intervals</h4>
            <p className="text-sm text-purple-700 dark:text-purple-200">Adjust work/break times to match your attention span</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Focus Tracking</h4>
            <p className="text-sm text-orange-700 dark:text-orange-200">Monitor your productivity patterns and optimize sessions</p>
          </div>
        </div>

      </div>
    )
  },
  {
    src: "https://images.unsplash.com/photo-1659698328281-53fc377cebcb?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Audio & Visual",
    category: "Accessibility",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Comprehensive audio and visual support with customizable sound settings, visual preferences, and adaptive controls for optimal learning conditions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-pink-900 dark:text-pink-100 mb-2">Audio Controls</h4>
            <p className="text-sm text-pink-700 dark:text-pink-200">Adjust volume, pitch, and audio feedback settings</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Visual Preferences</h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-200">Customize colors, fonts, and visual layouts</p>
          </div>
        </div>
      </div>
    )
  },
            {
            src: "/2.mp4",
            title: "ADHD Video Interventions",
            category: "Learning Resources",
            content: (
              <div className="space-y-6">
                <p className="text-lg text-neutral-600 dark:text-neutral-300">
                  Research-backed video interventions designed specifically for adults with ADHD, featuring participatory design and evidence-based techniques from clinical studies.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Participatory Design</h4>
                    <p className="text-sm text-red-700 dark:text-red-200">Videos co-created with adults with ADHD for real-world relevance</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Evidence-Based</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-200">Clinical trial validated interventions and techniques</p>
                  </div>
                </div>
              </div>
            )
          },
  {
    src: "https://images.unsplash.com/photo-1625014053925-88bef4805a76?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Task Management",
    category: "Organization",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Intelligent task management system with priority setting, progress tracking, and adaptive reminders to help organize learning goals and daily activities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-cyan-900 dark:text-cyan-100 mb-2">Priority Setting</h4>
            <p className="text-sm text-cyan-700 dark:text-cyan-200">Organize tasks by importance and urgency</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Progress Tracking</h4>
            <p className="text-sm text-emerald-700 dark:text-emerald-200">Visual progress indicators for motivation</p>
          </div>
        </div>
      </div>
    )
  },
  {
    src: "https://images.unsplash.com/photo-1703801602658-ee1840697ef8?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Adjustments",
    category: "Accessibility",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Customizable environment controls including font sizes, color schemes, audio settings, and visual preferences to create optimal learning conditions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Visual Customization</h4>
            <p className="text-sm text-indigo-700 dark:text-indigo-200">Adjust fonts, colors, and spacing for comfort</p>
          </div>
          <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">Audio Controls</h4>
            <p className="text-sm text-teal-700 dark:text-teal-200">Manage sound levels and audio feedback</p>
          </div>
        </div>
      </div>
    )
  },
  {
    src: "https://images.unsplash.com/photo-1558244661-d248897f7bc4?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Cognitive Load Management",
    category: "Learning Support",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          AI-powered cognitive load monitoring and adjustment system that adapts content complexity and presentation based on your current mental capacity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-violet-900 dark:text-violet-100 mb-2">Load Monitoring</h4>
            <p className="text-sm text-violet-700 dark:text-violet-200">Tracks cognitive fatigue and adjusts accordingly</p>
          </div>
          <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-rose-900 dark:text-rose-100 mb-2">Adaptive Content</h4>
            <p className="text-sm text-rose-700 dark:text-rose-200">Simplifies or enriches content based on capacity</p>
          </div>
        </div>
      </div>
    )
  },
  {
    src: "https://images.unsplash.com/photo-1662144374212-75bf8d6f9995?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Self-Diagnosis & Support",
    category: "Assessment",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Comprehensive self-assessment tools and support resources to help identify learning preferences, challenges, and personalized strategies for improvement.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Learning Assessment</h4>
            <p className="text-sm text-amber-700 dark:text-amber-200">Identify strengths and areas for growth</p>
          </div>
          <div className="bg-lime-50 dark:bg-lime-900/20 p-4 rounded-xl">
            <h4 className="font-semibold text-lime-900 dark:text-lime-100 mb-2">Strategy Recommendations</h4>
            <p className="text-sm text-lime-700 dark:text-lime-200">Personalized approaches based on assessment</p>
          </div>
        </div>
      </div>
    )
  },
];

// Video background options
const videoBackgrounds = [
  {
    id: "nature",
    title: "Green Rolling Hills",
    src: "/hero-video/green-rolling-hills-in-nature.mp4",
    thumbnail: "/thumbnails/green-rolling-hills-in-nature.jpg",
    category: "Nature"
  },
  {
    id: "sunrise",
    title: "Sunrise Over the Clouds",
    src: "/hero-video/FILMPAC_sunrise-over-the-clouds_FFAAJ4941_HM.mp4",
    thumbnail: "/thumbnails/filmpacsunrise-over-the-cloudsffaaj4941hm.jpg",
    category: "Sky"
  },
  {
    id: "waterfall",
    title: "Waterfall in Green Mountains",
    src: "/hero-video/FILMPAC_waterfall-in-middle-of-green-mountains_FFAAS1368_HM.mp4",
    thumbnail: "/thumbnails/filmpacwaterfall-in-middle-of-green-mountainsffaas1368hm.jpg",
    category: "Mountains"
  },
  {
    id: "sunset-clouds",
    title: "Drone View of Clouds at Sunset",
    src: "/hero-video/FILMPAC_drone-view-of-clouds-in-sky-at-sunset_FFAAX5624_HM.mp4",
    thumbnail: "/thumbnails/filmpacdrone-view-of-clouds-in-sky-at-sunsetffaax5624hm.jpg",
    category: "Sky"
  },
  {
    id: "foggy-forest",
    title: "Aerial View of Foggy Forest",
    src: "/hero-video/FILMPAC_aerial-view-of-a-dense-forest-filled-with-fog_FFAAJ5958_HM.mp4",
    thumbnail: "/thumbnails/filmpacaerial-view-of-a-dense-forest-filled-with-fogffaaj5958hm.jpg",
    category: "Forest"
  },
  {
    id: "oregon-river",
    title: "Aerial View of Oregon River Woods",
    src: "/hero-video/FILMPAC_aerial-view-of-a-river-amidst-central-oregon-woods_FFAAP6567_HM.mp4",
    thumbnail: "/thumbnails/filmpacaerial-view-of-a-river-amidst-central-oregon-woodsffaap6567hm.jpg",
    category: "Nature"
  }
];



export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [isVideoMode, setIsVideoMode] = React.useState(false);
  const [selectedVideoBackground, setSelectedVideoBackground] = React.useState(videoBackgrounds[0]);
  const [previewVideo, setPreviewVideo] = React.useState<string | null>(null);
  const [onboardingCompleted, setOnboardingCompleted] = React.useState(false);
  const router = useRouter();

  // Filter features based on category and search query
  const filteredFeatures = readingFeatures.filter(feature => {
    const matchesCategory = selectedCategory === "all" || feature.category === selectedCategory;
    const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feature.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVideoEnter = () => {
    router.push('/videos');
  };

  const handlePomodoroEnter = () => {
    router.push('/pomodoro');
  };

  const carouselItems = filteredFeatures.map((feature, index) => {
    const handleCardClick = () => {
      if (feature.title === "Pomodoro Technique") {
        handlePomodoroEnter();
      } else if (feature.title === "ADHD Video Interventions") {
        handleVideoEnter();
      }
    };

    return (
      <div key={index} onClick={handleCardClick} className="cursor-pointer">
        <Card card={feature} index={index} />
      </div>
    );
  });

  // Get unique categories for the dropdown
  const categories = ["all", ...Array.from(new Set(readingFeatures.map(f => f.category)))];

  // Check if onboarding is completed
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const completed = window.localStorage.getItem("feature_intro-demo") === "true";
      setOnboardingCompleted(completed);
    }
  }, []);

  // Listen for onboarding completion
  React.useEffect(() => {
    const handleOnboardingComplete = () => {
      setOnboardingCompleted(true);
    };

    window.addEventListener('onboardingComplete', handleOnboardingComplete);
    
    return () => {
      window.removeEventListener('onboardingComplete', handleOnboardingComplete);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      {/* Header - 30% of page */}
      <div className="h-[30vh] relative overflow-hidden">
        {/* Background Image/Video */}
        {isVideoMode ? (
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
            src={selectedVideoBackground.src}
          />
        ) : (
          <Image
            src="https://images.unsplash.com/photo-1724245047328-431c55de6cb7?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="AI Core background"
            fill
            className="object-cover"
            priority
          />
        )}
        
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
        <div className="absolute inset-0 flex items-center justify-between">
          <div className="text-left text-white ml-16 max-w-4xl" style={{marginLeft: '15%'}}>
            <h1 className="text-3xl md:text-4xl font-medium mb-3">
              Welcome back Christian
            </h1>
            <p className="text-base md:text-lg opacity-90 max-w-2xl mb-4">
              Your comprehensive neurodivergent support solution, featuring AI-enhanced tools and apps designed to empower your unique learning journey.
            </p>
            
            {/* Video Background Selector - Bottom Left */}
            {isVideoMode && (
              <FloatingPanelRoot>
                <FloatingPanelTrigger
                  title="Select Video Background"
                  className="flex items-center justify-center px-3 py-2 bg-black text-white hover:bg-gray-800 transition-colors rounded-lg"
                >
                  <span className="text-sm font-medium">Change Background</span>
                </FloatingPanelTrigger>
                <FloatingPanelContent className="w-96">
                  <FloatingPanelBody>
                    <div className="grid grid-cols-2 gap-3">
                      {videoBackgrounds.map((video) => (
                        <div
                          key={video.id}
                          className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                            selectedVideoBackground.id === video.id
                              ? 'border-blue-500 ring-2 ring-blue-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setPreviewVideo(video.src)}
                        >
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-28 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <div className="bg-white/90 rounded-full p-2">
                              <Video className="h-4 w-4 text-gray-700" />
                            </div>
                          </div>
                          <div className="p-2 bg-white">
                            <p className="text-xs font-medium text-gray-900">{video.title}</p>
                            <p className="text-xs text-gray-500">{video.category}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Preview Section */}
                    {previewVideo && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                        <p className="text-sm font-medium text-gray-700 mb-3">Preview:</p>
                        <video
                          src={previewVideo}
                          className="w-full h-40 object-cover rounded-xl"
                          autoPlay
                          muted
                          loop
                        />
                      </div>
                    )}
                  </FloatingPanelBody>
                  <FloatingPanelFooter>
                    <FloatingPanelCloseButton />
                    <button
                      onClick={() => {
                        if (previewVideo) {
                          const selected = videoBackgrounds.find(v => v.src === previewVideo);
                          if (selected) {
                            setSelectedVideoBackground(selected);
                            setPreviewVideo(null);
                          }
                        }
                      }}
                      className={`px-4 py-2 rounded-xl transition-colors ${
                        previewVideo
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!previewVideo}
                    >
                      Confirm Selection
                    </button>
                  </FloatingPanelFooter>
                </FloatingPanelContent>
              </FloatingPanelRoot>
            )}
          </div>
          
          {/* Toggle Switch */}
          <div className="mr-16 flex items-center space-x-3">
            <span className="text-white text-sm font-medium">Image</span>
            <button
              onClick={() => setIsVideoMode(!isVideoMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
                isVideoMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isVideoMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-white text-sm font-medium">Video</span>
          </div>
        </div>
      </div>

      {/* AI-Enhanced Reading Features Carousel */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-8 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-3 text-left" style={{color: '#333B68'}}>
                Your Neurodivergent Support Tools
              </h2>
              <p className="text-base text-zinc-600 text-left max-w-2xl">
                Explore our comprehensive suite of AI-powered tools and apps designed to support neurodivergent individuals with personalized, research-backed approaches.
              </p>
            </div>
            
            {/* Search and Filter Section */}
            <div className="flex items-center space-x-3">
              {/* Dropdown Filter */}
              <Select onValueChange={setSelectedCategory} defaultValue="all">
                <SelectTrigger className="w-auto bg-white rounded-xl px-3 py-2 h-auto border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <SelectValue placeholder="All Tools" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => {
                    const displayName = category === "all" ? "All Tools" :
                      category === "Reading Support" ? "Reading & Learning" :
                      category === "Time Management" ? "Time & Focus" :
                      category === "Accessibility" ? "Accessibility & Comfort" :
                      category === "Learning Resources" ? "Tutorials & Guides" :
                      category === "Organization" ? "Organization & Tasks" :
                      category === "Learning Support" ? "Learning Support" :
                      category === "Assessment" ? "Assessment & Self-Help" :
                      category;
                    return (
                      <SelectItem key={category} value={category}>
                        {displayName}
                      </SelectItem>
                    );
                  })}
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
        
        <DashboardOnboarding />

      </div>

      {/* Disclaimer */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex justify-between items-start">
          <p className="text-xs text-gray-500 text-left max-w-2xl">
            *This platform is for educational and support purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical concerns.
          </p>
          
          {/* Reset Onboarding Button - Only show when onboarding is done */}
          {onboardingCompleted && (
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.localStorage.removeItem("feature_intro-demo");
                  setOnboardingCompleted(false);
                  // Trigger a custom event to notify the onboarding component
                  window.dispatchEvent(new CustomEvent('resetOnboarding'));
                }
              }}
              className="inline-flex items-center justify-center rounded-full bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              title="Reset Desktop Onboarding"
            >
              <ResetIcon className="mr-2 h-4 w-4" />
              Reset Onboarding
            </button>
          )}
        </div>
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

      {/* Onboarding Demo Component */}
    </div>
  );
}
