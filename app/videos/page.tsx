"use client";
import * as React from "react";
import { Play, Pause, Volume2, VolumeX, Clock, RotateCcw, X, ArrowLeft } from "lucide-react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { useRouter } from "next/navigation";

// Video data
const videoList = [
  {
    id: 1,
    title: "Reading Fluency Techniques",
    description: "Learn proven techniques to improve your reading fluency and speed through structured practice methods.",
    src: "/2.mp4",
    thumbnail: "/2.mp4",
    category: "Reading Skills",
    duration: "5:32",
    fullContent: "This comprehensive tutorial covers essential reading fluency techniques including chunking, scanning, and speed reading methods. You'll learn how to break down complex texts, improve your reading pace while maintaining comprehension, and develop strategies for different types of reading materials. Perfect for students looking to enhance their reading efficiency."
  },
  {
    id: 2,
    title: "Phonemic Awareness Exercises",
    description: "Master phonemic awareness with interactive exercises designed to strengthen sound recognition.",
    src: "/2.mp4",
    thumbnail: "/2.mp4",
    category: "Phonics",
    duration: "4:18",
    fullContent: "Develop your phonemic awareness through a series of engaging exercises that focus on sound recognition, blending, and segmentation. This tutorial provides practical activities that help you identify individual sounds in words, understand sound-symbol relationships, and build a strong foundation for reading and spelling success."
  },
  {
    id: 3,
    title: "Visual-Spatial Reading Strategies",
    description: "Discover how to leverage your visual-spatial strengths for better reading comprehension.",
    src: "/2.mp4",
    thumbnail: "/2.mp4",
    category: "Cognitive Enhancement",
    duration: "6:45",
    fullContent: "Learn how to use your natural visual-spatial abilities to enhance reading comprehension. This tutorial teaches you to create mental maps of text, visualize concepts, and use spatial reasoning to better understand and remember what you read. Discover techniques that work with your cognitive strengths rather than against them."
  },
  {
    id: 4,
    title: "Orton-Gillingham Basics",
    description: "Introduction to the Orton-Gillingham approach for structured reading instruction.",
    src: "/2.mp4",
    thumbnail: "/2.mp4",
    category: "Methodology",
    duration: "8:12",
    fullContent: "Get a comprehensive introduction to the Orton-Gillingham approach, a proven method for teaching reading to individuals with dyslexia. Learn about the multisensory techniques, systematic instruction, and diagnostic teaching that make this approach so effective. Understand how to apply OG principles in your own learning journey."
  },
  {
    id: 5,
    title: "Reading Comprehension Tips",
    description: "Effective strategies to improve reading comprehension and retention.",
    src: "/2.mp4",
    thumbnail: "/2.mp4",
    category: "Comprehension",
    duration: "7:23",
    fullContent: "Master essential reading comprehension strategies that will help you understand and retain information more effectively. Learn techniques for active reading, note-taking, summarizing, and critical thinking. This tutorial provides practical tools for approaching different types of texts and extracting maximum value from your reading."
  },
  {
    id: 6,
    title: "Speed Reading Fundamentals",
    description: "Learn the fundamentals of speed reading while maintaining comprehension.",
    src: "/2.mp4",
    thumbnail: "/2.mp4",
    category: "Reading Skills",
    duration: "5:56",
    fullContent: "Discover the fundamentals of speed reading techniques that can dramatically increase your reading speed while maintaining or even improving comprehension. Learn about eye movement optimization, chunking strategies, and how to eliminate subvocalization. This tutorial provides a structured approach to developing faster, more efficient reading skills."
  }
];

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = React.useState<typeof videoList[0] | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [showFullContent, setShowFullContent] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const handleVideoSelect = (video: typeof videoList[0]) => {
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

  // Convert video data to card format for Apple Cards
  const videoCards = videoList.map((video) => ({
    src: video.thumbnail,
    title: video.title,
    category: video.category,
    content: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">{video.description}</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            {video.duration}
          </div>
        </div>
        <p className="text-gray-600 text-sm">{video.fullContent}</p>
      </div>
    )
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      <div className={`flex h-screen transition-all duration-500 ease-in-out ${selectedVideo ? 'mr-1/2' : 'mx-12'}`}>
        {/* Left Side - Video Grid */}
        <div className={`transition-all duration-500 ease-in-out ${selectedVideo ? 'w-1/2' : 'w-full'}`}>
          <div className="p-8 overflow-y-auto h-full">
            {/* Back Button and Title */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <button
                  onClick={goBackToDashboard}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 hover:scale-105 transition-all duration-300 rounded-xl mr-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </button>
              </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Video Tips
                      </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Comprehensive video guides to enhance your reading journey with AI-powered Orton-Gillingham techniques.
              </p>
            </div>

            <div className={`grid gap-6 ${selectedVideo ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
              {videoList.map((video) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Video Thumbnail */}
                  <div className="relative h-80 bg-gray-100">
                    <video
                      src={video.thumbnail}
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-3">
                        <Play className="h-6 w-6 text-gray-700" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {video.duration}
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-6">
                    <div className="text-xs text-blue-600 font-medium mb-2">
                      {video.category}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Video Player */}
        <div className={`fixed top-0 right-0 h-full transition-all duration-500 ease-in-out ${selectedVideo ? 'w-1/2 translate-x-0' : 'w-1/2 translate-x-full'}`}>
          {selectedVideo && (
            <div className="h-full relative bg-black">
              {/* Close Button - Top Right Corner */}
              <button
                onClick={closeVideo}
                className="absolute top-6 right-6 z-50 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Video Player - Takes Full Height */}
              <div className="h-full bg-black relative">
                <video
                  ref={videoRef}
                  src={selectedVideo.src}
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />
              </div>

              {/* Video Info Card - Above Video at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                  {/* Main Info Section */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="text-sm text-blue-600 font-medium mb-3">
                          {selectedVideo.category}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                          {selectedVideo.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {selectedVideo.description}
                        </p>
                      </div>
                      <div className="text-lg text-gray-500 ml-6">
                        {selectedVideo.duration}
                      </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center gap-4 mb-6">
                      <button
                        onClick={togglePlay}
                        className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white hover:bg-opacity-90 hover:scale-105 hover:shadow-lg transition-all duration-300 rounded-xl transform"
                        style={{ backgroundColor: '#2563EB' }}
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5 mr-2" />
                        ) : (
                          <Play className="h-5 w-5 mr-2" />
                        )}
                        {isPlaying ? 'Pause' : 'Play'}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="inline-flex items-center justify-center px-6 py-3 text-base font-medium border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 hover:scale-105 transition-all duration-300 rounded-xl"
                      >
                        {isMuted ? (
                          <VolumeX className="h-5 w-5 mr-2" />
                        ) : (
                          <Volume2 className="h-5 w-5 mr-2" />
                        )}
                        {isMuted ? 'Unmute' : 'Mute'}
                      </button>
                      <button
                        onClick={resetVideo}
                        className="inline-flex items-center justify-center px-6 py-3 text-base font-medium border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 hover:scale-105 transition-all duration-300 rounded-xl"
                      >
                        <RotateCcw className="h-5 w-5 mr-2" />
                        Reset
                      </button>
                    </div>

                    {/* Accordion Toggle for Full Content */}
                    <button
                      onClick={toggleFullContent}
                      className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-between hover:scale-[1.02] text-lg font-medium"
                    >
                      <span>View Full Description</span>
                      <div className={`transform transition-transform duration-300 ${showFullContent ? 'rotate-180' : ''}`}>
                        ▼
                      </div>
                    </button>
                  </div>

                  {/* Accordion Content */}
                  {showFullContent && (
                    <div className="px-8 pb-8 border-t border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                      <div className="pt-6">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {selectedVideo.fullContent}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
