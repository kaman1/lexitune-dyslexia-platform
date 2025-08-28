"use client";

import { useState, useEffect } from "react";
import {
  getCookie,
  setCookie,
  hasConsentedToCookies,
  getCookiePreferences,
  saveCookiePreferences,
  clearNonEssentialCookies,
  type CookiePreferences,
} from "@/lib/cookies";
import { X, Settings, Check } from "lucide-react";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showSettingsButton, setShowSettingsButton] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem("cookieConsent");
    if (!hasConsent) {
      // Only show consent dialog if no preference is found
      setShowConsent(true);
      setShowSettingsButton(false);
    } else {
      // Show settings button if user has made a choice
      setShowConsent(false);
      setShowSettingsButton(true);

      // Load saved preferences
      setPreferences(getCookiePreferences());
    }
  }, []);

  const acceptAllCookies = () => {
    const newPrefs: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      advertising: true,
    };

    // Save all preferences as accepted
    saveCookiePreferences(newPrefs);
    setPreferences(newPrefs);
    setShowConsent(false);
    setShowSettingsButton(true);
    setShowAdvancedSettings(false);
  };

  const acceptEssentialCookies = () => {
    const newPrefs: CookiePreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      advertising: false,
    };

    // Save only necessary cookies as accepted
    saveCookiePreferences(newPrefs);
    setPreferences(newPrefs);
    setShowConsent(false);
    setShowSettingsButton(true);
    setShowAdvancedSettings(false);

    // Clear any non-essential cookies
    clearNonEssentialCookies();
  };

  const savePreferences = () => {
    // Save the current preference state
    saveCookiePreferences(preferences);
    setShowConsent(false);
    setShowSettingsButton(true);
    setShowAdvancedSettings(false);

    // If all optional cookies are declined, clear them
    if (
      !preferences.functional &&
      !preferences.analytics &&
      !preferences.advertising
    ) {
      clearNonEssentialCookies();
    }
  };

  const openSettings = () => {
    // Show full consent dialog again
    setShowConsent(true);
    // Load current preferences
    setPreferences(getCookiePreferences());
  };

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === "necessary") return; // Cannot change necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      {showConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 text-white p-4 z-50 shadow-lg">
          <div className="container mx-auto">
            {!showAdvancedSettings ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm max-w-3xl">
                  <p>
                    We use cookies to improve your experience and enable
                    personalized content. By continuing to use our website, you
                    agree to our{" "}
                    <a href="/privacy" className="underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={acceptEssentialCookies}
                    className="px-4 py-2 text-xs border border-white text-white hover:bg-zinc-800 transition"
                  >
                    Essential Only
                  </button>
                  <button
                    type="button"
                    onClick={acceptAllCookies}
                    className="px-4 py-2 text-xs bg-white text-black hover:bg-gray-200 transition"
                  >
                    Accept All
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAdvancedSettings(true)}
                    className="px-4 py-2 text-xs border border-zinc-600 text-zinc-300 hover:bg-zinc-800 transition"
                  >
                    Customize
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Cookie Preferences</h3>
                  <button
                    type="button"
                    onClick={() => setShowAdvancedSettings(false)}
                    className="text-zinc-400 hover:text-white transition"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {/* Necessary cookies */}
                  <div className="border border-zinc-700 p-3 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Necessary Cookies</div>
                      <div className="bg-zinc-700 text-xs px-2 py-1 rounded">
                        Required
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400">
                      These cookies are essential for the website to function
                      properly.
                    </p>
                  </div>

                  {/* Functional cookies */}
                  <div className="border border-zinc-700 p-3 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Functional Cookies</div>
                      <button
                        type="button"
                        onClick={() => handlePreferenceChange("functional")}
                        className={`w-10 h-5 rounded-full relative transition-colors ${
                          preferences.functional
                            ? "bg-green-500"
                            : "bg-zinc-700"
                        }`}
                      >
                        <span
                          className={`block absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transform transition-transform ${
                            preferences.functional ? "translate-x-5" : ""
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-xs text-zinc-400">
                      These cookies enable personalized site features and
                      functionality.
                    </p>
                  </div>

                  {/* Analytics cookies */}
                  <div className="border border-zinc-700 p-3 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Analytics Cookies</div>
                      <button
                        type="button"
                        onClick={() => handlePreferenceChange("analytics")}
                        className={`w-10 h-5 rounded-full relative transition-colors ${
                          preferences.analytics ? "bg-green-500" : "bg-zinc-700"
                        }`}
                      >
                        <span
                          className={`block absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transform transition-transform ${
                            preferences.analytics ? "translate-x-5" : ""
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-xs text-zinc-400">
                      These cookies help us understand how visitors interact
                      with our website.
                    </p>
                  </div>

                  {/* Advertising cookies */}
                  <div className="border border-zinc-700 p-3 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Advertising Cookies</div>
                      <button
                        type="button"
                        onClick={() => handlePreferenceChange("advertising")}
                        className={`w-10 h-5 rounded-full relative transition-colors ${
                          preferences.advertising
                            ? "bg-green-500"
                            : "bg-zinc-700"
                        }`}
                      >
                        <span
                          className={`block absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transform transition-transform ${
                            preferences.advertising ? "translate-x-5" : ""
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-xs text-zinc-400">
                      These cookies may be used to collect information for
                      targeted advertising.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mt-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAdvancedSettings(false)}
                    className="px-4 py-2 text-xs border border-zinc-600 text-zinc-300 hover:bg-zinc-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={savePreferences}
                    className="px-4 py-2 text-xs bg-white text-black hover:bg-gray-200 transition"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Persistent settings button - Hidden */}
      {/* {showSettingsButton && !showConsent && (
        <button
          type="button"
          onClick={openSettings}
          className="fixed bottom-4 right-4 bg-zinc-800 text-white p-2 rounded-full shadow-lg z-40 hover:bg-zinc-700 transition-colors group"
          aria-label="Cookie Settings"
        >
          <Settings size={20} />
          <span className="absolute bottom-full right-0 mb-2 w-max bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Cookie Settings
          </span>
        </button>
      )} */}
    </>
  );
}
