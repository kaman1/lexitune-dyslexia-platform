export interface User {
  id: string;
  email: string;
  createdAt: string;
  name?: string;
  role?: string;
  accountType?: string;
  companyName?: string;
  isApproved?: boolean;
  approved?: boolean;
  
  // Additional metadata fields
  phoneNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  jobTitle?: string;
  department?: string;
  organization?: string;
  bio?: string;
  timezone?: string;
  lastLogin?: string;
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: boolean;
    emailUpdates?: boolean;
    language?: string;
  };
  socialLinks?: {
    website?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  
  // Legal information
  legalInformation?: {
    termsAccepted?: boolean;
    termsAcceptedDate?: string;
    privacyPolicyAccepted?: boolean;
    privacyPolicyAcceptedDate?: string;
    marketingConsent?: boolean;
    dataProcessingConsent?: boolean;
    consentDate?: string;
    legalDocumentsViewed?: string[];
  };
  
  // For custom fields
  metadata?: Record<string, unknown>;
  
  // Index signature for accessing unknown properties
  [key: string]: unknown;
} 