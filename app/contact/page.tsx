"use client";

import MapPreview from "@/components/contact/MapPreview";
import Link from "next/link";
import React from "react";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }
  return (
    <section className="relative min-h-screen bg-white dark:bg-neutral-950 text-gray-900 dark:text-white py-24 px-6 sm:px-12 lg:px-20 overflow-hidden transition-colors duration-500">
      {/* Abstract Background Accents */}
      <div className="absolute -top-28 -left-36 w-[500px] h-[500px] rounded-full bg-purple-100 dark:bg-purple-800/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-40 w-[600px] h-[600px] rounded-full bg-yellow-100 dark:bg-yellow-400/10 blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        {/* Contact Info + Map Placeholder */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
            Get in <span className="text-yellow-500 dark:text-yellow-400">Touch</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-400 max-w-lg">
            Have questions, feedback, or want to collaborate? We'd love to hear from you.
            Expect a response within 24 hours.
          </p>

          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <strong className="text-purple-600 dark:text-purple-400">📧 Email:</strong>{" "}
              <Link href="mailto:support@amantailor.com" className="hover:underline">
                support@amantailor.com
              </Link>
            </li>
            <li>
              <strong className="text-purple-600 dark:text-purple-400">📞 Phone:</strong>{" "}
              <Link href="tel:+919041607156" className="hover:underline">
                +91 90416 07156
              </Link>
            </li>
            <li>
              <strong className="text-purple-600 dark:text-purple-400">📍 Location:</strong>{" "}
              PARTAP NAGAR 20/4D, Bathinda, Punjab – 151001
            </li>
          </ul>

          {/* Map Placeholder */}
          <div className="mt-10">
            <MapPreview />
          </div>

        </div>

        {/* Form Section */}
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-8 shadow-lg space-y-6 transition-colors duration-500">
          <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-300 mb-2">
            Send Us a Message
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block mb-1 text-sm text-gray-700 dark:text-gray-400">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-sm text-gray-700 dark:text-gray-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-1 text-sm text-gray-700 dark:text-gray-400">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Your message..."
                className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-md transition duration-300 shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
