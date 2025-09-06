/**
 * Audio Reader Schema for AI Agent Studio Platform
 * 
 * This schema defines the data structures and API endpoints for audio reader
 * functionality including document processing, text-to-speech conversion,
 * audio management, and accessibility features for learning materials.
 * 
 * @version 1.0.0
 * @author TEKIMAX Research & Development
 */

// ============================================================================
// DOCUMENT PROCESSING INTERFACES
// ============================================================================

export interface DocumentProcessing {
  id: string;
  userId: string;
  documentId: string;
  documentType: DocumentType;
  status: ProcessingStatus;
  progress: number; // 0-100
  steps: ProcessingStep[];
  metadata: DocumentMetadata;
  extractedText: string;
  processedText: string;
  audioSegments: AudioSegment[];
  processingTime: number; // milliseconds
  errorLog: ProcessingError[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProcessingStep {
  id: string;
  name: string;
  type: ProcessingStepType;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number; // 0-100
  startTime?: Date;
  endTime?: Date;
  duration?: number; // milliseconds
  result?: any;
  error?: string;
  metadata: Record<string, any>;
}

export interface DocumentMetadata {
  title: string;
  author?: string;
  subject?: string;
  keywords?: string[];
  language: string;
  pageCount: number;
  wordCount: number;
  characterCount: number;
  fileSize: number; // bytes
  format: string;
  version?: string;
  createdDate?: Date;
  modifiedDate?: Date;
  accessibility: AccessibilityInfo;
  structure: DocumentStructure;
  content: ContentAnalysis;
}

export interface AccessibilityInfo {
  hasAltText: boolean;
  hasHeadings: boolean;
  hasTableHeaders: boolean;
  hasListMarkers: boolean;
  hasLanguageTags: boolean;
  hasReadingOrder: boolean;
  hasColorContrast: boolean;
  hasTextSize: boolean;
  accessibilityScore: number; // 0-100
  improvements: string[];
}

export interface DocumentStructure {
  sections: DocumentSection[];
  headings: Heading[];
  paragraphs: Paragraph[];
  lists: List[];
  tables: Table[];
  images: Image[];
  links: Link[];
  footnotes: Footnote[];
  bibliography: BibliographyEntry[];
}

export interface DocumentSection {
  id: string;
  title: string;
  level: number;
  startPage: number;
  endPage: number;
  startPosition: number;
  endPosition: number;
  subsections: DocumentSection[];
  content: string;
}

export interface Heading {
  id: string;
  text: string;
  level: number;
  position: number;
  page: number;
  style: string;
  outline: string;
}

export interface Paragraph {
  id: string;
  text: string;
  position: number;
  page: number;
  style: string;
  readingTime: number; // seconds
  complexity: number; // 0-100
}

export interface List {
  id: string;
  type: 'ordered' | 'unordered' | 'definition';
  items: ListItem[];
  position: number;
  page: number;
}

export interface ListItem {
  id: string;
  text: string;
  level: number;
  position: number;
  marker?: string;
}

export interface Table {
  id: string;
  caption?: string;
  headers: TableHeader[];
  rows: TableRow[];
  position: number;
  page: number;
  accessibility: TableAccessibility;
}

export interface TableHeader {
  id: string;
  text: string;
  scope: 'col' | 'row' | 'colgroup' | 'rowgroup';
  position: number;
}

export interface TableRow {
  id: string;
  cells: TableCell[];
  position: number;
}

export interface TableCell {
  id: string;
  text: string;
  header: boolean;
  position: number;
  colspan?: number;
  rowspan?: number;
}

export interface TableAccessibility {
  hasHeaders: boolean;
  hasCaption: boolean;
  hasSummary: boolean;
  isAccessible: boolean;
  improvements: string[];
}

export interface Image {
  id: string;
  alt: string;
  caption?: string;
  description?: string;
  position: number;
  page: number;
  size: ImageSize;
  format: string;
}

export interface ImageSize {
  width: number;
  height: number;
  unit: 'px' | 'em' | 'rem' | 'pt';
}

export interface Link {
  id: string;
  text: string;
  url: string;
  position: number;
  page: number;
  type: 'internal' | 'external' | 'email' | 'phone';
  accessible: boolean;
}

export interface Footnote {
  id: string;
  text: string;
  position: number;
  page: number;
  reference: string;
}

export interface BibliographyEntry {
  id: string;
  text: string;
  type: 'book' | 'article' | 'website' | 'other';
  position: number;
  page: number;
}

export interface ContentAnalysis {
  readability: ReadabilityMetrics;
  sentiment: SentimentAnalysis;
  topics: Topic[];
  entities: Entity[];
  keywords: Keyword[];
  summary: string;
  complexity: number; // 0-100
  educational: EducationalAnalysis;
}

export interface ReadabilityMetrics {
  fleschKincaid: number;
  gunningFog: number;
  smog: number;
  ari: number;
  colemanLiau: number;
  average: number;
  level: 'elementary' | 'middle' | 'high' | 'college' | 'graduate';
}

export interface SentimentAnalysis {
  overall: 'positive' | 'negative' | 'neutral';
  score: number; // -1 to 1
  confidence: number; // 0-100
  emotions: Emotion[];
  tone: Tone[];
}

export interface Emotion {
  name: string;
  intensity: number; // 0-100
  confidence: number; // 0-100
}

export interface Tone {
  name: string;
  intensity: number; // 0-100
  confidence: number; // 0-100
}

export interface Topic {
  name: string;
  confidence: number; // 0-100
  relevance: number; // 0-100
  keywords: string[];
}

export interface Entity {
  name: string;
  type: 'person' | 'organization' | 'location' | 'date' | 'money' | 'other';
  confidence: number; // 0-100
  position: number;
  context: string;
}

export interface Keyword {
  word: string;
  frequency: number;
  importance: number; // 0-100
  position: number[];
}

export interface EducationalAnalysis {
  subject: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  concepts: Concept[];
  prerequisites: string[];
  learningObjectives: string[];
  assessment: AssessmentInfo;
}

export interface Concept {
  name: string;
  definition: string;
  importance: number; // 0-100
  position: number;
  relatedConcepts: string[];
}

export interface AssessmentInfo {
  questions: Question[];
  difficulty: number; // 0-100
  timeEstimate: number; // minutes
  skills: string[];
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  difficulty: number; // 0-100
  position: number;
  options?: string[];
  answer?: string;
}

export interface ProcessingError {
  id: string;
  type: ErrorType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  description: string;
  step: string;
  position?: number;
  page?: number;
  resolution: string;
  timestamp: Date;
}

// ============================================================================
// AUDIO GENERATION INTERFACES
// ============================================================================

export interface AudioGeneration {
  id: string;
  userId: string;
  documentId: string;
  processingId: string;
  status: GenerationStatus;
  progress: number; // 0-100
  configuration: AudioConfig;
  segments: AudioSegment[];
  metadata: AudioMetadata;
  quality: AudioQuality;
  processingTime: number; // milliseconds
  errorLog: GenerationError[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AudioConfig {
  voice: VoiceSettings;
  speech: SpeechSettings;
  audio: AudioSettings;
  processing: ProcessingSettings;
  accessibility: AccessibilitySettings;
}

export interface VoiceSettings {
  provider: 'openai' | 'azure' | 'aws' | 'google' | 'elevenlabs' | 'custom';
  voice: string;
  language: string;
  accent?: string;
  gender?: 'male' | 'female' | 'neutral';
  age?: 'child' | 'young_adult' | 'adult' | 'elderly';
  personality?: string;
  customVoice?: string;
}

export interface SpeechSettings {
  speed: number; // 0.5 to 2.0
  pitch: number; // 0.5 to 2.0
  volume: number; // 0 to 100
  emphasis: number; // 0 to 100
  pause: number; // 0 to 100
  pronunciation: PronunciationSettings;
  intonation: IntonationSettings;
  rhythm: RhythmSettings;
}

export interface PronunciationSettings {
  accuracy: number; // 0-100
  clarity: number; // 0-100
  naturalness: number; // 0-100
  customWords: CustomWord[];
  phoneticGuide: boolean;
  slowMode: boolean;
}

export interface CustomWord {
  word: string;
  pronunciation: string;
  context?: string;
  frequency: number;
}

export interface IntonationSettings {
  pattern: 'monotone' | 'natural' | 'expressive' | 'dramatic';
  variation: number; // 0-100
  emphasis: number; // 0-100
  questionRise: boolean;
  statementFall: boolean;
}

export interface RhythmSettings {
  tempo: number; // 0.5 to 2.0
  regularity: number; // 0-100
  stress: number; // 0-100
  pauseLength: number; // 0-100
  flow: number; // 0-100
}

export interface AudioSettings {
  format: AudioFormat;
  quality: AudioQuality;
  bitrate: number; // kbps
  sampleRate: number; // Hz
  channels: number;
  compression: CompressionSettings;
  enhancement: EnhancementSettings;
}

export interface CompressionSettings {
  algorithm: 'mp3' | 'aac' | 'ogg' | 'flac' | 'wav';
  level: number; // 0-100
  lossless: boolean;
  metadata: boolean;
}

export interface EnhancementSettings {
  noiseReduction: boolean;
  normalization: boolean;
  equalization: boolean;
  reverb: boolean;
  echo: boolean;
  clarity: number; // 0-100
  presence: number; // 0-100
}

export interface ProcessingSettings {
  chunkSize: number; // characters
  overlap: number; // characters
  parallel: boolean;
  maxConcurrency: number;
  retryAttempts: number;
  timeout: number; // seconds
  fallback: boolean;
}

export interface AccessibilitySettings {
  screenReader: boolean;
  highContrast: boolean;
  largeText: boolean;
  slowSpeed: boolean;
  pauseOnPunctuation: boolean;
  emphasizeKeywords: boolean;
  audioDescription: boolean;
  captions: boolean;
  transcripts: boolean;
}

export interface AudioSegment {
  id: string;
  text: string;
  startPosition: number;
  endPosition: number;
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  audioUrl: string;
  audioData?: ArrayBuffer;
  quality: AudioQuality;
  metadata: SegmentMetadata;
  markers: AudioMarker[];
  createdAt: Date;
}

export interface SegmentMetadata {
  wordCount: number;
  characterCount: number;
  readingTime: number; // seconds
  complexity: number; // 0-100
  keywords: string[];
  entities: string[];
  sentiment: number; // -1 to 1
  emphasis: EmphasisPoint[];
}

export interface EmphasisPoint {
  text: string;
  position: number;
  intensity: number; // 0-100
  type: 'keyword' | 'heading' | 'important' | 'question' | 'exclamation';
}

export interface AudioMarker {
  id: string;
  type: 'bookmark' | 'note' | 'highlight' | 'question' | 'important';
  position: number; // seconds
  text: string;
  color?: string;
  icon?: string;
  createdAt: Date;
}

export interface AudioQuality {
  overall: number; // 0-100
  clarity: number; // 0-100
  naturalness: number; // 0-100
  intelligibility: number; // 0-100
  consistency: number; // 0-100
  pronunciation: number; // 0-100
  speed: number; // 0-100
  volume: number; // 0-100
  issues: QualityIssue[];
}

export interface QualityIssue {
  type: 'clarity' | 'speed' | 'pronunciation' | 'volume' | 'consistency';
  severity: 'low' | 'medium' | 'high';
  description: string;
  suggestion: string;
  position: number; // seconds
}

export interface AudioMetadata {
  title: string;
  description: string;
  language: string;
  duration: number; // seconds
  fileSize: number; // bytes
  format: string;
  bitrate: number; // kbps
  sampleRate: number; // Hz
  channels: number;
  created: Date;
  modified: Date;
  tags: string[];
  category: string;
  accessibility: AccessibilityMetadata;
}

export interface AccessibilityMetadata {
  hasTranscripts: boolean;
  hasCaptions: boolean;
  hasAudioDescription: boolean;
  hasChapterMarkers: boolean;
  hasBookmarks: boolean;
  hasSpeedControl: boolean;
  hasVolumeControl: boolean;
  hasPauseControl: boolean;
  hasSkipControl: boolean;
  hasRepeatControl: boolean;
}

export interface GenerationError {
  id: string;
  type: ErrorType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  description: string;
  segment?: string;
  position?: number;
  resolution: string;
  timestamp: Date;
}

// ============================================================================
// AUDIO PLAYBACK INTERFACES
// ============================================================================

export interface AudioPlayback {
  id: string;
  userId: string;
  audioId: string;
  sessionId: string;
  status: PlaybackStatus;
  position: number; // seconds
  duration: number; // seconds
  speed: number; // 0.5 to 2.0
  volume: number; // 0 to 100
  loop: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  playlist: PlaylistItem[];
  currentTrack: number;
  settings: PlaybackSettings;
  progress: PlaybackProgress;
  analytics: PlaybackAnalytics;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlaylistItem {
  id: string;
  audioId: string;
  title: string;
  duration: number; // seconds
  position: number;
  played: boolean;
  skipped: boolean;
  bookmarks: Bookmark[];
  notes: Note[];
  createdAt: Date;
}

export interface Bookmark {
  id: string;
  position: number; // seconds
  title: string;
  description?: string;
  color?: string;
  icon?: string;
  createdAt: Date;
}

export interface Note {
  id: string;
  position: number; // seconds
  text: string;
  type: 'note' | 'question' | 'insight' | 'reminder';
  color?: string;
  icon?: string;
  createdAt: Date;
}

export interface PlaybackSettings {
  autoPlay: boolean;
  autoPause: boolean;
  autoSkip: boolean;
  smartPause: boolean;
  backgroundPlay: boolean;
  notifications: boolean;
  gestures: GestureSettings;
  shortcuts: ShortcutSettings;
}

export interface GestureSettings {
  tapToPlay: boolean;
  doubleTapToSkip: boolean;
  swipeToSeek: boolean;
  pinchToZoom: boolean;
  longPressToBookmark: boolean;
}

export interface ShortcutSettings {
  spacebar: 'play_pause' | 'skip' | 'bookmark' | 'none';
  arrowKeys: 'seek' | 'volume' | 'speed' | 'none';
  numberKeys: 'bookmark' | 'chapter' | 'speed' | 'none';
  custom: CustomShortcut[];
}

export interface CustomShortcut {
  key: string;
  action: string;
  description: string;
}

export interface PlaybackProgress {
  current: number; // seconds
  total: number; // seconds
  percentage: number; // 0-100
  remaining: number; // seconds
  played: number; // seconds
  skipped: number; // seconds
  bookmarks: number;
  notes: number;
  lastPosition: number; // seconds
  lastUpdated: Date;
}

export interface PlaybackAnalytics {
  totalTime: number; // seconds
  playTime: number; // seconds
  pauseTime: number; // seconds
  skipTime: number; // seconds
  rewindTime: number; // seconds
  fastForwardTime: number; // seconds
  bookmarks: number;
  notes: number;
  speedChanges: number;
  volumeChanges: number;
  interruptions: number;
  completionRate: number; // 0-100
  engagement: number; // 0-100
  retention: number; // 0-100
}

// ============================================================================
// USER PREFERENCES INTERFACES
// ============================================================================

export interface AudioReaderPreferences {
  id: string;
  userId: string;
  reading: ReadingPreferences;
  audio: AudioPreferences;
  accessibility: AccessibilityPreferences;
  interface: InterfacePreferences;
  notifications: NotificationPreferences;
  privacy: PrivacyPreferences;
  advanced: AdvancedPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReadingPreferences {
  defaultSpeed: number; // 0.5 to 2.0
  defaultVolume: number; // 0 to 100
  autoPlay: boolean;
  autoPause: boolean;
  smartPause: boolean;
  pauseOnPunctuation: boolean;
  emphasizeKeywords: boolean;
  highlightText: boolean;
  showProgress: boolean;
  showTime: boolean;
  showBookmarks: boolean;
  showNotes: boolean;
}

export interface AudioPreferences {
  voice: VoicePreferences;
  speech: SpeechPreferences;
  quality: QualityPreferences;
  format: FormatPreferences;
}

export interface VoicePreferences {
  provider: 'openai' | 'azure' | 'aws' | 'google' | 'elevenlabs' | 'custom';
  voice: string;
  language: string;
  accent?: string;
  gender?: 'male' | 'female' | 'neutral';
  age?: 'child' | 'young_adult' | 'adult' | 'elderly';
  personality?: string;
}

export interface SpeechPreferences {
  speed: number; // 0.5 to 2.0
  pitch: number; // 0.5 to 2.0
  volume: number; // 0 to 100
  emphasis: number; // 0 to 100
  pause: number; // 0 to 100
  pronunciation: number; // 0 to 100
  intonation: number; // 0 to 100
  rhythm: number; // 0 to 100
}

export interface QualityPreferences {
  bitrate: number; // kbps
  sampleRate: number; // Hz
  channels: number;
  compression: number; // 0-100
  enhancement: number; // 0-100
  noiseReduction: boolean;
  normalization: boolean;
  equalization: boolean;
}

export interface FormatPreferences {
  format: AudioFormat;
  quality: 'low' | 'medium' | 'high' | 'lossless';
  compression: boolean;
  metadata: boolean;
  chapters: boolean;
  bookmarks: boolean;
  transcripts: boolean;
}

export interface AccessibilityPreferences {
  screenReader: boolean;
  highContrast: boolean;
  largeText: boolean;
  slowSpeed: boolean;
  pauseOnPunctuation: boolean;
  emphasizeKeywords: boolean;
  audioDescription: boolean;
  captions: boolean;
  transcripts: boolean;
  keyboardNavigation: boolean;
  voiceControl: boolean;
  gestureControl: boolean;
}

export interface InterfacePreferences {
  theme: 'light' | 'dark' | 'auto';
  layout: 'minimal' | 'standard' | 'detailed' | 'fullscreen';
  position: 'top' | 'bottom' | 'left' | 'right' | 'floating';
  size: 'small' | 'medium' | 'large' | 'fullscreen';
  transparency: number; // 0-100
  animations: boolean;
  sounds: boolean;
  haptics: boolean;
}

export interface NotificationPreferences {
  enabled: boolean;
  types: NotificationType[];
  frequency: 'immediate' | 'daily' | 'weekly' | 'never';
  quietHours: QuietHours;
  sound: boolean;
  vibration: boolean;
  popup: boolean;
  email: boolean;
  push: boolean;
}

export interface NotificationType {
  type: 'processing_complete' | 'audio_ready' | 'error_occurred' | 'bookmark_created' | 'note_added' | 'progress_milestone';
  enabled: boolean;
  sound: boolean;
  vibration: boolean;
  popup: boolean;
}

export interface QuietHours {
  enabled: boolean;
  start: string; // HH:MM
  end: string; // HH:MM
  timezone: string;
}

export interface PrivacyPreferences {
  dataSharing: 'none' | 'anonymous' | 'limited' | 'full';
  progressSharing: boolean;
  bookmarkSharing: boolean;
  noteSharing: boolean;
  analytics: boolean;
  personalization: boolean;
  location: boolean;
  contacts: boolean;
}

export interface AdvancedPreferences {
  debug: boolean;
  logging: boolean;
  telemetry: boolean;
  experiments: boolean;
  beta: boolean;
  developer: boolean;
  api: boolean;
  webhooks: boolean;
  cache: boolean;
  offline: boolean;
  sync: boolean;
  backup: boolean;
}

// ============================================================================
// ENUMS AND TYPES
// ============================================================================

export type DocumentType = 'pdf' | 'docx' | 'txt' | 'rtf' | 'html' | 'epub' | 'mobi' | 'odt' | 'pages' | 'other';
export type ProcessingStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
export type ProcessingStepType = 'upload' | 'extract' | 'parse' | 'analyze' | 'process' | 'generate' | 'optimize' | 'finalize';
export type ErrorType = 'upload' | 'extraction' | 'parsing' | 'analysis' | 'generation' | 'optimization' | 'storage' | 'network' | 'permission' | 'quota' | 'format' | 'corruption' | 'timeout' | 'unknown';
export type GenerationStatus = 'pending' | 'generating' | 'completed' | 'failed' | 'cancelled';
export type AudioFormat = 'mp3' | 'wav' | 'flac' | 'aac' | 'ogg' | 'm4a' | 'webm' | 'opus';
export type PlaybackStatus = 'stopped' | 'playing' | 'paused' | 'buffering' | 'error';
export type RepeatMode = 'none' | 'one' | 'all' | 'shuffle';

// ============================================================================
// API ENDPOINT INTERFACES
// ============================================================================

export interface AudioReaderAPI {
  // Document Processing
  uploadDocument: (params: UploadDocumentParams) => Promise<DocumentProcessing>;
  getDocument: (documentId: string) => Promise<DocumentProcessing>;
  processDocument: (params: ProcessDocumentParams) => Promise<DocumentProcessing>;
  getProcessingStatus: (processingId: string) => Promise<DocumentProcessing>;
  cancelProcessing: (processingId: string) => Promise<void>;
  deleteDocument: (documentId: string) => Promise<void>;
  listDocuments: (params: ListDocumentsParams) => Promise<DocumentProcessing[]>;
  
  // Audio Generation
  generateAudio: (params: GenerateAudioParams) => Promise<AudioGeneration>;
  getAudio: (audioId: string) => Promise<AudioGeneration>;
  getGenerationStatus: (generationId: string) => Promise<AudioGeneration>;
  cancelGeneration: (generationId: string) => Promise<void>;
  deleteAudio: (audioId: string) => Promise<void>;
  listAudio: (params: ListAudioParams) => Promise<AudioGeneration[]>;
  
  // Audio Playback
  startPlayback: (params: StartPlaybackParams) => Promise<AudioPlayback>;
  getPlayback: (playbackId: string) => Promise<AudioPlayback>;
  updatePlayback: (params: UpdatePlaybackParams) => Promise<AudioPlayback>;
  stopPlayback: (playbackId: string) => Promise<void>;
  pausePlayback: (playbackId: string) => Promise<AudioPlayback>;
  resumePlayback: (playbackId: string) => Promise<AudioPlayback>;
  
  // Bookmarks and Notes
  createBookmark: (params: CreateBookmarkParams) => Promise<Bookmark>;
  getBookmark: (bookmarkId: string) => Promise<Bookmark>;
  updateBookmark: (params: UpdateBookmarkParams) => Promise<Bookmark>;
  deleteBookmark: (bookmarkId: string) => Promise<void>;
  listBookmarks: (params: ListBookmarksParams) => Promise<Bookmark[]>;
  
  createNote: (params: CreateNoteParams) => Promise<Note>;
  getNote: (noteId: string) => Promise<Note>;
  updateNote: (params: UpdateNoteParams) => Promise<Note>;
  deleteNote: (noteId: string) => Promise<void>;
  listNotes: (params: ListNotesParams) => Promise<Note[]>;
  
  // Preferences
  getPreferences: (userId: string) => Promise<AudioReaderPreferences>;
  updatePreferences: (params: UpdatePreferencesParams) => Promise<AudioReaderPreferences>;
  resetPreferences: (userId: string) => Promise<AudioReaderPreferences>;
  
  // Analytics
  getAnalytics: (params: GetAnalyticsParams) => Promise<AudioReaderAnalytics>;
  getUsageStats: (params: GetUsageStatsParams) => Promise<UsageStats>;
  getPerformanceMetrics: (params: GetPerformanceMetricsParams) => Promise<PerformanceMetrics>;
  
  // Export/Import
  exportData: (params: ExportDataParams) => Promise<string>;
  importData: (params: ImportDataParams) => Promise<ImportResult>;
}

// ============================================================================
// API PARAMETER INTERFACES
// ============================================================================

export interface UploadDocumentParams {
  userId: string;
  file: File;
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
  settings?: ProcessingSettings;
}

export interface ProcessDocumentParams {
  documentId: string;
  settings?: ProcessingSettings;
  audioConfig?: AudioConfig;
}

export interface ListDocumentsParams {
  userId: string;
  status?: ProcessingStatus;
  type?: DocumentType;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GenerateAudioParams {
  documentId: string;
  processingId: string;
  config: AudioConfig;
  segments?: AudioSegment[];
}

export interface ListAudioParams {
  userId: string;
  status?: GenerationStatus;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface StartPlaybackParams {
  userId: string;
  audioId: string;
  position?: number;
  speed?: number;
  volume?: number;
  settings?: PlaybackSettings;
}

export interface UpdatePlaybackParams {
  playbackId: string;
  position?: number;
  speed?: number;
  volume?: number;
  settings?: PlaybackSettings;
}

export interface CreateBookmarkParams {
  userId: string;
  audioId: string;
  position: number;
  title: string;
  description?: string;
  color?: string;
  icon?: string;
}

export interface UpdateBookmarkParams {
  bookmarkId: string;
  title?: string;
  description?: string;
  color?: string;
  icon?: string;
}

export interface ListBookmarksParams {
  userId: string;
  audioId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateNoteParams {
  userId: string;
  audioId: string;
  position: number;
  text: string;
  type?: 'note' | 'question' | 'insight' | 'reminder';
  color?: string;
  icon?: string;
}

export interface UpdateNoteParams {
  noteId: string;
  text?: string;
  type?: 'note' | 'question' | 'insight' | 'reminder';
  color?: string;
  icon?: string;
}

export interface ListNotesParams {
  userId: string;
  audioId?: string;
  type?: 'note' | 'question' | 'insight' | 'reminder';
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UpdatePreferencesParams {
  userId: string;
  preferences: Partial<AudioReaderPreferences>;
}

export interface GetAnalyticsParams {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  metrics?: string[];
}

export interface GetUsageStatsParams {
  userId: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate?: Date;
  endDate?: Date;
}

export interface GetPerformanceMetricsParams {
  startDate?: Date;
  endDate?: Date;
  metrics?: string[];
}

export interface ExportDataParams {
  userId: string;
  format: 'json' | 'csv' | 'excel' | 'pdf';
  data: string[];
  startDate?: Date;
  endDate?: Date;
}

export interface ImportDataParams {
  userId: string;
  data: string;
  format: 'json' | 'csv' | 'excel';
  merge: boolean;
}

export interface ImportResult {
  success: boolean;
  imported: number;
  failed: number;
  errors: string[];
  warnings: string[];
}

// ============================================================================
// ANALYTICS INTERFACES
// ============================================================================

export interface AudioReaderAnalytics {
  id: string;
  userId: string;
  period: AnalyticsPeriod;
  startDate: Date;
  endDate: Date;
  documents: DocumentAnalytics;
  audio: AudioAnalytics;
  playback: PlaybackAnalytics;
  usage: UsageAnalytics;
  performance: PerformanceAnalytics;
  insights: AnalyticsInsight[];
  recommendations: AnalyticsRecommendation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentAnalytics {
  totalDocuments: number;
  processedDocuments: number;
  failedDocuments: number;
  averageProcessingTime: number; // milliseconds
  totalProcessingTime: number; // milliseconds
  documentTypes: DocumentTypeStats[];
  processingErrors: ErrorStats[];
  successRate: number; // 0-100
}

export interface DocumentTypeStats {
  type: DocumentType;
  count: number;
  averageSize: number; // bytes
  averageProcessingTime: number; // milliseconds
  successRate: number; // 0-100
}

export interface ErrorStats {
  type: ErrorType;
  count: number;
  frequency: number; // 0-100
  impact: 'low' | 'medium' | 'high' | 'critical';
  resolution: string;
}

export interface AudioAnalytics {
  totalAudio: number;
  generatedAudio: number;
  failedAudio: number;
  averageGenerationTime: number; // milliseconds
  totalGenerationTime: number; // milliseconds
  audioFormats: AudioFormatStats[];
  voiceUsage: VoiceUsageStats[];
  qualityMetrics: QualityMetrics;
  successRate: number; // 0-100
}

export interface AudioFormatStats {
  format: AudioFormat;
  count: number;
  averageSize: number; // bytes
  averageDuration: number; // seconds
  averageQuality: number; // 0-100
}

export interface VoiceUsageStats {
  voice: string;
  provider: string;
  count: number;
  averageQuality: number; // 0-100
  userSatisfaction: number; // 0-100
}

export interface QualityMetrics {
  averageQuality: number; // 0-100
  clarity: number; // 0-100
  naturalness: number; // 0-100
  intelligibility: number; // 0-100
  consistency: number; // 0-100
  pronunciation: number; // 0-100
  speed: number; // 0-100
  volume: number; // 0-100
}

export interface UsageAnalytics {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  returningUsers: number;
  averageSessionTime: number; // minutes
  totalSessionTime: number; // minutes
  averageDocumentsPerUser: number;
  averageAudioPerUser: number;
  retentionRate: number; // 0-100
  engagementRate: number; // 0-100
}

export interface PerformanceAnalytics {
  averageResponseTime: number; // milliseconds
  averageProcessingTime: number; // milliseconds
  averageGenerationTime: number; // milliseconds
  systemUptime: number; // 0-100
  errorRate: number; // 0-100
  throughput: number; // requests per second
  resourceUsage: ResourceUsage;
  scalability: ScalabilityMetrics;
}

export interface ResourceUsage {
  cpu: number; // percentage
  memory: number; // percentage
  storage: number; // percentage
  network: number; // percentage
  gpu: number; // percentage
}

export interface ScalabilityMetrics {
  concurrentUsers: number;
  maxConcurrentUsers: number;
  averageLoad: number; // 0-100
  peakLoad: number; // 0-100
  capacity: number; // 0-100
  efficiency: number; // 0-100
}

export interface AnalyticsInsight {
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

export interface AnalyticsRecommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  actions: string[];
  expectedOutcome: string;
  createdAt: Date;
}

export interface UsageStats {
  period: string;
  startDate: Date;
  endDate: Date;
  documents: number;
  audio: number;
  playback: number;
  users: number;
  sessions: number;
  time: number; // minutes
  trends: UsageTrend[];
}

export interface UsageTrend {
  date: Date;
  documents: number;
  audio: number;
  playback: number;
  users: number;
  sessions: number;
  time: number; // minutes
}

export interface PerformanceMetrics {
  period: string;
  startDate: Date;
  endDate: Date;
  responseTime: number; // milliseconds
  processingTime: number; // milliseconds
  generationTime: number; // milliseconds
  uptime: number; // 0-100
  errorRate: number; // 0-100
  throughput: number; // requests per second
  trends: PerformanceTrend[];
}

export interface PerformanceTrend {
  date: Date;
  responseTime: number; // milliseconds
  processingTime: number; // milliseconds
  generationTime: number; // milliseconds
  uptime: number; // 0-100
  errorRate: number; // 0-100
  throughput: number; // requests per second
}

// ============================================================================
// ENUMS AND TYPES
// ============================================================================

export type AnalyticsPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
export type InsightType = 'usage' | 'performance' | 'quality' | 'user' | 'trend' | 'anomaly';
export type RecommendationType = 'optimization' | 'feature' | 'quality' | 'performance' | 'user' | 'business';

// ============================================================================
// TOOL FUNCTION INTERFACES
// ============================================================================

export interface AudioReaderTools {
  // Document Processing Tools
  uploadDocument: (params: UploadDocumentParams) => Promise<DocumentProcessing>;
  processDocument: (params: ProcessDocumentParams) => Promise<DocumentProcessing>;
  getDocumentStatus: (documentId: string) => Promise<ProcessingStatus>;
  extractText: (documentId: string) => Promise<string>;
  analyzeDocument: (documentId: string) => Promise<ContentAnalysis>;
  
  // Audio Generation Tools
  generateAudio: (params: GenerateAudioParams) => Promise<AudioGeneration>;
  getAudioStatus: (audioId: string) => Promise<GenerationStatus>;
  optimizeAudio: (audioId: string, settings: AudioSettings) => Promise<AudioGeneration>;
  enhanceAudio: (audioId: string, settings: EnhancementSettings) => Promise<AudioGeneration>;
  
  // Playback Tools
  startPlayback: (params: StartPlaybackParams) => Promise<AudioPlayback>;
  controlPlayback: (playbackId: string, action: string) => Promise<AudioPlayback>;
  seekPlayback: (playbackId: string, position: number) => Promise<AudioPlayback>;
  adjustSpeed: (playbackId: string, speed: number) => Promise<AudioPlayback>;
  adjustVolume: (playbackId: string, volume: number) => Promise<AudioPlayback>;
  
  // Bookmark and Note Tools
  createBookmark: (params: CreateBookmarkParams) => Promise<Bookmark>;
  createNote: (params: CreateNoteParams) => Promise<Note>;
  searchBookmarks: (userId: string, query: string) => Promise<Bookmark[]>;
  searchNotes: (userId: string, query: string) => Promise<Note[]>;
  exportBookmarks: (userId: string, format: string) => Promise<string>;
  exportNotes: (userId: string, format: string) => Promise<string>;
  
  // Preference Tools
  getPreferences: (userId: string) => Promise<AudioReaderPreferences>;
  updatePreferences: (params: UpdatePreferencesParams) => Promise<AudioReaderPreferences>;
  resetPreferences: (userId: string) => Promise<AudioReaderPreferences>;
  importPreferences: (userId: string, data: string) => Promise<AudioReaderPreferences>;
  exportPreferences: (userId: string) => Promise<string>;
  
  // Analytics Tools
  getAnalytics: (params: GetAnalyticsParams) => Promise<AudioReaderAnalytics>;
  getUsageStats: (params: GetUsageStatsParams) => Promise<UsageStats>;
  getPerformanceMetrics: (params: GetPerformanceMetricsParams) => Promise<PerformanceMetrics>;
  generateInsights: (userId: string, data: any[]) => Promise<AnalyticsInsight[]>;
  generateRecommendations: (userId: string, analytics: AudioReaderAnalytics) => Promise<AnalyticsRecommendation[]>;
  
  // Utility Tools
  validateDocument: (file: File) => Promise<boolean>;
  validateAudio: (audioId: string) => Promise<boolean>;
  convertFormat: (audioId: string, targetFormat: AudioFormat) => Promise<AudioGeneration>;
  compressAudio: (audioId: string, settings: CompressionSettings) => Promise<AudioGeneration>;
  exportData: (params: ExportDataParams) => Promise<string>;
  importData: (params: ImportDataParams) => Promise<ImportResult>;
}

// ============================================================================
// EXPORT ALL INTERFACES
// ============================================================================

export * from './audio-reader.schema';
