"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Bot, User, Settings, Zap, RotateCcw } from "lucide-react";
import { useLearningMaterialsStore } from "@/lib/stores/learning-materials-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  model?: string;
  tokens?: number;
  cost?: number;
}

export default function PlaygroundPage() {
  const router = useRouter();
  const { modelConfigurations, getActiveModel, userProfile } = useLearningMaterialsStore();
  
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputMessage, setInputMessage] = React.useState("");
  const [selectedModel, setSelectedModel] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [systemPrompt, setSystemPrompt] = React.useState("You are a helpful AI assistant specialized in learning and education. Provide clear, educational responses that help users understand concepts better.");

  const activeModel = getActiveModel();
  const availableModels = modelConfigurations.filter(config => config.isActive || config.id === selectedModel);

  React.useEffect(() => {
    if (activeModel && !selectedModel) {
      setSelectedModel(activeModel.id);
    }
  }, [activeModel, selectedModel]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedModel) {
      toast.error("Please enter a message and select a model");
      return;
    }

    const model = modelConfigurations.find(m => m.id === selectedModel);
    if (!model) {
      toast.error("Selected model not found");
      return;
    }

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: inputMessage,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Simulate AI response (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const assistantMessage: Message = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: `This is a simulated response from ${model.name}. In a real implementation, this would connect to the actual model API and return a proper response based on your input: "${inputMessage}"`,
        timestamp: Date.now(),
        model: model.name,
        tokens: Math.floor(Math.random() * 1000) + 100,
        cost: Math.random() * 0.01,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast.error("Failed to get response from model");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    toast.success("Chat cleared");
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getTotalCost = () => {
    return messages
      .filter(m => m.cost)
      .reduce((total, message) => total + (message.cost || 0), 0);
  };

  const getTotalTokens = () => {
    return messages
      .filter(m => m.tokens)
      .reduce((total, message) => total + (message.tokens || 0), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center space-x-2 rounded-xl"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Model Playground</h1>
                <p className="text-sm text-gray-500">Test and interact with your configured AI models</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleClearChat}
                variant="outline"
                className="rounded-xl"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear Chat
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Model Selection */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Model Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Active Model</label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableModels.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          <div className="flex items-center space-x-2">
                            <span>{model.name}</span>
                            {model.isActive && (
                              <Badge variant="secondary" className="rounded-full text-xs">
                                Active
                              </Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedModel && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">System Prompt</label>
                    <Textarea
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      placeholder="Enter system prompt..."
                      className="rounded-xl min-h-[100px]"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Model Info */}
            {selectedModel && (
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Model Info</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(() => {
                    const model = modelConfigurations.find(m => m.id === selectedModel);
                    if (!model) return null;
                    
                    return (
                      <>
                        <div className="flex justify-between text-sm">
                          <span>Name</span>
                          <span className="font-medium">{model.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Type</span>
                          <span className="font-medium">{model.modelType}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Size</span>
                          <span className="font-medium capitalize">{model.size}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Max Tokens</span>
                          <span className="font-medium">{model.maxTokens.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Temperature</span>
                          <span className="font-medium">{model.temperature}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Memory Limit</span>
                          <span className="font-medium">{model.memoryLimit} MB</span>
                        </div>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

            {/* Session Stats */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>Session Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Messages</span>
                  <span className="font-medium">{messages.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Tokens</span>
                  <span className="font-medium">{getTotalTokens().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Cost</span>
                  <span className="font-medium">${getTotalCost().toFixed(4)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Messages */}
            <Card className="rounded-xl h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <span>Chat with AI</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-6">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">Start a conversation</p>
                      <p className="text-sm">Select a model and send your first message to begin testing</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-xl p-4 ${
                            message.role === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            {message.role === 'user' ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Bot className="h-4 w-4" />
                            )}
                            <span className="text-xs opacity-70">
                              {formatTimestamp(message.timestamp)}
                            </span>
                            {message.model && (
                              <Badge variant="outline" className="text-xs rounded-full">
                                {message.model}
                              </Badge>
                            )}
                          </div>
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          {message.tokens && (
                            <div className="mt-2 pt-2 border-t border-gray-200 text-xs opacity-70">
                              {message.tokens} tokens • ${message.cost?.toFixed(4)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-xl p-4">
                          <div className="flex items-center space-x-2">
                            <Bot className="h-4 w-4" />
                            <span className="text-sm text-gray-500">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Input Area */}
            <Card className="rounded-xl">
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="rounded-xl"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim() || !selectedModel}
                    className="rounded-xl"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
