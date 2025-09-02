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
