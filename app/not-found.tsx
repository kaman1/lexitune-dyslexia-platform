"use client";

import { useState } from "react";
import Link from "next/link";

export default function NotFound() {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Fullscreen Background */}
      <div className="absolute inset-0 z-0">
        {/* Fallback image - always visible */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1625014053925-88bef4805a76?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
          }}
        />

        {/* Video background - only if no error */}
        {!videoError && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setVideoError(true)}
            onLoadStart={() => console.log('404 video loading started')}
            onCanPlay={() => console.log('404 video can play')}
          >
            <source
              src="https://tekimaxvideos.blob.core.windows.net/videos/404.mp4"
              type="video/mp4"
            />
          </video>
        )}

      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        {/* 404 Text */}
        <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 tracking-tight">
          404
        </h1>
        
        {/* Error Message */}
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-md leading-relaxed">
          Oops! The page you're looking for seems to have wandered off into the digital void.
        </p>

        {/* Return Home Button */}
        <Link 
          href="/"
          className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-medium rounded-2xl hover:bg-gray-100 transition-colors duration-200 shadow-lg"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
