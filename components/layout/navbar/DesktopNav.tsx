// components/Navbar/DesktopNav.tsx

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
]

const DesktopNav = () => {

    const pathname = usePathname()

  return (
    <div className="hidden lg:flex items-center gap-5">
      {navItems.map((item, idx) => (
        <Link
          key={idx}
          href={item.href}
          className={`text-md font-medium transition-colors duration-200 ${
            item.href === pathname
              ? "text-purple-700 dark:text-purple-300"
              : "text-gray-700 hover:text-purple-700 dark:text-gray-200 dark:hover:text-purple-400"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default DesktopNav;
