"use client";

import { useEffect, useState } from "react";
import IntroDisclosure from "@/components/ui/intro-disclosure";
import { toast } from "sonner";

const onboardingSteps = [
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

export function TekimaxOnboarding() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen the onboarding
    const hasSeenOnboarding = localStorage.getItem("tekimax-onboarding-completed");
    
    if (!hasSeenOnboarding) {
      // Show onboarding after a short delay to let the page load
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem("tekimax-onboarding-completed", "true");
    toast.success("Welcome to TEKIMAX! Your onboarding is complete.");
    setOpen(false);
  };

  const handleSkip = () => {
    localStorage.setItem("tekimax-onboarding-completed", "true");
    toast.info("Onboarding skipped. You can restart it anytime from your dashboard.");
    setOpen(false);
  };

  const handleResetOnboarding = () => {
    localStorage.removeItem("tekimax-onboarding-completed");
    setOpen(true);
    toast.success("Onboarding reset! Welcome back.");
  };

  return (
    <>
      {/* Hidden button to reset onboarding for testing */}
      <button
        onClick={handleResetOnboarding}
        className="fixed bottom-4 right-4 z-50 bg-gray-500 text-white px-3 py-3 rounded-full text-sm opacity-50 hover:opacity-100 transition-opacity"
        title="Reset Onboarding (for testing)"
      >
        Reset Tour
      </button>

      <IntroDisclosure
        open={open}
        setOpen={setOpen}
        steps={onboardingSteps}
        featureId="tekimax-onboarding"
        showProgressBar={true}
        onComplete={handleComplete}
        onSkip={handleSkip}
      />
    </>
  );
}
