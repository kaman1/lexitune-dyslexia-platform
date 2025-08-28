"use client";

import { createContext, useContext, type ReactNode, useState } from "react";

// Define user type
type User = {
  id: string;
  email: string;
  name?: string;
  role?: string;
  [key: string]: unknown;
};

// Define session type
export type Session = {
  user: User | null;
  [key: string]: unknown;
};

// Define session context types
interface SessionContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  signOut: () => Promise<void>;
}

// Create context with default values
const SessionContext = createContext<SessionContextType>({
  session: null,
  user: null,
  isLoading: false,
  error: null,
  signOut: async () => {},
});

// Hook for components to access session data
export const useSession = () => useContext(SessionContext);

// Provider component
export function SessionProvider({ children }: { children: ReactNode }) {
  // State for session data (placeholder until new auth system is implemented)
  const [sessionData, setSessionData] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Prepare context value
  const contextValue: SessionContextType = {
    session: sessionData,
    user: sessionData?.user || null,
    isLoading,
    error,
    signOut: async () => {
      try {
        // Placeholder for sign out functionality
        setSessionData(null);
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
}
