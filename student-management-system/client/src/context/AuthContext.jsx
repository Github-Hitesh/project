import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('studentToken') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('studentUser')) || null);

  const loginSession = (jwtToken, userData) => {
    localStorage.setItem('studentToken', jwtToken);
    localStorage.setItem('studentUser', JSON.stringify(userData));
    setToken(jwtToken);
    setUser(userData);
  };

  const logoutSession = () => {
    localStorage.removeItem('studentToken');
    localStorage.removeItem('studentUser');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loginSession, logoutSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
