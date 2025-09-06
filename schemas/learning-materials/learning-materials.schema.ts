/**
 * Learning Materials Schema
 * 
 * This schema defines the structure for learning materials in the AI Agent Studio.
 * Learning materials are the core content that AI models process and adapt to user learning styles.
 * 
 * @version 1.0.0
 * @author TEKIMAX Research & Development
 */

export interface LearningMaterial {
  // Core Identification
  id: string;
  title: string;
  description?: string;
  version: string;
  
  // File Information
  fileInfo: FileInfo;
  
  // Content Analysis
  contentAnalysis: ContentAnalysis;
  
  // Learning Metadata
  learningMetadata: LearningMetadata;
  
  // Processing Status
  processingStatus: ProcessingStatus;
  
  // AI Analysis Results
  aiAnalysis: AIAnalysis;
  
  // Learning Progress Tracking
  learningProgress: LearningProgress;
  
  // Access Control
  accessControl: AccessControl;
  
  // Relationships
  relationships: MaterialRelationships;
  
  // Analytics & Metrics
  analytics: MaterialAnalytics;
  
  // Version Control
  versionControl: VersionControl;
  
  // Timestamps
  timestamps: MaterialTimestamps;
}

export interface FileInfo {
  fileName: string;
  originalFileName: string;
  fileType: FileType;
  mimeType: string;
  fileSize: number; // in bytes
  fileHash: string; // SHA-256 hash for integrity
  encoding?: string;
  language?: string;
  
  // File Processing
  processingInfo: FileProcessingInfo;
  
  // Storage Information
  storage: StorageInfo;
}

export type FileType = 
  | 'pdf' 
  | 'docx' 
  | 'doc' 
  | 'txt' 
  | 'md' 
  | 'html' 
  | 'xml' 
  | 'json' 
  | 'csv' 
  | 'xlsx' 
  | 'pptx' 
  | 'jpg' 
  | 'jpeg' 
  | 'png' 
  | 'gif' 
  | 'svg' 
  | 'mp4' 
  | 'mp3' 
  | 'wav' 
  | 'avi' 
  | 'mov' 
  | 'zip' 
  | 'rar' 
  | 'epub' 
  | 'mobi'
  | 'unknown';

export interface FileProcessingInfo {
  extractedText?: string;
  extractedImages?: ExtractedImage[];
  extractedAudio?: ExtractedAudio[];
  extractedVideo?: ExtractedVideo[];
  extractedTables?: ExtractedTable[];
  extractedMetadata?: Record<string, any>;
  processingErrors?: ProcessingError[];
  processingWarnings?: ProcessingWarning[];
}

export interface ExtractedImage {
  id: string;
  fileName: string;
  mimeType: string;
  size: number;
  dimensions: {
    width: number;
    height: number;
  };
  altText?: string;
  caption?: string;
  storagePath: string;
  ocrText?: string;
}

export interface ExtractedAudio {
  id: string;
  fileName: string;
  mimeType: string;
  duration: number; // in seconds
  sampleRate: number;
  channels: number;
  bitrate: number;
  storagePath: string;
  transcription?: string;
  language?: string;
}

export interface ExtractedVideo {
  id: string;
  fileName: string;
  mimeType: string;
  duration: number; // in seconds
  dimensions: {
    width: number;
    height: number;
  };
  frameRate: number;
  bitrate: number;
  storagePath: string;
  thumbnailPath?: string;
  transcription?: string;
  sceneAnalysis?: SceneAnalysis[];
}

export interface SceneAnalysis {
  timestamp: number;
  description: string;
  objects: string[];
  text?: string;
  confidence: number;
}

export interface ExtractedTable {
  id: string;
  title?: string;
  headers: string[];
  rows: string[][];
  metadata: {
    rowCount: number;
    columnCount: number;
    hasHeaders: boolean;
  };
}

export interface ProcessingError {
  id: string;
  type: 'extraction' | 'analysis' | 'conversion' | 'validation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  details?: string;
  timestamp: number;
  resolved: boolean;
}

export interface ProcessingWarning {
  id: string;
  type: 'quality' | 'format' | 'size' | 'content';
  message: string;
  details?: string;
  timestamp: number;
  acknowledged: boolean;
}

export interface StorageInfo {
  provider: 'local' | 'aws-s3' | 'azure-blob' | 'gcp-storage' | 'cloudinary';
  bucket?: string;
  path: string;
  url?: string;
  cdnUrl?: string;
  backupLocations: string[];
  retentionPolicy: RetentionPolicy;
}

export interface RetentionPolicy {
  duration: number; // in days
  autoDelete: boolean;
  archiveAfter: number; // in days
  archiveLocation?: string;
}

export interface ContentAnalysis {
  // Text Analysis
  textAnalysis: TextAnalysis;
  
  // Content Classification
  classification: ContentClassification;
  
  // Language Analysis
  languageAnalysis: LanguageAnalysis;
  
  // Quality Assessment
  qualityAssessment: QualityAssessment;
  
  // Content Structure
  structure: ContentStructure;
}

export interface TextAnalysis {
  wordCount: number;
  characterCount: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTime: number; // in minutes
  readingLevel: ReadingLevel;
  vocabularyComplexity: number; // 1-10
  sentiment: SentimentAnalysis;
  topics: TopicAnalysis[];
  entities: EntityAnalysis[];
  keywords: KeywordAnalysis[];
}

export type ReadingLevel = 
  | 'elementary' 
  | 'middle-school' 
  | 'high-school' 
  | 'college' 
  | 'graduate' 
  | 'professional';

export interface SentimentAnalysis {
  overall: 'positive' | 'negative' | 'neutral' | 'mixed';
  scores: {
    positive: number;
    negative: number;
    neutral: number;
  };
  confidence: number;
  emotionalTone?: string[];
}

export interface TopicAnalysis {
  topic: string;
  confidence: number;
  relevance: number;
  keywords: string[];
}

export interface EntityAnalysis {
  entity: string;
  type: 'person' | 'organization' | 'location' | 'date' | 'concept' | 'other';
  confidence: number;
  mentions: number;
  context: string[];
}

export interface KeywordAnalysis {
  keyword: string;
  frequency: number;
  importance: number;
  context: string[];
}

export interface ContentClassification {
  primaryCategory: string;
  secondaryCategories: string[];
  subject: string;
  discipline: string;
  academicLevel: AcademicLevel;
  contentType: ContentType;
  tags: string[];
  customTags: string[];
}

export type AcademicLevel = 
  | 'elementary' 
  | 'middle-school' 
  | 'high-school' 
  | 'undergraduate' 
  | 'graduate' 
  | 'professional' 
  | 'research';

export type ContentType = 
  | 'textbook' 
  | 'article' 
  | 'research-paper' 
  | 'lecture-notes' 
  | 'presentation' 
  | 'video-lecture' 
  | 'audio-lecture' 
  | 'exercise' 
  | 'quiz' 
  | 'exam' 
  | 'assignment' 
  | 'tutorial' 
  | 'reference' 
  | 'multimedia';

export interface LanguageAnalysis {
  primaryLanguage: string;
  secondaryLanguages: string[];
  languageConfidence: number;
  dialect?: string;
  formality: 'formal' | 'informal' | 'mixed';
  technicality: 'basic' | 'intermediate' | 'advanced' | 'expert';
}

export interface QualityAssessment {
  overallScore: number; // 1-10
  criteria: {
    clarity: number;
    accuracy: number;
    completeness: number;
    organization: number;
    engagement: number;
    accessibility: number;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface ContentStructure {
  sections: ContentSection[];
  hierarchy: ContentHierarchy;
  navigation: NavigationStructure;
  crossReferences: CrossReference[];
}

export interface ContentSection {
  id: string;
  title: string;
  type: 'chapter' | 'section' | 'subsection' | 'paragraph' | 'list' | 'table' | 'figure';
  level: number;
  startPosition: number;
  endPosition: number;
  wordCount: number;
  summary?: string;
  keyPoints: string[];
}

export interface ContentHierarchy {
  root: ContentNode;
  maxDepth: number;
  totalNodes: number;
}

export interface ContentNode {
  id: string;
  title: string;
  type: string;
  level: number;
  children: ContentNode[];
  parent?: string;
  content?: string;
  metadata?: Record<string, any>;
}

export interface NavigationStructure {
  tableOfContents: TableOfContentsItem[];
  index: IndexItem[];
  glossary: GlossaryItem[];
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  pageNumber?: number;
  children: TableOfContentsItem[];
}

export interface IndexItem {
  term: string;
  occurrences: IndexOccurrence[];
}

export interface IndexOccurrence {
  sectionId: string;
  position: number;
  context: string;
}

export interface GlossaryItem {
  term: string;
  definition: string;
  context: string[];
  relatedTerms: string[];
}

export interface CrossReference {
  source: string;
  target: string;
  type: 'internal' | 'external';
  relationship: 'references' | 'cites' | 'explains' | 'contradicts' | 'supports';
  confidence: number;
}

export interface LearningMetadata {
  // Learning Objectives
  learningObjectives: LearningObjective[];
  
  // Prerequisites
  prerequisites: Prerequisite[];
  
  // Learning Outcomes
  learningOutcomes: LearningOutcome[];
  
  // Difficulty Assessment
  difficulty: DifficultyAssessment;
  
  // Learning Style Compatibility
  learningStyleCompatibility: LearningStyleCompatibility;
  
  // Time Requirements
  timeRequirements: TimeRequirements;
  
  // Assessment Information
  assessment: AssessmentInfo;
}

export interface LearningObjective {
  id: string;
  description: string;
  type: 'knowledge' | 'comprehension' | 'application' | 'analysis' | 'synthesis' | 'evaluation';
  level: 'beginner' | 'intermediate' | 'advanced';
  measurable: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface Prerequisite {
  id: string;
  description: string;
  type: 'knowledge' | 'skill' | 'experience' | 'material';
  level: 'basic' | 'intermediate' | 'advanced';
  required: boolean;
  materialId?: string; // Reference to another learning material
}

export interface LearningOutcome {
  id: string;
  description: string;
  type: 'knowledge' | 'skill' | 'attitude' | 'behavior';
  measurable: boolean;
  assessmentMethod: string;
  successCriteria: string[];
}

export interface DifficultyAssessment {
  overall: DifficultyLevel;
  bySection: Record<string, DifficultyLevel>;
  factors: DifficultyFactor[];
  recommendations: string[];
}

export type DifficultyLevel = 
  | 'very-easy' 
  | 'easy' 
  | 'moderate' 
  | 'challenging' 
  | 'difficult' 
  | 'expert';

export interface DifficultyFactor {
  factor: string;
  impact: 'low' | 'medium' | 'high';
  description: string;
  mitigation?: string;
}

export interface LearningStyleCompatibility {
  visual: CompatibilityScore;
  auditory: CompatibilityScore;
  kinesthetic: CompatibilityScore;
  reading: CompatibilityScore;
  recommendations: LearningStyleRecommendation[];
}

export interface CompatibilityScore {
  score: number; // 1-10
  confidence: number;
  factors: string[];
}

export interface LearningStyleRecommendation {
  style: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  recommendation: string;
  priority: 'low' | 'medium' | 'high';
}

export interface TimeRequirements {
  estimatedStudyTime: number; // in minutes
  minimumTime: number;
  maximumTime: number;
  bySection: Record<string, number>;
  breaks: BreakRecommendation[];
}

export interface BreakRecommendation {
  afterMinutes: number;
  duration: number;
  type: 'short' | 'long' | 'activity';
  description: string;
}

export interface AssessmentInfo {
  hasAssessment: boolean;
  assessmentType?: 'quiz' | 'exam' | 'assignment' | 'project' | 'discussion';
  questions?: AssessmentQuestion[];
  passingScore?: number;
  timeLimit?: number;
  attempts?: number;
}

export interface AssessmentQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay' | 'matching';
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  explanation?: string;
  points: number;
  difficulty: DifficultyLevel;
}

export interface ProcessingStatus {
  status: ProcessingStatusType;
  progress: number; // 0-100
  currentStep: string;
  steps: ProcessingStep[];
  startedAt: number;
  completedAt?: number;
  estimatedCompletion?: number;
  errors: ProcessingError[];
  warnings: ProcessingWarning[];
}

export type ProcessingStatusType = 
  | 'pending' 
  | 'processing' 
  | 'analyzing' 
  | 'completed' 
  | 'error' 
  | 'cancelled' 
  | 'paused';

export interface ProcessingStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'error' | 'skipped';
  startedAt?: number;
  completedAt?: number;
  progress: number;
  details?: string;
}

export interface AIAnalysis {
  // AI Processing Results
  processingResults: AIProcessingResults;
  
  // Pedagogical Analysis
  pedagogicalAnalysis: PedagogicalAnalysis;
  
  // Content Adaptation
  contentAdaptation: ContentAdaptation;
  
  // Memory Usage
  memoryUsage: MemoryUsage;
  
  // Model Information
  modelInfo: ModelInfo;
}

export interface AIProcessingResults {
  modelId: string;
  modelVersion: string;
  processingTime: number; // in milliseconds
  confidence: number;
  accuracy: number;
  results: ProcessingResult[];
}

export interface ProcessingResult {
  type: 'text-extraction' | 'content-analysis' | 'pedagogical-analysis' | 'adaptation';
  result: any;
  confidence: number;
  timestamp: number;
}

export interface PedagogicalAnalysis {
  teachingMethod: TeachingMethod;
  learningTheory: LearningTheory[];
  instructionalDesign: InstructionalDesign;
  engagementStrategies: EngagementStrategy[];
  accessibilityFeatures: AccessibilityFeature[];
}

export interface TeachingMethod {
  primary: string;
  secondary: string[];
  effectiveness: number; // 1-10
  rationale: string;
}

export interface LearningTheory {
  theory: string;
  application: string;
  relevance: number; // 1-10
}

export interface InstructionalDesign {
  approach: 'behaviorist' | 'cognitivist' | 'constructivist' | 'connectivist' | 'mixed';
  principles: string[];
  strategies: string[];
}

export interface EngagementStrategy {
  strategy: string;
  type: 'visual' | 'auditory' | 'kinesthetic' | 'cognitive' | 'social';
  effectiveness: number;
  implementation: string;
}

export interface AccessibilityFeature {
  feature: string;
  type: 'visual' | 'auditory' | 'motor' | 'cognitive';
  description: string;
  implementation: string;
}

export interface ContentAdaptation {
  adaptations: ContentAdaptationItem[];
  personalizedContent: PersonalizedContent[];
  alternativeFormats: AlternativeFormat[];
  recommendations: AdaptationRecommendation[];
}

export interface ContentAdaptationItem {
  type: 'simplification' | 'elaboration' | 'visualization' | 'interaction' | 'multimedia';
  description: string;
  targetAudience: string;
  implementation: string;
  effectiveness: number;
}

export interface PersonalizedContent {
  userId: string;
  adaptations: ContentAdaptationItem[];
  preferences: UserPreferences;
  effectiveness: number;
}

export interface AlternativeFormat {
  format: 'audio' | 'video' | 'interactive' | 'simplified' | 'detailed';
  description: string;
  targetAudience: string;
  availability: boolean;
  generationTime?: number;
}

export interface AdaptationRecommendation {
  type: 'content' | 'format' | 'pace' | 'difficulty' | 'style';
  recommendation: string;
  priority: 'low' | 'medium' | 'high';
  rationale: string;
}

export interface MemoryUsage {
  totalMemory: number; // in MB
  byComponent: Record<string, number>;
  optimization: MemoryOptimization;
  recommendations: string[];
}

export interface MemoryOptimization {
  compressionRatio: number;
  indexingSize: number;
  cacheSize: number;
  optimizationStrategies: string[];
}

export interface ModelInfo {
  modelId: string;
  modelName: string;
  version: string;
  provider: string;
  capabilities: string[];
  limitations: string[];
  lastUpdated: number;
}

export interface LearningProgress {
  // User Progress Tracking
  userProgress: UserProgress[];
  
  // Learning Analytics
  learningAnalytics: LearningAnalytics;
  
  // Performance Metrics
  performanceMetrics: PerformanceMetrics;
  
  // Engagement Tracking
  engagementTracking: EngagementTracking;
}

export interface UserProgress {
  userId: string;
  progress: number; // 0-100
  completedSections: string[];
  timeSpent: number; // in minutes
  lastAccessed: number;
  studySessions: StudySession[];
  achievements: Achievement[];
  notes: UserNote[];
}

export interface StudySession {
  id: string;
  startTime: number;
  endTime: number;
  duration: number; // in minutes
  sections: string[];
  progress: number;
  notes?: string;
  effectiveness: number; // 1-10
}

export interface Achievement {
  id: string;
  type: 'completion' | 'mastery' | 'speed' | 'consistency' | 'engagement';
  title: string;
  description: string;
  earnedAt: number;
  points: number;
}

export interface UserNote {
  id: string;
  content: string;
  sectionId: string;
  position: number;
  createdAt: number;
  updatedAt: number;
  isPrivate: boolean;
  tags: string[];
}

export interface LearningAnalytics {
  averageCompletionTime: number;
  averageEffectiveness: number;
  commonStruggles: string[];
  popularSections: string[];
  dropOffPoints: DropOffPoint[];
  learningPatterns: LearningPattern[];
}

export interface DropOffPoint {
  sectionId: string;
  dropOffRate: number;
  commonReasons: string[];
  recommendations: string[];
}

export interface LearningPattern {
  pattern: string;
  frequency: number;
  effectiveness: number;
  description: string;
}

export interface PerformanceMetrics {
  averageScore: number;
  completionRate: number;
  retentionRate: number;
  engagementScore: number;
  difficultyRating: number;
  satisfactionRating: number;
}

export interface EngagementTracking {
  totalViews: number;
  uniqueViewers: number;
  averageSessionDuration: number;
  bounceRate: number;
  returnRate: number;
  sharingRate: number;
  bookmarkRate: number;
}

export interface AccessControl {
  // Permissions
  permissions: MaterialPermissions;
  
  // Sharing Settings
  sharing: SharingSettings;
  
  // Privacy Settings
  privacy: PrivacySettings;
  
  // Usage Restrictions
  restrictions: UsageRestrictions;
}

export interface MaterialPermissions {
  owner: string;
  collaborators: Collaborator[];
  publicAccess: boolean;
  accessLevel: 'read' | 'write' | 'admin';
  expirationDate?: number;
}

export interface Collaborator {
  userId: string;
  role: 'viewer' | 'editor' | 'admin';
  permissions: string[];
  addedAt: number;
  addedBy: string;
}

export interface SharingSettings {
  isPublic: boolean;
  shareable: boolean;
  embeddable: boolean;
  downloadable: boolean;
  printable: boolean;
  shareUrl?: string;
  embedCode?: string;
}

export interface PrivacySettings {
  dataCollection: boolean;
  analytics: boolean;
  personalization: boolean;
  thirdPartySharing: boolean;
  dataRetention: number; // in days
}

export interface UsageRestrictions {
  maxViews?: number;
  maxDownloads?: number;
  timeRestrictions?: TimeRestriction[];
  geographicRestrictions?: string[];
  deviceRestrictions?: string[];
}

export interface TimeRestriction {
  startTime: number;
  endTime: number;
  timezone: string;
  recurring: boolean;
}

export interface MaterialRelationships {
  // Related Materials
  relatedMaterials: RelatedMaterial[];
  
  // Dependencies
  dependencies: MaterialDependency[];
  
  // Collections
  collections: Collection[];
  
  // Tags and Categories
  tags: Tag[];
  categories: Category[];
}

export interface RelatedMaterial {
  materialId: string;
  relationship: 'prerequisite' | 'follow-up' | 'alternative' | 'complementary' | 'similar';
  strength: number; // 1-10
  description?: string;
}

export interface MaterialDependency {
  materialId: string;
  type: 'required' | 'recommended' | 'optional';
  order: number;
  description?: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  type: 'course' | 'series' | 'playlist' | 'bundle';
  position: number;
}

export interface Tag {
  id: string;
  name: string;
  category: string;
  color?: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  parentId?: string;
  level: number;
  description?: string;
}

export interface MaterialAnalytics {
  // Usage Analytics
  usageAnalytics: UsageAnalytics;
  
  // Performance Analytics
  performanceAnalytics: PerformanceAnalytics;
  
  // Content Analytics
  contentAnalytics: ContentAnalytics;
  
  // User Analytics
  userAnalytics: UserAnalytics;
}

export interface UsageAnalytics {
  totalViews: number;
  uniqueViewers: number;
  totalDownloads: number;
  totalShares: number;
  averageRating: number;
  totalRatings: number;
  viewsByTime: TimeSeriesData[];
  viewsByLocation: LocationData[];
  viewsByDevice: DeviceData[];
}

export interface TimeSeriesData {
  timestamp: number;
  value: number;
  metadata?: Record<string, any>;
}

export interface LocationData {
  country: string;
  region?: string;
  city?: string;
  views: number;
  percentage: number;
}

export interface DeviceData {
  deviceType: 'desktop' | 'mobile' | 'tablet';
  views: number;
  percentage: number;
}

export interface PerformanceAnalytics {
  averageLoadTime: number;
  averageCompletionTime: number;
  errorRate: number;
  satisfactionScore: number;
  effectivenessScore: number;
  retentionRate: number;
}

export interface ContentAnalytics {
  mostViewedSections: SectionAnalytics[];
  leastViewedSections: SectionAnalytics[];
  averageTimePerSection: Record<string, number>;
  dropOffPoints: DropOffPoint[];
  popularContent: PopularContent[];
}

export interface SectionAnalytics {
  sectionId: string;
  title: string;
  views: number;
  averageTime: number;
  completionRate: number;
}

export interface PopularContent {
  contentId: string;
  type: string;
  views: number;
  engagement: number;
  rating: number;
}

export interface UserAnalytics {
  userSegments: UserSegment[];
  learningPaths: LearningPath[];
  engagementPatterns: EngagementPattern[];
  feedbackAnalysis: FeedbackAnalysis;
}

export interface UserSegment {
  segment: string;
  description: string;
  userCount: number;
  characteristics: string[];
  preferences: Record<string, any>;
}

export interface LearningPath {
  path: string[];
  userCount: number;
  effectiveness: number;
  averageTime: number;
}

export interface EngagementPattern {
  pattern: string;
  frequency: number;
  effectiveness: number;
  userTypes: string[];
}

export interface FeedbackAnalysis {
  totalFeedback: number;
  averageRating: number;
  sentiment: SentimentAnalysis;
  commonThemes: string[];
  improvementSuggestions: string[];
}

export interface VersionControl {
  currentVersion: string;
  versionHistory: VersionHistory[];
  branches: Branch[];
  mergeRequests: MergeRequest[];
}

export interface VersionHistory {
  version: string;
  timestamp: number;
  author: string;
  changes: Change[];
  description: string;
  tags: string[];
}

export interface Change {
  type: 'added' | 'modified' | 'deleted' | 'moved' | 'renamed';
  path: string;
  description: string;
  diff?: string;
}

export interface Branch {
  name: string;
  baseVersion: string;
  createdBy: string;
  createdAt: number;
  status: 'active' | 'merged' | 'abandoned';
  changes: Change[];
}

export interface MergeRequest {
  id: string;
  sourceBranch: string;
  targetBranch: string;
  status: 'open' | 'merged' | 'closed' | 'rejected';
  createdBy: string;
  createdAt: number;
  mergedAt?: number;
  changes: Change[];
  description: string;
}

export interface MaterialTimestamps {
  createdAt: number;
  updatedAt: number;
  lastAccessed: number;
  lastModified: number;
  publishedAt?: number;
  archivedAt?: number;
}

// API Endpoint Definitions for Learning Materials
export interface LearningMaterialsAPI {
  // CRUD Operations
  createMaterial: (material: Omit<LearningMaterial, 'id' | 'timestamps'>) => Promise<LearningMaterial>;
  getMaterial: (id: string) => Promise<LearningMaterial>;
  updateMaterial: (id: string, updates: Partial<LearningMaterial>) => Promise<LearningMaterial>;
  deleteMaterial: (id: string) => Promise<void>;
  listMaterials: (filters?: MaterialFilters) => Promise<LearningMaterial[]>;
  
  // File Operations
  uploadFile: (file: File, metadata: Partial<LearningMaterial>) => Promise<LearningMaterial>;
  downloadFile: (id: string, format?: string) => Promise<Blob>;
  extractContent: (id: string) => Promise<FileProcessingInfo>;
  
  // Processing Operations
  startProcessing: (id: string) => Promise<ProcessingStatus>;
  getProcessingStatus: (id: string) => Promise<ProcessingStatus>;
  cancelProcessing: (id: string) => Promise<void>;
  
  // Analysis Operations
  analyzeContent: (id: string, analysisType: string) => Promise<AIAnalysis>;
  getContentAnalysis: (id: string) => Promise<ContentAnalysis>;
  updateAnalysis: (id: string, analysis: Partial<AIAnalysis>) => Promise<void>;
  
  // Learning Operations
  trackProgress: (materialId: string, userId: string, progress: Partial<UserProgress>) => Promise<void>;
  getProgress: (materialId: string, userId: string) => Promise<UserProgress>;
  getLearningAnalytics: (id: string) => Promise<LearningAnalytics>;
  
  // Search and Discovery
  searchMaterials: (query: SearchQuery) => Promise<SearchResult[]>;
  getRecommendations: (userId: string, criteria?: RecommendationCriteria) => Promise<LearningMaterial[]>;
  getRelatedMaterials: (id: string) => Promise<RelatedMaterial[]>;
  
  // Sharing and Collaboration
  shareMaterial: (id: string, shareSettings: SharingSettings) => Promise<string>;
  addCollaborator: (id: string, collaborator: Collaborator) => Promise<void>;
  removeCollaborator: (id: string, userId: string) => Promise<void>;
  
  // Analytics
  getAnalytics: (id: string, timeRange: TimeRange) => Promise<MaterialAnalytics>;
  getUsageStats: (id: string) => Promise<UsageAnalytics>;
  getPerformanceMetrics: (id: string) => Promise<PerformanceAnalytics>;
}

export interface MaterialFilters {
  fileType?: FileType[];
  status?: ProcessingStatusType[];
  category?: string[];
  tags?: string[];
  difficulty?: DifficultyLevel[];
  learningStyle?: string[];
  createdBy?: string[];
  dateRange?: TimeRange;
  search?: string;
}

export interface SearchQuery {
  query: string;
  filters?: MaterialFilters;
  sortBy?: 'relevance' | 'date' | 'popularity' | 'rating';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  material: LearningMaterial;
  relevanceScore: number;
  highlights: string[];
  matchedFields: string[];
}

export interface RecommendationCriteria {
  learningStyle?: string[];
  difficulty?: DifficultyLevel[];
  subjects?: string[];
  timeAvailable?: number;
  preferences?: Record<string, any>;
}

// Tool Function Definitions for Learning Materials
export interface LearningMaterialsTools {
  // Material Management Tools
  createMaterial: {
    name: 'create_learning_material';
    description: 'Create a new learning material';
    parameters: {
      title: string;
      description?: string;
      fileType: FileType;
      content?: string;
      metadata: Partial<LearningMetadata>;
    };
    returns: LearningMaterial;
  };
  
  analyzeContent: {
    name: 'analyze_content';
    description: 'Analyze the content of a learning material';
    parameters: {
      materialId: string;
      analysisType: 'text' | 'pedagogical' | 'accessibility' | 'comprehensive';
    };
    returns: ContentAnalysis;
  };
  
  extractText: {
    name: 'extract_text';
    description: 'Extract text content from a learning material';
    parameters: {
      materialId: string;
      format?: 'plain' | 'structured' | 'annotated';
    };
    returns: {
      extractedText: string;
      structure: ContentStructure;
      metadata: Record<string, any>;
    };
  };
  
  // Learning Progress Tools
  trackProgress: {
    name: 'track_learning_progress';
    description: 'Track user progress through a learning material';
    parameters: {
      materialId: string;
      userId: string;
      sectionId: string;
      progress: number;
      timeSpent: number;
    };
    returns: { success: boolean; updatedProgress: UserProgress };
  };
  
  getProgress: {
    name: 'get_learning_progress';
    description: 'Get user progress for a learning material';
    parameters: {
      materialId: string;
      userId: string;
    };
    returns: UserProgress;
  };
  
  // Content Adaptation Tools
  adaptContent: {
    name: 'adapt_content';
    description: 'Adapt content for specific learning styles or needs';
    parameters: {
      materialId: string;
      userId: string;
      adaptationType: 'simplify' | 'elaborate' | 'visualize' | 'interactive';
    };
    returns: ContentAdaptation;
  };
  
  generateSummary: {
    name: 'generate_summary';
    description: 'Generate a summary of learning material content';
    parameters: {
      materialId: string;
      summaryType: 'brief' | 'detailed' | 'key-points' | 'outline';
      targetLength?: number;
    };
    returns: {
      summary: string;
      keyPoints: string[];
      structure: ContentStructure;
    };
  };
  
  // Search and Discovery Tools
  searchMaterials: {
    name: 'search_learning_materials';
    description: 'Search for learning materials based on criteria';
    parameters: {
      query: string;
      filters?: MaterialFilters;
      userId?: string;
    };
    returns: SearchResult[];
  };
  
  getRecommendations: {
    name: 'get_material_recommendations';
    description: 'Get personalized material recommendations';
    parameters: {
      userId: string;
      criteria?: RecommendationCriteria;
      limit?: number;
    };
    returns: LearningMaterial[];
  };
  
  // Analytics Tools
  getMaterialAnalytics: {
    name: 'get_material_analytics';
    description: 'Get analytics for a learning material';
    parameters: {
      materialId: string;
      timeRange: TimeRange;
      metrics?: string[];
    };
    returns: MaterialAnalytics;
  };
  
  getUsageStats: {
    name: 'get_material_usage_stats';
    description: 'Get usage statistics for a learning material';
    parameters: {
      materialId: string;
      timeRange: TimeRange;
    };
    returns: UsageAnalytics;
  };
}

// Validation Schemas
export const LearningMaterialValidation = {
  id: { type: 'string', required: true, pattern: '^material_[a-zA-Z0-9_-]+$' },
  title: { type: 'string', required: true, minLength: 1, maxLength: 200 },
  fileType: { type: 'string', required: true, enum: ['pdf', 'docx', 'txt', 'md', 'html', 'jpg', 'png', 'mp4', 'mp3'] },
  fileSize: { type: 'number', required: true, minimum: 1, maximum: 1000000000 }, // 1GB max
  processingStatus: { type: 'object', required: true },
  aiAnalysis: { type: 'object', required: true },
  timestamps: { type: 'object', required: true }
};

// Default Values
export const DefaultLearningMaterial: Partial<LearningMaterial> = {
  version: '1.0.0',
  fileInfo: {
    fileName: '',
    originalFileName: '',
    fileType: 'unknown',
    mimeType: 'application/octet-stream',
    fileSize: 0,
    fileHash: '',
    processingInfo: {
      extractedText: '',
      extractedImages: [],
      extractedAudio: [],
      extractedVideo: [],
      extractedTables: [],
      extractedMetadata: {},
      processingErrors: [],
      processingWarnings: []
    },
    storage: {
      provider: 'local',
      path: '',
      backupLocations: [],
      retentionPolicy: {
        duration: 365,
        autoDelete: false,
        archiveAfter: 90
      }
    }
  },
  contentAnalysis: {
    textAnalysis: {
      wordCount: 0,
      characterCount: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      readingTime: 0,
      readingLevel: 'high-school',
      vocabularyComplexity: 5,
      sentiment: {
        overall: 'neutral',
        scores: { positive: 0, negative: 0, neutral: 1 },
        confidence: 0
      },
      topics: [],
      entities: [],
      keywords: []
    },
    classification: {
      primaryCategory: 'general',
      secondaryCategories: [],
      subject: 'general',
      discipline: 'general',
      academicLevel: 'undergraduate',
      contentType: 'reference',
      tags: [],
      customTags: []
    },
    languageAnalysis: {
      primaryLanguage: 'en',
      secondaryLanguages: [],
      languageConfidence: 1,
      formality: 'formal',
      technicality: 'intermediate'
    },
    qualityAssessment: {
      overallScore: 5,
      criteria: {
        clarity: 5,
        accuracy: 5,
        completeness: 5,
        organization: 5,
        engagement: 5,
        accessibility: 5
      },
      strengths: [],
      weaknesses: [],
      recommendations: []
    },
    structure: {
      sections: [],
      hierarchy: {
        root: {
          id: 'root',
          title: 'Root',
          type: 'root',
          level: 0,
          children: [],
          content: ''
        },
        maxDepth: 0,
        totalNodes: 1
      },
      navigation: {
        tableOfContents: [],
        index: [],
        glossary: []
      },
      crossReferences: []
    }
  },
  learningMetadata: {
    learningObjectives: [],
    prerequisites: [],
    learningOutcomes: [],
    difficulty: {
      overall: 'moderate',
      bySection: {},
      factors: [],
      recommendations: []
    },
    learningStyleCompatibility: {
      visual: { score: 5, confidence: 0.5, factors: [] },
      auditory: { score: 5, confidence: 0.5, factors: [] },
      kinesthetic: { score: 5, confidence: 0.5, factors: [] },
      reading: { score: 5, confidence: 0.5, factors: [] },
      recommendations: []
    },
    timeRequirements: {
      estimatedStudyTime: 30,
      minimumTime: 15,
      maximumTime: 60,
      bySection: {},
      breaks: []
    },
    assessment: {
      hasAssessment: false
    }
  },
  processingStatus: {
    status: 'pending',
    progress: 0,
    currentStep: 'Initializing',
    steps: [],
    startedAt: Date.now(),
    errors: [],
    warnings: []
  },
  aiAnalysis: {
    processingResults: {
      modelId: '',
      modelVersion: '',
      processingTime: 0,
      confidence: 0,
      accuracy: 0,
      results: []
    },
    pedagogicalAnalysis: {
      teachingMethod: {
        primary: 'lecture',
        secondary: [],
        effectiveness: 5,
        rationale: ''
      },
      learningTheory: [],
      instructionalDesign: {
        approach: 'mixed',
        principles: [],
        strategies: []
      },
      engagementStrategies: [],
      accessibilityFeatures: []
    },
    contentAdaptation: {
      adaptations: [],
      personalizedContent: [],
      alternativeFormats: [],
      recommendations: []
    },
    memoryUsage: {
      totalMemory: 0,
      byComponent: {},
      optimization: {
        compressionRatio: 1,
        indexingSize: 0,
        cacheSize: 0,
        optimizationStrategies: []
      },
      recommendations: []
    },
    modelInfo: {
      modelId: '',
      modelName: '',
      version: '',
      provider: '',
      capabilities: [],
      limitations: [],
      lastUpdated: Date.now()
    }
  },
  learningProgress: {
    userProgress: [],
    learningAnalytics: {
      averageCompletionTime: 0,
      averageEffectiveness: 0,
      commonStruggles: [],
      popularSections: [],
      dropOffPoints: [],
      learningPatterns: []
    },
    performanceMetrics: {
      averageScore: 0,
      completionRate: 0,
      retentionRate: 0,
      engagementScore: 0,
      difficultyRating: 0,
      satisfactionRating: 0
    },
    engagementTracking: {
      totalViews: 0,
      uniqueViewers: 0,
      averageSessionDuration: 0,
      bounceRate: 0,
      returnRate: 0,
      sharingRate: 0,
      bookmarkRate: 0
    }
  },
  accessControl: {
    permissions: {
      owner: '',
      collaborators: [],
      publicAccess: false,
      accessLevel: 'read',
      expirationDate: undefined
    },
    sharing: {
      isPublic: false,
      shareable: true,
      embeddable: false,
      downloadable: true,
      printable: true
    },
    privacy: {
      dataCollection: true,
      analytics: true,
      personalization: true,
      thirdPartySharing: false,
      dataRetention: 365
    },
    restrictions: {
      maxViews: undefined,
      maxDownloads: undefined,
      timeRestrictions: [],
      geographicRestrictions: [],
      deviceRestrictions: []
    }
  },
  relationships: {
    relatedMaterials: [],
    dependencies: [],
    collections: [],
    tags: [],
    categories: []
  },
  analytics: {
    usageAnalytics: {
      totalViews: 0,
      uniqueViewers: 0,
      totalDownloads: 0,
      totalShares: 0,
      averageRating: 0,
      totalRatings: 0,
      viewsByTime: [],
      viewsByLocation: [],
      viewsByDevice: []
    },
    performanceAnalytics: {
      averageLoadTime: 0,
      averageCompletionTime: 0,
      errorRate: 0,
      satisfactionScore: 0,
      effectivenessScore: 0,
      retentionRate: 0
    },
    contentAnalytics: {
      mostViewedSections: [],
      leastViewedSections: [],
      averageTimePerSection: {},
      dropOffPoints: [],
      popularContent: []
    },
    userAnalytics: {
      userSegments: [],
      learningPaths: [],
      engagementPatterns: [],
      feedbackAnalysis: {
        totalFeedback: 0,
        averageRating: 0,
        sentiment: {
          overall: 'neutral',
          scores: { positive: 0, negative: 0, neutral: 1 },
          confidence: 0
        },
        commonThemes: [],
        improvementSuggestions: []
      }
    }
  },
  versionControl: {
    currentVersion: '1.0.0',
    versionHistory: [],
    branches: [],
    mergeRequests: []
  },
  timestamps: {
    createdAt: Date.now(),
    updatedAt: Date.now(),
    lastAccessed: Date.now(),
    lastModified: Date.now()
  }
};
