"use client";

import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative h-[86vh] md:h-[91vh] flex items-center justify-center overflow-hidden bg-gray-900 text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/home/hero.png')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/20 dark:from-neutral-900/80 dark:via-neutral-900/60 dark:to-neutral-900/20 backdrop-blur-[2px] transition-colors duration-700" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-purple-700 dark:text-purple-400 mb-3">
          India’s #1 Online Tailoring Academy
        </p>

        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white drop-shadow-md">
          Master the Art of <span className="text-purple-700 dark:text-purple-400">Stitching</span><br />
          from Home
        </h1>

        <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Join thousands of learners across India transforming their passion into skill.
          From absolute beginners to future professionals — we’ve got a course for you.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/courses"
            className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
          >
            Explore Courses
          </Link>
          <Link
            href="/contact"
            className="bg-white text-purple-700 hover:bg-purple-800 hover:text-white border border-purple-700 font-semibold px-6 py-3 rounded-full transition dark:bg-transparent dark:text-purple-300 dark:border-purple-300 dark:hover:bg-purple-700"
          >
            Talk to Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
