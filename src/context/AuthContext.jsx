// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Components/Loader/Loader";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  // ✅ Decode token expiry
  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  };

  // ✅ Save token and update state
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // ✅ Refresh token using refresh cookie
  const refreshAccessToken = async () => {
    try {
      const savedToken = localStorage.getItem("token");
      let email = null;

      if (savedToken) {
        try {
          const decoded = jwtDecode(savedToken);
          email = decoded.email;
        } catch (e) {
          console.warn("Failed to decode token", e);
        }
      }

      const res = await axios.post(
        `${baseUrl}/api/auth/refresh`,
        { email },
        { withCredentials: true }
      );

      if (res.data.accessToken) {
        console.log("🔄 Access token refreshed");
        login(res.data.accessToken);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to refresh token:", err);
      logout();
      return false;
    }
  };

  // ✅ Initialize auth on app load / reload
  useEffect(() => {
    const initAuth = async () => {
      const saved = localStorage.getItem("token");
      if (!saved) {
        setLoading(false);
        return;
      }

      if (isTokenExpired(saved)) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) logout();
      } else {
        setToken(saved);
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  // ✅ Schedule refresh 1 minute before token expiry
  useEffect(() => {
    if (!token) return;

    const { exp } = jwtDecode(token);
    const now = Date.now();
    const msUntilExpiry = exp * 1000 - now;

    // Refresh 1 minute before expiry
    const msUntilRefresh = Math.max(msUntilExpiry - 60 * 1000, 0);

    console.log(`⏳ Will refresh token in ${Math.ceil(msUntilRefresh / 1000 / 60)} minute(s)`);

    const timer = setTimeout(() => {
      console.log("🔁 Refreshing access token...");
      refreshAccessToken();
    }, msUntilRefresh);

    return () => clearTimeout(timer);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated: !!token,
        loading,
        setLoading,
      }}
    >
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <Loader />
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
