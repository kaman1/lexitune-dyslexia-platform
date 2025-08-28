"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Zap, Brain, Users, Gamepad2, Star, Sparkles, X, ChevronDown, Eye, Palette, Lightbulb, Target, BookOpen } from "lucide-react";
import { BackgroundLines } from "@/components/ui/background-lines";
import * as Select from "@radix-ui/react-select";
import ReCaptchaV3 from "@/components/recaptcha-v3";

const neurodivergentTypes = [
  {
    id: "asd",
    type: "Autism Spectrum Disorder",
    icon: Eye,
    superpower: "Pattern Recognition Master",
    description: "Exceptional at spotting patterns and details others miss",
    color: "bg-blue-50",
    border: "border-blue-200",
    accent: "text-blue-700",
    gradient: "from-blue-400 to-blue-600"
  },
  {
    id: "dyslexia",
    type: "Dyslexia",
    icon: Palette,
    superpower: "Big Picture Visionary",
    description: "Natural ability to see the bigger picture and think spatially",
    color: "bg-green-50",
    border: "border-green-200",
    accent: "text-green-700",
    gradient: "from-green-400 to-green-600"
  },
  {
    id: "adhd",
    type: "ADHD",
    icon: Lightbulb,
    superpower: "Creative Problem Solver",
    description: "Incredible creativity and ability to think outside the box",
    color: "bg-orange-50",
    border: "border-orange-200",
    accent: "text-orange-700",
    gradient: "from-orange-400 to-orange-600"
  },
  {
    id: "dyspraxia",
    type: "Dyspraxia",
    icon: Target,
    superpower: "Strategic Thinker",
    description: "Exceptional strategic thinking and empathetic problem-solving",
    color: "bg-purple-50",
    border: "border-purple-200",
    accent: "text-purple-700",
    gradient: "from-purple-400 to-purple-600"
  },
  {
    id: "dyscalculia",
    type: "Dyscalculia",
    icon: BookOpen,
    superpower: "Conceptual Genius",
    description: "Outstanding conceptual understanding and creative approaches",
    color: "bg-teal-50",
    border: "border-teal-200",
    accent: "text-teal-700",
    gradient: "from-teal-400 to-teal-600"
  }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    organization: "",
    neurodivergentType: "",
    interests: [] as string[],
    goals: "",
    experience: ""
  });

  const totalSteps = 4;

  const interests = [
    { id: "stem", label: "STEM Education", icon: Brain },
    { id: "ai", label: "AI & Technology", icon: Zap },
    { id: "accessibility", label: "Accessibility", icon: Users },
    { id: "gaming", label: "Educational Gaming", icon: Gamepad2 },
    { id: "research", label: "Research & Development", icon: Star },
    { id: "teaching", label: "Teaching & Learning", icon: Sparkles }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email;
      case 2:
        return formData.role;
      case 3:
        return true; // Optional fields
      case 4:
        return true; // Review step
      default:
        return false;
    }
  };

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Get reCAPTCHA token before submitting
      console.log('Checking reCAPTCHA availability...');
      let recaptchaToken = null;
      
      if (typeof window !== 'undefined') {
        console.log('Window available, checking executeRecaptcha function...');
        console.log('executeRecaptcha function exists:', !!(window as any).executeRecaptcha);
        
        if ((window as any).executeRecaptcha) {
          console.log('Executing reCAPTCHA...');
          recaptchaToken = await (window as any).executeRecaptcha();
          console.log('reCAPTCHA token generated:', !!recaptchaToken);
        }
        
        if (!recaptchaToken) {
          console.error('reCAPTCHA token generation failed');
          throw new Error('reCAPTCHA verification failed. Please refresh the page and try again.');
        }
      }
      
      console.log('Submitting form data:', formData);
      console.log('reCAPTCHA token length:', recaptchaToken?.length);
      
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error('Server returned invalid response');
      }

      console.log('Response data:', result);

      if (!response.ok) {
        throw new Error(result?.error || result?.message || `Server error: ${response.status}`);
      }

      console.log('Form submitted successfully:', result);
      
      // Show success dialog
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Form submission error:', error);
      alert(`Something went wrong: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDialogClose = () => {
    setShowSuccessDialog(false);
    // Redirect to home page after dialog closes
    setTimeout(() => {
      window.location.href = "/";
    }, 300);
  };

  const renderStepContent = () => {
    const fadeInClass = "animate-in fade-in-0 slide-in-from-right-4 duration-500";
    
    switch (currentStep) {
      case 1:
        return (
          <div className={`space-y-8 max-w-lg mx-auto ${fadeInClass}`}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white mb-4" style={{backgroundColor: '#333B68'}}>
                <Star className="h-4 w-4" />
                Welcome to TEKIMAX
              </div>
              <h2 className="text-4xl font-black tracking-tight mb-4" style={{color: '#333B68'}}>
                Let's get started! 👋
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                First, tell us your basic information so we can personalize your experience
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#333B68'}}>
                  What's your name? *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#333B68'}}>
                  Email address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-lg"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={`space-y-8 max-w-2xl mx-auto ${fadeInClass}`}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white mb-4" style={{backgroundColor: '#333B68'}}>
                <Users className="h-4 w-4" />
                Your Role
              </div>
              <h2 className="text-4xl font-black tracking-tight mb-4" style={{color: '#333B68'}}>
                Who are you? 🚀
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Select your role so we can personalize your TEKIMAX experience
              </p>
            </div>

            <div className="grid gap-4 max-w-2xl mx-auto">
              {[
                { 
                  id: "student", 
                  label: "Student", 
                  desc: "I'm a student looking for personalized learning", 
                  icon: "🎓",
                  gradient: "from-purple-400 to-purple-600"
                },
                { 
                  id: "parent", 
                  label: "Parent/Guardian", 
                  desc: "I want to support my child's learning journey", 
                  icon: "👨‍👩‍👧‍👦",
                  gradient: "from-green-400 to-green-600"
                },
                { 
                  id: "educator", 
                  label: "Teacher/Educator", 
                  desc: "I teach and want to help my students thrive", 
                  icon: "👩‍🏫",
                  gradient: "from-blue-400 to-blue-600"
                },
                { 
                  id: "principal", 
                  label: "Principal/Administrator", 
                  desc: "I lead a school or educational institution", 
                  icon: "🏫",
                  gradient: "from-indigo-400 to-indigo-600"
                },
                { 
                  id: "professional", 
                  label: "Industry Professional", 
                  desc: "I work in education technology or research", 
                  icon: "💼",
                  gradient: "from-orange-400 to-orange-600"
                },
                { 
                  id: "individual", 
                  label: "Individual Learner", 
                  desc: "I'm learning for personal development", 
                  icon: "🧠",
                  gradient: "from-teal-400 to-teal-600"
                }
              ].map((role) => (
                <button
                  key={role.id}
                  onClick={() => setFormData({...formData, role: role.id})}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left hover:shadow-xl hover:scale-[1.02] ${
                    formData.role === role.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg scale-[1.02]'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center text-2xl shadow-md`}>
                      {role.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-1" style={{color: '#333B68'}}>
                        {role.label}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {role.desc}
                      </p>
                    </div>
                    {formData.role === role.id && (
                      <div className="text-blue-500 animate-in zoom-in-50">
                        <Zap className="h-7 w-7" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className={`space-y-8 max-w-2xl mx-auto ${fadeInClass}`}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white mb-4" style={{backgroundColor: '#333B68'}}>
                <Brain className="h-4 w-4" />
                Personalization
              </div>
              <h2 className="text-4xl font-black tracking-tight mb-4" style={{color: '#333B68'}}>
                Tell us more about you ✨
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Help us personalize your AI learning experience
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium mb-4" style={{color: '#333B68'}}>
                  Organization (Optional)
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({...formData, organization: e.target.value})}
                  placeholder="School, company, or organization name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-4" style={{color: '#333B68'}}>
                  Neurodivergent Focus (Optional)
                </label>
                <Select.Root value={formData.neurodivergentType} onValueChange={(value) => setFormData({...formData, neurodivergentType: value})}>
                  <Select.Trigger className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 flex items-center justify-between bg-white hover:bg-gray-50">
                    <Select.Value placeholder="Select neurodivergent type (optional)" />
                    <Select.Icon>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 max-h-64">
                      <Select.Viewport className="p-1">
                        {neurodivergentTypes.map((type) => (
                          <Select.Item
                            key={type.id}
                            value={type.id}
                            className={`px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 outline-none flex items-center gap-3 ${type.color} ${type.border}`}
                          >
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${type.gradient} flex items-center justify-center flex-shrink-0`}>
                              <type.icon className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <Select.ItemText className={`font-medium ${type.accent}`}>
                                {type.type}
                              </Select.ItemText>
                              <p className="text-xs text-gray-600 truncate">
                                {type.superpower}
                              </p>
                            </div>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>

              <div>
                <label className="block text-sm font-medium mb-6" style={{color: '#333B68'}}>
                  Areas of Interest
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {interests.map((interest, index) => {
                    const Icon = interest.icon;
                    const isSelected = formData.interests.includes(interest.id);
                    
                    // Define gradient colors for vertical styling pattern
                    const gradientColors = [
                      'from-blue-400 to-blue-600',
                      'from-purple-400 to-purple-600', 
                      'from-green-400 to-green-600',
                      'from-orange-400 to-orange-600',
                      'from-teal-400 to-teal-600',
                      'from-pink-400 to-pink-600'
                    ];
                    
                    const backgroundColors = [
                      'bg-blue-50',
                      'bg-purple-50',
                      'bg-green-50', 
                      'bg-orange-50',
                      'bg-teal-50',
                      'bg-pink-50'
                    ];
                    
                    const borderColors = [
                      'border-blue-200',
                      'border-purple-200',
                      'border-green-200',
                      'border-orange-200', 
                      'border-teal-200',
                      'border-pink-200'
                    ];
                    
                    const textColors = [
                      'text-blue-700',
                      'text-purple-700',
                      'text-green-700',
                      'text-orange-700',
                      'text-teal-700', 
                      'text-pink-700'
                    ];
                    
                    const gradientClass = gradientColors[index % gradientColors.length];
                    const bgClass = backgroundColors[index % backgroundColors.length];
                    const borderClass = borderColors[index % borderColors.length];
                    const textClass = textColors[index % textColors.length];
                    
                    return (
                      <button
                        key={interest.id}
                        type="button"
                        onClick={() => handleInterestToggle(interest.id)}
                        className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl transform ${
                          isSelected
                            ? `${borderClass} ${bgClass} shadow-lg scale-105 ring-2 ring-offset-2 ring-blue-300`
                            : `border-gray-200 bg-white hover:${borderClass} hover:shadow-lg`
                        }`}
                        style={{
                          backdropFilter: 'blur(10px)',
                          boxShadow: isSelected ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 10px 25px -3px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        {/* Background gradient overlay when selected */}
                        {isSelected && (
                          <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-5 rounded-2xl`} />
                        )}
                        
                        <div className="relative z-10 text-center">
                          {/* Icon with gradient background */}
                          <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          
                          {/* Label */}
                          <p className={`font-bold text-sm transition-colors duration-300 ${
                            isSelected ? textClass : 'text-gray-700 group-hover:' + textClass
                          }`}>
                            {interest.label}
                          </p>
                          
                          {/* Selection indicator */}
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-in zoom-in-50 shadow-lg">
                              <Zap className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={`space-y-8 max-w-2xl mx-auto ${fadeInClass}`}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white mb-4" style={{backgroundColor: '#333B68'}}>
                <Sparkles className="h-4 w-4" />
                Almost There
              </div>
              <h2 className="text-4xl font-black tracking-tight mb-4" style={{color: '#333B68'}}>
                You're all set! 🎉
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Review your information and join our exclusive beta waitlist
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-xl mb-6" style={{color: '#333B68'}}>
                Your Profile Summary
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="text-gray-900">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="text-gray-900">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Role:</span>
                  <span className="text-gray-900 capitalize">{formData.role}</span>
                </div>
                {formData.organization && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Organization:</span>
                    <span className="text-gray-900">{formData.organization}</span>
                  </div>
                )}
                {formData.neurodivergentType && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Focus Area:</span>
                    <span className="text-gray-900">
                      {neurodivergentTypes.find(t => t.id === formData.neurodivergentType)?.type}
                    </span>
                  </div>
                )}
                {formData.interests.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700">Interests:</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.interests.map(id => {
                        const interest = interests.find(i => i.id === id);
                        return interest ? (
                          <span key={id} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {interest.label}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    Exclusive Beta Access
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">
                    You're joining a limited group who will receive periodic updates and get early access when the platform launches.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const SuccessDialog = () => {
    if (!showSuccessDialog) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden">
          <div className="flex h-[700px]">
            {/* Left Side - Congratulations Content */}
            <div className="w-1/2 p-8 flex flex-col justify-center relative">
              {/* Close Button */}
              <button
                onClick={handleDialogClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>

              <div className="text-left space-y-6">

                {/* Main Title */}
                <h1 className="text-4xl font-black tracking-tight mb-6" style={{color: '#333B68'}}>
                  Welcome to the Waitlist! 🎉
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md">
                  You have successfully joined our exclusive beta program. Here's what happens next:
                </p>

                {/* Next Steps */}
                <div className="space-y-4 text-left max-w-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm" style={{color: '#333B68'}}>
                        Periodic Updates
                      </p>
                      <p className="text-xs text-gray-600">
                        You'll receive progress updates via email
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm" style={{color: '#333B68'}}>
                        Account Creation
                      </p>
                      <p className="text-xs text-gray-600">
                        We'll create your account when ready
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm" style={{color: '#333B68'}}>
                        Early Access
                      </p>
                      <p className="text-xs text-gray-600">
                        Get first access to personalized AI learning
                      </p>
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <button
                  onClick={handleDialogClose}
                  className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 mt-8 w-auto"
                >
                  Return Home
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Side - Video */}
            <div className="w-1/2 bg-gray-900 relative overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source
                  src="https://tekimaxvideos.blob.core.windows.net/videos/success.mp4"
                  type="video/mp4"
                />
              </video>
              
              {/* Overlay for better text readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Success Dialog */}
      <SuccessDialog />
      
      <div className="min-h-screen flex">
      {/* Left Side - Form Content */}
      <div className="w-full lg:w-[70%] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/tekimax-logo-darkRGB-1.png"
                alt="TEKIMAX"
                width={120}
                height={36}
                className="object-contain"
              />

            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>


        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            {currentStep === totalSteps ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !canProceed()}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Joining Waitlist...
                  </>
                ) : (
                  <>
                    Join Waitlist
                    <Star className="h-4 w-4" />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Visual Content */}
      <div className="hidden lg:block lg:w-[30%] relative bg-gradient-to-br from-green-100 to-blue-100">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Floating Card with step-based animation */}
            <div 
              className="absolute transition-all duration-700 ease-in-out transform"
              style={{
                transform: `translateY(${Math.sin(currentStep * 0.5) * 20}px) rotate(${currentStep * 2 - 4}deg)`,
                top: `${20 + currentStep * 5}%`,
                left: `${15 + Math.cos(currentStep * 0.3) * 8}%`
              }}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-56 border border-gray-200 hover:shadow-3xl transition-shadow duration-300">
                {/* Dynamic image based on step and selection */}
                <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  {currentStep === 1 && (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <Star className="h-10 w-10 text-white" />
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                      <Brain className="h-10 w-10 text-white" />
                    </div>
                  )}
                  {currentStep === 4 && formData.neurodivergentType && (
                    <div className={`w-full h-full bg-gradient-to-br ${neurodivergentTypes.find(t => t.id === formData.neurodivergentType)?.gradient || 'from-yellow-400 to-orange-500'} flex items-center justify-center`}>
                      {(() => {
                        const selectedType = neurodivergentTypes.find(t => t.id === formData.neurodivergentType);
                        const IconComponent = selectedType?.icon || Sparkles;
                        return <IconComponent className="h-10 w-10 text-white" />;
                      })()}
                    </div>
                  )}
                  {currentStep === 4 && !formData.neurodivergentType && (
                    <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                      <Sparkles className="h-10 w-10 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <h4 className="font-bold text-lg mb-2" style={{color: '#333B68'}}>
                    {currentStep === 1 && "Welcome!"}
                    {currentStep === 2 && (formData.role ? `${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}` : "Choose Your Role")}
                    {currentStep === 3 && "Personalize"}
                    {currentStep === 4 && (formData.name || "Ready to Join!")}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {currentStep === 1 && "Let's get started"}
                    {currentStep === 2 && "Who are you?"}
                    {currentStep === 3 && "Tell us more"}
                    {currentStep === 4 && "Review & join"}
                  </p>
                  <div className="text-xs text-blue-600 font-medium">
                    {currentStep === 1 && "Step 1 of 4"}
                    {currentStep === 2 && "Step 2 of 4"}
                    {currentStep === 3 && "Step 3 of 4"}
                    {currentStep === 4 && (formData.neurodivergentType 
                      ? neurodivergentTypes.find(t => t.id === formData.neurodivergentType)?.superpower
                      : "Exclusive Beta Access"
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Background decorative elements with step-based animation */}
            <div 
              className="absolute w-16 h-16 bg-blue-200 rounded-full opacity-50 transition-all duration-1000"
              style={{
                top: `${10 + currentStep * 5}%`,
                right: `${8 + currentStep * 2}%`,
                animationDelay: `${currentStep * 200}ms`
              }}
            ></div>
            <div 
              className="absolute w-12 h-12 bg-green-200 rounded-full opacity-40 transition-all duration-1000"
              style={{
                bottom: `${20 - currentStep * 2}%`,
                left: `${6 + currentStep * 3}%`,
                animationDelay: `${currentStep * 400}ms`
              }}
            ></div>
            <div 
              className="absolute w-8 h-8 bg-purple-200 rounded-full opacity-30 transition-all duration-1000"
              style={{
                top: "50%",
                left: `${4 + currentStep * 2}%`,
                animationDelay: `${currentStep * 300}ms`
              }}
            ></div>
            
            {/* Progress dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-2">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index + 1 <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* reCAPTCHA v3 - Invisible */}
    <ReCaptchaV3
      siteKey="6LeBEZkrAAAAAKqGBPNay2qveeQp2KDWo9u8Ay-0"
      onVerify={(token) => setRecaptchaToken(token)}
      onError={() => console.error('reCAPTCHA failed')}
      action="onboarding_submit"
    />
    </>
  );
}

