/**
 * Speech Analysis Schema for Pronunciation Learning Platform
 * 
 * This schema defines the data structures and API endpoints for speech analysis
 * functionality in the pronunciation learning system. It handles speech recognition,
 * pronunciation assessment, fluency analysis, and speech pattern detection.
 * 
 * @version 1.0.0
 * @author TEKIMAX Research & Development
 */

// ============================================================================
// SPEECH RECOGNITION INTERFACES
// ============================================================================

export interface SpeechRecognition {
  id: string;
  recordingId: string;
  userId: string;
  sessionId: string;
  timestamp: Date;
  language: string;
  dialect: string;
  accent: string;
  confidence: number; // 0-100
  status: RecognitionStatus;
  results: RecognitionResult[];
  alternatives: RecognitionAlternative[];
  metadata: RecognitionMetadata;
  processingTime: number; // milliseconds
  createdAt: Date;
}

export interface RecognitionResult {
  text: string;
  confidence: number; // 0-100
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  words: WordResult[];
  phonemes: PhonemeResult[];
  syllables: SyllableResult[];
  prosody: ProsodyResult;
  quality: QualityResult;
}

export interface WordResult {
  word: string;
  confidence: number; // 0-100
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  pronunciation: PronunciationResult;
  stress: StressResult;
  clarity: number; // 0-100
  accuracy: number; // 0-100
}

export interface PhonemeResult {
  phoneme: string;
  confidence: number; // 0-100
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  formants: FormantResult;
  pitch: number; // Hz
  intensity: number; // dB
  quality: number; // 0-100
  accuracy: number; // 0-100
}

export interface SyllableResult {
  syllable: string;
  confidence: number; // 0-100
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  stress: number; // 0-1
  nucleus: string;
  onset: string;
  coda: string;
  clarity: number; // 0-100
  accuracy: number; // 0-100
}

export interface ProsodyResult {
  pitch: {
    mean: number; // Hz
    range: number; // Hz
    variation: number; // 0-100
    pattern: number[]; // Hz over time
  };
  intensity: {
    mean: number; // dB
    range: number; // dB
    variation: number; // 0-100
    pattern: number[]; // dB over time
  };
  rhythm: {
    tempo: number; // BPM
    regularity: number; // 0-100
    stressPattern: number[]; // stress levels
  };
  intonation: {
    pattern: number[]; // pitch contour
    appropriateness: number; // 0-100
    expressiveness: number; // 0-100
  };
}

export interface QualityResult {
  overall: number; // 0-100
  clarity: number; // 0-100
  volume: number; // 0-100
  noise: number; // 0-100 (lower is better)
  distortion: number; // 0-100 (lower is better)
  intelligibility: number; // 0-100
  naturalness: number; // 0-100
}

export interface PronunciationResult {
  accuracy: number; // 0-100
  clarity: number; // 0-100
  expected: string;
  actual: string;
  errors: PronunciationError[];
  improvements: string[];
}

export interface StressResult {
  accuracy: number; // 0-100
  expected: number; // 0-1
  actual: number; // 0-1
  appropriateness: number; // 0-100
  errors: StressError[];
}

export interface FormantResult {
  f1: number; // Hz
  f2: number; // Hz
  f3: number; // Hz
  f4?: number; // Hz
  bandwidths: {
    b1: number; // Hz
    b2: number; // Hz
    b3: number; // Hz
    b4?: number; // Hz
  };
  transitions: {
    f1Transition: number[]; // Hz over time
    f2Transition: number[]; // Hz over time
    f3Transition: number[]; // Hz over time
  };
}

export interface RecognitionAlternative {
  text: string;
  confidence: number; // 0-100
  words: WordResult[];
  phonemes: PhonemeResult[];
  syllables: SyllableResult[];
}

export interface RecognitionMetadata {
  model: string;
  version: string;
  parameters: Record<string, any>;
  environment: string;
  device: string;
  microphone: string;
  sampleRate: number; // Hz
  channels: number;
  bitDepth: number;
  format: string;
}

// ============================================================================
// PRONUNCIATION ASSESSMENT INTERFACES
// ============================================================================

export interface PronunciationAssessment {
  id: string;
  recognitionId: string;
  userId: string;
  sessionId: string;
  timestamp: Date;
  overall: AssessmentScore;
  phonemes: PhonemeAssessment[];
  words: WordAssessment[];
  syllables: SyllableAssessment[];
  sentences: SentenceAssessment[];
  paragraphs: ParagraphAssessment[];
  errors: PronunciationError[];
  improvements: Improvement[];
  recommendations: Recommendation[];
  progress: ProgressMetrics;
  createdAt: Date;
}

export interface AssessmentScore {
  overall: number; // 0-100
  accuracy: number; // 0-100
  clarity: number; // 0-100
  fluency: number; // 0-100
  prosody: number; // 0-100
  intelligibility: number; // 0-100
  naturalness: number; // 0-100
  confidence: number; // 0-100
}

export interface PhonemeAssessment {
  phoneme: string;
  expected: string;
  actual: string;
  accuracy: number; // 0-100
  clarity: number; // 0-100
  confidence: number; // 0-100
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  formants: FormantResult;
  pitch: number; // Hz
  intensity: number; // dB
  errors: PhonemeError[];
  improvements: string[];
  commonMistakes: string[];
}

export interface WordAssessment {
  word: string;
  expected: string;
  actual: string;
  accuracy: number; // 0-100
  clarity: number; // 0-100
  confidence: number; // 0-100
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  syllables: number;
  stress: StressResult;
  pronunciation: PronunciationResult;
  errors: WordError[];
  improvements: string[];
  commonMistakes: string[];
}

export interface SyllableAssessment {
  syllable: string;
  expected: string;
  actual: string;
  accuracy: number; // 0-100
  clarity: number; // 0-100
  confidence: number; // 0-100
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  stress: number; // 0-1
  nucleus: string;
  onset: string;
  coda: string;
  errors: SyllableError[];
  improvements: string[];
  commonMistakes: string[];
}

export interface SentenceAssessment {
  sentence: string;
  expected: string;
  actual: string;
  accuracy: number; // 0-100
  clarity: number; // 0-100
  confidence: number; // 0-100
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  words: number;
  syllables: number;
  phonemes: number;
  stress: StressResult;
  intonation: IntonationResult;
  rhythm: RhythmResult;
  errors: SentenceError[];
  improvements: string[];
  commonMistakes: string[];
}

export interface ParagraphAssessment {
  paragraph: string;
  expected: string;
  actual: string;
  accuracy: number; // 0-100
  clarity: number; // 0-100
  confidence: number; // 0-100
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  sentences: number;
  words: number;
  syllables: number;
  phonemes: number;
  fluency: FluencyResult;
  prosody: ProsodyResult;
  errors: ParagraphError[];
  improvements: string[];
  commonMistakes: string[];
}

export interface IntonationResult {
  pattern: number[]; // pitch contour
  appropriateness: number; // 0-100
  expressiveness: number; // 0-100
  naturalness: number; // 0-100
  errors: IntonationError[];
}

export interface RhythmResult {
  tempo: number; // BPM
  regularity: number; // 0-100
  stressPattern: number[]; // stress levels
  appropriateness: number; // 0-100
  naturalness: number; // 0-100
  errors: RhythmError[];
}

export interface FluencyResult {
  speakingRate: number; // words per minute
  articulationRate: number; // syllables per second
  pauseRatio: number; // 0-1
  pauseCount: number;
  averagePauseLength: number; // seconds
  rhythmRegularity: number; // 0-100
  tempoVariation: number; // 0-100
  smoothness: number; // 0-100
  naturalness: number; // 0-100
  errors: FluencyError[];
}

// ============================================================================
// ERROR ANALYSIS INTERFACES
// ============================================================================

export interface PronunciationError {
  id: string;
  type: ErrorType;
  severity: ErrorSeverity;
  category: ErrorCategory;
  description: string;
  suggestion: string;
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  context: string;
  expected: string;
  actual: string;
  confidence: number; // 0-100
  commonMistake: boolean;
  frequency: number;
  patterns: string[];
  improvements: string[];
  resources: string[];
  practice: string[];
}

export interface PhonemeError {
  id: string;
  phoneme: string;
  expected: string;
  actual: string;
  type: 'substitution' | 'omission' | 'insertion' | 'distortion';
  severity: ErrorSeverity;
  description: string;
  suggestion: string;
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  formants: FormantResult;
  pitch: number; // Hz
  intensity: number; // dB
  confidence: number; // 0-100
  commonMistake: boolean;
  frequency: number;
  patterns: string[];
  improvements: string[];
  resources: string[];
  practice: string[];
}

export interface WordError {
  id: string;
  word: string;
  expected: string;
  actual: string;
  type: 'pronunciation' | 'stress' | 'rhythm' | 'clarity';
  severity: ErrorSeverity;
  description: string;
  suggestion: string;
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  syllables: number;
  stress: StressResult;
  pronunciation: PronunciationResult;
  confidence: number; // 0-100
  commonMistake: boolean;
  frequency: number;
  patterns: string[];
  improvements: string[];
  resources: string[];
  practice: string[];
}

export interface SyllableError {
  id: string;
  syllable: string;
  expected: string;
  actual: string;
  type: 'pronunciation' | 'stress' | 'duration' | 'clarity';
  severity: ErrorSeverity;
  description: string;
  suggestion: string;
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  stress: number; // 0-1
  nucleus: string;
  onset: string;
  coda: string;
  confidence: number; // 0-100
  commonMistake: boolean;
  frequency: number;
  patterns: string[];
  improvements: string[];
  resources: string[];
  practice: string[];
}

export interface SentenceError {
  id: string;
  sentence: string;
  expected: string;
  actual: string;
  type: 'pronunciation' | 'stress' | 'intonation' | 'rhythm' | 'fluency';
  severity: ErrorSeverity;
  description: string;
  suggestion: string;
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  words: number;
  syllables: number;
  phonemes: number;
  stress: StressResult;
  intonation: IntonationResult;
  rhythm: RhythmResult;
  confidence: number; // 0-100
  commonMistake: boolean;
  frequency: number;
  patterns: string[];
  improvements: string[];
  resources: string[];
  practice: string[];
}

export interface ParagraphError {
  id: string;
  paragraph: string;
  expected: string;
  actual: string;
  type: 'pronunciation' | 'stress' | 'intonation' | 'rhythm' | 'fluency' | 'prosody';
  severity: ErrorSeverity;
  description: string;
  suggestion: string;
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  sentences: number;
  words: number;
  syllables: number;
  phonemes: number;
  fluency: FluencyResult;
  prosody: ProsodyResult;
  confidence: number; // 0-100
  commonMistake: boolean;
  frequency: number;
  patterns: string[];
  improvements: string[];
  resources: string[];
  practice: string[];
}

export interface IntonationError {
  id: string;
  type: 'pattern' | 'appropriateness' | 'expressiveness' | 'naturalness';
  severity: ErrorSeverity;
  description: string;
  suggestion: string;
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  expected: number[]; // pitch contour
  actual: number[]; // pitch contour
  confidence: number; // 0-100
  commonMistake: boolean;
  frequency: number;
  patterns: string[];
  improvements: string[];
  resources: string[];
  practice: string[];
}

export interface RhythmError {
  id: string;
  type: 'tempo' | 'regularity' | 'stress' | 'appropriateness' | 'naturalness';
  severity: ErrorSeverity;
  description: string;
  suggestion: string;
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  expected: number; // BPM or pattern
  actual: number; // BPM or pattern
  confidence: number; // 0-100
  commonMistake: boolean;
  frequency: number;
  patterns: string[];
  improvements: string[];
  resources: string[];
  practice: string[];
}

export interface FluencyError {
  id: string;
  type: 'rate' | 'pause' | 'rhythm' | 'smoothness' | 'naturalness';
  severity: ErrorSeverity;
  description: string;
  suggestion: string;
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  expected: number; // rate or pattern
  actual: number; // rate or pattern
  confidence: number; // 0-100
  commonMistake: boolean;
  frequency: number;
  patterns: string[];
  improvements: string[];
  resources: string[];
  practice: string[];
}

export interface StressError {
  id: string;
  type: 'placement' | 'intensity' | 'duration' | 'appropriateness';
  severity: ErrorSeverity;
  description: string;
  suggestion: string;
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  expected: number; // 0-1
  actual: number; // 0-1
  confidence: number; // 0-100
  commonMistake: boolean;
  frequency: number;
  patterns: string[];
  improvements: string[];
  resources: string[];
  practice: string[];
}

// ============================================================================
// IMPROVEMENT AND RECOMMENDATION INTERFACES
// ============================================================================

export interface Improvement {
  id: string;
  type: ImprovementType;
  priority: Priority;
  title: string;
  description: string;
  suggestion: string;
  practice: string;
  resources: string[];
  estimatedTime: string;
  difficulty: Difficulty;
  target: string;
  current: string;
  goal: string;
  progress: number; // 0-100
  status: ImprovementStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Recommendation {
  id: string;
  type: RecommendationType;
  priority: Priority;
  title: string;
  description: string;
  suggestion: string;
  practice: string;
  resources: string[];
  estimatedTime: string;
  difficulty: Difficulty;
  target: string;
  current: string;
  goal: string;
  progress: number; // 0-100
  status: RecommendationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgressMetrics {
  overall: number; // 0-100
  accuracy: number; // 0-100
  clarity: number; // 0-100
  fluency: number; // 0-100
  prosody: number; // 0-100
  intelligibility: number; // 0-100
  naturalness: number; // 0-100
  confidence: number; // 0-100
  trends: ProgressTrend[];
  milestones: Milestone[];
  achievements: Achievement[];
}

export interface ProgressTrend {
  metric: string;
  trend: 'improving' | 'stable' | 'declining';
  change: number; // percentage
  period: string;
  description: string;
  confidence: number; // 0-100
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  target: number; // 0-100
  current: number; // 0-100
  progress: number; // 0-100
  status: 'not_started' | 'in_progress' | 'completed';
  createdAt: Date;
  achievedAt?: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'accuracy' | 'clarity' | 'fluency' | 'prosody' | 'intelligibility' | 'naturalness';
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  progress: number; // 0-100
  status: 'not_started' | 'in_progress' | 'completed';
  createdAt: Date;
  achievedAt?: Date;
}

// ============================================================================
// ENUMS AND TYPES
// ============================================================================

export type RecognitionStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type ErrorType = 'pronunciation' | 'stress' | 'intonation' | 'rhythm' | 'fluency' | 'prosody' | 'clarity' | 'accuracy';
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';
export type ErrorCategory = 'phoneme' | 'word' | 'syllable' | 'sentence' | 'paragraph' | 'prosody' | 'fluency';
export type ImprovementType = 'pronunciation' | 'stress' | 'intonation' | 'rhythm' | 'fluency' | 'prosody' | 'clarity' | 'accuracy';
export type RecommendationType = 'pronunciation' | 'stress' | 'intonation' | 'rhythm' | 'fluency' | 'prosody' | 'clarity' | 'accuracy';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type ImprovementStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type RecommendationStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

// ============================================================================
// API ENDPOINT INTERFACES
// ============================================================================

export interface SpeechAnalysisAPI {
  // Recognition endpoints
  recognizeSpeech: (params: RecognizeSpeechParams) => Promise<SpeechRecognition>;
  getRecognition: (recognitionId: string) => Promise<SpeechRecognition>;
  listRecognitions: (params: ListRecognitionsParams) => Promise<SpeechRecognition[]>;
  
  // Assessment endpoints
  assessPronunciation: (params: AssessPronunciationParams) => Promise<PronunciationAssessment>;
  getAssessment: (assessmentId: string) => Promise<PronunciationAssessment>;
  listAssessments: (params: ListAssessmentsParams) => Promise<PronunciationAssessment[]>;
  
  // Error analysis endpoints
  analyzeErrors: (params: AnalyzeErrorsParams) => Promise<PronunciationError[]>;
  getErrorAnalysis: (errorId: string) => Promise<PronunciationError>;
  listErrors: (params: ListErrorsParams) => Promise<PronunciationError[]>;
  
  // Improvement endpoints
  generateImprovements: (params: GenerateImprovementsParams) => Promise<Improvement[]>;
  getImprovement: (improvementId: string) => Promise<Improvement>;
  listImprovements: (params: ListImprovementsParams) => Promise<Improvement[]>;
  
  // Recommendation endpoints
  generateRecommendations: (params: GenerateRecommendationsParams) => Promise<Recommendation[]>;
  getRecommendation: (recommendationId: string) => Promise<Recommendation>;
  listRecommendations: (params: ListRecommendationsParams) => Promise<Recommendation[]>;
  
  // Progress endpoints
  getProgress: (params: GetProgressParams) => Promise<ProgressMetrics>;
  getTrends: (params: GetTrendsParams) => Promise<ProgressTrend[]>;
  getMilestones: (params: GetMilestonesParams) => Promise<Milestone[]>;
  getAchievements: (params: GetAchievementsParams) => Promise<Achievement[]>;
}

// ============================================================================
// API PARAMETER INTERFACES
// ============================================================================

export interface RecognizeSpeechParams {
  recordingId: string;
  language: string;
  dialect?: string;
  accent?: string;
  model?: string;
  parameters?: Record<string, any>;
}

export interface ListRecognitionsParams {
  userId?: string;
  sessionId?: string;
  startDate?: Date;
  endDate?: Date;
  status?: RecognitionStatus;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface AssessPronunciationParams {
  recognitionId: string;
  assessmentTypes: string[];
  parameters?: Record<string, any>;
}

export interface ListAssessmentsParams {
  userId?: string;
  sessionId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface AnalyzeErrorsParams {
  assessmentId: string;
  errorTypes: string[];
  parameters?: Record<string, any>;
}

export interface ListErrorsParams {
  userId?: string;
  sessionId?: string;
  errorType?: ErrorType;
  severity?: ErrorSeverity;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GenerateImprovementsParams {
  assessmentId: string;
  improvementTypes: string[];
  parameters?: Record<string, any>;
}

export interface ListImprovementsParams {
  userId?: string;
  sessionId?: string;
  type?: ImprovementType;
  priority?: Priority;
  status?: ImprovementStatus;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GenerateRecommendationsParams {
  assessmentId: string;
  recommendationTypes: string[];
  parameters?: Record<string, any>;
}

export interface ListRecommendationsParams {
  userId?: string;
  sessionId?: string;
  type?: RecommendationType;
  priority?: Priority;
  status?: RecommendationStatus;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GetProgressParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  metrics?: string[];
}

export interface GetTrendsParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  metrics?: string[];
  period?: string;
}

export interface GetMilestonesParams {
  userId: string;
  status?: 'not_started' | 'in_progress' | 'completed';
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GetAchievementsParams {
  userId: string;
  type?: 'accuracy' | 'clarity' | 'fluency' | 'prosody' | 'intelligibility' | 'naturalness';
  level?: 'bronze' | 'silver' | 'gold' | 'platinum';
  status?: 'not_started' | 'in_progress' | 'completed';
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// TOOL FUNCTION INTERFACES
// ============================================================================

export interface SpeechAnalysisTools {
  // Recognition tools
  recognizeSpeech: (params: RecognizeSpeechParams) => Promise<SpeechRecognition>;
  getRecognitionStatus: (recognitionId: string) => Promise<RecognitionStatus>;
  getRecognitionResults: (recognitionId: string) => Promise<RecognitionResult[]>;
  getRecognitionAlternatives: (recognitionId: string) => Promise<RecognitionAlternative[]>;
  
  // Assessment tools
  assessPronunciation: (params: AssessPronunciationParams) => Promise<PronunciationAssessment>;
  assessPhonemes: (recognitionId: string, params: Record<string, any>) => Promise<PhonemeAssessment[]>;
  assessWords: (recognitionId: string, params: Record<string, any>) => Promise<WordAssessment[]>;
  assessSyllables: (recognitionId: string, params: Record<string, any>) => Promise<SyllableAssessment[]>;
  assessSentences: (recognitionId: string, params: Record<string, any>) => Promise<SentenceAssessment[]>;
  assessParagraphs: (recognitionId: string, params: Record<string, any>) => Promise<ParagraphAssessment[]>;
  
  // Error analysis tools
  analyzeErrors: (params: AnalyzeErrorsParams) => Promise<PronunciationError[]>;
  detectPhonemeErrors: (assessmentId: string, params: Record<string, any>) => Promise<PhonemeError[]>;
  detectWordErrors: (assessmentId: string, params: Record<string, any>) => Promise<WordError[]>;
  detectSyllableErrors: (assessmentId: string, params: Record<string, any>) => Promise<SyllableError[]>;
  detectSentenceErrors: (assessmentId: string, params: Record<string, any>) => Promise<SentenceError[]>;
  detectParagraphErrors: (assessmentId: string, params: Record<string, any>) => Promise<ParagraphError[]>;
  detectIntonationErrors: (assessmentId: string, params: Record<string, any>) => Promise<IntonationError[]>;
  detectRhythmErrors: (assessmentId: string, params: Record<string, any>) => Promise<RhythmError[]>;
  detectFluencyErrors: (assessmentId: string, params: Record<string, any>) => Promise<FluencyError[]>;
  detectStressErrors: (assessmentId: string, params: Record<string, any>) => Promise<StressError[]>;
  
  // Improvement tools
  generateImprovements: (params: GenerateImprovementsParams) => Promise<Improvement[]>;
  getImprovementProgress: (improvementId: string) => Promise<number>;
  updateImprovementStatus: (improvementId: string, status: ImprovementStatus) => Promise<Improvement>;
  
  // Recommendation tools
  generateRecommendations: (params: GenerateRecommendationsParams) => Promise<Recommendation[]>;
  getRecommendationProgress: (recommendationId: string) => Promise<number>;
  updateRecommendationStatus: (recommendationId: string, status: RecommendationStatus) => Promise<Recommendation>;
  
  // Progress tools
  getProgress: (params: GetProgressParams) => Promise<ProgressMetrics>;
  getTrends: (params: GetTrendsParams) => Promise<ProgressTrend[]>;
  getMilestones: (params: GetMilestonesParams) => Promise<Milestone[]>;
  getAchievements: (params: GetAchievementsParams) => Promise<Achievement[]>;
  updateProgress: (userId: string, metrics: Partial<ProgressMetrics>) => Promise<ProgressMetrics>;
  
  // Utility tools
  validateSpeech: (recordingId: string) => Promise<boolean>;
  getSpeechInfo: (recordingId: string) => Promise<RecognitionMetadata>;
  compareSpeech: (recordingId1: string, recordingId2: string) => Promise<ComparisonResult>;
  exportResults: (recognitionId: string, format: string) => Promise<string>;
}

export interface ComparisonResult {
  similarity: number; // 0-100
  differences: string[];
  improvements: string[];
  regressions: string[];
  overall: number; // 0-100
  details: Record<string, number>;
}

// ============================================================================
// EXPORT ALL INTERFACES
// ============================================================================

export * from './speech-analysis.schema';
