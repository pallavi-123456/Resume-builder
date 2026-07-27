import { createContext, useState, useEffect, useCallback } from "react";
import authService from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem("resumeai_token");
      const cachedUser = localStorage.getItem("resumeai_user");

      if (!token) {
        setLoading(false);
        return;
      }

      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
      }

      try {
        const { user: freshUser } = await authService.getMe();
        setUser(freshUser);
        localStorage.setItem("resumeai_user", JSON.stringify(freshUser));
      } catch (error) {
        localStorage.removeItem("resumeai_token");
        localStorage.removeItem("resumeai_user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const persistSession = (data) => {
    localStorage.setItem("resumeai_token", data.token);
    localStorage.setItem("resumeai_user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = useCallback(async (credentials) => {
    const data = await authService.login(credentials);
    persistSession(data);
    return data;
  }, []);

  const signup = useCallback(async (details) => {
    const data = await authService.signup(details);
    persistSession(data);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("resumeai_token");
    localStorage.removeItem("resumeai_user");
    setUser(null);
  }, []);

  const updateLocalUser = useCallback((patch) => {
    setUser((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem("resumeai_user", JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated: !!user, login, signup, logout, updateLocalUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
