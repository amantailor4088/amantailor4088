"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/context/auth/AuthContext";
import { useRouter } from "next/navigation";

function Page() {
  const { user } = useAuth();
  const router = useRouter();

   useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null; 
  }

  const courses = user.coursesPurchased || [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
          My Courses
        </h1>

        {courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-5 flex flex-col"
              >
                <img
                  src={course.thumbnail || "/placeholder.jpg"}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h2 className="text-xl font-bold mt-4 text-gray-800">
                  {course.title}
                </h2>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {course.description || "No description available."}
                </p>
                <button
                  className=" bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-4"
                  onClick={() => router.push(`/courses/${course.slug}`)}
                >
                  View Course
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            You have not purchased any courses yet.
          </p>
        )}
      </main>
    </div>
  );
}

export default Page;
