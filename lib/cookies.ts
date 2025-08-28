/**
 * Utility functions for managing cookies and caching
 */

// Check if a cookie exists
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

// Set a cookie with configurable options
export function setCookie(name: string, value: string, options: { 
  maxAge?: number; 
  path?: string; 
  sameSite?: 'Strict' | 'Lax' | 'None';
  secure?: boolean;
} = {}): void {
  if (typeof document === 'undefined') return;
  
  const { maxAge = 31536000, path = '/', sameSite = 'Lax', secure = false } = options;
  
  let cookieString = `${name}=${value}; max-age=${maxAge}; path=${path}; SameSite=${sameSite}`;
  if (secure) cookieString += '; Secure';
  
  document.cookie = cookieString;
}

// Delete a cookie
export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; max-age=0; path=/`;
}

// Cache data in localStorage with expiration (DISABLED - no caching)
export function cacheData<T>(key: string, data: T, expirationMinutes = 60): void {
  // Caching disabled - function does nothing
  return;
}

// Get cached data if it exists and is not expired (DISABLED - no caching)
export function getCachedData<T>(key: string): T | null {
  // Caching disabled - always return null
  return null;
}

// Check if the user has consented to cookies
export function hasConsentedToCookies(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('cookieConsent') === 'accepted';
}

// Cookie preference manager
export interface CookiePreferences {
  necessary: boolean; // Always true
  functional: boolean;
  analytics: boolean;
  advertising: boolean;
}

// Get the user's cookie preferences
export function getCookiePreferences(): CookiePreferences {
  const defaultPrefs: CookiePreferences = {
    necessary: true,
    functional: false,
    analytics: false,
    advertising: false
  };
  
  if (typeof window === 'undefined') return defaultPrefs;
  
  try {
    const savedPrefs = localStorage.getItem('cookiePreferences');
    if (!savedPrefs) return defaultPrefs;
    
    return { ...defaultPrefs, ...JSON.parse(savedPrefs) };
  } catch (e) {
    return defaultPrefs;
  }
}

// Save the user's cookie preferences
export function saveCookiePreferences(prefs: Partial<CookiePreferences>): void {
  if (typeof window === 'undefined') return;
  
  const currentPrefs = getCookiePreferences();
  const newPrefs: CookiePreferences = {
    ...currentPrefs,
    ...prefs,
    necessary: true // Always true
  };
  
  localStorage.setItem('cookiePreferences', JSON.stringify(newPrefs));
  
  // Also update the general consent flag
  const hasAnyOptionalConsent = newPrefs.functional || newPrefs.analytics || newPrefs.advertising;
  localStorage.setItem('cookieConsent', hasAnyOptionalConsent ? 'accepted' : 'declined');
  
  // Update cookie for server-side reference
  setCookie('cookieConsent', hasAnyOptionalConsent ? 'accepted' : 'declined', {
    maxAge: 31536000, // 1 year
    path: '/',
    sameSite: 'Lax',
  });
}

// Clear all cookies except necessary ones
export function clearNonEssentialCookies(): void {
  if (typeof document === 'undefined') return;
  
  // Keep a list of necessary cookies
  const necessaryCookies = ['cookieConsent'];
  
  // Get all cookies
  const cookies = document.cookie.split(';');
  
  // Delete each non-essential cookie
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const cookieName = cookie.split('=')[0];
    
    if (!necessaryCookies.includes(cookieName)) {
      deleteCookie(cookieName);
    }
  }
  
  // Also clear localStorage except for essential items
  if (typeof window !== 'undefined') {
    const essentialStorageKeys = ['cookieConsent', 'cookiePreferences'];
    
    // Save essential items
    const essentialValues: Record<string, string> = {};
    for (const key of essentialStorageKeys) {
      const value = localStorage.getItem(key);
      if (value) essentialValues[key] = value;
    }
    
    // Clear all localStorage
    localStorage.clear();
    
    // Restore essential items
    for (const [key, value] of Object.entries(essentialValues)) {
      localStorage.setItem(key, value);
    }
  }
}

// Clear all items from localStorage
export function clearLocalStorage(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.clear();
    console.log('localStorage has been cleared successfully');
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
} 