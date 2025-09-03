import { NextRequest, NextResponse } from 'next/server';

/**
 * Pomodoro Management API
 * 
 * This endpoint provides comprehensive Pomodoro session management capabilities for AI assistants.
 * The AI can use this as a tool to understand, create, and manage Pomodoro sessions.
 * 
 * Available Operations:
 * - GET: Retrieve Pomodoro system information and active sessions
 * - POST: Create new Pomodoro sessions
 * - PUT: Update Pomodoro sessions
 * - DELETE: Remove Pomodoro sessions
 * 
 * AI Context:
 * - Session Types: Focus, Break, Long Break
 * - Task Integration: Todo items with time estimates
 * - Preferences: User-specific timing and behavior settings
 * - Progress Tracking: Session completion and statistics
 */

interface PomodoroSession {
  id: string;
  type: 'focus' | 'break' | 'long-break';
  duration: number; // in minutes
  status: 'pending' | 'active' | 'completed' | 'paused';
  taskId?: string;
  taskText?: string;
  startTime?: string;
  endTime?: string;
  createdAt: string;
  updatedAt: string;
}

interface PomodoroTask {
  id: string;
  text: string;
  description?: string;
  estimatedTime: number; // in minutes
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed';
  pomodoroSessions: number; // number of sessions needed
  completedSessions: number;
  createdAt: string;
  updatedAt: string;
}

// In-memory storage for demo purposes
// In production, use a proper database
let pomodoroSessions: PomodoroSession[] = [];
let pomodoroTasks: PomodoroTask[] = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const sessionId = searchParams.get('sessionId');
    const taskId = searchParams.get('taskId');

    let response: any = {
      success: true,
      message: 'Pomodoro system information retrieved successfully',
      timestamp: new Date().toISOString(),
      system_info: {
        total_sessions: pomodoroSessions.length,
        total_tasks: pomodoroTasks.length,
        active_sessions: pomodoroSessions.filter(s => s.status === 'active').length,
        completed_sessions: pomodoroSessions.filter(s => s.status === 'completed').length,
        session_types: ['focus', 'break', 'long-break'],
        session_statuses: ['pending', 'active', 'completed', 'paused']
      }
    };

    // Handle different query actions
    switch (action) {
      case 'sessions':
        response.data = {
          sessions: pomodoroSessions.map(session => ({
            ...session,
            duration_formatted: `${session.duration} minutes`,
            status_display: session.status.charAt(0).toUpperCase() + session.status.slice(1)
          }))
        };
        break;

      case 'active_sessions':
        response.data = {
          active_sessions: pomodoroSessions.filter(s => s.status === 'active')
        };
        break;

      case 'tasks':
        response.data = {
          tasks: pomodoroTasks.map(task => ({
            ...task,
            progress_percentage: task.pomodoroSessions > 0 ? 
              Math.round((task.completedSessions / task.pomodoroSessions) * 100) : 0,
            remaining_sessions: task.pomodoroSessions - task.completedSessions
          }))
        };
        break;

      case 'session_details':
        if (!sessionId) {
          return NextResponse.json(
            { error: 'SessionId parameter required for session_details action' },
            { status: 400 }
          );
        }
        const session = pomodoroSessions.find(s => s.id === sessionId);
        if (!session) {
          return NextResponse.json(
            { error: 'Session not found' },
            { status: 404 }
          );
        }
        response.data = { session };
        break;

      case 'task_details':
        if (!taskId) {
          return NextResponse.json(
            { error: 'TaskId parameter required for task_details action' },
            { status: 400 }
          );
        }
        const task = pomodoroTasks.find(t => t.id === taskId);
        if (!task) {
          return NextResponse.json(
            { error: 'Task not found' },
            { status: 404 }
          );
        }
        response.data = { task };
        break;

      case 'statistics':
        const totalFocusTime = pomodoroSessions
          .filter(s => s.type === 'focus' && s.status === 'completed')
          .reduce((acc, s) => acc + s.duration, 0);
        
        const totalBreakTime = pomodoroSessions
          .filter(s => s.type === 'break' && s.status === 'completed')
          .reduce((acc, s) => acc + s.duration, 0);

        response.data = {
          statistics: {
            total_focus_time_minutes: totalFocusTime,
            total_focus_time_hours: Math.round(totalFocusTime / 60 * 100) / 100,
            total_break_time_minutes: totalBreakTime,
            total_sessions_completed: pomodoroSessions.filter(s => s.status === 'completed').length,
            focus_sessions_completed: pomodoroSessions.filter(s => s.type === 'focus' && s.status === 'completed').length,
            break_sessions_completed: pomodoroSessions.filter(s => s.type === 'break' && s.status === 'completed').length,
            tasks_in_progress: pomodoroTasks.filter(t => t.status === 'in-progress').length,
            tasks_completed: pomodoroTasks.filter(t => t.status === 'completed').length
          }
        };
        break;

      case 'overview':
      default:
        response.data = {
          current_status: {
            active_sessions: pomodoroSessions.filter(s => s.status === 'active'),
            pending_sessions: pomodoroSessions.filter(s => s.status === 'pending'),
            recent_completed: pomodoroSessions
              .filter(s => s.status === 'completed')
              .sort((a, b) => new Date(b.endTime || '').getTime() - new Date(a.endTime || '').getTime())
              .slice(0, 5)
          },
          tasks_summary: {
            in_progress: pomodoroTasks.filter(t => t.status === 'in-progress'),
            pending: pomodoroTasks.filter(t => t.status === 'pending'),
            completed: pomodoroTasks.filter(t => t.status === 'completed')
          }
        };
        break;
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Pomodoro API GET error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to retrieve Pomodoro information', 
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
      type, 
      duration, 
      taskId, 
      taskText, 
      autoStart = false,
      addFromTodoStore = false // New parameter to add tasks from todo store
    } = body;

    // Validation
    if (!type || !duration) {
      return NextResponse.json(
        { error: 'Type and duration are required' },
        { status: 400 }
      );
    }

    if (!['focus', 'break', 'long-break'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid session type. Must be focus, break, or long-break' },
        { status: 400 }
      );
    }

    // Create new session
    const newSession: PomodoroSession = {
      id: `session_${Date.now()}`,
      type,
      duration,
      status: autoStart ? 'active' : 'pending',
      taskId,
      taskText,
      startTime: autoStart ? new Date().toISOString() : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to sessions
    pomodoroSessions.push(newSession);

    // If this is a focus session with a task, update task status
    if (type === 'focus' && taskId) {
      const task = pomodoroTasks.find(t => t.id === taskId);
      if (task) {
        task.status = 'in-progress';
        task.updatedAt = new Date().toISOString();
      }
    }
    
    // If requested, add tasks from the todo store
    if (addFromTodoStore && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('todo-store');
        if (stored) {
          const todoStore = JSON.parse(stored);
          const pendingTodos = todoStore.lists.flatMap((list: any) => 
            list.items.filter((todo: any) => todo.status === 'pending')
          );
          
          // Convert todos to Pomodoro tasks
          const newPomodoroTasks = pendingTodos.map((todo: any) => ({
            id: `pomodoro_${todo.id}`,
            text: todo.text,
            description: todo.description,
            estimatedTime: todo.estimatedTime || 25,
            category: todo.category,
            priority: todo.priority,
            status: 'pending',
            pomodoroSessions: Math.ceil(todo.estimatedTime / 25), // Calculate sessions needed
            completedSessions: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }));
          
          pomodoroTasks.push(...newPomodoroTasks);
        }
      } catch (error) {
        console.error('Failed to add tasks from todo store:', error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Pomodoro session created successfully',
      data: {
        session: newSession,
        session_count: pomodoroSessions.length
      }
    });

  } catch (error) {
    console.error('Pomodoro API POST error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create Pomodoro session', 
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
    const { sessionId, updates } = body;

    if (!sessionId || !updates) {
      return NextResponse.json(
        { error: 'SessionId and updates are required' },
        { status: 400 }
      );
    }

    const sessionIndex = pomodoroSessions.findIndex(s => s.id === sessionId);
    if (sessionIndex === -1) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Update session
    pomodoroSessions[sessionIndex] = {
      ...pomodoroSessions[sessionIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    const updatedSession = pomodoroSessions[sessionIndex];

    // Handle session completion
    if (updates.status === 'completed' && !updatedSession.endTime) {
      updatedSession.endTime = new Date().toISOString();
      
      // If this was a focus session, update task progress
      if (updatedSession.type === 'focus' && updatedSession.taskId) {
        const task = pomodoroTasks.find(t => t.id === updatedSession.taskId);
        if (task) {
          task.completedSessions += 1;
          if (task.completedSessions >= task.pomodoroSessions) {
            task.status = 'completed';
          }
          task.updatedAt = new Date().toISOString();
        }
        
        // Also update the main todo store if the task exists there
        if (typeof window !== 'undefined') {
          try {
            const stored = localStorage.getItem('todo-store');
            if (stored) {
              const todoStore = JSON.parse(stored);
              const updatedLists = todoStore.lists.map((list: any) => ({
                ...list,
                items: list.items.map((todo: any) => {
                  if (todo.id === updatedSession.taskId) {
                    if (task?.status === 'completed') {
                      return { ...todo, status: 'completed', updatedAt: new Date().toISOString() };
                    } else {
                      return { ...todo, status: 'in-progress', updatedAt: new Date().toISOString() };
                    }
                  }
                  return todo;
                })
              }));
              
              const updatedStore = {
                ...todoStore,
                lists: updatedLists
              };
              localStorage.setItem('todo-store', JSON.stringify(updatedStore));
            }
          } catch (error) {
            console.error('Failed to update todo store:', error);
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Pomodoro session updated successfully',
      data: { session: updatedSession }
    });

  } catch (error) {
    console.error('Pomodoro API PUT error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update Pomodoro session', 
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
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'SessionId is required' },
        { status: 400 }
      );
    }

    const sessionIndex = pomodoroSessions.findIndex(s => s.id === sessionId);
    if (sessionIndex === -1) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    const deletedSession = pomodoroSessions[sessionIndex];
    pomodoroSessions.splice(sessionIndex, 1);

    return NextResponse.json({
      success: true,
      message: 'Pomodoro session deleted successfully',
      data: {
        deleted_session_id: sessionId,
        total_sessions: pomodoroSessions.length
      }
    });

  } catch (error) {
    console.error('Pomodoro API DELETE error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete Pomodoro session', 
        details: error instanceof Error ? error.message : 'Unknown error',
        success: false
      },
      { status: 500 }
    );
  }
}

// New endpoint to sync Pomodoro with todo store
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, taskId, sessionId } = body;

    switch (action) {
      case 'sync_todos':
        // Sync pending todos from the todo store to Pomodoro
        if (typeof window !== 'undefined') {
          try {
            const stored = localStorage.getItem('todo-store');
            if (stored) {
              const todoStore = JSON.parse(stored);
              const pendingTodos = todoStore.lists.flatMap((list: any) => 
                list.items.filter((todo: any) => todo.status === 'pending')
              );
              
              // Convert todos to Pomodoro tasks
              const newPomodoroTasks = pendingTodos.map((todo: any) => ({
                id: `pomodoro_${todo.id}`,
                text: todo.text,
                description: todo.description,
                estimatedTime: todo.estimatedTime || 25,
                category: todo.category,
                priority: todo.priority,
                status: 'pending',
                pomodoroSessions: Math.ceil(todo.estimatedTime / 25),
                completedSessions: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              }));
              
              // Remove existing Pomodoro tasks and add new ones
              pomodoroTasks = newPomodoroTasks;
              
              return NextResponse.json({
                success: true,
                message: 'Pomodoro tasks synced with todo store',
                data: {
                  tasks_added: newPomodoroTasks.length,
                  total_pomodoro_tasks: pomodoroTasks.length
                }
              });
            }
          } catch (error) {
            console.error('Failed to sync with todo store:', error);
            return NextResponse.json(
              { error: 'Failed to sync with todo store' },
              { status: 500 }
            );
          }
        }
        break;

      case 'update_todo_status':
        // Update todo status when Pomodoro session completes
        if (taskId && typeof window !== 'undefined') {
          try {
            const stored = localStorage.getItem('todo-store');
            if (stored) {
              const todoStore = JSON.parse(stored);
              const pomodoroTask = pomodoroTasks.find(t => t.id === taskId);
              
              if (pomodoroTask) {
                const updatedLists = todoStore.lists.map((list: any) => ({
                  ...list,
                  items: list.items.map((todo: any) => {
                    if (todo.id === taskId.replace('pomodoro_', '')) {
                      if (pomodoroTask.status === 'completed') {
                        return { ...todo, status: 'completed', updatedAt: new Date().toISOString() };
                      } else if (pomodoroTask.status === 'in-progress') {
                        return { ...todo, status: 'in-progress', updatedAt: new Date().toISOString() };
                      }
                    }
                    return todo;
                  })
                }));
                
                const updatedStore = {
                  ...todoStore,
                  lists: updatedLists
                };
                localStorage.setItem('todo-store', JSON.stringify(updatedStore));
                
                return NextResponse.json({
                  success: true,
                  message: 'Todo status updated',
                  data: { task_id: taskId, status: pomodoroTask.status }
                });
              }
            }
          } catch (error) {
            console.error('Failed to update todo status:', error);
            return NextResponse.json(
              { error: 'Failed to update todo status' },
              { status: 500 }
            );
          }
        }
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json(
      { error: 'Action not implemented' },
      { status: 501 }
    );

  } catch (error) {
    console.error('Pomodoro API PATCH error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process request', 
        details: error instanceof Error ? error.message : 'Unknown error',
        success: false
      },
      { status: 500 }
    );
  }
}
