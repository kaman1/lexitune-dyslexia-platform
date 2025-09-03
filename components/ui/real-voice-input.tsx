"use client";

import { Mic, Square } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface RealVoiceInputProps {
  onStart?: () => void;
  onStop?: (audioBlob: Blob, duration: number) => void;
  onError?: (error: string) => void;
  visualizerBars?: number;
  className?: string;
}

export function RealVoiceInput({
  onStart,
  onStop,
  onError,
  visualizerBars = 48,
  className
}: RealVoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup audio analysis for visualizer
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      microphoneRef.current.connect(analyserRef.current);
      
      // Setup MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        onStop?.(audioBlob, duration);
        
        // Cleanup
        stream.getTracks().forEach(track => track.stop());
        if (audioContextRef.current) audioContextRef.current.close();
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
      
      // Start recording
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setDuration(0);
      onStart?.();
      
      // Start timer
      intervalRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
      
      // Start audio analysis
      updateAudioLevel();
      
    } catch (error) {
      console.error('Error starting recording:', error);
      onError?.('Failed to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const updateAudioLevel = () => {
    if (!analyserRef.current) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    // Calculate average audio level
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    setAudioLevel(average);
    
    if (isRecording) {
      animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-4">
        <button
          className={cn(
            "group w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300",
            isRecording
              ? "bg-red-500 hover:bg-red-600 shadow-lg scale-105"
              : "bg-blue-500 hover:bg-blue-600 shadow-lg hover:scale-105"
          )}
          type="button"
          onClick={handleClick}
        >
          {isRecording ? (
            <Square className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </button>

        {isRecording && (
          <div className="text-center">
            <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {formatTime(duration)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Click to stop recording
            </div>
          </div>
        )}

        {!isRecording && (
          <div className="text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Click to start recording
            </div>
          </div>
        )}

        {/* Audio Visualizer */}
        <div className="flex gap-1 mt-4">
          {Array.from({ length: visualizerBars }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1 rounded-full transition-all duration-100",
                isRecording ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
              )}
              style={{
                height: isRecording 
                  ? `${Math.max(10, (audioLevel / 255) * 50 + Math.random() * 20)}px`
                  : "10px",
                opacity: isRecording ? 0.8 : 0.3
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
