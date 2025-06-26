import { useAuth } from "@/context/auth/AuthContext";
import { useState } from "react";

interface LoginPayload {
  email: string;
  password: string;
}

interface UseLoginReturn {
  login: (data: LoginPayload) => Promise<void>;
  loading: boolean;
  error: string | null;
  requiresVerification: boolean;
}

export function useLogin(): UseLoginReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requiresVerification, setRequiresVerification] = useState(false);
  const {setUser} = useAuth()

  const login = async ({ email, password }: LoginPayload) => {
    setLoading(true);
    setError(null);
    setRequiresVerification(false);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.requiresVerification && data?.status === "unverified") {
          setRequiresVerification(true);
          return;
        }

        throw new Error(data?.message || "Login failed");
      }

      localStorage.setItem("authUser", JSON.stringify(data.user));
      setUser(data.user)

    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
    requiresVerification,
  };
}
