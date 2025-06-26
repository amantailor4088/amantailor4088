"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import OtpModal from "../otp/OtpModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPasswordModal = ({ isOpen, onClose, setShowLogin }: Props) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const { loading, error, forgotPassword } = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const res = await forgotPassword({ email });
    if (res) setShowOtp(true);
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-neutral-900 p-6 rounded-xl w-full max-w-md shadow-lg relative"
      >
        <h2 className="text-xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Forgot Password
        </h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Reset OTP"}
            </button>
          </form>
        ) : (
          <p className="text-center text-sm text-gray-700 dark:text-gray-300">
            We've sent a reset OTP to <strong>{email}</strong>. Please check your inbox.
          </p>
        )}

        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-3 right-4 text-xl text-gray-500 dark:text-gray-200"
        >
          ×
        </button>
      </motion.div>

      <OtpModal isOpen={showOtp} onClose={() => setShowOtp(false)} email={email} forgot />
    </div>
  );
};

export default ForgotPasswordModal;
