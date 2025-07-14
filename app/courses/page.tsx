"use client";

import Link from "next/link";
import { useCourseContext } from "@/context/course/CourseContext";
import { useAuth } from "@/context/auth/AuthContext";

export default function CoursesPage() {
  const { courses, loading, error } = useCourseContext();
  const { user } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] text-2xl text-gray-700 font-semibold">
        <svg
          className="animate-spin -ml-1 mr-3 h-8 w-8 text-pink-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading courses...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] text-2xl text-red-600 font-semibold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 mr-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Error: {error}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stitching Courses Top Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-600 text-white p-8 md:p-12 rounded-xl shadow-2xl mb-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full mix-blend-overlay transform -translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full mix-blend-overlay transform translate-x-1/4 translate-y-1/4"></div>

        <div className="flex-1 mb-6 md:mb-0 md:mr-8 z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
            Share Your Craft!
          </h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto md:mx-0">
            Are you a master of the needle and thread? Share your unique
            stitching and sewing expertise by adding your own course!
          </p>
        </div>
        <Link href="/courses/add" className="z-10">
          <button className="bg-white text-purple-700 hover:bg-purple-100 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300">
            + Add a Stitching Course
          </button>
        </Link>
      </section>

      {/* User’s Purchased Courses */}
      {user && user.coursesPurchased?.length > 0 && (
        <section className="mb-12" id="my-courses">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center">
            Your Purchased Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {courses
              .filter((course) => user.coursesPurchased.includes(course.id))
              .map((course) => (
                <Link
                  href={`/courses/details/${course.id}`}
                  key={course.id}
                  className="block"
                >
                  <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 flex flex-col h-full p-6">
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full p-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 14l9-5-9-5-9 5 9 5z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 14l6.16-3.422A12.042 12.042 0 0112 21.5a12.042 12.042 0 01-6.16-10.922L12 14z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100">
                          {course.title}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        {course.discountPrice < course.price && (
                          <span className="text-gray-500 dark:text-gray-400 line-through text-sm">
                            ₹{course.price}
                          </span>
                        )}
                        <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full">
                          ₹
                          {course.discountPrice < course.price
                            ? course.price - course.discountPrice
                            : course.price}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow mb-6">
                      {course.description?.slice(0, 120) ||
                        "No description available..."}
                    </p>

                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Lifetime Access
                      </span>
                      <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      )}

      {/* All Courses Grid */}
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Explore Our Creative Stitching Courses
      </h2>
      {courses.length === 0 && !loading && !error ? (
        <div className="text-center text-gray-500 text-xl py-10 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <p className="mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </p>
          <p>No stitching courses available right now. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {courses.map((course) => (
            <Link
              href={`/courses/details/${course.id}`}
              key={course.id}
              className="block"
            >
              <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 flex flex-col h-full p-6">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 14l9-5-9-5-9 5 9 5z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 14l6.16-3.422A12.042 12.042 0 0112 21.5a12.042 12.042 0 01-6.16-10.922L12 14z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100">
                      {course.title}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    {course.discountPrice < course.price && (
                      <span className="text-gray-500 dark:text-gray-400 line-through text-sm">
                        ₹{course.price}
                      </span>
                    )}
                    <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full">
                      ₹
                      {course.discountPrice < course.price
                        ? course.price - course.discountPrice
                        : course.price}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow mb-6">
                  {course.description?.slice(0, 120) ||
                    "No description available..."}
                </p>

                <div className="flex justify-between items-center mt-auto">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Lifetime Access
                  </span>
                  <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
