/**
 * Pomodoro Timer Schema for AI Agent Studio Platform
 * 
 * This schema defines the data structures and API endpoints for Pomodoro timer
 * functionality integrated with the todo list system. It handles time management,
 * task integration, productivity tracking, and session analytics.
 * 
 * @version 1.0.0
 * @author TEKIMAX Research & Development
 */

// ============================================================================
// POMODORO SESSION INTERFACES
// ============================================================================

export interface PomodoroSession {
  id: string;
  userId: string;
  todoId?: string; // Associated todo item
  type: SessionType;
  duration: number; // in minutes
  status: SessionStatus;
  startTime?: Date;
  endTime?: Date;
  pauseTime?: Date;
  resumeTime?: Date;
  totalPauseTime: number; // in seconds
  actualDuration: number; // in minutes (actual time spent)
  taskText?: string; // Associated task description
  category?: string; // Task category
  priority?: Priority;
  tags: string[];
  notes?: string;
  productivity: ProductivityMetrics;
  interruptions: Interruption[];
  breaks: BreakSession[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BreakSession {
  id: string;
  sessionId: string;
  type: BreakType;
  duration: number; // in minutes
  startTime: Date;
  endTime?: Date;
  status: 'active' | 'completed' | 'skipped';
  activities: string[]; // What user did during break
  notes?: string;
  createdAt: Date;
}

export interface Interruption {
  id: string;
  sessionId: string;
  timestamp: Date;
  type: InterruptionType;
  reason: string;
  duration: number; // in seconds
  handled: boolean;
  impact: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface ProductivityMetrics {
  focus: number; // 0-100
  efficiency: number; // 0-100
  quality: number; // 0-100
  satisfaction: number; // 0-100
  energy: number; // 0-100
  motivation: number; // 0-100
  distractions: number; // count
  interruptions: number; // count
  completionRate: number; // 0-100
  timeAccuracy: number; // 0-100 (how close to planned time)
}

// ============================================================================
// TODO INTEGRATION INTERFACES
// ============================================================================

export interface TodoPomodoroIntegration {
  id: string;
  todoId: string;
  userId: string;
  estimatedPomodoros: number;
  completedPomodoros: number;
  totalTimeSpent: number; // in minutes
  averageSessionLength: number; // in minutes
  completionRate: number; // 0-100
  productivityScore: number; // 0-100
  lastSessionDate?: Date;
  nextSessionDate?: Date;
  sessions: PomodoroSession[];
  analytics: TodoAnalytics;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoAnalytics {
  totalSessions: number;
  completedSessions: number;
  averageFocus: number; // 0-100
  averageEfficiency: number; // 0-100
  averageQuality: number; // 0-100
  totalInterruptions: number;
  totalBreaks: number;
  timeDistribution: TimeDistribution;
  productivityTrends: ProductivityTrend[];
  completionPatterns: CompletionPattern[];
}

export interface TimeDistribution {
  morning: number; // percentage
  afternoon: number; // percentage
  evening: number; // percentage
  night: number; // percentage
  weekdays: number; // percentage
  weekends: number; // percentage
}

export interface ProductivityTrend {
  date: Date;
  focus: number; // 0-100
  efficiency: number; // 0-100
  quality: number; // 0-100
  sessions: number;
  duration: number; // in minutes
}

export interface CompletionPattern {
  dayOfWeek: number; // 0-6
  hourOfDay: number; // 0-23
  completionRate: number; // 0-100
  averageDuration: number; // in minutes
  sessionCount: number;
}

// ============================================================================
// POMODORO CONFIGURATION INTERFACES
// ============================================================================

export interface PomodoroConfig {
  id: string;
  userId: string;
  workDuration: number; // in minutes (default: 25)
  shortBreakDuration: number; // in minutes (default: 5)
  longBreakDuration: number; // in minutes (default: 15)
  longBreakInterval: number; // sessions before long break (default: 4)
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  autoStartNextSession: boolean;
  soundEnabled: boolean;
  soundVolume: number; // 0-100
  notificationEnabled: boolean;
  notificationTypes: NotificationType[];
  theme: PomodoroTheme;
  displayMode: DisplayMode;
  advanced: AdvancedSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdvancedSettings {
  strictMode: boolean; // No pausing allowed
  focusMode: boolean; // Hide other apps
  trackingMode: boolean; // Track all activities
  adaptiveTiming: boolean; // Adjust timing based on productivity
  smartBreaks: boolean; // Suggest break activities
  productivityInsights: boolean; // Generate insights
  goalSetting: boolean; // Set daily/weekly goals
  socialFeatures: boolean; // Share progress
  integrations: IntegrationSettings;
}

export interface IntegrationSettings {
  calendarSync: boolean;
  taskManagerSync: boolean;
  musicPlayerSync: boolean;
  websiteBlocking: boolean;
  appBlocking: boolean;
  notificationBlocking: boolean;
}

export interface PomodoroTheme {
  name: string;
  colors: ThemeColors;
  sounds: ThemeSounds;
  animations: ThemeAnimations;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
}

export interface ThemeSounds {
  workStart: string;
  workEnd: string;
  breakStart: string;
  breakEnd: string;
  longBreakStart: string;
  longBreakEnd: string;
  tick: string;
  alarm: string;
}

export interface ThemeAnimations {
  timer: string;
  transitions: string;
  notifications: string;
  progress: string;
}

// ============================================================================
// POMODORO STATISTICS INTERFACES
// ============================================================================

export interface PomodoroStats {
  id: string;
  userId: string;
  period: StatsPeriod;
  startDate: Date;
  endDate: Date;
  overall: OverallStats;
  productivity: ProductivityStats;
  time: TimeStats;
  habits: HabitStats;
  goals: GoalStats;
  insights: Insight[];
  recommendations: Recommendation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OverallStats {
  totalSessions: number;
  completedSessions: number;
  totalTime: number; // in minutes
  averageSessionLength: number; // in minutes
  completionRate: number; // 0-100
  consistency: number; // 0-100
  streak: number; // days
  longestStreak: number; // days
}

export interface ProductivityStats {
  averageFocus: number; // 0-100
  averageEfficiency: number; // 0-100
  averageQuality: number; // 0-100
  averageSatisfaction: number; // 0-100
  totalInterruptions: number;
  totalBreaks: number;
  distractionRate: number; // 0-100
  improvementRate: number; // percentage
}

export interface TimeStats {
  totalWorkTime: number; // in minutes
  totalBreakTime: number; // in minutes
  totalPauseTime: number; // in minutes
  averageWorkSession: number; // in minutes
  averageBreakSession: number; // in minutes
  timeDistribution: TimeDistribution;
  peakHours: PeakHour[];
  productivityHours: ProductivityHour[];
}

export interface PeakHour {
  hour: number; // 0-23
  sessions: number;
  averageFocus: number; // 0-100
  completionRate: number; // 0-100
}

export interface ProductivityHour {
  hour: number; // 0-23
  productivity: number; // 0-100
  sessions: number;
  duration: number; // in minutes
}

export interface HabitStats {
  dailyGoal: number; // pomodoros per day
  weeklyGoal: number; // pomodoros per week
  dailyAverage: number;
  weeklyAverage: number;
  goalAchievement: number; // 0-100
  bestDay: Date;
  bestWeek: Date;
  consistency: number; // 0-100
  improvement: number; // percentage
}

export interface GoalStats {
  dailyGoals: Goal[];
  weeklyGoals: Goal[];
  monthlyGoals: Goal[];
  achievedGoals: number;
  totalGoals: number;
  achievementRate: number; // 0-100
  upcomingGoals: Goal[];
  overdueGoals: Goal[];
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  type: GoalType;
  target: number;
  current: number;
  unit: string;
  deadline: Date;
  status: GoalStatus;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
}

export interface Insight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  confidence: number; // 0-100
  data: any;
  recommendations: string[];
  createdAt: Date;
}

export interface Recommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  priority: Priority;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  actions: string[];
  expectedOutcome: string;
  createdAt: Date;
}

// ============================================================================
// POMODORO GOALS INTERFACES
// ============================================================================

export interface PomodoroGoal {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: GoalType;
  category: GoalCategory;
  target: number;
  current: number;
  unit: string;
  period: GoalPeriod;
  startDate: Date;
  endDate: Date;
  status: GoalStatus;
  priority: Priority;
  milestones: Milestone[];
  progress: GoalProgress;
  notifications: GoalNotification[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: string;
  goalId: string;
  title: string;
  description: string;
  target: number;
  current: number;
  achieved: boolean;
  achievedAt?: Date;
  reward?: string;
  createdAt: Date;
}

export interface GoalProgress {
  overall: number; // 0-100
  daily: number; // 0-100
  weekly: number; // 0-100
  monthly: number; // 0-100
  trend: 'improving' | 'stable' | 'declining';
  velocity: number; // progress per day
  estimatedCompletion: Date;
  confidence: number; // 0-100
}

export interface GoalNotification {
  id: string;
  type: NotificationType;
  enabled: boolean;
  frequency: NotificationFrequency;
  message: string;
  conditions: NotificationCondition[];
  lastSent?: Date;
  nextSend?: Date;
}

export interface NotificationCondition {
  type: 'progress' | 'deadline' | 'milestone' | 'streak' | 'achievement';
  operator: 'equals' | 'greater_than' | 'less_than' | 'between';
  value: any;
  message: string;
}

// ============================================================================
// POMODORO TEAM INTERFACES
// ============================================================================

export interface PomodoroTeam {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  members: TeamMember[];
  settings: TeamSettings;
  goals: TeamGoal[];
  leaderboard: LeaderboardEntry[];
  statistics: TeamStats;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  userId: string;
  role: TeamRole;
  joinedAt: Date;
  status: 'active' | 'inactive' | 'pending';
  permissions: TeamPermission[];
  statistics: MemberStats;
}

export interface TeamSettings {
  privacy: 'public' | 'private' | 'invite_only';
  joinApproval: boolean;
  memberLimit: number;
  goalSharing: boolean;
  progressSharing: boolean;
  leaderboardEnabled: boolean;
  notifications: TeamNotificationSettings;
}

export interface TeamGoal {
  id: string;
  teamId: string;
  title: string;
  description: string;
  type: GoalType;
  target: number;
  current: number;
  unit: string;
  period: GoalPeriod;
  startDate: Date;
  endDate: Date;
  status: GoalStatus;
  contributors: string[];
  progress: GoalProgress;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar?: string;
  rank: number;
  score: number;
  sessions: number;
  time: number; // in minutes
  streak: number;
  achievements: number;
  lastActive: Date;
}

export interface TeamStats {
  totalMembers: number;
  activeMembers: number;
  totalSessions: number;
  totalTime: number; // in minutes
  averageProductivity: number; // 0-100
  teamStreak: number;
  goalsAchieved: number;
  totalGoals: number;
}

export interface MemberStats {
  sessions: number;
  time: number; // in minutes
  productivity: number; // 0-100
  streak: number;
  achievements: number;
  rank: number;
  contribution: number; // 0-100
}

export interface TeamNotificationSettings {
  goalUpdates: boolean;
  memberActivity: boolean;
  achievements: boolean;
  weeklyReports: boolean;
  dailyDigest: boolean;
}

// ============================================================================
// ENUMS AND TYPES
// ============================================================================

export type SessionType = 'work' | 'short_break' | 'long_break' | 'custom';
export type SessionStatus = 'pending' | 'active' | 'paused' | 'completed' | 'cancelled' | 'skipped';
export type BreakType = 'short' | 'long' | 'custom';
export type InterruptionType = 'phone' | 'email' | 'message' | 'person' | 'app' | 'website' | 'other';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type NotificationType = 'session_start' | 'session_end' | 'break_start' | 'break_end' | 'goal_achieved' | 'streak_milestone' | 'daily_summary' | 'weekly_report';
export type DisplayMode = 'minimal' | 'standard' | 'detailed' | 'fullscreen';
export type StatsPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
export type GoalType = 'sessions' | 'time' | 'productivity' | 'consistency' | 'streak' | 'custom';
export type GoalCategory = 'productivity' | 'health' | 'learning' | 'work' | 'personal' | 'team';
export type GoalPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
export type GoalStatus = 'active' | 'completed' | 'paused' | 'cancelled' | 'overdue';
export type InsightType = 'productivity' | 'time' | 'habit' | 'goal' | 'team' | 'trend';
export type RecommendationType = 'timing' | 'breaks' | 'focus' | 'goals' | 'habits' | 'team';
export type NotificationFrequency = 'immediate' | 'daily' | 'weekly' | 'monthly' | 'custom';
export type TeamRole = 'owner' | 'admin' | 'member' | 'viewer';
export type TeamPermission = 'view' | 'edit' | 'delete' | 'invite' | 'manage_goals' | 'view_analytics';

// ============================================================================
// API ENDPOINT INTERFACES
// ============================================================================

export interface PomodoroAPI {
  // Session Management
  createSession: (params: CreateSessionParams) => Promise<PomodoroSession>;
  getSession: (sessionId: string) => Promise<PomodoroSession>;
  updateSession: (params: UpdateSessionParams) => Promise<PomodoroSession>;
  deleteSession: (sessionId: string) => Promise<void>;
  listSessions: (params: ListSessionsParams) => Promise<PomodoroSession[]>;
  
  // Session Control
  startSession: (sessionId: string) => Promise<PomodoroSession>;
  pauseSession: (sessionId: string) => Promise<PomodoroSession>;
  resumeSession: (sessionId: string) => Promise<PomodoroSession>;
  completeSession: (sessionId: string) => Promise<PomodoroSession>;
  cancelSession: (sessionId: string) => Promise<PomodoroSession>;
  
  // Todo Integration
  getTodoIntegration: (todoId: string) => Promise<TodoPomodoroIntegration>;
  updateTodoIntegration: (params: UpdateTodoIntegrationParams) => Promise<TodoPomodoroIntegration>;
  getTodoSessions: (todoId: string) => Promise<PomodoroSession[]>;
  estimateTodoTime: (todoId: string) => Promise<number>;
  
  // Configuration
  getConfig: (userId: string) => Promise<PomodoroConfig>;
  updateConfig: (params: UpdateConfigParams) => Promise<PomodoroConfig>;
  resetConfig: (userId: string) => Promise<PomodoroConfig>;
  
  // Statistics
  getStats: (params: GetStatsParams) => Promise<PomodoroStats>;
  getProductivityStats: (params: GetProductivityStatsParams) => Promise<ProductivityStats>;
  getTimeStats: (params: GetTimeStatsParams) => Promise<TimeStats>;
  getHabitStats: (params: GetHabitStatsParams) => Promise<HabitStats>;
  
  // Goals
  createGoal: (params: CreateGoalParams) => Promise<PomodoroGoal>;
  getGoal: (goalId: string) => Promise<PomodoroGoal>;
  updateGoal: (params: UpdateGoalParams) => Promise<PomodoroGoal>;
  deleteGoal: (goalId: string) => Promise<void>;
  listGoals: (params: ListGoalsParams) => Promise<PomodoroGoal[]>;
  
  // Team Features
  createTeam: (params: CreateTeamParams) => Promise<PomodoroTeam>;
  getTeam: (teamId: string) => Promise<PomodoroTeam>;
  updateTeam: (params: UpdateTeamParams) => Promise<PomodoroTeam>;
  deleteTeam: (teamId: string) => Promise<void>;
  joinTeam: (params: JoinTeamParams) => Promise<void>;
  leaveTeam: (teamId: string, userId: string) => Promise<void>;
  getTeamLeaderboard: (teamId: string) => Promise<LeaderboardEntry[]>;
  
  // Analytics
  getInsights: (params: GetInsightsParams) => Promise<Insight[]>;
  getRecommendations: (params: GetRecommendationsParams) => Promise<Recommendation[]>;
  generateReport: (params: GenerateReportParams) => Promise<PomodoroReport>;
}

// ============================================================================
// API PARAMETER INTERFACES
// ============================================================================

export interface CreateSessionParams {
  userId: string;
  todoId?: string;
  type: SessionType;
  duration: number;
  taskText?: string;
  category?: string;
  priority?: Priority;
  tags?: string[];
  notes?: string;
}

export interface UpdateSessionParams {
  sessionId: string;
  session: Partial<PomodoroSession>;
}

export interface ListSessionsParams {
  userId: string;
  todoId?: string;
  type?: SessionType;
  status?: SessionStatus;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UpdateTodoIntegrationParams {
  todoId: string;
  integration: Partial<TodoPomodoroIntegration>;
}

export interface UpdateConfigParams {
  userId: string;
  config: Partial<PomodoroConfig>;
}

export interface GetStatsParams {
  userId: string;
  period: StatsPeriod;
  startDate?: Date;
  endDate?: Date;
}

export interface GetProductivityStatsParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
}

export interface GetTimeStatsParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
}

export interface GetHabitStatsParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
}

export interface CreateGoalParams {
  userId: string;
  goal: Partial<PomodoroGoal>;
}

export interface UpdateGoalParams {
  goalId: string;
  goal: Partial<PomodoroGoal>;
}

export interface ListGoalsParams {
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

export interface CreateTeamParams {
  ownerId: string;
  team: Partial<PomodoroTeam>;
}

export interface UpdateTeamParams {
  teamId: string;
  team: Partial<PomodoroTeam>;
}

export interface JoinTeamParams {
  teamId: string;
  userId: string;
  role?: TeamRole;
}

export interface GetInsightsParams {
  userId: string;
  type?: InsightType;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}

export interface GetRecommendationsParams {
  userId: string;
  type?: RecommendationType;
  priority?: Priority;
  limit?: number;
}

export interface GenerateReportParams {
  userId: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  startDate?: Date;
  endDate?: Date;
  format: 'pdf' | 'html' | 'json' | 'csv';
  sections?: string[];
}

export interface PomodoroReport {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: string;
  period: string;
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

export interface PomodoroTools {
  // Session Management Tools
  createSession: (params: CreateSessionParams) => Promise<PomodoroSession>;
  startSession: (sessionId: string) => Promise<PomodoroSession>;
  pauseSession: (sessionId: string) => Promise<PomodoroSession>;
  resumeSession: (sessionId: string) => Promise<PomodoroSession>;
  completeSession: (sessionId: string) => Promise<PomodoroSession>;
  cancelSession: (sessionId: string) => Promise<PomodoroSession>;
  
  // Todo Integration Tools
  associateTodoWithPomodoro: (todoId: string, sessionId: string) => Promise<TodoPomodoroIntegration>;
  estimateTodoTime: (todoId: string) => Promise<number>;
  getTodoProgress: (todoId: string) => Promise<TodoPomodoroIntegration>;
  updateTodoProgress: (todoId: string, sessionId: string) => Promise<TodoPomodoroIntegration>;
  
  // Configuration Tools
  getPomodoroConfig: (userId: string) => Promise<PomodoroConfig>;
  updatePomodoroConfig: (params: UpdateConfigParams) => Promise<PomodoroConfig>;
  resetPomodoroConfig: (userId: string) => Promise<PomodoroConfig>;
  
  // Statistics Tools
  getPomodoroStats: (params: GetStatsParams) => Promise<PomodoroStats>;
  getProductivityStats: (params: GetProductivityStatsParams) => Promise<ProductivityStats>;
  getTimeStats: (params: GetTimeStatsParams) => Promise<TimeStats>;
  getHabitStats: (params: GetHabitStatsParams) => Promise<HabitStats>;
  
  // Goal Management Tools
  createPomodoroGoal: (params: CreateGoalParams) => Promise<PomodoroGoal>;
  updatePomodoroGoal: (params: UpdateGoalParams) => Promise<PomodoroGoal>;
  checkGoalProgress: (goalId: string) => Promise<GoalProgress>;
  achieveGoal: (goalId: string) => Promise<PomodoroGoal>;
  
  // Team Tools
  createPomodoroTeam: (params: CreateTeamParams) => Promise<PomodoroTeam>;
  joinPomodoroTeam: (params: JoinTeamParams) => Promise<void>;
  leavePomodoroTeam: (teamId: string, userId: string) => Promise<void>;
  getTeamLeaderboard: (teamId: string) => Promise<LeaderboardEntry[]>;
  
  // Analytics Tools
  generateInsights: (userId: string, data: any[]) => Promise<Insight[]>;
  generateRecommendations: (userId: string, stats: PomodoroStats) => Promise<Recommendation[]>;
  analyzeProductivity: (userId: string, period: StatsPeriod) => Promise<ProductivityStats>;
  predictCompletion: (todoId: string) => Promise<Date>;
  
  // Utility Tools
  validateSession: (session: PomodoroSession) => Promise<boolean>;
  calculateProductivity: (sessions: PomodoroSession[]) => Promise<ProductivityMetrics>;
  exportPomodoroData: (userId: string, format: string) => Promise<string>;
  importPomodoroData: (userId: string, data: string, format: string) => Promise<PomodoroSession[]>;
}

// ============================================================================
// EXPORT ALL INTERFACES
// ============================================================================

export * from './pomodoro.schema';
