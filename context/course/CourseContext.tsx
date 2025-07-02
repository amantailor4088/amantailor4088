"use client";

import { createContext, useContext, useEffect } from "react";
import { useGetCourses } from "@/hooks/courses/useGetCourses";

export type Video = {
  title: string;
  embedUrl: string;
  bunnyVideoId: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  videos: Video[];
  category?: string;
};

export type CourseContextType = {
  courses: Course[];
  loading: boolean;
  error: string | null;
  refetchCourses: () => Promise<void>;
  addCourse: (course: Course) => void;
  addVideoToCourse: (courseId: string, video: Video) => void;
  deleteCourse: (courseId: string) => void;
};

const CourseContext = createContext<CourseContextType | null>(null);

export const CourseProvider = ({ children,}: {children: React.ReactNode;}) => {
  const { courses, loading, error, fetchCourses, setCourses } = useGetCourses();

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = (course: Course) => {
    setCourses((prev) => [course, ...prev]);
  };

  const addVideoToCourse = (courseId: string, video: Video) => {
    setCourses((prev) =>
      prev.map((c) => c.id === courseId
          ? { ...c, videos: [...(c.videos || []), video] }
          : c
      )
    );
  };

  const deleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
  }

  return (
    <CourseContext.Provider
      value={{
        courses,
        loading,
        error,
        refetchCourses: fetchCourses,
        addCourse,
        addVideoToCourse,
        deleteCourse
      }}
    >
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
