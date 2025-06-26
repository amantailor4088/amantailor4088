"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { useAuth } from "@/context/auth/AuthContext";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Contact", href: "/contact" },
];

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setShowLogin: Dispatch<SetStateAction<boolean>>;
}

const MobileNav = ({ isOpen, setIsOpen, setShowLogin }: Props) => {
  const { user, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="lg:hidden absolute top-full inset-x-0 z-40 bg-white dark:bg-neutral-900 shadow-lg border-t border-gray-200 dark:border-neutral-700 transition-all px-4 pb-4 pt-2">
      <ul className="space-y-2">
        {navItems.map((item, idx) => (
          <li key={idx}>
            <Link
              href={item.href}
              className="block w-full text-base py-2 px-3 rounded-md text-gray-800 hover:bg-purple-100 dark:text-gray-100 dark:hover:bg-purple-800 dark:hover:text-purple-300 transition"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          </li>
        ))}

        <li>
          {!user ? (
            <div
              className="block w-full text-base py-2 px-3 rounded-md border border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white dark:text-purple-200 dark:border-purple-200 dark:hover:bg-purple-600 dark:hover:text-white transition"
              onClick={() => {
                setIsOpen(false);
                setShowLogin(true);
              }}
            >
              Login
            </div>
          ) : (
            <div
              className="block w-full text-base py-2 px-3 rounded-md border border-red-600 text-red-600 hover:bg-red-600 hover:text-white dark:text-red-400 dark:border-red-400 dark:hover:bg-red-700 dark:hover:text-white transition"
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
            >
              Logout
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;
