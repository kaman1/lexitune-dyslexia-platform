"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, Square, Volume2, Settings, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

interface RealtimeVoiceChatProps {
  className?: string;
}

export function RealtimeVoiceChat({ className }: RealtimeVoiceChatProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [settings, setSettings] = useState({
    autoPlay: true,
    voice: "alloy",
    speed: 1.0,
  });

  // Refs for audio handling
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio context and setup
  useEffect(() => {
    const initAudio = async () => {
      try {
        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        console.log("🎵 Audio context initialized");
      } catch (error) {
        console.error("Failed to initialize audio context:", error);
      }
    };

    initAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Start recording with real-time audio visualization
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        } 
      });
      
      streamRef.current = stream;

      // Setup audio analysis for visualizer
      if (audioContextRef.current && analyserRef.current) {
        microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
        microphoneRef.current.connect(analyserRef.current);
      }

      // Setup MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudioInput(audioBlob);
        
        // Cleanup
        stream.getTracks().forEach(track => track.stop());
        if (microphoneRef.current) microphoneRef.current.disconnect();
      };

      // Start recording
      mediaRecorderRef.current.start();
      setIsRecording(true);
      console.log("🎤 Recording started");

      // Start audio analysis for visualizer
      updateAudioLevel();

    } catch (error) {
      console.error("Error starting recording:", error);
    }
  }, []);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  }, []);

  // Update audio level for visualizer
  const updateAudioLevel = useCallback(() => {
    if (!analyserRef.current || !isRecording) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Calculate average audio level
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    setAudioLevel(average);

    if (isRecording) {
      animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
    }
  }, [isRecording]);

  // Process audio input and get AI response
  const processAudioInput = async (audioBlob: Blob) => {
    setIsProcessing(true);
    
    try {
      // Convert audio to text using OpenAI Whisper
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.webm');
      formData.append('model', 'whisper-1');

      const response = await fetch('/api/audio/transcribe', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Transcription failed');
      }

      const { text } = await response.json();
      
      if (!text || text.trim().length === 0) {
        throw new Error('No text detected');
      }

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: text,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage]);

      // Get AI response with streaming
      await getAIResponse(text);

    } catch (error) {
      console.error("Error processing audio:", error);
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Sorry, I couldn't understand that. Please try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Get AI response with streaming TTS
  const getAIResponse = async (userText: string) => {
    try {
      // Get AI text response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });

      if (!response.ok) throw new Error('Chat failed');

      const { text } = await response.json();

      // Add AI message
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: text,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);

      // Generate and play TTS audio
      if (settings.autoPlay) {
        await generateAndPlayTTS(text);
      }

    } catch (error) {
      console.error("Error getting AI response:", error);
    }
  };

  // Generate and play TTS
  const generateAndPlayTTS = async (text: string) => {
    try {
      const response = await fetch('/api/audio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text,
          voice: settings.voice,
          speed: settings.speed
        })
      });

      if (!response.ok) throw new Error('TTS generation failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Play audio
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        URL.revokeObjectURL(currentAudioRef.current.src);
      }

      currentAudioRef.current = new Audio(audioUrl);
      currentAudioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };

      setIsPlaying(true);
      await currentAudioRef.current.play();

    } catch (error) {
      console.error("Error generating TTS:", error);
    }
  };

  // Handle recording button click
  const handleRecordingClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-6", className)}>
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Real-Time Voice Chat
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Have a natural voice conversation with AI. Speak naturally and get instant responses.
          </p>
        </CardContent>
      </Card>

      {/* Voice Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-6">
            {/* Recording Button */}
            <Button
              size="lg"
              variant={isRecording ? "destructive" : "default"}
              className={cn(
                "w-24 h-24 rounded-full transition-all duration-300",
                isRecording && "animate-pulse scale-110"
              )}
              onClick={handleRecordingClick}
              disabled={isProcessing}
            >
              {isRecording ? (
                <Square className="w-8 h-8" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </Button>

            {/* Status */}
            <div className="text-center">
              {isRecording && (
                <div className="text-lg font-medium text-red-600">
                  Recording... Click to stop
                </div>
              )}
              {isProcessing && (
                <div className="text-lg font-medium text-blue-600 flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </div>
              )}
              {!isRecording && !isProcessing && (
                <div className="text-lg font-medium text-muted-foreground">
                  Click to start recording
                </div>
              )}
            </div>

            {/* Audio Visualizer */}
            <div className="flex gap-1 mt-4">
              {Array.from({ length: 48 }).map((_, i) => (
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
        </CardContent>
      </Card>

      {/* Messages */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Start a conversation by recording your voice
              </p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 p-3 rounded-lg",
                    message.role === "user" 
                      ? "bg-blue-50 dark:bg-blue-950/20" 
                      : "bg-gray-50 dark:bg-gray-950/20"
                  )}
                >
                  <div className="flex-shrink-0">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                      message.role === "user" 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-500 text-white"
                    )}>
                      {message.role === "user" ? "U" : "AI"}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">
                        {message.role === "user" ? "You" : "AI Assistant"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Voice</label>
              <select
                value={settings.voice}
                onChange={(e) => setSettings(prev => ({ ...prev, voice: e.target.value }))}
                className="w-full mt-1 p-2 border rounded-md"
              >
                <option value="alloy">Alloy</option>
                <option value="echo">Echo</option>
                <option value="fable">Fable</option>
                <option value="onyx">Onyx</option>
                <option value="nova">Nova</option>
                <option value="shimmer">Shimmer</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Speed</label>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={settings.speed}
                onChange={(e) => setSettings(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                className="w-full mt-1"
              />
              <span className="text-xs text-muted-foreground">{settings.speed}x</span>
            </div>
            <div>
              <label className="text-sm font-medium">Auto-play</label>
              <div className="mt-1">
                <input
                  type="checkbox"
                  checked={settings.autoPlay}
                  onChange={(e) => setSettings(prev => ({ ...prev, autoPlay: e.target.checked }))}
                  className="mr-2"
                />
                <span className="text-sm">Play AI responses automatically</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
