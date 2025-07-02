// hooks/courses/useDeleteCourse.ts

import { useCourseContext } from "@/context/course/CourseContext";
import { useState } from "react";

export const useDeleteCourse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {deleteCourse:deleteCourseInContext} = useCourseContext();

  const deleteCourse = async (courseId: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/course/deleteCourse/${courseId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete course.");
      }
      deleteCourseInContext(courseId);
      return data; 
    } catch (err: any) {
      setError(err.message || "An error occurred.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { deleteCourse, loading, error };
};
