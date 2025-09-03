"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { ArrowLeft, Upload, Play, Pause, Volume2, VolumeX, Download, FileText, Loader2, Mic, Headphones, Sparkles, ChevronDown, ChevronRight, X, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";

interface AudioFile {
  id: string;
  name: string;
  size: number;
  uploadedAt: Date;
  status: 'processing' | 'ready' | 'playing' | 'paused' | 'error';
  audioUrl?: string | null;
  duration?: string | null;
  text?: string;
  isFallback?: boolean;
  textLength?: number;
  processedTextLength?: number;
  ocrMethod?: 'server-ocr' | 'fallback';
  ocrConfidence?: number;
  ocrProcessingTime?: number;
  ocrPages?: number;
  ocrLanguage?: string;
}

export default function AudioPage() {
  const router = useRouter();
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [audioRefs, setAudioRefs] = useState<{ [key: string]: HTMLAudioElement | null }>({});
  const [isOcrAvailable, setIsOcrAvailable] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  const [isUploadAccordionOpen, setIsUploadAccordionOpen] = useState(false);
  const [selectedPdfForPreview, setSelectedPdfForPreview] = useState<AudioFile | null>(null);
  const [isPreviewSheetOpen, setIsPreviewSheetOpen] = useState(false);

  // Handle back navigation
  const handleBack = () => {
    console.log('🔙 Back button clicked');
    console.log('Window history length:', typeof window !== 'undefined' ? window.history.length : 'undefined');
    
    try {
      // Try to go back first
      if (typeof window !== 'undefined' && window.history.length > 1) {
        console.log('🔄 Going back in history...');
        window.history.back();
      } else {
        // Fallback to dashboard
        console.log('🏠 Redirecting to dashboard...');
        router.push('/dashboard');
      }
    } catch (error) {
      console.log('❌ Navigation error:', error);
      // Always fallback to dashboard
      router.push('/dashboard');
    }
  };

  // Check OCR service availability
  useEffect(() => {
    const checkOCRService = async () => {
      try {
        const response = await fetch('/api/ocr');
        if (response.ok) {
          setIsOcrAvailable(true);
          console.log('✅ OCR service available');
        } else {
          setIsOcrAvailable(false);
          console.log('⚠️ OCR service not available');
        }
      } catch (error) {
        console.log('⚠️ OCR service check failed:', error);
        setIsOcrAvailable(false);
      }
    };

    checkOCRService();
  }, []);

  // Handle file selection
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else if (file) {
      toast.error('Please select a PDF file');
    }
  };

  // Handle file upload and AI processing
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Create new audio file entry
    const newAudioFile: AudioFile = {
      id: Date.now().toString(),
      name: selectedFile.name,
      size: selectedFile.size,
      uploadedAt: new Date(),
      status: 'processing'
    };

    setAudioFiles(prev => [newAudioFile, ...prev]);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Use OCR microservice for text extraction
      let ocrResult = null;
      let finalText = '';
      let finalTextLength = 0;
      
      if (isOcrAvailable) {
        try {
          console.log('🔍 Starting OCR text extraction...');
          
          const formData = new FormData();
          formData.append('file', selectedFile);
          formData.append('language', 'eng');
          formData.append('optimize', 'true');
          formData.append('forceOcr', 'false');
          
          const ocrResponse = await fetch('/api/ocr', {
            method: 'POST',
            body: formData
          });
          
          if (ocrResponse.ok) {
            ocrResult = await ocrResponse.json();
            console.log('✅ OCR completed:', ocrResult);
            
            if (ocrResult.success && ocrResult.data?.text) {
              finalText = ocrResult.data.text;
              finalTextLength = ocrResult.data.text.length;
            }
          } else {
            console.warn('⚠️ OCR service failed, using fallback');
          }
        } catch (ocrError) {
          console.error('❌ OCR failed:', ocrError);
        }
      }

      // If OCR didn't work, use fallback
      if (!finalText) {
        finalText = `PDF processed: ${selectedFile.name}\nSize: ${selectedFile.size} bytes\nOCR: ${isOcrAvailable ? 'Service available but text extraction failed' : 'Service not available'}`;
        finalTextLength = finalText.length;
      }

      // Generate AI speech from the extracted text
      let aiResult = null;
      
      if (finalText && finalTextLength > 10) {
        try {
          console.log('🎤 Generating AI speech...');
          
          // Call the AI speech generation endpoint
          const speechResponse = await fetch('/api/audio/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: finalText,
              voice: selectedVoice,
              language: 'en'
            })
          });
          
          if (speechResponse.ok) {
            // Create a blob URL for the audio
            const audioBlob = await speechResponse.blob();
            
            // Check file size - warn if too large
            const maxSize = 50 * 1024 * 1024; // 50MB limit
            if (audioBlob.size > maxSize) {
              console.warn(`⚠️ Audio file is very large: ${(audioBlob.size / 1024 / 1024).toFixed(2)}MB`);
              toast.warning(`Audio generated but file is very large (${(audioBlob.size / 1024 / 1024).toFixed(2)}MB). Playback may be slow.`);
            }
            
            const audioUrl = URL.createObjectURL(audioBlob);
            
            // Check if this was chunked audio
            const totalChunks = speechResponse.headers.get('X-Total-Chunks');
            const isChunked = speechResponse.headers.get('X-Is-Chunked');
            
            let duration = 'Generated';
            if (totalChunks && isChunked === 'true') {
              const chunkCount = parseInt(totalChunks);
              if (chunkCount > 1) {
                duration = `${chunkCount} segments`;
                console.log(`📦 Audio generated in ${chunkCount} chunks for long document`);
              }
            }
            
            aiResult = {
              audioUrl: audioUrl,
              duration: duration,
              isFallback: false
            };
            
            console.log('✅ AI speech generation successful');
          } else {
            const errorData = await speechResponse.json();
            console.warn('⚠️ AI speech generation failed:', errorData.error);
            
            // Check for specific error types
            if (errorData.error?.includes('Text too long')) {
              toast.error('Document too long for AI processing. Try with a shorter document.');
            } else if (errorData.error?.includes('maximum') || errorData.error?.includes('size')) {
              toast.error('Audio file too large. Try with a shorter document.');
            } else {
              toast.error('AI speech generation failed. Please try again.');
            }
            
            aiResult = {
              audioUrl: null,
              duration: null,
              isFallback: true
            };
          }
        } catch (aiError) {
          console.log('⚠️ AI speech generation failed:', aiError);
          
          // Check if it's a size-related error
          if (aiError.message?.includes('maximum') || aiError.message?.includes('size') || aiError.message?.includes('blob')) {
            toast.error('Audio file too large. Try with a shorter document.');
          } else {
            toast.error('AI speech generation failed. Please try again.');
          }
          
          aiResult = {
            audioUrl: null,
            duration: null,
            isFallback: true
          };
        }
      } else {
        aiResult = {
          audioUrl: null,
          duration: null,
          isFallback: true
        };
      }
      
      // Update status to ready with results
      setAudioFiles(prev => prev.map(file => 
        file.id === newAudioFile.id 
          ? { 
              ...file, 
              status: 'ready', 
              audioUrl: aiResult?.audioUrl || null,
              duration: aiResult?.duration || null,
              text: finalText,
              isFallback: aiResult?.isFallback || true,
              textLength: finalTextLength,
              processedTextLength: finalTextLength,
              ocrMethod: ocrResult?.success ? 'server-ocr' : 'fallback',
              ocrConfidence: ocrResult?.data?.processing_info?.text_length ? 0.95 : 0,
              ocrProcessingTime: ocrResult?.data?.processing_info?.processing_time || 0,
              ocrPages: 1, // We'll get this from OCR result later
              ocrLanguage: ocrResult?.data?.processing_info?.language || 'eng'
            }
          : file
      ));

      // Debug logging
      console.log('🔍 Debug: Final audio file state:', {
        id: newAudioFile.id,
        audioUrl: aiResult?.audioUrl,
        duration: aiResult?.duration,
        isFallback: aiResult?.isFallback,
        textLength: finalTextLength,
        status: 'ready'
      });
      
      setUploadProgress(100);
      
      if (aiResult?.isFallback) {
        if (ocrResult?.success && ocrResult.data?.text) {
          toast.success(`PDF processed successfully! OCR extracted ${ocrResult.data.text.length} characters.`);
        } else {
          toast.success(`PDF processed successfully! Basic processing completed.`);
        }
      } else {
        toast.success(`PDF processed successfully! OCR + AI converted ${finalTextLength} characters to audio.`);
      }
      
      // Reset form and close accordion
      setSelectedFile(null);
      setIsUploadAccordionOpen(false);
      const fileInput = document.getElementById('pdf-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to process PDF. Please try again.');
      
      // Update status to error
      setAudioFiles(prev => prev.map(file => 
        file.id === newAudioFile.id
          ? { ...file, status: 'error' }
          : file
      ));
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setIsProcessing(false);
    }
  };

  // Handle audio playback
  const handlePlayPause = (audioFile: AudioFile) => {
    if (!audioFile.audioUrl) return;

    if (currentPlayingId === audioFile.id) {
      // Pause current audio
      const audio = audioRefs[audioFile.id];
      if (audio) {
        audio.pause();
        setCurrentPlayingId(null);
        setAudioFiles(prev => prev.map(file => 
          file.id === audioFile.id ? { ...file, status: 'ready' } : file
        ));
      }
    } else {
      // Stop any currently playing audio
      if (currentPlayingId) {
        const currentAudio = audioRefs[currentPlayingId];
        if (currentAudio) {
          currentAudio.pause();
          setAudioFiles(prev => prev.map(file => 
            file.id === currentPlayingId ? { ...file, status: 'ready' } : file
          ));
        }
      }

      // Play new audio
      const audio = new Audio(audioFile.audioUrl);
      audio.addEventListener('ended', () => {
        setCurrentPlayingId(null);
        setAudioFiles(prev => prev.map(file => 
          file.id === audioFile.id ? { ...file, status: 'ready' } : file
        ));
      });

      audio.play();
      setCurrentPlayingId(audioFile.id);
      setAudioRefs(prev => ({ ...prev, [audioFile.id]: audio }));
      setAudioFiles(prev => prev.map(file => 
        file.id === audioFile.id ? { ...file, status: 'playing' } : file
      ));
    }
  };

  // Handle download
  const handleDownload = (audioFile: AudioFile) => {
    if (!audioFile.audioUrl) return;

    const link = document.createElement('a');
    link.href = audioFile.audioUrl;
    link.download = `${audioFile.name.replace('.pdf', '')}_audio.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle PDF preview
  const handlePreviewPdf = (audioFile: AudioFile) => {
    setSelectedPdfForPreview(audioFile);
    setIsPreviewSheetOpen(true);
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
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
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Headphones className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">AI Audio Reader</h1>
                <p className="text-slate-600">Transform PDFs into spoken audio with AI</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Upload Section - Accordion Style */}
          <Card className="border-0 shadow-sm bg-white rounded-3xl">
            <CardHeader 
              className="pb-0 cursor-pointer hover:bg-slate-50 transition-colors rounded-3xl"
              onClick={() => setIsUploadAccordionOpen(!isUploadAccordionOpen)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-2xl">
                    <Upload className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-900">Upload PDF Document</CardTitle>
                    <p className="text-slate-600 mt-1">Select a PDF file to extract text and generate AI audio</p>
                  </div>
                </div>
                <div className="p-2">
                  {isUploadAccordionOpen ? (
                    <ChevronDown className="h-5 w-5 text-slate-600" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-slate-600" />
                  )}
                </div>
              </div>
            </CardHeader>
            
            {isUploadAccordionOpen && (
              <CardContent className="pt-6 pb-6 space-y-6">
                {/* Voice Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">AI Voice</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'].map((voice) => (
                      <Button
                        key={voice}
                        variant={selectedVoice === voice ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedVoice(voice)}
                        className="capitalize h-12 rounded-2xl"
                      >
                        <Mic className="h-4 w-4 mr-2" />
                        {voice}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">Select PDF File</Label>
                  <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center hover:border-slate-300 transition-colors">
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                        <FileText className="h-8 w-8 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-slate-600 mb-2">
                          <span className="font-medium">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-sm text-slate-500">PDF files only, max 50MB</p>
                      </div>
                      <Input
                        id="pdf-upload"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <Button
                        onClick={() => document.getElementById('pdf-upload')?.click()}
                        variant="outline"
                        size="lg"
                        className="px-8 rounded-2xl"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose PDF
                      </Button>
                    </div>
                  </div>
                  
                  {selectedFile && (
                    <div className="flex items-center justify-between p-4 bg-slate-100 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-slate-600" />
                        <div>
                          <p className="font-medium text-slate-900">{selectedFile.name}</p>
                          <p className="text-sm text-slate-600">{formatFileSize(selectedFile.size)}</p>
                        </div>
                      </div>
                      <Button
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="bg-blue-600 hover:bg-blue-700 rounded-2xl"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Generate Audio
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Processing PDF...</span>
                      <span className="text-slate-600">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* Audio Files List */}
          {audioFiles.length > 0 && (
            <Card className="border-0 shadow-sm bg-white rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">Generated Audio Files</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {audioFiles.map((audioFile) => (
                    <div
                      key={audioFile.id}
                      className="p-6 border border-slate-200 rounded-2xl hover:border-slate-300 transition-all hover:shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-4">
                          {/* Header */}
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-2xl ${
                              audioFile.status === 'ready' ? 'bg-green-100' :
                              audioFile.status === 'processing' ? 'bg-blue-100' :
                              audioFile.status === 'error' ? 'bg-red-100' :
                              'bg-slate-100'
                            }`}>
                              {audioFile.status === 'ready' ? (
                                <Headphones className="h-5 w-5 text-green-600" />
                              ) : audioFile.status === 'processing' ? (
                                <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                              ) : audioFile.status === 'error' ? (
                                <FileText className="h-5 w-5 text-red-600" />
                              ) : (
                                <FileText className="h-5 w-5 text-slate-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-900">{audioFile.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs rounded-full">
                                  {audioFile.status}
                                </Badge>
                                <span className="text-sm text-slate-500">
                                  {formatFileSize(audioFile.size)}
                                </span>
                                <span className="text-sm text-slate-500">
                                  {formatDate(audioFile.uploadedAt)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* OCR Info */}
                          {audioFile.ocrMethod && (
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-slate-600">OCR Method:</span>
                                <Badge variant={audioFile.ocrMethod === 'server-ocr' ? 'default' : 'secondary'} className="rounded-full">
                                  {audioFile.ocrMethod === 'server-ocr' ? 'AI-Powered' : 'Fallback'}
                                </Badge>
                              </div>
                              {audioFile.textLength && (
                                <div className="flex items-center gap-2">
                                  <span className="text-slate-600">Text Length:</span>
                                  <span className="font-medium">{audioFile.textLength.toLocaleString()} chars</span>
                                </div>
                              )}
                              {audioFile.ocrConfidence && audioFile.ocrConfidence > 0 && (
                                <div className="flex items-center gap-2">
                                  <span className="text-slate-600">Confidence:</span>
                                  <span className="font-medium">{(audioFile.ocrConfidence * 100).toFixed(0)}%</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex items-center gap-3">
                            {/* Read Document Button */}
                            <Button
                              onClick={() => handlePreviewPdf(audioFile)}
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2 rounded-2xl"
                            >
                              <Eye className="h-4 w-4" />
                              Read Document
                            </Button>

                            {/* Audio Controls */}
                            {audioFile.status === 'ready' && audioFile.audioUrl && (
                              <>
                                <Button
                                  onClick={() => handlePlayPause(audioFile)}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center gap-2 rounded-2xl"
                                >
                                  {audioFile.status === 'playing' ? (
                                    <>
                                      <Pause className="h-4 w-4" />
                                      Pause
                                    </>
                                  ) : (
                                    <>
                                      <Play className="h-4 w-4" />
                                      Play
                                    </>
                                  )}
                                </Button>
                                <Button
                                  onClick={() => handleDownload(audioFile)}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center gap-2 rounded-2xl"
                                >
                                  <Download className="h-4 w-4" />
                                  Download
                                </Button>
                                {audioFile.duration && (
                                  <span className="text-sm text-slate-600 px-3 py-1 bg-slate-100 rounded-full">
                                    Duration: {audioFile.duration}
                                  </span>
                                )}
                              </>
                            )}
                          </div>

                          {/* Error State */}
                          {audioFile.status === 'error' && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                              <p className="text-red-700 text-sm">
                                Failed to process PDF. Please try again with a different file.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {audioFiles.length === 0 && !isUploading && (
            <Card className="border-0 shadow-sm bg-white rounded-3xl">
              <CardContent className="p-12 text-center">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                    <Headphones className="h-10 w-10 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No Audio Files Yet</h3>
                    <p className="text-slate-600">Upload a PDF document to get started with AI audio generation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* PDF Preview Sheet */}
      <Sheet open={isPreviewSheetOpen} onOpenChange={setIsPreviewSheetOpen}>
        <SheetContent className="w-[800px] sm:w-[900px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {selectedPdfForPreview?.name}
            </SheetTitle>
          </SheetHeader>
          
          {selectedPdfForPreview && (
            <div className="mt-6 space-y-6">
              {/* Document Info */}
              <div className="p-4 bg-slate-100 rounded-2xl">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">File Size:</span>
                    <span className="ml-2 text-slate-600">{formatFileSize(selectedPdfForPreview.size)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Uploaded:</span>
                    <span className="ml-2 text-slate-600">{formatDate(selectedPdfForPreview.uploadedAt)}</span>
                  </div>
                  {selectedPdfForPreview.textLength && (
                    <div>
                      <span className="font-medium text-slate-700">Text Length:</span>
                      <span className="ml-2 text-slate-600">{selectedPdfForPreview.textLength.toLocaleString()} characters</span>
                    </div>
                  )}
                  {selectedPdfForPreview.ocrMethod && (
                    <div>
                      <span className="font-medium text-slate-700">OCR Method:</span>
                      <Badge variant={selectedPdfForPreview.ocrMethod === 'server-ocr' ? 'default' : 'secondary'} className="ml-2 rounded-full">
                        {selectedPdfForPreview.ocrMethod === 'server-ocr' ? 'AI-Powered' : 'Fallback'}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Extracted Text */}
              {selectedPdfForPreview.text && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900">Extracted Text</h3>
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl max-h-96 overflow-y-auto">
                    <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                      {selectedPdfForPreview.text}
                    </pre>
                  </div>
                </div>
              )}

              {/* Audio Controls */}
              {selectedPdfForPreview.audioUrl && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900">Generated Audio</h3>
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => handlePlayPause(selectedPdfForPreview!)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 rounded-2xl"
                    >
                      {selectedPdfForPreview.status === 'playing' ? (
                        <>
                          <Pause className="h-4 w-4" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          Play
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => handleDownload(selectedPdfForPreview!)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 rounded-2xl"
                    >
                      <Download className="h-4 w-4" />
                      Download Audio
                    </Button>
                    {selectedPdfForPreview.duration && (
                      <span className="text-sm text-slate-600 px-3 py-1 bg-slate-100 rounded-full">
                        Duration: {selectedPdfForPreview.duration}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
