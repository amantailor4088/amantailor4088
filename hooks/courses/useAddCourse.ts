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
    thumbnail: File;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("thumbnail", data.thumbnail);

      const res = await fetch("/api/course/addCourse", {
        method: "POST",
        body: formData,
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
