"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "@/context/auth/AuthContext";
import { useResetPassword } from "@/hooks/auth/useResetPassword";

export default function ResetPasswordModal() {
  const [data, setData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null)
  const { setResetpassword } = useAuth();
  const { loading, error: resetError, resetPassword } = useResetPassword();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const result = await resetPassword({
      password: data.password,
    });

    if (result) {
      setResetpassword(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm h-[100vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-xl"
        >
          <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Reset Your Password
          </h2>

          <form onSubmit={handleReset} className="space-y-5">
            {/* New password */}
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="New password"
                className="w-full px-4 py-3 pr-12 rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={data.password}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, password: e.target.value }))
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                aria-label="Toggle password visibility"
              >
                {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>

            {/* Confirm password */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full px-4 py-3 pr-12 rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={data.confirmPassword}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value
                  }))
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>

            {resetError || error && (
              <p className="text-sm text-red-500 text-center -mt-2">{error || resetError}</p>
            )}

            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </motion.button>
          </form>

          <button
            onClick={() => setResetpassword(false)}
            className="absolute top-3 right-4 text-gray-500 dark:text-gray-400 text-lg hover:text-gray-800 dark:hover:text-white"
            aria-label="Close modal"
          >
            ×
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
