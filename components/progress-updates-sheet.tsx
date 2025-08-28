"use client";

import { useState } from "react";
import { X, Mail, User, Building, Send, CheckCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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

export function ProgressUpdatesSheet() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    console.log('ProgressUpdatesSheet - Open state changed:', open);
    setIsOpen(open);
  };
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
    <>
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50 px-3 py-2.5 rounded-2xl text-xs md:text-sm font-medium transition-colors duration-200"
            onClick={() => console.log('Progress Updates button clicked!')}
          >
            Join Progress Updates
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-2/5 p-0">
          <div className="h-full flex flex-col">
            {/* Header */}
            <SheetHeader className="p-6 border-b border-gray-200">
              <SheetTitle className="text-xl font-semibold" style={{color: '#333B68'}}>
                Join Progress Updates
              </SheetTitle>
              <p className="text-sm text-gray-600 mt-2">
                Stay updated on our latest developments and get early access to new features.
              </p>
            </SheetHeader>

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
          </div>
        </SheetContent>
      </Sheet>

      {/* reCAPTCHA v3 - Invisible */}
      <ReCaptchaV3
        siteKey="6LeBEZkrAAAAAKqGBPNay2qveeQp2KDWo9u8Ay-0"
        onVerify={(token) => setRecaptchaToken(token)}
        onError={() => console.error('reCAPTCHA failed')}
        action="progress_updates_submit"
      />
    </>
  );
} 