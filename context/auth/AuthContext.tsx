// context/AuthContext.tsx
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
  resetPassword: boolean,
  setResetpassword: Dispatch<SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [resetPassword, setResetpassword] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);
  

  const logout = async () => {
    localStorage.removeItem("authUser");
    setUser(null);
    await fetch("/api/auth/logout")
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
