"use client";

import * as React from "react";
import Image from "next/image";

export const UserShowcase: React.FC = () => {
  // Sample user images - you can replace these with actual user photos
  const userImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face", // 1 - Adult man
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face", // 2 - Adult man
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face", // 3 - Adult woman
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face", // 4 - Adult man
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face", // 5 - Adult woman
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face", // 6 - Adult man
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face", // 7 - Kid (boy)
    "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face", // 8 - Adult man
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face", // 9 - Adult woman
    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop&crop=face", // 10 - Adult man
    "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop&crop=face", // 11 - Kid (girl)
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face", // 12 - Adult woman
    "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=400&h=400&fit=crop&crop=face", // 13 - Adult man
    "https://images.unsplash.com/photo-1502781252888-9143ba7f074e?w=400&h=400&fit=crop&crop=face"  // 14 - Kid (girl)
  ];

  // Create infinite scroll arrays
  const topRowImages = [...userImages, ...userImages, ...userImages];
  const bottomRowImages = [...userImages.slice().reverse(), ...userImages.slice().reverse(), ...userImages.slice().reverse()];

  return (
    <section className="pt-0 pb-0 bg-zinc-50 overflow-hidden">
      {/* Top row - scroll left */}
      <div className="mb-0">
        <div className="flex animate-scroll-left">
          {topRowImages.map((image, index) => (
            <div
              key={`top-${index}`}
              className="flex-shrink-0 w-28 h-32 relative group"
            >
              <Image
                src={image}
                alt={`User ${(index % userImages.length) + 1}`}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom row - scroll right */}
      <div>
        <div className="flex animate-scroll-right">
          {bottomRowImages.map((image, index) => (
            <div
              key={`bottom-${index}`}
              className="flex-shrink-0 w-28 h-32 relative group"
            >
              <Image
                src={image}
                alt={`User ${(index % userImages.length) + 1}`}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};