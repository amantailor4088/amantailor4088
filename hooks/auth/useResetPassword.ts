// hooks/useResetPassword.ts
"use client";

import { useState } from "react";

interface ResetPayload {
  password: string;
}

export function useResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetPassword = async ({ password }: ResetPayload): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/reset_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setError(data.errors.map((e: any) => e.message).join(" "));
        } else {
          setError(data.message || "Something went wrong.");
        }
        return false;
      }
      return true;
    } catch (err: any) {
      setError("Network error. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    resetPassword,
  };
}
