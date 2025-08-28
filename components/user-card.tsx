"use client";

import * as React from "react";
import Image from "next/image";


interface UserCardProps {
  name: string;
  role: string;
  avatar: string;
  colorScheme?: {
    bg: string;
    border: string;
    accent: string;
  };
}

export function UserCard({ 
  name, 
  role, 
  avatar, 
  colorScheme = {
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    border: "border-blue-200",
    accent: "text-blue-700"
  }
}: UserCardProps) {
  return (
    <div
      className={`rounded-3xl h-[30rem] w-full flex flex-col items-start justify-start relative z-10 shadow-lg border ${colorScheme.border} overflow-hidden hover-lift transition-smooth-slow group cursor-pointer`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={avatar}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      {/* Spacer to push content to bottom */}
      <div className="flex-1"></div>
      
      {/* Name, Role, and Bio Button */}
      <div className="px-4 md:px-6 pb-4 w-full relative z-50">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
            <h3 className={`text-xl font-semibold ${colorScheme.accent}`}>{name}</h3>
            <p className="text-base text-gray-600">{role}</p>
            {/* <button
                onClick={onViewBio}
                className={`w-full text-center mt-2 text-sm font-semibold ${colorScheme.accent} hover:underline`}
            >
                View Bio
            </button> */}
        </div>
      </div>
    </div>
  );
}
