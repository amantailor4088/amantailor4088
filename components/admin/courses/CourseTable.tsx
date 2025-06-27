"use client";

import CourseRow from "./CourseRow";
import Image from "next/image";

interface Course {
  _id: string;
  title: string;
  status: string;
  enrolledUsers: number;
  createdAt: string;
  thumbnail: string;
}

interface CourseTableProps {
  courses: Course[];
}

const CourseTable = ({ courses }: CourseTableProps) => {
  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto border border-gray-200 dark:border-neutral-700 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 text-sm">
          <thead className="bg-gray-100 dark:bg-neutral-800">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                Course
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                Status
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                Enrolled
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                Created
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
            {courses.map((course) => (
              <CourseRow key={course._id} course={course} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-neutral-700 shadow-sm"
          >
            <div className="flex gap-4">
              <div className="w-28 h-20 rounded overflow-hidden border dark:border-neutral-600 bg-gray-100 dark:bg-neutral-700">
                <Image
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
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Enrolled: {course.enrolledUsers}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Created: {course.createdAt}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                  course.status === "published"
                    ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                }`}
              >
                {course.status}
              </span>

              <div className="flex gap-4 text-sm">
                <button
                  className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                  onClick={() => window.location.href = `/admin/courses/${course._id}`}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  onClick={() => console.log("Delete", course._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseTable;
