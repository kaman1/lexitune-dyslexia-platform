import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LearningMaterial {
  id: string;
  title: string;
  description?: string;
  fileType: 'pdf' | 'text' | 'image' | 'video';
  fileName: string;
  fileSize: number;
  uploadedAt: number;
  status: 'processing' | 'analyzed' | 'error';
  
  // AI Analysis Results
  aiAnalysis?: {
    subject: string;
    complexity: 'beginner' | 'intermediate' | 'advanced';
    learningObjectives: string[];
    keyTopics: string[];
    estimatedStudyTime: number; // in minutes
    recommendedPedagogy: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
    difficultyLevel: number; // 1-10
    summary: string;
    extractedText?: string;
    memoryUsage: number; // in MB
  };
  
  // Learning Progress
  studySessions?: {
    sessionId: string;
    completedAt: number;
    duration: number;
    progress: number; // 0-100
    notes?: string;
  }[];
}

export interface ModelConfiguration {
  id: string;
  name: string;
  size: 'small' | 'medium' | 'large' | 'xlarge';
  modelType: 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4-turbo' | 'claude-3' | 'custom';
  maxTokens: number;
  temperature: number;
  contextWindow: number;
  memoryLimit: number; // in MB
  isActive: boolean;
  createdAt: number;
  lastUsed?: number;
}

export interface UserLearningProfile {
  preferredLearningStyles: ('visual' | 'auditory' | 'kinesthetic')[];
  currentSubjects: string[];
  learningGoals: string[];
  difficultyPreference: 'beginner' | 'intermediate' | 'advanced';
  studyTimePreference: 'short' | 'medium' | 'long'; // 15min, 45min, 90min
  memoryUsage: number; // total MB used
  lastUpdated: number;
}

interface LearningMaterialsState {
  // State
  materials: LearningMaterial[];
  modelConfigurations: ModelConfiguration[];
  userProfile: UserLearningProfile;
  selectedMaterial: LearningMaterial | null;
  selectedModel: ModelConfiguration | null;
  
  // Actions
  addMaterial: (material: Omit<LearningMaterial, 'id' | 'uploadedAt'>) => void;
  updateMaterial: (id: string, updates: Partial<LearningMaterial>) => void;
  deleteMaterial: (id: string) => void;
  setSelectedMaterial: (material: LearningMaterial | null) => void;
  
  addModelConfiguration: (config: Omit<ModelConfiguration, 'id' | 'createdAt'>) => void;
  updateModelConfiguration: (id: string, updates: Partial<ModelConfiguration>) => void;
  deleteModelConfiguration: (id: string) => void;
  setSelectedModel: (config: ModelConfiguration | null) => void;
  setActiveModel: (id: string) => void;
  
  updateUserProfile: (updates: Partial<UserLearningProfile>) => void;
  
  // Computed values
  getTotalMemoryUsage: () => number;
  getMaterialsBySubject: (subject: string) => LearningMaterial[];
  getActiveModel: () => ModelConfiguration | null;
  getMemoryUsageByModel: () => Record<string, number>;
}

export const useLearningMaterialsStore = create<LearningMaterialsState>()(
  persist(
    (set, get) => ({
      // Initial state
      materials: [],
      modelConfigurations: [],
      userProfile: {
        preferredLearningStyles: ['visual'],
        currentSubjects: [],
        learningGoals: [],
        difficultyPreference: 'intermediate',
        studyTimePreference: 'medium',
        memoryUsage: 0,
        lastUpdated: Date.now(),
      },
      selectedMaterial: null,
      selectedModel: null,
      
      // Material actions
      addMaterial: (material) => {
        const newMaterial: LearningMaterial = {
          ...material,
          id: `material_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          uploadedAt: Date.now(),
        };
        
        set((state) => ({
          materials: [newMaterial, ...state.materials],
          userProfile: {
            ...state.userProfile,
            memoryUsage: state.userProfile.memoryUsage + (material.aiAnalysis?.memoryUsage || 0),
            lastUpdated: Date.now(),
          },
        }));
      },
      
      updateMaterial: (id, updates) => {
        set((state) => ({
          materials: state.materials.map((material) =>
            material.id === id ? { ...material, ...updates } : material
          ),
        }));
      },
      
      deleteMaterial: (id) => {
        set((state) => {
          const material = state.materials.find(m => m.id === id);
          const memoryToRemove = material?.aiAnalysis?.memoryUsage || 0;
          
          return {
            materials: state.materials.filter((material) => material.id !== id),
            userProfile: {
              ...state.userProfile,
              memoryUsage: Math.max(0, state.userProfile.memoryUsage - memoryToRemove),
              lastUpdated: Date.now(),
            },
          };
        });
      },
      
      setSelectedMaterial: (material) => set({ selectedMaterial: material }),
      
      // Model configuration actions
      addModelConfiguration: (config) => {
        const newConfig: ModelConfiguration = {
          ...config,
          id: `model_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: Date.now(),
        };
        
        set((state) => ({
          modelConfigurations: [newConfig, ...state.modelConfigurations],
        }));
      },
      
      updateModelConfiguration: (id, updates) => {
        set((state) => ({
          modelConfigurations: state.modelConfigurations.map((config) =>
            config.id === id ? { ...config, ...updates } : config
          ),
        }));
      },
      
      deleteModelConfiguration: (id) => {
        set((state) => ({
          modelConfigurations: state.modelConfigurations.filter((config) => config.id !== id),
        }));
      },
      
      setSelectedModel: (config) => set({ selectedModel: config }),
      
      setActiveModel: (id) => {
        set((state) => ({
          modelConfigurations: state.modelConfigurations.map((config) => ({
            ...config,
            isActive: config.id === id,
            lastUsed: config.id === id ? Date.now() : config.lastUsed,
          })),
        }));
      },
      
      updateUserProfile: (updates) => {
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            ...updates,
            lastUpdated: Date.now(),
          },
        }));
      },
      
      // Computed values
      getTotalMemoryUsage: () => {
        const state = get();
        return state.materials.reduce((total, material) => {
          return total + (material.aiAnalysis?.memoryUsage || 0);
        }, 0);
      },
      
      getMaterialsBySubject: (subject) => {
        const state = get();
        return state.materials.filter((material) =>
          material.aiAnalysis?.subject.toLowerCase().includes(subject.toLowerCase())
        );
      },
      
      getActiveModel: () => {
        const state = get();
        return state.modelConfigurations.find((config) => config.isActive) || null;
      },
      
      getMemoryUsageByModel: () => {
        const state = get();
        const usage: Record<string, number> = {};
        
        state.materials.forEach((material) => {
          if (material.aiAnalysis?.memoryUsage) {
            const modelId = material.id; // This could be enhanced to track which model processed each material
            usage[modelId] = (usage[modelId] || 0) + material.aiAnalysis.memoryUsage;
          }
        });
        
        return usage;
      },
    }),
    {
      name: 'learning-materials-storage',
      partialize: (state) => ({
        materials: state.materials,
        modelConfigurations: state.modelConfigurations,
        userProfile: state.userProfile,
      }),
    }
  )
);
