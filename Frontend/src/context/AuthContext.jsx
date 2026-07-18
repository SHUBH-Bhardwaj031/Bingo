import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Apply saved token to every axios request immediately on app load,
// so it's ready before the first component even renders.
const savedToken = localStorage.getItem("token");
if (savedToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/auth/me`, {
        withCredentials: true,
      });

      setUser(res.data.user);
      return res.data.user;
    } catch (error) {
      setUser(null);
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Called right after signin/signup/google-signin succeeds
  const applyToken = (token) => {
    if (!token) return;
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const logout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuthenticated,
        logout,
        refreshUser: fetchCurrentUser,
        applyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};