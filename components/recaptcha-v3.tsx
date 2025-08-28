'use client';

import { useEffect, useRef } from 'react';

interface ReCaptchaV3Props {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  action?: string;
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function ReCaptchaV3({ siteKey, onVerify, onError, action = 'submit' }: ReCaptchaV3Props) {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    console.log('reCAPTCHA component mounting with siteKey:', siteKey);
    
    // Load reCAPTCHA v3 script if not already loaded
    if (!scriptLoaded.current && !window.grecaptcha) {
      console.log('Loading reCAPTCHA script...');
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log('reCAPTCHA script loaded successfully');
        scriptLoaded.current = true;
        initializeRecaptcha();
      };
      
      script.onerror = () => {
        console.error('Failed to load reCAPTCHA script');
        onError?.();
      };
      
      document.head.appendChild(script);
    } else if (window.grecaptcha) {
      console.log('reCAPTCHA already available, initializing...');
      initializeRecaptcha();
    }

    function initializeRecaptcha() {
      window.grecaptcha.ready(() => {
        console.log('reCAPTCHA v3 ready and initialized');
      });
    }
  }, [siteKey, onError]);

  const executeRecaptcha = async (): Promise<string | null> => {
    try {
      console.log('executeRecaptcha called with action:', action);
      
      if (!window.grecaptcha) {
        console.error('window.grecaptcha not available');
        throw new Error('reCAPTCHA not loaded');
      }

      console.log('Executing reCAPTCHA with siteKey:', siteKey);
      const token = await window.grecaptcha.execute(siteKey, { action });
      console.log('reCAPTCHA token generated successfully, length:', token?.length);
      onVerify(token);
      return token;
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error);
      onError?.();
      return null;
    }
  };

  // Expose the execute function
  useEffect(() => {
    console.log('Attaching executeRecaptcha function to window');
    (window as any).executeRecaptcha = executeRecaptcha;
    console.log('executeRecaptcha function attached:', !!(window as any).executeRecaptcha);
  }, [siteKey, action, onVerify, onError]);

  return null; // reCAPTCHA v3 is invisible
}