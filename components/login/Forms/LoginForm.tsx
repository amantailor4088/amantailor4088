import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLogin } from "@/hooks/auth/useLogin";
import OtpModal from "../otp/OtpModal";
import ForgotPasswordModal from "../resetPassword/ForgotPasswordModal";

type prop = {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}

function LoginForm({ setShowLogin }: prop) {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, loading, requiresVerification } = useLogin();
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const inputClass =
    "w-full px-4 py-3 pr-12 rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(data);
  };

  return (
    <>
      <form className="space-y-5 relative" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className={inputClass}
          value={data.email}
          onChange={(e) =>
            setData((prev) => ({ ...prev, email: e.target.value }))
          }
          autoComplete="email"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={inputClass}
            value={data.password}
            onChange={(e) =>
              setData((prev) => ({ ...prev, password: e.target.value }))
            }
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 focus:outline-none"
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </button>
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center -mt-2">{error}</p>
        )}

        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition ${loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>
      </form>
      <OtpModal email={data.email} isOpen={requiresVerification} onClose={() => setShowLogin(false)} />
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        setShowLogin={setShowLogin}
      />

    </>
  );
}

export default LoginForm;
