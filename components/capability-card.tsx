import React from "react";

interface CapabilityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function CapabilityCard({ icon, title, description }: CapabilityCardProps) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="text-black">{icon}</div>
      <h4 className="font-medium text-black">{title}</h4>
    </div>
    <p className="text-sm text-zinc-600">{description}</p>
  );
} 