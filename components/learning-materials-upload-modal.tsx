"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { Upload, FileText, Image, Video, X, CheckCircle, AlertCircle } from "lucide-react";
import { useLearningMaterialsStore } from "@/lib/stores/learning-materials-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LearningMaterialsUploadModal({ isOpen, onClose }: UploadModalProps) {
  const { addMaterial } = useLearningMaterialsStore();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'text/plain', 'image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a valid file type (PDF, TXT, JPG, PNG, GIF, MP4, WEBM)");
      return;
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size must be less than 50MB");
      return;
    }

    setSelectedFile(file);
    setFormData(prev => ({
      ...prev,
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
    }));
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const getFileType = (file: File): 'pdf' | 'text' | 'image' | 'video' => {
    if (file.type === 'application/pdf') return 'pdf';
    if (file.type.startsWith('text/')) return 'text';
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    return 'text';
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
      case 'text':
        return <FileText className="h-8 w-8 text-blue-500" />;
      case 'image':
        return <Image className="h-8 w-8 text-green-500" />;
      case 'video':
        return <Video className="h-8 w-8 text-purple-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const simulateAIAnalysis = async (file: File) => {
    // Simulate AI analysis based on file type and size
    const fileType = getFileType(file);
    const fileSize = file.size;
    
    // Simulate processing time based on file size
    const processingTime = Math.min(Math.max(fileSize / (1024 * 1024) * 1000, 2000), 10000);
    
    // Generate mock AI analysis
    const mockAnalysis = {
      subject: fileType === 'pdf' ? 'Academic Content' : 
               fileType === 'image' ? 'Visual Learning Material' :
               fileType === 'video' ? 'Educational Video' : 'Text Document',
      complexity: fileSize > 10 * 1024 * 1024 ? 'advanced' : 
                  fileSize > 5 * 1024 * 1024 ? 'intermediate' : 'beginner',
      learningObjectives: [
        'Understand key concepts',
        'Apply knowledge in practice',
        'Analyze and synthesize information'
      ],
      keyTopics: ['Topic 1', 'Topic 2', 'Topic 3'],
      estimatedStudyTime: Math.max(Math.round(fileSize / (1024 * 1024) * 5), 15), // 5 minutes per MB, min 15 min
      recommendedPedagogy: 'mixed' as const,
      difficultyLevel: fileSize > 10 * 1024 * 1024 ? 8 : 
                      fileSize > 5 * 1024 * 1024 ? 5 : 3,
      summary: `This ${fileType} document contains educational content suitable for ${fileSize > 10 * 1024 * 1024 ? 'advanced' : fileSize > 5 * 1024 * 1024 ? 'intermediate' : 'beginner'} learners. The content appears to cover multiple topics and would benefit from a mixed learning approach.`,
      memoryUsage: Math.round(fileSize / (1024 * 1024) * 0.1), // 0.1 MB per MB of file
    };

    return new Promise(resolve => {
      setTimeout(() => resolve(mockAnalysis), processingTime);
    });
  };

  const handleUpload = async () => {
    if (!selectedFile || !formData.title.trim()) {
      toast.error("Please select a file and enter a title");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

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

      // Simulate AI analysis
      const aiAnalysis = await simulateAIAnalysis(selectedFile);
      
      // Complete upload
      setUploadProgress(100);
      
      // Add material to store
      addMaterial({
        title: formData.title,
        description: formData.description,
        fileType: getFileType(selectedFile),
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        status: 'analyzed',
        aiAnalysis: aiAnalysis as any,
      });

      toast.success("Material uploaded and analyzed successfully!");
      
      // Reset form
      setSelectedFile(null);
      setFormData({ title: "", description: "" });
      setUploadProgress(0);
      onClose();
      
    } catch (error) {
      toast.error("Failed to upload material");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    if (!isUploading) {
      setSelectedFile(null);
      setFormData({ title: "", description: "" });
      setUploadProgress(0);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl rounded-xl overflow-hidden">
        <DialogHeader className="rounded-t-xl">
          <DialogTitle>Upload Learning Material</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Upload Area */}
          {!selectedFile ? (
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive 
                  ? "border-blue-500 bg-blue-50" 
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Drop your file here, or click to browse
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Supports PDF, TXT, JPG, PNG, GIF, MP4, WEBM (max 50MB)
              </p>
              <Input
                type="file"
                accept=".pdf,.txt,.jpg,.jpeg,.png,.gif,.mp4,.webm"
                onChange={handleFileInputChange}
                className="hidden"
                id="file-upload"
              />
              <Button asChild className="rounded-xl">
                <label htmlFor="file-upload" className="cursor-pointer">
                  Choose File
                </label>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Selected File Preview */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                {getFileIcon(getFileType(selectedFile))}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                  disabled={isUploading}
                  className="rounded-xl"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Uploading and analyzing...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {/* Form Fields */}
              {!isUploading && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter a title for this material"
                      className="rounded-xl"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe what this material is about..."
                      rows={3}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="rounded-b-xl">
          <Button variant="outline" onClick={handleClose} disabled={isUploading} className="rounded-xl">
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || !formData.title.trim() || isUploading}
            className="flex items-center space-x-2 rounded-xl"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                <span>Upload & Analyze</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
