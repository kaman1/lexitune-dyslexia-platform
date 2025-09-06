"use client";
import * as React from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, X, ArrowLeft, Search, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";




// ADHD Intervention Videos
const adhdVideos = [
  {
    id: 2,
    title: "Mastering Time Management",
    description: "Essential time management strategies for neurodiverse individuals.",
    src: "/grid/Mastering Time Management_ Tips for the Neurodiverse.mp4",
    thumbnail: "/thumbnails/time-management-tips.jpg",
    category: "Time Management",
    duration: "3:45",
    fullContent: "Learn proven time management techniques specifically designed for neurodiverse brains. This video covers practical strategies to help you organize your day, prioritize tasks, and work more efficiently."
  },
  {
    id: 3,
    title: "Enhance",
    description: "Enhance understanding and retention techniques.",
    src: "/grid/2minute rule.mp4",
    thumbnail: "/grid/2.png",
    category: "Learning Enhancement",
    duration: "2:00",
    fullContent: "Advanced techniques to enhance understanding and retention for neurodivergent learners. This video covers proven methods to improve comprehension and memory retention."
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
    id: "audio",
    title: "Audio Focus",
    src: "/audio.png",
    thumbnail: "/audio.png",
    category: "Audio"
  }
];

// Get unique categories for tabs
const categories = ["All", ...Array.from(new Set(adhdVideos.map(video => video.category)))];

export default function ADHDVideosPage() {
  const [isHydrated, setIsHydrated] = React.useState(false);
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

  // Debug logging for video filtering
  React.useEffect(() => {
    console.log('🎬 All videos:', adhdVideos);
    console.log('🔍 Filtered videos:', filteredVideos);
    console.log('🔍 Search query:', searchQuery);
    console.log('📱 Active tab:', activeTab);
  }, [filteredVideos, searchQuery, activeTab]);

  // Handle hydration and localStorage loading
  React.useEffect(() => {
    setIsHydrated(true);
    
    // Load saved background settings from localStorage if available
    const savedVideoMode = localStorage.getItem('videos-video-mode');
    if (savedVideoMode) {
      setIsVideoMode(savedVideoMode === 'true');
    }
    
    const savedVideoBackground = localStorage.getItem('videos-video-background');
    if (savedVideoBackground) {
      try {
        const parsed = JSON.parse(savedVideoBackground);
        setSelectedVideoBackground(parsed);
      } catch (error) {
        console.error('Failed to parse saved video background:', error);
      }
    }
  }, []);

  const handleVideoSelect = (video: typeof adhdVideos[0]) => {
    console.log('🎬 Video selected:', video);
    console.log('Video source:', video.src);
    console.log('Video title:', video.title);
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
                className="inline-flex items-center justify-center px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 hover:scale-105 transition-all duration-300 rounded-xl shadow-sm"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Back to Dashboard
              </button>
            </div>
            
            {/* Header Content - Left Aligned */}
            <div className="text-left max-w-4xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Guides and Tips
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 leading-relaxed">
                Research-backed video interventions designed specifically for adults with ADHD, featuring participatory design and evidence-based techniques from clinical studies.
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
                    onClick={() => {
                      const newMode = !isVideoMode;
                      setIsVideoMode(newMode);
                      if (isHydrated) {
                        localStorage.setItem('videos-video-mode', newMode.toString());
                        toast.success(`${newMode ? 'Video' : 'Image'} mode saved!`, {
                          description: `Videos page background mode switched to ${newMode ? 'video' : 'image'}.`
                        });
                      }
                    }}
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
                      if (selected) {
                        setSelectedVideoBackground(selected);
                        if (isHydrated) {
                          localStorage.setItem('videos-video-background', JSON.stringify(selected));
                          toast.success(`${selected.title} saved!`, {
                            description: "Your videos page video background preference has been updated."
                          });
                        }
                      }
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
            {/* Debug info */}
            <div className="mb-4 text-sm text-gray-500">
              Total videos: {filteredVideos.length} | Selected: {selectedVideo?.title || 'None'}
            </div>
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
                    {/* Debug info */}
                    <div className="text-xs text-gray-400 mt-2 font-mono">
                      Source: {video.src}
                    </div>
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
                  onLoadStart={() => console.log('🎥 Video loading started:', selectedVideo.src)}
                  onLoadedData={() => console.log('✅ Video data loaded:', selectedVideo.src)}
                  onError={(e) => console.error('❌ Video error:', e, selectedVideo.src)}
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
