'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, Volume2, TestTube } from 'lucide-react';
import TestAISpeech from '../test-ai-speech';
import TestLiveKit from '../test-livekit';

export default function AudioTestPage() {
  const [activeTab, setActiveTab] = useState('ai-speech');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Audio Testing Suite
          </h1>
          <p className="text-gray-600">
            Test AI speech generation and LiveKit audio functionality
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="ai-speech" className="flex items-center space-x-2">
              <Mic className="w-4 h-4" />
              <span>AI Speech Generation</span>
            </TabsTrigger>
            <TabsTrigger value="livekit" className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4" />
              <span>LiveKit Audio</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-speech" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TestTube className="w-5 h-5 text-blue-600" />
                  <span>AI SDK Speech Test</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Test the AI SDK speech generation using OpenAI's TTS model. 
                  Paste any text and convert it to speech with different voice options.
                </p>
                <TestAISpeech />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="livekit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TestTube className="w-5 h-5 text-green-600" />
                  <span>LiveKit Audio Test</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Test LiveKit real-time audio functionality. Connect to rooms, 
                  publish microphone audio, and subscribe to other participants.
                </p>
                <TestLiveKit />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Navigation */}
        <div className="mt-8 text-center">
          <Button
            onClick={() => window.location.href = '/audio'}
            variant="outline"
            className="mr-4"
          >
            ← Back to Audio Reader
          </Button>
          
          <Button
            onClick={() => window.location.href = '/dashboard'}
            variant="outline"
          >
            ← Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
