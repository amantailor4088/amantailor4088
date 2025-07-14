"use client";

import { useState } from "react";
import { useCourseContext } from "@/context/course/CourseContext";

export interface VideoPayload {
  title: string;
  url: string;
}

export interface AddCoursePayload {
  title: string;
  description: string;
  price: string; // string from the input field
  discountPrice?: string; // string from input field, optional
  category: string;
  isRecommended?: boolean;
  durationDays?: number;
  videos: VideoPayload[];
}

export function useAddCourse() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addCourse } = useCourseContext();

  const addCourseToBackend = async (data: AddCoursePayload) => {
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
          discountPrice: data.discountPrice ? Number(data.discountPrice) : 0,
          category: data.category,
          isRecommended: data.isRecommended || false,
          durationDays: data.durationDays,
          videos: data.videos,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to add course.");
      }

      // Save to context
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
