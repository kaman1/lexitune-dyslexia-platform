"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { TopNavigation } from "@/components/top-navigation";
import { FooterWaitlist } from "@/components/footer-waitlist";

function ContactContent() {
  const searchParams = useSearchParams();
  const inquiry = searchParams.get("inquiry");

  return (
    <>
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-zinc-900 text-white py-24 md:py-32 relative overflow-hidden min-h-[40vh] flex items-center">
          {/* Top right pattern */}
          <div className="absolute top-0 right-0 w-80 h-60 overflow-hidden z-10 pointer-events-none">
            <div className="relative w-full h-full">
              <div className="absolute top-4 right-24 w-16 h-16 bg-gray-700 opacity-10" />
              <div className="absolute top-20 right-40 w-14 h-14 bg-gray-700 opacity-10" />
              <div className="absolute top-28 right-8 w-12 h-12 bg-gray-700 opacity-10" />
            </div>
          </div>

          {/* Bottom left pattern */}
          <div className="absolute bottom-0 left-0 w-80 h-60 overflow-hidden z-10 pointer-events-none">
            <div className="relative w-full h-full">
              <div className="absolute bottom-4 left-24 w-16 h-16 bg-gray-700 opacity-10" />
              <div className="absolute bottom-20 left-40 w-14 h-14 bg-gray-700 opacity-10" />
              <div className="absolute bottom-28 left-8 w-12 h-12 bg-gray-700 opacity-10" />
            </div>
          </div>

          <div className="container px-4 relative z-20">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-medium mb-6">
                Contact Us
              </h1>
              <p className="text-zinc-300 text-lg mb-8">
                Get in touch with our team to discuss your AI needs and how we
                can help your business implement effective solutions.
              </p>
              {inquiry === "local_government" && (
                <div className="bg-zinc-800 p-4 rounded-lg inline-block mt-4">
                  <p className="text-zinc-300 text-sm">
                    You're inquiring about{" "}
                    <span className="font-medium text-white">
                      Local Government Solutions
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          {/* Top left pattern */}
          <div className="absolute top-0 left-0 w-80 h-60 overflow-hidden">
            <div className="relative w-full h-full">
              <div className="absolute top-4 left-24 w-16 h-16 bg-gray-200 opacity-50" />
              <div className="absolute top-20 left-40 w-14 h-14 bg-gray-200 opacity-40" />
              <div className="absolute top-28 left-8 w-12 h-12 bg-gray-300 opacity-30" />
            </div>
          </div>

          {/* Bottom right pattern */}
          <div className="absolute bottom-0 right-0 w-80 h-60 overflow-hidden">
            <div className="relative w-full h-full">
              <div className="absolute bottom-4 right-24 w-16 h-16 bg-gray-200 opacity-50" />
              <div className="absolute bottom-20 right-40 w-14 h-14 bg-gray-200 opacity-40" />
              <div className="absolute bottom-28 right-8 w-12 h-12 bg-gray-300 opacity-30" />
            </div>
          </div>

          <div className="container px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-1">
                  <h2 className="text-xl font-medium mb-6">Get in Touch</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Email</h3>
                      <p className="text-sm text-zinc-600">info@tekimax.com</p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Office</h3>
                      <p className="text-sm text-zinc-600">
                        TEKIMAX – 2ENOVATE LLC DBA TEKIMAX
                        <br />
                        1120 South Fwy
                        <br />
                        Fort Worth, TX 76104
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="bg-zinc-50 border border-zinc-200 p-8 text-center rounded-lg">
                    <h3 className="text-xl font-medium mb-4">Contact Form</h3>
                    <p className="text-zinc-600 mb-6">
                      Fill out our contact form to get in touch with our team.
                      We'll respond to your inquiry as soon as possible.
                    </p>
                    <button
                      onClick={() =>
                        window.open(
                          "https://40psmz.share-na2.hsforms.com/2tGmqFaWLQya3-TY9faCxig",
                          "_blank"
                        )
                      }
                      className="bg-black text-white px-6 py-3 rounded-md hover:bg-zinc-800 transition-colors font-medium"
                    >
                      Open Contact Form
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopNavigation />
      <Suspense
        fallback={
          <div className="flex-grow flex items-center justify-center">
            <div className="p-4 text-center">
              <div className="animate-pulse h-8 w-40 bg-gray-200 rounded mx-auto mb-8" />
              <div className="animate-pulse h-40 w-full max-w-md bg-gray-100 rounded mx-auto" />
            </div>
          </div>
        }
      >
        <ContactContent />
      </Suspense>
      <FooterWaitlist />
    </div>
  );
}
