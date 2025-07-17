"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CourseTable from "@/components/admin/courses/CourseTable";
import AddCourseModal from "@/components/admin/courses/add/CourseAddModel";
import { useAuth } from "@/context/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminCoursesPage() {
  const [addCourse, setAddCourse] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== "admin") {
      router.push("/courses");
    }
  }, [user, router]);

  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-8 py-10 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            Manage Courses
          </h1>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setAddCourse(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors"
          >
            + Add New Course
          </motion.button>
        </div>

        {/* Table */}
        <CourseTable />
      </div>

      {/* Add Modal */}
      <AddCourseModal isOpen={addCourse} setShowModal={setAddCourse} mode="add" />
    </section>
  );
}
