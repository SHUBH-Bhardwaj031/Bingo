import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

 const fetchCurrentUser = async () => {
  try {
    const res = await axios.get(
      `${serverUrl}/api/auth/me`,
      {
        withCredentials: true,
      }
    );

    setUser(res.data.user);

    return res.data.user;
  } catch (error) {
    setUser(null);
    return null;
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const logout = async () => {
    try {
      await axios.get(
        `${serverUrl}/api/auth/signout`,
        {
          withCredentials: true,
        }
      );

      setUser(null);
    } catch (error) {
      console.log(error);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};