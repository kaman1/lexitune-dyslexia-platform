"use client";
import * as React from "react";
import { ArrowLeft, BookOpen, Users, Target, BarChart3, Lightbulb, CheckCircle, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

// Research findings and methodology
const researchData = {
  study: {
    title: "Designing Videos With and for Adults With ADHD for an Online Intervention",
    authors: "Flobak, E., Nordby, E.S., Guribye, F., Kenter, R., Nordgreen, T., Lundervold, A.J.",
    journal: "JMIR Mental Health",
    year: "2021",
    doi: "10.2196/30292",
    pmid: "34519666"
  },
  methodology: {
    participants: "12 adults with ADHD, 2 clinicians, 2 research assistants",
    design: "Participatory design study with thematic analysis",
    evaluation: "109 participants in clinical trial, 7 in-depth interviews",
    approach: "Co-creation of video vignettes based on real experiences"
  },
  findings: [
    {
      title: "Participatory Design Success",
      description: "Videos co-created with adults with ADHD showed higher engagement and relevance compared to professionally produced content.",
      icon: Users,
      color: "bg-blue-50 text-blue-700"
    },
    {
      title: "Real-World Application",
      description: "Video vignettes based on actual experiences were more effective than generic educational content.",
      icon: Target,
      color: "bg-green-50 text-green-700"
    },
    {
      title: "Therapeutic Content Adaptation",
      description: "Successfully navigated between therapeutic principles and participants' experiential perspectives.",
      icon: Lightbulb,
      color: "bg-yellow-50 text-yellow-700"
    },
    {
      title: "Clinical Trial Validation",
      description: "Intervention showed positive outcomes in a randomized controlled trial with 109 participants.",
      icon: BarChart3,
      color: "bg-purple-50 text-purple-700"
    }
  ],
  techniques: [
    "Video vignettes based on real experiences",
    "Participatory design with target audience",
    "Thematic analysis of feedback",
    "Clinical trial validation",
    "Co-creation with clinicians and researchers",
    "Adaptive content based on user feedback"
  ]
};

// Accordion component
const AccordionItem = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white hover:bg-gray-50 text-gray-900 px-6 py-4 transition-all duration-300 flex items-center justify-between text-left"
      >
        <span className="font-medium">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default function ResearchPage() {
  const router = useRouter();

  const goBackToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-slate-50 to-gray-50 py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={goBackToDashboard}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 hover:scale-105 transition-all duration-300 rounded-xl mr-4 shadow-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </button>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Research & Methodology
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Evidence-based approach to ADHD video interventions through participatory design and clinical validation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                Peer-Reviewed Study
              </span>
              <span className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                Clinical Trial
              </span>
              <span className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                Evidence-Based
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="space-y-8">
          {/* Study Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Research Study</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Study Title</h3>
                <p className="text-gray-700">{researchData.study.title}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Authors</h3>
                <p className="text-gray-700">{researchData.study.authors}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Journal</h3>
                  <p className="text-gray-700">{researchData.study.journal}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Year</h3>
                  <p className="text-gray-700">{researchData.study.year}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">DOI</h3>
                  <a 
                    href={`https://doi.org/${researchData.study.doi}`} 
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {researchData.study.doi}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Methodology */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Methodology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Participants</h3>
                <p className="text-gray-700">{researchData.methodology.participants}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Design Approach</h3>
                <p className="text-gray-700">{researchData.methodology.design}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Evaluation</h3>
                <p className="text-gray-700">{researchData.methodology.evaluation}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Core Approach</h3>
                <p className="text-gray-700">{researchData.methodology.approach}</p>
              </div>
            </div>
          </div>

          {/* Key Findings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Findings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {researchData.findings.map((finding, index) => (
                <div key={index} className="p-6 rounded-xl border border-gray-100 bg-gray-50">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${finding.color}`}>
                      <finding.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{finding.title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{finding.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Techniques Used */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Techniques & Methods</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {researchData.techniques.map((technique, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{technique}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <AccordionItem title="What is participatory design?">
                <p className="text-gray-700 leading-relaxed">
                  Participatory design involves co-creating solutions with the target audience. In this study, adults with ADHD were actively involved in designing video interventions, ensuring the content is relevant, authentic, and addresses real-world challenges they face.
                </p>
              </AccordionItem>
              
              <AccordionItem title="How was the research validated?">
                <p className="text-gray-700 leading-relaxed">
                  The research was validated through a clinical trial with 109 participants, including 7 in-depth interviews. The study used thematic analysis to evaluate effectiveness and engagement, with results published in JMIR Mental Health, a peer-reviewed journal.
                </p>
              </AccordionItem>
              
              <AccordionItem title="What makes these interventions effective?">
                <p className="text-gray-700 leading-relaxed">
                  The interventions are effective because they're based on real experiences, co-created with the target audience, and validated through clinical trials. They address specific challenges like procrastination, stress management, and time management in authentic, relatable ways.
                </p>
              </AccordionItem>
              
              <AccordionItem title="How do these videos differ from traditional content?">
                <p className="text-gray-700 leading-relaxed">
                  Unlike traditional educational content, these videos are based on actual experiences shared by adults with ADHD. They show realistic scenarios and practical solutions rather than generic advice, making them more engaging and applicable to real-life situations.
                </p>
              </AccordionItem>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience Evidence-Based Interventions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Explore our research-backed video interventions designed specifically for adults with ADHD, featuring participatory design and clinical validation.
            </p>
            <button
              onClick={() => router.push('/videos')}
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white hover:bg-opacity-90 hover:scale-105 hover:shadow-lg transition-all duration-300 rounded-xl transform"
              style={{ backgroundColor: '#2563EB' }}
            >
              View Video Interventions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
