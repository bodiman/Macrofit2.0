// lib/clerk.ts
import { Platform } from 'react-native';

export const ClerkProvider = Platform.OS === 'web'
  ? require('@clerk/clerk-react').ClerkProvider
  : require('@clerk/clerk-expo').ClerkProvider;

export const SignedIn = Platform.OS === 'web'
  ? require('@clerk/clerk-react').SignedIn
  : require('@clerk/clerk-expo').SignedIn;

export const SignedOut = Platform.OS === 'web'
  ? require('@clerk/clerk-react').SignedOut
  : require('@clerk/clerk-expo').SignedOut;

// Add more re-exports as needed...
