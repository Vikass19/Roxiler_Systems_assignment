
// src/context/AuthContext.jsx

import React, { createContext, useEffect, useState } from "react";
import api, {
  setToken,
  login,
  signup,
  logout,
} from "../api/apis";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore session on page refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);
        setToken(token);
      } catch (error) {
        console.error("Failed to parse stored user:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Login
  const loginUser = async (credentials) => {
    const data = await login(credentials);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    return data;
  };

  // Register
  const registerUser = async (userData) => {
    const data = await signup(userData);
    return data;
  };

  // Logout
  const logoutUser = async () => {
    try {
      await logout();
    } catch (error) {
      console.warn(
        "Logout request failed, clearing local data anyway"
      );
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);

      delete api.defaults.headers.common["Authorization"];
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: loginUser,
        register: registerUser,
        logout: logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};