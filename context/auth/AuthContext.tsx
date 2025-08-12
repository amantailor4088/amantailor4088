"use client";

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  coursesPurchased: string[];
}

interface AuthContextProps {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  logout: () => void;
  resetPassword: boolean;
  setResetpassword: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [resetPassword, setResetpassword] = useState(false);

  // Fetch latest user from DB
  const fetchUserFromDB = async () => {
    try {
      const res = await fetch("/api/user/refreshUser",  { cache: "no-store" });
      if (!res.ok) throw new Error("Not authenticated");
      const data = await res.json();
      setUser(data?.user);
      localStorage.setItem("authUser", JSON.stringify(data?.user));
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
      localStorage.removeItem("authUser");
    }
  };

  useEffect(() => {
    fetchUserFromDB();
  }, []);

  const logout = async () => {
    localStorage.removeItem("authUser");
    setUser(null);
    await fetch("/api/auth/logout");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, resetPassword, setResetpassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
