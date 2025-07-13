"use client";

import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface CourseRowProps {
  course: {
    id: string;
    title: string;
    price: number;
    category?: string;
    createdAt?: string;
  };
}

const CourseRow = ({ course }: CourseRowProps) => {
  const router = useRouter();

  return (
    <tr
      key={course.id}
      className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition cursor-pointer w-full"
      onClick={() => router.push(`/admin/courses/${course.id}`)}
    >
      {/* Course Title */}
      <td className="px-6 py-5 text-gray-900 dark:text-white">
        <div className="text-base font-medium">{course.title}</div>
      </td>

      {/* Category */}
      <td className="px-6 py-5 text-gray-700 dark:text-gray-300">
        {course.category || "Uncategorized"}
      </td>

      {/* Price */}
      <td className="px-6 py-5 text-gray-700 dark:text-gray-300">
        ₹{course.price}
      </td>

      {/* Created Date (optional) */}
      <td className="px-6 py-5 text-gray-600 dark:text-gray-400">
        {course.createdAt
          ? new Date(course.createdAt).toLocaleDateString()
          : "-"}
      </td>

      {/* Actions */}
      <td
        className="px-6 py-5"
        onClick={(e) => e.stopPropagation()} // Prevent row navigation on button click
      >
        <div className="flex gap-4 items-center">
          <Link
            href={`/admin/courses/${course.id}`}
            className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
            title="Edit"
            onClick={(e) => e.stopPropagation()}
          >
            <FaEdit size={18} />
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Delete", course.id);
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
