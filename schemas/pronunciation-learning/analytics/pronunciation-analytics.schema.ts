/**
 * Pronunciation Analytics Schema for Pronunciation Learning Platform
 * 
 * This schema defines the data structures and API endpoints for comprehensive
 * analytics in the pronunciation learning system. It handles learning analytics,
 * performance metrics, user engagement, and predictive insights.
 * 
 * @version 1.0.0
 * @author TEKIMAX Research & Development
 */

// ============================================================================
// LEARNING ANALYTICS INTERFACES
// ============================================================================

export interface LearningAnalytics {
  id: string;
  userId: string;
  sessionId: string;
  timestamp: Date;
  overall: OverallAnalytics;
  pronunciation: PronunciationAnalytics;
  fluency: FluencyAnalytics;
  prosody: ProsodyAnalytics;
  engagement: EngagementAnalytics;
  performance: PerformanceAnalytics;
  trends: TrendAnalytics;
  predictions: PredictionAnalytics;
  insights: InsightAnalytics;
  recommendations: RecommendationAnalytics;
  createdAt: Date;
  updatedAt: Date;
}

export interface OverallAnalytics {
  totalSessions: number;
  totalTime: number; // minutes
  averageSessionLength: number; // minutes
  completionRate: number; // 0-100
  improvementRate: number; // percentage
  consistency: number; // 0-100
  motivation: number; // 0-100
  satisfaction: number; // 0-100
  retention: number; // 0-100
  engagement: number; // 0-100
}

export interface PronunciationAnalytics {
  overallAccuracy: number; // 0-100
  phonemeAccuracy: PhonemeAnalytics[];
  wordAccuracy: WordAnalytics[];
  sentenceAccuracy: SentenceAnalytics[];
  paragraphAccuracy: ParagraphAnalytics[];
  improvementRate: number; // percentage
  consistency: number; // 0-100
  confidence: number; // 0-100
  clarity: number; // 0-100
  intelligibility: number; // 0-100
  naturalness: number; // 0-100
}

export interface PhonemeAnalytics {
  phoneme: string;
  accuracy: number; // 0-100
  practiceCount: number;
  improvementRate: number; // percentage
  consistency: number; // 0-100
  confidence: number; // 0-100
  difficulty: number; // 0-100
  mastery: number; // 0-100
  lastPractice: Date;
  trends: TrendData[];
}

export interface WordAnalytics {
  word: string;
  accuracy: number; // 0-100
  practiceCount: number;
  improvementRate: number; // percentage
  consistency: number; // 0-100
  confidence: number; // 0-100
  difficulty: number; // 0-100
  mastery: number; // 0-100
  lastPractice: Date;
  trends: TrendData[];
}

export interface SentenceAnalytics {
  sentence: string;
  accuracy: number; // 0-100
  practiceCount: number;
  improvementRate: number; // percentage
  consistency: number; // 0-100
  confidence: number; // 0-100
  difficulty: number; // 0-100
  mastery: number; // 0-100
  lastPractice: Date;
  trends: TrendData[];
}

export interface ParagraphAnalytics {
  paragraph: string;
  accuracy: number; // 0-100
  practiceCount: number;
  improvementRate: number; // percentage
  consistency: number; // 0-100
  confidence: number; // 0-100
  difficulty: number; // 0-100
  mastery: number; // 0-100
  lastPractice: Date;
  trends: TrendData[];
}

export interface FluencyAnalytics {
  speakingRate: number; // words per minute
  articulationRate: number; // syllables per second
  pauseRatio: number; // 0-1
  pauseCount: number;
  averagePauseLength: number; // seconds
  rhythmRegularity: number; // 0-100
  tempoVariation: number; // 0-100
  smoothness: number; // 0-100
  naturalness: number; // 0-100
  improvementRate: number; // percentage
  consistency: number; // 0-100
}

export interface ProsodyAnalytics {
  pitch: PitchAnalytics;
  intensity: IntensityAnalytics;
  rhythm: RhythmAnalytics;
  intonation: IntonationAnalytics;
  stress: StressAnalytics;
  overall: number; // 0-100
  improvementRate: number; // percentage
  consistency: number; // 0-100
}

export interface PitchAnalytics {
  mean: number; // Hz
  range: number; // Hz
  variation: number; // 0-100
  appropriateness: number; // 0-100
  naturalness: number; // 0-100
  improvementRate: number; // percentage
  consistency: number; // 0-100
  trends: TrendData[];
}

export interface IntensityAnalytics {
  mean: number; // dB
  range: number; // dB
  variation: number; // 0-100
  appropriateness: number; // 0-100
  naturalness: number; // 0-100
  improvementRate: number; // percentage
  consistency: number; // 0-100
  trends: TrendData[];
}

export interface RhythmAnalytics {
  tempo: number; // BPM
  regularity: number; // 0-100
  stressPattern: number[]; // stress levels
  appropriateness: number; // 0-100
  naturalness: number; // 0-100
  improvementRate: number; // percentage
  consistency: number; // 0-100
  trends: TrendData[];
}

export interface IntonationAnalytics {
  pattern: number[]; // pitch contour
  appropriateness: number; // 0-100
  expressiveness: number; // 0-100
  naturalness: number; // 0-100
  improvementRate: number; // percentage
  consistency: number; // 0-100
  trends: TrendData[];
}

export interface StressAnalytics {
  accuracy: number; // 0-100
  appropriateness: number; // 0-100
  naturalness: number; // 0-100
  improvementRate: number; // percentage
  consistency: number; // 0-100
  trends: TrendData[];
}

export interface EngagementAnalytics {
  sessionFrequency: number; // sessions per week
  sessionDuration: number; // average minutes
  totalTime: number; // total minutes
  completionRate: number; // 0-100
  returnRate: number; // 0-100
  progressRate: number; // 0-100
  motivation: number; // 0-100
  satisfaction: number; // 0-100
  retention: number; // 0-100
  socialEngagement: number; // 0-100
}

export interface PerformanceAnalytics {
  modelAccuracy: number; // 0-100
  processingSpeed: number; // milliseconds
  latency: number; // milliseconds
  throughput: number; // requests per second
  errorRate: number; // 0-100
  availability: number; // 0-100
  scalability: number; // 0-100
  resourceUsage: ResourceUsage;
  quality: QualityMetrics;
}

export interface ResourceUsage {
  cpu: number; // percentage
  memory: number; // percentage
  storage: number; // percentage
  network: number; // percentage
  gpu: number; // percentage
}

export interface QualityMetrics {
  audioQuality: number; // 0-100
  speechQuality: number; // 0-100
  recognitionAccuracy: number; // 0-100
  pronunciationAccuracy: number; // 0-100
  feedbackQuality: number; // 0-100
}

export interface TrendAnalytics {
  overall: TrendData[];
  pronunciation: TrendData[];
  fluency: TrendData[];
  prosody: TrendData[];
  engagement: TrendData[];
  performance: TrendData[];
  predictions: TrendPrediction[];
}

export interface TrendData {
  timestamp: Date;
  value: number;
  confidence: number; // 0-100
  context: string;
  metadata: Record<string, any>;
}

export interface TrendPrediction {
  timestamp: Date;
  value: number;
  confidence: number; // 0-100
  scenario: 'optimistic' | 'realistic' | 'pessimistic';
  context: string;
  metadata: Record<string, any>;
}

export interface PredictionAnalytics {
  learningOutcome: LearningOutcomePrediction;
  progressPrediction: ProgressPrediction;
  engagementPrediction: EngagementPrediction;
  performancePrediction: PerformancePrediction;
  riskAssessment: RiskAssessment;
  recommendations: PredictionRecommendation[];
}

export interface LearningOutcomePrediction {
  expectedImprovement: number; // percentage
  timeToGoal: number; // days
  successProbability: number; // 0-100
  confidence: number; // 0-100
  factors: PredictionFactor[];
  scenarios: PredictionScenario[];
}

export interface ProgressPrediction {
  shortTerm: number; // 1-7 days
  mediumTerm: number; // 1-4 weeks
  longTerm: number; // 1-12 months
  confidence: number; // 0-100
  factors: PredictionFactor[];
  scenarios: PredictionScenario[];
}

export interface EngagementPrediction {
  sessionFrequency: number; // sessions per week
  sessionDuration: number; // average minutes
  completionRate: number; // 0-100
  retentionRate: number; // 0-100
  confidence: number; // 0-100
  factors: PredictionFactor[];
  scenarios: PredictionScenario[];
}

export interface PerformancePrediction {
  modelAccuracy: number; // 0-100
  processingSpeed: number; // milliseconds
  latency: number; // milliseconds
  throughput: number; // requests per second
  confidence: number; // 0-100
  factors: PredictionFactor[];
  scenarios: PredictionScenario[];
}

export interface RiskAssessment {
  overall: number; // 0-100
  dropout: number; // 0-100
  stagnation: number; // 0-100
  frustration: number; // 0-100
  technical: number; // 0-100
  confidence: number; // 0-100
  factors: RiskFactor[];
  mitigation: MitigationStrategy[];
}

export interface RiskFactor {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  probability: number; // 0-100
  impact: number; // 0-100
  description: string;
  indicators: string[];
}

export interface MitigationStrategy {
  type: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  effectiveness: number; // 0-100
  cost: number; // 0-100
  description: string;
  actions: string[];
}

export interface PredictionFactor {
  name: string;
  weight: number; // 0-100
  impact: number; // -100 to 100
  confidence: number; // 0-100
  description: string;
}

export interface PredictionScenario {
  name: string;
  probability: number; // 0-100
  outcome: number; // 0-100
  confidence: number; // 0-100
  description: string;
  conditions: string[];
}

export interface PredictionRecommendation {
  type: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  effectiveness: number; // 0-100
  cost: number; // 0-100
  description: string;
  actions: string[];
  expectedOutcome: string;
}

export interface InsightAnalytics {
  learning: LearningInsight[];
  performance: PerformanceInsight[];
  engagement: EngagementInsight[];
  quality: QualityInsight[];
  trends: TrendInsight[];
  patterns: PatternInsight[];
  anomalies: AnomalyInsight[];
  opportunities: OpportunityInsight[];
}

export interface LearningInsight {
  type: string;
  title: string;
  description: string;
  impact: number; // 0-100
  confidence: number; // 0-100
  evidence: string[];
  recommendations: string[];
  metadata: Record<string, any>;
}

export interface PerformanceInsight {
  type: string;
  title: string;
  description: string;
  impact: number; // 0-100
  confidence: number; // 0-100
  evidence: string[];
  recommendations: string[];
  metadata: Record<string, any>;
}

export interface EngagementInsight {
  type: string;
  title: string;
  description: string;
  impact: number; // 0-100
  confidence: number; // 0-100
  evidence: string[];
  recommendations: string[];
  metadata: Record<string, any>;
}

export interface QualityInsight {
  type: string;
  title: string;
  description: string;
  impact: number; // 0-100
  confidence: number; // 0-100
  evidence: string[];
  recommendations: string[];
  metadata: Record<string, any>;
}

export interface TrendInsight {
  type: string;
  title: string;
  description: string;
  impact: number; // 0-100
  confidence: number; // 0-100
  evidence: string[];
  recommendations: string[];
  metadata: Record<string, any>;
}

export interface PatternInsight {
  type: string;
  title: string;
  description: string;
  impact: number; // 0-100
  confidence: number; // 0-100
  evidence: string[];
  recommendations: string[];
  metadata: Record<string, any>;
}

export interface AnomalyInsight {
  type: string;
  title: string;
  description: string;
  impact: number; // 0-100
  confidence: number; // 0-100
  evidence: string[];
  recommendations: string[];
  metadata: Record<string, any>;
}

export interface OpportunityInsight {
  type: string;
  title: string;
  description: string;
  impact: number; // 0-100
  confidence: number; // 0-100
  evidence: string[];
  recommendations: string[];
  metadata: Record<string, any>;
}

export interface RecommendationAnalytics {
  learning: LearningRecommendation[];
  performance: PerformanceRecommendation[];
  engagement: EngagementRecommendation[];
  quality: QualityRecommendation[];
  personalization: PersonalizationRecommendation[];
  optimization: OptimizationRecommendation[];
}

export interface LearningRecommendation {
  type: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  effectiveness: number; // 0-100
  cost: number; // 0-100
  timeToImplement: string;
  expectedOutcome: string;
  actions: string[];
  resources: string[];
  metadata: Record<string, any>;
}

export interface PerformanceRecommendation {
  type: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  effectiveness: number; // 0-100
  cost: number; // 0-100
  timeToImplement: string;
  expectedOutcome: string;
  actions: string[];
  resources: string[];
  metadata: Record<string, any>;
}

export interface EngagementRecommendation {
  type: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  effectiveness: number; // 0-100
  cost: number; // 0-100
  timeToImplement: string;
  expectedOutcome: string;
  actions: string[];
  resources: string[];
  metadata: Record<string, any>;
}

export interface QualityRecommendation {
  type: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  effectiveness: number; // 0-100
  cost: number; // 0-100
  timeToImplement: string;
  expectedOutcome: string;
  actions: string[];
  resources: string[];
  metadata: Record<string, any>;
}

export interface PersonalizationRecommendation {
  type: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  effectiveness: number; // 0-100
  cost: number; // 0-100
  timeToImplement: string;
  expectedOutcome: string;
  actions: string[];
  resources: string[];
  metadata: Record<string, any>;
}

export interface OptimizationRecommendation {
  type: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  effectiveness: number; // 0-100
  cost: number; // 0-100
  timeToImplement: string;
  expectedOutcome: string;
  actions: string[];
  resources: string[];
  metadata: Record<string, any>;
}

// ============================================================================
// API ENDPOINT INTERFACES
// ============================================================================

export interface PronunciationAnalyticsAPI {
  // Analytics endpoints
  getAnalytics: (params: GetAnalyticsParams) => Promise<LearningAnalytics>;
  updateAnalytics: (params: UpdateAnalyticsParams) => Promise<LearningAnalytics>;
  listAnalytics: (params: ListAnalyticsParams) => Promise<LearningAnalytics[]>;
  
  // Learning analytics endpoints
  getLearningAnalytics: (params: GetLearningAnalyticsParams) => Promise<PronunciationAnalytics>;
  getFluencyAnalytics: (params: GetFluencyAnalyticsParams) => Promise<FluencyAnalytics>;
  getProsodyAnalytics: (params: GetProsodyAnalyticsParams) => Promise<ProsodyAnalytics>;
  
  // Engagement analytics endpoints
  getEngagementAnalytics: (params: GetEngagementAnalyticsParams) => Promise<EngagementAnalytics>;
  getPerformanceAnalytics: (params: GetPerformanceAnalyticsParams) => Promise<PerformanceAnalytics>;
  
  // Trend analytics endpoints
  getTrendAnalytics: (params: GetTrendAnalyticsParams) => Promise<TrendAnalytics>;
  getPredictions: (params: GetPredictionsParams) => Promise<PredictionAnalytics>;
  
  // Insight endpoints
  getInsights: (params: GetInsightsParams) => Promise<InsightAnalytics>;
  getRecommendations: (params: GetRecommendationsParams) => Promise<RecommendationAnalytics>;
  
  // Report endpoints
  generateReport: (params: GenerateReportParams) => Promise<AnalyticsReport>;
  exportAnalytics: (params: ExportAnalyticsParams) => Promise<string>;
}

// ============================================================================
// API PARAMETER INTERFACES
// ============================================================================

export interface GetAnalyticsParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  metrics?: string[];
}

export interface UpdateAnalyticsParams {
  userId: string;
  analytics: Partial<LearningAnalytics>;
}

export interface ListAnalyticsParams {
  userId?: string;
  startDate?: Date;
  endDate?: Date;
  metrics?: string[];
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GetLearningAnalyticsParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  metrics?: string[];
}

export interface GetFluencyAnalyticsParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  metrics?: string[];
}

export interface GetProsodyAnalyticsParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  metrics?: string[];
}

export interface GetEngagementAnalyticsParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  metrics?: string[];
}

export interface GetPerformanceAnalyticsParams {
  startDate?: Date;
  endDate?: Date;
  metrics?: string[];
}

export interface GetTrendAnalyticsParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  metrics?: string[];
  period?: string;
}

export interface GetPredictionsParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  metrics?: string[];
  period?: string;
  scenario?: 'optimistic' | 'realistic' | 'pessimistic';
}

export interface GetInsightsParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  types?: string[];
}

export interface GetRecommendationsParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  types?: string[];
  priority?: 'low' | 'medium' | 'high' | 'critical';
}

export interface GenerateReportParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  format: 'pdf' | 'html' | 'json' | 'csv';
  sections?: string[];
}

export interface ExportAnalyticsParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  format: 'json' | 'csv' | 'excel';
  metrics?: string[];
}

export interface AnalyticsReport {
  id: string;
  userId: string;
  title: string;
  description: string;
  format: string;
  sections: ReportSection[];
  generatedAt: Date;
  expiresAt: Date;
  url: string;
}

export interface ReportSection {
  title: string;
  content: string;
  charts: ChartData[];
  tables: TableData[];
  insights: string[];
  recommendations: string[];
}

export interface ChartData {
  type: string;
  title: string;
  data: any[];
  options: Record<string, any>;
}

export interface TableData {
  title: string;
  headers: string[];
  rows: any[][];
  summary: string;
}

// ============================================================================
// TOOL FUNCTION INTERFACES
// ============================================================================

export interface PronunciationAnalyticsTools {
  // Analytics tools
  getAnalytics: (params: GetAnalyticsParams) => Promise<LearningAnalytics>;
  updateAnalytics: (params: UpdateAnalyticsParams) => Promise<LearningAnalytics>;
  calculateAnalytics: (userId: string, metrics: string[]) => Promise<LearningAnalytics>;
  
  // Learning analytics tools
  getLearningAnalytics: (params: GetLearningAnalyticsParams) => Promise<PronunciationAnalytics>;
  getFluencyAnalytics: (params: GetFluencyAnalyticsParams) => Promise<FluencyAnalytics>;
  getProsodyAnalytics: (params: GetProsodyAnalyticsParams) => Promise<ProsodyAnalytics>;
  
  // Engagement analytics tools
  getEngagementAnalytics: (params: GetEngagementAnalyticsParams) => Promise<EngagementAnalytics>;
  getPerformanceAnalytics: (params: GetPerformanceAnalyticsParams) => Promise<PerformanceAnalytics>;
  
  // Trend analytics tools
  getTrendAnalytics: (params: GetTrendAnalyticsParams) => Promise<TrendAnalytics>;
  getPredictions: (params: GetPredictionsParams) => Promise<PredictionAnalytics>;
  analyzeTrends: (userId: string, metrics: string[]) => Promise<TrendAnalytics>;
  predictProgress: (userId: string, metrics: string[], period: string) => Promise<PredictionAnalytics>;
  
  // Insight tools
  getInsights: (params: GetInsightsParams) => Promise<InsightAnalytics>;
  generateInsights: (userId: string, data: any[]) => Promise<InsightAnalytics>;
  analyzePatterns: (userId: string, data: any[]) => Promise<PatternInsight[]>;
  detectAnomalies: (userId: string, data: any[]) => Promise<AnomalyInsight[]>;
  
  // Recommendation tools
  getRecommendations: (params: GetRecommendationsParams) => Promise<RecommendationAnalytics>;
  generateRecommendations: (userId: string, analytics: LearningAnalytics) => Promise<RecommendationAnalytics>;
  prioritizeRecommendations: (recommendations: any[]) => Promise<any[]>;
  
  // Report tools
  generateReport: (params: GenerateReportParams) => Promise<AnalyticsReport>;
  exportAnalytics: (params: ExportAnalyticsParams) => Promise<string>;
  scheduleReport: (userId: string, schedule: string, format: string) => Promise<void>;
  
  // Utility tools
  validateAnalytics: (analytics: LearningAnalytics) => Promise<boolean>;
  compareAnalytics: (userId1: string, userId2: string) => Promise<ComparisonResult>;
  benchmarkAnalytics: (userId: string, benchmark: string) => Promise<BenchmarkResult>;
}

export interface ComparisonResult {
  similarity: number; // 0-100
  differences: string[];
  improvements: string[];
  regressions: string[];
  overall: number; // 0-100
  details: Record<string, number>;
}

export interface BenchmarkResult {
  score: number; // 0-100
  percentile: number; // 0-100
  ranking: number;
  total: number;
  comparison: string;
  details: Record<string, number>;
}

// ============================================================================
// EXPORT ALL INTERFACES
// ============================================================================

export * from './pronunciation-analytics.schema';
