// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Decode JWT and extract user info
  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return { name: payload.name, userId: payload.userId };
    } catch (err) {
      console.error("❌ Failed to decode token:", err);
      return null;
    }
  };

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    const token = data.token;

    if (token) {
      localStorage.setItem("token", token);
      const decodedUser = decodeToken(token);
      setUser(decodedUser);
    }

    return data;
  };

  const register = async (name, email, password) => {
    const data = await authService.register(name, email, password);
    const token = data.token;

    if (token) {
      localStorage.setItem("token", token);
      const decodedUser = decodeToken(token);
      setUser(decodedUser);
    }

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // ✅ Restore real user info from stored token on page reload
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) setUser(decodedUser);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
