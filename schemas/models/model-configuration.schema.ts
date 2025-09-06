/**
 * AI Model Configuration Schema
 * 
 * This schema defines the structure for AI model configurations in the AI Agent Studio.
 * Models are the core component that have access to all other platform resources.
 * 
 * @version 1.0.0
 * @author TEKIMAX Research & Development
 */

export interface ModelConfiguration {
  // Core Identification
  id: string;
  name: string;
  description?: string;
  version: string;
  
  // Model Specifications
  modelType: ModelType;
  size: ModelSize;
  provider: ModelProvider;
  
  // Performance Configuration
  maxTokens: number;
  temperature: number;
  contextWindow: number;
  memoryLimit: number; // in MB
  maxConcurrentRequests: number;
  
  // Status & Lifecycle
  isActive: boolean;
  isPublic: boolean;
  status: ModelStatus;
  createdAt: number;
  updatedAt: number;
  lastUsed?: number;
  createdBy: string;
  
  // Pricing & Usage
  pricing: ModelPricing;
  usageStats: ModelUsageStats;
  
  // Access Control & Permissions
  permissions: ModelPermissions;
  
  // Connected Resources
  connectedResources: ConnectedResource[];
  availableTools: ToolReference[];
  
  // Advanced Configuration
  advancedConfig: AdvancedModelConfig;
  
  // Monitoring & Analytics
  monitoring: ModelMonitoring;
  
  // Deployment Configuration
  deployment: DeploymentConfig;
}

export type ModelType = 
  | 'gpt-3.5-turbo' 
  | 'gpt-4' 
  | 'gpt-4-turbo' 
  | 'claude-3' 
  | 'claude-3-opus'
  | 'claude-3-sonnet'
  | 'claude-3-haiku'
  | 'mistral-7b' 
  | 'falcon-40b' 
  | 'bloom-176b' 
  | 'gemma-7b' 
  | 'dbrx-132b'
  | 'llama-2-7b'
  | 'llama-2-13b'
  | 'llama-2-70b'
  | 'custom'
  | 'fine-tuned';

export type ModelSize = 'small' | 'medium' | 'large' | 'xlarge' | 'custom';

export type ModelProvider = 
  | 'openai' 
  | 'anthropic' 
  | 'mistral' 
  | 'huggingface' 
  | 'google' 
  | 'meta' 
  | 'databricks'
  | 'custom'
  | 'self-hosted';

export type ModelStatus = 
  | 'active' 
  | 'inactive' 
  | 'training' 
  | 'deploying' 
  | 'error' 
  | 'maintenance'
  | 'deprecated';

export interface ModelPricing {
  // Input/Output Pricing
  inputPricePer1K: number;
  outputPricePer1K: number;
  currency: string;
  
  // Memory & Storage Pricing
  memoryPricePerMBPerHour: number;
  storagePricePerGBPerMonth: number;
  
  // Connection Pricing
  connectionPricePerRequest: number;
  
  // Custom Pricing Rules
  customPricingRules?: PricingRule[];
  
  // Billing Configuration
  billingCycle: 'hourly' | 'daily' | 'monthly' | 'usage-based';
  freeTierLimit?: {
    requests: number;
    tokens: number;
    memoryMB: number;
  };
}

export interface PricingRule {
  id: string;
  name: string;
  condition: string; // e.g., "requests > 1000"
  multiplier: number;
  appliesTo: 'input' | 'output' | 'memory' | 'connections';
}

export interface ModelUsageStats {
  totalRequests: number;
  totalTokens: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  averageResponseTime: number; // in milliseconds
  successRate: number; // percentage
  errorRate: number; // percentage
  last24Hours: {
    requests: number;
    tokens: number;
    avgResponseTime: number;
  };
  last7Days: {
    requests: number;
    tokens: number;
    avgResponseTime: number;
  };
  last30Days: {
    requests: number;
    tokens: number;
    avgResponseTime: number;
  };
}

export interface ModelPermissions {
  // User Access Control
  allowedUsers: string[];
  allowedRoles: string[];
  isPublic: boolean;
  
  // Resource Access
  canAccessLearningMaterials: boolean;
  canAccessUserProfiles: boolean;
  canAccessAnalytics: boolean;
  canAccessConnections: boolean;
  
  // Tool Permissions
  allowedTools: string[];
  restrictedTools: string[];
  
  // API Access
  apiAccess: {
    enabled: boolean;
    rateLimit: number; // requests per minute
    allowedEndpoints: string[];
  };
}

export interface ConnectedResource {
  id: string;
  type: ResourceType;
  name: string;
  connectionId: string;
  permissions: ResourcePermissions;
  lastSync: number;
  syncStatus: 'synced' | 'syncing' | 'error' | 'pending';
  metadata: Record<string, any>;
}

export type ResourceType = 
  | 'learning-material'
  | 'user-profile'
  | 'analytics-data'
  | 'connection'
  | 'tool'
  | 'knowledge-base'
  | 'document'
  | 'database';

export interface ResourcePermissions {
  read: boolean;
  write: boolean;
  delete: boolean;
  share: boolean;
  export: boolean;
}

export interface ToolReference {
  toolId: string;
  toolName: string;
  toolType: string;
  isEnabled: boolean;
  configuration: Record<string, any>;
  lastUsed?: number;
  usageCount: number;
}

export interface AdvancedModelConfig {
  // Model-specific parameters
  topP?: number;
  topK?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stopSequences?: string[];
  
  // Custom instructions
  systemPrompt?: string;
  customInstructions?: string;
  
  // Fine-tuning configuration
  fineTuningConfig?: FineTuningConfig;
  
  // Safety & Moderation
  safetySettings: SafetySettings;
  
  // Performance optimization
  optimizationSettings: OptimizationSettings;
}

export interface FineTuningConfig {
  baseModel: string;
  trainingData: string[];
  validationData: string[];
  hyperparameters: {
    learningRate: number;
    batchSize: number;
    epochs: number;
  };
  status: 'pending' | 'training' | 'completed' | 'failed';
  createdAt: number;
  completedAt?: number;
}

export interface SafetySettings {
  contentFiltering: boolean;
  toxicityThreshold: number;
  biasDetection: boolean;
  privacyProtection: boolean;
  customSafetyRules: SafetyRule[];
}

export interface SafetyRule {
  id: string;
  name: string;
  condition: string;
  action: 'block' | 'warn' | 'log';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface OptimizationSettings {
  cachingEnabled: boolean;
  cacheTTL: number; // in seconds
  compressionEnabled: boolean;
  batchProcessing: boolean;
  maxBatchSize: number;
  parallelProcessing: boolean;
  maxConcurrentThreads: number;
}

export interface ModelMonitoring {
  // Health Monitoring
  healthStatus: 'healthy' | 'degraded' | 'unhealthy';
  lastHealthCheck: number;
  
  // Performance Metrics
  performanceMetrics: PerformanceMetrics;
  
  // Error Tracking
  errorLog: ErrorLogEntry[];
  
  // Alert Configuration
  alerts: AlertConfig[];
  
  // Logging Configuration
  logging: LoggingConfig;
}

export interface PerformanceMetrics {
  cpuUsage: number;
  memoryUsage: number;
  gpuUsage?: number;
  diskUsage: number;
  networkLatency: number;
  throughput: number; // requests per second
  queueLength: number;
}

export interface ErrorLogEntry {
  id: string;
  timestamp: number;
  level: 'error' | 'warning' | 'info';
  message: string;
  stackTrace?: string;
  context: Record<string, any>;
  resolved: boolean;
}

export interface AlertConfig {
  id: string;
  name: string;
  condition: string;
  threshold: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  enabled: boolean;
  notificationChannels: string[];
}

export interface LoggingConfig {
  level: 'debug' | 'info' | 'warn' | 'error';
  retentionDays: number;
  includeRequestData: boolean;
  includeResponseData: boolean;
  customFields: string[];
}

export interface DeploymentConfig {
  // Infrastructure
  infrastructure: InfrastructureConfig;
  
  // Scaling Configuration
  scaling: ScalingConfig;
  
  // Security Configuration
  security: SecurityConfig;
  
  // Backup & Recovery
  backup: BackupConfig;
}

export interface InfrastructureConfig {
  provider: 'aws' | 'azure' | 'gcp' | 'self-hosted' | 'hybrid';
  region: string;
  instanceType: string;
  autoScaling: boolean;
  loadBalancer: boolean;
  cdnEnabled: boolean;
}

export interface ScalingConfig {
  minInstances: number;
  maxInstances: number;
  targetCPUUtilization: number;
  scaleUpCooldown: number; // in seconds
  scaleDownCooldown: number; // in seconds
  customMetrics: ScalingMetric[];
}

export interface ScalingMetric {
  name: string;
  threshold: number;
  action: 'scale-up' | 'scale-down';
}

export interface SecurityConfig {
  encryptionAtRest: boolean;
  encryptionInTransit: boolean;
  vpcEnabled: boolean;
  firewallRules: FirewallRule[];
  accessLogging: boolean;
  auditLogging: boolean;
}

export interface FirewallRule {
  id: string;
  name: string;
  protocol: 'tcp' | 'udp' | 'http' | 'https';
  port: number;
  source: string;
  action: 'allow' | 'deny';
}

export interface BackupConfig {
  enabled: boolean;
  frequency: 'hourly' | 'daily' | 'weekly';
  retentionDays: number;
  encryption: boolean;
  compression: boolean;
  storageLocation: string;
}

// API Endpoint Definitions for Model Configuration
export interface ModelConfigurationAPI {
  // CRUD Operations
  createModel: (config: Omit<ModelConfiguration, 'id' | 'createdAt' | 'updatedAt'>) => Promise<ModelConfiguration>;
  getModel: (id: string) => Promise<ModelConfiguration>;
  updateModel: (id: string, updates: Partial<ModelConfiguration>) => Promise<ModelConfiguration>;
  deleteModel: (id: string) => Promise<void>;
  listModels: (filters?: ModelFilters) => Promise<ModelConfiguration[]>;
  
  // Model Management
  activateModel: (id: string) => Promise<void>;
  deactivateModel: (id: string) => Promise<void>;
  testModel: (id: string, testData: any) => Promise<ModelTestResult>;
  deployModel: (id: string, deploymentConfig: DeploymentConfig) => Promise<DeploymentResult>;
  
  // Resource Management
  connectResource: (modelId: string, resource: ConnectedResource) => Promise<void>;
  disconnectResource: (modelId: string, resourceId: string) => Promise<void>;
  listConnectedResources: (modelId: string) => Promise<ConnectedResource[]>;
  
  // Tool Management
  addTool: (modelId: string, tool: ToolReference) => Promise<void>;
  removeTool: (modelId: string, toolId: string) => Promise<void>;
  updateToolConfig: (modelId: string, toolId: string, config: Record<string, any>) => Promise<void>;
  
  // Monitoring & Analytics
  getModelMetrics: (modelId: string, timeRange: TimeRange) => Promise<ModelMetrics>;
  getModelLogs: (modelId: string, filters?: LogFilters) => Promise<ErrorLogEntry[]>;
  getModelUsage: (modelId: string, timeRange: TimeRange) => Promise<ModelUsageStats>;
  
  // Pricing & Billing
  calculateCost: (modelId: string, usage: UsageEstimate) => Promise<CostEstimate>;
  getBillingHistory: (modelId: string, timeRange: TimeRange) => Promise<BillingRecord[]>;
}

export interface ModelFilters {
  status?: ModelStatus[];
  provider?: ModelProvider[];
  size?: ModelSize[];
  isActive?: boolean;
  createdBy?: string;
  tags?: string[];
  search?: string;
}

export interface ModelTestResult {
  success: boolean;
  responseTime: number;
  accuracy?: number;
  quality?: number;
  errors?: string[];
  metrics: Record<string, number>;
}

export interface DeploymentResult {
  success: boolean;
  deploymentId: string;
  endpoint: string;
  status: 'deploying' | 'active' | 'failed';
  estimatedTime?: number;
  errors?: string[];
}

export interface TimeRange {
  start: number;
  end: number;
}

export interface LogFilters {
  level?: string[];
  startTime?: number;
  endTime?: number;
  search?: string;
}

export interface ModelMetrics {
  performance: PerformanceMetrics;
  usage: ModelUsageStats;
  errors: ErrorLogEntry[];
  costs: CostBreakdown;
}

export interface UsageEstimate {
  requests: number;
  inputTokens: number;
  outputTokens: number;
  memoryMB: number;
  connections: number;
}

export interface CostEstimate {
  total: number;
  breakdown: {
    input: number;
    output: number;
    memory: number;
    connections: number;
  };
  currency: string;
}

export interface BillingRecord {
  id: string;
  timestamp: number;
  amount: number;
  currency: string;
  description: string;
  usage: UsageEstimate;
  breakdown: CostEstimate['breakdown'];
}

export interface CostBreakdown {
  total: number;
  byCategory: Record<string, number>;
  byTime: Record<string, number>;
  trends: {
    daily: number[];
    weekly: number[];
    monthly: number[];
  };
}

// Tool Function Definitions for Model Configuration
export interface ModelConfigurationTools {
  // Model Management Tools
  createModel: {
    name: 'create_model';
    description: 'Create a new AI model configuration';
    parameters: {
      name: string;
      modelType: ModelType;
      size: ModelSize;
      provider: ModelProvider;
      maxTokens: number;
      temperature: number;
      contextWindow: number;
      memoryLimit: number;
    };
    returns: ModelConfiguration;
  };
  
  updateModel: {
    name: 'update_model';
    description: 'Update an existing model configuration';
    parameters: {
      modelId: string;
      updates: Partial<ModelConfiguration>;
    };
    returns: ModelConfiguration;
  };
  
  activateModel: {
    name: 'activate_model';
    description: 'Activate a model for use';
    parameters: {
      modelId: string;
    };
    returns: { success: boolean; message: string };
  };
  
  testModel: {
    name: 'test_model';
    description: 'Test a model with sample data';
    parameters: {
      modelId: string;
      testData: any;
    };
    returns: ModelTestResult;
  };
  
  // Resource Connection Tools
  connectLearningMaterial: {
    name: 'connect_learning_material';
    description: 'Connect a learning material to a model';
    parameters: {
      modelId: string;
      materialId: string;
      permissions: ResourcePermissions;
    };
    returns: { success: boolean; connectionId: string };
  };
  
  connectUserProfile: {
    name: 'connect_user_profile';
    description: 'Connect a user profile to a model';
    parameters: {
      modelId: string;
      userId: string;
      permissions: ResourcePermissions;
    };
    returns: { success: boolean; connectionId: string };
  };
  
  connectAnalytics: {
    name: 'connect_analytics';
    description: 'Connect analytics data to a model';
    parameters: {
      modelId: string;
      analyticsId: string;
      permissions: ResourcePermissions;
    };
    returns: { success: boolean; connectionId: string };
  };
  
  // Tool Management
  addTool: {
    name: 'add_tool';
    description: 'Add a tool to a model';
    parameters: {
      modelId: string;
      toolId: string;
      configuration: Record<string, any>;
    };
    returns: { success: boolean; toolReference: ToolReference };
  };
  
  // Monitoring Tools
  getModelHealth: {
    name: 'get_model_health';
    description: 'Get the health status of a model';
    parameters: {
      modelId: string;
    };
    returns: {
      status: 'healthy' | 'degraded' | 'unhealthy';
      metrics: PerformanceMetrics;
      lastCheck: number;
    };
  };
  
  getModelUsage: {
    name: 'get_model_usage';
    description: 'Get usage statistics for a model';
    parameters: {
      modelId: string;
      timeRange: TimeRange;
    };
    returns: ModelUsageStats;
  };
  
  // Cost Calculation Tools
  calculateModelCost: {
    name: 'calculate_model_cost';
    description: 'Calculate the cost of using a model';
    parameters: {
      modelId: string;
      usage: UsageEstimate;
    };
    returns: CostEstimate;
  };
}

// Validation Schemas
export const ModelConfigurationValidation = {
  id: { type: 'string', required: true, pattern: '^model_[a-zA-Z0-9_-]+$' },
  name: { type: 'string', required: true, minLength: 1, maxLength: 100 },
  modelType: { type: 'string', required: true, enum: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo', 'claude-3', 'mistral-7b', 'falcon-40b', 'bloom-176b', 'gemma-7b', 'dbrx-132b', 'custom'] },
  maxTokens: { type: 'number', required: true, minimum: 1, maximum: 100000 },
  temperature: { type: 'number', required: true, minimum: 0, maximum: 2 },
  contextWindow: { type: 'number', required: true, minimum: 1000, maximum: 200000 },
  memoryLimit: { type: 'number', required: true, minimum: 100, maximum: 10000 },
  isActive: { type: 'boolean', required: true },
  createdAt: { type: 'number', required: true },
  updatedAt: { type: 'number', required: true }
};

// Default Values
export const DefaultModelConfiguration: Partial<ModelConfiguration> = {
  version: '1.0.0',
  size: 'medium',
  maxTokens: 4000,
  temperature: 0.7,
  contextWindow: 8000,
  memoryLimit: 1000,
  maxConcurrentRequests: 10,
  isActive: false,
  isPublic: false,
  status: 'inactive',
  pricing: {
    inputPricePer1K: 0.01,
    outputPricePer1K: 0.02,
    currency: 'USD',
    memoryPricePerMBPerHour: 0.0001,
    storagePricePerGBPerMonth: 0.1,
    connectionPricePerRequest: 0.001,
    billingCycle: 'usage-based'
  },
  permissions: {
    allowedUsers: [],
    allowedRoles: [],
    isPublic: false,
    canAccessLearningMaterials: true,
    canAccessUserProfiles: true,
    canAccessAnalytics: true,
    canAccessConnections: true,
    allowedTools: [],
    restrictedTools: [],
    apiAccess: {
      enabled: true,
      rateLimit: 100,
      allowedEndpoints: ['*']
    }
  },
  connectedResources: [],
  availableTools: [],
  advancedConfig: {
    safetySettings: {
      contentFiltering: true,
      toxicityThreshold: 0.8,
      biasDetection: true,
      privacyProtection: true,
      customSafetyRules: []
    },
    optimizationSettings: {
      cachingEnabled: true,
      cacheTTL: 3600,
      compressionEnabled: true,
      batchProcessing: false,
      maxBatchSize: 10,
      parallelProcessing: true,
      maxConcurrentThreads: 4
    }
  },
  monitoring: {
    healthStatus: 'healthy',
    lastHealthCheck: Date.now(),
    performanceMetrics: {
      cpuUsage: 0,
      memoryUsage: 0,
      diskUsage: 0,
      networkLatency: 0,
      throughput: 0,
      queueLength: 0
    },
    errorLog: [],
    alerts: [],
    logging: {
      level: 'info',
      retentionDays: 30,
      includeRequestData: false,
      includeResponseData: false,
      customFields: []
    }
  },
  deployment: {
    infrastructure: {
      provider: 'aws',
      region: 'us-east-1',
      instanceType: 't3.medium',
      autoScaling: true,
      loadBalancer: true,
      cdnEnabled: false
    },
    scaling: {
      minInstances: 1,
      maxInstances: 10,
      targetCPUUtilization: 70,
      scaleUpCooldown: 300,
      scaleDownCooldown: 300,
      customMetrics: []
    },
    security: {
      encryptionAtRest: true,
      encryptionInTransit: true,
      vpcEnabled: true,
      firewallRules: [],
      accessLogging: true,
      auditLogging: true
    },
    backup: {
      enabled: true,
      frequency: 'daily',
      retentionDays: 30,
      encryption: true,
      compression: true,
      storageLocation: 's3://backups'
    }
  }
};
