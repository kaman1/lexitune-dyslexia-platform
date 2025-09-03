# Pomodoro Management API

This API endpoint provides comprehensive Pomodoro session management capabilities for AI assistants. The AI can use this as a tool to understand, create, and manage Pomodoro sessions.

## Base URL
```
http://localhost:3001/api/pomodoro
```

## Available Operations

### 1. GET - Retrieve Pomodoro System Information

#### Endpoint
```
GET /api/pomodoro
```

#### Query Parameters
- `action` (optional): Specific action to perform
  - `sessions` - Get all sessions
  - `active_sessions` - Get currently active sessions
  - `tasks` - Get all Pomodoro tasks
  - `session_details` - Get specific session details (requires `sessionId` param)
  - `task_details` - Get specific task details (requires `taskId` param)
  - `statistics` - Get system statistics
  - `overview` (default) - Get system overview

#### Examples

**Get System Overview:**
```bash
curl "http://localhost:3001/api/pomodoro"
```

**Get All Sessions:**
```bash
curl "http://localhost:3001/api/pomodoro?action=sessions"
```

**Get Active Sessions:**
```bash
curl "http://localhost:3001/api/pomodoro?action=active_sessions"
```

**Get Session Details:**
```bash
curl "http://localhost:3001/api/pomodoro?action=session_details&sessionId=session_123"
```

**Get Statistics:**
```bash
curl "http://localhost:3001/api/pomodoro?action=statistics"
```

### 2. POST - Create New Pomodoro Session

#### Endpoint
```
POST /api/pomodoro
```

#### Request Body
```json
{
  "type": "focus",
  "duration": 25,
  "taskId": "task_123",
  "taskText": "Complete project proposal",
  "autoStart": false
}
```

#### Required Fields
- `type`: Session type - "focus", "break", or "long-break"
- `duration`: Duration in minutes

#### Optional Fields
- `taskId`: ID of the associated task
- `taskText`: Text description of the task
- `autoStart`: Whether to start the session immediately (default: false)

#### Session Types
- `focus` - Main work session
- `break` - Short break between focus sessions
- `long-break` - Extended break after multiple focus sessions

#### Example
```bash
curl -X POST "http://localhost:3001/api/pomodoro" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "focus",
    "duration": 25,
    "taskText": "Review code changes",
    "autoStart": true
  }'
```

### 3. PUT - Update Pomodoro Session

#### Endpoint
```
PUT /api/pomodoro
```

#### Request Body
```json
{
  "sessionId": "session_123",
  "updates": {
    "status": "completed",
    "endTime": "2025-01-03T12:30:00.000Z"
  }
}
```

#### Required Fields
- `sessionId`: ID of the session to update
- `updates`: Object containing fields to update

#### Updatable Fields
- `status`: "pending", "active", "completed", "paused"
- `startTime`: ISO timestamp when session started
- `endTime`: ISO timestamp when session ended
- `duration`: Session duration in minutes

#### Example
```bash
curl -X PUT "http://localhost:3001/api/pomodoro" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session_123",
    "updates": {
      "status": "completed"
    }
  }'
```

### 4. DELETE - Remove Pomodoro Session

#### Endpoint
```
DELETE /api/pomodoro?sessionId=session_123
```

#### Query Parameters
- `sessionId`: ID of the session to delete

#### Example
```bash
curl -X DELETE "http://localhost:3001/api/pomodoro?sessionId=session_123"
```

## System Context for AI

### Session Types
- `focus` - Main work sessions (typically 15-45 minutes)
- `break` - Short breaks (typically 3-10 minutes)
- `long-break` - Extended breaks (typically 15-30 minutes)

### Session Statuses
- `pending` - Session created but not started
- `active` - Session currently running
- `completed` - Session finished successfully
- `paused` - Session temporarily paused

### Task Integration
- Tasks can be associated with focus sessions
- Task progress is automatically updated when sessions complete
- Multiple sessions can be needed to complete a task

## AI Usage Examples

### 1. Understanding User's Pomodoro System
```bash
# Get overview of all sessions and tasks
curl "http://localhost:3001/api/pomodoro"

# Get current active sessions
curl "http://localhost:3001/api/pomodoro?action=active_sessions"

# Get system statistics
curl "http://localhost:3001/api/pomodoro?action=statistics"
```

### 2. Creating Focus Sessions
```bash
# Create a 25-minute focus session
curl -X POST "http://localhost:3001/api/pomodoro" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "focus",
    "duration": 25,
    "taskText": "Write documentation",
    "autoStart": false
  }'

# Create a 15-minute ADHD-friendly session
curl -X POST "http://localhost:3001/api/pomodoro" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "focus",
    "duration": 15,
    "taskText": "Quick code review",
    "autoStart": true
  }'
```

### 3. Managing Session Lifecycle
```bash
# Start a session
curl -X PUT "http://localhost:3001/api/pomodoro" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session_123",
    "updates": {
      "status": "active",
      "startTime": "2025-01-03T12:00:00.000Z"
    }
  }'

# Complete a session
curl -X PUT "http://localhost:3001/api/pomodoro" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session_123",
    "updates": {
      "status": "completed",
      "endTime": "2025-01-03T12:25:00.000Z"
    }
  }'
```

### 4. Creating Break Sessions
```bash
# Create a 5-minute break
curl -X POST "http://localhost:3001/api/pomodoro" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "break",
    "duration": 5,
    "autoStart": true
  }'

# Create a 15-minute long break
curl -X POST "http://localhost:3001/api/pomodoro" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "long-break",
    "duration": 15,
    "autoStart": false
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

1. **Always check system status first** - Use GET without parameters to understand current state
2. **Follow Pomodoro principles** - Create focus sessions followed by appropriate breaks
3. **Consider user preferences** - Adjust session lengths based on user's attention span
4. **Track task progress** - Associate focus sessions with specific tasks when possible
5. **Monitor session completion** - Update session status to track progress
6. **Provide session variety** - Mix different session types for optimal productivity

## Session Management Best Practices

1. **Focus Sessions**: 15-45 minutes (25 minutes is classic)
2. **Short Breaks**: 3-10 minutes between focus sessions
3. **Long Breaks**: 15-30 minutes after 4 focus sessions
4. **Task Association**: Link focus sessions to specific tasks
5. **Progress Tracking**: Update session status as they progress
6. **Statistics**: Monitor total focus time and completion rates

## Security Notes

- This API is designed for AI assistants to manage Pomodoro sessions
- All operations are performed on in-memory storage for demo purposes
- In production, implement proper authentication and database storage
- Session IDs are generated using timestamps for uniqueness
