import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface TodoItem {
  id: string
  text: string
  description?: string
  category: 'work' | 'personal' | 'learning' | 'health' | 'creative'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in-progress' | 'completed'
  estimatedTime: number // in minutes
  dueDate?: string
  createdAt: string
  updatedAt: string
  tags: string[]
  energyLevel?: 'low' | 'medium' | 'high'
  complexity?: 'simple' | 'moderate' | 'complex'
}

export interface TodoList {
  id: string
  name: string
  category: 'work' | 'personal' | 'learning' | 'health' | 'creative'
  items: TodoItem[]
  createdAt: string
  updatedAt: string
  isActive: boolean
}

interface TodoStore {
  // State
  lists: TodoList[]
  activeListId: string | null
  currentDate: string
  
  // Actions
  createList: (name: string, category: TodoList['category']) => void
  updateList: (id: string, updates: Partial<TodoList>) => void
  deleteList: (id: string) => void
  setActiveList: (id: string) => void
  
  addTodo: (listId: string, todo: Omit<TodoItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTodo: (listId: string, todoId: string, updates: Partial<TodoItem>) => void
  deleteTodo: (listId: string, todoId: string) => void
  moveTodo: (fromListId: string, toListId: string, todoId: string) => void
  
  // AI Optimization
  optimizeTodos: (listId: string, energyLevel: 'low' | 'medium' | 'high') => TodoItem[]
  suggestBreakActivities: (workType: string, energyLevel: string) => string[]
  
  // Utilities
  getListById: (id: string) => TodoList | undefined
  getTodosByDate: (date: string) => TodoItem[]
  getTodosByCategory: (category: TodoList['category']) => TodoItem[]
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      // Initial state
      lists: [
        {
          id: 'work',
          name: 'Work Tasks',
          category: 'work',
          items: [
            {
              id: 'work-1',
              text: 'Review quarterly reports',
              description: 'Analyze Q3 performance metrics and prepare summary',
              category: 'work',
              priority: 'high',
              status: 'pending',
              estimatedTime: 120,
              dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['reports', 'analysis'],
              energyLevel: 'medium',
              complexity: 'moderate'
            },
            {
              id: 'work-2',
              text: 'Team meeting preparation',
              description: 'Prepare agenda and materials for weekly team sync',
              category: 'work',
              priority: 'medium',
              status: 'in-progress',
              estimatedTime: 45,
              dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['meeting', 'preparation'],
              energyLevel: 'low',
              complexity: 'simple'
            }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
        {
          id: 'personal',
          name: 'Personal Projects',
          category: 'personal',
          items: [
            {
              id: 'personal-1',
              text: 'Organize photo library',
              description: 'Sort and categorize photos from the last 6 months',
              category: 'personal',
              priority: 'low',
              status: 'pending',
              estimatedTime: 120,
              dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['organization', 'photos'],
              energyLevel: 'medium',
              complexity: 'simple'
            },
            {
              id: 'personal-2',
              text: 'Plan weekend trip',
              description: 'Research destinations and book accommodations',
              category: 'personal',
              priority: 'medium',
              status: 'in-progress',
              estimatedTime: 60,
              dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['travel', 'planning'],
              energyLevel: 'high',
              complexity: 'moderate'
            }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
        {
          id: 'learning',
          name: 'Learning & Study',
          category: 'learning',
          items: [
            {
              id: 'learning-1',
              text: 'Complete React course module',
              description: 'Finish advanced state management section',
              category: 'learning',
              priority: 'medium',
              status: 'pending',
              estimatedTime: 90,
              dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['react', 'programming'],
              energyLevel: 'high',
              complexity: 'moderate'
            },
            {
              id: 'learning-2',
              text: 'Build Python data visualization project',
              description: 'Create interactive charts using matplotlib and pandas for climate data analysis',
              category: 'learning',
              priority: 'high',
              status: 'pending',
              estimatedTime: 120,
              dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['python', 'data-science', 'visualization'],
              energyLevel: 'high',
              complexity: 'moderate'
            },
            {
              id: 'learning-3',
              text: 'Complete Arduino robotics tutorial',
              description: 'Build and program a simple line-following robot with sensors',
              category: 'learning',
              priority: 'medium',
              status: 'in-progress',
              estimatedTime: 180,
              dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['arduino', 'robotics', 'electronics'],
              energyLevel: 'medium',
              complexity: 'complex'
            },
            {
              id: 'learning-4',
              text: 'Learn 3D modeling with Blender',
              description: 'Complete beginner tutorial on creating 3D objects and basic animations',
              category: 'learning',
              priority: 'low',
              status: 'pending',
              estimatedTime: 150,
              dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['3d-modeling', 'blender', 'design'],
              energyLevel: 'medium',
              complexity: 'moderate'
            },
            {
              id: 'learning-5',
              text: 'Study machine learning fundamentals',
              description: 'Complete Coursera course on supervised learning algorithms',
              category: 'learning',
              priority: 'high',
              status: 'pending',
              estimatedTime: 240,
              dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['machine-learning', 'ai', 'mathematics'],
              energyLevel: 'high',
              complexity: 'complex'
            },
            {
              id: 'learning-6',
              text: 'Build web app with Next.js',
              description: 'Create a portfolio website with modern React features and animations',
              category: 'learning',
              priority: 'medium',
              status: 'pending',
              estimatedTime: 200,
              dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['nextjs', 'web-development', 'portfolio'],
              energyLevel: 'high',
              complexity: 'moderate'
            },
            {
              id: 'learning-7',
              text: 'Learn circuit design basics',
              description: 'Study Ohm\'s law and build simple LED circuits on breadboard',
              category: 'learning',
              priority: 'low',
              status: 'pending',
              estimatedTime: 90,
              dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['electronics', 'circuits', 'physics'],
              energyLevel: 'medium',
              complexity: 'simple'
            },
            {
              id: 'learning-8',
              text: 'Read research paper on ADHD',
              description: 'Review latest findings on cognitive load management',
              category: 'learning',
              priority: 'low',
              status: 'pending',
              estimatedTime: 60,
              dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['research', 'adhd'],
              energyLevel: 'medium',
              complexity: 'complex'
            }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
        {
          id: 'health',
          name: 'Health & Wellness',
          category: 'health',
          items: [
            {
              id: 'health-1',
              text: '30-minute meditation session',
              description: 'Practice mindfulness and breathing exercises',
              category: 'health',
              priority: 'medium',
              status: 'pending',
              estimatedTime: 30,
              dueDate: new Date().toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['meditation', 'wellness'],
              energyLevel: 'low',
              complexity: 'simple'
            },
            {
              id: 'health-2',
              text: 'Schedule doctor appointment',
              description: 'Book annual checkup with primary care physician',
              category: 'health',
              priority: 'low',
              status: 'pending',
              estimatedTime: 15,
              dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['appointment', 'healthcare'],
              energyLevel: 'low',
              complexity: 'simple'
            }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
        {
          id: 'creative',
          name: 'Creative Projects',
          category: 'creative',
          items: [
            {
              id: 'creative-1',
              text: 'Write blog post draft',
              description: 'Outline and write first draft of productivity tips article',
              category: 'creative',
              priority: 'medium',
              status: 'pending',
              estimatedTime: 90,
              dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['writing', 'blog'],
              energyLevel: 'high',
              complexity: 'moderate'
            },
            {
              id: 'creative-2',
              text: 'Design new logo concept',
              description: 'Create initial sketches for client logo redesign',
              category: 'creative',
              priority: 'low',
              status: 'pending',
              estimatedTime: 180,
              dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['design', 'logo'],
              energyLevel: 'high',
              complexity: 'complex'
            },
            {
              id: 'creative-3',
              text: 'Create digital art with code',
              description: 'Generate abstract art using p5.js and mathematical algorithms',
              category: 'creative',
              priority: 'medium',
              status: 'pending',
              estimatedTime: 120,
              dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['generative-art', 'p5js', 'mathematics'],
              energyLevel: 'high',
              complexity: 'moderate'
            },
            {
              id: 'creative-4',
              text: 'Build interactive music visualizer',
              description: 'Create audio-reactive visualizations using Web Audio API and Canvas',
              category: 'creative',
              priority: 'low',
              status: 'pending',
              estimatedTime: 150,
              dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['music', 'visualization', 'web-audio'],
              energyLevel: 'medium',
              complexity: 'complex'
            },
            {
              id: 'creative-5',
              text: 'Design 3D printable model',
              description: 'Create a functional phone stand using Tinkercad or Fusion 360',
              category: 'creative',
              priority: 'low',
              status: 'pending',
              estimatedTime: 90,
              dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['3d-design', '3d-printing', 'product-design'],
              energyLevel: 'medium',
              complexity: 'moderate'
            }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
      ],
      activeListId: 'work',
      currentDate: new Date().toISOString().split('T')[0],

      // Actions
      createList: (name, category) => {
        const newList: TodoList = {
          id: Date.now().toString(),
          name,
          category,
          items: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        }
        set((state) => ({
          lists: [...state.lists, newList],
        }))
      },

      updateList: (id, updates) => {
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === id
              ? { ...list, ...updates, updatedAt: new Date().toISOString() }
              : list
          ),
        }))
      },

      deleteList: (id) => {
        set((state) => ({
          lists: state.lists.filter((list) => list.id !== id),
          activeListId: state.activeListId === id ? null : state.activeListId,
        }))
      },

      setActiveList: (id) => {
        set({ activeListId: id })
      },

      addTodo: (listId, todo) => {
        const newTodo: TodoItem = {
          ...todo,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: [...list.items, newTodo],
                  updatedAt: new Date().toISOString(),
                }
              : list
          ),
        }))
      },

      updateTodo: (listId, todoId, updates) => {
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.map((todo) =>
                    todo.id === todoId
                      ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
                      : todo
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : list
          ),
        }))
      },

      deleteTodo: (listId, todoId) => {
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.filter((todo) => todo.id !== todoId),
                  updatedAt: new Date().toISOString(),
                }
              : list
          ),
        }))
      },

      moveTodo: (fromListId, toListId, todoId) => {
        const { lists } = get()
        const fromList = lists.find((list) => list.id === fromListId)
        const todo = fromList?.items.find((item) => item.id === todoId)

        if (!todo) return

        set((state) => ({
          lists: state.lists.map((list) => {
            if (list.id === fromListId) {
              return {
                ...list,
                items: list.items.filter((item) => item.id !== todoId),
                updatedAt: new Date().toISOString(),
              }
            }
            if (list.id === toListId) {
              return {
                ...list,
                items: [...list.items, { ...todo, updatedAt: new Date().toISOString() }],
                updatedAt: new Date().toISOString(),
              }
            }
            return list
          }),
        }))
      },

      // AI Optimization
      optimizeTodos: (listId, energyLevel) => {
        const { lists } = get()
        const list = lists.find((l) => l.id === listId)
        if (!list) return []

        const todos = [...list.items].sort((a, b) => {
          // Priority first
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
          const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
          if (priorityDiff !== 0) return priorityDiff

          // Then by energy level compatibility
          if (energyLevel === 'high' && a.energyLevel === 'high') return -1
          if (energyLevel === 'low' && a.energyLevel === 'low') return -1
          if (energyLevel === 'medium' && a.energyLevel === 'medium') return -1

          // Then by estimated time (shorter tasks first for low energy)
          if (energyLevel === 'low') return a.estimatedTime - b.estimatedTime
          return b.estimatedTime - a.estimatedTime
        })

        return todos
      },

      suggestBreakActivities: (workType, energyLevel) => {
        const activities = {
          work: {
            low: ['Gentle stretching', 'Deep breathing', 'Eye rest exercises'],
            medium: ['Quick walk', 'Light stretching', 'Hydration break'],
            high: ['Energy boost exercises', 'Quick meditation', 'Movement break'],
          },
          personal: {
            low: ['Mindful breathing', 'Gentle yoga', 'Tea break'],
            medium: ['Light exercise', 'Creative doodling', 'Nature break'],
            high: ['Dance break', 'Quick workout', 'Energizing music'],
          },
          learning: {
            low: ['Memory games', 'Puzzle break', 'Learning reflection'],
            medium: ['Note review', 'Concept mapping', 'Discussion break'],
            high: ['Active recall', 'Teaching moment', 'Knowledge sharing'],
          },
          health: {
            low: ['Gentle movement', 'Mindfulness', 'Restorative poses'],
            medium: ['Moderate exercise', 'Balance work', 'Flexibility'],
            high: ['Cardio burst', 'Strength training', 'Dynamic stretching'],
          },
          creative: {
            low: ['Inspiration browsing', 'Mind mapping', 'Creative journaling'],
            medium: ['Sketching', 'Color exploration', 'Pattern recognition'],
            high: ['Rapid prototyping', 'Creative challenges', 'Collaboration'],
          },
        }

        return activities[workType as keyof typeof activities]?.[energyLevel as keyof typeof activities.work] || ['Take a break', 'Hydrate', 'Move around']
      },

      // Utilities
      getListById: (id) => {
        const { lists } = get()
        return lists.find((list) => list.id === id)
      },

      getTodosByDate: (date) => {
        const { lists } = get()
        return lists.flatMap((list) =>
          list.items.filter((todo) => todo.dueDate === date)
        )
      },

      getTodosByCategory: (category) => {
        const { lists } = get()
        return lists.flatMap((list) =>
          list.category === category ? list.items : []
        )
      },
    }),
    {
      name: 'todo-store',
    }
  )
)
