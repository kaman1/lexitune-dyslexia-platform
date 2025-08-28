"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DisclaimerPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handlePlayPause = () => {
    const video = document.getElementById('disclaimer-video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        video.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <img
              src="/images/tekimax-logo.png"
              alt="TEKIMAX"
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Disclaimer Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Disclaimer
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Important legal information regarding depictions and representations on this website.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Representation Disclaimer
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  All persons depicted on this website are professional actors or models and do not represent actual customers or users of TEKIMAX products or services. Their images are used solely for illustrative and promotional purposes. Any resemblance to real persons, living or dead, is purely coincidental.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The individuals depicted in images or videos on this website are actors or models and are not actual customers or users of our products or services. Their likeness is used for illustrative purposes only.
                </p>
              </div>



              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Federal Trade Commission (FTC) Compliance
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  This disclaimer is provided in compliance with Federal Trade Commission guidelines regarding the use of actors, models, and simulated testimonials in promotional materials. All promotional content featuring individuals is clearly identified as using professional talent for illustrative purposes only.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Legal Notice
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  TEKIMAX (2ENOVATE LLC DBA: TEKIMAX) disclaims any liability for misinterpretation of promotional materials. All visual representations are for marketing and educational purposes only and do not constitute actual customer testimonials, endorsements, or real user experiences.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  For questions regarding this disclaimer, please contact TEKIMAX at{" "}
                  <a href="mailto:info@tekimax.com" className="text-blue-600 hover:text-blue-800 underline">
                    info@tekimax.com
                  </a>.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Video Player Card */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="p-6 shadow-lg">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Promotional Content Sample
                </h3>
                <p className="text-sm text-gray-600">
                  Example of promotional content featuring professional talent for illustrative purposes.
                </p>
                
                {/* Video Player */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  {!videoError ? (
                    <>
                      <video
                        id="disclaimer-video"
                        className="w-full h-full object-cover"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onError={() => setVideoError(true)}
                        preload="metadata"
                        poster="https://images.unsplash.com/photo-1625014053925-88bef4805a76?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      >
                        <source
                          src="https://tekimaxvideos.blob.core.windows.net/videos/final-3.mp4"
                          type="video/mp4"
                        />
                      </video>
                      
                      {/* Play/Pause Overlay - Visible by default, hidden when playing */}
                      <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity ${
                        isPlaying ? 'opacity-0' : 'opacity-100 hover:opacity-100'
                      }`}>
                        <Button
                          onClick={handlePlayPause}
                          size="lg"
                          className="bg-white/90 hover:bg-white text-black rounded-full p-4 shadow-lg"
                        >
                          {isPlaying ? (
                            <Pause className="h-6 w-6" />
                          ) : (
                            <Play className="h-6 w-6 ml-1" />
                          )}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                          <Play className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-sm">Video unavailable</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-xs text-gray-500">
                  <p>This video uses professional actors for demonstration purposes only.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Additional Legal Information */}
        <div className="border-t pt-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Additional Legal Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Effective Date
                </h3>
                <p className="text-gray-700 mb-6">
                  This disclaimer is effective as of January 1, 2025, and applies to all promotional materials, websites, and marketing communications published by TEKIMAX.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Modifications
                </h3>
                <p className="text-gray-700">
                  TEKIMAX reserves the right to modify this disclaimer at any time without prior notice. Continued use of this website constitutes acceptance of any modifications.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Scope of Disclaimer
                </h3>
                <p className="text-gray-700 mb-6">
                  This disclaimer applies to all visual content, including but not limited to photographs, videos, graphics, and any other media featuring individuals on TEKIMAX websites and promotional materials.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Governing Law
                </h3>
                <p className="text-gray-700">
                  This disclaimer shall be governed by and construed in accordance with the laws of the State of Texas, United States.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-16 border-t mt-16 gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Homepage
          </Link>
          <div className="flex gap-4 text-sm">
            <Link href="/privacy" className="text-zinc-600 hover:text-zinc-900">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-zinc-600 hover:text-zinc-900">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}