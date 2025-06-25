"use client";

import Image from "next/image";
import Link from "next/link";

const courses = [
  {
    id: 1,
    title: "Basic Stitching for Beginners",
    description:
      "Start your tailoring journey with the foundations — ideal for hobbyists and complete beginners.",
    image: "/recomended1.jpg",
    href: "/",
    rating: 4.8,
    duration: "4 Weeks",
    language: "Punjabi & Hindi",
    level: "Beginner",
    tag: "Trending",
  },
  {
    id: 2,
    title: "Punjabi Suit Tailoring",
    description:
      "Learn to stitch salwar suits, kurtis, and Punjabi dresses with cultural precision and flair.",
    image: "/recomended1.jpg",
    href: "/",
    rating: 5.0,
    duration: "6 Weeks",
    language: "Punjabi Only",
    level: "Intermediate",
    tag: "New",
  },
  {
    id: 3,
    title: "Advanced Blouse Cutting",
    description:
      "Master modern and traditional blouse styles. Includes pattern drafting and client fitting tips.",
    image: "/recomended1.jpg",
    href: "/",
    rating: 4.9,
    duration: "5 Weeks",
    language: "Punjabi + English",
    level: "Advanced",
    tag: "",
  },
];

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push("⭐");
  }
  if (hasHalf) stars.push("✨");
  return stars.join(" ");
};

const PopularCourses = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-white via-purple-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Recomended Courses
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-14">
          Tailored for all learners — from beginners to advanced stitchers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <article
              key={course.id}
              className="group relative bg-white/90 dark:bg-neutral-900/80 backdrop-blur-md border border-gray-100 dark:border-neutral-700 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Ribbon */}
              {course.tag && (
                <div className="absolute top-4 right-4 bg-purple-700 text-white text-xs px-3 py-1 rounded-full shadow-md uppercase tracking-wide z-10">
                  {course.tag}
                </div>
              )}

              {/* Image */}
              <div className="relative h-52 w-full">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Badge */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {course.title}
                </h3>
                <div className="mb-2">
                  <span className="inline-block bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {course.description}
                </p>

                <div className="mt-auto">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span>⏱ {course.duration}</span>
                    <span>🌐 {course.language}</span>
                    <span title={course.rating.toFixed(1)}>{renderStars(course.rating)}</span>
                  </div>

                  <Link
                    href={course.href}
                    className="inline-block w-full text-center bg-purple-700 hover:bg-purple-800 text-white font-medium px-5 py-2.5 rounded-full transition"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
