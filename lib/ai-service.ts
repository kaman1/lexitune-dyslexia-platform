import { z } from 'zod';

// Schema for optimized todo items
export const OptimizedTodoSchema = z.object({
  text: z.string(),
  description: z.string().optional(),
  priority: z.enum(['urgent', 'high', 'medium', 'low']),
  estimatedTime: z.number().describe('Time in minutes'),
  category: z.enum(['work', 'personal', 'learning', 'health', 'creative']),
  energyLevel: z.enum(['low', 'medium', 'high']),
  complexity: z.enum(['simple', 'moderate', 'complex']),
  dueDate: z.string().optional(),
  tags: z.array(z.string()),
  isCompleted: z.boolean(),
  isRunning: z.boolean(),
  remainingTime: z.number().describe('Time in seconds'),
  customBreak: z.object({
    type: z.enum(['short', 'long', 'custom']),
    duration: z.number().describe('Break duration in minutes'),
    activity: z.string().describe('Suggested break activity'),
    description: z.string().describe('Break description')
  }).optional()
});

export type OptimizedTodo = z.infer<typeof OptimizedTodoSchema>;

// Schema for AI optimization request
export const OptimizationRequestSchema = z.object({
  todos: z.array(z.object({
    text: z.string(),
    description: z.string().optional(),
    priority: z.enum(['urgent', 'high', 'medium', 'low']),
    estimatedTime: z.number(),
    category: z.enum(['work', 'personal', 'learning', 'health', 'creative']),
    dueDate: z.string().optional(),
    tags: z.array(z.string())
  })),
  dateRanges: z.array(z.enum(['today', 'week', 'month'])),
  selectedCategories: z.array(z.enum(['work', 'personal', 'learning', 'health', 'creative'])),
  additionalContext: z.string().optional(),
  userEnergyLevel: z.enum(['low', 'medium', 'high']).optional(),
  preferredSessionLength: z.number().optional().describe('Preferred Pomodoro session length in minutes')
});

export type OptimizationRequest = z.infer<typeof OptimizationRequestSchema>;

// AI optimization function
export async function optimizeTodosWithAI(request: OptimizationRequest): Promise<OptimizedTodo[]> {
  try {
    console.log('🤖 AI Service: Starting optimization for', request.todos.length, 'todos');
    
    // For now, use fallback optimization until we fix the AI SDK integration
    console.log('🔄 Using fallback optimization (AI SDK needs update)');
    
    const fallbackTodos = request.todos.map(todo => ({
      ...todo,
      energyLevel: 'medium' as const,
      complexity: 'moderate' as const,
      isCompleted: false,
      isRunning: false,
      remainingTime: (todo.estimatedTime || 25) * 60,
      customBreak: {
        type: 'short' as const,
        duration: 5,
        activity: 'Quick stretch',
        description: 'Take a short break to refresh'
      }
    }));
    
    console.log('✅ Fallback optimization completed:', fallbackTodos);
    return fallbackTodos;
    
    // TODO: Fix AI SDK integration - using fallback for now

  } catch (error) {
    console.error('AI optimization error:', error);
    
    // Fallback optimization
    return request.todos.map(todo => ({
      ...todo,
      energyLevel: 'medium' as const,
      complexity: 'moderate' as const,
      isCompleted: false,
      isRunning: false,
      remainingTime: (todo.estimatedTime || 25) * 60,
      customBreak: {
        type: 'short' as const,
        duration: 5,
        activity: 'Quick stretch',
        description: 'Take a short break to refresh'
      }
    }));
  }
}

// Helper function to create custom breaks
export function createCustomBreak(todo: OptimizedTodo) {
  const breakTypes = {
    work: {
      short: { activity: 'Eye rest', description: 'Look away from screen for 20 seconds' },
      long: { activity: 'Walk break', description: 'Take a 15-minute walk outside' }
    },
    personal: {
      short: { activity: 'Deep breathing', description: 'Take 5 deep breaths' },
      long: { activity: 'Tea break', description: 'Enjoy a relaxing cup of tea' }
    },
    learning: {
      short: { activity: 'Memory review', description: 'Quickly review what you learned' },
      long: { activity: 'Note organization', description: 'Organize your notes and thoughts' }
    },
    health: {
      short: { activity: 'Stretching', description: 'Do some gentle stretches' },
      long: { activity: 'Exercise break', description: 'Do a quick workout session' }
    },
    creative: {
      short: { activity: 'Inspiration break', description: 'Look at something inspiring' },
      long: { activity: 'Creative journaling', description: 'Write or sketch your ideas' }
    }
  };

  const category = todo.category;
  const breakType = todo.complexity === 'complex' || todo.priority === 'urgent' ? 'long' : 'short';
  
  const breakInfo = breakTypes[category]?.[breakType] || breakTypes.work.short;
  
  return {
    type: breakType as 'short' | 'long',
    duration: breakType === 'short' ? 5 : 15,
    activity: breakInfo.activity,
    description: breakInfo.description
  };
}
