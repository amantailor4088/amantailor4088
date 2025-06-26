"use client";

import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import LeftPanel from "./LeftPanel";
import AuthForm from "./AuthForm";
import { useAuth } from "@/context/auth/AuthContext";

type props = {
  isOpen: boolean; 
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AuthModal({ isOpen, setShowLogin }: props) {
  const [mode, setMode] = useState<"login" | "signup">("login");

  const {user} = useAuth()

  useEffect(()=> {
    if(user) setShowLogin(false)
  }, [user])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-30 h-[100vh] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 150 }}
          >
            <LeftPanel mode={mode} setMode={setMode} />

            <div className="relative p-6 sm:p-10 bg-white dark:bg-neutral-900">
              <button
                onClick={() => setShowLogin(false)}
                className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-red-500"
              >
                <IoClose size={22} />
              </button>

              <AuthForm mode={mode} setMode={setMode} setShowLogin={setShowLogin} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
