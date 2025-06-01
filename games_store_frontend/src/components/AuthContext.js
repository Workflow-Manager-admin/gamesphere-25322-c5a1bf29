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
  /** Provides mock authentication state and login/logout handlers to descendants. */
  const [user, setUser] = useState(null);

  // Mock login: set a string as user (username).
  const login = (username) => setUser(username);

  // Mock logout: clear user.
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
