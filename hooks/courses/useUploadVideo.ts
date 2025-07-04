import { useState } from "react";

type VideoData = {
  courseId: string;
  title: string;
  bunnyVideoId: string;
  embedUrl: string;
};

export const useUploadVideo = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const uploadVideo = async (data: VideoData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/course/uploadVideos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload video");
      }

      const result = await response.json();
      return result;
    } catch (error: any) {
      setError(error.message || "Something went wrong");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadVideo,
    loading,
    error,
  };
};
