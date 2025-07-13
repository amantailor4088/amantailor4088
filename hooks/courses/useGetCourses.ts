import { useState } from "react";

export type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  category?: string;
  videos: string[];
};

export const useGetCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/course/getCourses");
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setCourses(data.data);
      console.log("Fetched courses:", data.data);
    } catch (err: any) {
      console.error("Error fetching courses:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { courses, loading, error, fetchCourses, setCourses };
};
