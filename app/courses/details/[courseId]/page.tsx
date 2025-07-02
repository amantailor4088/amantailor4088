"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useCourseContext } from "@/context/course/CourseContext";
import { useAuth } from "@/context/auth/AuthContext";
import {
  FaLock,
  FaCheckCircle,
  FaPlayCircle,
  FaEye,
  FaRupeeSign,
  FaCertificate,
  FaClock,
} from "react-icons/fa"; // Added FaRupeeSign, FaCertificate, FaClock

export default function CourseDetailPage() {
  const { courseId } = useParams() as { courseId: string };
  const { courses, loading } = useCourseContext();
  const { user } = useAuth();

  const existingCourse = courses.find((c) => c.id === courseId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-lg font-medium text-gray-700 dark:text-gray-300 animate-pulse">
          Loading course details...
        </div>
      </div>
    );
  }

  if (!existingCourse) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="p-8 bg-white dark:bg-neutral-800 rounded-xl shadow-xl text-center">
          <p className="text-red-600 text-2xl font-bold mb-3">
            Course not found.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-base">
            It seems this course isn't available. Please verify the URL or try
            refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  const userHasPurchased = user?.coursesPurchased?.includes(existingCourse.id);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 dark:from-gray-950 dark:to-gray-800 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT SIDE - Course Information */}
        <div className="md:col-span-2 space-y-7">
          <section className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-7 transform hover:scale-[1.005] transition-transform duration-300 ease-in-out border border-gray-100 dark:border-neutral-700">
            {/* Title */}
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3 leading-tight">
              {existingCourse.title}
            </h1>

            {/* Thumbnail */}
            <div className="relative w-full h-64 overflow-hidden rounded-xl shadow-md mb-5">
              <img
                src={existingCourse.thumbnail}
                alt={existingCourse.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
              {existingCourse.description}
            </p>

            {/* Course Features/Highlights (Optional, but adds value) */}
            <div className="grid grid-cols-2 gap-4 text-gray-600 dark:text-gray-300 text-sm mb-6">
              <div className="flex items-center">
                <FaClock className="text-indigo-500 mr-2" />
                <span>Self-paced learning</span>
              </div>
              <div className="flex items-center">
                <FaCertificate className="text-green-500 mr-2" />
                <span>Certificate of Completion</span>
              </div>
              <div className="flex items-center">
                <FaEye className="text-blue-500 mr-2" />
                <span>Lifetime Access</span>
              </div>
              <div className="flex items-center">
                <FaPlayCircle className="text-red-500 mr-2" />
                <span>High-Quality Videos</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 dark:from-neutral-700 to-indigo-50 dark:to-neutral-700 p-4 rounded-lg shadow-inner border border-blue-100 dark:border-neutral-600">
              <div className="flex items-baseline space-x-2 mt-2">
                <div className="flex items-baseline text-gray-900 dark:text-gray-100">
                  <FaRupeeSign className="text-xl mr-1" />
                  <span className="text-2xl font-extrabold tracking-tight">
                    {existingCourse.price}
                  </span>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-2">
                    INR
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  (incl. all taxes)
                </span>
              </div>

              <span className="bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
                BEST VALUE
              </span>
            </div>
          </section>

          <section className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-7">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
              Course Content
            </h3>

            {existingCourse.videos?.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-neutral-700">
                {existingCourse.videos.map((video, index) => (
                  <li
                    key={video.bunnyVideoId}
                    className="flex items-center justify-between py-3 px-2 group hover:bg-gray-50 dark:hover:bg-neutral-700 transition duration-150 ease-in-out cursor-pointer"
                  >
                    <div className="flex items-center">
                      <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold mr-3 w-6 text-center">
                        {index + 1}.
                      </span>
                      <span className="text-gray-800 dark:text-gray-100 font-medium text-base">
                        {video.title}
                      </span>
                    </div>
                    {userHasPurchased ? (
                      <span className="text-green-600 dark:text-green-400 text-xs font-semibold flex items-center">
                        <FaEye className="mr-1" /> View
                      </span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 text-xs font-semibold flex items-center">
                        <FaLock className="mr-1" /> Locked
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 dark:text-gray-300 text-base italic">
                No videos have been added to this course yet. Please check back
                soon!
              </p>
            )}
          </section>
        </div>

        {/* RIGHT SIDE - Call to Action / Purchase */}
        <div className="space-y-7">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-7 sticky top-20 transform hover:scale-[1.005] transition-transform duration-300 ease-in-out">
            {userHasPurchased ? (
              <div className="text-center space-y-4">
                <FaCheckCircle className="text-green-600 dark:text-green-400 text-5xl mx-auto mb-2 animate-bounce" />
                <p className="text-green-700 dark:text-green-400 text-xl font-bold">
                  You own this course!
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-base">
                  Dive in and start your learning journey.
                </p>
                <button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold py-3 rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center text-lg"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <FaPlayCircle className="mr-2 text-base" /> Start Watching
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-900 dark:text-gray-100 text-2xl font-bold mb-4">
                  Get Full Access
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-base mb-6">
                  Unlock all high-quality course videos, exercises, and
                  exclusive resources to master this topic.
                </p>
                <button className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-3 rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out text-lg">
                  Buy Now – ₹{existingCourse.price}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
