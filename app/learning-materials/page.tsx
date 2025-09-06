"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Settings, 
  BarChart3,
  Brain,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Trash2,
  Edit,
  Eye,
  Download,
  Home,
  CreditCard,
  HelpCircle
} from "lucide-react";
import { useLearningMaterialsStore } from "@/lib/stores/learning-materials-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  FloatingPanelBody,
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelRoot,
  FloatingPanelTrigger,
} from "@/components/ui/floating-panel";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { LearningMaterialsUploadModal } from "@/components/learning-materials-upload-modal";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

// Video background options
const videoBackgrounds = [
  {
    id: "nature",
    title: "Green Rolling Hills",
    src: "/hero-video/green-rolling-hills-in-nature.mp4",
    thumbnail: "/thumbnails/green-rolling-hills-in-nature.jpg",
    category: "Nature"
  },
  {
    id: "sunrise",
    title: "Sunrise Over the Clouds",
    src: "/hero-video/FILMPAC_sunrise-over-the-clouds_FFAAJ4941_HM.mp4",
    thumbnail: "/thumbnails/filmpacsunrise-over-the-cloudsffaaj4941hm.jpg",
    category: "Sky"
  },
  {
    id: "waterfall",
    title: "Waterfall in Green Mountains",
    src: "/hero-video/FILMPAC_waterfall-in-middle-of-green-mountains_FFAAS1368_HM.mp4",
    thumbnail: "/thumbnails/filmpacwaterfall-in-middle-of-green-mountainsffaas1368hm.jpg",
    category: "Mountains"
  },
  {
    id: "audio",
    title: "Audio Focus",
    src: "/audio.png",
    thumbnail: "/audio.png",
    category: "Audio"
  }
];

export default function LearningMaterialsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTab, setSelectedTab] = React.useState("documents");
  const [showUploadModal, setShowUploadModal] = React.useState(false);
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [isVideoMode, setIsVideoMode] = React.useState(false);
  const [selectedVideoBackground, setSelectedVideoBackground] = React.useState(videoBackgrounds[3]); // Default to audio image
  const [previewVideo, setPreviewVideo] = React.useState<string | null>(null);
  
  const {
    materials,
    modelConfigurations,
    userProfile,
    selectedMaterial,
    selectedModel,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    setSelectedMaterial,
    addModelConfiguration,
    updateModelConfiguration,
    deleteModelConfiguration,
    setSelectedModel,
    setActiveModel,
    updateUserProfile,
    getTotalMemoryUsage,
    getMaterialsBySubject,
    getActiveModel,
    getMemoryUsageByModel,
  } = useLearningMaterialsStore();

  // Filter materials based on search query
  const filteredMaterials = materials.filter((material) =>
    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.aiAnalysis?.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get memory usage statistics
  const totalMemoryUsage = getTotalMemoryUsage();
  const memoryUsageByModel = getMemoryUsageByModel();
  const activeModel = getActiveModel();

  // Handle hydration and localStorage loading
  React.useEffect(() => {
    setIsHydrated(true);
    
    // Load saved background settings from localStorage
    const savedVideoMode = localStorage.getItem('learning-materials-video-mode');
    if (savedVideoMode) {
      setIsVideoMode(savedVideoMode === 'true');
    }
    
    const savedVideoBackground = localStorage.getItem('learning-materials-video-background');
    if (savedVideoBackground) {
      try {
        const parsed = JSON.parse(savedVideoBackground);
        setSelectedVideoBackground(parsed);
      } catch (error) {
        console.error('Failed to parse saved video background:', error);
      }
    }
  }, []);

  // Save background settings to localStorage when they change
  React.useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('learning-materials-video-mode', isVideoMode.toString());
      // Show toast confirmation for video mode change (only after hydration)
      toast.success(`${isVideoMode ? 'Video' : 'Image'} mode saved!`, {
        description: `Learning Materials page background mode switched to ${isVideoMode ? 'video' : 'image'}.`
      });
    }
  }, [isVideoMode, isHydrated]);

  React.useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('learning-materials-video-background', JSON.stringify(selectedVideoBackground));
      // Show toast confirmation for video background change (only after hydration)
      toast.success(`${selectedVideoBackground.title} saved!`, {
        description: "Your learning materials video background preference has been updated."
      });
    }
  }, [selectedVideoBackground, isHydrated]);

  const handleDeleteMaterial = (id: string) => {
    deleteMaterial(id);
    toast.success("Material deleted successfully");
  };

  const handleSetActiveModel = (id: string) => {
    setActiveModel(id);
    toast.success("Model configuration activated");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
      case 'text':
        return <FileText className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'analyzed':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      {/* Header - 30% of page */}
      <div className="h-[30vh] relative overflow-hidden">
        {/* Background Image/Video */}
        {isHydrated && isVideoMode ? (
          <video
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            className="w-full h-full object-cover"
            src={selectedVideoBackground.src}
          />
        ) : (
          <Image
            src="https://images.unsplash.com/photo-1641652520432-6f8039fc4786?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="AI Agent Studio background"
            fill
            className="object-cover"
            priority
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Top Navigation */}
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-4">
          {/* Pill-shaped Navigation Menu */}
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-3">
            <button className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors">
              <Home className="h-4 w-4" />
              <span className="text-sm font-medium">Home</span>
            </button>
            <div className="w-px h-4 bg-white/30"></div>
            <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
              <Settings className="h-4 w-4" />
              <span className="text-sm font-medium">Settings</span>
            </button>
            <div className="w-px h-4 bg-white/30"></div>
            <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
              <CreditCard className="h-4 w-4" />
              <span className="text-sm font-medium">Plan</span>
            </button>
            <div className="w-px h-4 bg-white/30"></div>
            <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
              <HelpCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Help</span>
            </button>
          </div>
          
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="User avatar"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        
        {/* Header Content */}
        <div className="absolute inset-0 flex items-center justify-between">
          <div className="text-left text-white ml-16 max-w-4xl" style={{marginLeft: '15%'}}>
            {/* Back Button */}
            <div className="mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/dashboard')}
                className="flex items-center space-x-2 bg-white text-gray-900 hover:bg-gray-100 border-white rounded-xl"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-medium mb-2">
              AI Agent Studio
            </h1>
            <p className="text-sm md:text-base opacity-90 max-w-xl mb-3">
              Connect your data, create AI agents, equip them with tools, test performance, measure results, and share insights.
            </p>
            
            {/* Video Background Selector - Bottom Left */}
            {isVideoMode && (
              <FloatingPanelRoot>
                <FloatingPanelTrigger
                  title="Select Video Background"
                  className="flex items-center justify-center px-3 py-2 bg-black text-white hover:bg-gray-800 transition-colors rounded-lg"
                >
                  <span className="text-sm font-medium">Change Background</span>
                </FloatingPanelTrigger>
                <FloatingPanelContent className="w-96">
                  <FloatingPanelBody>
                    <div className="grid grid-cols-2 gap-3">
                      {videoBackgrounds.map((video) => (
                        <div
                          key={video.id}
                          className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                            selectedVideoBackground.id === video.id
                              ? 'border-blue-500 ring-2 ring-blue-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setPreviewVideo(video.src)}
                        >
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-28 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <div className="bg-white/90 rounded-full p-2">
                              <Video className="h-4 w-4 text-gray-700" />
                            </div>
                          </div>
                          <div className="p-2 bg-white">
                            <p className="text-xs font-medium text-gray-900">{video.title}</p>
                            <p className="text-xs text-gray-500">{video.category}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Preview Section */}
                    {previewVideo && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                        <p className="text-sm font-medium text-gray-700 mb-3">Preview:</p>
                        <video
                          src={previewVideo}
                          className="w-full h-40 object-cover rounded-xl"
                          autoPlay
                          muted
                          loop
                        />
                      </div>
                    )}
                  </FloatingPanelBody>
                  <FloatingPanelFooter>
                    <FloatingPanelCloseButton />
                    <button
                      onClick={() => {
                        if (previewVideo) {
                          const selected = videoBackgrounds.find(v => v.src === previewVideo);
                          if (selected) {
                            setSelectedVideoBackground(selected);
                            setPreviewVideo(null);
                          }
                        }
                      }}
                      className={`px-4 py-2 rounded-xl transition-colors ${
                        previewVideo
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!previewVideo}
                    >
                      Confirm Selection
                    </button>
                  </FloatingPanelFooter>
                </FloatingPanelContent>
              </FloatingPanelRoot>
            )}
          </div>
          
          {/* Toggle Switch */}
          <div className="mr-16 flex items-center space-x-3">
            <span className="text-white text-sm font-medium">Image</span>
            <button
              onClick={() => setIsVideoMode(!isVideoMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
                isVideoMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isVideoMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-white text-sm font-medium">Video</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
            <TabsTrigger value="documents" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:rounded-lg">Documents</TabsTrigger>
            <TabsTrigger value="models" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:rounded-lg">Model Configs</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:rounded-lg">Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:rounded-lg">Settings</TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search materials..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
                <Button variant="outline" size="sm" className="rounded-xl">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <Button 
                onClick={() => setShowUploadModal(true)}
                className="rounded-xl"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-800">Total Materials</CardTitle>
                  <FileText className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900">
                    {isHydrated ? materials.length : '...'}
                  </div>
                  <p className="text-xs text-blue-700">
                    {isHydrated ? `${materials.filter(m => m.status === 'analyzed').length} analyzed` : 'Loading...'}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-800">Memory Usage</CardTitle>
                  <Brain className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-900">
                    {isHydrated ? formatFileSize(totalMemoryUsage) : 'Loading...'}
                  </div>
                  <p className="text-xs text-purple-700">
                    {isHydrated ? `Across ${materials.length} materials` : 'Loading...'}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-800">Active Model</CardTitle>
                  <Settings className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-900">
                    {isHydrated ? (activeModel?.name || 'None') : 'Loading...'}
                  </div>
                  <p className="text-xs text-green-700">
                    {isHydrated ? (activeModel?.size || 'No model selected') : 'Loading...'}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-800">Learning Style</CardTitle>
                  <BarChart3 className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-900 capitalize">
                    {isHydrated ? (userProfile.preferredLearningStyles?.join(', ') || 'Not set') : 'Loading...'}
                  </div>
                  <p className="text-xs text-orange-700">
                    {isHydrated ? `${userProfile.difficultyPreference} level` : 'Loading...'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Materials Table */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>Learning Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Complexity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Memory</TableHead>
                      <TableHead>Uploaded</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            {getFileIcon(material.fileType)}
                            <span>{material.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{material.fileType.toUpperCase()}</Badge>
                        </TableCell>
                        <TableCell>
                          {material.aiAnalysis?.subject || 'Not analyzed'}
                        </TableCell>
                        <TableCell>
                          {material.aiAnalysis?.complexity ? (
                            <Badge className={getComplexityColor(material.aiAnalysis.complexity)}>
                              {material.aiAnalysis.complexity}
                            </Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(material.status)}>
                            {material.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {material.aiAnalysis?.memoryUsage ? 
                            formatFileSize(material.aiAnalysis.memoryUsage * 1024 * 1024) : 
                            '-'
                          }
                        </TableCell>
                        <TableCell>
                          {formatDate(material.uploadedAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteMaterial(material.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Model Configurations Tab */}
          <TabsContent value="models" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Model Configurations</h2>
              <Button onClick={() => router.push('/learning-materials/models/new')} className="rounded-xl">
                <Plus className="h-4 w-4 mr-2" />
                New Model
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modelConfigurations.map((config) => (
                <Card key={config.id} className={`rounded-xl ${config.isActive ? 'ring-2 ring-blue-500' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{config.name}</CardTitle>
                      {config.isActive && (
                        <Badge className="bg-green-100 text-green-800 rounded-full">Active</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Type</p>
                        <p className="font-medium">{config.modelType}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Size</p>
                        <p className="font-medium capitalize">{config.size}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Max Tokens</p>
                        <p className="font-medium">{config.maxTokens.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Memory Limit</p>
                        <p className="font-medium">{config.memoryLimit} MB</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {!config.isActive && (
                        <Button 
                          size="sm" 
                          onClick={() => handleSetActiveModel(config.id)}
                          className="flex-1 rounded-xl"
                        >
                          Activate
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 rounded-xl"
                        onClick={() => router.push(`/learning-materials/models/edit/${config.id}`)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl font-semibold">Learning Analytics Dashboard</h2>
            
            {/* Learning Curve & Progress Over Time */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Learning Curve Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={[
                      { week: 'Week 1', progress: 20, retention: 15 },
                      { week: 'Week 2', progress: 35, retention: 28 },
                      { week: 'Week 3', progress: 50, retention: 42 },
                      { week: 'Week 4', progress: 65, retention: 55 },
                      { week: 'Week 5', progress: 78, retention: 68 },
                      { week: 'Week 6', progress: 85, retention: 75 },
                      { week: 'Week 7', progress: 92, retention: 82 },
                      { week: 'Week 8', progress: 95, retention: 88 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={3} name="Learning Progress" />
                      <Line type="monotone" dataKey="retention" stroke="#10b981" strokeWidth={3} name="Knowledge Retention" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span>Knowledge Retention Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={[
                      { topic: 'Math', retention: 85, difficulty: 3 },
                      { topic: 'Science', retention: 78, difficulty: 4 },
                      { topic: 'History', retention: 92, difficulty: 2 },
                      { topic: 'Language', retention: 88, difficulty: 3 },
                      { topic: 'Art', retention: 95, difficulty: 1 },
                      { topic: 'Technology', retention: 72, difficulty: 5 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="topic" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="retention" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Quiz Performance & Difficulty Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Quiz Performance & Failures</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart 
                      data={[
                        { subject: 'Algebra', correct: 85, incorrect: 15, attempts: 12 },
                        { subject: 'Geometry', correct: 72, incorrect: 28, attempts: 15 },
                        { subject: 'Calculus', correct: 68, incorrect: 32, attempts: 18 },
                        { subject: 'Statistics', correct: 78, incorrect: 22, attempts: 10 },
                        { subject: 'Trigonometry', correct: 65, incorrect: 35, attempts: 20 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Bar 
                        dataKey="correct" 
                        fill="#10b981" 
                        name="Correct Answers"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="incorrect" 
                        fill="#ef4444" 
                        name="Incorrect Answers"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Difficulty Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Easy', value: 25, color: '#10b981' },
                          { name: 'Medium', value: 45, color: '#f59e0b' },
                          { name: 'Hard', value: 30, color: '#ef4444' }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          { name: 'Easy', value: 25, color: '#10b981' },
                          { name: 'Medium', value: 45, color: '#f59e0b' },
                          { name: 'Hard', value: 30, color: '#ef4444' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* TWA-25 AI Sentiment Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span>TWA-25 AI Voice Sentiment Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={[
                      { subject: 'Confidence', A: 85, B: 90, fullMark: 100 },
                      { subject: 'Clarity', A: 78, B: 85, fullMark: 100 },
                      { subject: 'Engagement', A: 92, B: 88, fullMark: 100 },
                      { subject: 'Patience', A: 88, B: 95, fullMark: 100 },
                      { subject: 'Encouragement', A: 90, B: 92, fullMark: 100 },
                      { subject: 'Understanding', A: 82, B: 87, fullMark: 100 }
                    ]}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Current Session" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                      <Radar name="Previous Session" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>AI Interaction Patterns</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart 
                      data={[
                        { time: 'Morning', interactions: 12, sentiment: 85 },
                        { time: 'Afternoon', interactions: 18, sentiment: 78 },
                        { time: 'Evening', interactions: 8, sentiment: 92 },
                        { time: 'Night', interactions: 5, sentiment: 88 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar 
                        yAxisId="left" 
                        dataKey="interactions" 
                        fill="#8b5cf6" 
                        name="Interactions"
                        radius={[4, 4, 0, 0]}
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="sentiment" 
                        stroke="#f59e0b" 
                        strokeWidth={3} 
                        name="Sentiment Score" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Memory Usage & Model Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Memory Usage by Model</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(memoryUsageByModel).map(([modelId, usage]) => (
                      <div key={modelId} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Model {modelId}</span>
                          <span>{formatFileSize(usage * 1024 * 1024)}</span>
                        </div>
                        <Progress value={(usage / totalMemoryUsage) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span>Learning Style Effectiveness</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Visual Learning</span>
                        <span>88%</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Auditory Learning</span>
                        <span>82%</span>
                      </div>
                      <Progress value={82} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Kinesthetic Learning</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-xl font-semibold">Learning Preferences</h2>
            
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Preferred Learning Styles</label>
                    <div className="space-y-3 p-3 border border-gray-300 rounded-xl">
                      {[
                        { value: 'visual', label: 'Visual', description: 'Learn through images, diagrams, and visual aids' },
                        { value: 'auditory', label: 'Auditory', description: 'Learn through listening, discussions, and audio' },
                        { value: 'kinesthetic', label: 'Kinesthetic', description: 'Learn through hands-on activities and movement' }
                      ].map((style) => (
                        <div key={style.value} className="flex items-start space-x-3">
                          <Checkbox
                            id={style.value}
                            checked={userProfile.preferredLearningStyles?.includes(style.value as any) || false}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateUserProfile({ 
                                  preferredLearningStyles: [...(userProfile.preferredLearningStyles || []), style.value as any]
                                });
                              } else {
                                updateUserProfile({ 
                                  preferredLearningStyles: (userProfile.preferredLearningStyles || []).filter(s => s !== style.value)
                                });
                              }
                            }}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <label htmlFor={style.value} className="text-sm font-medium cursor-pointer">
                              {style.label}
                            </label>
                            <p className="text-xs text-gray-500">{style.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Difficulty Preference</label>
                    <select 
                      value={userProfile.difficultyPreference}
                      onChange={(e) => updateUserProfile({ difficultyPreference: e.target.value as any })}
                      className="w-full p-2 border border-gray-300 rounded-xl"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Study Time Preference</label>
                    <select 
                      value={userProfile.studyTimePreference}
                      onChange={(e) => updateUserProfile({ studyTimePreference: e.target.value as any })}
                      className="w-full p-2 border border-gray-300 rounded-xl"
                    >
                      <option value="short">Short (15 min)</option>
                      <option value="medium">Medium (45 min)</option>
                      <option value="long">Long (90 min)</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Subjects</label>
                    <Input 
                      placeholder="Enter subjects separated by commas"
                      value={userProfile.currentSubjects.join(', ')}
                      onChange={(e) => updateUserProfile({ 
                        currentSubjects: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      })}
                      className="rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Learning Goals</label>
                  <textarea 
                    placeholder="Describe your learning goals..."
                    value={userProfile.learningGoals.join(', ')}
                    onChange={(e) => updateUserProfile({ 
                      learningGoals: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    })}
                    className="w-full p-2 border border-gray-300 rounded-xl h-20 resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Modal */}
      <LearningMaterialsUploadModal 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)} 
      />
    </div>
  );
}
