"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LeftPanel({
  mode,
  setMode,
}: {
  mode: "login" | "signup";
  setMode: (val: "login" | "signup") => void;
}) {
  return (
    <div className="relative hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 to-yellow-400 dark:from-purple-700 dark:to-yellow-500 text-white px-8 py-12">
      <Image src="/logo.png" alt="Logo" width={64} height={64} className="mb-6 drop-shadow-md" />
      <h2 className="text-3xl font-bold mb-2">Welcome to Aman Tailor</h2>
      <p className="text-base max-w-xs text-center text-white/80">
        {mode === "login" ? "Don't have an account?" : "Already a member?"}
      </p>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setMode(mode === "login" ? "signup" : "login")}
        className="mt-4 border border-white/60 hover:border-white text-sm font-semibold px-5 py-2 rounded-full transition"
      >
        {mode === "login" ? "Sign up instead" : "Login instead"}
      </motion.button>
    </div>
  );
}
