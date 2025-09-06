/**
 * User Profiles Schema for Pronunciation Learning Platform
 * 
 * This schema defines the data structures and API endpoints for user profile
 * management in the pronunciation learning system. It handles user preferences,
 * learning styles, accessibility needs, and personalization settings.
 * 
 * @version 1.0.0
 * @author TEKIMAX Research & Development
 */

// ============================================================================
// USER PROFILE INTERFACES
// ============================================================================

export interface UserProfile {
  id: string;
  userId: string;
  personal: PersonalInfo;
  learning: LearningProfile;
  accessibility: AccessibilityProfile;
  preferences: UserPreferences;
  progress: ProfileProgress;
  settings: UserSettings;
  metadata: ProfileMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  nationality?: string;
  nativeLanguage: string;
  targetLanguage: string;
  currentLevel: LanguageLevel;
  avatar?: string;
  bio?: string;
  timezone: string;
  location?: string;
}

export interface LearningProfile {
  learningStyle: LearningStyle[];
  difficultyPreference: DifficultyPreference;
  pacePreference: PacePreference;
  focusAreas: FocusArea[];
  goals: LearningGoal[];
  challenges: LearningChallenge[];
  strengths: LearningStrength[];
  weaknesses: LearningWeakness[];
  interests: LearningInterest[];
  motivation: Motivation;
  commitment: Commitment;
  experience: Experience;
}

export interface LearningStyle {
  type: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'writing';
  preference: number; // 0-100
  effectiveness: number; // 0-100
  description: string;
}

export interface DifficultyPreference {
  level: 'easy' | 'medium' | 'hard' | 'adaptive';
  adjustment: number; // -50 to 50
  autoAdjust: boolean;
  description: string;
}

export interface PacePreference {
  speed: 'slow' | 'medium' | 'fast' | 'adaptive';
  sessionLength: number; // minutes
  frequency: number; // sessions per week
  description: string;
}

export interface FocusArea {
  area: 'pronunciation' | 'fluency' | 'prosody' | 'accuracy' | 'clarity' | 'intelligibility' | 'naturalness' | 'confidence';
  priority: number; // 0-100
  currentLevel: number; // 0-100
  targetLevel: number; // 0-100
  description: string;
}

export interface LearningGoal {
  id: string;
  title: string;
  description: string;
  type: GoalType;
  target: number; // 0-100
  current: number; // 0-100
  deadline?: Date;
  status: GoalStatus;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
}

export interface LearningChallenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  difficulty: Difficulty;
  duration: string;
  status: ChallengeStatus;
  progress: number; // 0-100
  createdAt: Date;
  updatedAt: Date;
}

export interface LearningStrength {
  area: string;
  level: number; // 0-100
  description: string;
  examples: string[];
}

export interface LearningWeakness {
  area: string;
  level: number; // 0-100
  description: string;
  examples: string[];
  improvement: string[];
}

export interface LearningInterest {
  topic: string;
  level: number; // 0-100
  description: string;
  resources: string[];
}

export interface Motivation {
  type: 'intrinsic' | 'extrinsic' | 'mixed';
  level: number; // 0-100
  factors: string[];
  description: string;
}

export interface Commitment {
  level: number; // 0-100
  timeAvailable: number; // minutes per week
  consistency: number; // 0-100
  description: string;
}

export interface Experience {
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  years: number;
  description: string;
  achievements: string[];
}

// ============================================================================
// ACCESSIBILITY PROFILE INTERFACES
// ============================================================================

export interface AccessibilityProfile {
  visual: VisualAccessibility;
  auditory: AuditoryAccessibility;
  motor: MotorAccessibility;
  cognitive: CognitiveAccessibility;
  speech: SpeechAccessibility;
  language: LanguageAccessibility;
  preferences: AccessibilityPreferences;
}

export interface VisualAccessibility {
  needs: VisualNeed[];
  preferences: VisualPreference[];
  tools: VisualTool[];
  adaptations: VisualAdaptation[];
}

export interface VisualNeed {
  type: 'color_blindness' | 'low_vision' | 'blindness' | 'light_sensitivity' | 'contrast_sensitivity';
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  accommodations: string[];
}

export interface VisualPreference {
  type: 'high_contrast' | 'large_text' | 'dark_mode' | 'color_scheme' | 'font_size';
  value: string;
  description: string;
}

export interface VisualTool {
  type: 'screen_reader' | 'magnifier' | 'color_filter' | 'text_to_speech';
  name: string;
  description: string;
  settings: Record<string, any>;
}

export interface VisualAdaptation {
  type: 'text_size' | 'color_contrast' | 'layout' | 'navigation';
  value: string;
  description: string;
}

export interface AuditoryAccessibility {
  needs: AuditoryNeed[];
  preferences: AuditoryPreference[];
  tools: AuditoryTool[];
  adaptations: AuditoryAdaptation[];
}

export interface AuditoryNeed {
  type: 'hearing_impairment' | 'deafness' | 'tinnitus' | 'auditory_processing';
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  accommodations: string[];
}

export interface AuditoryPreference {
  type: 'volume' | 'pitch' | 'speed' | 'clarity' | 'background_noise';
  value: string;
  description: string;
}

export interface AuditoryTool {
  type: 'hearing_aid' | 'cochlear_implant' | 'assistive_listening' | 'captioning';
  name: string;
  description: string;
  settings: Record<string, any>;
}

export interface AuditoryAdaptation {
  type: 'volume' | 'pitch' | 'speed' | 'clarity' | 'captioning';
  value: string;
  description: string;
}

export interface MotorAccessibility {
  needs: MotorNeed[];
  preferences: MotorPreference[];
  tools: MotorTool[];
  adaptations: MotorAdaptation[];
}

export interface MotorNeed {
  type: 'limited_mobility' | 'tremor' | 'paralysis' | 'coordination' | 'strength';
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  accommodations: string[];
}

export interface MotorPreference {
  type: 'input_method' | 'response_time' | 'gesture_size' | 'button_size';
  value: string;
  description: string;
}

export interface MotorTool {
  type: 'voice_control' | 'eye_tracking' | 'switch_control' | 'assistive_technology';
  name: string;
  description: string;
  settings: Record<string, any>;
}

export interface MotorAdaptation {
  type: 'input_method' | 'response_time' | 'gesture_size' | 'button_size';
  value: string;
  description: string;
}

export interface CognitiveAccessibility {
  needs: CognitiveNeed[];
  preferences: CognitivePreference[];
  tools: CognitiveTool[];
  adaptations: CognitiveAdaptation[];
}

export interface CognitiveNeed {
  type: 'attention' | 'memory' | 'processing' | 'executive_function' | 'learning';
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  accommodations: string[];
}

export interface CognitivePreference {
  type: 'complexity' | 'pace' | 'repetition' | 'structure' | 'feedback';
  value: string;
  description: string;
}

export interface CognitiveTool {
  type: 'reminder' | 'organizer' | 'assistant' | 'simplifier';
  name: string;
  description: string;
  settings: Record<string, any>;
}

export interface CognitiveAdaptation {
  type: 'complexity' | 'pace' | 'repetition' | 'structure' | 'feedback';
  value: string;
  description: string;
}

export interface SpeechAccessibility {
  needs: SpeechNeed[];
  preferences: SpeechPreference[];
  tools: SpeechTool[];
  adaptations: SpeechAdaptation[];
}

export interface SpeechNeed {
  type: 'speech_impairment' | 'articulation' | 'fluency' | 'voice' | 'resonance';
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  accommodations: string[];
}

export interface SpeechPreference {
  type: 'recognition_sensitivity' | 'feedback_type' | 'practice_mode' | 'assessment_style';
  value: string;
  description: string;
}

export interface SpeechTool {
  type: 'speech_therapy' | 'augmentative_communication' | 'voice_synthesis' | 'recognition_assist';
  name: string;
  description: string;
  settings: Record<string, any>;
}

export interface SpeechAdaptation {
  type: 'recognition_sensitivity' | 'feedback_type' | 'practice_mode' | 'assessment_style';
  value: string;
  description: string;
}

export interface LanguageAccessibility {
  needs: LanguageNeed[];
  preferences: LanguagePreference[];
  tools: LanguageTool[];
  adaptations: LanguageAdaptation[];
}

export interface LanguageNeed {
  type: 'language_processing' | 'reading' | 'writing' | 'comprehension' | 'expression';
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  accommodations: string[];
}

export interface LanguagePreference {
  type: 'language_level' | 'vocabulary' | 'grammar' | 'pronunciation' | 'cultural_context';
  value: string;
  description: string;
}

export interface LanguageTool {
  type: 'translation' | 'dictionary' | 'grammar_checker' | 'pronunciation_guide';
  name: string;
  description: string;
  settings: Record<string, any>;
}

export interface LanguageAdaptation {
  type: 'language_level' | 'vocabulary' | 'grammar' | 'pronunciation' | 'cultural_context';
  value: string;
  description: string;
}

export interface AccessibilityPreferences {
  overall: AccessibilityLevel;
  priority: AccessibilityPriority[];
  accommodations: AccessibilityAccommodation[];
  tools: AccessibilityTool[];
  adaptations: AccessibilityAdaptation[];
}

export interface AccessibilityLevel {
  level: 'basic' | 'enhanced' | 'comprehensive' | 'custom';
  description: string;
}

export interface AccessibilityPriority {
  area: string;
  priority: number; // 0-100
  description: string;
}

export interface AccessibilityAccommodation {
  type: string;
  description: string;
  enabled: boolean;
  settings: Record<string, any>;
}

export interface AccessibilityTool {
  type: string;
  name: string;
  description: string;
  enabled: boolean;
  settings: Record<string, any>;
}

export interface AccessibilityAdaptation {
  type: string;
  value: string;
  description: string;
  enabled: boolean;
}

// ============================================================================
// USER PREFERENCES INTERFACES
// ============================================================================

export interface UserPreferences {
  interface: InterfacePreferences;
  learning: LearningPreferences;
  communication: CommunicationPreferences;
  privacy: PrivacyPreferences;
  notifications: NotificationPreferences;
  content: ContentPreferences;
  social: SocialPreferences;
}

export interface InterfacePreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  fontSize: 'small' | 'medium' | 'large' | 'extra_large';
  colorScheme: string;
  layout: 'compact' | 'comfortable' | 'spacious';
  navigation: 'simple' | 'advanced' | 'expert';
  animations: boolean;
  sounds: boolean;
  haptics: boolean;
}

export interface LearningPreferences {
  difficulty: 'easy' | 'medium' | 'hard' | 'adaptive';
  pace: 'slow' | 'medium' | 'fast' | 'adaptive';
  sessionLength: number; // minutes
  frequency: number; // sessions per week
  reminders: boolean;
  breaks: boolean;
  progressTracking: boolean;
  goalSetting: boolean;
  challenges: boolean;
  achievements: boolean;
}

export interface CommunicationPreferences {
  language: string;
  dialect: string;
  accent: string;
  formality: 'casual' | 'formal' | 'mixed';
  feedback: 'immediate' | 'delayed' | 'summary';
  encouragement: 'minimal' | 'moderate' | 'extensive';
  corrections: 'gentle' | 'direct' | 'detailed';
  explanations: 'brief' | 'detailed' | 'comprehensive';
}

export interface PrivacyPreferences {
  dataSharing: 'none' | 'anonymous' | 'limited' | 'full';
  progressSharing: boolean;
  achievementSharing: boolean;
  socialFeatures: boolean;
  analytics: boolean;
  personalization: boolean;
  location: boolean;
  contacts: boolean;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
  frequency: 'immediate' | 'daily' | 'weekly' | 'never';
  types: NotificationType[];
  quietHours: QuietHours;
}

export interface NotificationType {
  type: 'reminder' | 'achievement' | 'progress' | 'challenge' | 'social' | 'system';
  enabled: boolean;
  frequency: 'immediate' | 'daily' | 'weekly' | 'never';
}

export interface QuietHours {
  enabled: boolean;
  start: string; // HH:MM
  end: string; // HH:MM
  timezone: string;
}

export interface ContentPreferences {
  topics: string[];
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  length: 'short' | 'medium' | 'long' | 'mixed';
  format: 'text' | 'audio' | 'video' | 'interactive' | 'mixed';
  language: string;
  dialect: string;
  accent: string;
  cultural: string[];
  ageAppropriate: boolean;
}

export interface SocialPreferences {
  sharing: boolean;
  collaboration: boolean;
  competition: boolean;
  mentoring: boolean;
  community: boolean;
  leaderboards: boolean;
  achievements: boolean;
  challenges: boolean;
  groups: boolean;
  messaging: boolean;
}

// ============================================================================
// PROFILE PROGRESS INTERFACES
// ============================================================================

export interface ProfileProgress {
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
  lastUpdated: Date;
}

// ============================================================================
// USER SETTINGS INTERFACES
// ============================================================================

export interface UserSettings {
  account: AccountSettings;
  security: SecuritySettings;
  data: DataSettings;
  backup: BackupSettings;
  sync: SyncSettings;
  advanced: AdvancedSettings;
}

export interface AccountSettings {
  username: string;
  email: string;
  phone?: string;
  timezone: string;
  language: string;
  currency: string;
  dateFormat: string;
  timeFormat: string;
  units: 'metric' | 'imperial';
}

export interface SecuritySettings {
  twoFactor: boolean;
  biometric: boolean;
  sessionTimeout: number; // minutes
  loginNotifications: boolean;
  deviceTrust: boolean;
  passwordPolicy: PasswordPolicy;
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
  expirationDays: number;
}

export interface DataSettings {
  retention: number; // days
  export: boolean;
  delete: boolean;
  anonymize: boolean;
  share: boolean;
  analytics: boolean;
  personalization: boolean;
}

export interface BackupSettings {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  location: 'local' | 'cloud' | 'both';
  encryption: boolean;
  compression: boolean;
  retention: number; // days
}

export interface SyncSettings {
  enabled: boolean;
  frequency: 'real_time' | 'hourly' | 'daily';
  devices: string[];
  conflicts: 'manual' | 'automatic' | 'prompt';
  offline: boolean;
}

export interface AdvancedSettings {
  debug: boolean;
  logging: boolean;
  telemetry: boolean;
  experiments: boolean;
  beta: boolean;
  developer: boolean;
  api: boolean;
  webhooks: boolean;
}

// ============================================================================
// PROFILE METADATA INTERFACES
// ============================================================================

export interface ProfileMetadata {
  version: string;
  createdBy: string;
  lastModifiedBy: string;
  source: string;
  tags: string[];
  notes: string;
  custom: Record<string, any>;
}

// ============================================================================
// ENUMS AND TYPES
// ============================================================================

export type LanguageLevel = 'beginner' | 'elementary' | 'intermediate' | 'upper_intermediate' | 'advanced' | 'proficient' | 'native';
export type GoalType = 'pronunciation' | 'fluency' | 'prosody' | 'accuracy' | 'clarity' | 'intelligibility' | 'naturalness' | 'confidence';
export type GoalStatus = 'not_started' | 'in_progress' | 'completed' | 'cancelled';
export type ChallengeType = 'pronunciation' | 'fluency' | 'prosody' | 'accuracy' | 'clarity' | 'intelligibility' | 'naturalness' | 'confidence';
export type ChallengeStatus = 'not_started' | 'in_progress' | 'completed' | 'cancelled';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type Difficulty = 'easy' | 'medium' | 'hard';

// ============================================================================
// API ENDPOINT INTERFACES
// ============================================================================

export interface UserProfilesAPI {
  // Profile endpoints
  getProfile: (userId: string) => Promise<UserProfile>;
  updateProfile: (params: UpdateProfileParams) => Promise<UserProfile>;
  createProfile: (params: CreateProfileParams) => Promise<UserProfile>;
  deleteProfile: (userId: string) => Promise<void>;
  
  // Personal info endpoints
  getPersonalInfo: (userId: string) => Promise<PersonalInfo>;
  updatePersonalInfo: (params: UpdatePersonalInfoParams) => Promise<PersonalInfo>;
  
  // Learning profile endpoints
  getLearningProfile: (userId: string) => Promise<LearningProfile>;
  updateLearningProfile: (params: UpdateLearningProfileParams) => Promise<LearningProfile>;
  
  // Accessibility endpoints
  getAccessibilityProfile: (userId: string) => Promise<AccessibilityProfile>;
  updateAccessibilityProfile: (params: UpdateAccessibilityProfileParams) => Promise<AccessibilityProfile>;
  
  // Preferences endpoints
  getPreferences: (userId: string) => Promise<UserPreferences>;
  updatePreferences: (params: UpdatePreferencesParams) => Promise<UserPreferences>;
  
  // Settings endpoints
  getSettings: (userId: string) => Promise<UserSettings>;
  updateSettings: (params: UpdateSettingsParams) => Promise<UserSettings>;
  
  // Progress endpoints
  getProgress: (userId: string) => Promise<ProfileProgress>;
  updateProgress: (params: UpdateProgressParams) => Promise<ProfileProgress>;
}

// ============================================================================
// API PARAMETER INTERFACES
// ============================================================================

export interface UpdateProfileParams {
  userId: string;
  profile: Partial<UserProfile>;
}

export interface CreateProfileParams {
  userId: string;
  profile: Partial<UserProfile>;
}

export interface UpdatePersonalInfoParams {
  userId: string;
  personalInfo: Partial<PersonalInfo>;
}

export interface UpdateLearningProfileParams {
  userId: string;
  learningProfile: Partial<LearningProfile>;
}

export interface UpdateAccessibilityProfileParams {
  userId: string;
  accessibilityProfile: Partial<AccessibilityProfile>;
}

export interface UpdatePreferencesParams {
  userId: string;
  preferences: Partial<UserPreferences>;
}

export interface UpdateSettingsParams {
  userId: string;
  settings: Partial<UserSettings>;
}

export interface UpdateProgressParams {
  userId: string;
  progress: Partial<ProfileProgress>;
}

// ============================================================================
// TOOL FUNCTION INTERFACES
// ============================================================================

export interface UserProfilesTools {
  // Profile tools
  getProfile: (userId: string) => Promise<UserProfile>;
  updateProfile: (params: UpdateProfileParams) => Promise<UserProfile>;
  createProfile: (params: CreateProfileParams) => Promise<UserProfile>;
  deleteProfile: (userId: string) => Promise<void>;
  validateProfile: (profile: UserProfile) => Promise<boolean>;
  
  // Personal info tools
  getPersonalInfo: (userId: string) => Promise<PersonalInfo>;
  updatePersonalInfo: (params: UpdatePersonalInfoParams) => Promise<PersonalInfo>;
  validatePersonalInfo: (personalInfo: PersonalInfo) => Promise<boolean>;
  
  // Learning profile tools
  getLearningProfile: (userId: string) => Promise<LearningProfile>;
  updateLearningProfile: (params: UpdateLearningProfileParams) => Promise<LearningProfile>;
  validateLearningProfile: (learningProfile: LearningProfile) => Promise<boolean>;
  
  // Accessibility tools
  getAccessibilityProfile: (userId: string) => Promise<AccessibilityProfile>;
  updateAccessibilityProfile: (params: UpdateAccessibilityProfileParams) => Promise<AccessibilityProfile>;
  validateAccessibilityProfile: (accessibilityProfile: AccessibilityProfile) => Promise<boolean>;
  
  // Preferences tools
  getPreferences: (userId: string) => Promise<UserPreferences>;
  updatePreferences: (params: UpdatePreferencesParams) => Promise<UserPreferences>;
  validatePreferences: (preferences: UserPreferences) => Promise<boolean>;
  
  // Settings tools
  getSettings: (userId: string) => Promise<UserSettings>;
  updateSettings: (params: UpdateSettingsParams) => Promise<UserSettings>;
  validateSettings: (settings: UserSettings) => Promise<boolean>;
  
  // Progress tools
  getProgress: (userId: string) => Promise<ProfileProgress>;
  updateProgress: (params: UpdateProgressParams) => Promise<ProfileProgress>;
  calculateProgress: (userId: string) => Promise<ProfileProgress>;
  
  // Utility tools
  exportProfile: (userId: string, format: string) => Promise<string>;
  importProfile: (userId: string, data: string, format: string) => Promise<UserProfile>;
  compareProfiles: (userId1: string, userId2: string) => Promise<ComparisonResult>;
  anonymizeProfile: (userId: string) => Promise<UserProfile>;
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

export * from './user-profiles.schema';
