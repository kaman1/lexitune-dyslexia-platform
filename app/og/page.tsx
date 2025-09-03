"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Play, Plus, BookOpen, Volume2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";

interface SavedWord {
  id: string;
  word: string;
  pronunciation: string;
  definition?: string;
  savedAt: Date;
}

export default function OGPage() {
  const router = useRouter();
  const [currentWord, setCurrentWord] = useState("World");
  const [currentPronunciation, setCurrentPronunciation] = useState("wɜːld");
  const [currentDefinition, setCurrentDefinition] = useState("The earth, together with all of its countries, peoples, and natural features.");
  const [savedWords, setSavedWords] = useState<SavedWord[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [newPronunciation, setNewPronunciation] = useState("");
  const [newDefinition, setNewDefinition] = useState("");

  // Load saved words from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('og-saved-words');
    if (saved) {
      try {
        setSavedWords(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved words:', error);
      }
    }
  }, []);

  // Save words to localStorage whenever savedWords changes
  useEffect(() => {
    localStorage.setItem('og-saved-words', JSON.stringify(savedWords));
  }, [savedWords]);

  // Handle back navigation
  const handleBack = () => {
    try {
      if (typeof window !== 'undefined' && window.history.length > 1) {
        window.history.back();
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      router.push('/dashboard');
    }
  };

  // Handle word pronunciation using AI TTS
  const handlePronounce = async (text: string) => {
    if (isPlaying) return;
    
    console.log('🎤 Starting pronunciation for:', text);
    setIsPlaying(true);
    
    try {
      // Call the AI TTS endpoint
      console.log('📡 Calling API endpoint...');
      const response = await fetch('/api/og/pronounce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          voice: 'alloy'
        })
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        console.log('✅ API call successful, processing audio...');
        const audioBlob = await response.blob();
        console.log('🎵 Audio blob size:', audioBlob.size);
        
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log('🔗 Audio URL created:', audioUrl);
        
        // Create and play audio
        const audio = new Audio(audioUrl);
        audio.onended = () => {
          console.log('🎵 Audio playback ended');
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
        };
        audio.onerror = (e) => {
          console.error('❌ Audio playback error:', e);
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
          toast.error('Failed to play pronunciation');
        };
        
        console.log('▶️ Starting audio playback...');
        await audio.play();
        console.log('✅ Audio playback started successfully');
      } else {
        const errorText = await response.text();
        console.error('❌ API error response:', errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('❌ Pronunciation error:', error);
      toast.error(`Failed to generate pronunciation: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsPlaying(false);
    }
  };

  // Handle word selection from saved list
  const handleWordSelect = (word: SavedWord) => {
    setCurrentWord(word.word);
    setCurrentPronunciation(word.pronunciation);
    setCurrentDefinition(word.definition || '');
    setIsSheetOpen(false);
  };

  // Handle adding new word
  const handleAddWord = () => {
    if (!newWord.trim() || !newPronunciation.trim()) {
      toast.error('Please enter both word and pronunciation');
      return;
    }

    const newSavedWord: SavedWord = {
      id: Date.now().toString(),
      word: newWord.trim(),
      pronunciation: newPronunciation.trim(),
      definition: newDefinition.trim() || undefined,
      savedAt: new Date()
    };

    setSavedWords(prev => [newSavedWord, ...prev]);
    setNewWord('');
    setNewPronunciation('');
    setNewDefinition('');
    toast.success('Word added successfully!');
  };

  // Handle deleting saved word
  const handleDeleteWord = (wordId: string) => {
    setSavedWords(prev => prev.filter(word => word.id !== wordId));
    toast.success('Word removed from list');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="hover:bg-slate-100 rounded-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-2xl">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">OG Pronunciation</h1>
                <p className="text-slate-600">Learn how to pronounce words with AI assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Main Word Display */}
          <Card className="border-0 shadow-sm bg-white rounded-3xl">
            <CardContent className="p-12 text-center">
              <div className="space-y-6">
                {/* Word */}
                <div>
                  <h2 className="text-6xl font-bold text-slate-900 mb-4">
                    {currentWord}
                  </h2>
                  <p className="text-2xl text-slate-600 font-mono">
                    {currentPronunciation}
                  </p>
                </div>

                {/* Definition */}
                {currentDefinition && (
                  <div className="max-w-2xl mx-auto">
                    <p className="text-lg text-slate-700 leading-relaxed">
                      {currentDefinition}
                    </p>
                  </div>
                )}

                {/* Play Button */}
                <div className="pt-4">
                  <Button
                    onClick={() => handlePronounce(currentWord)}
                    disabled={isPlaying}
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 rounded-2xl px-8 py-3 h-14"
                  >
                    {isPlaying ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Pronouncing...
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-5 w-5 mr-2" />
                        Pronounce Word
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saved Words Button */}
          <div className="text-center">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-2xl px-8 py-3 h-14"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Saved Words ({savedWords.length})
                </Button>
              </SheetTrigger>
              
              <SheetContent className="w-[500px] sm:w-[600px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Saved Words
                  </SheetTitle>
                </SheetHeader>
                
                <div className="mt-6 space-y-6">
                  {/* Add New Word Form */}
                  <Card className="border border-slate-200 rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-lg">Add New Word</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-word">Word</Label>
                        <Input
                          id="new-word"
                          value={newWord}
                          onChange={(e) => setNewWord(e.target.value)}
                          placeholder="Enter word"
                          className="rounded-xl"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-pronunciation">Pronunciation</Label>
                        <Input
                          id="new-pronunciation"
                          value={newPronunciation}
                          onChange={(e) => setNewPronunciation(e.target.value)}
                          placeholder="Enter pronunciation (e.g., wɜːld)"
                          className="rounded-xl"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-definition">Definition (Optional)</Label>
                        <Input
                          id="new-definition"
                          value={newDefinition}
                          onChange={(e) => setNewDefinition(e.target.value)}
                          placeholder="Enter definition"
                          className="rounded-xl"
                        />
                      </div>
                      
                      <Button
                        onClick={handleAddWord}
                        className="w-full bg-purple-600 hover:bg-purple-700 rounded-xl"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Word
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Saved Words List */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-900">Your Words</h3>
                    
                    {savedWords.length === 0 ? (
                      <div className="text-center py-8 text-slate-500">
                        <BookOpen className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                        <p>No saved words yet</p>
                        <p className="text-sm">Add some words to get started!</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {savedWords.map((word) => (
                          <div
                            key={word.id}
                            className="p-4 border border-slate-200 rounded-2xl hover:border-slate-300 transition-all cursor-pointer group"
                            onClick={() => handleWordSelect(word)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-900 text-lg">
                                  {word.word}
                                </h4>
                                <p className="text-slate-600 font-mono text-sm mt-1">
                                  {word.pronunciation}
                                </p>
                                {word.definition && (
                                  <p className="text-slate-500 text-sm mt-2 line-clamp-2">
                                    {word.definition}
                                  </p>
                                )}
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="secondary" className="text-xs rounded-full">
                                    {new Date(word.savedAt).toLocaleDateString()}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePronounce(word.word);
                                  }}
                                  className="rounded-full h-8 w-8 p-0"
                                >
                                  <Volume2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteWord(word.id);
                                  }}
                                  className="rounded-full h-8 w-8 p-0 text-red-500 hover:text-red-600"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
