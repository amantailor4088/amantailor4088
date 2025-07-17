"use client";

import {
  FaClock,
  FaCertificate,
  FaEye,
  FaPlayCircle,
  FaRupeeSign,
} from "react-icons/fa";

export interface CourseDetailsCardProps {
  title: string;
  description?: string;
  price: number;
  discountPrice: number;
}

export default function CourseDetailsCard({
  title,
  description,
  price,
  discountPrice,
}: CourseDetailsCardProps) {
  const hasDiscount =
    discountPrice > 0 && discountPrice < price;

  const actualPrice = hasDiscount
    ? price - discountPrice
    : price;

  return (
    <section className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-neutral-700">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
        {title}
      </h1>

      <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-8 text-center">
        {description || "No description available for this course."}
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
        <div className="flex flex-col sm:flex-row items-center">
          {hasDiscount && (
            <div className="flex items-center text-gray-500 dark:text-gray-400 line-through mr-3">
              <FaRupeeSign className="text-xl mr-1" />
              <span className="text-2xl font-semibold">{price}</span>
            </div>
          )}

          <div className="flex items-center text-gray-900 dark:text-gray-100">
            <FaRupeeSign className="text-2xl mr-2" />
            <span className="text-3xl font-extrabold tracking-tight">
              {actualPrice}
            </span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-2">
              INR
            </span>
          </div>
        </div>

        <span className="text-xs text-gray-500 dark:text-gray-400">
          (incl. all taxes)
        </span>

        {hasDiscount && (
          <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
            SAVE ₹{discountPrice}
          </span>
        )}
      </div>
    </section>
  );
}
