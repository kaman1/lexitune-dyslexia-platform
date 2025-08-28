"use client";

import * as React from "react";
import { ExternalLink, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// Dynamically import video player to avoid SSR issues
const VideoPlayer = dynamic(
  () => import("@/components/ui/shadcn-io/video-player").then(mod => ({ default: mod.VideoPlayer })),
  { ssr: false }
);
const VideoPlayerContent = dynamic(
  () => import("@/components/ui/shadcn-io/video-player").then(mod => ({ default: mod.VideoPlayerContent })),
  { ssr: false }
);
const VideoPlayerControlBar = dynamic(
  () => import("@/components/ui/shadcn-io/video-player").then(mod => ({ default: mod.VideoPlayerControlBar })),
  { ssr: false }
);
const VideoPlayerPlayButton = dynamic(
  () => import("@/components/ui/shadcn-io/video-player").then(mod => ({ default: mod.VideoPlayerPlayButton })),
  { ssr: false }
);
const VideoPlayerTimeRange = dynamic(
  () => import("@/components/ui/shadcn-io/video-player").then(mod => ({ default: mod.VideoPlayerTimeRange })),
  { ssr: false }
);
const VideoPlayerTimeDisplay = dynamic(
  () => import("@/components/ui/shadcn-io/video-player").then(mod => ({ default: mod.VideoPlayerTimeDisplay })),
  { ssr: false }
);
const VideoPlayerVolumeRange = dynamic(
  () => import("@/components/ui/shadcn-io/video-player").then(mod => ({ default: mod.VideoPlayerVolumeRange })),
  { ssr: false }
);
const VideoPlayerMuteButton = dynamic(
  () => import("@/components/ui/shadcn-io/video-player").then(mod => ({ default: mod.VideoPlayerMuteButton })),
  { ssr: false }
);

export const BlueprintPodcast: React.FC = () => {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = React.useState('https://tekimaxvideos.blob.core.windows.net/blog/audio1.mp4');

  // Ensure client-side rendering
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  const episodes = [
    {
      id: 'ep1',
      number: 'EP.1',
      duration: '23:45',
      title: 'Unlocking Neurodiverse Potential: How Inclusive Enterprise Education Fuels Innovation',
      description: 'This toolkit gathers together a wide range of resources about neurodiversity and enterprise education, providing a central repository for all those working in further and higher education who wish to provide the best possible service to neurodivergent students, colleagues and external stakeholders.',
      authors: [
        {
          name: 'Rob Edwards',
          title: 'CEO, Neurodiversity & Entrepreneurship Association'
        }
      ],
      toolkitInfo: {
        title: 'Neurodiversity & Enterprise Education Toolkit',
        purpose: 'This toolkit gathers together a wide range of resources about neurodiversity and enterprise education, providing a central repository for all those working in further and higher education who wish to provide the best possible service to neurodivergent students, colleagues and external stakeholders.',
        ownership: 'The toolkit is the property of the Charter for Inclusive Entrepreneurship and the Neurodiversity & Entrepreneurship Association.',
        usage: 'Users are welcome to use, share and adapt the resources in this toolkit, subject to the terms of the original intellectual property owner(s).',
        license: 'This work is licensed under Creative Commons Attribution 4.0 International.'
      },
      references: [
        'Charter for Inclusive Entrepreneurship',
        'Neurodiversity & Entrepreneurship Association'
      ],
      link: 'https://creativecommons.org/licenses/by/4.0/',
      color: 'blue',
      image: '/tekimax-microsoft.png',
      audioUrl: 'https://tekimaxvideos.blob.core.windows.net/blog/Unlocking_Neurodiverse_Potential__How_Inclusive_Enterprise_Education_Fuels_Innovation.mp3'
    }
  ];

  const [currentEpisode, setCurrentEpisode] = React.useState<any>(episodes[0]);
  const [openAccordion, setOpenAccordion] = React.useState<string | null>('ep1');
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const audioPlayerRef = React.useRef<HTMLAudioElement>(null);

  // Effect to manage video source based on state
  React.useEffect(() => {
    if (!isClient) return;
    
    if (showVideoPlayer && isVideoPlaying) {
      // When audio is playing, show neuron video
      setCurrentVideoSrc('https://tekimaxvideos.blob.core.windows.net/blog/neuron.mp4');
    } else if (showVideoPlayer && !isVideoPlaying) {
      // When video player is open but not playing, show episode image
      setCurrentVideoSrc('https://tekimaxvideos.blob.core.windows.net/blog/audio1.mp4');
    } else {
      // Default state - show placeholder video
      setCurrentVideoSrc('https://tekimaxvideos.blob.core.windows.net/blog/audio1.mp4');
    }
    
    // Reset video loaded state when source changes
    setVideoLoaded(false);
  }, [isClient, showVideoPlayer, isVideoPlaying]);

  // Effect to handle audio player when it opens
  React.useEffect(() => {
    if (isClient && showVideoPlayer && audioPlayerRef.current) {
      const audioElement = audioPlayerRef.current;
      
      // Set audio properties
      audioElement.muted = false;
      audioElement.volume = 0.8;
      
      console.log('Audio element initialized:', {
        src: audioElement.src,
        muted: audioElement.muted,
        volume: audioElement.volume,
        readyState: audioElement.readyState
      });
      
      // Listen for audio events for debugging
      const onCanPlay = () => console.log('Audio can play');
      const onLoadStart = () => console.log('Audio load start');
      const onLoadedMetadata = () => console.log('Audio metadata loaded');
      
      audioElement.addEventListener('canplay', onCanPlay);
      audioElement.addEventListener('loadstart', onLoadStart);
      audioElement.addEventListener('loadedmetadata', onLoadedMetadata);
      
      return () => {
        audioElement.removeEventListener('canplay', onCanPlay);
        audioElement.removeEventListener('loadstart', onLoadStart);
        audioElement.removeEventListener('loadedmetadata', onLoadedMetadata);
      };
    }
  }, [isClient, showVideoPlayer]);

  const handleCenterClick = () => {
    // Stop any currently playing video
    const currentVideo = document.querySelector('video');
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
    }
    
    // Stop hero video and show video player
    if (videoRef.current) {
      videoRef.current.pause();
    }
    
    // If no current episode, use the first one
    if (!currentEpisode) {
      setCurrentEpisode(episodes[0]);
    }
    
    setShowVideoPlayer(true);
    setIsVideoPlaying(true);
  };

  const toggleVideoPlayback = () => {
    if (audioPlayerRef.current) {
      const audioElement = audioPlayerRef.current;
      if (isVideoPlaying) {
        audioElement.pause();
        setIsVideoPlaying(false);
      } else {
        audioElement.muted = false;
        audioElement.volume = 0.8;
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsVideoPlaying(true);
          }).catch((error) => {
            console.log('Play failed:', error);
          });
        }
      }
    }
  };

  const handleEpisodePlay = (episode: any) => {
    // Stop any currently playing video
    const currentVideo = document.querySelector('video');
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
    }
    
    // Pause hero video
    if (videoRef.current) {
      videoRef.current.pause();
    }
    
    // Set new episode
    setCurrentEpisode(episode);
    setShowVideoPlayer(true);
    setIsVideoPlaying(false); // Let the effect handle playing
  };

  const handleAccordionOpen = (episode: any) => {
    setCurrentEpisode(episode);
    setOpenAccordion(episode.id);
  };

  const toggleAccordion = (episodeId: string) => {
    setOpenAccordion(openAccordion === episodeId ? null : episodeId);
  };

  return (
    <section className="w-full">
      <div className="min-h-[60vh] flex flex-col lg:flex-row">
        {/* Left Side - Content with Yellow Background (Wider) */}
        <div className="w-full lg:w-2/5 flex items-center justify-center px-6 md:px-8 lg:px-12 py-8 lg:py-0" style={{backgroundColor: '#F2C94C'}}>
          <div className="max-w-lg space-y-6 md:space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-5 py-3 text-base text-white rounded-2xl" style={{backgroundColor: '#333B68'}}>
                Blueprint Podcast
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight" style={{color: '#333B68'}}>
                Get Insights from Neurodivergent Research
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="text-base font-semibold" style={{color: '#333B68'}}>EPISODE 1</div>
                  <div className="text-base font-medium" style={{color: '#333B68'}}>NEURODIVERSITY TOOLKIT</div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-semibold" style={{color: '#333B68'}}>
                  {currentEpisode ? currentEpisode.title : 'ADHD & Executive Function'}
                </h3>
                
                <p className="text-base md:text-lg leading-relaxed" style={{color: '#333B68'}}>
                  {currentEpisode ? currentEpisode.description : 'Latest research on executive function improvements through multimodal interventions and adaptive learning technologies.'}
                </p>
              </div>

              {/* Listen Now Button - Bigger */}
              <Button 
                onClick={() => {
                  if (currentEpisode) {
                    handleEpisodePlay(currentEpisode);
                  }
                }}
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-3 transition-all duration-200 text-base cursor-pointer"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span>Listen Now</span>
                <span className="text-base opacity-75">{currentEpisode ? currentEpisode.duration : '23:45'}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Center - Hero Video/Image with Audio Player */}
        <div className="w-full lg:w-2/5 relative overflow-hidden min-h-[30vh] lg:min-h-auto bg-black flex flex-col">
          {/* Video Section */}
          <div 
            className="flex-1 relative cursor-pointer"
            onClick={handleCenterClick}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/audio.png"
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setVideoLoaded(false)}
            >
              <source src={currentVideoSrc} type="video/mp4" />
            </video>
            
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30"></div>

            {/* Background Video with AI Voice Input Style - Show when video is playing */}
            {showVideoPlayer && currentEpisode && (
              <div className="absolute inset-0 bg-black/90 flex items-center justify-center">
                {/* Neuron background video while audio is playing */}
                <video
                  className="w-full h-full object-cover opacity-60"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="https://tekimaxvideos.blob.core.windows.net/blog/neuron.mp4" type="video/mp4" />
                </video>
                
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4">
                  {/* AI Voice Input Style Visualizer */}
                  <div className="flex flex-col items-center gap-2">
                    <button
                      className="w-16 h-16 rounded-xl flex items-center justify-center transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVideoPlayback();
                      }}
                    >
                      {isVideoPlaying ? (
                        <div
                          className="w-6 h-6 rounded-sm animate-spin bg-white cursor-pointer"
                          style={{ animationDuration: '3s' }}
                        />
                      ) : (
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </button>
                    
                    <div className="h-4 w-64 flex items-center justify-center gap-0.5">
                      {[...Array(48)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-0.5 rounded-full transition-all duration-300 ${
                            isVideoPlaying
                              ? 'bg-white/50 animate-pulse'
                              : 'bg-white/10 h-1'
                          }`}
                          style={
                            isVideoPlaying
                              ? {
                                  height: `${20 + Math.random() * 80}%`,
                                  animationDelay: `${i * 0.05}s`,
                                }
                              : undefined
                          }
                        />
                      ))}
                    </div>
                    
                    <p className="text-xs text-white/70">
                      {isVideoPlaying ? 'Playing...' : 'Click to play'}
                    </p>
                  </div>
                </div>
              </div>
            )}


            {/* Episode Title Overlay - Show when accordion is open */}
            {currentEpisode && !showVideoPlayer && (
              <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-sm rounded-xl px-4 py-3">
                <div className="flex items-center gap-4">
                  {/* Play Button - Left Side */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEpisodePlay(currentEpisode);
                    }}
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors flex items-center justify-center flex-shrink-0"
                  >
                    <Play className="w-5 h-5 ml-0.5" />
                  </button>
                  
                  {/* Episode Info - Right Side */}
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg mb-1">{currentEpisode.title}</h4>
                    <p className="text-white/70 text-sm">{currentEpisode.number} • {currentEpisode.authors ? currentEpisode.authors.map(author => author.name).join(' & ') : currentEpisode.author}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Click hint overlay */}
            {!showVideoPlayer && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/60 backdrop-blur-sm rounded-xl px-6 py-3 text-white text-sm">
                  Click to play video
                </div>
              </div>
            )}
          </div>

          {/* Video Player at Bottom - Full Width */}
          {showVideoPlayer && currentEpisode && isClient && (
            <div className="w-full bg-[#11111198] backdrop-blur-sm border-t border-white/10 p-6">
              <div className="space-y-4">
                {/* Episode Info */}
                <div className="text-center">
                  <h4 className="text-white font-semibold text-lg">{currentEpisode.title}</h4>
                  <p className="text-white/60 text-sm">{currentEpisode.number} • {currentEpisode.authors ? currentEpisode.authors.map(author => author.name).join(' & ') : currentEpisode.author}</p>
                </div>

                {/* Simple HTML5 Audio Player */}
                <div className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden bg-black/90 p-6 text-center">
                  {/* HTML5 Audio Player with Native Controls */}
                  <audio
                    ref={audioPlayerRef}
                    controls
                    preload="metadata"
                    className="w-full max-w-md mx-auto"
                    style={{
                      filter: 'invert(1)',
                      backgroundColor: 'transparent'
                    }}
                    onPlay={() => {
                      console.log('Audio started playing');
                      setIsVideoPlaying(true);
                    }}
                    onPause={() => {
                      console.log('Audio paused');
                      setIsVideoPlaying(false);
                    }}
                    onEnded={() => {
                      console.log('Audio ended');
                      setIsVideoPlaying(false);
                    }}
                    onError={(e) => {
                      console.error('Audio error:', e);
                    }}
                    onLoadedData={() => {
                      console.log('Audio loaded successfully');
                    }}
                    onCanPlay={() => {
                      console.log('Audio can play');
                    }}
                  >
                    <source src={currentEpisode.audioUrl} type="audio/mpeg" />
                    <source src={currentEpisode.audioUrl} type="audio/mp4" />
                    Your browser does not support the audio element.
                  </audio>
                  
                  <p className="text-white/60 text-xs mt-4">
                    Duration: {currentEpisode.duration} • High quality MP3
                  </p>
                </div>

                {/* Close Button */}
                <div className="text-center">
                  <button
                    onClick={() => {
                      // Stop any playing audio/video
                      const allMedia = document.querySelectorAll('video, audio');
                      allMedia.forEach(media => {
                        media.pause();
                        media.currentTime = 0;
                      });
                      
                      setShowVideoPlayer(false);
                      setIsVideoPlaying(false);
                      
                      // Reset to placeholder video and restart
                      setCurrentVideoSrc('https://tekimaxvideos.blob.core.windows.net/blog/audio1.mp4');
                      setTimeout(() => {
                        if (videoRef.current) {
                          videoRef.current.load();
                          videoRef.current.play().catch(() => {});
                        }
                      }, 100);
                    }}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    Close Player
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Episode List (Slightly Wider) */}
        <div className="w-full lg:w-1/4 bg-gradient-to-br from-gray-900 to-black p-6 lg:p-8 overflow-y-auto">
          <div className="max-h-screen">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-white mb-1">Recent Episodes</h3>
              <p className="text-xs text-white/70">Latest research insights</p>
            </div>

            <div className="space-y-4">
              {/* Episode Accordions */}
              {episodes.map((episode) => (
                <div 
                  key={episode.id}
                  className={`bg-white transition-all duration-300 shadow-lg overflow-hidden rounded-r-xl border-l-6 border-${episode.color}-500 ${
                    openAccordion === episode.id 
                      ? `bg-${episode.color}-50 border-t border-r border-b border-${episode.color}-200` 
                      : 'border-t border-r border-b border-gray-200'
                  }`}
                >
                  {/* Accordion Header */}
                  <div className="flex items-center gap-4 p-4">
                    {/* Blue Play Button - Left Side */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEpisodePlay(episode);
                      }}
                      className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors flex items-center justify-center flex-shrink-0"
                    >
                      <Play className="w-4 h-4 ml-0.5" />
                    </button>

                    {/* Accordion Toggle Button */}
                    <button
                      onClick={() => handleAccordionOpen(episode)}
                      className={`flex-1 text-left transition-colors ${
                        openAccordion === episode.id 
                          ? `hover:bg-${episode.color}-100` 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-medium text-gray-600">{episode.number}</span>
                            <span className="text-sm text-gray-500">{episode.duration}</span>
                          </div>
                          <h4 className="text-sm font-medium text-gray-800">{episode.title}</h4>
                        </div>
                        <svg 
                          className={`w-4 h-4 text-gray-600 transition-transform duration-200 flex-shrink-0 ml-3 ${openAccordion === episode.id ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                  </div>

                  {/* Accordion Content */}
                  {openAccordion === episode.id && (
                    <div className={`px-4 pb-4 space-y-4 border-t border-${episode.color}-200`}>
                      <div className="pt-4">
                        <p className="text-sm text-gray-700 mb-4">{episode.description}</p>
                        
                        <div className="space-y-4">
                          {/* Authors Section */}
                          <div>
                            <h5 className="text-sm font-medium text-gray-800 mb-2">Authors</h5>
                            {episode.authors ? (
                              <div className="space-y-2">
                                {episode.authors.map((author, index) => (
                                  <div key={index} className="text-sm text-gray-600">
                                    <p className="font-medium">{author.name}</p>
                                    <p className="text-xs text-gray-500">{author.title}</p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-600">{episode.author}</p>
                            )}
                          </div>

                          {/* Toolkit Information */}
                          {episode.toolkitInfo && (
                            <div>
                              <h5 className="text-sm font-medium text-gray-800 mb-2">Toolkit Information</h5>
                              <div className="space-y-3 text-sm text-gray-600">
                                <div>
                                  <h6 className="font-medium text-gray-700">Purpose</h6>
                                  <p className="text-xs leading-relaxed">{episode.toolkitInfo.purpose}</p>
                                </div>
                                <div>
                                  <h6 className="font-medium text-gray-700">Usage</h6>
                                  <p className="text-xs leading-relaxed">{episode.toolkitInfo.usage}</p>
                                </div>
                                <div>
                                  <h6 className="font-medium text-gray-700">License</h6>
                                  <p className="text-xs leading-relaxed">{episode.toolkitInfo.license}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="pt-3">
                            {/* License Link Button - Black, No Rounded Corners, White Text */}
                            <a
                              href={episode.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white text-sm transition-colors font-medium"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-4 h-4" />
                              View Creative Commons License
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};