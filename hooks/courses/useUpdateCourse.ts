import { useCourseContext } from "@/context/course/CourseContext";
import { useState } from "react";

export type UpdateCoursePayload = {
  id: string;
  title: string;
  description?: string;
  price: number;
  discountPrice?: number;
  isRecommended?: boolean;
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

      // ✅ Update the course in context
      updateCourseInContext({
        id: json.course.id,
        title: json.course.title,
        description: json.course.description,
        price: json.course.price,
        discountPrice: json.course.discountPrice,
        isRecommended: json.course.isRecommended,
        category: json.course.category,
        expiryDate: json.course.expiryDate,
        videos: json.course.videos,
      });

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
