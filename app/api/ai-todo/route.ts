import { NextRequest, NextResponse } from 'next/server';

/**
 * AI Todo Management API
 * 
 * This endpoint provides comprehensive todo management capabilities for AI assistants.
 * The AI can use this as a tool to understand, query, and modify the user's todo system.
 * 
 * Available Operations:
 * - GET: Retrieve todo system information and context
 * - POST: Add new todos to specified lists
 * - PUT: Update existing todos
 * - DELETE: Remove todos
 * 
 * AI Context:
 * - Categories: work, personal, learning, health, creative
 * - Priorities: low, medium, high, urgent
 * - Status: pending, in-progress, completed
 * - Energy Levels: low, medium, high
 * - Complexity: simple, moderate, complex
 */

// Interface definitions matching the todo store
interface TodoItem {
  id: string;
  text: string;
  description?: string;
  category: 'work' | 'personal' | 'learning' | 'health' | 'creative';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed';
  estimatedTime: number; // in minutes
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  energyLevel?: 'low' | 'medium' | 'high';
  complexity?: 'simple' | 'moderate' | 'complex';
}

interface TodoList {
  id: string;
  name: string;
  category: 'work' | 'personal' | 'learning' | 'health' | 'creative';
  items: TodoItem[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

interface TodoStore {
  lists: TodoList[];
  activeListId: string | null;
  currentDate: string;
}

/**
 * AI Todo Management API
 * 
 * This endpoint provides comprehensive todo management capabilities for AI assistants.
 * The AI can use this as a tool to understand, query, and modify the user's todo system.
 * 
 * Available Operations:
 * - GET: Retrieve todo system information and context
 * - POST: Add new todos to specified lists
 * - PUT: Update existing todos
 * - DELETE: Remove todos
 * 
 * AI Context:
 * - Categories: work, personal, learning, health, creative
 * - Priorities: low, medium, high, urgent
 * - Status: pending, in-progress, completed
 * - Energy Levels: low, medium, high
 * - Complexity: simple, moderate, complex
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const category = searchParams.get('category');
    const listId = searchParams.get('listId');

    // Get todo store data from localStorage
    let todoStore: TodoStore | null = null;
    let lists: TodoList[] = [];
    
    // Try to get from localStorage (client-side)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('todo-store');
      if (stored) {
        try {
          todoStore = JSON.parse(stored);
          lists = todoStore?.lists || [];
        } catch (error) {
          console.error('Failed to parse todo store:', error);
        }
      }
    }
    
    // Fallback to default lists if none found
    if (lists.length === 0) {
      lists = [
        {
          id: 'work',
          name: 'Work Tasks',
          category: 'work',
          items: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
        {
          id: 'personal',
          name: 'Personal Projects',
          category: 'personal',
          items: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
        {
          id: 'learning',
          name: 'Learning & Study',
          category: 'learning',
          items: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
        {
          id: 'health',
          name: 'Health & Wellness',
          category: 'health',
          items: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
        {
          id: 'creative',
          name: 'Creative Projects',
          category: 'creative',
          items: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
      ];
    }
    
    // Helper functions
    const getTodosByCategory = (category: string): TodoItem[] => {
      return lists.flatMap(list => 
        list.category === category ? list.items : []
      );
    };
    
    const getTodosByDate = (date: string): TodoItem[] => {
      return lists.flatMap(list =>
        list.items.filter(todo => todo.dueDate === date)
      );
    };

    let response: any = {
      success: true,
      message: 'Todo system information retrieved successfully',
      timestamp: new Date().toISOString(),
      system_info: {
        total_lists: lists.length,
        total_todos: lists.reduce((acc, list) => acc + list.items.length, 0),
        available_categories: ['work', 'personal', 'learning', 'health', 'creative'],
        available_priorities: ['low', 'medium', 'high', 'urgent'],
        available_statuses: ['pending', 'in-progress', 'completed'],
        available_energy_levels: ['low', 'medium', 'high'],
        available_complexity_levels: ['simple', 'moderate', 'complex']
      }
    };

    // Handle different query actions
    switch (action) {
      case 'categories':
        response.data = {
          categories: lists.map(list => ({
            id: list.id,
            name: list.name,
            category: list.category,
            todo_count: list.items.length,
            is_active: list.isActive
          }))
        };
        break;

      case 'todos_by_category':
        if (!category) {
          return NextResponse.json(
            { error: 'Category parameter required for todos_by_category action' },
            { status: 400 }
          );
        }
        response.data = {
          category,
          todos: getTodosByCategory(category as any)
        };
        break;

      case 'list_details':
        if (!listId) {
          return NextResponse.json(
            { error: 'ListId parameter required for list_details action' },
            { status: 400 }
          );
        }
        const list = lists.find(l => l.id === listId);
        if (!list) {
          return NextResponse.json(
            { error: 'List not found' },
            { status: 404 }
          );
        }
        response.data = { list };
        break;

      case 'todos_by_date':
        const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
        response.data = {
          date,
          todos: getTodosByDate(date)
        };
        break;

      case 'overview':
      default:
        response.data = {
          lists: lists.map(list => ({
            id: list.id,
            name: list.name,
            category: list.category,
            todo_count: list.items.length,
            is_active: list.isActive,
            recent_todos: list.items.slice(-3).map(todo => ({
              id: todo.id,
              text: todo.text,
              priority: todo.priority,
              status: todo.status,
              due_date: todo.dueDate
            }))
          })),
          summary: {
            pending_todos: lists.flatMap(list => 
              list.items.filter(todo => todo.status === 'pending')
            ).length,
            urgent_todos: lists.flatMap(list => 
              list.items.filter(todo => todo.priority === 'urgent')
            ).length,
            overdue_todos: lists.flatMap(list => 
              list.items.filter(todo => 
                todo.dueDate && new Date(todo.dueDate) < new Date() && todo.status !== 'completed'
              )
            ).length
          }
        };
        break;
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('AI Todo API GET error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to retrieve todo information', 
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
      listId, 
      text, 
      description, 
      category, 
      priority, 
      estimatedTime, 
      dueDate, 
      tags, 
      energyLevel, 
      complexity 
    } = body;

    // Validation
    if (!listId || !text) {
      return NextResponse.json(
        { error: 'ListId and text are required' },
        { status: 400 }
      );
    }

    // Get todo store data from localStorage
    let todoStore: TodoStore | null = null;
    let lists: TodoList[] = [];
    
    // Try to get from localStorage (client-side)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('todo-store');
      if (stored) {
        try {
          todoStore = JSON.parse(stored);
          lists = todoStore?.lists || [];
        } catch (error) {
          console.error('Failed to parse todo store:', error);
        }
      }
    }
    
    // Fallback to default lists if none found
    if (lists.length === 0) {
      lists = [
        {
          id: 'work',
          name: 'Work Tasks',
          category: 'work',
          items: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
        {
          id: 'personal',
          name: 'Personal Projects',
          category: 'personal',
          items: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
        {
          id: 'learning',
          name: 'Learning & Study',
          category: 'learning',
          items: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
        {
          id: 'health',
          name: 'Health & Wellness',
          category: 'health',
          items: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
        {
          id: 'creative',
          name: 'Creative Projects',
          category: 'creative',
          items: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
      ];
    }
    
    // Helper functions
    const addTodo = (listId: string, todo: Omit<TodoItem, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newTodo: TodoItem = {
        ...todo,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updatedLists = lists.map(list =>
        list.id === listId
          ? {
              ...list,
              items: [...list.items, newTodo],
              updatedAt: new Date().toISOString(),
            }
          : list
      );

      // Update localStorage
      if (typeof window !== 'undefined') {
        const updatedStore: TodoStore = {
          lists: updatedLists,
          activeListId: todoStore?.activeListId || 'work',
          currentDate: new Date().toISOString().split('T')[0]
        };
        localStorage.setItem('todo-store', JSON.stringify(updatedStore));
      }

      return updatedLists;
    };
    
    const getListById = (id: string) => {
      return lists.find(list => list.id === id);
    };

    // Find the list
    const list = lists.find(l => l.id === listId);
    if (!list) {
      return NextResponse.json(
        { error: 'List not found' },
        { status: 404 }
      );
    }

    // Create new todo
    const newTodo = {
      text,
      description: description || '',
      category: category || list.category,
      priority: priority || 'medium',
      status: 'pending' as const,
      estimatedTime: estimatedTime || 30,
      dueDate: dueDate || undefined,
      tags: tags || [],
      energyLevel: energyLevel || 'medium',
      complexity: complexity || 'simple'
    };

    // Add todo to list
    addTodo(listId, newTodo);

    // Get updated list
    const updatedList = getListById(listId);

    return NextResponse.json({
      success: true,
      message: 'Todo added successfully',
      data: {
        todo: {
          ...newTodo,
          id: updatedList?.items[updatedList.items.length - 1]?.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        list: {
          id: updatedList?.id,
          name: updatedList?.name,
          category: updatedList?.category,
          total_todos: updatedList?.items.length
        }
      }
    });

  } catch (error) {
    console.error('AI Todo API POST error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to add todo', 
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
    const { listId, todoId, updates } = body;

    if (!listId || !todoId || !updates) {
      return NextResponse.json(
        { error: 'ListId, todoId, and updates are required' },
        { status: 400 }
      );
    }

    // Get todo store data from localStorage
    let todoStore: TodoStore | null = null;
    let lists: TodoList[] = [];
    
    // Try to get from localStorage (client-side)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('todo-store');
      if (stored) {
        try {
          todoStore = JSON.parse(stored);
          lists = todoStore?.lists || [];
        } catch (error) {
          console.error('Failed to parse todo store:', error);
        }
      }
    }
    
    // Helper functions
    const updateTodo = (listId: string, todoId: string, updates: Partial<TodoItem>) => {
      const updatedLists = lists.map(list =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map(todo =>
                todo.id === todoId
                  ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
                  : todo
              ),
              updatedAt: new Date().toISOString(),
            }
          : list
      );

      // Update localStorage
      if (typeof window !== 'undefined') {
        const updatedStore: TodoStore = {
          lists: updatedLists,
          activeListId: todoStore?.activeListId || 'work',
          currentDate: new Date().toISOString().split('T')[0]
        };
        localStorage.setItem('todo-store', JSON.stringify(updatedStore));
      }

      return updatedLists;
    };
    
    const getListById = (id: string) => {
      return lists.find(list => list.id === id);
    };

    // Update todo
    updateTodo(listId, todoId, updates);

    // Get updated todo
    const updatedList = getListById(listId);
    const updatedTodo = updatedList?.items.find(todo => todo.id === todoId);

    if (!updatedTodo) {
      return NextResponse.json(
        { error: 'Todo not found after update' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Todo updated successfully',
      data: { todo: updatedTodo }
    });

  } catch (error) {
    console.error('AI Todo API PUT error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update todo', 
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
    const listId = searchParams.get('listId');
    const todoId = searchParams.get('todoId');

    if (!listId || !todoId) {
      return NextResponse.json(
        { error: 'ListId and todoId are required' },
        { status: 400 }
      );
    }

    // Get todo store data from localStorage
    let todoStore: TodoStore | null = null;
    let lists: TodoList[] = [];
    
    // Try to get from localStorage (client-side)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('todo-store');
      if (stored) {
        try {
          todoStore = JSON.parse(stored);
          lists = todoStore?.lists || [];
        } catch (error) {
          console.error('Failed to parse todo store:', error);
        }
      }
    }
    
    // Helper functions
    const deleteTodo = (listId: string, todoId: string) => {
      const updatedLists = lists.map(list =>
        list.id === listId
          ? {
              ...list,
              items: list.items.filter(todo => todo.id !== todoId),
              updatedAt: new Date().toISOString(),
            }
          : list
      );

      // Update localStorage
      if (typeof window !== 'undefined') {
        const updatedStore: TodoStore = {
          lists: updatedLists,
          activeListId: todoStore?.activeListId || 'work',
          currentDate: new Date().toISOString().split('T')[0]
        };
        localStorage.setItem('todo-store', JSON.stringify(updatedStore));
      }

      return updatedLists;
    };
    
    const getListById = (id: string) => {
      return lists.find(list => list.id === id);
    };

    // Delete todo
    deleteTodo(listId, todoId);

    // Get updated list
    const updatedList = getListById(listId);

    return NextResponse.json({
      success: true,
      message: 'Todo deleted successfully',
      data: {
        deleted_todo_id: todoId,
        list: {
          id: updatedList?.id,
          name: updatedList?.name,
          total_todos: updatedList?.items.length
        }
      }
    });

  } catch (error) {
    console.error('AI Todo API DELETE error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete todo', 
        details: error instanceof Error ? error.message : 'Unknown error',
        success: false
      },
      { status: 500 }
    );
  }
}
