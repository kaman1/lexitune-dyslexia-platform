"use client";

import { useState } from "react";
import { X, Mail, User, Building, Send, CheckCircle, Handshake } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReCaptchaV3 from "@/components/recaptcha-v3";

interface CollaborationFormData {
  name: string;
  email: string;
  organization?: string;
  collaborationType: string;
  details?: string;
}

const collaborationTypes = [
  { value: "sbir", label: "SBIR/STTR Partnership" },
  { value: "research", label: "Research Collaboration" },
  { value: "strategic", label: "Strategic Partnership" },
  { value: "technology", label: "Technology Integration" },
  { value: "consulting", label: "Consulting Services" },
  { value: "licensing", label: "Technology Licensing" },
  { value: "other", label: "Other" }
];

export function CollaborationSheet() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    console.log('CollaborationSheet - Open state changed:', open);
    setIsOpen(open);
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState<CollaborationFormData>({
    name: "",
    email: "",
    organization: "",
    collaborationType: "",
    details: ""
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.collaborationType) {
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
      
      const response = await fetch('/api/submit-collaboration', {
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
          collaborationType: "",
          details: ""
        });
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      alert(`Something went wrong: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = formData.name && formData.email && formData.collaborationType;

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50 px-3 py-2.5 rounded-2xl text-xs md:text-sm font-medium transition-colors duration-200"
            onClick={() => console.log('Collaboration button clicked!')}
          >
            <Handshake className="h-4 w-4 mr-2" />
            Partner With Us
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-2/5 p-0">
          <div className="h-full flex flex-col">
            {/* Header */}
            <SheetHeader className="p-6 border-b border-gray-200">
              <SheetTitle className="text-xl font-semibold" style={{color: '#333B68'}}>
                <Handshake className="h-5 w-5 inline-block mr-2" />
                Partnership Collaboration
              </SheetTitle>
              <p className="text-sm text-gray-600 mt-2">
                Let's explore how we can work together to advance innovative educational technologies.
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
                        placeholder="Company, agency, or institution"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Collaboration Type */}
                  <div className="space-y-2">
                    <Label htmlFor="collaborationType" className="text-sm font-medium" style={{color: '#333B68'}}>
                      Collaboration Type *
                    </Label>
                    <Select value={formData.collaborationType} onValueChange={(value) => setFormData({...formData, collaborationType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select collaboration type" />
                      </SelectTrigger>
                      <SelectContent>
                        {collaborationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <Label htmlFor="details" className="text-sm font-medium" style={{color: '#333B68'}}>
                      Project Details (Optional)
                    </Label>
                    <Textarea
                      id="details"
                      value={formData.details}
                      onChange={(e) => setFormData({...formData, details: e.target.value})}
                      placeholder="Tell us about your project, partnership goals, or specific collaboration interests..."
                      className="min-h-[100px]"
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
                      Partnership Request Sent!
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Our team will review your collaboration proposal and get back to you soon.
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
                      Submit Partnership Request
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
        action="collaboration_submit"
      />
    </>
  );
}