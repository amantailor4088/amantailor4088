"use client";
import { useParams } from "next/navigation";
import { useCourseContext } from "@/context/course/CourseContext";
import { useAuth } from "@/context/auth/AuthContext";
import {
  FaLock,
  FaCheckCircle,
  FaPlayCircle,
  FaEye,
} from "react-icons/fa";
import PurchaseButton from "@/components/course/PurchaseButton";
import { useState } from "react";
import CourseDetailsCard from "@/components/course/CourseDetailCard";

export default function CourseDetailPage() {
  const { courseId } = useParams() as { courseId: string };
  const { courses, loading } = useCourseContext();

  const { user } = useAuth();
  const [expandedVideoIndex, setExpandedVideoIndex] = useState<number | null>(
    null
  );

  const existingCourse = courses.find((c) => c.id === courseId);

   console.log("Existing Course:", existingCourse);

  // Check course expiry
  let isExpired = false;
  let expiryDateFormatted: string | null = null;

  if (existingCourse?.expiryDate) {
    const expiryDate = new Date(existingCourse.expiryDate);
    const today = new Date();
    isExpired = today > expiryDate;

    expiryDateFormatted = expiryDate.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // YouTube ID extractor (supports all common formats)
  function extractYouTubeId(url: string): string | null {
    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
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

  if (isExpired) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="p-8 bg-white dark:bg-neutral-800 rounded-xl shadow-xl text-center">
          <p className="text-red-600 text-2xl font-bold mb-3">
            🚫 This course has expired.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-base">
            Please contact support if you believe this is a mistake.
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
          <CourseDetailsCard
            title={existingCourse.title}
            description={existingCourse.description}
            price={existingCourse.price}
            discountPrice={existingCourse.discountPrice}
          />

          <section className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Course Content
            </h3>

            {existingCourse.videos?.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-neutral-700">
                {existingCourse.videos.map((video, index) => {
                  const youtubeId = extractYouTubeId(video.url);
                  const isExpanded = expandedVideoIndex === index;

                  return (
                    <li key={index} className="py-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold mr-3 w-6 text-center">
                            {index + 1}.
                          </span>
                          <span className="text-gray-800 dark:text-gray-100 font-medium text-base">
                            {video.title || `Video ${index + 1}`}
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
                            title={video.title || `Video ${index + 1}`}
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
                
                <p className="text-gray-600 dark:text-gray-300 text-base">
                  Enjoy access to all course materials, including
                  videos, exercises, and resources.
                </p>
                {/* ✅ Expiry Date Shown */}
                {expiryDateFormatted && (
                  <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 mt-3">
                    <FaPlayCircle className="mr-2 text-base" />
                    Expiry Date:
                    <span className="ml-1 font-semibold">
                      {expiryDateFormatted}
                    </span>
                  </div>
                )}
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
                  discount={existingCourse.discountPrice}
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
