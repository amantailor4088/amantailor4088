"use client";

import { useAuth } from "@/context/auth/AuthContext";

export function useAddPurchasedCourse() {
  const { user, setUser } = useAuth();
  

  const addPurchasedCourse = async (courseId: string) => {

    
    if (!user?.id) {
      throw new Error("User not logged in.");
    }

    const response = await fetch("/api/course/addPurchasedCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        courseId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add purchased course.");
    }

    const existingCourses = user?.coursesPurchased || [];
    const updatedCourses = [...existingCourses, courseId];

    const updatedUser = {...user,coursesPurchased: updatedCourses};

    setUser(updatedUser);
    localStorage.setItem("authUser", JSON.stringify(updatedUser));

    return data;
  };

  return { addPurchasedCourse };
}
