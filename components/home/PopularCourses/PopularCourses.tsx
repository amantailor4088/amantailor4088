"use client";

import Link from "next/link";
import { useCourseContext } from "@/context/course/CourseContext";
import Image from "next/image";
const PopularCourses = () => {
  const { courses } = useCourseContext();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-white via-purple-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Recommended Courses
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-14">
          Tailored for all learners — from beginners to advanced stitchers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses?.length === 0 && (
            <p className="col-span-full text-gray-500 dark:text-gray-400">
              No courses found.
            </p>
          )}

          {courses?.map((course) => (
            <div>
              {course.isRecommended && (
                <article
                  key={course.id}
                  className="group relative bg-white/90 dark:bg-neutral-900/80 backdrop-blur-md border border-gray-100 dark:border-neutral-700 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {course.title.includes("workshop") && (
                    <Image
                      src="/workshop.jpg"
                      alt={course.title}
                      className="h-48 w-full object-cover rounded-t-3xl"
                    />
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {course.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {course.description}
                    </p>

                    <div className="mt-auto">
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                        <span>💰 ₹{course.price}</span>
                        {course.discountPrice > 0 && (
                          <span className="text-green-600 dark:text-green-400">
                            Sale: ₹{course.discountPrice}
                          </span>
                        )}
                        <span>
                          {course.isRecommended ? "⭐ Recommended" : ""}
                        </span>
                      </div>

                      <Link
                        href={`/courses/details/${course.id}`}
                        className="inline-block w-full text-center bg-purple-700 hover:bg-purple-800 text-white font-medium px-5 py-2.5 rounded-full transition"
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </article>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
