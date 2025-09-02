"use client"

import * as React from "react"

import {
  AnimatePresence,
  motion,
  useAnimation,
  type PanInfo,
} from "framer-motion"
import { CheckIcon, ExternalLinkIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { useTodoStore } from "@/lib/stores/todo-store"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Progress } from "@/components/ui/progress"
import { optimizeTodosWithAI, type OptimizedTodo } from "@/lib/ai-service"
import { toast } from "sonner"

// Custom types for mobile onboarding
interface MobileStep {
  title: string
  short_description: string
  full_description: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
  media?: {
    type: "image" | "video"
    src: string
    alt?: string
  }
}

interface MobileIntroDisclosureProps {
  steps: MobileStep[]
  featureId: string
  onComplete?: () => void
  onSkip?: () => void
  showProgressBar?: boolean
  open: boolean
  setOpen: (open: boolean) => void
  forceVariant?: "mobile" | "desktop"
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches ?? false
}

function useFeatureVisibility(featureId: string) {
  const [isVisible, setIsVisible] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const storedValue = localStorage.getItem(`feature_${featureId}`)
    setIsVisible(storedValue ? JSON.parse(storedValue) : true)
  }, [featureId])

  const hideFeature = () => {
    localStorage.setItem(`feature_${featureId}`, JSON.stringify(false))
    setIsVisible(false)
  }

  return { isVisible: isVisible === null ? false : isVisible, hideFeature }
}

function useSwipe(onSwipe: (direction: "left" | "right") => void) {
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 100) {
      onSwipe("right")
    } else if (info.offset.x < -100) {
      onSwipe("left")
    }
  }

  return { handleDragEnd }
}

const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
}

const slideInOut = (direction: 1 | -1) => ({
  initial: { opacity: 0, x: 20 * direction },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 * direction },
  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
})

const hoverScale = {
  whileHover: { scale: 1.01 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 },
}

function StepPreview({ step, direction }: { step: MobileStep; direction: 1 | -1 }) {
  const controls = useAnimation()

  React.useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, duration: 0.3 },
    })
  }, [controls, step])

  return (
    <motion.div
      {...slideInOut(direction)}
      className="relative h-full w-full overflow-hidden rounded-lg ring-2 ring-border ring-offset-4 ring-offset-background"
    >
      {step.media ? (
        <div className="relative bg-black h-full w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="h-full w-full"
          >
            {step.media.type === "image" ? (
              <Image
                src={step.media.src || "/placeholder.svg"}
                alt={step.media.alt || ""}
                fill
                className="object-cover"
              />
            ) : (
              <video
                src={step.media.src}
                controls
                className="h-full w-full object-cover"
              />
            )}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="absolute bottom-0 left-0 right-0 p-6 text-center"
          >
            <h3 className="mb-2 text-2xl font-semibold text-white">
              {step.title}
            </h3>
            <p className="text-white text-sm">
              {step.short_description}
            </p>
          </motion.div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="text-center"
          >
            <h3 className="mb-2 text-2xl font-semibold text-primary">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-sm">
              {step.short_description}
            </p>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

interface StepTabProps {
  step: MobileStep
  isActive: boolean
  onClick: () => void
  isCompleted: boolean
}

function StepTab({ step, isActive, onClick, isCompleted }: StepTabProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "group relative flex w-full items-center gap-3 rounded-lg border-2 p-3 text-left transition-all duration-200",
        isActive
          ? "border-primary bg-primary/5 shadow-lg"
          : "border-border bg-card hover:border-primary/50 hover:bg-primary/5",
        isCompleted && "border-green-500 bg-green-50 dark:bg-green-950"
      )}
      {...hoverScale}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        {isCompleted ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <span className="text-sm font-medium">
            {step.title.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-medium leading-none">{step.title}</h4>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {step.short_description}
        </p>
      </div>
    </motion.button>
  )
}

interface StepContentProps {
  steps: MobileStep[]
  currentStep: number
  onSkip: () => void
  onNext: () => void
  onPrevious: () => void
  hideFeature: () => void
  completedSteps: number[]
  onStepSelect: (index: number) => void
  direction: 1 | -1
  isDesktop: boolean
}

function StepContent({
  steps,
  currentStep,
  onSkip,
  onNext,
  onPrevious,
  hideFeature,
  completedSteps,
  onStepSelect,
  direction,
  isDesktop,
  stepRef,
}: StepContentProps & { stepRef: React.RefObject<HTMLButtonElement> }) {
  const [skipNextTime, setSkipNextTime] = React.useState(false)

  const renderActionButton = (action: MobileStep["action"]) => {
    if (!action) return null

    if (action.href) {
      return (
        <Button asChild className="w-full" size="sm" variant="link">
          <a href={action.href} target="_blank" rel="noopener noreferrer">
            <span className="flex items-center gap-2">
              {action.label}
              <ExternalLinkIcon className="w-4 h-4" />
            </span>
          </a>
        </Button>
      )
    }

    return (
      <Button
        className="w-full rounded-full"
        size="sm"
        variant="secondary"
        onClick={action.onClick}
      >
        {action.label}
      </Button>
    )
  }

  return (
    <div className="flex h-full flex-col max-w-3xl mx-auto">
      {isDesktop && (
        <div className="flex-1 px-2 py-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-2 flex flex-col justify-center items-center px-1"
          >
            {steps.map((step, index) => (
              <StepTab
                key={index}
                step={step}
                isActive={currentStep === index}
                onClick={() => onStepSelect(index)}
                isCompleted={completedSteps.includes(index)}
              />
            ))}
          </motion.div>
        </div>
      )}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep}
          {...slideInOut(direction)}
          className="mt-6 space-y-4"
        >
          {!isDesktop && steps[currentStep]?.media && (
            <AspectRatio
              ratio={16 / 9}
              className="overflow-hidden rounded-lg border"
            >
              <StepPreview step={steps[currentStep]} direction={direction} />
            </AspectRatio>
          )}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold">
                {steps[currentStep]?.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {steps[currentStep]?.full_description}
              </p>
            </div>
            {steps[currentStep]?.action && (
              <div className="pt-2">
                {renderActionButton(steps[currentStep]?.action)}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export function MobileIntroDisclosure({
  steps,
  open,
  setOpen,
  featureId,
  onComplete,
  onSkip,
  showProgressBar = true,
  forceVariant,
}: MobileIntroDisclosureProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([0])
  const [direction, setDirection] = React.useState<1 | -1>(1)
  const isDesktopQuery = useMediaQuery("(min-width: 768px)")
  const isDesktop = forceVariant ? forceVariant === "desktop" : isDesktopQuery
  const { isVisible, hideFeature } = useFeatureVisibility(featureId)
  const stepRef = React.useRef<HTMLButtonElement>(null)
  const { lists } = useTodoStore();

  // Todo Selection state
  const [selectedDateRanges, setSelectedDateRanges] = React.useState<('today' | 'week' | 'month')[]>(['today']);
  const [selectedCategories, setSelectedCategories] = React.useState<('work' | 'personal' | 'learning' | 'health' | 'creative')[]>([]);
  const [selectedTodos, setSelectedTodos] = React.useState<string[]>([]);
  const [additionalContext, setAdditionalContext] = React.useState('');
  const [userEnergyLevel, setUserEnergyLevel] = React.useState<'low' | 'medium' | 'high'>('medium');
  const [preferredSessionLength, setPreferredSessionLength] = React.useState(25);
  const [isAIOptimizing, setIsAIOptimizing] = React.useState(false);

  // Todo Selection functions
  const getFilteredTodos = () => {
    if (!lists || lists.length === 0) return [];
    
    // Get all todos from all lists
    const allTodos = lists.flatMap(list => list.items);
    
    if (allTodos.length === 0) return [];
    
    return allTodos.filter((todo: any) => {
      // Filter by due date if any date ranges are selected
      if (selectedDateRanges.length > 0 && todo.dueDate) {
        const dueDate = new Date(todo.dueDate);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        const dateMatches = selectedDateRanges.some(range => {
          switch (range) {
            case 'today':
              return dueDate.toDateString() === today.toDateString();
            case 'week':
              const weekStart = new Date(today);
              weekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
              const weekEnd = new Date(weekStart);
              weekEnd.setDate(weekStart.getDate() + 6); // End of week (Saturday)
              return dueDate >= weekStart && dueDate <= weekEnd;
            case 'month':
              const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
              const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
              return dueDate >= monthStart && dueDate <= monthEnd;
            default:
              return false;
          }
        });
        
        if (!dateMatches) return false;
      }
      
      // Filter by category if any are selected
      const categoryMatches = selectedCategories.length === 0 || selectedCategories.includes(todo.category);
      
      return categoryMatches;
    }).sort((a: any, b: any) => {
      // Sort by priority (high to low) then by due date
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
      const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
      
      if (aPriority !== bPriority) return bPriority - aPriority;
      
      // If same priority, sort by due date (earliest first)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      
      return 0;
    });
  };

  const handleDateRangeToggle = (range: 'today' | 'week' | 'month') => {
    setSelectedDateRanges(prev => 
      prev.includes(range) 
        ? prev.filter(r => r !== range)
        : [...prev, range]
    );
  };

  const handleCategoryToggle = (category: 'work' | 'personal' | 'learning' | 'health' | 'creative') => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleTodoToggle = (todoId: string) => {
    setSelectedTodos(prev => 
      prev.includes(todoId) 
        ? prev.filter(id => id !== todoId)
        : [...prev, todoId]
    );
  };

  const handleAddToPomodoro = () => {
    if (selectedTodos.length === 0) {
      toast.error('Please select at least one todo');
      return;
    }

    const filteredTodos = getFilteredTodos();
    const selectedTodoObjects = filteredTodos.filter(todo => selectedTodos.includes(todo.id));

    // Convert selected todos to Pomodoro format
    const pomodoroItems = selectedTodoObjects.map((todo, index) => ({
      text: todo.text,
      checked: false,
      id: Date.now() + index,
      description: additionalContext ? `${todo.description || ''}\n\nAdditional Context: ${additionalContext}` : todo.description || "",
      isCompleted: false,
      isRunning: false,
      remainingTime: todo.estimatedTime ? todo.estimatedTime * 60 : 1500, // Convert minutes to seconds
      // Store original todo info for syncing back to mylist
      originalTodoId: todo.id,
      originalListId: todo.listId || 'work', // Default to work if no listId
      originalCategory: todo.category,
      originalPriority: todo.priority,
      originalEstimatedTime: todo.estimatedTime,
      originalDueDate: todo.dueDate,
      originalTags: todo.tags || []
    }));

    // Store in localStorage for Pomodoro page to access
    console.log('Storing todos in localStorage:', pomodoroItems);
    localStorage.setItem('pomodoro-todos', JSON.stringify(pomodoroItems));
    
    // Verify storage
    const stored = localStorage.getItem('pomodoro-todos');
    console.log('Verified stored todos:', stored);
    
    toast.success(`Added ${selectedTodos.length} todos to Pomodoro`);
    
    // Close the onboarding
    setOpen(false);
  };

  // Function to sync AI-optimized times back to mylist
  const syncAIOptimizedTimesToMylist = (optimizedTodos: OptimizedTodo[], originalTodos: any[]) => {
    try {
      // Get the current mylist data from localStorage
      const mylistData = localStorage.getItem('mylist-store');
      if (!mylistData) {
        console.log('No mylist store found in localStorage');
        return;
      }

      const mylistStore = JSON.parse(mylistData);
      const { lists } = mylistStore.state;

      let updatedCount = 0;
      const timeUpdates: string[] = [];

      // Update each optimized todo's estimated time in mylist
      optimizedTodos.forEach((optimizedTodo, index) => {
        const originalTodo = originalTodos[index];
        if (!originalTodo || !originalTodo.id) return;

        // Find the list containing the original todo
        const targetList = lists.find((list: any) => list.id === (originalTodo.listId || 'work'));
        if (!targetList) return;

        // Find the original todo in the list
        const originalTodoInList = targetList.items.find((todo: any) => todo.id === originalTodo.id);
        if (!originalTodoInList) return;

        // Update the estimated time with AI optimization
        const originalTime = originalTodoInList.estimatedTime || 25;
        const optimizedTime = optimizedTodo.estimatedTime || originalTime;
        
        if (originalTime !== optimizedTime) {
          originalTodoInList.estimatedTime = optimizedTime;
          originalTodoInList.updatedAt = new Date().toISOString();
          
          updatedCount++;
          timeUpdates.push(`${originalTodoInList.text}: ${originalTime} → ${optimizedTime} min`);
          
          console.log(`Updated todo "${originalTodoInList.text}" estimated time from ${originalTime} to ${optimizedTime} minutes`);
        }
      });

      // Save the updated store back to localStorage
      localStorage.setItem('mylist-store', JSON.stringify(mylistStore));
      
      console.log(`Successfully synced AI-optimized times back to mylist. Updated ${updatedCount} todos.`);
      
      // Show detailed feedback if times were updated
      if (updatedCount > 0) {
        const updateMessage = timeUpdates.slice(0, 3).join(', ') + (timeUpdates.length > 3 ? ` and ${timeUpdates.length - 3} more...` : '');
        toast.info(`Updated ${updatedCount} todo times in mylist: ${updateMessage}`, { duration: 6000 });
      }
      
    } catch (error) {
      console.error('Error syncing AI-optimized times to mylist:', error);
    }
  };

  const handleAIOptimization = async () => {
    if (selectedTodos.length === 0) {
      toast.error('Please select at least one todo for AI optimization');
      return;
    }

    console.log('🚀 Starting AI optimization...');
    console.log('Selected todos:', selectedTodos);
    console.log('Selected date ranges:', selectedDateRanges);
    console.log('Selected categories:', selectedCategories);
    console.log('User energy level:', userEnergyLevel);
    console.log('Preferred session length:', preferredSessionLength);
    console.log('Additional context:', additionalContext);

    setIsAIOptimizing(true);
    
    try {
      const filteredTodos = getFilteredTodos();
      const selectedTodoObjects = filteredTodos.filter(todo => selectedTodos.includes(todo.id));
      
      console.log('Filtered todos:', filteredTodos);
      console.log('Selected todo objects:', selectedTodoObjects);

      // Create enhanced context for AI optimization
      const enhancedContext = `
${additionalContext ? `User Context: ${additionalContext}` : ''}
Focus Preferences: ${userEnergyLevel} energy level, ${preferredSessionLength}-minute sessions
Date Urgency: ${selectedDateRanges.join(', ')} - ${selectedDateRanges.includes('today') ? 'High urgency' : selectedDateRanges.includes('week') ? 'Medium urgency' : 'Lower urgency'}
Category Focus: ${selectedCategories.length > 0 ? selectedCategories.join(', ') : 'All categories'}
Total Tasks: ${selectedTodoObjects.length} tasks to optimize
Session Goal: Maximize focus and productivity within ${preferredSessionLength}-minute blocks
`.trim();

      const optimizationRequest = {
        todos: selectedTodoObjects.map(todo => ({
          text: todo.text,
          description: todo.description,
          priority: todo.priority,
          estimatedTime: todo.estimatedTime || 25,
          category: todo.category,
          dueDate: todo.dueDate,
          tags: todo.tags || [],
          // Add more context for better AI optimization
          originalEstimatedTime: todo.estimatedTime || 25,
          isUrgent: selectedDateRanges.includes('today') && todo.dueDate === new Date().toISOString().split('T')[0],
          complexity: todo.complexity || 'moderate'
        })),
        dateRanges: selectedDateRanges,
        selectedCategories: selectedCategories,
        additionalContext: enhancedContext,
        userEnergyLevel,
        preferredSessionLength
      };

      console.log('Optimization request:', optimizationRequest);
      
      const optimizedTodos = await optimizeTodosWithAI(optimizationRequest);
      console.log('AI optimization result:', optimizedTodos);
      
      // Convert optimized todos to Pomodoro format with custom breaks
      const pomodoroItems = optimizedTodos.map((todo, index) => {
        // Find the original todo to get the original information
        const originalTodo = selectedTodoObjects[index];
        
        return {
          text: todo.text,
          checked: false,
          id: Date.now() + index,
          description: `${todo.description || ''}\n\nAI Optimization:\n- Energy Level: ${todo.energyLevel}\n- Complexity: ${todo.complexity}\n- Custom Break: ${todo.customBreak?.activity || 'Standard break'}\n\nAdditional Context: ${additionalContext || 'None'}`,
          isCompleted: false,
          isRunning: false,
          remainingTime: todo.remainingTime,
          customBreak: todo.customBreak,
          priority: todo.priority,
          category: todo.category,
          energyLevel: todo.energyLevel,
          complexity: todo.complexity,
          // Store original todo info for syncing back to mylist
          originalTodoId: originalTodo.id,
          originalListId: originalTodo.listId || 'work', // Default to work if no listId
          originalCategory: originalTodo.category,
          originalPriority: originalTodo.priority,
          originalEstimatedTime: originalTodo.estimatedTime,
          originalDueDate: originalTodo.dueDate,
          originalTags: originalTodo.tags || []
        };
      });

      console.log('Final pomodoro items:', pomodoroItems);
      
      // Store optimized todos in localStorage
      localStorage.setItem('pomodoro-todos', JSON.stringify(pomodoroItems));
      localStorage.setItem('pomodoro-ai-optimized', 'true');
      
      console.log('Stored in localStorage:', {
        'pomodoro-todos': pomodoroItems,
        'pomodoro-ai-optimized': 'true'
      });
      
      // Sync AI-optimized times back to mylist
      syncAIOptimizedTimesToMylist(optimizedTodos, selectedTodoObjects);
      
      toast.success(`AI optimized ${selectedTodos.length} todos with custom breaks and time adjustments. Estimated times have been updated in mylist.`);
      
      // Automatically close the onboarding after successful AI optimization
      setTimeout(() => {
        setOpen(false);
      }, 1500); // Give user time to see the success message
      
    } catch (error) {
      console.error('❌ AI optimization error:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      toast.error('AI optimization failed. Using standard optimization instead.');
      
      // Fallback to standard optimization
      handleAddToPomodoro();
    } finally {
      setIsAIOptimizing(false);
    }
  };

  // Close the dialog if feature is hidden
  React.useEffect(() => {
    if (!isVisible) {
      setOpen(false)
    }
  }, [isVisible, setOpen])

  // Focus management
  React.useEffect(() => {
    if (open && stepRef.current) {
      stepRef.current.focus()
    }
  }, [open, currentStep])

  // Early return if feature should be hidden
  if (!isVisible || !open) {
    return null
  }

  const handleNext = () => {
    setDirection(1)
    setCompletedSteps((prev) =>
      prev.includes(currentStep) ? prev : [...prev, currentStep]
    )
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setOpen(false)
      onComplete?.()
    }
  }

  const handlePrevious = () => {
    setDirection(-1)
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    setOpen(false)
    onSkip?.()
  }

  const handleStepSelect = (index: number) => {
    setDirection(index > currentStep ? 1 : -1)
    // Mark all steps up to and including the selected step as completed
    setCompletedSteps((prev) => {
      const newCompletedSteps = new Set(prev)
      // If moving forward, mark all steps up to the selected one as completed
      if (index > currentStep) {
        for (let i = currentStep; i <= index; i++) {
          newCompletedSteps.add(i)
        }
      }
      return Array.from(newCompletedSteps)
    })
    setCurrentStep(index)
  }

  const handleSwipe = (swipeDirection: "left" | "right") => {
    if (swipeDirection === "left") {
      handleNext()
    } else {
      handlePrevious()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      handleNext()
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      handlePrevious()
    }
  }

  const { handleDragEnd } = useSwipe(handleSwipe)

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold">
              Feature Introduction
            </DialogTitle>
          </DialogHeader>
          <div className="flex h-[600px]">
            <StepContent
              steps={steps}
              currentStep={currentStep}
              onSkip={handleSkip}
              onNext={handleNext}
              onPrevious={handlePrevious}
              hideFeature={hideFeature}
              completedSteps={completedSteps}
              onStepSelect={handleStepSelect}
              direction={direction}
              isDesktop={isDesktop}
              stepRef={stepRef}
            />
          </div>
          {showProgressBar && (
            <div className="p-6 pt-0">
              <Progress value={(currentStep / (steps.length - 1)) * 100} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="h-[90vh]">
        <DrawerHeader className="p-4 rounded-t-[20px]">
          <DrawerTitle className="text-xl font-semibold">
            {steps[currentStep]?.title}
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-hidden rounded-t-[20px]">
          <div className="h-full overflow-y-auto p-3">
            <div className="space-y-6 mx-0 rounded-t-[20px]">
              {/* Feature Grid - Top section like Cult UI */}
              <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto px-1">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    onClick={() => handleStepSelect(index)}
                    className={cn(
                      "p-3 rounded-2xl border cursor-pointer transition-colors",
                      index === currentStep
                        ? "bg-primary text-primary-foreground border-primary"
                        : completedSteps.includes(index)
                        ? "bg-green-50 border-green-200 text-green-800"
                        : "bg-card border-border hover:bg-accent/50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">
                          {step.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {step.short_description}
                        </p>
                      </div>
                      {completedSteps.includes(index) && (
                        <div className="text-green-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Current Step Detail View - Bottom section like Cult UI */}
              <div className="space-y-4 max-w-2xl mx-auto rounded-2xl px-1">
                {/* Dynamic Form Fields Based on Step */}
                <div className="space-y-4">
                  {currentStep === 0 && (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-left mb-2 block">
                          What's your typical focus duration?
                        </Label>
                        <Select>
                          <SelectTrigger className="w-full rounded-xl">
                            <SelectValue placeholder="Select focus duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes (ADHD-friendly)</SelectItem>
                            <SelectItem value="20">20 minutes (Standard)</SelectItem>
                            <SelectItem value="25">25 minutes (Classic Pomodoro)</SelectItem>
                            <SelectItem value="30">30 minutes (Extended focus)</SelectItem>
                            <SelectItem value="45">45 minutes (Deep work)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-left mb-2 block">
                          How long should your breaks be?
                        </Label>
                        <Select>
                          <SelectTrigger className="w-full rounded-xl">
                            <SelectValue placeholder="Select break duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 minutes (Quick reset)</SelectItem>
                            <SelectItem value="5">5 minutes (Standard break)</SelectItem>
                            <SelectItem value="10">10 minutes (Extended break)</SelectItem>
                            <SelectItem value="15">15 minutes (Long break)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-left mb-2">
                          What type of work do you do most?
                        </label>
                        <div className="space-y-2">
                          {["Creative/Design", "Coding/Development", "Writing/Research", "Administrative", "Learning/Study", "Other"].map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox id={`work-type-${type}`} />
                              <Label htmlFor={`work-type-${type}`} className="text-sm">{type}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-left mb-2 block">
                          When are you most productive?
                        </Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select productivity time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Early morning (6-9 AM)</SelectItem>
                            <SelectItem value="mid-morning">Mid-morning (9-12 PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12-3 PM)</SelectItem>
                            <SelectItem value="late-afternoon">Late afternoon (3-6 PM)</SelectItem>
                            <SelectItem value="evening">Evening (6-9 PM)</SelectItem>
                            <SelectItem value="night">Night (9 PM-12 AM)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-left mb-2">
                          How do you prefer to organize tasks?
                        </label>
                        <RadioGroup defaultValue="priority">
                          {["By priority (urgent/important)", "By energy level", "By project/category", "By deadline", "By estimated time"].map((method) => (
                            <div key={method} className="flex items-center space-x-2">
                              <RadioGroupItem value={method.toLowerCase().replace(/[^a-z]/g, '-')} id={`org-${method.toLowerCase().replace(/[^a-z]/g, '-')}`} />
                              <Label htmlFor={`org-${method.toLowerCase().replace(/[^a-z]/g, '-')}`} className="text-sm">{method}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-left mb-2 block">
                          What distracts you most during work?
                        </Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select main distraction" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="social-media">Social media notifications</SelectItem>
                            <SelectItem value="email">Email interruptions</SelectItem>
                            <SelectItem value="noise">Background noise</SelectItem>
                            <SelectItem value="movement">People moving around</SelectItem>
                            <SelectItem value="hunger">Hunger/thirst</SelectItem>
                            <SelectItem value="fatigue">Mental fatigue</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-left mb-2 block">
                          How many tasks do you typically handle per day?
                        </Label>
                        <Input 
                          type="number" 
                          min="1" 
                          max="20" 
                          defaultValue="5"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-left mb-2">
                          Do you want AI to suggest break activities?
                        </label>
                        <div className="space-y-2">
                          {["Yes, suggest stretching exercises", "Yes, suggest mindfulness breaks", "Yes, suggest movement activities", "No, I'll handle my own breaks"].map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <Checkbox id={`break-${option.toLowerCase().replace(/[^a-z]/g, '-')}`} />
                              <Label htmlFor={`break-${option.toLowerCase().replace(/[^a-z]/g, '-')}`} className="text-sm">{option}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-4">


                      {/* Date Range Selection */}
                      <div>
                        <Label className="text-sm font-medium text-left mb-2 block">
                          Filter by due date
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {(['today', 'week', 'month'] as const).map((range) => (
                            <button
                              key={range}
                              onClick={() => handleDateRangeToggle(range)}
                              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                                selectedDateRanges.includes(range)
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-muted-foreground hover:bg-accent'
                              }`}
                            >
                              {range === 'today' ? 'Today' : range === 'week' ? 'This Week' : 'This Month'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* User Energy Level */}
                      <div>
                        <Label className="text-sm font-medium text-left mb-2 block">
                          Your current energy level
                        </Label>
                        <RadioGroup
                          value={userEnergyLevel}
                          onValueChange={(value: 'low' | 'medium' | 'high') => setUserEnergyLevel(value)}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="low" id="energy-low" />
                            <Label htmlFor="energy-low" className="text-sm">Low</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medium" id="energy-medium" />
                            <Label htmlFor="energy-medium" className="text-sm">Medium</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="high" id="energy-high" />
                            <Label htmlFor="energy-high" className="text-sm">High</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Preferred Session Length */}
                      <div>
                        <Label className="text-sm font-medium text-left mb-2 block">
                          Preferred Pomodoro session length (minutes)
                        </Label>
                        <Select value={preferredSessionLength.toString()} onValueChange={(value) => setPreferredSessionLength(parseInt(value))}>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="20">20 minutes</SelectItem>
                            <SelectItem value="25">25 minutes (Classic)</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Category Multi-Select */}
                      <div>
                        <Label className="text-sm font-medium text-left mb-2 block">
                          Focus on specific categories
                        </Label>
                        <div className="space-y-2">
                          {(['work', 'personal', 'learning', 'health', 'creative'] as const).map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => handleCategoryToggle(category)}
                                className="mt-1"
                              />
                              <Label className="text-sm capitalize">{category}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Available Todos Accordion */}
                      <div>
                        <details className="group">
                          <summary className="flex items-center justify-between cursor-pointer list-none p-3 bg-muted rounded-lg border hover:bg-accent transition-colors">
                            <div className="flex items-center space-x-2">
                              <Label className="text-sm font-medium">
                                Available todos
                              </Label>
                              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                                {getFilteredTodos().length}
                              </span>
                            </div>
                            <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </summary>
                          
                          <div className="mt-2 bg-muted rounded-lg p-3 max-h-48 overflow-y-auto border">
                            {(() => {
                              const filteredTodos = getFilteredTodos();
                              if (filteredTodos.length === 0) {
                                return (
                                  <div className="text-center py-4">
                                    <p className="text-sm text-muted-foreground">
                                      No todos found for selected filters
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Try adjusting date ranges or categories
                                    </p>
                                  </div>
                                );
                              }
                              
                              return (
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                                    <span>Found {filteredTodos.length} todos</span>
                                    {selectedCategories.length > 0 && (
                                      <span className="text-primary">
                                        {selectedCategories.length} categories selected
                                      </span>
                                    )}
                                  </div>
                                  
                                  {filteredTodos.map((todo) => (
                                    <div key={todo.id} className="flex items-start space-x-2 p-2 bg-background rounded border">
                                      <Checkbox
                                        checked={selectedTodos.includes(todo.id)}
                                        onCheckedChange={() => handleTodoToggle(todo.id)}
                                        className="mt-1"
                                      />
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-1 mb-1">
                                          <span className="text-sm font-medium truncate">{todo.text}</span>
                                          <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                                            todo.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                            todo.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                            todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-green-100 text-green-800'
                                          }`}>
                                            {todo.priority}
                                          </span>
                                          <span className="px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                                            {todo.category}
                                          </span>
                                        </div>
                                        {todo.description && (
                                          <p className="text-xs text-muted-foreground mb-1 line-clamp-2">{todo.description}</p>
                                        )}
                                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                          {todo.dueDate && (
                                            <span className="flex items-center">
                                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                              </svg>
                                              {new Date(todo.dueDate).toLocaleDateString()}
                                            </span>
                                          )}
                                          {todo.estimatedTime && (
                                            <span className="flex items-center">
                                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                              </svg>
                                              {todo.estimatedTime}m
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              );
                            })()}
                          </div>
                        </details>
                      </div>

                      {/* Filter Summary */}
                      <div className="bg-muted/50 rounded-lg p-3 border">
                        <div className="text-xs text-muted-foreground mb-2">Current Filters:</div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>Date Ranges:</span>
                            <span className="text-primary">
                              {selectedDateRanges.length > 0 
                                ? selectedDateRanges.map(r => r === 'today' ? 'Today' : r === 'week' ? 'Week' : 'Month').join(', ')
                                : 'None selected'
                              }
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span>Categories:</span>
                            <span className="text-primary">
                              {selectedCategories.length > 0 
                                ? selectedCategories.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')
                                : 'All categories'
                              }
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span>Todos Selected:</span>
                            <span className="text-primary">{selectedTodos.length}</span>
                          </div>
                        </div>
                      </div>

                      {/* Select All Button */}
                      {(() => {
                        const filteredTodos = getFilteredTodos();
                        if (filteredTodos.length === 0) return null;
                        
                        const allSelected = filteredTodos.every(todo => selectedTodos.includes(todo.id));
                        const someSelected = selectedTodos.length > 0;
                        
                        return (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                if (allSelected) {
                                  setSelectedTodos([]);
                                } else {
                                  setSelectedTodos(filteredTodos.map(todo => todo.id));
                                }
                              }}
                              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                                allSelected 
                                  ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
                              }`}
                            >
                              {allSelected ? 'Deselect All' : 'Select All'}
                            </button>
                            {someSelected && (
                              <button
                                onClick={() => setSelectedTodos([])}
                                className="px-3 py-2 rounded-lg text-xs font-medium bg-muted text-muted-foreground hover:bg-accent"
                              >
                                Clear
                              </button>
                            )}
                          </div>
                        );
                                              })()}


                      </div>
                    )}

                  {currentStep === 5 && (
                    <div className="space-y-6">

                      {/* Additional Context */}
                      <div>
                        <Label className="text-sm font-medium text-left mb-3 block">
                          Additional context for AI optimization (optional)
                        </Label>
                        <textarea
                          value={additionalContext}
                          onChange={(e) => setAdditionalContext(e.target.value)}
                          placeholder="Describe your current situation, energy level, or any specific context that would help AI optimize your Pomodoro sessions..."
                          className="w-full p-4 text-sm border rounded-lg resize-none bg-background"
                          rows={4}
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          This helps AI understand your context and provide better optimization suggestions.
                        </p>
                      </div>



                      {/* AI Running State - Show when optimizing */}
                      {isAIOptimizing && (
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200 text-center">
                          <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                              <svg className="w-16 h-16 text-purple-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-purple-800 mb-2">
                                AI is Optimizing Your Session
                              </h4>
                              <p className="text-purple-700 text-sm">
                                Analyzing {selectedTodos.length} tasks and creating the perfect Pomodoro schedule...
                              </p>
                            </div>
                            <div className="space-y-2 text-xs text-purple-600">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                                Adjusting task times based on your {userEnergyLevel} energy level
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                                Planning custom breaks for optimal focus
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                                Optimizing task order for maximum productivity
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* AI Optimization Explanation */}
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          What AI Optimization Does
                        </h4>
                        <div className="text-sm text-purple-700 space-y-2">
                          <div className="flex items-start space-x-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Adjusts estimated times based on complexity and your energy level</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Orders tasks by priority and urgency for optimal flow</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Suggests custom breaks between tasks (5-15 minutes)</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Creates perfectly timed Pomodoro sessions</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons - Hide when AI is optimizing */}
                      {!isAIOptimizing && (
                        <div className="pt-4">
                          
                          {/* Main Action Buttons - Horizontal Layout */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            
                            {/* AI Optimize Button */}
                            <button
                              onClick={handleAIOptimization}
                              disabled={selectedTodos.length === 0}
                              className={`px-4 py-4 rounded-lg text-sm font-medium transition-colors flex flex-col items-center justify-center space-y-2 ${
                                selectedTodos.length > 0
                                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg'
                                  : 'bg-muted text-muted-foreground cursor-not-allowed'
                              }`}
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                              <div className="text-center">
                                <div className="font-semibold">With AI</div>
                                <div className="text-xs opacity-90">Smart optimization</div>
                              </div>
                            </button>
                            
                            {/* Manual Add Button */}
                            <button
                              onClick={handleAddToPomodoro}
                              disabled={selectedTodos.length === 0}
                              className={`px-4 py-4 rounded-lg text-sm font-medium transition-colors flex flex-col items-center justify-center space-y-2 ${
                                selectedTodos.length > 0
                                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg'
                                  : 'bg-muted text-muted-foreground cursor-not-allowed'
                              }`}
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                              <div className="text-center">
                                <div className="font-semibold">Manual</div>
                                <div className="text-xs opacity-90">Direct add</div>
                              </div>
                            </button>
                          </div>
                          
                          {/* Cancel Button - Full Width */}
                          <button
                            onClick={() => setOpen(false)}
                            className="w-full px-6 py-3 rounded-lg text-base font-medium bg-muted text-muted-foreground hover:bg-accent transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Step Title and Description */}
                <div className="text-center space-y-2 rounded-2xl px-1">
                  <h3 className="text-xl font-semibold">
                    {steps[currentStep]?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {steps[currentStep]?.full_description}
                  </p>
                </div>

                {/* Action Button */}
                {steps[currentStep]?.action && (
                  <Button
                    asChild
                    className="w-full rounded-2xl"
                    variant={
                      steps[currentStep]?.action?.href ? "outline" : "default"
                    }
                  >
                    {steps[currentStep]?.action?.href ? (
                      <a
                        href={steps[currentStep]?.action?.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        {steps[currentStep]?.action?.label}
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                    ) : (
                      <button onClick={steps[currentStep]?.action?.onClick}>
                        {steps[currentStep]?.action?.label}
                      </button>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed bottom navigation - styled like Cult UI */}
        <div className="absolute bottom-0 left-0 right-0 border-t bg-background rounded-t-[20px]">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                onClick={onSkip}
                className="text-muted-foreground hover:bg-card rounded-full"
              >
                Skip all
              </Button>
              <div className="space-x-2">
                {currentStep > 0 && (
                  <Button
                    onClick={handlePrevious}
                    size="sm"
                    variant="ghost"
                    className="rounded-full hover:bg-transparent"
                  >
                    Previous
                  </Button>
                )}
                <Button
                  onClick={() => {
                    handleNext()
                  }}
                  size="sm"
                  ref={stepRef}
                  className="rounded-full"
                >
                  {currentStep === steps.length - 1 ? "Done" : "Next"}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Checkbox
                id="skipNextTime"
                onCheckedChange={(checked) => {
                  hideFeature()
                }}
              />
              <label
                htmlFor="skipNextTime"
                className="text-sm text-muted-foreground"
              >
                Don't show this again
              </label>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
