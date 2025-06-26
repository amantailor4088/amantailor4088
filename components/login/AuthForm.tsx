"use client";

import { motion } from "framer-motion";
import LoginForm from "./Forms/LoginForm";
import SignupForm from "./Forms/SignupForm";

type AuthMode = "login" | "signup";

interface AuthFormProps {
  mode: AuthMode;
  setMode: (val: AuthMode) => void;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AuthForm({ mode, setMode, setShowLogin }: AuthFormProps) {
  const isSignup = mode === "signup";

  return (
    <motion.div
      key={mode}
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -30, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pt-10"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
        {isSignup ? "Create an Account" : "Welcome Back"}
      </h2>

      {
        isSignup ? <SignupForm setShowLogin={setShowLogin} /> : <LoginForm setShowLogin={setShowLogin} />
      }

      <div className="text-sm text-center text-gray-600 dark:text-gray-400 md:hidden">
        {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
        <button
          onClick={() => setMode(isSignup ? "login" : "signup")}
          className="text-purple-600 dark:text-purple-400 font-medium hover:underline ml-1"
        >
          {isSignup ? "Login" : "Sign up"}
        </button>
      </div>

      <div className="text-sm text-center text-gray-500 dark:text-gray-400">
        By continuing, you agree to our{" "}
        <span className="underline cursor-pointer">Terms</span> and{" "}
        <span className="underline cursor-pointer">Privacy Policy</span>.
      </div>
    </motion.div>
  );
}
