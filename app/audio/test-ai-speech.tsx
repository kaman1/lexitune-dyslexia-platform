'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface AudioTestResult {
  audioUrl: string | null;
  duration: string;
  isPlaying: boolean;
  isGenerated: boolean;
}

export default function TestAISpeech() {
  const [text, setText] = useState('Hello! This is a test of AI speech generation. You can paste any text here and it will be converted to speech.');
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioResult, setAudioResult] = useState<AudioTestResult>({
    audioUrl: null,
    duration: '',
    isPlaying: false,
    isGenerated: false
  });
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const handleGenerateSpeech = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to convert to speech.');
      return;
    }

    setIsGenerating(true);
    setAudioResult(prev => ({ ...prev, isGenerated: false }));

    try {
      console.log('🎤 Generating AI speech for:', text.substring(0, 100) + '...');
      
      const response = await fetch('/api/audio/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          voice: selectedVoice,
          language: 'en'
        })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Check if this was chunked audio
        const totalChunks = response.headers.get('X-Total-Chunks');
        const isChunked = response.headers.get('X-Is-Chunked');
        
        let duration = 'Generated';
        if (totalChunks && isChunked === 'true') {
          const chunkCount = parseInt(totalChunks);
          if (chunkCount > 1) {
            duration = `${chunkCount} segments`;
          }
        }

        setAudioResult({
          audioUrl,
          duration,
          isPlaying: false,
          isGenerated: true
        });

        // Create audio element
        const audio = new Audio(audioUrl);
        audio.onended = () => setAudioResult(prev => ({ ...prev, isPlaying: false }));
        setAudioElement(audio);

        toast.success('Audio generated successfully!');
        console.log('✅ AI speech generation successful');
      } else {
        const errorData = await response.json();
        console.error('❌ AI speech generation failed:', errorData);
        toast.error(`Generation failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ AI speech generation error:', error);
      toast.error('Failed to generate speech. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlayPause = () => {
    if (!audioElement) return;

    if (audioResult.isPlaying) {
      audioElement.pause();
      setAudioResult(prev => ({ ...prev, isPlaying: false }));
    } else {
      audioElement.play();
      setAudioResult(prev => ({ ...prev, isPlaying: true }));
    }
  };

  const handleDownload = () => {
    if (!audioResult.audioUrl) return;

    const a = document.createElement('a');
    a.href = audioResult.audioUrl;
    a.download = `ai-speech-${Date.now()}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('Audio downloaded!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🎤</span>
            <span>AI SDK Speech Test</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Voice Selection */}
          <div>
            <Label htmlFor="voice-select">AI Voice</Label>
            <select
              id="voice-select"
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={isGenerating}
            >
              <option value="alloy">Alloy (Neutral)</option>
              <option value="echo">Echo (Male)</option>
              <option value="fable">Fable (Male)</option>
              <option value="onyx">Onyx (Male)</option>
              <option value="nova">Nova (Female)</option>
              <option value="shimmer">Shimmer (Female)</option>
            </select>
          </div>

          {/* Text Input */}
          <div>
            <Label htmlFor="text-input">Text to Convert to Speech</Label>
            <Textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter or paste text here..."
              className="mt-1 min-h-[120px]"
              disabled={isGenerating}
            />
            <p className="mt-1 text-sm text-gray-500">
              {text.length} characters
            </p>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerateSpeech}
            disabled={isGenerating || !text.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Speech...
              </>
            ) : (
              'Generate Speech'
            )}
          </Button>

          {/* Audio Controls */}
          {audioResult.isGenerated && audioResult.audioUrl && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-3">Audio Generated Successfully!</h4>
              
              <div className="flex items-center space-x-3 mb-3">
                <Button
                  onClick={handlePlayPause}
                  variant="outline"
                  className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                >
                  {audioResult.isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Play
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>

              <div className="text-sm text-green-700">
                <p>Duration: {audioResult.duration}</p>
                <p>Voice: {selectedVoice}</p>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">How to Test:</h4>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
              <li>Select your preferred AI voice</li>
              <li>Paste or type text in the textarea</li>
              <li>Click "Generate Speech"</li>
              <li>Use the Play/Pause and Download buttons</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
