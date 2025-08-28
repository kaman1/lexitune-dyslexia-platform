"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Mail, User, Building, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReCaptchaV3 from "@/components/recaptcha-v3";

interface ProgressUpdatesFormData {
  name: string;
  email: string;
  organization?: string;
  role: string;
  interests: string[];
  message?: string;
}

interface ProgressUpdatesDialogProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showButton?: boolean;
}

const roleOptions = [
  { value: "student", label: "Student" },
  { value: "parent", label: "Parent/Guardian" },
  { value: "educator", label: "Teacher/Educator" },
  { value: "principal", label: "Principal/Administrator" },
  { value: "professional", label: "Industry Professional" },
  { value: "individual", label: "Individual Learner" },
  { value: "researcher", label: "Researcher" },
  { value: "investor", label: "Investor" },
  { value: "other", label: "Other" }
];

const interestOptions = [
  { value: "steam", label: "STEAM Education" },
  { value: "ai", label: "AI & Technology" },
  { value: "accessibility", label: "Accessibility" },
  { value: "gaming", label: "Educational Gaming" },
  { value: "research", label: "Research & Development" },
  { value: "teaching", label: "Teaching & Learning" },
  { value: "defense", label: "Defense Applications" },
  { value: "commercial", label: "Commercial Applications" }
];

export function ProgressUpdatesDialog({ isOpen: externalIsOpen, onOpenChange: externalOnOpenChange, showButton = true }: ProgressUpdatesDialogProps) {
  const [internalIsOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProgressUpdatesFormData>({
    name: "",
    email: "",
    organization: "",
    role: "",
    interests: [],
    message: ""
  });

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const handleOpenChange = (open: boolean) => {
    if (externalOnOpenChange) {
      externalOnOpenChange(open);
    } else {
      setIsOpen(open);
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
    if (!formData.name || !formData.email || !formData.role) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Get reCAPTCHA token
      let recaptchaToken = null;
      
      if (typeof window !== 'undefined' && (window as any).executeRecaptcha) {
        recaptchaToken = await (window as any).executeRecaptcha();
        
        if (!recaptchaToken) {
          throw new Error('reCAPTCHA verification failed. Please refresh and try again.');
        }
      }
      
      const response = await fetch('/api/submit-progress-updates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || result?.message || `Server error: ${response.status}`);
      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsOpen(false);
        setFormData({
          name: "",
          email: "",
          organization: "",
          role: "",
          interests: [],
          message: ""
        });
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      alert(`Something went wrong: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = formData.name && formData.email && formData.role;

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      {showButton && (
        <Dialog.Trigger asChild>
          <Button 
            variant="outline" 
            className="w-full bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50 px-3 py-2.5 rounded-2xl text-xs md:text-sm font-medium transition-colors duration-200"
            onClick={() => console.log('Progress Updates Dialog button clicked!')}
          >
            Join Progress Updates
          </Button>
        </Dialog.Trigger>
      )}
      
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50" />
        <Dialog.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-right-1/2 data-[state=open]:slide-in-from-right-1/2 fixed right-0 top-0 z-50 h-full w-full sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-2/5 bg-white shadow-lg transition ease-in-out duration-500 p-0">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <Dialog.Title className="text-xl font-semibold" style={{color: '#333B68'}}>
                Join Progress Updates
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-600 mt-2">
                Stay updated on our latest developments and get early access to new features.
              </Dialog.Description>
            </div>

            {/* Form Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {!showSuccess ? (
                <div className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium" style={{color: '#333B68'}}>
                      Full Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your full name"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium" style={{color: '#333B68'}}>
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your.email@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Organization */}
                  <div className="space-y-2">
                    <Label htmlFor="organization" className="text-sm font-medium" style={{color: '#333B68'}}>
                      Organization (Optional)
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="organization"
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({...formData, organization: e.target.value})}
                        placeholder="School, company, or organization"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm font-medium" style={{color: '#333B68'}}>
                      Your Role *
                    </Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Interests */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium" style={{color: '#333B68'}}>
                      Areas of Interest (Optional)
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {interestOptions.map((interest) => (
                        <Button
                          key={interest.value}
                          type="button"
                          variant={formData.interests.includes(interest.value) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleInterestToggle(interest.value)}
                          className="h-8 text-xs"
                        >
                          {interest.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium" style={{color: '#333B68'}}>
                      Additional Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us what you're most interested in or any specific questions..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold" style={{color: '#333B68'}}>
                      Successfully Joined!
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      You'll receive periodic updates on our progress.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {!showSuccess && (
              <div className="p-6 border-t border-gray-200">
                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Join Updates
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Close button */}
            <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>

      {/* reCAPTCHA v3 - Invisible */}
      <ReCaptchaV3
        siteKey="6LeBEZkrAAAAAKqGBPNay2qveeQp2KDWo9u8Ay-0"
        onVerify={(token) => setRecaptchaToken(token)}
        onError={() => console.error('reCAPTCHA failed')}
        action="progress_updates_submit"
      />
    </Dialog.Root>
  );
}