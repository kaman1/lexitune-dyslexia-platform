import { NextRequest, NextResponse } from 'next/server';

/**
 * User Preferences Configuration API
 * 
 * This endpoint provides comprehensive user preference management capabilities for AI assistants.
 * The AI can use this as a tool to understand and configure user preferences for optimal experience.
 * 
 * Available Operations:
 * - GET: Retrieve user preferences and configuration
 * - POST: Create/Update user preferences
 * - PUT: Update specific preference settings
 * - DELETE: Reset preferences to defaults
 * 
 * AI Context:
 * - Pomodoro Settings: Focus duration, break length, session preferences
 * - Work Patterns: Productivity times, work types, organization methods
 * - Distraction Management: Distraction types, mitigation strategies
 * - AI Integration: AI assistance preferences, automation settings
 */

interface UserPreferences {
  id: string;
  userId?: string;
  
  // Pomodoro Technique Preferences
  pomodoro: {
    focusDuration: number; // in minutes
    breakDuration: number; // in minutes
    longBreakDuration: number; // in minutes
    longBreakInterval: number; // after how many focus sessions
    autoStartBreaks: boolean;
    autoStartSessions: boolean;
    soundNotifications: boolean;
    visualNotifications: boolean;
  };
  
  // Work Pattern Preferences
  workPatterns: {
    workTypes: string[]; // ["Creative/Design", "Coding/Development", "Writing/Research", etc.]
    productivityTimes: string[]; // ["morning", "mid-morning", "afternoon", etc.]
    preferredSessionLength: number; // in minutes
    maxSessionsPerDay: number;
    preferredCategories: string[]; // ["work", "personal", "learning", "health", "creative"]
  };
  
  // Task Organization Preferences
  taskOrganization: {
    organizationMethod: 'priority' | 'energy-level' | 'project-category' | 'deadline' | 'estimated-time';
    defaultPriority: 'low' | 'medium' | 'high' | 'urgent';
    defaultEnergyLevel: 'low' | 'medium' | 'high';
    defaultComplexity: 'simple' | 'moderate' | 'complex';
    showProgressBars: boolean;
    showTimeEstimates: boolean;
    groupByCategory: boolean;
  };
  
  // Distraction Management
  distractionManagement: {
    mainDistractions: string[]; // ["social-media", "email", "noise", "movement", "hunger", "fatigue"]
    mitigationStrategies: string[]; // ["do-not-disturb", "noise-cancellation", "timer-reminders", etc.]
    focusMode: 'strict' | 'moderate' | 'flexible';
    breakReminders: boolean;
    movementReminders: boolean;
    hydrationReminders: boolean;
  };
  
  // AI Integration Preferences
  aiIntegration: {
    aiOptimization: boolean;
    aiBreakSuggestions: boolean;
    aiTaskPrioritization: boolean;
    aiTimeEstimation: boolean;
    aiScheduleOptimization: boolean;
    aiProgressTracking: boolean;
    aiDistractionAnalysis: boolean;
    aiProductivityInsights: boolean;
  };
  
  // Notification Preferences
  notifications: {
    sessionStart: boolean;
    sessionEnd: boolean;
    breakStart: boolean;
    breakEnd: boolean;
    taskCompletion: boolean;
    dailySummary: boolean;
    weeklyReport: boolean;
    productivityAlerts: boolean;
  };
  
  // Accessibility Preferences
  accessibility: {
    highContrast: boolean;
    largeText: boolean;
    reducedMotion: boolean;
    screenReaderSupport: boolean;
    keyboardNavigation: boolean;
    colorBlindFriendly: boolean;
  };
  
  createdAt: string;
  updatedAt: string;
}

// Default preferences
const defaultPreferences: UserPreferences = {
  id: 'default',
  pomodoro: {
    focusDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4,
    autoStartBreaks: false,
    autoStartSessions: false,
    soundNotifications: true,
    visualNotifications: true,
  },
  workPatterns: {
    workTypes: ['Creative/Design', 'Coding/Development', 'Writing/Research'],
    productivityTimes: ['morning', 'mid-morning'],
    preferredSessionLength: 25,
    maxSessionsPerDay: 8,
    preferredCategories: ['work', 'learning'],
  },
  taskOrganization: {
    organizationMethod: 'priority',
    defaultPriority: 'medium',
    defaultEnergyLevel: 'medium',
    defaultComplexity: 'moderate',
    showProgressBars: true,
    showTimeEstimates: true,
    groupByCategory: true,
  },
  distractionManagement: {
    mainDistractions: ['social-media', 'email'],
    mitigationStrategies: ['do-not-disturb', 'timer-reminders'],
    focusMode: 'moderate',
    breakReminders: true,
    movementReminders: true,
    hydrationReminders: true,
  },
  aiIntegration: {
    aiOptimization: true,
    aiBreakSuggestions: true,
    aiTaskPrioritization: true,
    aiTimeEstimation: true,
    aiScheduleOptimization: true,
    aiProgressTracking: true,
    aiDistractionAnalysis: false,
    aiProductivityInsights: true,
  },
  notifications: {
    sessionStart: true,
    sessionEnd: true,
    breakStart: true,
    breakEnd: true,
    taskCompletion: true,
    dailySummary: false,
    weeklyReport: true,
    productivityAlerts: true,
  },
  accessibility: {
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReaderSupport: true,
    keyboardNavigation: true,
    colorBlindFriendly: false,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// In-memory storage for demo purposes
// In production, use a proper database
let userPreferences: UserPreferences[] = [defaultPreferences];

// Helper function to save preferences to localStorage
const savePreferencesToStorage = (prefs: UserPreferences) => {
  try {
    // In a server-side context, we can't access localStorage
    // This function will be called but won't execute localStorage operations
    console.log('Preferences would be saved to localStorage:', prefs);
  } catch (error) {
    console.error('Failed to save preferences:', error);
  }
};

// Helper function to load preferences from localStorage
const loadPreferencesFromStorage = (userId: string): UserPreferences | null => {
  try {
    // In a server-side context, we can't access localStorage
    // This function will be called but won't execute localStorage operations
    console.log('Would load preferences from localStorage for user:', userId);
    return null;
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return null;
  }
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const userId = searchParams.get('userId') || 'default';
    const category = searchParams.get('category');

    let response: any = {
      success: true,
      message: 'User preferences retrieved successfully',
      timestamp: new Date().toISOString(),
      system_info: {
        total_users: userPreferences.length,
        available_categories: ['pomodoro', 'workPatterns', 'taskOrganization', 'distractionManagement', 'aiIntegration', 'notifications', 'accessibility'],
        preference_types: ['boolean', 'number', 'string', 'array', 'object']
      }
    };

    // Find user preferences
    let userPrefs = userPreferences.find(p => p.id === userId);
    
    // Try to load from localStorage first
    if (!userPrefs) {
      const storedPrefs = loadPreferencesFromStorage(userId);
      if (storedPrefs) {
        userPrefs = storedPrefs;
        // Add to memory if not already there
        if (!userPreferences.find(p => p.id === userId)) {
          userPreferences.push(userPrefs);
        }
      }
    }
    
    // Fallback to default preferences
    if (!userPrefs) {
      userPrefs = defaultPreferences;
    }

    // Handle different query actions
    switch (action) {
      case 'all':
        response.data = {
          user_id: userId,
          preferences: userPrefs
        };
        break;

      case 'pomodoro':
        response.data = {
          user_id: userId,
          category: 'pomodoro',
          preferences: userPrefs.pomodoro,
          recommendations: {
            focus_duration: userPrefs.pomodoro.focusDuration >= 30 ? 'Consider shorter sessions for better focus' : 'Good session length for sustained attention',
            break_ratio: userPrefs.pomodoro.breakDuration / userPrefs.pomodoro.focusDuration < 0.2 ? 'Consider longer breaks for better recovery' : 'Good break ratio'
          }
        };
        break;

      case 'work_patterns':
        response.data = {
          user_id: userId,
          category: 'workPatterns',
          preferences: userPrefs.workPatterns,
          insights: {
            session_efficiency: userPrefs.workPatterns.preferredSessionLength <= 25 ? 'Optimal for ADHD-friendly focus' : 'Good for deep work',
            daily_capacity: userPrefs.workPatterns.maxSessionsPerDay <= 6 ? 'Sustainable workload' : 'High capacity - monitor for burnout'
          }
        };
        break;

      case 'ai_integration':
        response.data = {
          user_id: userId,
          category: 'aiIntegration',
          preferences: userPrefs.aiIntegration,
          ai_capabilities: {
            available_features: Object.entries(userPrefs.aiIntegration)
              .filter(([_, enabled]) => enabled)
              .map(([feature]) => feature.replace(/([A-Z])/g, ' $1').toLowerCase()),
            optimization_potential: Object.values(userPrefs.aiIntegration).filter(Boolean).length / Object.keys(userPrefs.aiIntegration).length
          }
        };
        break;

      case 'summary':
        response.data = {
          user_id: userId,
          summary: {
            pomodoro_settings: {
              focus_time: `${userPrefs.pomodoro.focusDuration} minutes`,
              break_time: `${userPrefs.pomodoro.breakDuration} minutes`,
              long_break: `${userPrefs.pomodoro.longBreakDuration} minutes`,
              sessions_per_long_break: userPrefs.pomodoro.longBreakInterval
            },
            work_preferences: {
              preferred_session_length: `${userPrefs.workPatterns.preferredSessionLength} minutes`,
              max_daily_sessions: userPrefs.workPatterns.maxSessionsPerDay,
              top_work_types: userPrefs.workPatterns.workTypes.slice(0, 3),
              productivity_peaks: userPrefs.workPatterns.productivityTimes
            },
            ai_enabled_features: Object.entries(userPrefs.aiIntegration)
              .filter(([_, enabled]) => enabled)
              .length,
            notification_settings: Object.entries(userPrefs.notifications)
              .filter(([_, enabled]) => enabled)
              .length
          }
        };
        break;

      case 'recommendations':
        const recommendations = [];
        
        // Pomodoro recommendations
        if (userPrefs.pomodoro.focusDuration > 30) {
          recommendations.push('Consider shorter focus sessions (20-25 min) for better ADHD management');
        }
        if (userPrefs.pomodoro.breakDuration < 5) {
          recommendations.push('Increase break duration to 5-10 minutes for better recovery');
        }
        
        // Work pattern recommendations
        if (userPrefs.workPatterns.maxSessionsPerDay > 8) {
          recommendations.push('Consider reducing daily sessions to prevent burnout');
        }
        
        // AI integration recommendations
        if (!userPrefs.aiIntegration.aiBreakSuggestions) {
          recommendations.push('Enable AI break suggestions for optimal productivity');
        }
        
        response.data = {
          user_id: userId,
          recommendations,
          priority: recommendations.length > 3 ? 'high' : recommendations.length > 1 ? 'medium' : 'low'
        };
        break;

      default:
        response.data = {
          user_id: userId,
          preferences: userPrefs
        };
        break;
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Preferences API GET error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to retrieve user preferences', 
        details: error instanceof Error ? error.message : 'Unknown error',
        success: false
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      userId = 'default',
      preferences,
      category,
      merge = false
    } = body;

    if (!preferences) {
      return NextResponse.json(
        { error: 'Preferences are required' },
        { status: 400 }
      );
    }

    // Find existing user preferences or create new
    let userPrefsIndex = userPreferences.findIndex(p => p.id === userId);
    
    if (userPrefsIndex === -1) {
      // Create new user preferences
      const newUserPrefs: UserPreferences = {
        ...defaultPreferences,
        id: userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      userPreferences.push(newUserPrefs);
      userPrefsIndex = userPreferences.length - 1;
    }

    const userPrefs = userPreferences[userPrefsIndex];

    if (category && preferences[category]) {
      // Update specific category
      userPrefs[category as keyof UserPreferences] = {
        ...userPrefs[category as keyof UserPreferences],
        ...preferences[category]
      };
    } else if (merge) {
      // Merge preferences recursively
      Object.keys(preferences).forEach(key => {
        if (key in userPrefs) {
          if (typeof preferences[key] === 'object' && !Array.isArray(preferences[key])) {
            userPrefs[key as keyof UserPreferences] = {
              ...userPrefs[key as keyof UserPreferences],
              ...preferences[key]
            };
          } else {
            userPrefs[key as keyof UserPreferences] = preferences[key];
          }
        }
      });
    } else {
      // Replace entire preferences
      userPrefs = {
        ...userPrefs,
        ...preferences
      };
    }

    userPrefs.updatedAt = new Date().toISOString();
    userPreferences[userPrefsIndex] = userPrefs;
    
    // Save to localStorage
    savePreferencesToStorage(userPrefs);

    return NextResponse.json({
      success: true,
      message: 'User preferences updated successfully',
      data: {
        user_id: userId,
        preferences: userPrefs,
        updated_at: userPrefs.updatedAt
      }
    });

  } catch (error) {
    console.error('Preferences API POST error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update user preferences', 
        details: error instanceof Error ? error.message : 'Unknown error',
        success: false
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = 'default', category, key, value } = body;

    if (!category || !key) {
      return NextResponse.json(
        { error: 'Category and key are required' },
        { status: 400 }
      );
    }

    // Find user preferences
    const userPrefsIndex = userPreferences.findIndex(p => p.id === userId);
    if (userPrefsIndex === -1) {
      return NextResponse.json(
        { error: 'User preferences not found' },
        { status: 404 }
      );
    }

    const userPrefs = userPreferences[userPrefsIndex];
    
    // Update specific preference
    if (category in userPrefs && key in userPrefs[category as keyof UserPreferences]) {
      (userPrefs[category as keyof UserPreferences] as any)[key] = value;
      userPrefs.updatedAt = new Date().toISOString();
      userPreferences[userPrefsIndex] = userPrefs;

      return NextResponse.json({
        success: true,
        message: 'Preference updated successfully',
        data: {
          user_id: userId,
          category,
          key,
          value,
          updated_at: userPrefs.updatedAt
        }
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid category or key' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Preferences API PUT error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update preference', 
        details: error instanceof Error ? error.message : 'Unknown error',
        success: false
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'default';
    const resetToDefaults = searchParams.get('reset') === 'true';

    if (resetToDefaults) {
      // Reset to default preferences
      const userPrefsIndex = userPreferences.findIndex(p => p.id === userId);
      if (userPrefsIndex !== -1) {
        userPreferences[userPrefsIndex] = {
          ...defaultPreferences,
          id: userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
      }

      return NextResponse.json({
        success: true,
        message: 'User preferences reset to defaults successfully',
        data: {
          user_id: userId,
          preferences: userPreferences[userPrefsIndex] || defaultPreferences
        }
      });
    } else {
      // Remove user preferences
      const userPrefsIndex = userPreferences.findIndex(p => p.id === userId);
      if (userPrefsIndex === -1) {
        return NextResponse.json(
          { error: 'User preferences not found' },
          { status: 404 }
        );
      }

      userPreferences.splice(userPrefsIndex, 1);

      return NextResponse.json({
        success: true,
        message: 'User preferences deleted successfully',
        data: {
          deleted_user_id: userId,
          total_users: userPreferences.length
        }
      });
    }

  } catch (error) {
    console.error('Preferences API DELETE error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete user preferences', 
        details: error instanceof Error ? error.message : 'Unknown error',
        success: false
      },
      { status: 500 }
    );
  }
}
