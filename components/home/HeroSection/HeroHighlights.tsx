"use client";

import { CheckCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";

const highlights = [
  "Over 1,000+ students trained across India",
  "Courses available in Punjabi",
  "Online + Offline learning options",
  "ISO 9001:2015 Certified",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const HeroHighlights = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm uppercase font-semibold tracking-wide text-purple-600 dark:text-purple-400 mb-12">
          Trusted by Learners Nationwide
        </p>

        {/* <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white mb-12">
          Why Choose{" "}
          <span className="text-purple-600 dark:text-purple-400">AMAN TAILOR</span>?
        </h2> */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((point, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="relative p-6 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 group transition-transform hover:-translate-y-1 hover:shadow-xl flex flex-row items-start gap-4 text-center"
            >
              {/* Icon with glow */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-purple-400 opacity-20 blur-2xl" />
                <div className="relative p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full ring-2 ring-purple-200 dark:ring-purple-500/30">
                  <CheckCircle className="h-6 w-6 text-purple-700 dark:text-purple-400" />
                </div>
              </div>

              {/* Text */}
              <p className="text-base font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                {point}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroHighlights;
