"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { RealtimeEvents } from './realtime-events';
import { cn } from '@/lib/utils';

interface RealtimeVoiceConversationProps {}

export function RealtimeVoiceConversation({}: RealtimeVoiceConversationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [conversationMessages, setConversationMessages] = useState<Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
  }>>([]);

  // Refs for audio handling
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const audioQueueRef = useRef<HTMLAudioElement[]>([]);
  const isProcessingRef = useRef(false);

  // Event logging
  const [events, setEvents] = useState<Array<{
    id: string;
    type: 'user_speech' | 'ai_response' | 'system' | 'connection' | 'error';
    message: string;
    timestamp: Date;
    metadata?: any;
  }>>([]);

  const addEvent = useCallback((type: any, message: string, metadata?: any) => {
    const event = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
      metadata
    };
    setEvents(prev => [...prev, event]);
  }, []);

  // Create real-time session
  const createSession = useCallback(async () => {
    try {
      addEvent('system', 'Creating real-time session...');
      
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.session_id) {
        setSessionId(data.session_id);
        setIsConnected(true);
        addEvent('connection', 'Connected to Real-Time API', { session_id: data.session_id });
        console.log('✅ Session created:', data.session_id);
      } else {
        throw new Error('Failed to create session');
      }

    } catch (error) {
      console.error('Session creation error:', error);
      addEvent('error', 'Failed to create session', { error: error.message });
    }
  }, [addEvent]);

  // Initialize audio context and analyzer
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.8;
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Audio level visualization
  const updateAudioLevel = useCallback(() => {
    if (!analyserRef.current || !isListening) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    const normalizedLevel = Math.min(average / 128, 1);
    setAudioLevel(normalizedLevel);

    if (isListening) {
      requestAnimationFrame(updateAudioLevel);
    }
  }, [isListening]);

  // Process audio chunk and send to Real-Time API
  const processAudioChunk = useCallback(async (audioBlob: Blob) => {
    if (!sessionId || isProcessingRef.current) return;

    try {
      isProcessingRef.current = true;
      addEvent('user_speech', 'Processing audio chunk...');

      // Convert audio blob to base64
      const arrayBuffer = await audioBlob.arrayBuffer();
      const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

      // Send to Real-Time API for processing
      const response = await fetch(`/api/realtime/audio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          audio_data: base64Audio,
          audio_format: 'webm'
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.ai_response) {
          // Add user speech to conversation
          if (data.user_transcription) {
            setConversationMessages(prev => [...prev, {
              role: 'user',
              content: data.user_transcription,
              timestamp: new Date()
            }]);
          }

          // Play AI response audio
          playAIResponse(data.ai_response);
          addEvent('ai_response', 'AI responded', { response_length: data.ai_response.length });
          
          // Add AI response to conversation
          setConversationMessages(prev => [...prev, {
            role: 'assistant',
            content: data.ai_text || 'AI response',
            timestamp: new Date()
          }]);
        }
      } else {
        throw new Error(`API error: ${response.status}`);
      }

    } catch (error) {
      console.error('Audio processing error:', error);
      addEvent('error', 'Failed to process audio', { error: error.message });
    } finally {
      isProcessingRef.current = false;
    }
  }, [sessionId, addEvent]);

  // Play AI response audio
  const playAIResponse = useCallback((audioData: string) => {
    if (isMuted) return;

    try {
      // Convert base64 to audio blob
      const binaryString = atob(audioData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const audioBlob = new Blob([bytes], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      audioQueueRef.current.push(audio);
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        audioQueueRef.current = audioQueueRef.current.filter(a => a !== audio);
      };
      
      audio.play().catch(error => {
        console.error('Audio playback error:', error);
        addEvent('error', 'Failed to play AI response', { error: error.message });
      });

    } catch (error) {
      console.error('Audio response error:', error);
      addEvent('error', 'Failed to process AI response', { error: error.message });
    }
  }, [isMuted, addEvent]);

  // Start continuous listening
  const startListening = useCallback(async () => {
    if (!isConnected) {
      await createSession();
      return;
    }

    try {
      addEvent('system', 'Requesting microphone access...');

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 16000,
        }
      });

      streamRef.current = stream;
      addEvent('system', 'Microphone access granted');

      // Setup audio analysis for visualizer
      if (audioContextRef.current && analyserRef.current) {
        microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
        microphoneRef.current.connect(analyserRef.current);
      }

      // Setup MediaRecorder for continuous streaming
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 16000
      });

      // Handle audio data for real-time processing
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          // Send audio chunk to OpenAI API
          processAudioChunk(event.data);
        }
      };

      // Start continuous recording
      mediaRecorderRef.current.start(100); // Send data every 100ms
      setIsListening(true);
      addEvent('user_speech', 'Continuous listening started - processing audio in real-time');
      console.log("🎤 Continuous listening started");

      // Start audio analysis for visualizer
      updateAudioLevel();

    } catch (error) {
      console.error("Error starting listening:", error);
      addEvent('error', 'Failed to start listening', { error: error.message });
    }
  }, [isConnected, createSession, addEvent, processAudioChunk, updateAudioLevel]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && streamRef.current) {
      mediaRecorderRef.current.stop();
      streamRef.current.getTracks().forEach(track => track.stop());
      setIsListening(false);
      addEvent('system', 'Listening stopped');
    }
  }, [addEvent]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
    addEvent('system', `Audio ${!isMuted ? 'muted' : 'unmuted'}`);
  }, [isMuted, addEvent]);

  // Disconnect session
  const disconnect = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    
    setIsConnected(false);
    setIsListening(false);
    setSessionId(null);
    setConversationMessages([]);
    addEvent('connection', 'Disconnected from Real-Time API');
  }, [addEvent]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
      {/* Left Column - Voice Controls */}
      <div className="space-y-6">
        {/* Connection Status */}
        <Card className={cn(
          "transition-colors",
          isConnected ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200"
        )}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isConnected ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  Connected to Real-Time API
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-orange-500 rounded-full" />
                  Connect to Real-Time API
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isConnected ? (
              <Button 
                onClick={createSession}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Connect to Real-Time API
              </Button>
            ) : (
              <Button 
                onClick={disconnect}
                variant="outline"
                className="w-full border-red-300 text-red-700 hover:bg-red-50"
              >
                Disconnect
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Microphone Input */}
        <Card>
          <CardHeader>
            <CardTitle>Voice Input</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative">
              <Button
                onClick={isListening ? stopListening : startListening}
                disabled={!isConnected}
                className={cn(
                  "w-24 h-24 rounded-full transition-all duration-300",
                  isListening 
                    ? "bg-red-500 hover:bg-red-600 animate-pulse" 
                    : "bg-gray-500 hover:bg-gray-600",
                  !isConnected && "opacity-50 cursor-not-allowed"
                )}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8 text-white" />
                ) : (
                  <Mic className="w-8 h-8 text-white" />
                )}
              </Button>
              
              {!isConnected && (
                <p className="text-orange-600 mt-2 text-sm">
                  Connect to Realtime API first.
                </p>
              )}
            </div>

            {/* Audio Visualizer */}
            <div className="flex justify-center items-end gap-1 mt-6 h-16">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1 bg-orange-400 rounded-full transition-all duration-100",
                    isListening && "animate-pulse"
                  )}
                  style={{
                    height: isListening ? `${Math.max(4, audioLevel * 60 * Math.random())}px` : '4px'
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversation Display */}
        <Card>
          <CardHeader>
            <CardTitle>Real-Time Conversation</CardTitle>
          </CardHeader>
          <CardContent>
            {conversationMessages.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Start a continuous conversation by clicking the microphone.
              </p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {conversationMessages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-3 rounded-lg",
                      message.role === 'user' 
                        ? "bg-blue-100 text-blue-900 ml-8" 
                        : "bg-green-100 text-green-900 mr-8"
                    )}
                  >
                    <div className="text-xs text-muted-foreground mb-1">
                      {message.role === 'user' ? 'You' : 'AI'} • {message.timestamp.toLocaleTimeString()}
                    </div>
                    <div>{message.content}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Real-Time Events */}
      <div className="space-y-6">
        <RealtimeEvents 
          events={events}
          isConnected={isConnected}
          isListening={isListening}
          isMuted={isMuted}
          onToggleMute={toggleMute}
        />
      </div>
    </div>
  );
}
