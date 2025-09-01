"use client";
import * as React from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, X, ArrowLeft, Search, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";




// ADHD Intervention Videos
const adhdVideos = [
  {
    id: 1,
    title: "Focus and Memory Tips",
    description: "General tips to improve focus and memory.",
    src: "/2.mp4",
    thumbnail: "/thumbnails/focus-memory-tips.jpg",
    category: "Focus & Memory",
    duration: "0:15",
    fullContent: "This video provides general tips for improving focus and memory. These strategies can help anyone looking to enhance their cognitive performance and concentration skills."
  },
  {
    id: 2,
    title: "Mastering Time Management",
    description: "Essential time management strategies for neurodiverse individuals.",
    src: "/interventions/Mastering Time Management_ Tips for the Neurodiverse.mp4",
    thumbnail: "/thumbnails/time-management-tips.jpg",
    category: "Time Management",
    duration: "3:45",
    fullContent: "Learn proven time management techniques specifically designed for neurodiverse brains. This video covers practical strategies to help you organize your day, prioritize tasks, and work more efficiently."
  },
  {
    id: 3,
    title: "Optimizing Workspaces for ADHD",
    description: "Create an environment that supports focus and productivity.",
    src: "/interventions/Optimizing Workspaces for ADHD Brains.mp4",
    thumbnail: "/thumbnails/workspace-optimization.jpg",
    category: "Environment",
    duration: "4:12",
    fullContent: "Discover how to design your workspace to minimize distractions and maximize focus. Learn environmental modifications that can significantly improve your ability to concentrate and complete tasks."
  },
  {
    id: 4,
    title: "Mastering Focus with ADHD",
    description: "Work smarter, not harder with proven focus techniques.",
    src: "/interventions/Mastering Focus with ADHD_ Work Smarter, Not Harder.mp4",
    thumbnail: "/thumbnails/focus-mastery.jpg",
    category: "Focus & Memory",
    duration: "3:58",
    fullContent: "Master the art of maintaining focus with ADHD. This video teaches you how to work smarter by understanding your attention patterns and using research-backed strategies to stay on task."
  }
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

// Get unique categories for tabs
const categories = ["All", ...Array.from(new Set(adhdVideos.map(video => video.category)))];

export default function ADHDVideosPage() {
  const [selectedVideo, setSelectedVideo] = React.useState<typeof adhdVideos[0] | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [showFullContent, setShowFullContent] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isVideoMode, setIsVideoMode] = React.useState(false);
  const [selectedVideoBackground, setSelectedVideoBackground] = React.useState(videoBackgrounds[0]);
  const [isAccordionOpen, setIsAccordionOpen] = React.useState(false);
  const videoRef = React.useRef<any>(null);
  const router = useRouter();

  // Filter videos based on active tab and search query
  const filteredVideos = adhdVideos
    .filter(video => activeTab === "All" || video.category === activeTab)
    .filter(video => 
      searchQuery === "" || 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleVideoSelect = (video: typeof adhdVideos[0]) => {
    setSelectedVideo(video);
    setIsPlaying(false);
    setIsMuted(false);
    setShowFullContent(false);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
    setIsMuted(false);
    setShowFullContent(false);
  };

  const goBackToDashboard = () => {
    router.push('/dashboard');
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = !isMuted;
      } else {
        videoRef.current.muted = !isMuted;
      }
      setIsMuted(!isMuted);
    }
  };

  const resetVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const toggleFullContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header with Background Image/Video */}
      <div className="relative h-[25vh] overflow-hidden">
        {/* Background Image or Video */}
        {isVideoMode ? (
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover absolute inset-0 z-0"
            src={selectedVideoBackground.src}
          />
        ) : (
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Video interventions background"
            fill
            className="object-cover"
            priority
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 h-full flex flex-col justify-center px-8">
          <div className="max-w-7xl mx-auto w-full">
            {/* Back Button */}
            <div className="mb-6">
              <button
                onClick={goBackToDashboard}
                className="inline-flex items-center justify-center px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium border border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 rounded-xl shadow-sm"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Back to Dashboard
              </button>
            </div>
            
            {/* Header Content - Left Aligned */}
            <div className="text-left max-w-4xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Neurodivergent Learning Resources
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 leading-relaxed">
                Evidence-based video resources and practical strategies for neurodivergent individuals, including time management, workspace optimization, and focus techniques backed by research.
              </p>
              
              <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
                <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full border border-white/30 text-white">
                  Time Management
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full border border-white/30 text-white">
                  Focus Techniques
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full border border-white/30 text-white">
                  Workspace Optimization
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Controls Section */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-8">
          {/* Accordion Header */}
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="flex items-center justify-between w-full p-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700">Background Settings</span>
            <ChevronDown 
              className={`h-4 w-4 text-gray-500 transition-transform ${
                isAccordionOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {/* Accordion Content */}
          {isAccordionOpen && (
            <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Toggle Switch */}
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700 text-sm font-medium">Image Background</span>
                  <button
                    onClick={() => setIsVideoMode(!isVideoMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isVideoMode ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isVideoMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-gray-700 text-sm font-medium">Video Background</span>
                </div>
                
                {/* Video Background Selector */}
                {isVideoMode && (
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-700 text-sm font-medium">Video:</span>
                    <Select value={selectedVideoBackground.id} onValueChange={(value) => {
                      const selected = videoBackgrounds.find(v => v.id === value);
                      if (selected) setSelectedVideoBackground(selected);
                    }}>
                      <SelectTrigger className="w-auto min-w-64 rounded-full">
                        <SelectValue placeholder="Select video background" />
                      </SelectTrigger>
                      <SelectContent>
                        {videoBackgrounds.map((video) => (
                          <SelectItem key={video.id} value={video.id}>
                            <div className="flex items-center space-x-3">
                              <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-8 h-8 rounded object-cover"
                              />
                              <div>
                                <p className="font-medium">{video.title}</p>
                                <p className="text-sm text-gray-500">{video.category}</p>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 py-4">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center space-x-3">
              <label htmlFor="category-select" className="text-sm font-medium text-gray-700">
                Category:
              </label>
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-auto min-w-48 rounded-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category} ({category === "All" ? adhdVideos.length : adhdVideos.filter(v => v.category === category).length})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid with Preview Panel */}
      <div className="flex h-screen">
        {/* Main Video Grid - Takes 60% when video is selected, 100% when none selected */}
        <div className={`${selectedVideo ? 'w-[45%]' : 'w-full'} transition-all duration-300 overflow-y-auto`}>
          <div className="max-w-7xl mx-auto px-8 py-16">
                          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md hover:border-gray-200 transition-all duration-200 group"
                >
                  {/* Video Thumbnail */}
                  <div className="relative h-80 bg-gray-50">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                      <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg">
                        <Play className="h-5 w-5 text-gray-800" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                      {video.duration}
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-5">
                    <div className="text-xs text-blue-600 font-medium mb-2 uppercase tracking-wide">
                      {video.category}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-base">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

                {/* Video Preview Panel - Fixed on right, takes 40% width */}
        {selectedVideo && (
          <div className="w-[55%] bg-white border-l border-gray-200 shadow-lg transition-all duration-500 ease-in-out fixed right-0 top-0 h-screen z-50 transform translate-x-0 animate-in slide-in-from-right">
            <div className="h-full overflow-y-auto">
              {/* Video Player */}
              <div className="relative bg-black">
                <video
                  ref={videoRef}
                  src={selectedVideo.src}
                  className="w-full h-[600px] object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />
                
                {/* Video Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={resetVideo}
                    className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Video Content */}
              <div className="p-6">
                {/* Header with Close Button */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-blue-600 font-medium mb-1">
                      {selectedVideo.category}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedVideo.title}
                    </h2>
                  </div>
                  <button
                    onClick={closeVideo}
                    className="p-2 bg-black hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {selectedVideo.description}
                </p>
                
                {/* Research Details and Transcript */}
                <div className="space-y-4">
                  {/* Research Details */}
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={toggleFullContent}
                      className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900 px-6 py-4 transition-all duration-300 flex items-center justify-between text-left"
                    >
                      <span className="font-medium">View Details</span>
                      <div className={`transform transition-transform duration-300 ${showFullContent ? 'rotate-180' : ''}`}>
                        ▼
                      </div>
                    </button>
                    
                    {showFullContent && (
                      <div className="px-6 py-4 bg-white border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {selectedVideo.fullContent}
                        </p>

                      </div>
                    )}
                  </div>


                </div>
              </div>
            </div>
          </div>
        )}
      </div>


    </div>
  );
}
