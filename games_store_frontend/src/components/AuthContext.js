import React, { createContext, useState } from "react";

/**
 * AuthContext provides authentication info and helpers throughout the app.
 */
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /**
   * Provides mock authentication state and login/logout handlers to descendants.
   * The username, if set, will persist in context (across navigation and reloads until app closes).
   */
  const [user, setUser] = useState(() => {
    // No persistence across reloads; initiate as null for new session.
    return null;
  });

  // PUBLIC_INTERFACE
  const login = (username) => {
    setUser(username);
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
