"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../theme/ThemeToggle";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/80 backdrop-blur-md absolute">
      <nav className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between relative">
        
        {/* Mobile Menu Toggle */}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Logo + Brand */}
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

        {/* Right Side Actions */}
        <div className="flex items-center gap-4 lg:gap-6">
          <ThemeToggle />

          <Link
            href="/auth/login"
            className="text-sm font-medium text-purple-700 border border-purple-700 px-4 py-2 rounded-lg hover:bg-purple-700 hover:text-white transition-colors dark:text-purple-200 dark:border-purple-200 dark:hover:bg-purple-600 dark:hover:text-white hidden sm:block"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMenuOpen} />
    </header>
  );
};

export default Navbar;
