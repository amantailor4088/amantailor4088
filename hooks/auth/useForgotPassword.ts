"use client";

import { useState } from "react";

interface ForgotPasswordPayload {
  email: string;
}

interface UseForgotPasswordReturn {
  forgotPassword: (data: ForgotPasswordPayload) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export function useForgotPassword(): UseForgotPasswordReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const forgotPassword = async ({ email }: ForgotPasswordPayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/forgot_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Request failed");
      }

      return true;
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    forgotPassword,
    loading,
    error,
  };
}
