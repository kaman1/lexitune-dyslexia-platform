/**
 * Analytics & Metrics Schema
 * 
 * This schema defines the structure for analytics and metrics in the AI Agent Studio.
 * Analytics track learning progress, model performance, and platform usage.
 * 
 * @version 1.0.0
 * @author TEKIMAX Research & Development
 */

export interface Analytics {
  // Core Identification
  id: string;
  type: AnalyticsType;
  name: string;
  description?: string;
  
  // Data Collection
  dataCollection: DataCollection;
  
  // Metrics & KPIs
  metrics: Metrics;
  
  // Visualizations
  visualizations: Visualization[];
  
  // Reports
  reports: Report[];
  
  // Timestamps
  timestamps: AnalyticsTimestamps;
}

export type AnalyticsType = 
  | 'learning-progress' 
  | 'model-performance' 
  | 'user-engagement' 
  | 'content-effectiveness' 
  | 'system-performance' 
  | 'business-metrics';

export interface DataCollection {
  sources: DataSource[];
  collectionMethods: CollectionMethod[];
  frequency: CollectionFrequency;
  retention: DataRetention;
  privacy: PrivacySettings;
}

export interface DataSource {
  id: string;
  name: string;
  type: 'user-interaction' | 'system-log' | 'api-call' | 'database' | 'external';
  endpoint?: string;
  authentication?: AuthenticationConfig;
  schema: Record<string, any>;
}

export interface CollectionMethod {
  method: 'real-time' | 'batch' | 'event-driven' | 'scheduled';
  interval?: number; // in seconds
  triggers?: string[];
  filters?: Record<string, any>;
}

export interface CollectionFrequency {
  type: 'continuous' | 'periodic' | 'on-demand';
  interval?: number; // in seconds
  schedule?: string; // cron expression
}

export interface DataRetention {
  duration: number; // in days
  archiveAfter: number; // in days
  deleteAfter: number; // in days
  compression: boolean;
}

export interface AuthenticationConfig {
  type: 'api-key' | 'oauth' | 'basic' | 'bearer';
  credentials: Record<string, string>;
}

export interface PrivacySettings {
  anonymization: boolean;
  encryption: boolean;
  accessControl: string[];
  compliance: string[]; // GDPR, CCPA, etc.
}

export interface Metrics {
  // Learning Metrics
  learningMetrics: LearningMetrics;
  
  // Performance Metrics
  performanceMetrics: PerformanceMetrics;
  
  // Engagement Metrics
  engagementMetrics: EngagementMetrics;
  
  // Business Metrics
  businessMetrics: BusinessMetrics;
  
  // System Metrics
  systemMetrics: SystemMetrics;
}

export interface LearningMetrics {
  // Progress Tracking
  progressMetrics: ProgressMetrics;
  
  // Knowledge Retention
  retentionMetrics: RetentionMetrics;
  
  // Skill Development
  skillMetrics: SkillMetrics;
  
  // Learning Effectiveness
  effectivenessMetrics: EffectivenessMetrics;
}

export interface ProgressMetrics {
  completionRate: number;
  averageProgress: number;
  progressDistribution: DistributionData;
  progressTrends: TrendData[];
  milestoneAchievements: MilestoneData[];
}

export interface RetentionMetrics {
  shortTermRetention: number; // 24 hours
  mediumTermRetention: number; // 7 days
  longTermRetention: number; // 30 days
  retentionBySubject: Record<string, number>;
  retentionFactors: RetentionFactor[];
}

export interface SkillMetrics {
  skillDevelopmentRate: number;
  skillMasteryLevels: Record<string, number>;
  skillGaps: SkillGap[];
  skillCorrelations: SkillCorrelation[];
}

export interface EffectivenessMetrics {
  learningVelocity: number;
  comprehensionRate: number;
  applicationRate: number;
  transferRate: number;
  effectivenessByMethod: Record<string, number>;
}

export interface PerformanceMetrics {
  // Model Performance
  modelPerformance: ModelPerformanceMetrics;
  
  // System Performance
  systemPerformance: SystemPerformanceMetrics;
  
  // API Performance
  apiPerformance: APIPerformanceMetrics;
}

export interface ModelPerformanceMetrics {
  accuracy: number;
  responseTime: number;
  throughput: number;
  errorRate: number;
  costPerRequest: number;
  utilizationRate: number;
}

export interface SystemPerformanceMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
  uptime: number;
  errorRate: number;
}

export interface APIPerformanceMetrics {
  responseTime: number;
  throughput: number;
  errorRate: number;
  availability: number;
  rateLimitHits: number;
}

export interface EngagementMetrics {
  // User Engagement
  userEngagement: UserEngagementMetrics;
  
  // Content Engagement
  contentEngagement: ContentEngagementMetrics;
  
  // Feature Engagement
  featureEngagement: FeatureEngagementMetrics;
}

export interface UserEngagementMetrics {
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  sessionDuration: number;
  sessionFrequency: number;
  retentionRate: number;
}

export interface ContentEngagementMetrics {
  contentViews: number;
  contentCompletion: number;
  contentSharing: number;
  contentRating: number;
  contentBookmarks: number;
  contentDownloads: number;
}

export interface FeatureEngagementMetrics {
  featureUsage: Record<string, number>;
  featureAdoption: Record<string, number>;
  featureRetention: Record<string, number>;
  featureSatisfaction: Record<string, number>;
}

export interface BusinessMetrics {
  // Revenue Metrics
  revenueMetrics: RevenueMetrics;
  
  // User Metrics
  userMetrics: UserBusinessMetrics;
  
  // Growth Metrics
  growthMetrics: GrowthMetrics;
}

export interface RevenueMetrics {
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  averageRevenuePerUser: number;
  customerLifetimeValue: number;
  churnRate: number;
}

export interface UserBusinessMetrics {
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
  premiumUsers: number;
  userGrowthRate: number;
}

export interface GrowthMetrics {
  userGrowth: number;
  revenueGrowth: number;
  engagementGrowth: number;
  marketPenetration: number;
  viralCoefficient: number;
}

export interface SystemMetrics {
  // Infrastructure Metrics
  infrastructureMetrics: InfrastructureMetrics;
  
  // Security Metrics
  securityMetrics: SecurityMetrics;
  
  // Quality Metrics
  qualityMetrics: QualityMetrics;
}

export interface InfrastructureMetrics {
  serverCount: number;
  serverUtilization: number;
  databaseSize: number;
  storageUsage: number;
  bandwidthUsage: number;
  costPerUser: number;
}

export interface SecurityMetrics {
  securityIncidents: number;
  failedLogins: number;
  dataBreaches: number;
  complianceScore: number;
  securityAudits: number;
}

export interface QualityMetrics {
  bugCount: number;
  bugResolutionTime: number;
  userSatisfaction: number;
  systemReliability: number;
  codeQuality: number;
}

export interface Visualization {
  id: string;
  name: string;
  type: VisualizationType;
  data: VisualizationData;
  configuration: VisualizationConfig;
  filters: VisualizationFilter[];
}

export type VisualizationType = 
  | 'line-chart' 
  | 'bar-chart' 
  | 'pie-chart' 
  | 'area-chart' 
  | 'scatter-plot' 
  | 'heatmap' 
  | 'gauge' 
  | 'table' 
  | 'kpi-card';

export interface VisualizationData {
  source: string;
  query: string;
  parameters: Record<string, any>;
  refreshInterval: number;
  cacheDuration: number;
}

export interface VisualizationConfig {
  title: string;
  description?: string;
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  colors?: string[];
  size?: { width: number; height: number };
  interactive: boolean;
  exportable: boolean;
}

export interface AxisConfig {
  label: string;
  type: 'linear' | 'logarithmic' | 'categorical' | 'time';
  format?: string;
  min?: number;
  max?: number;
}

export interface VisualizationFilter {
  field: string;
  operator: 'equals' | 'not-equals' | 'greater-than' | 'less-than' | 'contains' | 'in';
  value: any;
  label: string;
}

export interface Report {
  id: string;
  name: string;
  type: ReportType;
  schedule: ReportSchedule;
  recipients: ReportRecipient[];
  content: ReportContent;
  format: ReportFormat;
}

export type ReportType = 
  | 'daily' 
  | 'weekly' 
  | 'monthly' 
  | 'quarterly' 
  | 'annual' 
  | 'ad-hoc';

export interface ReportSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual' | 'on-demand';
  dayOfWeek?: number; // 0-6
  dayOfMonth?: number; // 1-31
  time: string; // HH:MM
  timezone: string;
}

export interface ReportRecipient {
  email: string;
  name: string;
  role: string;
  preferences: ReportPreferences;
}

export interface ReportPreferences {
  format: 'pdf' | 'excel' | 'csv' | 'html';
  sections: string[];
  detailLevel: 'summary' | 'detailed' | 'comprehensive';
}

export interface ReportContent {
  sections: ReportSection[];
  visualizations: string[];
  summary: string;
  insights: string[];
  recommendations: string[];
}

export interface ReportSection {
  title: string;
  content: string;
  metrics: string[];
  visualizations: string[];
}

export interface ReportFormat {
  template: string;
  branding: BrandingConfig;
  layout: LayoutConfig;
  styling: StylingConfig;
}

export interface BrandingConfig {
  logo?: string;
  colors: string[];
  fonts: string[];
  companyName: string;
}

export interface LayoutConfig {
  orientation: 'portrait' | 'landscape';
  margins: { top: number; right: number; bottom: number; left: number };
  header: boolean;
  footer: boolean;
  pageNumbers: boolean;
}

export interface StylingConfig {
  theme: 'light' | 'dark' | 'custom';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  fontSize: number;
}

// Supporting Types
export interface DistributionData {
  buckets: BucketData[];
  mean: number;
  median: number;
  mode: number;
  standardDeviation: number;
}

export interface BucketData {
  range: { min: number; max: number };
  count: number;
  percentage: number;
}

export interface TrendData {
  timestamp: number;
  value: number;
  change: number;
  changePercentage: number;
}

export interface MilestoneData {
  milestone: string;
  achieved: number;
  total: number;
  percentage: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface RetentionFactor {
  factor: string;
  impact: number;
  correlation: number;
  description: string;
}

export interface SkillGap {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  gap: number;
  priority: 'low' | 'medium' | 'high';
}

export interface SkillCorrelation {
  skill1: string;
  skill2: string;
  correlation: number;
  significance: number;
}

export interface AnalyticsTimestamps {
  createdAt: number;
  updatedAt: number;
  lastCalculated: number;
  nextCalculation?: number;
}

// API Endpoint Definitions for Analytics
export interface AnalyticsAPI {
  // CRUD Operations
  createAnalytics: (analytics: Omit<Analytics, 'id' | 'timestamps'>) => Promise<Analytics>;
  getAnalytics: (id: string) => Promise<Analytics>;
  updateAnalytics: (id: string, updates: Partial<Analytics>) => Promise<Analytics>;
  deleteAnalytics: (id: string) => Promise<void>;
  listAnalytics: (filters?: AnalyticsFilters) => Promise<Analytics[]>;
  
  // Data Collection
  collectData: (sourceId: string, data: any) => Promise<void>;
  getData: (sourceId: string, filters?: DataFilters) => Promise<any[]>;
  
  // Metrics Calculation
  calculateMetrics: (analyticsId: string, timeRange: TimeRange) => Promise<Metrics>;
  getMetrics: (analyticsId: string, timeRange: TimeRange) => Promise<Metrics>;
  
  // Visualizations
  createVisualization: (analyticsId: string, visualization: Omit<Visualization, 'id'>) => Promise<Visualization>;
  getVisualization: (id: string) => Promise<Visualization>;
  updateVisualization: (id: string, updates: Partial<Visualization>) => Promise<Visualization>;
  deleteVisualization: (id: string) => Promise<void>;
  
  // Reports
  createReport: (analyticsId: string, report: Omit<Report, 'id'>) => Promise<Report>;
  generateReport: (reportId: string, timeRange: TimeRange) => Promise<ReportContent>;
  scheduleReport: (reportId: string, schedule: ReportSchedule) => Promise<void>;
  
  // Real-time Analytics
  getRealTimeMetrics: (analyticsId: string) => Promise<Metrics>;
  subscribeToUpdates: (analyticsId: string, callback: (metrics: Metrics) => void) => Promise<string>;
  unsubscribeFromUpdates: (subscriptionId: string) => Promise<void>;
}

export interface AnalyticsFilters {
  type?: AnalyticsType[];
  name?: string;
  createdBy?: string;
  dateRange?: TimeRange;
  tags?: string[];
}

export interface DataFilters {
  timeRange?: TimeRange;
  fields?: string[];
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface TimeRange {
  start: number;
  end: number;
}

// Tool Function Definitions for Analytics
export interface AnalyticsTools {
  // Analytics Management
  createAnalytics: {
    name: 'create_analytics';
    description: 'Create a new analytics configuration';
    parameters: {
      type: AnalyticsType;
      name: string;
      description?: string;
      dataCollection: DataCollection;
    };
    returns: Analytics;
  };
  
  // Metrics Calculation
  calculateMetrics: {
    name: 'calculate_metrics';
    description: 'Calculate metrics for analytics';
    parameters: {
      analyticsId: string;
      timeRange: TimeRange;
      metrics?: string[];
    };
    returns: Metrics;
  };
  
  getLearningMetrics: {
    name: 'get_learning_metrics';
    description: 'Get learning-specific metrics';
    parameters: {
      userId?: string;
      materialId?: string;
      timeRange: TimeRange;
    };
    returns: LearningMetrics;
  };
  
  getPerformanceMetrics: {
    name: 'get_performance_metrics';
    description: 'Get performance metrics';
    parameters: {
      modelId?: string;
      systemId?: string;
      timeRange: TimeRange;
    };
    returns: PerformanceMetrics;
  };
  
  getEngagementMetrics: {
    name: 'get_engagement_metrics';
    description: 'Get user engagement metrics';
    parameters: {
      userId?: string;
      timeRange: TimeRange;
    };
    returns: EngagementMetrics;
  };
  
  // Visualization
  createVisualization: {
    name: 'create_visualization';
    description: 'Create a data visualization';
    parameters: {
      analyticsId: string;
      type: VisualizationType;
      data: VisualizationData;
      configuration: VisualizationConfig;
    };
    returns: Visualization;
  };
  
  // Reporting
  generateReport: {
    name: 'generate_report';
    description: 'Generate an analytics report';
    parameters: {
      reportId: string;
      timeRange: TimeRange;
      format?: 'pdf' | 'excel' | 'csv' | 'html';
    };
    returns: ReportContent;
  };
  
  // Real-time Analytics
  getRealTimeMetrics: {
    name: 'get_realtime_metrics';
    description: 'Get real-time metrics';
    parameters: {
      analyticsId: string;
      metrics?: string[];
    };
    returns: Metrics;
  };
}

// Validation Schemas
export const AnalyticsValidation = {
  id: { type: 'string', required: true, pattern: '^analytics_[a-zA-Z0-9_-]+$' },
  type: { type: 'string', required: true, enum: ['learning-progress', 'model-performance', 'user-engagement', 'content-effectiveness', 'system-performance', 'business-metrics'] },
  name: { type: 'string', required: true, minLength: 1, maxLength: 100 },
  dataCollection: { type: 'object', required: true },
  metrics: { type: 'object', required: true },
  timestamps: { type: 'object', required: true }
};

// Default Values
export const DefaultAnalytics: Partial<Analytics> = {
  type: 'learning-progress',
  dataCollection: {
    sources: [],
    collectionMethods: [{
      method: 'real-time',
      interval: 60,
      triggers: [],
      filters: {}
    }],
    frequency: {
      type: 'continuous',
      interval: 60
    },
    retention: {
      duration: 365,
      archiveAfter: 90,
      deleteAfter: 1095,
      compression: true
    },
    privacy: {
      anonymization: true,
      encryption: true,
      accessControl: [],
      compliance: ['GDPR']
    }
  },
  metrics: {
    learningMetrics: {
      progressMetrics: {
        completionRate: 0,
        averageProgress: 0,
        progressDistribution: {
          buckets: [],
          mean: 0,
          median: 0,
          mode: 0,
          standardDeviation: 0
        },
        progressTrends: [],
        milestoneAchievements: []
      },
      retentionMetrics: {
        shortTermRetention: 0,
        mediumTermRetention: 0,
        longTermRetention: 0,
        retentionBySubject: {},
        retentionFactors: []
      },
      skillMetrics: {
        skillDevelopmentRate: 0,
        skillMasteryLevels: {},
        skillGaps: [],
        skillCorrelations: []
      },
      effectivenessMetrics: {
        learningVelocity: 0,
        comprehensionRate: 0,
        applicationRate: 0,
        transferRate: 0,
        effectivenessByMethod: {}
      }
    },
    performanceMetrics: {
      modelPerformance: {
        accuracy: 0,
        responseTime: 0,
        throughput: 0,
        errorRate: 0,
        costPerRequest: 0,
        utilizationRate: 0
      },
      systemPerformance: {
        cpuUsage: 0,
        memoryUsage: 0,
        diskUsage: 0,
        networkLatency: 0,
        uptime: 100,
        errorRate: 0
      },
      apiPerformance: {
        responseTime: 0,
        throughput: 0,
        errorRate: 0,
        availability: 100,
        rateLimitHits: 0
      }
    },
    engagementMetrics: {
      userEngagement: {
        dailyActiveUsers: 0,
        weeklyActiveUsers: 0,
        monthlyActiveUsers: 0,
        sessionDuration: 0,
        sessionFrequency: 0,
        retentionRate: 0
      },
      contentEngagement: {
        contentViews: 0,
        contentCompletion: 0,
        contentSharing: 0,
        contentRating: 0,
        contentBookmarks: 0,
        contentDownloads: 0
      },
      featureEngagement: {
        featureUsage: {},
        featureAdoption: {},
        featureRetention: {},
        featureSatisfaction: {}
      }
    },
    businessMetrics: {
      revenueMetrics: {
        totalRevenue: 0,
        monthlyRecurringRevenue: 0,
        averageRevenuePerUser: 0,
        customerLifetimeValue: 0,
        churnRate: 0
      },
      userMetrics: {
        totalUsers: 0,
        newUsers: 0,
        activeUsers: 0,
        premiumUsers: 0,
        userGrowthRate: 0
      },
      growthMetrics: {
        userGrowth: 0,
        revenueGrowth: 0,
        engagementGrowth: 0,
        marketPenetration: 0,
        viralCoefficient: 0
      }
    },
    systemMetrics: {
      infrastructureMetrics: {
        serverCount: 0,
        serverUtilization: 0,
        databaseSize: 0,
        storageUsage: 0,
        bandwidthUsage: 0,
        costPerUser: 0
      },
      securityMetrics: {
        securityIncidents: 0,
        failedLogins: 0,
        dataBreaches: 0,
        complianceScore: 100,
        securityAudits: 0
      },
      qualityMetrics: {
        bugCount: 0,
        bugResolutionTime: 0,
        userSatisfaction: 5,
        systemReliability: 100,
        codeQuality: 5
      }
    }
  },
  visualizations: [],
  reports: [],
  timestamps: {
    createdAt: Date.now(),
    updatedAt: Date.now(),
    lastCalculated: Date.now()
  }
};
