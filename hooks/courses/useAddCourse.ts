"use client";

import { useState } from "react";
import { useCourseContext } from "@/context/course/CourseContext";

export function useAddCourse() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addCourse } = useCourseContext();

  const addCourseToBackend = async (data: {
    title: string;
    description: string;
    price: string;
    category: string;
    videos: string[];
  }) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/course/addCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          price: Number(data.price),
          category: data.category,
          videos: data.videos,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to add course.");
      }

      // ⬇️ Save in context
      addCourse(json.course);
      return json.course;
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addCourse: addCourseToBackend, loading, error };
}
