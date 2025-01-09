import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);




  const login = (userData) => {
    setUser(userData); // Set user in context global state
  };

  const logout = () => {
    setUser(null); // Clear user from global state (not changing localStorage)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
