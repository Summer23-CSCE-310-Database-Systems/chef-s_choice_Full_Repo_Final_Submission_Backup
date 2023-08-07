import React, { createContext, useContext, useState } from 'react';

// Create a context named UserContext
const UserContext = createContext();

// UserProvider component that provides user-related state to its children
export function UserProvider({ children }) {
  // State variables for user-related data
  const [uid, setUid] = useState(null); // User ID state
  const [userName, setUserName] = useState(''); // User name state

  // Provide user-related data through the context
  return (
    <UserContext.Provider value={{ uid, setUid, userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for accessing user-related data from the context
export function useUser() {
  return useContext(UserContext);
}
