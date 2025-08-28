import Link from "next/link";
import { ArrowLeft, Eye, Ear, Hand, Brain, Shield, Scale, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <img
              src="/images/tekimax-logo.png"
              alt="TEKIMAX"
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Accessibility Statement
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              TEKIMAX is committed to ensuring digital accessibility and inclusivity for all users, including those with disabilities.
            </p>
          </div>

          {/* Quick Access Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">Visual</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Ear className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">Auditory</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Hand className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">Motor</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Brain className="h-6 w-6 text-orange-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">Cognitive</p>
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Our Commitment */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Commitment to Accessibility</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                TEKIMAX (2ENOVATE LLC DBA: TEKIMAX) is committed to providing an inclusive digital experience for all users, regardless of ability or disability. We believe that accessibility is not just a legal requirement but a fundamental aspect of creating technology that serves everyone.
              </p>
              <p className="mb-4">
                As a company focused on empowering neurodivergent students in STEM education, we understand firsthand the importance of designing inclusive technology that accommodates diverse learning styles and accessibility needs.
              </p>
            </div>
          </section>

          {/* Standards Compliance */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Standards & Compliance</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">ADA Compliance</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      We strive to comply with the Americans with Disabilities Act (ADA) standards for digital accessibility, ensuring our website and services are accessible to users with disabilities.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Scale className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">WCAG 2.1 Guidelines</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Our website aims to conform to Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, providing a baseline for accessible web content.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Accessibility Features */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Accessibility Features</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Visual Accessibility</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• High contrast color schemes for better readability</li>
                    <li>• Scalable text and interface elements</li>
                    <li>• Alternative text for images and media</li>
                    <li>• Keyboard navigation support</li>
                    <li>• Screen reader compatibility</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Interactive Elements</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Focus indicators for keyboard navigation</li>
                    <li>• Descriptive link text and button labels</li>
                    <li>• Consistent navigation structure</li>
                    <li>• Form labels and error messages</li>
                    <li>• Timeout warnings and extensions</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Neurodivergent Inclusivity */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Neurodivergent Inclusivity</h2>
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Designed for Diverse Minds</h3>
                  <div className="text-gray-700 space-y-3">
                    <p>
                      As advocates for neurodivergent education, we incorporate design principles that support users with:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <ul className="space-y-2 text-sm">
                        <li>• ADHD - Clear visual hierarchy and minimal distractions</li>
                        <li>• Autism - Predictable navigation and sensory considerations</li>
                        <li>• Dyslexia - Readable fonts and text spacing</li>
                      </ul>
                      <ul className="space-y-2 text-sm">
                        <li>• Processing differences - Multiple ways to access information</li>
                        <li>• Executive function challenges - Clear task flows</li>
                        <li>• Sensory sensitivities - Reduced motion options</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Current Status */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Status & Ongoing Efforts</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                We continuously work to improve the accessibility of our website and digital products. Our ongoing efforts include:
              </p>
              <ul className="mb-6 space-y-2">
                <li>• Regular accessibility audits and testing</li>
                <li>• User feedback integration from the disability community</li>
                <li>• Staff training on accessibility best practices</li>
                <li>• Collaboration with accessibility consultants and experts</li>
                <li>• Implementation of assistive technology compatibility</li>
              </ul>
              <p>
                <strong>Last Updated:</strong> January 2025
              </p>
            </div>
          </section>

          {/* Legal Framework */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Legal Framework & Protection</h2>
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Americans with Disabilities Act (ADA)</h3>
              <p className="text-gray-700 mb-6">
                The ADA prohibits discrimination against individuals with disabilities in all areas of public life, including digital spaces. Title III of the ADA applies to places of public accommodation, which courts have increasingly interpreted to include websites and digital services.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">Section 508 Compliance</h3>
              <p className="text-gray-700 mb-6">
                As a government contractor, TEKIMAX adheres to Section 508 of the Rehabilitation Act, which requires federal agencies and contractors to make their electronic and information technology accessible to people with disabilities.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">Litigation Prevention</h3>
              <p className="text-gray-700">
                This accessibility statement serves as evidence of our good faith efforts to provide accessible digital experiences and may help mitigate potential legal risks related to digital accessibility lawsuits.
              </p>
            </div>
          </section>

          {/* Feedback & Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Feedback & Support</h2>
            <Card className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">We Value Your Input</h3>
                <p className="text-gray-600">
                  Your feedback helps us improve accessibility for everyone.
                </p>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  If you encounter any accessibility barriers while using our website or services, please contact us:
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-3">
                    <div>
                      <strong>Email:</strong>{" "}
                      <a href="mailto:accessibility@tekimax.com" className="text-blue-600 hover:text-blue-800 underline">
                        accessibility@tekimax.com
                      </a>
                    </div>
                    <div>
                      <strong>Mail:</strong><br />
                      TEKIMAX Accessibility Team<br />
                      1120 South Fwy<br />
                      Fort Worth, TX 76104
                    </div>
                  </div>
                </div>

                <p className="text-sm">
                  When reporting accessibility issues, please include:
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Your operating system and browser version</li>
                  <li>• Assistive technology being used (if applicable)</li>
                  <li>• Specific page or feature where the issue occurred</li>
                  <li>• Description of the accessibility barrier encountered</li>
                </ul>
              </div>
            </Card>
          </section>

          {/* Third-Party Content */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Content</h2>
            <div className="text-gray-700">
              <p className="mb-4">
                Some content on our website may be provided by third-party services. While we strive to ensure all content meets accessibility standards, we may have limited control over the accessibility of third-party content. We work with our partners to address accessibility concerns as they arise.
              </p>
            </div>
          </section>

        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-16 border-t mt-16 gap-4 max-w-4xl mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Homepage
          </Link>
          <div className="flex gap-4 text-sm">
            <Link href="/privacy" className="text-zinc-600 hover:text-zinc-900">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-zinc-600 hover:text-zinc-900">
              Terms of Service
            </Link>
            <Link href="/disclaimer" className="text-zinc-600 hover:text-zinc-900">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}