"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const VideoPlayer = () => {
  return (
    <div className="aspect-video rounded-xl overflow-hidden bg-black mb-6 relative">
      <iframe
        src="https://www.youtube.com/embed/U9mJuUkhUzk?start=173"
        title="OpenAI First Dev Day - Historical Moment"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};

interface CeoDevDayFeatureProps {
  className?: string;
}

export const CeoDevDayFeature = React.forwardRef<HTMLDivElement, CeoDevDayFeatureProps>(
  ({ className }, ref) => {
    return (
      <section className="py-24 md:py-32 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight">
                At the Edge of Discovery
              </h2>
              <p className="text-zinc-500 text-lg mb-8 max-w-2xl mx-auto">
                Our passion drives us to explore <b>human-machine cognition</b> collaboration at the cutting edge of AI innovation. Our founder <b>Christian Kaman</b> was honored to have been interviewed by OpenAI to be part of the intro video for the <b>historic first OpenAI DevDay opening keynote</b>.
              </p>
            </div>

            {/* Video Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <VideoPlayer />
            </div>
          </div>
        </div>
      </section>
    );
  }
);

CeoDevDayFeature.displayName = "CeoDevDayFeature";