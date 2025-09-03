"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight, Mic, Volume2 } from "lucide-react";

export default function ConversationPage() {
  const handleRedirect = () => {
    window.open('http://localhost:3005', '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Real-Time Voice Conversation
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Experience true real-time voice conversations with AI using our dedicated service.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Mic className="w-6 h-6 text-blue-600" />
              Real-Time API Service
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Our real-time voice conversation service is running on a dedicated server for optimal performance.
              </p>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Volume2 className="w-4 h-4" />
                <span>Powered by GPT-Realtime with low-latency audio processing</span>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                onClick={handleRedirect}
                size="lg"
                className="w-full max-w-xs"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Real-Time Service
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Continuous voice conversation with AI</p>
              <p>• Real-time transcription and response</p>
              <p>• Low-latency audio processing</p>
              <p>• Dedicated server for optimal performance</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
