import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

interface Props {
  isOpen: boolean;
}

const MobileNav = ({ isOpen }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden absolute top-full inset-x-0 z-40 bg-white dark:bg-neutral-900 shadow-lg border-t border-gray-200 dark:border-neutral-700 transition-all px-4 pb-4 pt-2">
      <ul className="space-y-2">
        {navItems.map((item, idx) => (
          <li key={idx}>
            <Link
              href={item.href}
              className="block w-full text-base py-2 px-3 rounded-md text-gray-800 hover:bg-purple-100 dark:text-gray-100 dark:hover:bg-purple-800 dark:hover:text-purple-300 transition"
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/auth/login"
            className="block w-full text-base py-2 px-3 rounded-md border border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white dark:text-purple-200 dark:border-purple-200 dark:hover:bg-purple-600 dark:hover:text-white transition"
          >
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;
