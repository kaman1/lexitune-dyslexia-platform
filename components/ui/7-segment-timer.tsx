"use client"

import * as React from "react";
import { SevenSegmentNumber } from "./7-segment-number";

interface SevenSegmentTimerProps {
  seconds: number;
  width?: number;
  height?: number;
  onColor?: string;
  offColor?: string;
  className?: string;
}

export const SevenSegmentTimer: React.FC<SevenSegmentTimerProps> = ({
  seconds,
  width = 60,
  height = 100,
  onColor = "#ffffff",
  offColor = "#333333",
  className,
}) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  const minsTens = Math.floor(mins / 10);
  const minsOnes = mins % 10;
  const secsTens = Math.floor(secs / 10);
  const secsOnes = secs % 10;

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* Minutes */}
      <div className="flex gap-1">
        <SevenSegmentNumber 
          value={minsTens} 
          width={width} 
          height={height} 
          onColor={onColor} 
          offColor={offColor} 
        />
        <SevenSegmentNumber 
          value={minsOnes} 
          width={width} 
          height={height} 
          onColor={onColor} 
          offColor={offColor} 
        />
      </div>
      
      {/* Colon */}
      <div className="flex flex-col gap-2 px-1">
        <div className="w-2 h-2 rounded-full bg-white"></div>
        <div className="w-2 h-2 rounded-full bg-white"></div>
      </div>
      
      {/* Seconds */}
      <div className="flex gap-1">
        <SevenSegmentNumber 
          value={secsTens} 
          width={width} 
          height={height} 
          onColor={onColor} 
          offColor={offColor} 
        />
        <SevenSegmentNumber 
          value={secsOnes} 
          width={width} 
          height={height} 
          onColor={onColor} 
          offColor={offColor} 
        />
      </div>
    </div>
  );
};
