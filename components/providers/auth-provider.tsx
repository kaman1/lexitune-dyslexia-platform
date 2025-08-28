"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// Define a basic user type
type User = {
  id: string;
  email?: string;
  name?: string;
  organization?: {
    id: string;
    name: string;
  };
};

// Create context with default values
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

// Login/logout functions
const login = () => {
  window.location.href = "/api/auth/login";
};

const logout = () => {
  window.location.href = "/api/auth/logout";
};

const defaultContext: AuthContextType = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login,
  logout,
};

// Create the auth context
const AuthContext = createContext<AuthContextType>(defaultContext);

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Client-side auth provider that doesn't use WorkOS
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from an API endpoint
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const contextValue = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
