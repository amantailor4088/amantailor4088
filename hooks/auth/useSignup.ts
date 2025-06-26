import { useState } from "react";

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

interface UseSignupReturn {
  signup: (data: SignupPayload) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useSignup(): UseSignupReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const signup = async ({ name, email, password }: SignupPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (Array.isArray(data.errors)) {
          throw new Error(data.errors[0]?.message || "Invalid input");
        }
        throw new Error(data.message || "Signup failed");
      }

      setSuccess(true);
      console.log("Signup successful:", data.message);

    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error, success };
}
