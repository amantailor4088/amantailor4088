"use client";

import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, BookOpen, Users, BarChart2 } from "lucide-react";

const tabs = [
   { label: "Courses", href: "/admin", icon: BookOpen },
    { label: "Users", href: "/admin/users", icon: Users },
];

export default function AdminMobileSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md px-3 py-2 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-gray-200 dark:border-neutral-700 shadow-xl rounded-full flex justify-between"
    >
      <div className="relative flex w-full">
        {/* Active background pill */}
        <motion.div
          layout
          layoutId="active-tab"
          className="absolute top-1 left-0 h-[calc(100%-0.5rem)] w-1/2 rounded-full bg-purple-600 z-0"
          style={{
            transform: `translateX(${tabs.findIndex(tab => tab.href === pathname) * 100}%)`,
            transition: "transform 0.3s ease",
          }}
        />

        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;

          return (
            <button
              key={tab.href}
              onClick={() => router.push(tab.href)}
              className={`relative z-10 flex-1 py-2 px-1 flex flex-col items-center justify-center rounded-full transition-all ${
                isActive ? "text-white" : "text-gray-700 dark:text-gray-300"
              }`}
            >
              <Icon size={18} />
              <span className="text-[11px] mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
