import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [uid, setUid] = useState(null);
  const [userName, setUserName] = useState(''); // Add userName state

  return (
    <UserContext.Provider value={{ uid, setUid, userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
