# AI Todo Management API

This API endpoint provides comprehensive todo management capabilities for AI assistants. The AI can use this as a tool to understand, query, and modify the user's todo system.

## Base URL
```
http://localhost:3001/api/ai-todo
```

## Available Operations

### 1. GET - Retrieve Todo System Information

#### Endpoint
```
GET /api/ai-todo
```

#### Query Parameters
- `action` (optional): Specific action to perform
  - `categories` - Get all categories and lists
  - `todos_by_category` - Get todos by category (requires `category` param)
  - `list_details` - Get specific list details (requires `listId` param)
  - `todos_by_date` - Get todos by date (optional `date` param)
  - `overview` (default) - Get system overview

#### Examples

**Get System Overview:**
```bash
curl "http://localhost:3001/api/ai-todo"
```

**Get All Categories:**
```bash
curl "http://localhost:3001/api/ai-todo?action=categories"
```

**Get Todos by Category:**
```bash
curl "http://localhost:3001/api/ai-todo?action=todos_by_category&category=work"
```

**Get List Details:**
```bash
curl "http://localhost:3001/api/ai-todo?action=list_details&listId=work"
```

**Get Todos by Date:**
```bash
curl "http://localhost:3001/api/ai-todo?action=todos_by_date&date=2025-01-03"
```

### 2. POST - Add New Todo

#### Endpoint
```
POST /api/ai-todo
```

#### Request Body
```json
{
  "listId": "work",
  "text": "Complete project proposal",
  "description": "Write and submit the Q4 project proposal",
  "category": "work",
  "priority": "high",
  "estimatedTime": 120,
  "dueDate": "2025-01-10",
  "tags": ["project", "proposal", "Q4"],
  "energyLevel": "high",
  "complexity": "moderate"
}
```

#### Required Fields
- `listId`: ID of the list to add the todo to
- `text`: The todo text/title

#### Optional Fields
- `description`: Detailed description
- `category`: Category (work, personal, learning, health, creative)
- `priority`: Priority level (low, medium, high, urgent)
- `estimatedTime`: Estimated time in minutes
- `dueDate`: Due date in YYYY-MM-DD format
- `tags`: Array of tags
- `energyLevel`: Energy level required (low, medium, high)
- `complexity`: Task complexity (simple, moderate, complex)

#### Example
```bash
curl -X POST "http://localhost:3001/api/ai-todo" \
  -H "Content-Type: application/json" \
  -d '{
    "listId": "work",
    "text": "Review code changes",
    "priority": "medium",
    "estimatedTime": 45,
    "dueDate": "2025-01-05"
  }'
```

### 3. PUT - Update Existing Todo

#### Endpoint
```
PUT /api/ai-todo
```

#### Request Body
```json
{
  "listId": "work",
  "todoId": "todo_123",
  "updates": {
    "priority": "urgent",
    "status": "in-progress",
    "estimatedTime": 60
  }
}
```

#### Example
```bash
curl -X PUT "http://localhost:3001/api/ai-todo" \
  -H "Content-Type: application/json" \
  -d '{
    "listId": "work",
    "todoId": "todo_123",
    "updates": {
      "status": "completed"
    }
  }'
```

### 4. DELETE - Remove Todo

#### Endpoint
```
DELETE /api/ai-todo?listId=work&todoId=todo_123
```

#### Query Parameters
- `listId`: ID of the list containing the todo
- `todoId`: ID of the todo to delete

#### Example
```bash
curl -X DELETE "http://localhost:3001/api/ai-todo?listId=work&todoId=todo_123"
```

## System Context for AI

### Available Categories
- `work` - Work-related tasks
- `personal` - Personal projects and tasks
- `learning` - Learning and study tasks
- `health` - Health and wellness tasks
- `creative` - Creative projects

### Priority Levels
- `low` - Low priority tasks
- `medium` - Medium priority tasks
- `high` - High priority tasks
- `urgent` - Urgent tasks requiring immediate attention

### Status Values
- `pending` - Task not started
- `in-progress` - Task currently being worked on
- `completed` - Task finished

### Energy Levels
- `low` - Tasks requiring minimal energy
- `medium` - Tasks requiring moderate energy
- `high` - Tasks requiring high energy

### Complexity Levels
- `simple` - Simple, straightforward tasks
- `moderate` - Moderately complex tasks
- `complex` - Complex, multi-step tasks

## AI Usage Examples

### 1. Understanding User's Todo System
```bash
# Get overview of all lists and todos
curl "http://localhost:3001/api/ai-todo"

# Get specific category information
curl "http://localhost:3001/api/ai-todo?action=categories"
```

### 2. Adding Tasks Based on User Requests
```bash
# Add a work task
curl -X POST "http://localhost:3001/api/ai-todo" \
  -H "Content-Type: application/json" \
  -d '{
    "listId": "work",
    "text": "Prepare presentation slides",
    "priority": "high",
    "estimatedTime": 90,
    "dueDate": "2025-01-08"
  }'

# Add a personal task
curl -X POST "http://localhost:3001/api/ai-todo" \
  -H "Content-Type: application/json" \
  -d '{
    "listId": "personal",
    "text": "Book dentist appointment",
    "priority": "medium",
    "estimatedTime": 15
  }'
```

### 3. Updating Task Status
```bash
# Mark task as in-progress
curl -X PUT "http://localhost:3001/api/ai-todo" \
  -H "Content-Type: application/json" \
  -d '{
    "listId": "work",
    "todoId": "todo_123",
    "updates": {
      "status": "in-progress"
    }
  }'
```

### 4. Managing Task Priorities
```bash
# Update task priority
curl -X PUT "http://localhost:3001/api/ai-todo" \
  -H "Content-Type: application/json" \
  -d '{
    "listId": "work",
    "todoId": "todo_123",
    "updates": {
      "priority": "urgent"
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

1. **Always check system info first** - Use GET without parameters to understand the current state
2. **Validate before adding** - Check if the list exists before adding todos
3. **Use appropriate priorities** - Match priority to user's urgency level
4. **Consider energy levels** - Align task complexity with user's energy state
5. **Provide meaningful descriptions** - Help users understand what needs to be done
6. **Set realistic time estimates** - Help with planning and scheduling

## Security Notes

- This API is designed for AI assistants to manage user todos
- All operations are performed on the client-side todo store
- No external authentication required for local development
- In production, implement proper authentication and authorization
