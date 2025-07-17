"use client";

import Link from "next/link";
import Image from "next/image";

const CallToAction = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-purple-800 via-purple-900 to-black dark:from-purple-950 dark:via-black dark:to-purple-950 py-24 px-6 sm:px-10 md:px-20 text-white">
      {/* Decorative Background Image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/home/background.png"
          alt="Decorative background"
          fill
          className="object-cover object-center pointer-events-none select-none"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Text Block */}
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
            Ready to <span className="text-yellow-400">Master Stitching</span> Skills?
          </h2>
          <p className="text-lg text-gray-200 max-w-xl">
            Whether you're starting from scratch or refining your skills — AMAN TAILOR offers certified tailoring courses with expert mentors, flexible access, and instruction in Punjabi.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
            <Link
              href="/courses"
              className="inline-block bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-semibold text-base sm:text-lg px-7 py-3 rounded-full shadow-xl transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
            >
              Explore Courses
            </Link>
          </div>

          {/* Testimonial */}
          <div className="mt-5 text-sm italic text-gray-300">
            ✅ Over <strong>1,000+ students</strong> trained across India
          </div>
        </div>

        {/* Illustration with SVG Blob */}
        <div className="hidden md:block relative h-64 lg:h-80">
          {/* Blob Behind */}
          <svg
            className="absolute -top-10 -left-10 w-[130%] h-[130%] text-purple-700 opacity-30 dark:text-purple-900 z-0"
            viewBox="0 0 700 700"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M437.5 19.5C490.5 43.5 513.5 124 533 185C552.5 246 568.5 288 542 334.5C515.5 381 446.5 432 375 447C303.5 462 229 441 177.5 408C126 375 97 330 77 267.5C57 205 46 124 81.5 77.5C117 31 202 8.5 275.5 4.5C349 0.5 384.5 -4.5 437.5 19.5Z" />
          </svg>

          {/* Main Image */}
          <div className="relative z-10 h-full w-full rounded-xl overflow-hidden shadow-xl ring-1 ring-white/10 ring-offset-2 ring-offset-purple-800">
            <Image
              src="/home/CTA.jpg"
              alt="Tailoring Illustration"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
