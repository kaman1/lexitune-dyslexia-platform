# User Preferences Configuration API

This API endpoint provides comprehensive user preference management capabilities for AI assistants. The AI can use this as a tool to understand and configure user preferences for optimal experience.

## Base URL
```
http://localhost:3001/api/preferences
```

## Available Operations

### 1. GET - Retrieve User Preferences

#### Endpoint
```
GET /api/preferences
```

#### Query Parameters
- `action` (optional): Specific action to perform
  - `all` - Get all preferences
  - `pomodoro` - Get Pomodoro-specific preferences
  - `work_patterns` - Get work pattern preferences
  - `ai_integration` - Get AI integration preferences
  - `summary` - Get preferences summary
  - `recommendations` - Get AI-generated recommendations
- `userId` (optional): User ID (defaults to 'default')

#### Examples

**Get All Preferences:**
```bash
curl "http://localhost:3001/api/preferences"
```

**Get Pomodoro Preferences:**
```bash
curl "http://localhost:3001/api/preferences?action=pomodoro"
```

**Get Work Pattern Preferences:**
```bash
curl "http://localhost:3001/api/preferences?action=work_patterns"
```

**Get AI Integration Preferences:**
```bash
curl "http://localhost:3001/api/preferences?action=ai_integration"
```

**Get Preferences Summary:**
```bash
curl "http://localhost:3001/api/preferences?action=summary"
```

**Get AI Recommendations:**
```bash
curl "http://localhost:3001/api/preferences?action=recommendations"
```

### 2. POST - Create/Update User Preferences

#### Endpoint
```
POST /api/preferences
```

#### Request Body
```json
{
  "userId": "user_123",
  "preferences": {
    "pomodoro": {
      "focusDuration": 20,
      "breakDuration": 5,
      "autoStartBreaks": true
    },
    "workPatterns": {
      "preferredSessionLength": 20,
      "maxSessionsPerDay": 6
    }
  },
  "merge": true
}
```

#### Required Fields
- `preferences`: Object containing preference settings

#### Optional Fields
- `userId`: User ID (defaults to 'default')
- `category`: Specific category to update
- `merge`: Whether to merge with existing preferences (default: false)

#### Example
```bash
curl -X POST "http://localhost:3001/api/preferences" \
  -H "Content-Type: application/json" \
  -d '{
    "preferences": {
      "pomodoro": {
        "focusDuration": 25,
        "breakDuration": 5
      }
    }
  }'
```

### 3. PUT - Update Specific Preference

#### Endpoint
```
PUT /api/preferences
```

#### Request Body
```json
{
  "userId": "user_123",
  "category": "pomodoro",
  "key": "focusDuration",
  "value": 30
}
```

#### Required Fields
- `category`: Preference category
- `key`: Specific preference key
- `value`: New value

#### Optional Fields
- `userId`: User ID (defaults to 'default')

#### Example
```bash
curl -X PUT "http://localhost:3001/api/preferences" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "pomodoro",
    "key": "focusDuration",
    "value": 30
  }'
```

### 4. DELETE - Reset/Remove Preferences

#### Endpoint
```
DELETE /api/preferences
```

#### Query Parameters
- `userId` (optional): User ID (defaults to 'default')
- `reset` (optional): Set to 'true' to reset to defaults instead of deleting

#### Examples

**Reset to Defaults:**
```bash
curl -X DELETE "http://localhost:3001/api/preferences?reset=true"
```

**Delete User Preferences:**
```bash
curl -X DELETE "http://localhost:3001/api/preferences?userId=user_123"
```

## Preference Categories

### 1. Pomodoro Technique Preferences
```json
{
  "pomodoro": {
    "focusDuration": 25,           // Focus session length in minutes
    "breakDuration": 5,            // Short break length in minutes
    "longBreakDuration": 15,       // Long break length in minutes
    "longBreakInterval": 4,        // Sessions before long break
    "autoStartBreaks": false,      // Auto-start breaks
    "autoStartSessions": false,    // Auto-start focus sessions
    "soundNotifications": true,    // Sound alerts
    "visualNotifications": true    // Visual alerts
  }
}
```

### 2. Work Pattern Preferences
```json
{
  "workPatterns": {
    "workTypes": ["Creative/Design", "Coding/Development"],  // Primary work types
    "productivityTimes": ["morning", "mid-morning"],         // Peak productivity times
    "preferredSessionLength": 25,                            // Preferred session length
    "maxSessionsPerDay": 8,                                  // Maximum daily sessions
    "preferredCategories": ["work", "learning"]              // Preferred task categories
  }
}
```

### 3. Task Organization Preferences
```json
{
  "taskOrganization": {
    "organizationMethod": "priority",                        // How to organize tasks
    "defaultPriority": "medium",                             // Default task priority
    "defaultEnergyLevel": "medium",                          // Default energy requirement
    "defaultComplexity": "moderate",                         // Default task complexity
    "showProgressBars": true,                                // Show progress indicators
    "showTimeEstimates": true,                               // Show time estimates
    "groupByCategory": true                                  // Group tasks by category
  }
}
```

### 4. Distraction Management
```json
{
  "distractionManagement": {
    "mainDistractions": ["social-media", "email"],           // Primary distractions
    "mitigationStrategies": ["do-not-disturb", "timer-reminders"], // Mitigation methods
    "focusMode": "moderate",                                 // Focus strictness
    "breakReminders": true,                                  // Remind to take breaks
    "movementReminders": true,                               // Remind to move
    "hydrationReminders": true                               // Remind to hydrate
  }
}
```

### 5. AI Integration Preferences
```json
{
  "aiIntegration": {
    "aiOptimization": true,                                  // Enable AI optimization
    "aiBreakSuggestions": true,                             // AI break recommendations
    "aiTaskPrioritization": true,                           // AI task prioritization
    "aiTimeEstimation": true,                               // AI time estimates
    "aiScheduleOptimization": true,                         // AI schedule optimization
    "aiProgressTracking": true,                             // AI progress tracking
    "aiDistractionAnalysis": false,                         // AI distraction analysis
    "aiProductivityInsights": true                          // AI productivity insights
  }
}
```

### 6. Notification Preferences
```json
{
  "notifications": {
    "sessionStart": true,                                    // Session start alerts
    "sessionEnd": true,                                      // Session end alerts
    "breakStart": true,                                      // Break start alerts
    "breakEnd": true,                                        // Break end alerts
    "taskCompletion": true,                                  // Task completion alerts
    "dailySummary": false,                                   // Daily summary reports
    "weeklyReport": true,                                    // Weekly reports
    "productivityAlerts": true                               // Productivity alerts
  }
}
```

### 7. Accessibility Preferences
```json
{
  "accessibility": {
    "highContrast": false,                                   // High contrast mode
    "largeText": false,                                      // Large text mode
    "reducedMotion": false,                                  // Reduce animations
    "screenReaderSupport": true,                             // Screen reader support
    "keyboardNavigation": true,                              // Keyboard navigation
    "colorBlindFriendly": false                              // Color blind friendly
  }
}
```

## AI Usage Examples

### 1. Understanding User Preferences
```bash
# Get comprehensive preferences overview
curl "http://localhost:3001/api/preferences?action=summary"

# Get specific category preferences
curl "http://localhost:3001/api/preferences?action=pomodoro"

# Get AI integration capabilities
curl "http://localhost:3001/api/preferences?action=ai_integration"
```

### 2. Optimizing Pomodoro Settings
```bash
# Update focus duration for ADHD-friendly sessions
curl -X PUT "http://localhost:3001/api/preferences" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "pomodoro",
    "key": "focusDuration",
    "value": 20
  }'

# Enable auto-start for better flow
curl -X PUT "http://localhost:3001/api/preferences" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "pomodoro",
    "key": "autoStartBreaks",
    "value": true
  }'
```

### 3. Configuring Work Patterns
```bash
# Set optimal session length based on user's attention span
curl -X PUT "http://localhost:3001/api/preferences" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "workPatterns",
    "key": "preferredSessionLength",
    "value": 15
  }'

# Update productivity times
curl -X POST "http://localhost:3001/api/preferences" \
  -H "Content-Type: application/json" \
  -d '{
    "preferences": {
      "workPatterns": {
        "productivityTimes": ["morning", "late-afternoon"]
      }
    }
  }'
```

### 4. Managing AI Integration
```bash
# Enable AI optimization features
curl -X POST "http://localhost:3001/api/preferences" \
  -H "Content-Type: application/json" \
  -d '{
    "preferences": {
      "aiIntegration": {
        "aiOptimization": true,
        "aiBreakSuggestions": true,
        "aiTaskPrioritization": true
      }
    }
  }'
```

### 5. Setting Distraction Management
```bash
# Configure focus mode and mitigation strategies
curl -X POST "http://localhost:3001/api/preferences" \
  -H "Content-Type: application/json" \
  -d '{
    "preferences": {
      "distractionManagement": {
        "focusMode": "strict",
        "mitigationStrategies": ["do-not-disturb", "noise-cancellation", "timer-reminders"]
      }
    }
  }'
```

## Response Format

All responses follow this structure:
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "timestamp": "2025-01-03T12:00:00.000Z",
  "data": {
    // Response data specific to the operation
  }
}
```

## Error Handling

Errors return this format:
```json
{
  "success": false,
  "error": "Error description",
  "details": "Detailed error information"
}
```

## AI Integration Tips

1. **Always check current preferences first** - Use GET to understand user's current settings
2. **Provide personalized recommendations** - Use the recommendations action for insights
3. **Respect user choices** - Don't override preferences without user consent
4. **Explain benefits** - When suggesting changes, explain why they're beneficial
5. **Consider accessibility** - Ensure changes don't conflict with accessibility needs
6. **Monitor effectiveness** - Track how preference changes affect productivity

## Preference Optimization Strategies

### For ADHD Users
- Shorter focus sessions (15-20 minutes)
- Longer breaks (5-10 minutes)
- Frequent movement reminders
- Strict focus mode
- Visual and sound notifications

### For Deep Work
- Longer focus sessions (30-45 minutes)
- Extended breaks (15-20 minutes)
- Minimal notifications
- Strict distraction management
- AI schedule optimization

### For Learning
- Medium session lengths (20-30 minutes)
- Active break activities
- Progress tracking enabled
- AI insights and recommendations
- Regular review reminders

## Security Notes

- This API is designed for AI assistants to manage user preferences
- All operations are performed on in-memory storage for demo purposes
- In production, implement proper authentication and database storage
- User preferences contain personal information - handle with care
- Consider GDPR compliance for preference data storage
