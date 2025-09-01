"use client"

import { useEffect, useState } from "react"
import { IntroDisclosure } from "@/components/ui/intro-disclosure"

const steps = [
  {
    title: "Welcome to TEKIMAX",
    short_description: "Your AI-powered neurodivergent support platform",
    full_description:
      "Welcome to TEKIMAX! We're here to empower neurodivergent minds with AI-enhanced learning tools, research-backed methods, and personalized support that adapts to your unique cognitive profile.",
    media: {
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1724245047328-431c55de6cb7?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "TEKIMAX AI platform overview",
    },
  },
  {
    title: "AI-Powered Support",
    short_description: "Comprehensive tools for your learning journey",
    full_description:
      "Our AI platform provides personalized reading support, Pomodoro time management, task organization, and cognitive load monitoring - all designed specifically for neurodivergent individuals.",
    media: {
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1650844228078-6c3cb119abcd?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "AI-powered learning tools",
    },
    action: {
      label: "Explore Features",
      onClick: () => {
        const element = document.getElementById('ai-support');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
  },
  {
    title: "Research-Backed Methods",
    short_description: "Evidence-based approaches that work",
    full_description:
      "We use proven techniques like Orton-Gillingham reading instruction, Pomodoro time management, and evidence-based cognitive strategies. Our AI amplifies what research shows works.",
    media: {
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1625014053925-88bef4805a76?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Research-backed learning methods",
    },
    action: {
      label: "Learn More",
      onClick: () => {
        const element = document.getElementById('research-methods');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
  },
  {
    title: "Cognitive Strengths",
    short_description: "Discover your unique abilities",
    full_description:
      "Every neurodivergent mind has unique cognitive patterns and strengths. Our platform helps you identify and leverage these abilities for better learning outcomes and career success.",
    media: {
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1703801602658-ee1840697ef8?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Cognitive strengths visualization",
    },
    action: {
      label: "Discover Strengths",
      onClick: () => {
        const element = document.getElementById('cognitive-strengths');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
  },
  {
    title: "Mobile & Wearable Experience",
    short_description: "Coming soon - Take support everywhere",
    full_description:
      "Soon you'll be able to access TEKIMAX on your mobile device, smartwatch, and through smart peripherals. Stay tuned for our mobile app launch and wearable integration.",
    media: {
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1633102313141-8f2ab45c0202?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Mobile and wearable experience",
    },
    action: {
      label: "Join Waitlist",
      onClick: () => {
        const element = document.getElementById('coming-soon');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
  },
  {
    title: "Ready to Get Started?",
    short_description: "Begin your TEKIMAX journey",
    full_description:
      "You're all set to explore TEKIMAX! You now have access to personalized AI support, progress tracking, and all the tools to enhance your learning experience. Start exploring the features above!",
    media: {
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1558244661-d248897f7bc4?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Cognitive load management dashboard",
    },
  },
];

export function TodoConfig() {
  const [openMobile, setOpenMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem("feature_intro-demo-mobile") !== "true"
    }
    return true
  })

  // Ensure mobile onboarding opens automatically after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasCompleted = window.localStorage.getItem("feature_intro-demo-mobile") === "true"
      if (!hasCompleted) {
        setOpenMobile(true)
      }
    }
  }, [])

  const handleComplete = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem("feature_intro-demo-mobile", "true")
    }
    setOpenMobile(false)
  }

  const handleSkip = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem("feature_intro-demo-mobile", "true")
    }
    setOpenMobile(false)
  }

  const handleResetMobile = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem("feature_intro-demo-mobile")
    }
    setOpenMobile(true)
  }

  return (
    <div className="w-full space-y-8">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <h2 className="text-2xl font-semibold leading-none tracking-tight mb-4">
            Mobile Onboarding Demo
          </h2>
          <p className="text-muted-foreground mb-6">
            Experience our mobile-optimized feature introduction component.
            Click the reset button to restart the demo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 p-6 pt-0">
          <div className="flex flex-col">
            <div
              className={`flex flex-col gap-6 rounded-lg border-2 p-6 transition-colors ${
                !openMobile ? "border-muted bg-muted/50" : "border-primary"
              }`}
            >
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground">
                    (Mobile Optimized)
                  </p>
                  <h3 className="text-xl font-semibold">Mobile View</h3>
                </div>
                <button
                  onClick={handleResetMobile}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Start Demo
                </button>
              </div>
              
              <IntroDisclosure
                open={openMobile}
                setOpen={setOpenMobile}
                steps={steps}
                featureId="intro-demo-mobile"
                onComplete={handleComplete}
                onSkip={handleSkip}
                forceVariant="mobile"
              />
              
              <div className="text-sm text-muted-foreground">
                Status: {openMobile ? "Active" : "Completed/Skipped"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
