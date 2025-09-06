/**
 * Learning Progress Schema for Pronunciation Learning Platform
 * 
 * This schema defines the data structures and API endpoints for tracking and managing
 * learning progress in the pronunciation learning system. It handles progress tracking,
 * learning paths, assessments, and performance analytics.
 * 
 * @version 1.0.0
 * @author TEKIMAX Research & Development
 */

// ============================================================================
// LEARNING PROGRESS INTERFACES
// ============================================================================

export interface LearningProgress {
  id: string;
  userId: string;
  sessionId: string;
  timestamp: Date;
  overall: ProgressScore;
  pronunciation: PronunciationProgress;
  fluency: FluencyProgress;
  prosody: ProsodyProgress;
  accuracy: AccuracyProgress;
  clarity: ClarityProgress;
  intelligibility: IntelligibilityProgress;
  naturalness: NaturalnessProgress;
  confidence: ConfidenceProgress;
  milestones: Milestone[];
  achievements: Achievement[];
  trends: ProgressTrend[];
  goals: Goal[];
  challenges: Challenge[];
  practice: PracticeSession[];
  assessments: Assessment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgressScore {
  overall: number; // 0-100
  pronunciation: number; // 0-100
  fluency: number; // 0-100
  prosody: number; // 0-100
  accuracy: number; // 0-100
  clarity: number; // 0-100
  intelligibility: number; // 0-100
  naturalness: number; // 0-100
  confidence: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface PronunciationProgress {
  overall: number; // 0-100
  phonemes: PhonemeProgress[];
  words: WordProgress[];
  syllables: SyllableProgress[];
  sentences: SentenceProgress[];
  paragraphs: ParagraphProgress[];
  accuracy: number; // 0-100
  clarity: number; // 0-100
  consistency: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface PhonemeProgress {
  phoneme: string;
  accuracy: number; // 0-100
  clarity: number; // 0-100
  consistency: number; // 0-100
  practiceCount: number;
  lastPractice: Date;
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
  errors: PhonemeError[];
  improvements: string[];
}

export interface WordProgress {
  word: string;
  accuracy: number; // 0-100
  clarity: number; // 0-100
  consistency: number; // 0-100
  practiceCount: number;
  lastPractice: Date;
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
  errors: WordError[];
  improvements: string[];
}

export interface SyllableProgress {
  syllable: string;
  accuracy: number; // 0-100
  clarity: number; // 0-100
  consistency: number; // 0-100
  practiceCount: number;
  lastPractice: Date;
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
  errors: SyllableError[];
  improvements: string[];
}

export interface SentenceProgress {
  sentence: string;
  accuracy: number; // 0-100
  clarity: number; // 0-100
  consistency: number; // 0-100
  practiceCount: number;
  lastPractice: Date;
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
  errors: SentenceError[];
  improvements: string[];
}

export interface ParagraphProgress {
  paragraph: string;
  accuracy: number; // 0-100
  clarity: number; // 0-100
  consistency: number; // 0-100
  practiceCount: number;
  lastPractice: Date;
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
  errors: ParagraphError[];
  improvements: string[];
}

export interface FluencyProgress {
  overall: number; // 0-100
  speakingRate: number; // words per minute
  articulationRate: number; // syllables per second
  pauseRatio: number; // 0-1
  pauseCount: number;
  averagePauseLength: number; // seconds
  rhythmRegularity: number; // 0-100
  tempoVariation: number; // 0-100
  smoothness: number; // 0-100
  naturalness: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface ProsodyProgress {
  overall: number; // 0-100
  pitch: PitchProgress;
  intensity: IntensityProgress;
  rhythm: RhythmProgress;
  intonation: IntonationProgress;
  stress: StressProgress;
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface PitchProgress {
  mean: number; // Hz
  range: number; // Hz
  variation: number; // 0-100
  appropriateness: number; // 0-100
  naturalness: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface IntensityProgress {
  mean: number; // dB
  range: number; // dB
  variation: number; // 0-100
  appropriateness: number; // 0-100
  naturalness: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface RhythmProgress {
  tempo: number; // BPM
  regularity: number; // 0-100
  stressPattern: number[]; // stress levels
  appropriateness: number; // 0-100
  naturalness: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface IntonationProgress {
  pattern: number[]; // pitch contour
  appropriateness: number; // 0-100
  expressiveness: number; // 0-100
  naturalness: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface StressProgress {
  accuracy: number; // 0-100
  appropriateness: number; // 0-100
  naturalness: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface AccuracyProgress {
  overall: number; // 0-100
  phonemes: number; // 0-100
  words: number; // 0-100
  syllables: number; // 0-100
  sentences: number; // 0-100
  paragraphs: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface ClarityProgress {
  overall: number; // 0-100
  phonemes: number; // 0-100
  words: number; // 0-100
  syllables: number; // 0-100
  sentences: number; // 0-100
  paragraphs: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface IntelligibilityProgress {
  overall: number; // 0-100
  phonemes: number; // 0-100
  words: number; // 0-100
  syllables: number; // 0-100
  sentences: number; // 0-100
  paragraphs: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface NaturalnessProgress {
  overall: number; // 0-100
  phonemes: number; // 0-100
  words: number; // 0-100
  syllables: number; // 0-100
  sentences: number; // 0-100
  paragraphs: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface ConfidenceProgress {
  overall: number; // 0-100
  phonemes: number; // 0-100
  words: number; // 0-100
  syllables: number; // 0-100
  sentences: number; // 0-100
  paragraphs: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

// ============================================================================
// MILESTONE AND ACHIEVEMENT INTERFACES
// ============================================================================

export interface Milestone {
  id: string;
  title: string;
  description: string;
  type: MilestoneType;
  category: MilestoneCategory;
  target: number; // 0-100
  current: number; // 0-100
  progress: number; // 0-100
  status: MilestoneStatus;
  priority: Priority;
  difficulty: Difficulty;
  estimatedTime: string;
  requirements: Requirement[];
  rewards: Reward[];
  createdAt: Date;
  achievedAt?: Date;
  expiresAt?: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: AchievementType;
  category: AchievementCategory;
  level: AchievementLevel;
  progress: number; // 0-100
  status: AchievementStatus;
  priority: Priority;
  difficulty: Difficulty;
  requirements: Requirement[];
  rewards: Reward[];
  createdAt: Date;
  achievedAt?: Date;
  expiresAt?: Date;
}

export interface Requirement {
  id: string;
  type: RequirementType;
  description: string;
  target: number;
  current: number;
  progress: number; // 0-100
  status: RequirementStatus;
  priority: Priority;
  difficulty: Difficulty;
  createdAt: Date;
  completedAt?: Date;
}

export interface Reward {
  id: string;
  type: RewardType;
  title: string;
  description: string;
  value: number;
  currency: string;
  status: RewardStatus;
  createdAt: Date;
  claimedAt?: Date;
  expiresAt?: Date;
}

// ============================================================================
// GOAL AND CHALLENGE INTERFACES
// ============================================================================

export interface Goal {
  id: string;
  title: string;
  description: string;
  type: GoalType;
  category: GoalCategory;
  target: number; // 0-100
  current: number; // 0-100
  progress: number; // 0-100
  status: GoalStatus;
  priority: Priority;
  difficulty: Difficulty;
  estimatedTime: string;
  startDate: Date;
  targetDate: Date;
  completedAt?: Date;
  requirements: Requirement[];
  rewards: Reward[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  category: ChallengeCategory;
  difficulty: Difficulty;
  duration: string;
  status: ChallengeStatus;
  startDate: Date;
  endDate: Date;
  completedAt?: Date;
  requirements: Requirement[];
  rewards: Reward[];
  participants: Participant[];
  leaderboard: LeaderboardEntry[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Participant {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  score: number;
  rank: number;
  progress: number; // 0-100
  status: ParticipantStatus;
  joinedAt: Date;
  completedAt?: Date;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  score: number;
  progress: number; // 0-100
  status: ParticipantStatus;
  joinedAt: Date;
  completedAt?: Date;
}

// ============================================================================
// PRACTICE SESSION INTERFACES
// ============================================================================

export interface PracticeSession {
  id: string;
  userId: string;
  sessionId: string;
  timestamp: Date;
  type: PracticeType;
  category: PracticeCategory;
  duration: number; // seconds
  exercises: Exercise[];
  results: PracticeResult[];
  progress: PracticeProgress;
  performance: PracticePerformance;
  feedback: PracticeFeedback;
  recommendations: Recommendation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  category: ExerciseCategory;
  difficulty: Difficulty;
  content: string;
  expected: string;
  actual: string;
  accuracy: number; // 0-100
  clarity: number; // 0-100
  confidence: number; // 0-100
  duration: number; // seconds
  attempts: number;
  success: boolean;
  errors: ExerciseError[];
  improvements: string[];
  createdAt: Date;
  completedAt?: Date;
}

export interface PracticeResult {
  overall: number; // 0-100
  accuracy: number; // 0-100
  clarity: number; // 0-100
  fluency: number; // 0-100
  prosody: number; // 0-100
  intelligibility: number; // 0-100
  naturalness: number; // 0-100
  confidence: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface PracticeProgress {
  overall: number; // 0-100
  accuracy: number; // 0-100
  clarity: number; // 0-100
  fluency: number; // 0-100
  prosody: number; // 0-100
  intelligibility: number; // 0-100
  naturalness: number; // 0-100
  confidence: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface PracticePerformance {
  overall: number; // 0-100
  accuracy: number; // 0-100
  clarity: number; // 0-100
  fluency: number; // 0-100
  prosody: number; // 0-100
  intelligibility: number; // 0-100
  naturalness: number; // 0-100
  confidence: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface PracticeFeedback {
  overall: string;
  accuracy: string;
  clarity: string;
  fluency: string;
  prosody: string;
  intelligibility: string;
  naturalness: string;
  confidence: string;
  improvements: string[];
  recommendations: string[];
  encouragement: string;
}

export interface ExerciseError {
  id: string;
  type: ErrorType;
  severity: ErrorSeverity;
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

// ============================================================================
// ASSESSMENT INTERFACES
// ============================================================================

export interface Assessment {
  id: string;
  userId: string;
  sessionId: string;
  timestamp: Date;
  type: AssessmentType;
  category: AssessmentCategory;
  difficulty: Difficulty;
  duration: number; // seconds
  questions: Question[];
  answers: Answer[];
  results: AssessmentResult[];
  progress: AssessmentProgress;
  performance: AssessmentPerformance;
  feedback: AssessmentFeedback;
  recommendations: Recommendation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  type: QuestionType;
  category: QuestionCategory;
  difficulty: Difficulty;
  content: string;
  expected: string;
  options: string[];
  correct: string;
  explanation: string;
  hints: string[];
  resources: string[];
  timeLimit: number; // seconds
  points: number;
  weight: number;
}

export interface Answer {
  id: string;
  questionId: string;
  content: string;
  accuracy: number; // 0-100
  clarity: number; // 0-100
  confidence: number; // 0-100
  duration: number; // seconds
  attempts: number;
  success: boolean;
  errors: AnswerError[];
  improvements: string[];
  createdAt: Date;
  completedAt?: Date;
}

export interface AssessmentResult {
  overall: number; // 0-100
  accuracy: number; // 0-100
  clarity: number; // 0-100
  fluency: number; // 0-100
  prosody: number; // 0-100
  intelligibility: number; // 0-100
  naturalness: number; // 0-100
  confidence: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface AssessmentProgress {
  overall: number; // 0-100
  accuracy: number; // 0-100
  clarity: number; // 0-100
  fluency: number; // 0-100
  prosody: number; // 0-100
  intelligibility: number; // 0-100
  naturalness: number; // 0-100
  confidence: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface AssessmentPerformance {
  overall: number; // 0-100
  accuracy: number; // 0-100
  clarity: number; // 0-100
  fluency: number; // 0-100
  prosody: number; // 0-100
  intelligibility: number; // 0-100
  naturalness: number; // 0-100
  confidence: number; // 0-100
  improvement: number; // percentage change
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

export interface AssessmentFeedback {
  overall: string;
  accuracy: string;
  clarity: string;
  fluency: string;
  prosody: string;
  intelligibility: string;
  naturalness: string;
  confidence: string;
  improvements: string[];
  recommendations: string[];
  encouragement: string;
}

export interface AnswerError {
  id: string;
  type: ErrorType;
  severity: ErrorSeverity;
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

// ============================================================================
// TREND AND ANALYTICS INTERFACES
// ============================================================================

export interface ProgressTrend {
  metric: string;
  trend: 'improving' | 'stable' | 'declining';
  change: number; // percentage
  period: string;
  description: string;
  confidence: number; // 0-100
  data: TrendData[];
  predictions: TrendPrediction[];
}

export interface TrendData {
  timestamp: Date;
  value: number;
  confidence: number; // 0-100
  context: string;
}

export interface TrendPrediction {
  timestamp: Date;
  value: number;
  confidence: number; // 0-100
  context: string;
  scenario: 'optimistic' | 'realistic' | 'pessimistic';
}

// ============================================================================
// ENUMS AND TYPES
// ============================================================================

export type MilestoneType = 'accuracy' | 'clarity' | 'fluency' | 'prosody' | 'intelligibility' | 'naturalness' | 'confidence';
export type MilestoneCategory = 'pronunciation' | 'fluency' | 'prosody' | 'general';
export type MilestoneStatus = 'not_started' | 'in_progress' | 'completed' | 'cancelled';
export type AchievementType = 'accuracy' | 'clarity' | 'fluency' | 'prosody' | 'intelligibility' | 'naturalness' | 'confidence';
export type AchievementCategory = 'pronunciation' | 'fluency' | 'prosody' | 'general';
export type AchievementLevel = 'bronze' | 'silver' | 'gold' | 'platinum';
export type AchievementStatus = 'not_started' | 'in_progress' | 'completed' | 'cancelled';
export type RequirementType = 'accuracy' | 'clarity' | 'fluency' | 'prosody' | 'intelligibility' | 'naturalness' | 'confidence';
export type RequirementStatus = 'not_started' | 'in_progress' | 'completed' | 'cancelled';
export type RewardType = 'points' | 'badge' | 'certificate' | 'unlock' | 'bonus';
export type RewardStatus = 'pending' | 'claimed' | 'expired';
export type GoalType = 'accuracy' | 'clarity' | 'fluency' | 'prosody' | 'intelligibility' | 'naturalness' | 'confidence';
export type GoalCategory = 'pronunciation' | 'fluency' | 'prosody' | 'general';
export type GoalStatus = 'not_started' | 'in_progress' | 'completed' | 'cancelled';
export type ChallengeType = 'accuracy' | 'clarity' | 'fluency' | 'prosody' | 'intelligibility' | 'naturalness' | 'confidence';
export type ChallengeCategory = 'pronunciation' | 'fluency' | 'prosody' | 'general';
export type ChallengeStatus = 'not_started' | 'in_progress' | 'completed' | 'cancelled';
export type ParticipantStatus = 'active' | 'completed' | 'cancelled';
export type PracticeType = 'pronunciation' | 'fluency' | 'prosody' | 'general';
export type PracticeCategory = 'phoneme' | 'word' | 'syllable' | 'sentence' | 'paragraph';
export type ExerciseType = 'pronunciation' | 'fluency' | 'prosody' | 'general';
export type ExerciseCategory = 'phoneme' | 'word' | 'syllable' | 'sentence' | 'paragraph';
export type AssessmentType = 'pronunciation' | 'fluency' | 'prosody' | 'general';
export type AssessmentCategory = 'phoneme' | 'word' | 'syllable' | 'sentence' | 'paragraph';
export type QuestionType = 'pronunciation' | 'fluency' | 'prosody' | 'general';
export type QuestionCategory = 'phoneme' | 'word' | 'syllable' | 'sentence' | 'paragraph';
export type ErrorType = 'pronunciation' | 'stress' | 'intonation' | 'rhythm' | 'fluency' | 'prosody' | 'clarity' | 'accuracy';
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type Difficulty = 'easy' | 'medium' | 'hard';

// ============================================================================
// API ENDPOINT INTERFACES
// ============================================================================

export interface LearningProgressAPI {
  // Progress endpoints
  getProgress: (params: GetProgressParams) => Promise<LearningProgress>;
  updateProgress: (params: UpdateProgressParams) => Promise<LearningProgress>;
  listProgress: (params: ListProgressParams) => Promise<LearningProgress[]>;
  
  // Milestone endpoints
  getMilestones: (params: GetMilestonesParams) => Promise<Milestone[]>;
  updateMilestone: (params: UpdateMilestoneParams) => Promise<Milestone>;
  listMilestones: (params: ListMilestonesParams) => Promise<Milestone[]>;
  
  // Achievement endpoints
  getAchievements: (params: GetAchievementsParams) => Promise<Achievement[]>;
  updateAchievement: (params: UpdateAchievementParams) => Promise<Achievement>;
  listAchievements: (params: ListAchievementsParams) => Promise<Achievement[]>;
  
  // Goal endpoints
  getGoals: (params: GetGoalsParams) => Promise<Goal[]>;
  createGoal: (params: CreateGoalParams) => Promise<Goal>;
  updateGoal: (params: UpdateGoalParams) => Promise<Goal>;
  deleteGoal: (goalId: string) => Promise<void>;
  listGoals: (params: ListGoalsParams) => Promise<Goal[]>;
  
  // Challenge endpoints
  getChallenges: (params: GetChallengesParams) => Promise<Challenge[]>;
  createChallenge: (params: CreateChallengeParams) => Promise<Challenge>;
  updateChallenge: (params: UpdateChallengeParams) => Promise<Challenge>;
  deleteChallenge: (challengeId: string) => Promise<void>;
  listChallenges: (params: ListChallengesParams) => Promise<Challenge[]>;
  
  // Practice session endpoints
  getPracticeSessions: (params: GetPracticeSessionsParams) => Promise<PracticeSession[]>;
  createPracticeSession: (params: CreatePracticeSessionParams) => Promise<PracticeSession>;
  updatePracticeSession: (params: UpdatePracticeSessionParams) => Promise<PracticeSession>;
  deletePracticeSession: (sessionId: string) => Promise<void>;
  listPracticeSessions: (params: ListPracticeSessionsParams) => Promise<PracticeSession[]>;
  
  // Assessment endpoints
  getAssessments: (params: GetAssessmentsParams) => Promise<Assessment[]>;
  createAssessment: (params: CreateAssessmentParams) => Promise<Assessment>;
  updateAssessment: (params: UpdateAssessmentParams) => Promise<Assessment>;
  deleteAssessment: (assessmentId: string) => Promise<void>;
  listAssessments: (params: ListAssessmentsParams) => Promise<Assessment[]>;
  
  // Trend endpoints
  getTrends: (params: GetTrendsParams) => Promise<ProgressTrend[]>;
  getPredictions: (params: GetPredictionsParams) => Promise<TrendPrediction[]>;
}

// ============================================================================
// API PARAMETER INTERFACES
// ============================================================================

export interface GetProgressParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  metrics?: string[];
}

export interface UpdateProgressParams {
  userId: string;
  progress: Partial<LearningProgress>;
  metrics?: string[];
}

export interface ListProgressParams {
  userId?: string;
  startDate?: Date;
  endDate?: Date;
  metrics?: string[];
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GetMilestonesParams {
  userId: string;
  type?: MilestoneType;
  category?: MilestoneCategory;
  status?: MilestoneStatus;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UpdateMilestoneParams {
  milestoneId: string;
  milestone: Partial<Milestone>;
}

export interface ListMilestonesParams {
  userId?: string;
  type?: MilestoneType;
  category?: MilestoneCategory;
  status?: MilestoneStatus;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GetAchievementsParams {
  userId: string;
  type?: AchievementType;
  category?: AchievementCategory;
  level?: AchievementLevel;
  status?: AchievementStatus;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UpdateAchievementParams {
  achievementId: string;
  achievement: Partial<Achievement>;
}

export interface ListAchievementsParams {
  userId?: string;
  type?: AchievementType;
  category?: AchievementCategory;
  level?: AchievementLevel;
  status?: AchievementStatus;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GetGoalsParams {
  userId: string;
  type?: GoalType;
  category?: GoalCategory;
  status?: GoalStatus;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateGoalParams {
  userId: string;
  goal: Partial<Goal>;
}

export interface UpdateGoalParams {
  goalId: string;
  goal: Partial<Goal>;
}

export interface ListGoalsParams {
  userId?: string;
  type?: GoalType;
  category?: GoalCategory;
  status?: GoalStatus;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GetChallengesParams {
  userId: string;
  type?: ChallengeType;
  category?: ChallengeCategory;
  status?: ChallengeStatus;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateChallengeParams {
  userId: string;
  challenge: Partial<Challenge>;
}

export interface UpdateChallengeParams {
  challengeId: string;
  challenge: Partial<Challenge>;
}

export interface ListChallengesParams {
  userId?: string;
  type?: ChallengeType;
  category?: ChallengeCategory;
  status?: ChallengeStatus;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GetPracticeSessionsParams {
  userId: string;
  type?: PracticeType;
  category?: PracticeCategory;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreatePracticeSessionParams {
  userId: string;
  session: Partial<PracticeSession>;
}

export interface UpdatePracticeSessionParams {
  sessionId: string;
  session: Partial<PracticeSession>;
}

export interface ListPracticeSessionsParams {
  userId?: string;
  type?: PracticeType;
  category?: PracticeCategory;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GetAssessmentsParams {
  userId: string;
  type?: AssessmentType;
  category?: AssessmentCategory;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateAssessmentParams {
  userId: string;
  assessment: Partial<Assessment>;
}

export interface UpdateAssessmentParams {
  assessmentId: string;
  assessment: Partial<Assessment>;
}

export interface ListAssessmentsParams {
  userId?: string;
  type?: AssessmentType;
  category?: AssessmentCategory;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GetTrendsParams {
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

// ============================================================================
// TOOL FUNCTION INTERFACES
// ============================================================================

export interface LearningProgressTools {
  // Progress tools
  getProgress: (params: GetProgressParams) => Promise<LearningProgress>;
  updateProgress: (params: UpdateProgressParams) => Promise<LearningProgress>;
  calculateProgress: (userId: string, metrics: string[]) => Promise<ProgressScore>;
  getProgressHistory: (userId: string, startDate: Date, endDate: Date) => Promise<LearningProgress[]>;
  
  // Milestone tools
  getMilestones: (params: GetMilestonesParams) => Promise<Milestone[]>;
  updateMilestone: (params: UpdateMilestoneParams) => Promise<Milestone>;
  checkMilestoneProgress: (milestoneId: string) => Promise<number>;
  completeMilestone: (milestoneId: string) => Promise<Milestone>;
  
  // Achievement tools
  getAchievements: (params: GetAchievementsParams) => Promise<Achievement[]>;
  updateAchievement: (params: UpdateAchievementParams) => Promise<Achievement>;
  checkAchievementProgress: (achievementId: string) => Promise<number>;
  completeAchievement: (achievementId: string) => Promise<Achievement>;
  
  // Goal tools
  getGoals: (params: GetGoalsParams) => Promise<Goal[]>;
  createGoal: (params: CreateGoalParams) => Promise<Goal>;
  updateGoal: (params: UpdateGoalParams) => Promise<Goal>;
  deleteGoal: (goalId: string) => Promise<void>;
  checkGoalProgress: (goalId: string) => Promise<number>;
  completeGoal: (goalId: string) => Promise<Goal>;
  
  // Challenge tools
  getChallenges: (params: GetChallengesParams) => Promise<Challenge[]>;
  createChallenge: (params: CreateChallengeParams) => Promise<Challenge>;
  updateChallenge: (params: UpdateChallengeParams) => Promise<Challenge>;
  deleteChallenge: (challengeId: string) => Promise<void>;
  joinChallenge: (challengeId: string, userId: string) => Promise<Participant>;
  leaveChallenge: (challengeId: string, userId: string) => Promise<void>;
  getChallengeLeaderboard: (challengeId: string) => Promise<LeaderboardEntry[]>;
  
  // Practice session tools
  getPracticeSessions: (params: GetPracticeSessionsParams) => Promise<PracticeSession[]>;
  createPracticeSession: (params: CreatePracticeSessionParams) => Promise<PracticeSession>;
  updatePracticeSession: (params: UpdatePracticeSessionParams) => Promise<PracticeSession>;
  deletePracticeSession: (sessionId: string) => Promise<void>;
  startPracticeSession: (userId: string, type: PracticeType) => Promise<PracticeSession>;
  endPracticeSession: (sessionId: string) => Promise<PracticeSession>;
  
  // Assessment tools
  getAssessments: (params: GetAssessmentsParams) => Promise<Assessment[]>;
  createAssessment: (params: CreateAssessmentParams) => Promise<Assessment>;
  updateAssessment: (params: UpdateAssessmentParams) => Promise<Assessment>;
  deleteAssessment: (assessmentId: string) => Promise<void>;
  startAssessment: (userId: string, type: AssessmentType) => Promise<Assessment>;
  endAssessment: (assessmentId: string) => Promise<Assessment>;
  
  // Trend tools
  getTrends: (params: GetTrendsParams) => Promise<ProgressTrend[]>;
  getPredictions: (params: GetPredictionsParams) => Promise<TrendPrediction[]>;
  analyzeTrends: (userId: string, metrics: string[]) => Promise<ProgressTrend[]>;
  predictProgress: (userId: string, metrics: string[], period: string) => Promise<TrendPrediction[]>;
  
  // Utility tools
  validateProgress: (progress: LearningProgress) => Promise<boolean>;
  exportProgress: (userId: string, format: string) => Promise<string>;
  importProgress: (userId: string, data: string, format: string) => Promise<LearningProgress>;
  compareProgress: (userId1: string, userId2: string) => Promise<ComparisonResult>;
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

export * from './learning-progress.schema';
