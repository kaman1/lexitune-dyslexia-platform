/**
 * User Profile Schema
 * 
 * This schema defines the structure for user profiles in the AI Agent Studio.
 * User profiles contain learning preferences, progress tracking, and personalization data.
 * 
 * @version 1.0.0
 * @author TEKIMAX Research & Development
 */

export interface UserProfile {
  // Core Identification
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  
  // Personal Information
  personalInfo: PersonalInfo;
  
  // Learning Preferences
  learningPreferences: LearningPreferences;
  
  // Learning Progress
  learningProgress: LearningProgress;
  
  // Accessibility Settings
  accessibilitySettings: AccessibilitySettings;
  
  // AI Interaction Preferences
  aiPreferences: AIPreferences;
  
  // Analytics & Insights
  analytics: UserAnalytics;
  
  // Timestamps
  timestamps: UserTimestamps;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth?: number;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  location?: LocationInfo;
  timezone: string;
  language: string;
  bio?: string;
  interests: string[];
  goals: string[];
}

export interface LocationInfo {
  country: string;
  region?: string;
  city?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface LearningPreferences {
  // Learning Styles
  preferredLearningStyles: LearningStyle[];
  learningStyleStrength: Record<LearningStyle, number>;
  
  // Content Preferences
  contentPreferences: ContentPreferences;
  
  // Study Preferences
  studyPreferences: StudyPreferences;
  
  // Difficulty Preferences
  difficultyPreference: DifficultyLevel;
  challengeLevel: 'low' | 'medium' | 'high';
  
  // Time Preferences
  timePreferences: TimePreferences;
  
  // Subject Preferences
  subjectPreferences: SubjectPreference[];
  
  // Technology Preferences
  technologyPreferences: TechnologyPreferences;
}

export type LearningStyle = 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'multimodal';

export interface ContentPreferences {
  preferredFormats: ContentFormat[];
  preferredLength: 'short' | 'medium' | 'long';
  preferredPace: 'slow' | 'moderate' | 'fast';
  preferredComplexity: 'simple' | 'moderate' | 'complex';
  multimediaPreference: 'text-heavy' | 'balanced' | 'multimedia-heavy';
  interactivityPreference: 'passive' | 'moderate' | 'highly-interactive';
}

export type ContentFormat = 'text' | 'video' | 'audio' | 'interactive' | 'presentation' | 'infographic';

export interface StudyPreferences {
  studyEnvironment: 'quiet' | 'background-noise' | 'music' | 'any';
  studyTime: 'morning' | 'afternoon' | 'evening' | 'night' | 'flexible';
  studyDuration: 'short-sessions' | 'medium-sessions' | 'long-sessions' | 'flexible';
  breakFrequency: 'frequent' | 'moderate' | 'rare' | 'flexible';
  groupStudy: 'solo' | 'small-group' | 'large-group' | 'mixed';
  noteTaking: 'detailed' | 'outline' | 'minimal' | 'digital' | 'handwritten';
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface TimePreferences {
  availableHours: number[]; // 0-23
  preferredSessionLength: number; // in minutes
  maxDailyStudyTime: number; // in minutes
  studyDays: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
  timezone: string;
}

export interface SubjectPreference {
  subject: string;
  interestLevel: number; // 1-10
  proficiencyLevel: DifficultyLevel;
  learningGoals: string[];
  preferredResources: string[];
}

export interface TechnologyPreferences {
  devicePreference: 'desktop' | 'mobile' | 'tablet' | 'mixed';
  platformPreference: 'web' | 'mobile-app' | 'desktop-app' | 'mixed';
  accessibilityTools: string[];
  assistiveTechnology: string[];
  techComfortLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface LearningProgress {
  // Overall Progress
  overallProgress: OverallProgress;
  
  // Subject Progress
  subjectProgress: SubjectProgress[];
  
  // Skill Development
  skillDevelopment: SkillDevelopment[];
  
  // Learning Achievements
  achievements: Achievement[];
  
  // Learning History
  learningHistory: LearningHistory[];
  
  // Current Learning
  currentLearning: CurrentLearning[];
  
  // Learning Goals
  learningGoals: LearningGoal[];
}

export interface OverallProgress {
  totalStudyTime: number; // in minutes
  totalMaterialsCompleted: number;
  averageCompletionRate: number;
  learningStreak: number; // days
  longestStreak: number; // days
  totalAchievements: number;
  overallRating: number; // 1-10
}

export interface SubjectProgress {
  subject: string;
  progress: number; // 0-100
  timeSpent: number; // in minutes
  materialsCompleted: number;
  averageScore: number;
  lastStudied: number;
  proficiencyLevel: DifficultyLevel;
  nextMilestone: string;
}

export interface SkillDevelopment {
  skill: string;
  currentLevel: number; // 1-10
  targetLevel: number; // 1-10
  progress: number; // 0-100
  developmentAreas: string[];
  strengths: string[];
  lastAssessed: number;
}

export interface Achievement {
  id: string;
  type: 'completion' | 'mastery' | 'streak' | 'speed' | 'consistency' | 'exploration';
  title: string;
  description: string;
  icon?: string;
  earnedAt: number;
  points: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  category: string;
}

export interface LearningHistory {
  id: string;
  materialId: string;
  materialTitle: string;
  subject: string;
  startedAt: number;
  completedAt?: number;
  timeSpent: number; // in minutes
  progress: number; // 0-100
  score?: number;
  rating?: number; // 1-5
  notes?: string;
  tags: string[];
}

export interface CurrentLearning {
  materialId: string;
  materialTitle: string;
  subject: string;
  startedAt: number;
  currentSection: string;
  progress: number; // 0-100
  estimatedCompletion: number;
  priority: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface LearningGoal {
  id: string;
  title: string;
  description: string;
  type: 'skill' | 'knowledge' | 'certification' | 'project' | 'personal';
  targetDate?: number;
  progress: number; // 0-100
  status: 'not-started' | 'in-progress' | 'completed' | 'paused' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  milestones: Milestone[];
  createdAt: number;
  updatedAt: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate?: number;
  completed: boolean;
  completedAt?: number;
  progress: number; // 0-100
}

export interface AccessibilitySettings {
  // Visual Accessibility
  visualSettings: VisualAccessibilitySettings;
  
  // Auditory Accessibility
  auditorySettings: AuditoryAccessibilitySettings;
  
  // Motor Accessibility
  motorSettings: MotorAccessibilitySettings;
  
  // Cognitive Accessibility
  cognitiveSettings: CognitiveAccessibilitySettings;
  
  // General Accessibility
  generalSettings: GeneralAccessibilitySettings;
}

export interface VisualAccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  highContrast: boolean;
  colorBlindSupport: boolean;
  screenReader: boolean;
  magnification: number; // 1.0 - 3.0
  darkMode: boolean;
  reducedMotion: boolean;
}

export interface AuditoryAccessibilitySettings {
  captions: boolean;
  transcripts: boolean;
  audioDescription: boolean;
  volumeBoost: boolean;
  visualAlerts: boolean;
  signLanguage: boolean;
}

export interface MotorAccessibilitySettings {
  keyboardNavigation: boolean;
  voiceControl: boolean;
  switchControl: boolean;
  gestureControl: boolean;
  largeClickTargets: boolean;
  stickyKeys: boolean;
}

export interface CognitiveAccessibilitySettings {
  simplifiedInterface: boolean;
  readingAssistance: boolean;
  focusAssistance: boolean;
  timeExtensions: boolean;
  breakReminders: boolean;
  progressIndicators: boolean;
}

export interface GeneralAccessibilitySettings {
  language: string;
  timezone: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  dataSharing: DataSharingSettings;
}

export interface NotificationSettings {
  enabled: boolean;
  types: NotificationType[];
  frequency: 'immediate' | 'daily' | 'weekly' | 'custom';
  channels: ('email' | 'push' | 'in-app')[];
  quietHours: {
    enabled: boolean;
    start: string; // HH:MM
    end: string; // HH:MM
  };
}

export type NotificationType = 
  | 'study-reminder' 
  | 'achievement' 
  | 'goal-milestone' 
  | 'new-content' 
  | 'system-update';

export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  progressSharing: boolean;
  achievementSharing: boolean;
  dataRetention: number; // days
  analyticsOptIn: boolean;
  personalizationOptIn: boolean;
}

export interface DataSharingSettings {
  shareWithInstructors: boolean;
  shareWithPeers: boolean;
  shareWithResearchers: boolean;
  shareWithThirdParties: boolean;
  anonymizedData: boolean;
}

export interface AIPreferences {
  // AI Interaction Style
  interactionStyle: AIInteractionStyle;
  
  // AI Personality
  personality: AIPersonality;
  
  // AI Assistance Level
  assistanceLevel: 'minimal' | 'moderate' | 'high' | 'adaptive';
  
  // AI Feedback Preferences
  feedbackPreferences: FeedbackPreferences;
  
  // AI Learning Adaptation
  learningAdaptation: LearningAdaptation;
  
  // AI Communication
  communicationPreferences: CommunicationPreferences;
}

export interface AIInteractionStyle {
  formality: 'formal' | 'casual' | 'friendly' | 'professional';
  verbosity: 'concise' | 'moderate' | 'detailed';
  encouragement: 'minimal' | 'moderate' | 'high';
  humor: 'none' | 'light' | 'moderate';
  directness: 'indirect' | 'balanced' | 'direct';
}

export interface AIPersonality {
  type: 'mentor' | 'tutor' | 'peer' | 'assistant' | 'coach';
  traits: string[];
  communicationStyle: string;
  expertise: string[];
}

export interface FeedbackPreferences {
  frequency: 'immediate' | 'end-of-session' | 'daily' | 'weekly';
  type: 'positive' | 'constructive' | 'detailed' | 'summary';
  format: 'text' | 'visual' | 'audio' | 'mixed';
  detail: 'brief' | 'moderate' | 'comprehensive';
}

export interface LearningAdaptation {
  enabled: boolean;
  adaptationSpeed: 'slow' | 'moderate' | 'fast';
  adaptationAreas: ('content' | 'pace' | 'difficulty' | 'style' | 'format')[];
  userControl: 'automatic' | 'suggested' | 'manual';
  transparency: boolean; // show what's being adapted
}

export interface CommunicationPreferences {
  language: string;
  dialect?: string;
  formality: 'formal' | 'casual' | 'mixed';
  technicalLevel: 'beginner' | 'intermediate' | 'advanced';
  examples: boolean;
  analogies: boolean;
  stepByStep: boolean;
}

export interface UserAnalytics {
  // Usage Analytics
  usageAnalytics: UsageAnalytics;
  
  // Learning Analytics
  learningAnalytics: LearningAnalytics;
  
  // Performance Analytics
  performanceAnalytics: PerformanceAnalytics;
  
  // Engagement Analytics
  engagementAnalytics: EngagementAnalytics;
  
  // Insights
  insights: UserInsights;
}

export interface UsageAnalytics {
  totalSessions: number;
  totalTimeSpent: number; // in minutes
  averageSessionLength: number; // in minutes
  mostActiveHours: number[];
  mostActiveDays: string[];
  deviceUsage: Record<string, number>;
  featureUsage: Record<string, number>;
}

export interface LearningAnalytics {
  learningVelocity: number; // progress per hour
  retentionRate: number;
  comprehensionRate: number;
  applicationRate: number;
  learningPatterns: LearningPattern[];
  strengths: string[];
  improvementAreas: string[];
}

export interface LearningPattern {
  pattern: string;
  frequency: number;
  effectiveness: number;
  context: string;
}

export interface PerformanceAnalytics {
  averageScore: number;
  improvementRate: number;
  consistencyScore: number;
  peakPerformance: PerformancePeak[];
  performanceTrends: PerformanceTrend[];
}

export interface PerformancePeak {
  subject: string;
  score: number;
  date: number;
  context: string;
}

export interface PerformanceTrend {
  metric: string;
  trend: 'improving' | 'stable' | 'declining';
  rate: number;
  period: string;
}

export interface EngagementAnalytics {
  engagementScore: number;
  motivationLevel: number;
  persistenceScore: number;
  curiosityScore: number;
  collaborationScore: number;
  engagementFactors: EngagementFactor[];
}

export interface EngagementFactor {
  factor: string;
  impact: number;
  frequency: number;
  description: string;
}

export interface UserInsights {
  personalizedInsights: PersonalizedInsight[];
  recommendations: Recommendation[];
  predictions: Prediction[];
  alerts: Alert[];
}

export interface PersonalizedInsight {
  type: 'strength' | 'improvement' | 'pattern' | 'achievement' | 'warning';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

export interface Recommendation {
  type: 'content' | 'study-method' | 'goal' | 'resource' | 'schedule';
  title: string;
  description: string;
  rationale: string;
  priority: 'low' | 'medium' | 'high';
  estimatedImpact: number;
  effort: 'low' | 'medium' | 'high';
}

export interface Prediction {
  type: 'performance' | 'completion' | 'engagement' | 'success';
  prediction: string;
  confidence: number;
  timeframe: string;
  factors: string[];
  recommendations: string[];
}

export interface Alert {
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionable: boolean;
  actionRequired?: string;
  expiresAt?: number;
}

export interface UserTimestamps {
  createdAt: number;
  updatedAt: number;
  lastLogin: number;
  lastActive: number;
  profileCompletedAt?: number;
  preferencesUpdatedAt: number;
}

// API Endpoint Definitions for User Profiles
export interface UserProfileAPI {
  // CRUD Operations
  createProfile: (profile: Omit<UserProfile, 'id' | 'timestamps'>) => Promise<UserProfile>;
  getProfile: (id: string) => Promise<UserProfile>;
  updateProfile: (id: string, updates: Partial<UserProfile>) => Promise<UserProfile>;
  deleteProfile: (id: string) => Promise<void>;
  
  // Learning Progress
  updateProgress: (userId: string, progress: Partial<LearningProgress>) => Promise<void>;
  getProgress: (userId: string) => Promise<LearningProgress>;
  addAchievement: (userId: string, achievement: Achievement) => Promise<void>;
  
  // Preferences
  updatePreferences: (userId: string, preferences: Partial<LearningPreferences>) => Promise<void>;
  updateAccessibility: (userId: string, settings: Partial<AccessibilitySettings>) => Promise<void>;
  updateAIPreferences: (userId: string, preferences: Partial<AIPreferences>) => Promise<void>;
  
  // Analytics
  getAnalytics: (userId: string, timeRange: TimeRange) => Promise<UserAnalytics>;
  getInsights: (userId: string) => Promise<UserInsights>;
  getRecommendations: (userId: string) => Promise<Recommendation[]>;
  
  // Goals
  createGoal: (userId: string, goal: Omit<LearningGoal, 'id'>) => Promise<LearningGoal>;
  updateGoal: (userId: string, goalId: string, updates: Partial<LearningGoal>) => Promise<LearningGoal>;
  deleteGoal: (userId: string, goalId: string) => Promise<void>;
}

// Tool Function Definitions for User Profiles
export interface UserProfileTools {
  // Profile Management
  createProfile: {
    name: 'create_user_profile';
    description: 'Create a new user profile';
    parameters: {
      email: string;
      username: string;
      displayName: string;
      personalInfo: Partial<PersonalInfo>;
    };
    returns: UserProfile;
  };
  
  updatePreferences: {
    name: 'update_learning_preferences';
    description: 'Update user learning preferences';
    parameters: {
      userId: string;
      preferences: Partial<LearningPreferences>;
    };
    returns: { success: boolean; updatedPreferences: LearningPreferences };
  };
  
  // Progress Tracking
  trackProgress: {
    name: 'track_learning_progress';
    description: 'Track user learning progress';
    parameters: {
      userId: string;
      materialId: string;
      progress: number;
      timeSpent: number;
      score?: number;
    };
    returns: { success: boolean; updatedProgress: LearningProgress };
  };
  
  addAchievement: {
    name: 'add_achievement';
    description: 'Add an achievement to user profile';
    parameters: {
      userId: string;
      achievement: Omit<Achievement, 'id' | 'earnedAt'>;
    };
    returns: { success: boolean; achievement: Achievement };
  };
  
  // Analytics
  getAnalytics: {
    name: 'get_user_analytics';
    description: 'Get user analytics and insights';
    parameters: {
      userId: string;
      timeRange: TimeRange;
    };
    returns: UserAnalytics;
  };
  
  getRecommendations: {
    name: 'get_personalized_recommendations';
    description: 'Get personalized recommendations for user';
    parameters: {
      userId: string;
      type?: string;
      limit?: number;
    };
    returns: Recommendation[];
  };
  
  // Goals
  createGoal: {
    name: 'create_learning_goal';
    description: 'Create a new learning goal';
    parameters: {
      userId: string;
      goal: Omit<LearningGoal, 'id' | 'createdAt' | 'updatedAt'>;
    };
    returns: LearningGoal;
  };
  
  updateGoalProgress: {
    name: 'update_goal_progress';
    description: 'Update progress on a learning goal';
    parameters: {
      userId: string;
      goalId: string;
      progress: number;
      notes?: string;
    };
    returns: { success: boolean; updatedGoal: LearningGoal };
  };
}

// Validation Schemas
export const UserProfileValidation = {
  id: { type: 'string', required: true, pattern: '^user_[a-zA-Z0-9_-]+$' },
  email: { type: 'string', required: true, format: 'email' },
  username: { type: 'string', required: true, minLength: 3, maxLength: 50 },
  displayName: { type: 'string', required: true, minLength: 1, maxLength: 100 },
  learningPreferences: { type: 'object', required: true },
  timestamps: { type: 'object', required: true }
};

// Default Values
export const DefaultUserProfile: Partial<UserProfile> = {
  personalInfo: {
    firstName: '',
    lastName: '',
    timezone: 'UTC',
    language: 'en',
    interests: [],
    goals: []
  },
  learningPreferences: {
    preferredLearningStyles: ['visual'],
    learningStyleStrength: {
      visual: 5,
      auditory: 5,
      kinesthetic: 5,
      reading: 5,
      multimodal: 5
    },
    contentPreferences: {
      preferredFormats: ['text', 'video'],
      preferredLength: 'medium',
      preferredPace: 'moderate',
      preferredComplexity: 'moderate',
      multimediaPreference: 'balanced',
      interactivityPreference: 'moderate'
    },
    studyPreferences: {
      studyEnvironment: 'quiet',
      studyTime: 'flexible',
      studyDuration: 'medium-sessions',
      breakFrequency: 'moderate',
      groupStudy: 'solo',
      noteTaking: 'outline'
    },
    difficultyPreference: 'intermediate',
    challengeLevel: 'medium',
    timePreferences: {
      availableHours: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      preferredSessionLength: 45,
      maxDailyStudyTime: 180,
      studyDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      timezone: 'UTC'
    },
    subjectPreferences: [],
    technologyPreferences: {
      devicePreference: 'mixed',
      platformPreference: 'web',
      accessibilityTools: [],
      assistiveTechnology: [],
      techComfortLevel: 'intermediate'
    }
  },
  learningProgress: {
    overallProgress: {
      totalStudyTime: 0,
      totalMaterialsCompleted: 0,
      averageCompletionRate: 0,
      learningStreak: 0,
      longestStreak: 0,
      totalAchievements: 0,
      overallRating: 5
    },
    subjectProgress: [],
    skillDevelopment: [],
    achievements: [],
    learningHistory: [],
    currentLearning: [],
    learningGoals: []
  },
  accessibilitySettings: {
    visualSettings: {
      fontSize: 'medium',
      highContrast: false,
      colorBlindSupport: false,
      screenReader: false,
      magnification: 1.0,
      darkMode: false,
      reducedMotion: false
    },
    auditorySettings: {
      captions: false,
      transcripts: false,
      audioDescription: false,
      volumeBoost: false,
      visualAlerts: false,
      signLanguage: false
    },
    motorSettings: {
      keyboardNavigation: true,
      voiceControl: false,
      switchControl: false,
      gestureControl: false,
      largeClickTargets: false,
      stickyKeys: false
    },
    cognitiveSettings: {
      simplifiedInterface: false,
      readingAssistance: false,
      focusAssistance: false,
      timeExtensions: false,
      breakReminders: true,
      progressIndicators: true
    },
    generalSettings: {
      language: 'en',
      timezone: 'UTC',
      notifications: {
        enabled: true,
        types: ['study-reminder', 'achievement'],
        frequency: 'daily',
        channels: ['in-app'],
        quietHours: {
          enabled: false,
          start: '22:00',
          end: '08:00'
        }
      },
      privacy: {
        profileVisibility: 'private',
        progressSharing: false,
        achievementSharing: false,
        dataRetention: 365,
        analyticsOptIn: true,
        personalizationOptIn: true
      },
      dataSharing: {
        shareWithInstructors: false,
        shareWithPeers: false,
        shareWithResearchers: false,
        shareWithThirdParties: false,
        anonymizedData: true
      }
    }
  },
  aiPreferences: {
    interactionStyle: {
      formality: 'friendly',
      verbosity: 'moderate',
      encouragement: 'moderate',
      humor: 'light',
      directness: 'balanced'
    },
    personality: {
      type: 'tutor',
      traits: ['helpful', 'patient', 'knowledgeable'],
      communicationStyle: 'encouraging',
      expertise: ['general']
    },
    assistanceLevel: 'moderate',
    feedbackPreferences: {
      frequency: 'end-of-session',
      type: 'constructive',
      format: 'text',
      detail: 'moderate'
    },
    learningAdaptation: {
      enabled: true,
      adaptationSpeed: 'moderate',
      adaptationAreas: ['content', 'pace', 'difficulty'],
      userControl: 'suggested',
      transparency: true
    },
    communicationPreferences: {
      language: 'en',
      formality: 'casual',
      technicalLevel: 'intermediate',
      examples: true,
      analogies: true,
      stepByStep: true
    }
  },
  analytics: {
    usageAnalytics: {
      totalSessions: 0,
      totalTimeSpent: 0,
      averageSessionLength: 0,
      mostActiveHours: [],
      mostActiveDays: [],
      deviceUsage: {},
      featureUsage: {}
    },
    learningAnalytics: {
      learningVelocity: 0,
      retentionRate: 0,
      comprehensionRate: 0,
      applicationRate: 0,
      learningPatterns: [],
      strengths: [],
      improvementAreas: []
    },
    performanceAnalytics: {
      averageScore: 0,
      improvementRate: 0,
      consistencyScore: 0,
      peakPerformance: [],
      performanceTrends: []
    },
    engagementAnalytics: {
      engagementScore: 5,
      motivationLevel: 5,
      persistenceScore: 5,
      curiosityScore: 5,
      collaborationScore: 5,
      engagementFactors: []
    },
    insights: {
      personalizedInsights: [],
      recommendations: [],
      predictions: [],
      alerts: []
    }
  },
  timestamps: {
    createdAt: Date.now(),
    updatedAt: Date.now(),
    lastLogin: Date.now(),
    lastActive: Date.now(),
    preferencesUpdatedAt: Date.now()
  }
};
