/**
 * API Endpoints Schema for AI Agent Studio Platform
 * 
 * This schema defines the comprehensive API endpoint structure for the AI Agent Studio
 * platform. It includes all REST endpoints, GraphQL schemas, WebSocket connections,
 * and real-time communication protocols for the learning platform.
 * 
 * @version 1.0.0
 * @author TEKIMAX Research & Development
 */

// ============================================================================
// BASE API INTERFACES
// ============================================================================

export interface APIEndpoint {
  id: string;
  name: string;
  path: string;
  method: HTTPMethod;
  description: string;
  category: APICategory;
  version: string;
  authentication: AuthenticationType;
  authorization: AuthorizationLevel;
  rateLimit: RateLimit;
  parameters: APIParameter[];
  responses: APIResponse[];
  errors: APIError[];
  examples: APIExample[];
  tags: string[];
  deprecated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface APIParameter {
  name: string;
  type: ParameterType;
  required: boolean;
  description: string;
  defaultValue?: any;
  validation: ValidationRule[];
  examples: any[];
}

export interface APIResponse {
  statusCode: number;
  description: string;
  schema: ResponseSchema;
  headers: ResponseHeader[];
  examples: any[];
}

export interface APIError {
  statusCode: number;
  code: string;
  message: string;
  description: string;
  resolution: string;
  examples: any[];
}

export interface APIExample {
  name: string;
  description: string;
  request: RequestExample;
  response: ResponseExample;
}

export interface RequestExample {
  headers: Record<string, string>;
  body: any;
  query: Record<string, any>;
  path: Record<string, any>;
}

export interface ResponseExample {
  statusCode: number;
  headers: Record<string, string>;
  body: any;
}

export interface ResponseSchema {
  type: string;
  properties: Record<string, any>;
  required: string[];
  examples: any[];
}

export interface ResponseHeader {
  name: string;
  type: string;
  description: string;
  required: boolean;
}

export interface ValidationRule {
  type: string;
  value: any;
  message: string;
}

export interface RateLimit {
  requests: number;
  window: string; // e.g., "1m", "1h", "1d"
  burst: number;
  scope: 'user' | 'ip' | 'global';
}

// ============================================================================
// AUTHENTICATION & AUTHORIZATION
// ============================================================================

export interface AuthenticationConfig {
  type: AuthenticationType;
  methods: AuthMethod[];
  providers: AuthProvider[];
  settings: AuthSettings;
}

export interface AuthMethod {
  type: 'jwt' | 'oauth2' | 'api_key' | 'basic' | 'bearer';
  name: string;
  description: string;
  enabled: boolean;
  settings: Record<string, any>;
}

export interface AuthProvider {
  type: 'google' | 'microsoft' | 'github' | 'linkedin' | 'apple' | 'custom';
  name: string;
  description: string;
  enabled: boolean;
  clientId: string;
  clientSecret: string;
  scopes: string[];
  settings: Record<string, any>;
}

export interface AuthSettings {
  tokenExpiry: number; // minutes
  refreshTokenExpiry: number; // days
  maxSessions: number;
  requireEmailVerification: boolean;
  requirePhoneVerification: boolean;
  passwordPolicy: PasswordPolicy;
  twoFactor: TwoFactorSettings;
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
  maxAge: number; // days
  historyCount: number;
}

export interface TwoFactorSettings {
  enabled: boolean;
  methods: ('sms' | 'email' | 'totp' | 'push')[];
  backupCodes: boolean;
  gracePeriod: number; // minutes
}

// ============================================================================
// API CATEGORIES
// ============================================================================

export interface APICategory {
  id: string;
  name: string;
  description: string;
  endpoints: APIEndpoint[];
  version: string;
  basePath: string;
  tags: string[];
  documentation: string;
}

// ============================================================================
// MODEL MANAGEMENT ENDPOINTS
// ============================================================================

export interface ModelManagementEndpoints {
  // Model CRUD
  createModel: APIEndpoint;
  getModel: APIEndpoint;
  updateModel: APIEndpoint;
  deleteModel: APIEndpoint;
  listModels: APIEndpoint;
  
  // Model Configuration
  configureModel: APIEndpoint;
  getModelConfig: APIEndpoint;
  updateModelConfig: APIEndpoint;
  resetModelConfig: APIEndpoint;
  
  // Model Testing
  testModel: APIEndpoint;
  benchmarkModel: APIEndpoint;
  validateModel: APIEndpoint;
  getModelMetrics: APIEndpoint;
  
  // Model Deployment
  deployModel: APIEndpoint;
  undeployModel: APIEndpoint;
  getDeploymentStatus: APIEndpoint;
  scaleModel: APIEndpoint;
  
  // Model Health
  getModelHealth: APIEndpoint;
  getModelLogs: APIEndpoint;
  getModelUsage: APIEndpoint;
  getModelCosts: APIEndpoint;
}

// ============================================================================
// LEARNING MATERIALS ENDPOINTS
// ============================================================================

export interface LearningMaterialsEndpoints {
  // Material CRUD
  createMaterial: APIEndpoint;
  getMaterial: APIEndpoint;
  updateMaterial: APIEndpoint;
  deleteMaterial: APIEndpoint;
  listMaterials: APIEndpoint;
  
  // Material Upload
  uploadMaterial: APIEndpoint;
  uploadBulk: APIEndpoint;
  getUploadStatus: APIEndpoint;
  cancelUpload: APIEndpoint;
  
  // Material Processing
  processMaterial: APIEndpoint;
  getProcessingStatus: APIEndpoint;
  reprocessMaterial: APIEndpoint;
  getProcessingResults: APIEndpoint;
  
  // Material Analysis
  analyzeMaterial: APIEndpoint;
  getAnalysisResults: APIEndpoint;
  updateAnalysis: APIEndpoint;
  getAnalysisHistory: APIEndpoint;
  
  // Material Search
  searchMaterials: APIEndpoint;
  filterMaterials: APIEndpoint;
  getMaterialRecommendations: APIEndpoint;
  getRelatedMaterials: APIEndpoint;
  
  // Material Sharing
  shareMaterial: APIEndpoint;
  getSharedMaterials: APIEndpoint;
  updateShareSettings: APIEndpoint;
  revokeAccess: APIEndpoint;
}

// ============================================================================
// USER PROFILE ENDPOINTS
// ============================================================================

export interface UserProfileEndpoints {
  // Profile CRUD
  createProfile: APIEndpoint;
  getProfile: APIEndpoint;
  updateProfile: APIEndpoint;
  deleteProfile: APIEndpoint;
  listProfiles: APIEndpoint;
  
  // Profile Settings
  updateSettings: APIEndpoint;
  getSettings: APIEndpoint;
  resetSettings: APIEndpoint;
  exportSettings: APIEndpoint;
  importSettings: APIEndpoint;
  
  // Profile Preferences
  updatePreferences: APIEndpoint;
  getPreferences: APIEndpoint;
  resetPreferences: APIEndpoint;
  getPreferenceHistory: APIEndpoint;
  
  // Profile Analytics
  getProfileAnalytics: APIEndpoint;
  getProfileInsights: APIEndpoint;
  getProfileRecommendations: APIEndpoint;
  updateProfileProgress: APIEndpoint;
  
  // Profile Security
  changePassword: APIEndpoint;
  updateSecuritySettings: APIEndpoint;
  getSecurityLog: APIEndpoint;
  enableTwoFactor: APIEndpoint;
  disableTwoFactor: APIEndpoint;
}

// ============================================================================
// ANALYTICS ENDPOINTS
// ============================================================================

export interface AnalyticsEndpoints {
  // Learning Analytics
  getLearningAnalytics: APIEndpoint;
  getProgressAnalytics: APIEndpoint;
  getPerformanceAnalytics: APIEndpoint;
  getEngagementAnalytics: APIEndpoint;
  
  // System Analytics
  getSystemAnalytics: APIEndpoint;
  getModelAnalytics: APIEndpoint;
  getUsageAnalytics: APIEndpoint;
  getCostAnalytics: APIEndpoint;
  
  // Custom Analytics
  createCustomAnalytics: APIEndpoint;
  getCustomAnalytics: APIEndpoint;
  updateCustomAnalytics: APIEndpoint;
  deleteCustomAnalytics: APIEndpoint;
  
  // Analytics Reports
  generateReport: APIEndpoint;
  getReport: APIEndpoint;
  listReports: APIEndpoint;
  deleteReport: APIEndpoint;
  scheduleReport: APIEndpoint;
  
  // Analytics Export
  exportAnalytics: APIEndpoint;
  getExportStatus: APIEndpoint;
  downloadExport: APIEndpoint;
}

// ============================================================================
// CONNECTIONS ENDPOINTS
// ============================================================================

export interface ConnectionsEndpoints {
  // Connection CRUD
  createConnection: APIEndpoint;
  getConnection: APIEndpoint;
  updateConnection: APIEndpoint;
  deleteConnection: APIEndpoint;
  listConnections: APIEndpoint;
  
  // Connection Testing
  testConnection: APIEndpoint;
  validateConnection: APIEndpoint;
  getConnectionStatus: APIEndpoint;
  getConnectionHealth: APIEndpoint;
  
  // Connection Sync
  syncConnection: APIEndpoint;
  getSyncStatus: APIEndpoint;
  cancelSync: APIEndpoint;
  getSyncHistory: APIEndpoint;
  
  // Connection Data
  getConnectionData: APIEndpoint;
  importData: APIEndpoint;
  exportData: APIEndpoint;
  getDataSchema: APIEndpoint;
  
  // Connection Settings
  updateConnectionSettings: APIEndpoint;
  getConnectionSettings: APIEndpoint;
  resetConnectionSettings: APIEndpoint;
  getConnectionLogs: APIEndpoint;
}

// ============================================================================
// TOOLS ENDPOINTS
// ============================================================================

export interface ToolsEndpoints {
  // Tool CRUD
  createTool: APIEndpoint;
  getTool: APIEndpoint;
  updateTool: APIEndpoint;
  deleteTool: APIEndpoint;
  listTools: APIEndpoint;
  
  // Tool Execution
  executeTool: APIEndpoint;
  getExecutionStatus: APIEndpoint;
  cancelExecution: APIEndpoint;
  getExecutionResults: APIEndpoint;
  
  // Tool Configuration
  configureTool: APIEndpoint;
  getToolConfig: APIEndpoint;
  updateToolConfig: APIEndpoint;
  resetToolConfig: APIEndpoint;
  
  // Tool Testing
  testTool: APIEndpoint;
  validateTool: APIEndpoint;
  benchmarkTool: APIEndpoint;
  getToolMetrics: APIEndpoint;
  
  // Tool Management
  enableTool: APIEndpoint;
  disableTool: APIEndpoint;
  getToolStatus: APIEndpoint;
  getToolLogs: APIEndpoint;
}

// ============================================================================
// PRONUNCIATION LEARNING ENDPOINTS
// ============================================================================

export interface PronunciationLearningEndpoints {
  // Speech Processing
  processSpeech: APIEndpoint;
  getSpeechResults: APIEndpoint;
  analyzePronunciation: APIEndpoint;
  getPronunciationResults: APIEndpoint;
  
  // Audio Processing
  processAudio: APIEndpoint;
  getAudioResults: APIEndpoint;
  enhanceAudio: APIEndpoint;
  getAudioQuality: APIEndpoint;
  
  // Learning Progress
  getLearningProgress: APIEndpoint;
  updateLearningProgress: APIEndpoint;
  getProgressHistory: APIEndpoint;
  getProgressInsights: APIEndpoint;
  
  // User Profiles
  getPronunciationProfile: APIEndpoint;
  updatePronunciationProfile: APIEndpoint;
  getProfileAnalytics: APIEndpoint;
  getProfileRecommendations: APIEndpoint;
  
  // Analytics
  getPronunciationAnalytics: APIEndpoint;
  getSpeechAnalytics: APIEndpoint;
  getLearningAnalytics: APIEndpoint;
  getPerformanceAnalytics: APIEndpoint;
}

// ============================================================================
// WEBSOCKET ENDPOINTS
// ============================================================================

export interface WebSocketEndpoints {
  // Real-time Communication
  realTimeChat: WebSocketEndpoint;
  realTimeSpeech: WebSocketEndpoint;
  realTimeAnalytics: WebSocketEndpoint;
  realTimeNotifications: WebSocketEndpoint;
  
  // Live Updates
  liveProgress: WebSocketEndpoint;
  liveAnalytics: WebSocketEndpoint;
  liveSystemStatus: WebSocketEndpoint;
  liveModelStatus: WebSocketEndpoint;
  
  // Collaboration
  collaborativeEditing: WebSocketEndpoint;
  sharedSessions: WebSocketEndpoint;
  realTimeFeedback: WebSocketEndpoint;
  liveCollaboration: WebSocketEndpoint;
}

export interface WebSocketEndpoint {
  id: string;
  name: string;
  path: string;
  description: string;
  events: WebSocketEvent[];
  authentication: AuthenticationType;
  rateLimit: RateLimit;
  examples: WebSocketExample[];
}

export interface WebSocketEvent {
  name: string;
  type: 'incoming' | 'outgoing';
  description: string;
  schema: any;
  examples: any[];
}

export interface WebSocketExample {
  name: string;
  description: string;
  connection: ConnectionExample;
  events: EventExample[];
}

export interface ConnectionExample {
  url: string;
  headers: Record<string, string>;
  query: Record<string, any>;
}

export interface EventExample {
  event: string;
  data: any;
  timestamp: Date;
}

// ============================================================================
// GRAPHQL SCHEMA
// ============================================================================

export interface GraphQLSchema {
  types: GraphQLType[];
  queries: GraphQLQuery[];
  mutations: GraphQLMutation[];
  subscriptions: GraphQLSubscription[];
  directives: GraphQLDirective[];
  scalars: GraphQLScalar[];
}

export interface GraphQLType {
  name: string;
  kind: 'OBJECT' | 'INTERFACE' | 'UNION' | 'ENUM' | 'INPUT_OBJECT' | 'SCALAR';
  description: string;
  fields: GraphQLField[];
  interfaces: string[];
  possibleTypes: string[];
  enumValues: GraphQLEnumValue[];
  inputFields: GraphQLInputField[];
}

export interface GraphQLField {
  name: string;
  type: string;
  description: string;
  args: GraphQLArgument[];
  isDeprecated: boolean;
  deprecationReason?: string;
}

export interface GraphQLArgument {
  name: string;
  type: string;
  description: string;
  defaultValue?: any;
}

export interface GraphQLEnumValue {
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReason?: string;
}

export interface GraphQLInputField {
  name: string;
  type: string;
  description: string;
  defaultValue?: any;
}

export interface GraphQLQuery {
  name: string;
  description: string;
  type: string;
  args: GraphQLArgument[];
  resolver: string;
  examples: GraphQLExample[];
}

export interface GraphQLMutation {
  name: string;
  description: string;
  type: string;
  args: GraphQLArgument[];
  resolver: string;
  examples: GraphQLExample[];
}

export interface GraphQLSubscription {
  name: string;
  description: string;
  type: string;
  args: GraphQLArgument[];
  resolver: string;
  examples: GraphQLExample[];
}

export interface GraphQLDirective {
  name: string;
  description: string;
  locations: string[];
  args: GraphQLArgument[];
}

export interface GraphQLScalar {
  name: string;
  description: string;
  serialize: string;
  parseValue: string;
  parseLiteral: string;
}

export interface GraphQLExample {
  name: string;
  description: string;
  query: string;
  variables: Record<string, any>;
  response: any;
}

// ============================================================================
// API DOCUMENTATION
// ============================================================================

export interface APIDocumentation {
  title: string;
  version: string;
  description: string;
  baseUrl: string;
  categories: APICategory[];
  authentication: AuthenticationConfig;
  rateLimits: RateLimit[];
  examples: APIDocumentationExample[];
  changelog: APIChangelog[];
  support: APISupport;
}

export interface APIDocumentationExample {
  name: string;
  description: string;
  category: string;
  endpoints: APIEndpoint[];
  flow: string;
  code: CodeExample[];
}

export interface CodeExample {
  language: string;
  title: string;
  code: string;
  description: string;
}

export interface APIChangelog {
  version: string;
  date: Date;
  changes: APIChange[];
  breaking: boolean;
  migration: string;
}

export interface APIChange {
  type: 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed' | 'security';
  description: string;
  endpoint?: string;
  impact: 'low' | 'medium' | 'high';
}

export interface APISupport {
  documentation: string;
  examples: string;
  community: string;
  support: string;
  status: string;
  contact: APIContact;
}

export interface APIContact {
  email: string;
  phone: string;
  website: string;
  slack: string;
  discord: string;
}

// ============================================================================
// ENUMS AND TYPES
// ============================================================================

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
export type ParameterType = 'string' | 'number' | 'boolean' | 'array' | 'object' | 'file' | 'date';
export type AuthenticationType = 'none' | 'api_key' | 'jwt' | 'oauth2' | 'basic' | 'bearer';
export type AuthorizationLevel = 'public' | 'user' | 'admin' | 'system' | 'custom';

// ============================================================================
// API ENDPOINT COLLECTIONS
// ============================================================================

export interface APIEndpointCollection {
  models: ModelManagementEndpoints;
  learningMaterials: LearningMaterialsEndpoints;
  userProfiles: UserProfileEndpoints;
  analytics: AnalyticsEndpoints;
  connections: ConnectionsEndpoints;
  tools: ToolsEndpoints;
  pronunciationLearning: PronunciationLearningEndpoints;
  websockets: WebSocketEndpoints;
  graphql: GraphQLSchema;
  documentation: APIDocumentation;
}

// ============================================================================
// EXPORT ALL INTERFACES
// ============================================================================

export * from './api-endpoints.schema';
