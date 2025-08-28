"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import Image from "next/image";

export function PartnersSlider() {
  return (
    <section className="bg-gray-50/90 pb-2">
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-44 md:border-r md:border-gray-200 md:pr-6">
            <p className="text-center md:text-end text-sm font-medium text-gray-600">
              Powered by
            </p>
          </div>
          <div className="relative py-4 md:py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider
              speedOnHover={20}
              speed={40}
              gap={80}
              className="items-center"
            >

              <div className="flex items-center">
                <Image
                  className="mx-auto h-8 md:h-16 w-auto"
                  src="/microsoft-logo.png"
                  alt="Microsoft for Startups Logo"
                  height={60}
                  width={170}
                />
              </div>

              <div className="flex items-center">
                <Image
                  className="mx-auto h-6 md:h-10 w-auto"
                  src="/meta-logo.png"
                  alt="Meta Logo"
                  height={40}
                  width={120}
                />
              </div>

              <div className="flex items-center">
                <Image
                  className="mx-auto h-6 md:h-10 w-auto"
                  src="/openai-logo.png"
                  alt="OpenAI Logo"
                  height={40}
                  width={120}
                />
              </div>

              <div className="flex items-center">
                <Image
                  className="mx-auto h-6 md:h-10 w-auto"
                  src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg"
                  alt="Claude AI Logo"
                  height={40}
                  width={120}
                />
              </div>

              <div className="flex items-center">
                <Image
                  className="mx-auto h-6 md:h-10 w-auto"
                  src="https://atamel.dev/img/2024/gemini.png"
                  alt="Gemini Logo"
                  height={40}
                  width={120}
                />
              </div>
            </InfiniteSlider>

            <div className="bg-gradient-to-r from-gray-50/90 absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-gradient-to-l from-gray-50/90 absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
