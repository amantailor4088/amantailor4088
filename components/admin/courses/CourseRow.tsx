"use client";

import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface CourseRowProps {
  course: {
    _id: string;
    title: string;
    status: string;
    enrolledUsers: number;
    createdAt: string;
    thumbnail: string;
  };
}

const CourseRow = ({ course }: CourseRowProps) => {
  const router = useRouter();

  return (
    <tr
      key={course._id}
      className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition cursor-pointer w-full"
      onClick={() => router.push(`/admin/courses/${course._id}`)}
    >
      {/* Course Info with Thumbnail */}
      <td className="px-6 py-5 text-gray-900 dark:text-white">
        <div className="flex items-center gap-4">
          <div className="w-32 h-20 rounded-md overflow-hidden border border-gray-300 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800 shrink-0">
            <Image
              src={course.thumbnail}
              alt={course.title}
              width={128}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-base font-medium">{course.title}</div>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
            course.status === "published"
              ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
          }`}
        >
          {course.status}
        </span>
      </td>

      {/* Enrolled Count */}
      <td className="px-6 py-5 text-gray-700 dark:text-gray-300">
        {course.enrolledUsers}
      </td>

      {/* Created Date */}
      <td className="px-6 py-5 text-gray-600 dark:text-gray-400">
        {course.createdAt}
      </td>

      {/* Actions */}
      <td
        className="px-6 py-5"
        onClick={(e) => e.stopPropagation()} // Prevent row navigation on button click
      >
        <div className="flex gap-4 items-center">
          <Link
            href={`/admin/courses/${course._id}`}
            className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
            title="Edit"
            onClick={(e) => e.stopPropagation()}
          >
            <FaEdit size={18} />
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Delete", course._id);
            }}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            title="Delete"
          >
            <FaTrash size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CourseRow;
