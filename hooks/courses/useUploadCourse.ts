import { useState } from "react";

export const useUploadCourse = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const uploadCourse = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/course/uploadCourse", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload course");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error uploading course:", error);
      setError(error.message || "Something went wrong");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadCourse,
    loading,
    error,
  };
};
