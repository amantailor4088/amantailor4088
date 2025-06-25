"use client";

import { CheckCircle } from "lucide-react";

const features = [
  "Learn in your own language",
  "Affordable pricing",
  "Step-by-step guided learning",
  "Community support",
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white dark:bg-neutral-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
          🎯 Why Choose{" "}
          <span className="text-purple-700 dark:text-purple-400">
            AMAN TAILOR
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
          We're committed to making tailoring education accessible, practical,
          and empowering — no matter where you’re starting from.
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 max-w-3xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center justify-start gap-3 px-3 mx-auto sm:mx-0 sm:w-[45%]"
            >
              <CheckCircle className="w-5 h-5 text-purple-700 dark:text-purple-400 shrink-0" />
              <span className="text-base text-gray-800 dark:text-gray-100 font-medium text-left">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
