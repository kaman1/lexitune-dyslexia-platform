"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Brain, Settings, Zap, ChevronRight, DollarSign, Link, FileText, Database, Cloud, CheckCircle } from "lucide-react";
import { useLearningMaterialsStore } from "@/lib/stores/learning-materials-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function NewModelPage() {
  const router = useRouter();
  const { addModelConfiguration } = useLearningMaterialsStore();
  
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpenSource, setIsOpenSource] = React.useState(false);
  const [selectedConnections, setSelectedConnections] = React.useState<string[]>([]);
  
  const [formData, setFormData] = React.useState({
    name: "",
    size: "medium" as "small" | "medium" | "large" | "xlarge",
    modelType: "gpt-4" as "gpt-3.5-turbo" | "gpt-4" | "gpt-4-turbo" | "claude-3" | "mistral-7b" | "falcon-40b" | "bloom-176b" | "gemma-7b" | "dbrx-132b" | "custom",
    maxTokens: 4000,
    temperature: 0.7,
    contextWindow: 8000,
    memoryLimit: 1000,
    isActive: false,
  });

  // Pricing data for different models
  const pricingData = {
    "gpt-3.5-turbo": { input: 0.0015, output: 0.002, unit: "per 1K tokens" },
    "gpt-4": { input: 0.03, output: 0.06, unit: "per 1K tokens" },
    "gpt-4-turbo": { input: 0.01, output: 0.03, unit: "per 1K tokens" },
    "claude-3": { input: 0.015, output: 0.075, unit: "per 1K tokens" },
    "mistral-7b": { input: 0.0003, output: 0.0003, unit: "per 1K tokens" },
    "falcon-40b": { input: 0.0004, output: 0.0004, unit: "per 1K tokens" },
    "bloom-176b": { input: 0.0006, output: 0.0006, unit: "per 1K tokens" },
    "gemma-7b": { input: 0.0002, output: 0.0002, unit: "per 1K tokens" },
    "dbrx-132b": { input: 0.0008, output: 0.0008, unit: "per 1K tokens" },
    "custom": { input: 0.01, output: 0.02, unit: "per 1K tokens" },
  };

  // Third-party connection options
  const connectionOptions = [
    { id: "notion", name: "Notion", icon: FileText, price: 0.002, description: "Connect to your Notion workspace" },
    { id: "google-docs", name: "Google Docs", icon: FileText, price: 0.001, description: "Access Google Docs and Sheets" },
    { id: "excel", name: "Microsoft Excel", icon: Database, price: 0.0015, description: "Connect to Excel spreadsheets" },
    { id: "palantir", name: "Palantir", icon: Cloud, price: 0.005, description: "Integrate with Palantir data" },
    { id: "airtable", name: "Airtable", icon: Database, price: 0.002, description: "Connect to Airtable bases" },
    { id: "confluence", name: "Confluence", icon: FileText, price: 0.003, description: "Access Confluence pages" },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleConnection = (connectionId: string) => {
    setSelectedConnections(prev => 
      prev.includes(connectionId) 
        ? prev.filter(id => id !== connectionId)
        : [...prev, connectionId]
    );
  };

  const calculateTotalPrice = () => {
    const modelPrice = pricingData[formData.modelType as keyof typeof pricingData];
    const connectionPrice = selectedConnections.reduce((total, connectionId) => {
      const connection = connectionOptions.find(c => c.id === connectionId);
      return total + (connection?.price || 0);
    }, 0);
    
    // Calculate memory usage cost based on memory limit
    const memoryCostPerMB = 0.0001; // $0.0001 per MB per hour
    const memoryCost = (formData.memoryLimit * memoryCostPerMB);
    
    return {
      model: modelPrice,
      connections: connectionPrice,
      memory: memoryCost,
      total: modelPrice.input + modelPrice.output + connectionPrice + memoryCost
    };
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        toast.error("Please enter a model name");
        return;
      }
      setCurrentStep(2);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      const finalConfig = {
        ...formData,
        connections: selectedConnections,
        pricing: calculateTotalPrice()
      };
      
      addModelConfiguration(finalConfig);
      toast.success("Model configuration created successfully");
      router.push("/learning-materials?tab=models");
    } catch (error) {
      toast.error("Failed to create model configuration");
    } finally {
      setIsLoading(false);
    }
  };

  const getModelInfo = (modelType: string) => {
    const modelInfo = {
      "gpt-3.5-turbo": {
        description: "Fast and cost-effective for most tasks",
        maxTokens: 4000,
        contextWindow: 4000,
        memoryUsage: 500,
      },
      "gpt-4": {
        description: "Most capable model for complex reasoning",
        maxTokens: 8000,
        contextWindow: 8000,
        memoryUsage: 1000,
      },
      "gpt-4-turbo": {
        description: "Latest GPT-4 with improved performance",
        maxTokens: 128000,
        contextWindow: 128000,
        memoryUsage: 2000,
      },
      "claude-3": {
        description: "Anthropic's advanced language model",
        maxTokens: 200000,
        contextWindow: 200000,
        memoryUsage: 1500,
      },
      "mistral-7b": {
        description: "French startup's efficient 7B parameter model with Apache 2.0 license",
        maxTokens: 8000,
        contextWindow: 8000,
        memoryUsage: 600,
      },
      "falcon-40b": {
        description: "Abu Dhabi's 40B parameter model, rivals LLaMA 2 and PaLM 2",
        maxTokens: 2048,
        contextWindow: 2048,
        memoryUsage: 1200,
      },
      "bloom-176b": {
        description: "Multilingual model supporting 46 languages and 13 programming languages",
        maxTokens: 2048,
        contextWindow: 2048,
        memoryUsage: 2000,
      },
      "gemma-7b": {
        description: "Google DeepMind's open-source model based on Gemini technology",
        maxTokens: 8192,
        contextWindow: 8192,
        memoryUsage: 700,
      },
      "dbrx-132b": {
        description: "Databricks' mixture-of-experts model with 132B parameters",
        maxTokens: 32768,
        contextWindow: 32768,
        memoryUsage: 1800,
      },
      "custom": {
        description: "Custom model configuration",
        maxTokens: 4000,
        contextWindow: 4000,
        memoryUsage: 1000,
      },
    };
    
    return modelInfo[modelType as keyof typeof modelInfo] || modelInfo.custom;
  };

  const getSizeInfo = (size: string) => {
    const sizeInfo = {
      small: { description: "Lightweight, fast processing", memoryMultiplier: 0.5 },
      medium: { description: "Balanced performance and speed", memoryMultiplier: 1.0 },
      large: { description: "High performance, more memory", memoryMultiplier: 2.0 },
      xlarge: { description: "Maximum performance, high memory", memoryMultiplier: 4.0 },
    };
    
    return sizeInfo[size as keyof typeof sizeInfo] || sizeInfo.medium;
  };

  const modelInfo = getModelInfo(formData.modelType);
  const sizeInfo = getSizeInfo(formData.size);
  const estimatedMemoryUsage = Math.round(modelInfo.memoryUsage * sizeInfo.memoryMultiplier);
  const pricing = calculateTotalPrice();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <h1 className="text-2xl font-bold text-gray-900">New Model Configuration</h1>
                <p className="text-sm text-gray-500">Step {currentStep} of 2: {currentStep === 1 ? "Configure Model" : "Connect Resources"}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {currentStep === 1 ? (
                <Button
                  onClick={handleNextStep}
                  className="flex items-center space-x-2 rounded-xl"
                >
                  <span>Next Step</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center space-x-2 rounded-xl"
                >
                  <Save className="h-4 w-4" />
                  <span>{isLoading ? "Saving..." : "Save Model"}</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Step Progress */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="font-medium">Model Configuration</span>
            </div>
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="font-medium">Connect Resources</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Configuration Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span>Basic Configuration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Model Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., My Learning Assistant"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Model Type</Label>
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm ${!isOpenSource ? 'font-medium text-gray-900' : 'text-gray-500'}`}>3rd Party</span>
                        <Switch
                          checked={isOpenSource}
                          onCheckedChange={setIsOpenSource}
                        />
                        <span className={`text-sm ${isOpenSource ? 'font-medium text-gray-900' : 'text-gray-500'}`}>Open Source</span>
                      </div>
                    </div>
                    
                    <Select
                      value={formData.modelType}
                      onValueChange={(value) => handleInputChange("modelType", value)}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select model type" />
                      </SelectTrigger>
                      <SelectContent>
                        {isOpenSource ? (
                          <>
                            <SelectItem value="mistral-7b">Mistral 7B (French)</SelectItem>
                            <SelectItem value="falcon-40b">Falcon 40B (Abu Dhabi)</SelectItem>
                            <SelectItem value="bloom-176b">BLOOM 176B (Multilingual)</SelectItem>
                            <SelectItem value="gemma-7b">Gemma 7B (Google)</SelectItem>
                            <SelectItem value="dbrx-132b">DBRX 132B (Databricks)</SelectItem>
                            <SelectItem value="custom">Custom Open Source</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                            <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                            <SelectItem value="claude-3">Claude 3</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size">Model Size</Label>
                    <Select
                      value={formData.size}
                      onValueChange={(value) => handleInputChange("size", value)}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select model size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="xlarge">X-Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Model Description</Label>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-600">{modelInfo.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Advanced Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Max Tokens: {formData.maxTokens.toLocaleString()}</Label>
                      <Slider
                        value={[formData.maxTokens]}
                        onValueChange={(value) => handleInputChange("maxTokens", value[0])}
                        max={200000}
                        min={1000}
                        step={1000}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500">
                        Maximum number of tokens the model can process in one request
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Context Window: {formData.contextWindow.toLocaleString()}</Label>
                      <Slider
                        value={[formData.contextWindow]}
                        onValueChange={(value) => handleInputChange("contextWindow", value[0])}
                        max={200000}
                        min={1000}
                        step={1000}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500">
                        Maximum context length the model can maintain
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Temperature: {formData.temperature}</Label>
                      <Slider
                        value={[formData.temperature]}
                        onValueChange={(value) => handleInputChange("temperature", value[0])}
                        max={2}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500">
                        Controls randomness in responses (0 = deterministic, 2 = very random)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Memory Limit: {formData.memoryLimit} MB</Label>
                      <Slider
                        value={[formData.memoryLimit]}
                        onValueChange={(value) => handleInputChange("memoryLimit", value[0])}
                        max={10000}
                        min={100}
                        step={100}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500">
                        Maximum memory allocation for this model
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview Panel */}
            <div className="space-y-6">
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Model Preview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <p className="text-lg font-semibold">{formData.name || "Untitled Model"}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Type & Size</p>
                      <div className="flex space-x-2">
                        <Badge variant="outline" className="rounded-full">{formData.modelType}</Badge>
                        <Badge variant="outline" className="capitalize rounded-full">{formData.size}</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Performance</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Max Tokens</span>
                          <span>{formData.maxTokens.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Context Window</span>
                          <span>{formData.contextWindow.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Temperature</span>
                          <span>{formData.temperature}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Memory Usage</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Estimated Usage</span>
                          <span className="font-semibold">{estimatedMemoryUsage} MB</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min((estimatedMemoryUsage / 5000) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Usage-based Pricing</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Input Cost</span>
                      <span className="font-semibold">${pricing.model.input.toFixed(4)} {pricing.model.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Output Cost</span>
                      <span className="font-semibold">${pricing.model.output.toFixed(4)} {pricing.model.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Memory Cost</span>
                      <span className="font-semibold">${pricing.memory.toFixed(4)} per hour</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-medium">
                        <span>Model Total</span>
                        <span>${(pricing.model.input + pricing.model.output + pricing.memory).toFixed(4)} {pricing.model.unit} + memory</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Link className="h-5 w-5" />
                  <span>Connect Third-Party Resources</span>
                </CardTitle>
                <p className="text-sm text-gray-600">Select the resources you want your model to connect to</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {connectionOptions.map((connection) => {
                    const IconComponent = connection.icon;
                    const isSelected = selectedConnections.includes(connection.id);
                    
                    return (
                      <div
                        key={connection.id}
                        className={`relative cursor-pointer rounded-xl border-2 transition-all ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => toggleConnection(connection.id)}
                      >
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <IconComponent className="h-5 w-5 text-gray-600" />
                              <span className="font-medium">{connection.name}</span>
                            </div>
                            {isSelected && (
                              <CheckCircle className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{connection.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-green-600">
                              ${connection.price.toFixed(3)}/request
                            </span>
                            <Badge variant="outline" className="rounded-full">
                              {isSelected ? 'Selected' : 'Available'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Pricing Summary */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Usage-based Pricing Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <h4 className="font-medium text-blue-900 mb-2">Model Usage</h4>
                      <p className="text-2xl font-bold text-blue-600">
                        ${(pricing.model.input + pricing.model.output).toFixed(4)}
                      </p>
                      <p className="text-sm text-blue-700">{pricing.model.unit}</p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-xl">
                      <h4 className="font-medium text-orange-900 mb-2">Memory Usage</h4>
                      <p className="text-2xl font-bold text-orange-600">
                        ${pricing.memory.toFixed(4)}
                      </p>
                      <p className="text-sm text-orange-700">per hour</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-xl">
                      <h4 className="font-medium text-green-900 mb-2">Connection Usage</h4>
                      <p className="text-2xl font-bold text-green-600">
                        ${pricing.connections.toFixed(3)}
                      </p>
                      <p className="text-sm text-green-700">per request</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-xl">
                      <h4 className="font-medium text-purple-900 mb-2">Total Usage Cost</h4>
                      <p className="text-2xl font-bold text-purple-600">
                        ${pricing.total.toFixed(4)}
                      </p>
                      <p className="text-sm text-purple-700">per 1K tokens + requests + memory</p>
                    </div>
                  </div>
                  
                  {selectedConnections.length > 0 && (
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-medium mb-2">Selected Connections:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedConnections.map((connectionId) => {
                          const connection = connectionOptions.find(c => c.id === connectionId);
                          return (
                            <Badge key={connectionId} variant="secondary" className="rounded-full">
                              {connection?.name}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Floating Price Pill */}
      {currentStep === 2 && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
            <DollarSign className="h-4 w-4" />
            <span className="font-medium">${pricing.total.toFixed(4)}/1K tokens</span>
          </div>
        </div>
      )}
    </div>
  );
}
