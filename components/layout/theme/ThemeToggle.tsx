"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export const ThemeToggle = () => {
  const { isDark, setIsDark } = useTheme();

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle Theme"
      className="p-2 rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
    >
      <div className="relative h-5 w-5 flex items-center justify-center">
        <Sun
          className={`absolute transition-all duration-300 text-yellow-600 ${
            isDark ? "opacity-0 scale-75 rotate-45" : "opacity-100 scale-100 rotate-0"
          }`}
        />
        <Moon
          className={`absolute transition-all duration-300 text-yellow-300 ${
            isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 rotate-45"
          }`}
        />
      </div>
    </button>
  );
};
