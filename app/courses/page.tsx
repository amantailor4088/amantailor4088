"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCourseContext } from "@/context/course/CourseContext";

export default function CoursesPage() {
  const { courses, loading, error } = useCourseContext();

  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      {courses.map((course: any) => (
        <Link href={`/courses/${course.slug}`} key={course.slug}>
          <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-[50%] object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {course.description.slice(0, 70)}...
              </p>
              <p className="text-green-700 font-bold">₹{course.price}</p>
              <button className="mt-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
                Buy Now
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
