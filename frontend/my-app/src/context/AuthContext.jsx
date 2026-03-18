import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check if token exists in localStorage on initial load
  const [user, setUser] = useState(!!localStorage.getItem("token"));

  const login = () => setUser(true);
  const logout = () => setUser(false);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
