import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Load user from token on refresh
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/users/profile");
        // include token on user object so components can read `user.token`
        setUser({ ...res.data, token });
      } catch (err) {
        console.error("Auth load failed");
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    setUser({ ...res.data.user, token: res.data.token });
    return res.data;
  };

  // 📝 SIGNUP
  const signup = async (data) => {
    const res = await api.post("/auth/signup", data);

    localStorage.setItem("token", res.data.token);
    setUser({ ...res.data.user, token: res.data.token });
    return res.data;
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        signup,
        logout,
        loading,
        isAdmin: user?.role === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔥 Custom hook
export const useAuth = () => useContext(AuthContext);

export default AuthContext;