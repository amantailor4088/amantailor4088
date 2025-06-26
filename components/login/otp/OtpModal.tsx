"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVerifyOtp } from "@/hooks/useVerifyOtp";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  forgot?: boolean
}

export default function OtpModal({ isOpen, onClose, email, forgot }: OtpModalProps) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { loading, verifyOtp, error } = useVerifyOtp();

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    await verifyOtp({ email, otp: finalOtp, forgot });
  
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-xl w-full max-w-md"
          >
            <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white">
              Enter OTP
            </h2>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-4">
              A 6-digit code has been sent to <strong>{email}</strong>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-between gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    ref={(el) => {
                      inputRefs.current[i] = el;
                    }}
                    className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 dark:border-neutral-700 rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ))}
              </div>

              {error && (
                <p className="text-sm text-red-600 dark:text-red-400 text-center">
                  {error}
                </p>
              )}

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                disabled={otp.some((digit) => digit === "") || loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify"}
              </motion.button>
            </form>

            <p className="text-sm text-center mt-4 text-gray-500 dark:text-gray-400">
              Didn’t receive it?{" "}
              <button
                className="text-purple-600 dark:text-purple-400 hover:underline"
                type="button"
                onClick={() => {
                  // TODO: Trigger resend OTP if needed
                }}
              >
                Resend
              </button>
            </p>

            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-gray-500 dark:text-gray-400 text-lg hover:text-gray-800 dark:hover:text-white"
              type="button"
            >
              ×
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
