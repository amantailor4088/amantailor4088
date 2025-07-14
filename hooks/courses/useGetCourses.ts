import { useState } from "react";

export type Video = {
  title: string;
  url: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  category?: string;
  expiryDate?: string | null;
  videos: Video[];
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

      const transformedCourses: Course[] = data.data.map((course: any) => ({
        id: course.id ,
        title: course.title,
        description: course.description,
        price: course.price,
        category: course.category,
        expiryDate: course.expiryDate || null,
        videos: course.videos || [],
      }));

      setCourses(transformedCourses);
      console.log("Fetched courses:", transformedCourses);
    } catch (err: any) {
      console.error("Error fetching courses:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { courses, loading, error, fetchCourses, setCourses };
};
