import React, { createContext, useContext } from 'react';
import { useUser } from '../hooks/useUser';

// Create the context with a default value of null
const UserContext = createContext<ReturnType<typeof useUser> | null>(null);

// Create a provider component
export function UserProvider({ children }: { children: React.ReactNode }) {
  const userData = useUser();
  
  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
}

// Create a custom hook to use the user context
export function useUserContext() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
} 