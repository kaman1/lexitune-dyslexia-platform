"use client";

import * as React from "react";
import { UserCard } from "./user-card";
import Image from "next/image";
import { ThreeDMarquee } from "./ui/3d-marquee";

interface TeamMember {
  name: string;
  role: string;
  location: string;
  bio: string;
  avatar: string;
  skills: string[];
  neurodivergentType?: string;
  social?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  colorScheme?: {
    bg: string;
    border: string;
    accent: string;
  };
}

function TeamsSection() {

    const teamMembers = [
    {
      name: "Christian Kaman",
      role: "Founder / Engineer",
      location: "Global", // Assuming global as no location provided
      bio: "Christian Kaman is the Founder and Engineer, driving innovation and technical excellence.",
      avatar: "/Team/christian.jpg",
      skills: ["Engineering", "Founding", "Innovation"],
      neurodivergentType: "ADHD", // Placeholder, as not provided
      social: {
        linkedin: "https://linkedin.com/in/christiankaman", // Placeholder
      },
      colorScheme: {
        bg: "bg-gradient-to-br from-purple-50 to-pink-50",
        border: "border-purple-200",
        accent: "text-purple-700"
      }
    },
    {
      name: "Amber Bhatti",
      role: "Instructional Designer",
      location: "Global", // Assuming global as no location provided
      bio: "Amber Bhatti, M.Ed, CPTP, is an Instructional Designer focused on creating effective learning experiences.",
      avatar: "/Team/amber.jpg",
      skills: ["Instructional Design", "Education", "Training"],
      neurodivergentType: "Dyslexia", // Placeholder, as not provided
      social: {
        linkedin: "https://linkedin.com/in/amberbhatti", // Placeholder
      },
      colorScheme: {
        bg: "bg-gradient-to-br from-green-50 to-emerald-50",
        border: "border-green-200",
        accent: "text-green-700"
      }
    },
    {
      name: "Carson Wilber",
      role: "Research & Development",
      location: "Global", // Assuming global as no location provided
      bio: "Carson Wilber leads Research & Development, exploring new frontiers in technology.",
      avatar: "/Team/carson.jpeg",
      skills: ["Research", "Development", "Innovation"],
      neurodivergentType: "Autism", // Placeholder, as not provided
      social: {
        linkedin: "https://linkedin.com/in/carsonwilber", // Placeholder
      },
      colorScheme: {
        bg: "bg-gradient-to-br from-blue-50 to-cyan-50",
        border: "border-blue-200",
        accent: "text-blue-700"
      }
    },
    {
      name: "Bella Jones",
      role: "Product Designer",
      location: "Global", // Assuming global as no location provided
      bio: "Bella Jones is a Product Designer, crafting intuitive and engaging user experiences.",
      avatar: "/Team/bella.jpg",
      skills: ["Product Design", "UX/UI", "User Experience"],
      neurodivergentType: "ADHD", // Placeholder, as not provided
      social: {
        linkedin: "https://linkedin.com/in/bellajones", // Placeholder
      },
      colorScheme: {
        bg: "bg-gradient-to-br from-orange-50 to-red-50",
        border: "border-orange-200",
        accent: "text-orange-700"
      }
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
      
      
      <div className="container px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12">
            <div>
                {/* Team Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
                    {teamMembers.map((member, index) => (
                        <UserCard
                        key={index}
                        name={member.name}
                        role={member.role}
                        avatar={member.avatar}
                        colorScheme={member.colorScheme}
                        />
                    ))}
                </div>
            </div>

            <div className="hidden lg:flex items-center justify-center flex-col text-center bg-gray-100 p-8 rounded-lg h-full"> {/* Adjust margin-top for alignment and hide on mobile */}
                <h3 className="text-3xl font-medium mb-6 tracking-tight text-[#333B68]">
                    Our Passionate Team
                </h3>
                <p className="text-lg text-zinc-600 leading-relaxed">
                    We are a team dedicated to teaching, creating, and fostering curiosity, with a focus on developing technology and AI solutions that enhance human capabilities.
                </p>

                
            </div>
        </div>
      </div>
      
    </section>
  );
}

export default TeamsSection;