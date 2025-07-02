"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useCourseContext } from "@/context/course/CourseContext";
import { useDeleteCourse } from "@/hooks/courses/useDeleteCourse";

const CourseTable = () => {
  const { courses, loading, error } = useCourseContext();
  const { deleteCourse, loading: deleteLoading } = useDeleteCourse();
  const [deletingCourseId, setDeletingCourseId] = useState<string | null>(null);

  const handleDeleteCourse = async (courseId: string) => {
    try {
      setDeletingCourseId(courseId);
      const response = await deleteCourse(courseId);
      if (response?.success) {
        alert("Course deleted successfully");
      }
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("Failed to delete course. Please try again.");
    } finally {
      setDeletingCourseId(null);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto border border-gray-200 dark:border-neutral-700 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 text-sm">
          <thead className="bg-gray-100 dark:bg-neutral-800">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                Thumbnail
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                Title
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                Price
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
            {courses.map((course) => (
              <tr
                key={course.id}
                className="hover:bg-gray-50 dark:hover:bg-neutral-800"
              >
                <td className="px-6 py-4">
                  <Link href={`/admin/uploadVideo/${course.id}`}>
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      width={80}
                      height={50}
                      className="object-cover rounded cursor-pointer"
                    />
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-800 dark:text-white">
                  <Link
                    href={`/admin/uploadVideo/${course.id}`}
                    className="hover:underline"
                  >
                    {course.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-800 dark:text-white">
                  ₹{course.price}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/uploadVideo/${course.id}`}
                      className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      Edit
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      onClick={() => handleDeleteCourse(course.id)}
                      disabled={deletingCourseId === course.id}
                    >
                      {deletingCourseId === course.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/admin/uploadVideo/${course.id}`}
            className="block"
          >
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-neutral-700 shadow-sm hover:bg-gray-50 dark:hover:bg-neutral-700 transition cursor-pointer">
              <div className="flex gap-4">
                <div className="w-28 h-20 rounded overflow-hidden border dark:border-neutral-600 bg-gray-100 dark:bg-neutral-700">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    width={112}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    ₹{course.price}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-4 text-sm">
                <span className="text-purple-600 dark:text-purple-400">
                  Edit
                </span>
                <span className="text-red-600 dark:text-red-400">Delete</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseTable;
