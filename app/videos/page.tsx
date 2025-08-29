"use client";
import * as React from "react";
import { Play, Pause, Volume2, VolumeX, Clock, RotateCcw, X, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// ADHD Video Interventions data based on research
const adhdVideos = [
  {
    id: 1,
    title: "Nora's Office Procrastination",
    description: "A participatory video vignette showing real-world procrastination challenges and coping strategies.",
    src: "/2.mp4",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Procrastination",
    duration: "3:45",
    fullContent: "This video vignette was co-created with adults with ADHD to address common workplace procrastination challenges. Nora demonstrates realistic procrastination behaviors and then shows effective planning strategies to overcome them. The video uses participatory design principles to ensure authenticity and relatability for the target audience."
  },
  {
    id: 2,
    title: "Erik's Morning Routine Stress",
    description: "Managing morning chaos and stress through breathing exercises and structured routines.",
    src: "/2.mp4",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Stress Management",
    duration: "4:12",
    fullContent: "Erik's story illustrates the common morning stress experienced by adults with ADHD. The video shows the chaos of a typical morning and then demonstrates how breathing exercises and structured routines can help manage stress. This intervention was developed through participatory design sessions with adults with ADHD."
  },
  {
    id: 3,
    title: "Planning Activity at Home",
    description: "Effective home-based planning strategies for completing work tasks during overtime.",
    src: "/2.mp4",
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Planning",
    duration: "5:28",
    fullContent: "This video demonstrates practical planning activities that can be done at home to improve task completion. The intervention shows how to break down work tasks, create visual schedules, and use environmental cues to maintain focus and productivity."
  },
  {
    id: 4,
    title: "Breathing Exercise in Distress",
    description: "Immediate stress relief techniques using breathing exercises during moments of overwhelm.",
    src: "/2.mp4",
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Coping Skills",
    duration: "2:56",
    fullContent: "A practical demonstration of breathing exercises that can be used immediately when feeling overwhelmed or stressed. This video was created based on feedback from adults with ADHD about what techniques work best in real-world situations."
  },
  {
    id: 5,
    title: "Goal Management Training",
    description: "Structured approach to setting and achieving goals with ADHD-friendly strategies.",
    src: "/2.mp4",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Goal Setting",
    duration: "6:34",
    fullContent: "This video introduces goal management training techniques specifically adapted for adults with ADHD. Learn how to set realistic goals, break them into manageable steps, and track progress in ways that work with ADHD rather than against it."
  },
  {
    id: 6,
    title: "Time Management Strategies",
    description: "Practical time management techniques designed for ADHD cognitive patterns.",
    src: "/2.mp4",
    thumbnail: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Time Management",
    duration: "7:15",
    fullContent: "Discover time management strategies that work with ADHD rather than against it. This video covers techniques like time blocking, visual timers, and environmental modifications that help adults with ADHD better manage their time and stay on track."
  }
];

export default function ADHDVideosPage() {
  const [selectedVideo, setSelectedVideo] = React.useState<typeof adhdVideos[0] | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [showFullContent, setShowFullContent] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const router = useRouter();

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
      videoRef.current.muted = !isMuted;
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
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-slate-50 to-gray-50 py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={goBackToDashboard}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 hover:scale-105 transition-all duration-300 rounded-xl mr-4 shadow-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </button>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ADHD Video Interventions
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Research-backed video interventions designed specifically for adults with ADHD, featuring participatory design and evidence-based techniques from clinical studies.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                Participatory Design
              </span>
              <span className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                Evidence-Based
              </span>
              <span className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                Clinical Trial Validated
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className={`grid gap-8 ${selectedVideo ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
          {adhdVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => handleVideoSelect(video)}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Video Thumbnail */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-3 shadow-sm">
                    <Play className="h-6 w-6 text-gray-700" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {video.duration}
                </div>
              </div>
              
              {/* Video Info */}
              <div className="p-6">
                <div className="text-xs text-blue-600 font-medium mb-2">
                  {video.category}
                </div>
                <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 text-lg">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
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
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative bg-black">
              <video
                ref={videoRef}
                src={selectedVideo.src}
                className="w-full h-96 object-cover"
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

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-6">
                {selectedVideo.description}
              </p>
              
              {/* Accordion for Full Content */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={toggleFullContent}
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900 px-6 py-4 transition-all duration-300 flex items-center justify-between text-left"
                >
                  <span className="font-medium">View Research Details</span>
                  <div className={`transform transition-transform duration-300 ${showFullContent ? 'rotate-180' : ''}`}>
                    ▼
                  </div>
                </button>
                
                {showFullContent && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {selectedVideo.fullContent}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
