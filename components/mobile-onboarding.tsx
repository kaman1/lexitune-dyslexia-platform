"use client"

import { useEffect, useState } from "react"
import { MobileIntroDisclosure } from "@/components/ui/mobile-intro-disclosure"

const mobileOnboardingSteps = [
  {
    title: "Focus & Break Preferences",
    short_description: "Set your optimal work intervals",
    full_description:
      "Let's customize your Pomodoro technique. Choose your preferred focus duration and break length based on your attention span and energy levels.",
  },
  {
    title: "Work Type & Productivity",
    short_description: "Tell us about your work patterns",
    full_description:
      "Help us understand your work style and when you're most productive. This helps AI optimize your schedule and task organization.",
  },
  {
    title: "Task Organization & Distractions",
    short_description: "How do you like to organize work?",
    full_description:
      "Choose your preferred task organization method and identify what distracts you most. This helps create a distraction-free environment.",
  },
  {
    title: "Daily Capacity & AI Integration",
    short_description: "Set your limits and AI preferences",
    full_description:
      "Define how many tasks you can handle per day and whether you want AI to suggest break activities for optimal productivity.",
  },
  {
    title: "Select & Filter Todos",
    short_description: "Choose and filter your todos",
    full_description:
      "Filter todos by due dates and categories, then select which ones you want to work on in your Pomodoro session.",
  },
  {
    title: "Review & AI Optimize",
    short_description: "Finalize and optimize your session",
    full_description:
      "Review your selected todos, add optional context, and choose between AI optimization or standard addition to your Pomodoro session.",
  },
];

interface MobileOnboardingProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export function MobileOnboarding({ open: externalOpen, setOpen: externalSetOpen }: MobileOnboardingProps = {}) {
  const [internalOpen, setInternalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem("feature_mobile-onboarding") !== "true"
    }
    return true
  })

  // Use external state if provided, otherwise use internal state
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalSetOpen || setInternalOpen;

  // Ensure mobile onboarding opens automatically after component mounts (only for internal state)
  useEffect(() => {
    if (externalOpen === undefined && typeof window !== 'undefined') {
      const hasCompleted = window.localStorage.getItem("feature_mobile-onboarding") === "true"
      if (!hasCompleted) {
        setInternalOpen(true)
      }
    }
  }, [externalOpen])

  const handleComplete = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem("feature_mobile-onboarding", "true")
    }
    setOpen(false)
  }

  const handleSkip = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem("feature_mobile-onboarding", "true")
    }
    setOpen(false)
  }

  const handleReset = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem("feature_mobile-onboarding")
    }
    setOpen(true)
  }

    return (
    <div className="w-full">
      <MobileIntroDisclosure
        open={open}
        setOpen={setOpen}
        steps={mobileOnboardingSteps}
        featureId="mobile-onboarding"
        showProgressBar={false}
        onComplete={handleComplete}
        onSkip={handleSkip}
        forceVariant="mobile"
      />
    </div>
  )
}
