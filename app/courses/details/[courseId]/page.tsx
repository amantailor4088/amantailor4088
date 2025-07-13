"use client";
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
} from "react-icons/fa";
import PurchaseButton from "@/components/course/PurchaseButton";
import { useState } from "react";

export default function CourseDetailPage() {
  const { courseId } = useParams() as { courseId: string };
  const { courses, loading } = useCourseContext();
  const { user } = useAuth();
  const [expandedVideoIndex, setExpandedVideoIndex] = useState<number | null>(
    null
  );

  const existingCourse = courses.find((c) => c.id === courseId);
  function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}


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
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-7">
          <section className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-neutral-700">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
              {existingCourse.title}
            </h1>

            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-8 text-center">
              {existingCourse.description ||
                "No description available for this course."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-gray-600 dark:text-gray-300 text-sm mb-8">
              <div className="flex items-center justify-center">
                <FaClock className="text-indigo-500 mr-2" />
                <span>Self-paced learning</span>
              </div>
              <div className="flex items-center justify-center">
                <FaCertificate className="text-green-500 mr-2" />
                <span>Certificate</span>
              </div>
              <div className="flex items-center justify-center">
                <FaEye className="text-blue-500 mr-2" />
                <span>Lifetime Access</span>
              </div>
              <div className="flex items-center justify-center">
                <FaPlayCircle className="text-red-500 mr-2" />
                <span>HD Videos</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-gradient-to-r from-blue-50 dark:from-neutral-700 to-indigo-50 dark:to-neutral-700 p-6 rounded-lg shadow-inner border border-blue-100 dark:border-neutral-600">
              <div className="flex items-center text-gray-900 dark:text-gray-100">
                <FaRupeeSign className="text-2xl mr-2" />
                <span className="text-3xl font-extrabold tracking-tight">
                  {existingCourse.price}
                </span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-2">
                  INR
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                (incl. all taxes)
              </span>
              <span className="bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
                BEST VALUE
              </span>
            </div>
          </section>

          <section className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Course Content
            </h3>

            {existingCourse.videos?.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-neutral-700">
                {existingCourse.videos.map((videoUrl, index) => {
                  const youtubeId = extractYouTubeId(videoUrl);
                  const isExpanded = expandedVideoIndex === index;

                  return (
                    <li key={index} className="py-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold mr-3 w-6 text-center">
                            {index + 1}.
                          </span>
                          <span className="text-gray-800 dark:text-gray-100 font-medium text-base">
                            Video {index + 1}
                          </span>
                        </div>

                        {!userHasPurchased ? (
                          <span className="text-red-600 dark:text-red-400 text-sm font-semibold flex items-center">
                            <FaLock className="mr-1" /> Locked
                          </span>
                        ) : (
                          <button
                            onClick={() =>
                              setExpandedVideoIndex(isExpanded ? null : index)
                            }
                            className={`${
                              isExpanded
                                ? "bg-green-600 text-white"
                                : "text-green-600 dark:text-green-400"
                            } text-xs font-semibold flex items-center px-3 py-1 rounded-full border border-green-600 hover:bg-green-700 hover:text-white transition`}
                          >
                            <FaEye className="mr-1" />
                            {isExpanded ? "Hide" : "View"}
                          </button>
                        )}
                      </div>

                      {userHasPurchased && isExpanded && youtubeId && (
                        <div className="mt-4 w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                          <iframe
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title={`Video ${index + 1}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          ></iframe>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-600 dark:text-gray-300 text-base italic">
                No videos have been added to this course yet.
              </p>
            )}
          </section>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-7">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 sticky top-20">
            {userHasPurchased ? (
              <div className="text-center space-y-4">
                <FaCheckCircle className="text-green-600 dark:text-green-400 text-5xl mx-auto mb-2 animate-bounce" />
                <p className="text-green-700 dark:text-green-400 text-xl font-bold">
                  You own this course!
                </p>
                <button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold py-3 rounded-lg shadow-md flex items-center justify-center text-lg"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  <FaPlayCircle className="mr-2 text-base" /> Start Watching
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-900 dark:text-gray-100 text-2xl font-bold mb-4 text-center">
                  Get Full Access
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-base mb-6 text-center">
                  Unlock all HD videos, exercises & exclusive resources.
                </p>
                <PurchaseButton
                  price={existingCourse.price}
                  courseId={existingCourse.id}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
