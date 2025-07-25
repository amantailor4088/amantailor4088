"use client";

import { createContext, useContext, useEffect } from "react";
import { useGetCourses } from "@/hooks/courses/useGetCourses";

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
  discountPrice: number;
  isRecommended: boolean;
  expiryDate?: string | null;
  videos: Video[];
};

export type CourseContextType = {
  courses: Course[];
  loading: boolean;
  error: string | null;
  refetchCourses: () => Promise<void>;
  addCourse: (course: Course) => void;
  deleteCourse: (courseId: string) => void;
  updateCourse : (Course : Course)=> void;
};

const CourseContext = createContext<CourseContextType | null>(null);

export const CourseProvider = ({
  children,   
}: {
  children: React.ReactNode;
}) => {
  const { courses, loading, error, fetchCourses, setCourses } =
    useGetCourses();

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = (course: Course) => {
    setCourses((prev) => [course, ...prev]);
  };

  const updateCourseInContext = (updatedCourse: Course) => {
  setCourses((prev) =>
    prev.map((course) =>
      course.id === updatedCourse.id ? updatedCourse : course
    )
  );
};

  const deleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        loading,
        error,
        refetchCourses: fetchCourses,
        addCourse,
        deleteCourse,
        updateCourse: updateCourseInContext,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourseContext must be used within CourseProvider");
  }
  return context;
};
