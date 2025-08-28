"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, Star, Sparkles, ArrowRight, Mail, Calendar } from "lucide-react";
import { BackgroundLines } from "@/components/ui/background-lines";

export default function OnboardingSuccessPage() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Success Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="max-w-md text-center space-y-8">
          {/* Success Icon */}
          <div className="relative">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            {showConfetti && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-yellow-500 animate-pulse" />
              </div>
            )}
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold" style={{color: '#333B68'}}>
              Welcome to TEKIMAX! 🎉
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Congratulations! You've successfully secured your spot in our exclusive beta program. 
              Your account has been created and you're now part of a select group of pioneering learners.
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-xl p-6 text-left">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2" style={{color: '#333B68'}}>
              <Star className="h-5 w-5 text-blue-600" />
              What Happens Next?
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium text-sm" style={{color: '#333B68'}}>
                    Email Confirmation
                  </p>
                  <p className="text-xs text-gray-600">
                    Check your inbox for your welcome email with account details
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium text-sm" style={{color: '#333B68'}}>
                    Beta Launch Notification
                  </p>
                  <p className="text-xs text-gray-600">
                    We'll notify you when your personalized learning environment is ready
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium text-sm" style={{color: '#333B68'}}>
                    Early Access
                  </p>
                  <p className="text-xs text-gray-600">
                    Get first access to our AI-powered learning platform
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Beta Benefits */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm font-medium text-yellow-800 mb-2">
                  Exclusive Beta Benefits
                </p>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>• Free access to all premium features</li>
                  <li>• Direct input on product development</li>
                  <li>• Priority customer support</li>
                  <li>• Lifetime beta member badge</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Return to Homepage
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <div className="flex gap-3">
              <button
                onClick={() => window.open('mailto:hello@tekimax.com', '_blank')}
                className="flex-1 bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <Mail className="h-4 w-4" />
                Contact Us
              </button>
              
              <button
                onClick={() => window.open('https://calendly.com/tekimax', '_blank')}
                className="flex-1 bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <Calendar className="h-4 w-4" />
                Schedule Call
              </button>
            </div>
          </div>

          {/* Beta ID */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Beta Member ID: <span className="font-mono">TKX-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Visual Content */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <BackgroundLines 
          className="absolute inset-0 bg-gradient-to-br from-green-900 to-blue-900"
          svgOptions={{ duration: 20 }}
        >
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-center text-white space-y-8">
              {/* Success Illustration */}
              <div className="relative w-40 h-40 mx-auto">
                <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-white/20 rounded-full animate-pulse delay-75"></div>
                <div className="absolute inset-8 bg-white/30 rounded-full animate-pulse delay-150"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="h-16 w-16 text-white" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">
                  You're In! 🚀
                </h2>
                
                <p className="text-white/90 max-w-md mx-auto">
                  Welcome to the future of neurodivergent education. You're now part of an exclusive 
                  community that will help shape how AI-powered learning works for everyone.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    1,247
                  </div>
                  <div className="text-sm text-white/80">
                    Beta Members
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    5
                  </div>
                  <div className="text-sm text-white/80">
                    Learning Types
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <p className="text-xs text-white/60 italic">
                  "The best way to predict the future is to create it together"
                </p>
              </div>
            </div>
          </div>
        </BackgroundLines>
      </div>
    </div>
  );
}