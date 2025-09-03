"use client";

import { RealtimeVoiceChat } from "@/components/ui/realtime-voice-chat";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <h1 className="text-4xl font-bold text-center mb-4">
          Real-Time Voice Test
        </h1>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto">
          Test the real-time voice conversation system. This page uses OpenAI's API directly for transcription and chat.
        </p>
      </div>
      
      <RealtimeVoiceChat />
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Make sure your microphone permissions are enabled in the browser.</p>
        <p>The system will transcribe your speech using OpenAI Whisper and respond using GPT-4o.</p>
      </div>
    </div>
  );
}
