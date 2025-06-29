"use client";

import { createContext, useContext, useEffect } from "react";
import { useGetCourses } from "@/hooks/courses/useGetCourses";

type Course = {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  slug: string;
};

export type CourseContextType = {
  courses: Course[];
  loading: boolean;
  error: string | null;
  refetchCourses: () => Promise<void>;
  addCourse: (course: Course) => void;
};

const CourseContext = createContext<CourseContextType | null>(null);

export const CourseProvider = ({children,}: {children: React.ReactNode;}) => {
  const { courses, loading, error, fetchCourses,setCourses } = useGetCourses();
  useEffect(() => {
    fetchCourses();
  }, []);
  const addCourse = (course: Course) => {
    setCourses((prev) => [course, ...prev]);
  };

  return (
    <CourseContext.Provider value={{ courses, loading, error, refetchCourses: fetchCourses,addCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within CourseProvider");
  }
  return context;
};
