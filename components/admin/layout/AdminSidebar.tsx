"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Users, BarChart2 } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: <Home size={18} /> },
  { label: "Courses", href: "/admin/courses", icon: <BookOpen size={18} /> },
  { label: "Users", href: "/admin/users", icon: <Users size={18} /> },
  { label: "Reports", href: "/admin/reports", icon: <BarChart2 size={18} /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white dark:bg-neutral-800 border-r dark:border-neutral-700 p-4 hidden md:block h-full">
      <h2 className="text-xl font-bold mb-6 text-purple-700 dark:text-purple-400">Admin Panel</h2>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${
              pathname === item.href
                ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-700"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
