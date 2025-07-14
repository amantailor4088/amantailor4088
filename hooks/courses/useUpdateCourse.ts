import { useCourseContext } from "@/context/course/CourseContext";
import { useState } from "react";

export type UpdateCoursePayload = {
  id: string;
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  durationDays?: number;
  videos?: {
    title: string;
    url: string;
  }[];
};


export function useUpdateCourse() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { updateCourse: updateCourseInContext } = useCourseContext();

  const updateCourse = async (data: UpdateCoursePayload) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/course/updateCourse", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to update course.");
      }

      // Update in context
      updateCourseInContext(json.course);

      return json.course;
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateCourse, loading, error };
}
