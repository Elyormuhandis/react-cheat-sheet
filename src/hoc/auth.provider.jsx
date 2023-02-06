import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const signIn = (user, cb) => {
    setUser(user);
    cb();
  };
  const signOut = (cb) => {
    setUser(null);
    cb();
  };
  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
