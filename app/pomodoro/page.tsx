"use client";

import * as React from "react";
import { ArrowLeft, ChevronDown, Plus, RepeatIcon, XIcon, Clock, CheckCircle2, Settings2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import SortableList, { Item, SortableListItem } from "@/components/ui/sortable-list";
import { SevenSegmentTimer } from "@/components/ui/7-segment-timer";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { IntroDisclosure } from "@/components/ui/intro-disclosure";

// Video background options (same as dashboard)
const videoBackgrounds = [
  {
    id: "nature",
    title: "Green Rolling Hills",
    src: "/hero-video/green-rolling-hills-in-nature.mp4",
    thumbnail: "/thumbnails/green-rolling-hills-in-nature.jpg",
    category: "Nature"
  },
  {
    id: "sunrise",
    title: "Sunrise Over the Clouds",
    src: "/hero-video/FILMPAC_sunrise-over-the-clouds_FFAAJ4941_HM.mp4",
    thumbnail: "/thumbnails/filmpacsunrise-over-the-cloudsffaaj4941hm.jpg",
    category: "Sky"
  },
  {
    id: "waterfall",
    title: "Waterfall in Green Mountains",
    src: "/hero-video/FILMPAC_waterfall-in-middle-of-green-mountains_FFAAS1368_HM.mp4",
    thumbnail: "/thumbnails/focus-mastery.jpg",
    category: "Mountains"
  },
  {
    id: "sunset-clouds",
    title: "Drone View of Clouds at Sunset",
    src: "/hero-video/FILMPAC_drone-view-of-clouds-in-sky-at-sunset_FFAAX5624_HM.mp4",
    thumbnail: "/thumbnails/filmpacdrone-view-of-clouds-in-sky-at-sunsetffaax5624hm.jpg",
    category: "Sky"
  },
  {
    id: "foggy-forest",
    title: "Aerial View of Foggy Forest",
    src: "/hero-video/FILMPAC_aerial-view-of-a-dense-forest-filled-with-fog_FFAAJ5958_HM.mp4",
    thumbnail: "/thumbnails/filmpacaerial-view-of-a-dense-forest-filled-with-fogffaaj5958hm.jpg",
    category: "Forest"
  },
  {
    id: "oregon-river",
    title: "Aerial View of Oregon River Woods",
    src: "/hero-video/FILMPAC_aerial-view-of-a-river-amidst-central-oregon-woods_FFAAP6567_HM.mp4",
    thumbnail: "/thumbnails/filmpacaerial-view-of-a-river-amidst-central-oregon-woodsffaap6567hm.jpg",
    category: "Nature"
  }
];

const initialState = [
  {
    text: "Complete Project Proposal",
    checked: false,
    id: 1,
    description: "Write and review the quarterly project proposal document",
    isCompleted: false,
    isRunning: false,
    remainingTime: 1500, // 25 minutes in seconds
  },
  {
    text: "Review Code Changes",
    checked: false,
    id: 2,
    description: "Go through the latest pull requests and provide feedback",
    isCompleted: false,
    isRunning: false,
    remainingTime: 1500,
  },
  {
    text: "Team Meeting Prep",
    checked: false,
    id: 3,
    description: "Prepare agenda and materials for tomorrow's team meeting",
    isCompleted: false,
    isRunning: false,
    remainingTime: 1500,
  }
];

export default function PomodoroPage() {
  // Mobile onboarding state
  const [showMobileOnboarding, setShowMobileOnboarding] = React.useState(false);

  // Mobile onboarding steps
  const mobileOnboardingSteps = [
    {
      title: "Welcome to Pomodoro",
      short_description: "Master your focus with timed sessions",
      full_description:
        "The Pomodoro Technique helps you work with focused time blocks, typically 25 minutes, followed by short breaks. This method improves concentration and productivity.",
      media: {
        type: "image" as const,
        src: "https://images.unsplash.com/photo-1590665077624-007da14956df?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Pomodoro timer concept",
      },
    },
    {
      title: "Task Management",
      short_description: "Organize your work into focused sessions",
      full_description:
        "Create tasks and assign Pomodoro sessions to each one. Track your progress and maintain focus on one task at a time for maximum efficiency.",
      media: {
        type: "image" as const,
        src: "https://images.unsplash.com/photo-1625014053925-88bef4805a76?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Task organization",
      },
    },
    {
      title: "Timer Controls",
      short_description: "Start, stop, and reset your sessions",
      full_description:
        "Use the timer controls to manage your Pomodoro sessions. Start a session, pause when needed, and reset to begin again. Each session is 25 minutes of focused work.",
      media: {
        type: "image" as const,
        src: "https://images.unsplash.com/photo-1703801602658-ee1840697ef8?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Timer controls",
      },
    },
    {
      title: "Background Settings",
      short_description: "Customize your focus environment",
      full_description:
        "Adjust background settings to create your ideal focus environment. Choose between color backgrounds, images, or videos, and adjust blur and overlay effects.",
      media: {
        type: "image" as const,
        src: "https://images.unsplash.com/photo-1633102313141-8f2ab45c0202?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Background customization",
      },
    },
    {
      title: "Ready to Focus?",
      short_description: "Start your productivity journey",
      full_description:
        "You're all set to use the Pomodoro Technique! Create your first task, set the timer, and begin your focused work session. Remember to take breaks between sessions.",
      media: {
        type: "image" as const,
        src: "https://images.unsplash.com/photo-1558244661-d248897f7bc4?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Productivity and focus",
      },
    },
  ];

  // Custom slider styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .slider::-webkit-slider-thumb {
        appearance: none;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #3b82f6;
        cursor: pointer;
        border: 2px solid #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .slider::-moz-range-thumb {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #3b82f6;
        cursor: pointer;
        border: 2px solid #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const router = useRouter();
  
  // Background state
  const [isVideoMode, setIsVideoMode] = React.useState(false);
  const [selectedVideoBackground, setSelectedVideoBackground] = React.useState(videoBackgrounds[0]);
  const [backgroundBlur, setBackgroundBlur] = React.useState(0);
  const [darkOverlay, setDarkOverlay] = React.useState(0);
  const [isAccordionOpen, setIsAccordionOpen] = React.useState(false);
  const [isColorBackground, setIsColorBackground] = React.useState(true);
  
  // Todo list state - using the exact structure from Cult UI example
  const [items, setItems] = React.useState<Item[]>(initialState);
  const [openItemId, setOpenItemId] = React.useState<number | null>(null);
  const [tabChangeRerender, setTabChangeRerender] = React.useState<number>(1);
  const [activeTabId, setActiveTabId] = React.useState<number>(0);
  const [remainingTime, setRemainingTime] = React.useState(1500); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);
  const [currentRunningItem, setCurrentRunningItem] = React.useState<number | null>(null);
  const [isTimerOpen, setIsTimerOpen] = React.useState(false);

  // Timer effect for individual items
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (currentRunningItem !== null) {
      interval = setInterval(() => {
        setItems(prevItems => {
          return prevItems.map(item => {
            if (item.id === currentRunningItem && item.isRunning && item.remainingTime > 0) {
              const newTime = item.remainingTime - 1;
              
              if (newTime <= 0) {
                // Timer completed - mark as done and move to bottom
                toast.success(`Pomodoro session completed for "${item.text}"!`);
                return {
                  ...item,
                  isRunning: false,
                  isCompleted: true,
                  checked: true,
                  remainingTime: 1500
                };
              }
              
              return {
                ...item,
                remainingTime: newTime
              };
            }
            return item;
          });
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentRunningItem]);



  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCompleteItem = (id: number) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked, isCompleted: !item.checked } : item
      );
      
      // Move completed items to the bottom
      const completedItems = updatedItems.filter(item => item.checked);
      const activeItems = updatedItems.filter(item => !item.checked);
      
      return [...activeItems, ...completedItems];
    });
    
    // If we just completed a task and there's a running timer, stop it
    if (currentRunningItem === id) {
      setCurrentRunningItem(null);
    }
    
    // Auto-start next available task if no timer is running
    if (currentRunningItem === null) {
      const nextTask = items.find(item => !item.checked && !item.isCompleted);
      if (nextTask) {
        startTimer(nextTask.id);
      }
    }
  };

  const startTimer = (id: number) => {
    setItems(prevItems => 
      prevItems.map(item => ({
        ...item,
        isRunning: item.id === id ? true : false
      }))
    );
    setCurrentRunningItem(id);
  };

  const stopTimer = (id: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, isRunning: false } : item
      )
    );
    setCurrentRunningItem(null);
  };

  const resetTimer = (id: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, remainingTime: 1500, isRunning: false } : item
      )
    );
    if (currentRunningItem === id) {
      setCurrentRunningItem(null);
    }
  };

  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        text: `Task ${prevItems.length + 1}`,
        checked: false,
        id: Date.now(),
        description: "",
        isCompleted: false,
        isRunning: false,
        remainingTime: 1500,
      },
    ]);
  };

  const handleResetItems = () => {
    setItems(initialState);
  };

  const handleCloseOnDrag = React.useCallback(() => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.checked ? { ...item, checked: false } : item
      );
      return updatedItems.some(
        (item, index) => item.checked !== prevItems[index].checked
      )
        ? updatedItems
        : prevItems;
    });
  }, []);

  const renderListItem = (
    item: Item,
    order: number,
    onCompleteItem: (id: number) => void,
    onRemoveItem: (id: number) => void
  ) => {
    const isOpen = item.id === openItemId;

    const tabs = [
      {
        id: 0,
        label: "Title",
        content: (
          <div className="flex w-full flex-col pr-2 py-2">
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.75,
                delay: 0.15,
              }}
            >
              <label className="text-xs text-neutral-400">
                Task title
              </label>
              <motion.input
                type="text"
                value={item.text}
                className="w-full min-w-[300px] rounded-lg border font-semibold border-black/10 bg-neutral-800 px-1 py-[6px] text-xl md:text-3xl text-white placeholder:text-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13EEE3]/80 dark:border-white/10"
                onChange={(e) => {
                  const text = e.target.value;
                  setItems((prevItems) =>
                    prevItems.map((i) =>
                      i.id === item.id ? { ...i, text } : i
                    )
                  );
                }}
              />
            </motion.div>
          </div>
        ),
      },
      {
        id: 1,
        label: "Description",
        content: (
          <div className="flex flex-col pr-2">
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.75,
                delay: 0.15,
              }}
            >
              <label className="text-xs text-neutral-400" htmlFor="description">
                Task description
              </label>
              <textarea
                id="description"
                className="h-[100px] w-full resize-none rounded-[6px] bg-neutral-800 px-2 py-[2px] text-sm text-white placeholder:text-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13EEE3]/80"
                value={item.description}
                placeholder="Describe your task..."
                onChange={(e) => {
                  const description = e.target.value;
                  setItems((prevItems) =>
                    prevItems.map((i) =>
                      i.id === item.id ? { ...i, description } : i
                    )
                  );
                }}
              />
            </motion.div>
          </div>
        ),
      },
      {
        id: 2,
        label: "Timer",
        content: (
          <div className="flex flex-col py-2 px-1">
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.75,
                delay: 0.15,
              }}
              className="space-y-3"
            >
              <p className="text-xs text-neutral-400">
                Pomodoro timer for this task
              </p>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4">
                    <SevenSegmentTimer 
                      seconds={item.remainingTime} 
                      width={60} 
                      height={80} 
                      onColor="#ffffff" 
                      offColor="#333333"
                    />
                  </div>
                  
                  {/* Status Badge */}
                  {item.isRunning && (
                    <div className="mb-4">
                      <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                        IN PROGRESS
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        if (item.isRunning) {
                          stopTimer(item.id);
                        } else {
                          startTimer(item.id);
                        }
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-6 py-2"
                    >
                      {item.isRunning ? "Stop" : "Start"}
                    </Button>
                    <Button
                      onClick={() => resetTimer(item.id)}
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full px-6 py-2 transition-colors"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ),
      },
    ];

    return (
      <SortableListItem
        item={item}
        order={order}
        key={item.id}
        isExpanded={isOpen}
        onCompleteItem={onCompleteItem}
        onRemoveItem={onRemoveItem}
        handleDrag={handleCloseOnDrag}
        className="my-2"
        renderExtra={(item) => (
          <div
            key={`${isOpen}`}
            className={cn(
              "flex h-full w-full flex-col items-center justify-center gap-2",
              isOpen ? "py-1 px-1" : "py-3"
            )}
          >
            <motion.button
              layout
              onClick={() => {
                if (!isOpen) {
                  setOpenItemId(item.id);
                  setActiveTabId(0); // Reset to first tab when opening
                } else {
                  setOpenItemId(null);
                }
              }}
              key="collapse"
              className={cn(
                isOpen
                  ? "absolute right-3 top-3 z-10"
                  : "relative z-10 ml-auto mr-3"
              )}
            >
              {isOpen ? (
                <motion.span
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    type: "spring",
                    duration: 1.95,
                  }}
                >
                  <XIcon className="h-5 w-5 text-neutral-500" />
                </motion.span>
              ) : (
                <motion.span
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    type: "spring",
                    duration: 0.95,
                  }}
                >
                  <Settings2Icon className="stroke-1 h-5 w-5 text-white/80 hover:stroke-[#13EEE3]/70" />
                </motion.span>
              )}
            </motion.button>



            <LayoutGroup id={`${item.id}`}>
              <AnimatePresence mode="popLayout">
                {isOpen ? (
                  <motion.div className="flex w-full flex-col">
                    <div className="w-full">
                      <motion.div
                        initial={{
                          y: 0,
                          opacity: 0,
                          filter: "blur(4px)",
                        }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          filter: "blur(0px)",
                        }}
                        transition={{
                          type: "spring",
                          duration: 0.15,
                        }}
                        layout
                        className="w-full"
                      >
                        {/* Simple Tabs */}
                        <div className="flex border-b border-gray-200 mb-4">
                          {tabs.map((tab, index) => (
                            <button
                              key={tab.id}
                              onClick={() => setActiveTabId(tab.id)}
                              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                                activeTabId === tab.id
                                  ? "text-white border-[#13EEE3]"
                                  : "text-neutral-400 border-transparent hover:text-white/80"
                              }`}
                            >
                              {tab.label}
                            </button>
                          ))}
                        </div>
                        
                        {/* Tab Content */}
                        <div className="min-h-[200px]">
                          {tabs.find(tab => tab.id === activeTabId)?.content}
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      key={`re-render-${tabChangeRerender}`}
                      className="mb-2 flex w-full items-center justify-between pl-2"
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      transition={{
                        type: "spring",
                        bounce: 0,
                        duration: 0.55,
                      }}
                    >
                      <motion.div className="flex items-center gap-2 pt-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#13EEE3]" />
                        <span className="text-xs text-neutral-300/80">
                          Changes
                        </span>
                      </motion.div>
                      <motion.div layout className="ml-auto mr-1 pt-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setOpenItemId(null);
                            toast.info("Changes saved");
                          }}
                          className="h-7 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4"
                        >
                          Apply Changes
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </LayoutGroup>
          </div>
        )}
      />
    );
  };

  const goBackToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Background */}
      {isColorBackground ? (
        <div 
          className="fixed inset-0 w-full h-full z-0"
          style={{
            backgroundColor: '#1a1a1a',
            filter: `blur(${backgroundBlur * 0.1}px)`,
            opacity: 1 - (backgroundBlur * 0.005)
          }}
        />
      ) : isVideoMode ? (
        <video
          autoPlay
          muted
          loop
          className="fixed inset-0 w-full h-full object-cover z-0"
          src={selectedVideoBackground.src}
          style={{
            filter: `blur(${backgroundBlur * 0.1}px)`,
            opacity: 1 - (backgroundBlur * 0.005)
          }}
        />
      ) : (
        <Image
          src="https://images.unsplash.com/photo-1590665077624-007da14956df?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Pomodoro timer background"
          fill
          className="object-cover"
          priority
          style={{
            filter: `blur(${backgroundBlur * 0.1}px)`,
            opacity: 1 - (backgroundBlur * 0.005)
          }}
        />
      )}
      
      {/* Full Page Overlay */}
      <div 
        className="fixed inset-0 z-10"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${darkOverlay * 0.01})`
        }}
      ></div>

      {/* Content */}
      <div className="relative z-20 min-h-screen">
        {/* Back Button */}
        <div className="pt-8 px-8">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={goBackToDashboard}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Timer Section */}
          <div className="mb-8">
            <div className="bg-black rounded-xl border border-gray-700/30 shadow-xl">
              {/* Timer Accordion Header */}
              <div 
                onClick={() => setIsTimerOpen(!isTimerOpen)}
                className="p-6 cursor-pointer bg-black hover:bg-gray-900 transition-colors rounded-t-xl"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-4xl font-bold text-white">Focus Timer</h2>
                  <div className="bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-colors">
                    <ChevronDown 
                      className={cn(
                        "h-5 w-5 text-white transition-transform",
                        isTimerOpen ? "rotate-180" : ""
                      )}
                    />
                  </div>
                </div>
              </div>
              
              {/* Timer Accordion Content */}
              {isTimerOpen && (
                <div className="px-6 pb-6 border-t border-gray-700/30">
                  {/* Current Task Display */}
                  <div className="mb-6 mt-8">
                    <div className="bg-gray-800 rounded-xl p-4 border border-gray-600">
                      {currentRunningItem ? (
                        <>
                          <div className="mb-2">
                            <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium inline-block">
                              IN PROGRESS
                            </div>
                          </div>
                          <h3 className="text-2xl font-semibold text-white">
                            {items.find(item => item.id === currentRunningItem)?.text}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            {items.find(item => item.id === currentRunningItem)?.description}
                          </p>
                        </>
                      ) : (
                        <>
                          <h3 className="text-2xl font-semibold text-white">
                            {items.find(item => item.id === openItemId)?.text || "No task selected"}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            {items.find(item => item.id === openItemId)?.description || "Open a task to start your Pomodoro session"}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <SevenSegmentTimer 
                      seconds={currentRunningItem ? (items.find(item => item.id === currentRunningItem)?.remainingTime || 0) : remainingTime} 
                      width={80} 
                      height={120} 
                      onColor="#ffffff" 
                      offColor="#333333"
                      className="mb-4"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    {currentRunningItem ? (
                      <>
                        <button
                          onClick={() => stopTimer(currentRunningItem)}
                          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-colors shadow-lg"
                        >
                          Stop Timer
                        </button>
                        <button
                          onClick={() => resetTimer(currentRunningItem)}
                          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-full transition-colors shadow-lg"
                        >
                          Reset
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => openItemId && startTimer(openItemId)}
                          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors shadow-lg"
                          disabled={!openItemId}
                        >
                          Start Timer
                        </button>
                        <button
                          onClick={() => openItemId && resetTimer(openItemId)}
                          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-full transition-colors shadow-lg"
                          disabled={!openItemId}
                        >
                          Reset
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Task Selection Hint */}
                  {!currentRunningItem && !openItemId && (
                    <p className="text-sm text-gray-500 mt-4">
                      💡 Open a task below to start your Pomodoro session
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Todo List Section */}
          <div className="mb-8">
            <div className="bg-black rounded-xl border border-gray-700/30 shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Pomodoro Tasks</h2>
                  <p className="text-gray-300 text-sm">Organize your work into focused sessions</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={items.length > 10}
                    onClick={handleAddItem}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    title="Add new task"
                  >
                    <Plus className="h-5 w-5 text-gray-300" />
                  </button>
                  <button
                    onClick={handleResetItems}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    title="Reset task list"
                  >
                    <RepeatIcon className="h-4 w-4 text-gray-300" />
                  </button>
                </div>
              </div>

              <SortableList
                items={items}
                setItems={setItems}
                onCompleteItem={handleCompleteItem}
                renderItem={renderListItem}
              />
            </div>
          </div>
        </div>

        {/* Mobile Onboarding */}
        {showMobileOnboarding && (
          <IntroDisclosure
            open={showMobileOnboarding}
            setOpen={setShowMobileOnboarding}
            steps={mobileOnboardingSteps}
            featureId="pomodoro-mobile-onboarding"
            showProgressBar={false}
            onComplete={() => {
              setShowMobileOnboarding(false);
              toast.success("Mobile onboarding completed!");
            }}
            onSkip={() => {
              setShowMobileOnboarding(false);
              toast.info("Mobile onboarding skipped");
            }}
            forceVariant="mobile"
          />
        )}
        
        {/* Debug info */}
        <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-2 rounded text-xs">
          Mobile Onboarding State: {showMobileOnboarding ? 'SHOWING' : 'HIDDEN'}
        </div>

        {/* Floating Background Settings - Bottom Left Corner */}
        <div className="fixed bottom-6 left-6 z-50">
          <div className="bg-black rounded-xl border border-gray-700/30 shadow-xl min-w-80">
            {/* Accordion Header */}
            <button
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-700/50 transition-colors rounded-t-xl"
            >
              <span className="font-medium text-white">Background Settings</span>
              <ChevronDown className={`h-5 w-5 text-gray-300 transition-transform ${isAccordionOpen ? 'rotate-180' : ''}`} />
            </button>

                        {/* Accordion Content */}
            {isAccordionOpen && (
              <div className="p-4 border-t border-gray-600">
                <div className="flex flex-col gap-4">
                  {/* Color Background Option */}
                  <div className="space-y-4 px-2">
                    <span className="text-white text-sm font-medium">Color Background</span>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-300">Dark Background</span>
                      <button
                        onClick={() => {
                          setIsColorBackground(!isColorBackground);
                          if (!isColorBackground) {
                            setIsVideoMode(false);
                          }
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          isColorBackground ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isColorBackground ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <div className="flex flex-col items-center px-2 pt-2 border-t border-gray-600">
                    <span className="text-white text-sm font-medium mb-2">Background Type</span>
                    <button
                      onClick={() => setIsVideoMode(!isVideoMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isVideoMode ? 'bg-blue-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isVideoMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <div className="flex items-center justify-between w-full mt-2 text-xs text-gray-300">
                      <span>Image</span>
                      <span>Video</span>
                    </div>
                  </div>

                                    {/* Video Background Selector */}
                  {isVideoMode && (
                    <div className="space-y-2 px-2">
                      <span className="text-white text-sm font-medium">Video:</span>
                      <Select value={selectedVideoBackground.id} onValueChange={(value) => {
                        const video = videoBackgrounds.find(v => v.id === value);
                        if (video) setSelectedVideoBackground(video);
                      }}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select video background" />
                        </SelectTrigger>
                        <SelectContent>
                          {videoBackgrounds.map((video) => (
                            <SelectItem key={video.id} value={video.id}>
                              {video.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Background Effects Sliders */}
                  <div className="space-y-4 px-2 pt-2 border-t border-gray-600">
                    <span className="text-white text-sm font-medium">Background Effects</span>
                    
                    {/* Blur/Level Slider */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-300">Blur/Level</span>
                        <span className="text-xs text-gray-400">{backgroundBlur}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={backgroundBlur}
                        onChange={(e) => setBackgroundBlur(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                    
                    {/* Dark Overlay Slider */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-300">Dark Overlay</span>
                        <span className="text-xs text-gray-400">{darkOverlay}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={darkOverlay}
                        onChange={(e) => setDarkOverlay(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Mobile Onboarding Button - Bottom Right Corner */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => {
              console.log('Floating button clicked!');
              setShowMobileOnboarding(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            title="Open Mobile Onboarding"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
