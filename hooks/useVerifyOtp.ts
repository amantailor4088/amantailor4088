import { useAuth } from "@/context/auth/AuthContext";
import { useState } from "react";

interface VerifyOtpPayload {
  email: string;
  otp: string;
  forgot?: boolean
}

interface UseVerifyOtpReturn {
  verifyOtp: (payload: VerifyOtpPayload) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useVerifyOtp(): UseVerifyOtpReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {setUser, setResetpassword} = useAuth()

  const verifyOtp = async ({ email, otp, forgot }: VerifyOtpPayload): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/otp_verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "OTP verification failed");
      }

      if (data?.user) {
        localStorage.setItem("authUser", JSON.stringify(data.user));
        setUser(data.user)
      }

      if(forgot) {
        setResetpassword(true)
      }

    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { verifyOtp, loading, error };
}
