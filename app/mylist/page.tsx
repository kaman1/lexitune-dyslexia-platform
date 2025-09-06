"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  Tag, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Circle,

  Brain,
  Zap,
  ArrowLeft,
  ChevronDown
} from "lucide-react"

import { useTodoStore, type TodoItem, type TodoList } from "@/lib/stores/todo-store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"


import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

export default function MyListPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false);
  const headerBackgrounds = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&h=900&fit=crop", 
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe48?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1600&h=900&fit=crop"
  ];


  const [isAddListOpen, setIsAddListOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);
  const [editingList, setEditingList] = useState<TodoList | null>(null);
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
      id: "sunset-clouds",
      title: "Drone View of Clouds at Sunset",
      src: "/hero-video/FILMPAC_drone-view-of-clouds-in-sky-at-sunset_FFAAX5624_HM.mp4",
      thumbnail: "/thumbnails/filmpacdrone-view-of-clouds-in-sky-at-sunsetffaax5624hm.jpg",
      category: "Sky"
    },
    {
      id: "foggy-forest",
      title: "Aerial View of Foggy Forest",
      src: "/hero-video/FILMPAC_aerial-view-of-a-dense-forest-filled-with-fog_FFAAJ5958_HM.mp4",
      thumbnail: "/thumbnails/filmpacforest-filled-with-fogffaaj5958hm.jpg",
      category: "Forest"
    },
    {
      id: "oregon-river",
      title: "Aerial View of Oregon River Woods",
      src: "/hero-video/FILMPAC_aerial-view-of-a-river-amidst-central-oregon-woods_FFAAP6567_HM.mp4",
      thumbnail: "/thumbnails/filmpacaerial-view-of-a-river-amidst-central-oregon-woodsffaap6567hm.jpg",
      category: "Nature"
    }
  ];

  const [headerBackground, setHeaderBackground] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mylist-header-background');
      return saved || headerBackgrounds[0];
    }
    return headerBackgrounds[0];
  });
  
  const [isVideoMode, setIsVideoMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mylist-video-mode');
      return saved === 'true';
    }
    return false;
  });
  
  const [selectedVideoBackground, setSelectedVideoBackground] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mylist-video-background');
      const parsed = saved ? JSON.parse(saved) : null;
      return parsed || videoBackgrounds[0];
    }
    return videoBackgrounds[0];
  });
  
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Save background settings to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mylist-header-background', headerBackground);
      // Show toast confirmation for image background change
      const backgroundName = headerBackgrounds.findIndex(bg => bg === headerBackground) + 1;
      toast.success(`Background ${backgroundName} saved!`, {
        description: "Your image background preference has been updated."
      });
    }
  }, [headerBackground]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mylist-video-mode', isVideoMode.toString());
      // Show toast confirmation for video mode change
      toast.success(`${isVideoMode ? 'Video' : 'Image'} mode saved!`, {
        description: `Background mode switched to ${isVideoMode ? 'video' : 'image'}.`
      });
    }
  }, [isVideoMode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mylist-video-background', JSON.stringify(selectedVideoBackground));
      // Show toast confirmation for video background change
      toast.success(`${selectedVideoBackground.title} saved!`, {
        description: "Your video background preference has been updated."
      });
    }
  }, [selectedVideoBackground]);

  
  const {
    lists,
    activeListId,
    setActiveList,
    createList,
    updateList,
    deleteList,
    addTodo,
    updateTodo,
    deleteTodo,
  
  } = useTodoStore();

  const [newTodo, setNewTodo] = useState({
    text: "",
    description: "",
    category: "work" as TodoItem["category"],
    priority: "medium" as TodoItem["priority"],
    estimatedTime: 25,
    dueDate: "",
    tags: [] as string[],
    energyLevel: "medium" as TodoItem["energyLevel"],
    complexity: "moderate" as TodoItem["complexity"],
    showDatePicker: false,
  });

  const [newList, setNewList] = useState({
    name: "",
    category: "work" as TodoList["category"],
  });

  const handleAddTodo = () => {
    if (!newTodo.text.trim()) return;

    addTodo(activeListId || lists[0]?.id || "", {
      ...newTodo,
      status: "pending",
      tags: newTodo.tags.filter(tag => tag.trim()),
    });

    setNewTodo({
      text: "",
      description: "",
      category: "work",
      priority: "medium",
      estimatedTime: 25,
      dueDate: "",
      tags: [],
      energyLevel: "medium",
      complexity: "moderate",
      showDatePicker: false,
    });
    setIsAddTodoOpen(false);
  };



  const handleAddList = () => {
    if (!newList.name.trim()) return;

    createList(newList.name, newList.category);
    setNewList({ name: "", category: "work" });
    setIsAddListOpen(false);
  };

  const handleEditTodo = () => {
    if (!editingTodo || !activeListId) return;

    updateTodo(activeListId, editingTodo.id, editingTodo);
    setEditingTodo(null);
  };

  const handleEditList = () => {
    if (!editingList) return;

    updateList(editingList.id, editingList);
    setEditingList(null);
  };

  const handleDeleteTodo = (todoId: string) => {
    if (!activeListId) return;
    deleteTodo(activeListId, todoId);
  };

  const handleDeleteList = (listId: string) => {
    deleteList(listId);
  };

  const toggleTodoStatus = (todoId: string) => {
    if (!activeListId) return;
    const todo = lists.find(list => list.id === activeListId)?.items.find(item => item.id === todoId);
    if (!todo) return;

    updateTodo(activeListId, todoId, {
      status: todo.status === "completed" ? "pending" : "completed"
    });
  };

  const getPriorityColor = (priority: TodoItem["priority"]) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: TodoItem["status"]) => {
    return status === "completed" ? (
      <CheckCircle2 className="w-5 h-5 text-green-600" />
    ) : (
      <Circle className="w-5 h-5 text-gray-400" />
    );
  };



  const activeList = lists.find(list => list.id === activeListId) || lists[0];
  
  // Filter lists by active tab
  const filteredLists = activeTab === "all" ? lists : lists.filter(list => list.category === activeTab);

  const goBackToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      {/* Hero Header with Background Image/Video */}
      <div className="relative h-[25vh] overflow-hidden">
        {/* Background Image or Video */}
        {isVideoMode ? (
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover absolute inset-0 z-0"
            src={selectedVideoBackground.src}
          />
        ) : (
          <div 
            className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 transition-all duration-500"
            style={{ 
              backgroundImage: headerBackground.startsWith('http') || headerBackground.startsWith('/')
                ? `url(${headerBackground})` 
                : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 h-full flex flex-col justify-center px-8">
          <div className="max-w-7xl mx-auto w-full">
            {/* Back Button */}
            <div className="mb-6">
              <button
                onClick={goBackToDashboard}
                className="inline-flex items-center justify-center px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 hover:scale-105 transition-all duration-300 rounded-xl shadow-sm"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Back to Dashboard
              </button>
            </div>
            
            {/* Header Content - Left Aligned */}
            <div className="text-left max-w-4xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                My Lists
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 leading-relaxed">
                Organize and track your daily tasks with intelligent categorization, priority setting, and AI-powered optimization to help organize your learning goals and daily activities.
              </p>
              
              <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
                <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full border border-white/30 text-white">
                  Smart Lists
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full border border-white/30 text-white">
                  AI Optimization
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full border border-white/30 text-white">
                  Pomodoro Integration
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Controls Section */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-8">
          {/* Accordion Header */}
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="flex items-center justify-between w-full p-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700">Background Settings</span>
            <ChevronDown 
              className={`h-4 w-4 text-gray-500 transition-transform ${
                isAccordionOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {/* Accordion Content */}
          {isAccordionOpen && (
            <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Toggle Switch */}
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700 text-sm font-medium">Image Background</span>
                  <button
                    onClick={() => setIsVideoMode(!isVideoMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isVideoMode ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isVideoMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-gray-700 text-sm font-medium">Video Background</span>
                </div>
                
                {/* Image Background Selector */}
                {!isVideoMode && (
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-700 text-sm font-medium">Image:</span>
                    <Select value={headerBackground} onValueChange={setHeaderBackground}>
                      <SelectTrigger className="w-auto min-w-64 rounded-full">
                        <SelectValue placeholder="Select image background" />
                      </SelectTrigger>
                      <SelectContent>
                        {headerBackgrounds.map((bg, index) => (
                          <SelectItem key={bg} value={bg}>
                            <div className="flex items-center space-x-3">
                              <img
                                src={bg}
                                alt={`Background ${index + 1}`}
                                className="w-8 h-8 rounded object-cover"
                              />
                              <div className="text-left">
                                <div className="font-medium">Background {index + 1}</div>
                                <div className="text-xs text-gray-500">Unsplash Image</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {/* Video Background Selector */}
                {isVideoMode && (
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-700 text-sm font-medium">Video:</span>
                    <Select value={selectedVideoBackground.id} onValueChange={(value) => {
                      const selected = videoBackgrounds.find(v => v.id === value);
                      if (selected) setSelectedVideoBackground(selected);
                    }}>
                      <SelectTrigger className="w-auto min-w-64 rounded-full">
                        <SelectValue placeholder="Select video background" />
                      </SelectTrigger>
                      <SelectContent>
                        {videoBackgrounds.map((video) => (
                          <SelectItem key={video.id} value={video.id}>
                            <div className="flex items-center space-x-3">
                              <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-8 h-8 rounded object-cover"
                              />
                              <div className="text-left">
                                <div className="font-medium">{video.title}</div>
                                <div className="text-xs text-gray-500">{video.category}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>




      

      
      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-6xl">

        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8 mb-6">
          <TabsList className="grid w-full grid-cols-6 rounded-full">
            <TabsTrigger value="all" className="rounded-full">All Lists</TabsTrigger>
            <TabsTrigger value="work" className="rounded-full">Work</TabsTrigger>
            <TabsTrigger value="personal" className="rounded-full">Personal</TabsTrigger>
            <TabsTrigger value="learning" className="rounded-full">Learning</TabsTrigger>
            <TabsTrigger value="health" className="rounded-full">Health</TabsTrigger>
            <TabsTrigger value="creative" className="rounded-full">Creative</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lists Sidebar */}
          <div className="lg:col-span-1">
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span>Categories</span>
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddTodoOpen(true)}
                    className="rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New List
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredLists.map((list) => (
                    <div
                      key={list.id}
                      className={`p-3 rounded-xl border cursor-pointer transition-colors ${
                        activeListId === list.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border hover:bg-accent/50"
                      }`}
                      onClick={() => setActiveList(list.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{list.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {list.items.length} items
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs rounded-full">
                            {list.category}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteList(list.id);
                            }}
                            className="rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active List Content */}
          <div className="lg:col-span-2">
            {activeList ? (
              <Card className="rounded-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="w-5 h-5" />
                      <span>{activeList.name}</span>
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAddTodoOpen(true)}
                        className="rounded-xl"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Todo
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingList(activeList)}
                        className="rounded-xl"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activeList.items.length} items • {activeList.items.filter(item => item.status === "completed").length} completed
                  </p>
                </CardHeader>
                <CardContent>
                  {activeList.items.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No todos yet. Add your first task to get started!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {activeList.items.map((todo) => (
                        <div
                          key={todo.id}
                          className="flex items-center space-x-3 p-3 border rounded-xl hover:bg-accent/50 transition-colors"
                        >
                          <button
                            onClick={() => toggleTodoStatus(todo.id)}
                            className="flex-shrink-0"
                          >
                            {getStatusIcon(todo.status)}
                          </button>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className={`font-medium text-sm ${
                                todo.status === "completed" ? "line-through text-muted-foreground" : ""
                              }`}>
                                {todo.text}
                              </h4>
                              <Badge className={`text-xs ${getPriorityColor(todo.priority)} rounded-full`}>
                                {todo.priority}
                              </Badge>
                            </div>
                            
                            {todo.description && (
                              <p className="text-xs text-muted-foreground mb-1">
                                {todo.description}
                              </p>
                            )}
                            
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{todo.estimatedTime}m</span>
                              </div>
                              {todo.dueDate && (
                                <div className="flex items-center space-x-1">
                                  <CalendarIcon className="w-3 h-3" />
                                  <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
                                </div>
                              )}
                              <div className="flex items-center space-x-1">
                                <Tag className="w-3 h-3" />
                                <span>{todo.complexity}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingTodo(todo)}
                              className="rounded-xl"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteTodo(todo.id)}
                              className="rounded-xl"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="rounded-2xl">
                <CardContent className="text-center py-8 text-muted-foreground">
                  <p>Select a list to view its todos</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Edit Todo Dialog */}
        <Dialog open={!!editingTodo} onOpenChange={() => setEditingTodo(null)}>
          <DialogContent className="max-w-2xl rounded-2xl">
            <DialogHeader>
              <DialogTitle>Edit Todo</DialogTitle>
            </DialogHeader>
            {editingTodo && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-todo-text">Task</Label>
                  <Input
                    id="edit-todo-text"
                    value={editingTodo.text}
                    onChange={(e) => setEditingTodo({ ...editingTodo, text: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-todo-description">Description</Label>
                  <Textarea
                    id="edit-todo-description"
                    value={editingTodo.description || ""}
                    onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                    rows={3}
                    className="rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-todo-priority">Priority</Label>
                    <Select value={editingTodo.priority} onValueChange={(value: TodoItem["priority"]) => setEditingTodo({ ...editingTodo, priority: value })}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-todo-status">Status</Label>
                    <Select value={editingTodo.status} onValueChange={(value: TodoItem["status"]) => setEditingTodo({ ...editingTodo, status: value })}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleEditTodo} className="flex-1 rounded-xl">Save Changes</Button>
                  <Button variant="outline" onClick={() => setEditingTodo(null)} className="rounded-xl">Cancel</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit List Dialog */}
        <Dialog open={!!editingList} onOpenChange={() => setEditingList(null)}>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>Edit List</DialogTitle>
            </DialogHeader>
            {editingList && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-list-name">List Name</Label>
                  <Input
                    id="edit-list-name"
                    value={editingList.name}
                    onChange={(e) => setEditingList({ ...editingList, name: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-list-category">Category</Label>
                  <Select value={editingList.category} onValueChange={(value: TodoList["category"]) => setEditingList({ ...editingList, category: value })}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="learning">Learning</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleEditList} className="flex-1 rounded-xl">Save Changes</Button>
                  <Button variant="outline" onClick={() => setEditingList(null)} className="rounded-xl">Cancel</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Todo Sheet */}
        <Sheet open={isAddTodoOpen} onOpenChange={setIsAddTodoOpen}>
          <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Add New Todo</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              <div>
                <Label htmlFor="sheet-todo-text">Task</Label>
                <Input
                  id="sheet-todo-text"
                  value={newTodo.text}
                  onChange={(e) => setNewTodo({ ...newTodo, text: e.target.value })}
                  placeholder="What needs to be done?"
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="sheet-todo-description">Description</Label>
                <Textarea
                  id="sheet-todo-description"
                  value={newTodo.description}
                  onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                  placeholder="Add more details..."
                  rows={3}
                  className="rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sheet-todo-category">Category</Label>
                  <Select value={newTodo.category} onValueChange={(value: TodoItem["category"]) => setNewTodo({ ...newTodo, category: value })}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="learning">Learning</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sheet-todo-priority">Priority</Label>
                  <Select value={newTodo.priority} onValueChange={(value: TodoItem["priority"]) => setNewTodo({ ...newTodo, priority: value })}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sheet-todo-due">Due Date</Label>
                  <div className="relative">
                    <Button
                      variant="outline"
                      onClick={() => setNewTodo({ ...newTodo, showDatePicker: !newTodo.showDatePicker })}
                      className={cn(
                        "w-full justify-start text-left font-normal rounded-xl",
                        !newTodo.dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newTodo.dueDate ? format(new Date(newTodo.dueDate), "PPP") : "Select due date"}
                    </Button>
                    {newTodo.showDatePicker && (
                      <div className="absolute top-full left-0 mt-1 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <Calendar
                          mode="single"
                          selected={newTodo.dueDate ? new Date(newTodo.dueDate) : undefined}
                          onSelect={(date) => {
                            setNewTodo({ 
                              ...newTodo, 
                              dueDate: date ? date.toISOString().split('T')[0] : "",
                              showDatePicker: false
                            });
                          }}
                          initialFocus
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="sheet-todo-time">Estimated Time (minutes)</Label>
                  <Input
                    id="sheet-todo-time"
                    type="number"
                    value={newTodo.estimatedTime}
                    onChange={(e) => setNewTodo({ ...newTodo, estimatedTime: parseInt(e.target.value) || 0 })}
                    min="1"
                    max="480"
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sheet-todo-energy">Energy Level</Label>
                  <Select value={newTodo.energyLevel} onValueChange={(value: string) => setNewTodo({ ...newTodo, energyLevel: value as TodoItem["energyLevel"] })}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sheet-todo-complexity">Complexity</Label>
                  <Select value={newTodo.complexity} onValueChange={(value: string) => setNewTodo({ ...newTodo, complexity: value as TodoItem["complexity"] })}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Simple</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="complex">Complex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAddTodo} className="w-full rounded-xl">Add Todo</Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Add List Dialog */}
        <Dialog open={isAddListOpen} onOpenChange={setIsAddListOpen}>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>Create New List</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="list-name">List Name</Label>
                <Input
                  id="list-name"
                  value={newList.name}
                  onChange={(e) => setNewList({ ...newList, name: e.target.value })}
                  placeholder="Enter list name"
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="list-category">Category</Label>
                <Select value={newList.category} onValueChange={(value: TodoList["category"]) => setNewList({ ...newList, category: value })}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="learning">Learning</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddList} className="w-full rounded-xl">Create List</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  
  );
}
