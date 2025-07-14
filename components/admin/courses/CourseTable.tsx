"use client";

import { useState } from "react";
import Link from "next/link";
import { useCourseContext } from "@/context/course/CourseContext";
import { useDeleteCourse } from "@/hooks/courses/useDeleteCourse";
import AddCourseModal, { ExistingCourseType } from "./add/CourseAddModel";

const CourseTable = () => {
  const { courses, loading, error } = useCourseContext();
  const { deleteCourse } = useDeleteCourse();
  const [deletingCourseId, setDeletingCourseId] = useState<string | null>(null);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<ExistingCourseType | null>(null);

 const handleEditCourse = (courseId: string) => {
  const course = courses.find((c) => c.id === courseId);
  if (!course) {
    console.error("Course not found!");
    return;
  }
   
  setSelectedCourse(course);
  setShowAddCourseModal(true);
};


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
                Sr No.
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
            {courses.map((course, index) => (
              <tr
                key={course.id}
                className="hover:bg-gray-50 dark:hover:bg-neutral-800"
              >
                <td className="px-6 py-4 text-gray-800 dark:text-white">
                  {index + 1}
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
                    <button
                      onClick={() => handleEditCourse(course.id)}
                      className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      Edit
                    </button>
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
        {courses.map((course, index) => (
          <div
            key={course.id}
            className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-neutral-700 shadow-sm hover:bg-gray-50 dark:hover:bg-neutral-700 transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Sr No. {index + 1}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                ₹{course.price}
              </span>
            </div>
             <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1 hover:underline">
                {course.title}
              </h3>
            <div className="mt-3 flex justify-end gap-4 text-sm">
              <button
                onClick={() => handleEditCourse(course.id)}
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCourse(course.id)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                disabled={deletingCourseId === course.id}
              >
                {deletingCourseId === course.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddCourseModal && selectedCourse && (
        <AddCourseModal
          isOpen={showAddCourseModal}
          setShowModal={setShowAddCourseModal}
          mode="edit"
          course={selectedCourse}
        />
      )}
    </div>
  );
};

export default CourseTable;
