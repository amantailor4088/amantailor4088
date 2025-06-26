"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../theme/ThemeToggle";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import AuthModal from "@/components/login/Auth";
import { useAuth } from "@/context/auth/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import ResetPasswordModal from "@/components/login/resetPassword/ResetPassword";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout, resetPassword } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const firstLetter = user?.name?.[0]?.toUpperCase() || "U";

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/80 backdrop-blur-md">
      <nav className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between relative">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="AMAN TAILOR Logo"
            width={48}
            height={48}
            priority
            className="object-contain filter dark:invert"
          />
          <span className="text-lg font-bold text-gray-800 dark:text-white tracking-wide">
            AMAN TAILOR
          </span>
        </Link>

        {/* Desktop Navigation */}
        <DesktopNav />

        {/* Right Side */}
        <div className="flex items-center gap-4 lg:gap-6 relative">
          <ThemeToggle />

          {!user ? (
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-sm font-medium text-purple-700 border border-purple-700 px-4 py-2 rounded-lg hover:bg-purple-700 hover:text-white transition-colors dark:text-purple-200 dark:border-purple-200 dark:hover:bg-purple-600 hidden sm:block"
            >
              Login
            </button>
          ) : (
            <div className="relative hidden sm:block" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-2 border border-purple-600 dark:border-purple-300 rounded-full transition hover:bg-purple-50 dark:hover:bg-purple-800"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white font-bold text-sm shadow">
                  {firstLetter}
                </div>
                <svg
                  className="w-4 h-4 text-purple-600 dark:text-purple-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-44 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200">
                      {user.name}
                    </div>
                    {/* Future: add <Link href="/dashboard">Dashboard</Link> etc. */}
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} setShowLogin={setShowLoginModal} />

      {/* Login Modal */}
      {showLoginModal && <AuthModal isOpen={showLoginModal} setShowLogin={setShowLoginModal} />}

      {resetPassword && <ResetPasswordModal />}
    </header>
  );
};

export default Navbar;
