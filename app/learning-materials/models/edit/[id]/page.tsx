"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { useLearningMaterialsStore } from "@/lib/stores/learning-materials-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

export default function EditModelPage() {
  const router = useRouter();
  const params = useParams();
  const modelId = params.id as string;
  
  const { 
    modelConfigurations, 
    updateModelConfiguration, 
    deleteModelConfiguration 
  } = useLearningMaterialsStore();
  
  const [formData, setFormData] = React.useState({
    name: "",
    modelType: "",
    size: "medium" as "small" | "medium" | "large",
    maxTokens: 4000,
    temperature: 0.7,
    contextWindow: 8000,
    memoryLimit: 1000,
    isActive: false,
    description: ""
  });
  
  const [isLoading, setIsLoading] = React.useState(false);

  // Load model configuration on mount
  React.useEffect(() => {
    const model = modelConfigurations.find(m => m.id === modelId);
    if (model) {
      setFormData({
        name: model.name,
        modelType: model.modelType,
        size: model.size,
        maxTokens: model.maxTokens,
        temperature: model.temperature,
        contextWindow: model.contextWindow,
        memoryLimit: model.memoryLimit,
        isActive: model.isActive,
        description: model.description || ""
      });
    }
  }, [modelId, modelConfigurations]);

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error("Please enter a model name");
      return;
    }

    setIsLoading(true);
    try {
      updateModelConfiguration(modelId, formData);
      toast.success("Model configuration updated successfully");
      router.push("/learning-materials");
    } catch (error) {
      toast.error("Failed to update model configuration");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this model configuration?")) {
      setIsLoading(true);
      try {
        deleteModelConfiguration(modelId);
        toast.success("Model configuration deleted successfully");
        router.push("/learning-materials");
      } catch (error) {
        toast.error("Failed to delete model configuration");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const modelOptions = [
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", description: "Fast and efficient for most tasks" },
    { value: "gpt-4", label: "GPT-4", description: "Most capable model for complex reasoning" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo", description: "Latest GPT-4 with improved performance" },
    { value: "claude-3", label: "Claude 3", description: "Anthropic's advanced language model" },
    { value: "mistral-7b", label: "Mistral 7B", description: "Open source model with good performance" },
    { value: "falcon-40b", label: "Falcon 40B", description: "Large open source model" },
    { value: "bloom-176b", label: "BLOOM 176B", description: "Multilingual open source model" },
    { value: "gemma-7b", label: "Gemma 7B", description: "Google's efficient open source model" },
    { value: "dbrx-132b", label: "DBRX 132B", description: "Databricks advanced model" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <h1 className="text-2xl font-bold text-gray-900">Edit Model Configuration</h1>
                <p className="text-sm text-gray-500">Update your AI model settings</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleDelete}
                variant="destructive"
                disabled={isLoading}
                className="rounded-xl"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={isLoading}
                className="rounded-xl"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>Basic Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Model Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter model name..."
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modelType">Model Type</Label>
                  <Select value={formData.modelType} onValueChange={(value) => setFormData(prev => ({ ...prev, modelType: value }))}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select a model type" />
                    </SelectTrigger>
                    <SelectContent>
                      {modelOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-gray-500">{option.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe this model configuration..."
                    rows={3}
                    className="rounded-xl"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="isActive">Set as Active Model</Label>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>Advanced Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Model Size</Label>
                  <Select value={formData.size} onValueChange={(value: "small" | "medium" | "large") => setFormData(prev => ({ ...prev, size: value }))}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (Fast, Lower Cost)</SelectItem>
                      <SelectItem value="medium">Medium (Balanced)</SelectItem>
                      <SelectItem value="large">Large (High Performance)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Max Tokens: {formData.maxTokens.toLocaleString()}</Label>
                  <Slider
                    value={[formData.maxTokens]}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, maxTokens: value[0] }))}
                    max={32000}
                    min={1000}
                    step={1000}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Temperature: {formData.temperature}</Label>
                  <Slider
                    value={[formData.temperature]}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, temperature: value[0] }))}
                    max={2}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Context Window: {formData.contextWindow.toLocaleString()}</Label>
                  <Slider
                    value={[formData.contextWindow]}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, contextWindow: value[0] }))}
                    max={200000}
                    min={2000}
                    step={1000}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Memory Limit: {formData.memoryLimit} MB</Label>
                  <Slider
                    value={[formData.memoryLimit]}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, memoryLimit: value[0] }))}
                    max={10000}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>Model Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-500">Name</div>
                  <div className="text-lg font-semibold">{formData.name || "Untitled Model"}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-500">Type</div>
                  <div className="text-sm">{formData.modelType || "Not selected"}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-500">Size</div>
                  <div className="text-sm capitalize">{formData.size}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-500">Max Tokens</div>
                  <div className="text-sm">{formData.maxTokens.toLocaleString()}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-500">Temperature</div>
                  <div className="text-sm">{formData.temperature}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-500">Memory Limit</div>
                  <div className="text-sm">{formData.memoryLimit} MB</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-500">Status</div>
                  <div className="text-sm">
                    {formData.isActive ? (
                      <span className="text-green-600 font-medium">Active</span>
                    ) : (
                      <span className="text-gray-500">Inactive</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>Usage Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <div>
                  <strong>Temperature:</strong> Lower values (0.1-0.3) for focused responses, higher values (0.7-1.0) for creative responses.
                </div>
                <div>
                  <strong>Max Tokens:</strong> Controls response length. Higher values allow longer responses but increase costs.
                </div>
                <div>
                  <strong>Context Window:</strong> How much conversation history the model can remember.
                </div>
                <div>
                  <strong>Memory Limit:</strong> Storage space allocated for this model's data and context.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
