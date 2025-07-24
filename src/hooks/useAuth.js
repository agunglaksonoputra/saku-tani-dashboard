"use client";

import { useEffect, useState } from "react";
import { getUser, getToken, logout as logoutService } from "@/services/authService";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getUser();
    const currentToken = getToken();

    if (currentToken && currentUser) {
      setUser(currentUser);
      setToken(currentToken);
    } else {
      setUser(null);
      setToken(null);
    }

    setIsLoading(false);
  }, []);

  const logout = () => {
    logoutService();
    setUser(null);
    setToken(null);
  };

  return {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    logout,
  };
}
