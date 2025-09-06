/**
 * Third-Party Connections Schema
 * 
 * This schema defines the structure for third-party service connections in the AI Agent Studio.
 * Connections enable integration with external platforms and data sources.
 * 
 * @version 1.0.0
 * @author TEKIMAX Research & Development
 */

export interface Connection {
  // Core Identification
  id: string;
  name: string;
  description?: string;
  type: ConnectionType;
  
  // Service Information
  service: ServiceInfo;
  
  // Authentication
  authentication: AuthenticationConfig;
  
  // Configuration
  configuration: ConnectionConfig;
  
  // Status & Health
  status: ConnectionStatus;
  
  // Data Mapping
  dataMapping: DataMapping;
  
  // Sync Configuration
  syncConfig: SyncConfig;
  
  // Usage & Limits
  usage: UsageInfo;
  
  // Security
  security: SecurityConfig;
  
  // Timestamps
  timestamps: ConnectionTimestamps;
}

export type ConnectionType = 
  | 'notion' 
  | 'google-docs' 
  | 'excel' 
  | 'palantir' 
  | 'airtable' 
  | 'confluence' 
  | 'slack' 
  | 'teams' 
  | 'dropbox' 
  | 'onedrive' 
  | 'github' 
  | 'gitlab' 
  | 'jira' 
  | 'trello' 
  | 'asana' 
  | 'monday' 
  | 'salesforce' 
  | 'hubspot' 
  | 'zendesk' 
  | 'intercom' 
  | 'custom';

export interface ServiceInfo {
  provider: string;
  serviceName: string;
  version: string;
  baseUrl: string;
  documentation: string;
  capabilities: ServiceCapability[];
  limitations: ServiceLimitation[];
  pricing: ServicePricing;
  logo?: string;
  icon?: string;
  color?: string;
}

export interface ServiceCapability {
  name: string;
  description: string;
  type: 'read' | 'write' | 'sync' | 'webhook' | 'api';
  supported: boolean;
  rateLimit?: number;
  cost?: number;
}

export interface ServiceLimitation {
  limitation: string;
  impact: 'low' | 'medium' | 'high';
  workaround?: string;
}

export interface ServicePricing {
  model: 'free' | 'per-request' | 'per-user' | 'subscription' | 'usage-based';
  basePrice: number;
  currency: string;
  unit: string;
  tiers?: PricingTier[];
  freeTier?: FreeTier;
}

export interface PricingTier {
  name: string;
  minUsage: number;
  maxUsage?: number;
  price: number;
  features: string[];
}

export interface FreeTier {
  requests: number;
  users: number;
  storage: number;
  features: string[];
}

export interface AuthenticationConfig {
  type: AuthenticationType;
  credentials: Credentials;
  scopes: string[];
  permissions: Permission[];
  expiresAt?: number;
  refreshToken?: string;
}

export type AuthenticationType = 
  | 'oauth2' 
  | 'api-key' 
  | 'basic-auth' 
  | 'bearer-token' 
  | 'jwt' 
  | 'custom';

export interface Credentials {
  clientId?: string;
  clientSecret?: string;
  apiKey?: string;
  username?: string;
  password?: string;
  token?: string;
  custom?: Record<string, string>;
}

export interface Permission {
  resource: string;
  action: 'read' | 'write' | 'delete' | 'admin';
  scope: string;
  granted: boolean;
}

export interface ConnectionConfig {
  // General Settings
  enabled: boolean;
  autoSync: boolean;
  syncInterval: number; // in minutes
  
  // Data Settings
  dataRetention: number; // in days
  compressionEnabled: boolean;
  encryptionEnabled: boolean;
  
  // Rate Limiting
  rateLimit: RateLimitConfig;
  
  // Error Handling
  errorHandling: ErrorHandlingConfig;
  
  // Custom Settings
  customSettings: Record<string, any>;
}

export interface RateLimitConfig {
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  burstLimit: number;
  retryAfter: number; // in seconds
}

export interface ErrorHandlingConfig {
  maxRetries: number;
  retryDelay: number; // in seconds
  backoffMultiplier: number;
  timeout: number; // in seconds
  circuitBreaker: boolean;
  fallbackEnabled: boolean;
}

export interface ConnectionStatus {
  status: ConnectionStatusType;
  lastSync?: number;
  nextSync?: number;
  health: HealthStatus;
  errors: ConnectionError[];
  warnings: ConnectionWarning[];
  metrics: ConnectionMetrics;
}

export type ConnectionStatusType = 
  | 'active' 
  | 'inactive' 
  | 'connecting' 
  | 'disconnected' 
  | 'error' 
  | 'maintenance' 
  | 'suspended';

export interface HealthStatus {
  overall: 'healthy' | 'degraded' | 'unhealthy';
  lastCheck: number;
  responseTime: number;
  availability: number;
  checks: HealthCheck[];
}

export interface HealthCheck {
  name: string;
  status: 'pass' | 'fail' | 'warn';
  message: string;
  duration: number;
  timestamp: number;
}

export interface ConnectionError {
  id: string;
  type: 'authentication' | 'network' | 'rate-limit' | 'permission' | 'data' | 'system';
  message: string;
  details?: string;
  timestamp: number;
  resolved: boolean;
  retryCount: number;
}

export interface ConnectionWarning {
  id: string;
  type: 'performance' | 'quota' | 'deprecation' | 'security' | 'data';
  message: string;
  details?: string;
  timestamp: number;
  acknowledged: boolean;
}

export interface ConnectionMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  lastRequestTime: number;
  dataTransferred: number; // in bytes
  quotaUsed: number;
  quotaLimit: number;
}

export interface DataMapping {
  // Field Mappings
  fieldMappings: FieldMapping[];
  
  // Data Transformations
  transformations: DataTransformation[];
  
  // Validation Rules
  validationRules: ValidationRule[];
  
  // Data Types
  dataTypes: DataTypeMapping[];
}

export interface FieldMapping {
  sourceField: string;
  targetField: string;
  transformation?: string;
  required: boolean;
  defaultValue?: any;
  description?: string;
}

export interface DataTransformation {
  name: string;
  type: 'format' | 'convert' | 'filter' | 'aggregate' | 'custom';
  sourceFields: string[];
  targetField: string;
  function: string;
  parameters: Record<string, any>;
}

export interface ValidationRule {
  field: string;
  rule: 'required' | 'format' | 'range' | 'length' | 'custom';
  value: any;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

export interface DataTypeMapping {
  sourceType: string;
  targetType: string;
  conversion: 'direct' | 'transform' | 'custom';
  function?: string;
  parameters?: Record<string, any>;
}

export interface SyncConfig {
  // Sync Strategy
  strategy: SyncStrategy;
  
  // Sync Schedule
  schedule: SyncSchedule;
  
  // Data Selection
  dataSelection: DataSelection;
  
  // Conflict Resolution
  conflictResolution: ConflictResolution;
  
  // Sync History
  syncHistory: SyncHistory[];
}

export type SyncStrategy = 
  | 'full-sync' 
  | 'incremental' 
  | 'real-time' 
  | 'on-demand' 
  | 'hybrid';

export interface SyncSchedule {
  enabled: boolean;
  frequency: 'continuous' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'custom';
  interval?: number; // in minutes
  schedule?: string; // cron expression
  timezone: string;
  businessHours?: BusinessHours;
}

export interface BusinessHours {
  enabled: boolean;
  timezone: string;
  days: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
  startTime: string; // HH:MM
  endTime: string; // HH:MM
}

export interface DataSelection {
  includeFields: string[];
  excludeFields: string[];
  filters: DataFilter[];
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DataFilter {
  field: string;
  operator: 'equals' | 'not-equals' | 'greater-than' | 'less-than' | 'contains' | 'in' | 'between';
  value: any;
  logic?: 'and' | 'or';
}

export interface ConflictResolution {
  strategy: 'source-wins' | 'target-wins' | 'manual' | 'custom';
  customFunction?: string;
  notifyOnConflict: boolean;
  conflictThreshold: number;
}

export interface SyncHistory {
  id: string;
  startedAt: number;
  completedAt?: number;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  recordsProcessed: number;
  recordsCreated: number;
  recordsUpdated: number;
  recordsDeleted: number;
  errors: number;
  warnings: number;
  duration: number; // in seconds
  details?: string;
}

export interface UsageInfo {
  // Current Usage
  currentUsage: CurrentUsage;
  
  // Usage Limits
  limits: UsageLimits;
  
  // Usage History
  history: UsageHistory[];
  
  // Billing
  billing: BillingInfo;
}

export interface CurrentUsage {
  requests: number;
  dataTransfer: number; // in bytes
  storage: number; // in bytes
  users: number;
  period: 'daily' | 'weekly' | 'monthly';
  resetDate: number;
}

export interface UsageLimits {
  maxRequests: number;
  maxDataTransfer: number; // in bytes
  maxStorage: number; // in bytes
  maxUsers: number;
  rateLimit: number; // requests per minute
  burstLimit: number;
}

export interface UsageHistory {
  period: string;
  requests: number;
  dataTransfer: number;
  storage: number;
  users: number;
  cost: number;
  timestamp: number;
}

export interface BillingInfo {
  plan: string;
  billingCycle: 'monthly' | 'yearly' | 'usage-based';
  nextBillingDate: number;
  currentCost: number;
  projectedCost: number;
  currency: string;
  paymentMethod?: string;
}

export interface SecurityConfig {
  // Encryption
  encryption: EncryptionConfig;
  
  // Access Control
  accessControl: AccessControlConfig;
  
  // Audit Logging
  auditLogging: AuditLoggingConfig;
  
  // Compliance
  compliance: ComplianceConfig;
}

export interface EncryptionConfig {
  enabled: boolean;
  algorithm: string;
  keyRotation: number; // in days
  keyStorage: 'local' | 'cloud' | 'hsm';
}

export interface AccessControlConfig {
  ipWhitelist: string[];
  ipBlacklist: string[];
  userRestrictions: string[];
  roleRestrictions: string[];
  timeRestrictions: TimeRestriction[];
}

export interface TimeRestriction {
  days: string[];
  startTime: string;
  endTime: string;
  timezone: string;
}

export interface AuditLoggingConfig {
  enabled: boolean;
  logLevel: 'minimal' | 'standard' | 'detailed';
  retentionDays: number;
  includeData: boolean;
  destinations: string[];
}

export interface ComplianceConfig {
  standards: string[]; // GDPR, HIPAA, SOC2, etc.
  dataClassification: 'public' | 'internal' | 'confidential' | 'restricted';
  dataRetention: number; // in days
  rightToErasure: boolean;
  dataPortability: boolean;
}

export interface ConnectionTimestamps {
  createdAt: number;
  updatedAt: number;
  lastUsed: number;
  lastSync?: number;
  expiresAt?: number;
}

// API Endpoint Definitions for Connections
export interface ConnectionsAPI {
  // CRUD Operations
  createConnection: (connection: Omit<Connection, 'id' | 'timestamps'>) => Promise<Connection>;
  getConnection: (id: string) => Promise<Connection>;
  updateConnection: (id: string, updates: Partial<Connection>) => Promise<Connection>;
  deleteConnection: (id: string) => Promise<void>;
  listConnections: (filters?: ConnectionFilters) => Promise<Connection[]>;
  
  // Authentication
  authenticate: (connectionId: string, credentials: Credentials) => Promise<AuthenticationResult>;
  refreshToken: (connectionId: string) => Promise<AuthenticationResult>;
  revokeAccess: (connectionId: string) => Promise<void>;
  
  // Testing
  testConnection: (connectionId: string) => Promise<ConnectionTestResult>;
  validateCredentials: (type: ConnectionType, credentials: Credentials) => Promise<ValidationResult>;
  
  // Sync Operations
  startSync: (connectionId: string, config?: Partial<SyncConfig>) => Promise<SyncResult>;
  stopSync: (connectionId: string) => Promise<void>;
  getSyncStatus: (connectionId: string) => Promise<SyncStatus>;
  getSyncHistory: (connectionId: string, limit?: number) => Promise<SyncHistory[]>;
  
  // Data Operations
  fetchData: (connectionId: string, query: DataQuery) => Promise<DataResult>;
  pushData: (connectionId: string, data: any) => Promise<DataResult>;
  updateData: (connectionId: string, id: string, data: any) => Promise<DataResult>;
  deleteData: (connectionId: string, id: string) => Promise<DataResult>;
  
  // Health & Monitoring
  getHealth: (connectionId: string) => Promise<HealthStatus>;
  getMetrics: (connectionId: string, timeRange: TimeRange) => Promise<ConnectionMetrics>;
  getUsage: (connectionId: string) => Promise<UsageInfo>;
  
  // Configuration
  updateConfig: (connectionId: string, config: Partial<ConnectionConfig>) => Promise<void>;
  updateDataMapping: (connectionId: string, mapping: Partial<DataMapping>) => Promise<void>;
  updateSyncConfig: (connectionId: string, config: Partial<SyncConfig>) => Promise<void>;
}

export interface ConnectionFilters {
  type?: ConnectionType[];
  status?: ConnectionStatusType[];
  service?: string[];
  enabled?: boolean;
  search?: string;
}

export interface AuthenticationResult {
  success: boolean;
  token?: string;
  refreshToken?: string;
  expiresAt?: number;
  scopes?: string[];
  error?: string;
}

export interface ConnectionTestResult {
  success: boolean;
  responseTime: number;
  capabilities: ServiceCapability[];
  errors: string[];
  warnings: string[];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export interface SyncResult {
  syncId: string;
  status: 'started' | 'running' | 'completed' | 'failed';
  estimatedDuration?: number;
  progress?: number;
}

export interface SyncStatus {
  status: 'idle' | 'running' | 'paused' | 'error';
  currentSync?: string;
  progress?: number;
  lastSync?: number;
  nextSync?: number;
  errors: string[];
}

export interface DataQuery {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  parameters?: Record<string, any>;
  headers?: Record<string, string>;
  body?: any;
  filters?: DataFilter[];
  limit?: number;
  offset?: number;
}

export interface DataResult {
  success: boolean;
  data?: any;
  total?: number;
  errors?: string[];
  warnings?: string[];
  metadata?: Record<string, any>;
}

export interface TimeRange {
  start: number;
  end: number;
}

// Tool Function Definitions for Connections
export interface ConnectionsTools {
  // Connection Management
  createConnection: {
    name: 'create_connection';
    description: 'Create a new third-party connection';
    parameters: {
      type: ConnectionType;
      name: string;
      service: ServiceInfo;
      authentication: AuthenticationConfig;
    };
    returns: Connection;
  };
  
  testConnection: {
    name: 'test_connection';
    description: 'Test a connection to ensure it works';
    parameters: {
      connectionId: string;
    };
    returns: ConnectionTestResult;
  };
  
  // Authentication
  authenticate: {
    name: 'authenticate_connection';
    description: 'Authenticate with a third-party service';
    parameters: {
      connectionId: string;
      credentials: Credentials;
    };
    returns: AuthenticationResult;
  };
  
  // Data Operations
  fetchData: {
    name: 'fetch_connection_data';
    description: 'Fetch data from a connected service';
    parameters: {
      connectionId: string;
      query: DataQuery;
    };
    returns: DataResult;
  };
  
  pushData: {
    name: 'push_data_to_connection';
    description: 'Push data to a connected service';
    parameters: {
      connectionId: string;
      data: any;
      endpoint: string;
    };
    returns: DataResult;
  };
  
  // Sync Operations
  startSync: {
    name: 'start_connection_sync';
    description: 'Start syncing data with a connection';
    parameters: {
      connectionId: string;
      config?: Partial<SyncConfig>;
    };
    returns: SyncResult;
  };
  
  getSyncStatus: {
    name: 'get_sync_status';
    description: 'Get the current sync status';
    parameters: {
      connectionId: string;
    };
    returns: SyncStatus;
  };
  
  // Health & Monitoring
  getConnectionHealth: {
    name: 'get_connection_health';
    description: 'Get the health status of a connection';
    parameters: {
      connectionId: string;
    };
    returns: HealthStatus;
  };
  
  getConnectionMetrics: {
    name: 'get_connection_metrics';
    description: 'Get metrics for a connection';
    parameters: {
      connectionId: string;
      timeRange: TimeRange;
    };
    returns: ConnectionMetrics;
  };
  
  // Configuration
  updateConnectionConfig: {
    name: 'update_connection_config';
    description: 'Update connection configuration';
    parameters: {
      connectionId: string;
      config: Partial<ConnectionConfig>;
    };
    returns: { success: boolean; updatedConfig: ConnectionConfig };
  };
}

// Validation Schemas
export const ConnectionValidation = {
  id: { type: 'string', required: true, pattern: '^conn_[a-zA-Z0-9_-]+$' },
  name: { type: 'string', required: true, minLength: 1, maxLength: 100 },
  type: { type: 'string', required: true, enum: ['notion', 'google-docs', 'excel', 'palantir', 'airtable', 'confluence', 'custom'] },
  service: { type: 'object', required: true },
  authentication: { type: 'object', required: true },
  configuration: { type: 'object', required: true },
  status: { type: 'object', required: true },
  timestamps: { type: 'object', required: true }
};

// Default Values
export const DefaultConnection: Partial<Connection> = {
  type: 'custom',
  service: {
    provider: 'custom',
    serviceName: 'Custom Service',
    version: '1.0.0',
    baseUrl: '',
    documentation: '',
    capabilities: [],
    limitations: [],
    pricing: {
      model: 'free',
      basePrice: 0,
      currency: 'USD',
      unit: 'request'
    }
  },
  authentication: {
    type: 'api-key',
    credentials: {},
    scopes: [],
    permissions: []
  },
  configuration: {
    enabled: true,
    autoSync: false,
    syncInterval: 60,
    dataRetention: 365,
    compressionEnabled: true,
    encryptionEnabled: true,
    rateLimit: {
      requestsPerMinute: 60,
      requestsPerHour: 1000,
      requestsPerDay: 10000,
      burstLimit: 10,
      retryAfter: 60
    },
    errorHandling: {
      maxRetries: 3,
      retryDelay: 5,
      backoffMultiplier: 2,
      timeout: 30,
      circuitBreaker: true,
      fallbackEnabled: false
    },
    customSettings: {}
  },
  status: {
    status: 'inactive',
    health: {
      overall: 'unhealthy',
      lastCheck: Date.now(),
      responseTime: 0,
      availability: 0,
      checks: []
    },
    errors: [],
    warnings: [],
    metrics: {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      lastRequestTime: 0,
      dataTransferred: 0,
      quotaUsed: 0,
      quotaLimit: 0
    }
  },
  dataMapping: {
    fieldMappings: [],
    transformations: [],
    validationRules: [],
    dataTypes: []
  },
  syncConfig: {
    strategy: 'on-demand',
    schedule: {
      enabled: false,
      frequency: 'daily',
      timezone: 'UTC'
    },
    dataSelection: {
      includeFields: [],
      excludeFields: [],
      filters: []
    },
    conflictResolution: {
      strategy: 'source-wins',
      notifyOnConflict: true,
      conflictThreshold: 0.1
    },
    syncHistory: []
  },
  usage: {
    currentUsage: {
      requests: 0,
      dataTransfer: 0,
      storage: 0,
      users: 0,
      period: 'monthly',
      resetDate: Date.now() + 30 * 24 * 60 * 60 * 1000
    },
    limits: {
      maxRequests: 10000,
      maxDataTransfer: 1000000000, // 1GB
      maxStorage: 10000000000, // 10GB
      maxUsers: 100,
      rateLimit: 60,
      burstLimit: 10
    },
    history: [],
    billing: {
      plan: 'free',
      billingCycle: 'monthly',
      nextBillingDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
      currentCost: 0,
      projectedCost: 0,
      currency: 'USD'
    }
  },
  security: {
    encryption: {
      enabled: true,
      algorithm: 'AES-256',
      keyRotation: 90,
      keyStorage: 'cloud'
    },
    accessControl: {
      ipWhitelist: [],
      ipBlacklist: [],
      userRestrictions: [],
      roleRestrictions: [],
      timeRestrictions: []
    },
    auditLogging: {
      enabled: true,
      logLevel: 'standard',
      retentionDays: 90,
      includeData: false,
      destinations: ['local']
    },
    compliance: {
      standards: ['GDPR'],
      dataClassification: 'internal',
      dataRetention: 365,
      rightToErasure: true,
      dataPortability: true
    }
  },
  timestamps: {
    createdAt: Date.now(),
    updatedAt: Date.now(),
    lastUsed: Date.now()
  }
};
