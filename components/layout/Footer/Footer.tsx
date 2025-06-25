"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-100 to-white dark:from-neutral-950 dark:to-black text-gray-800 dark:text-gray-300 pt-16 pb-8 px-6 sm:px-12 lg:px-20 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Logo + Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="AMAN TAILOR Logo"
              width={52}
              height={52}
              className="object-contain filter dark:invert"
            />
            <span className="text-2xl font-bold tracking-wide dark:text-white">
              AMAN TAILOR
            </span>
          </div>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            India’s trusted online tailoring academy — bringing skill-building
            courses to your fingertips in Punjabi.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-purple-700 dark:text-purple-400">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              ["Home", "/"],
              ["About Us", "/about"],
              ["Courses", "/courses"],
              ["Reviews", "/reviews"],
              ["Terms & Conditions", "/terms"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link
                  href={href}
                  className="hover:underline hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-purple-700 dark:text-purple-400">
            Contact Us
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              📧{" "}
              <a
                href="mailto:support@amantailor.com"
                className="hover:underline hover:text-purple-700 dark:hover:text-purple-400"
              >
                support@amantailor.com
              </a>
            </li>
            <li>
              📞{" "}
              <a
                href="tel:+919041607156"
                className="hover:underline hover:text-purple-700 dark:hover:text-purple-400"
              >
                +91 90416 07156
              </a>
            </li>
            <li>
              📍 PARTAP NAGAR 20/4D, Bathinda – 151001<br />
              Near Railway Ground, Punjab
            </li>
          </ul>
        </div>

        {/* Social Media & CTA */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-purple-700 dark:text-purple-400">
            Let’s Connect
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Follow us for updates, tips & inspiration. We're just a DM away!
          </p>
          <div className="flex items-center gap-4 text-lg">
            <a
              href="https://www.instagram.com/aman_tailor4088/"
              aria-label="Instagram"
              className="hover:text-pink-500 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/people/Kaur-Aman/61556618293315/"
              aria-label="Facebook"
              className="hover:text-blue-600 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.youtube.com/@Amantailor_4088"
              aria-label="YouTube"
              className="hover:text-red-600 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
            <a
              href="https://wa.me/919041607156"
              aria-label="WhatsApp"
              className="hover:text-green-600 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Divider + Copyright */}
      <div className="mt-12 border-t border-gray-300 dark:border-neutral-700 pt-6 text-center text-sm text-gray-500 dark:text-gray-500">
        © {new Date().getFullYear()} <strong>AMAN TAILOR</strong>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
