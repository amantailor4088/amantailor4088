"use client";

import { useState } from "react";
import { useCourseContext } from "@/context/course/CourseContext";
import { useParams } from "next/navigation";
import { useUploadVideo } from "@/hooks/courses/useUploadVideo";
import { createBunnyVideo, uploadBunnyVideo } from "@/lib/bunny";
import { useGetKeys } from "@/hooks/courses/useGetKeys";
import CourseCard from "@/components/course/CourseCard";
import VideoCard from "@/components/course/VideoCard";
import { useEffect } from "react";

export default function AddCourses() {
  const { courses,addVideoToCourse,loading: courseLoading,} = useCourseContext();
  const { courseId } = useParams() as { courseId: string };
  const { uploadVideo, error } = useUploadVideo();
  const [loading, setloading] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const existingCourse = courses.find((c) => c.id === courseId);

  if (courseLoading) {
    return <div className="p-8 text-center">Loading courses...</div>;
  }

  if (!existingCourse) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 text-lg font-semibold">Course not found.</p>
        <p className="text-gray-500 mt-2">
          Please check the URL or refresh the courses list.
        </p>
      </div>
    );
  }

  const handleUploadVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);
    if (!videoTitle || !videoFile) {
      alert("Both video title and file are required.");
      return;
    }

    try {
      const keys = await useGetKeys();
      console.log("keys", keys);
      const { BUNNY_API_KEY, LIBRARY_ID } = keys;

      const bunnyVideoData = await createBunnyVideo(
        videoTitle,
        BUNNY_API_KEY,
        LIBRARY_ID
      );
      await uploadBunnyVideo(
        bunnyVideoData.guid,
        videoFile,
        BUNNY_API_KEY,
        LIBRARY_ID
      );
      const embedUrl = `https://video.bunnycdn.com/embed/${LIBRARY_ID}/${bunnyVideoData.guid}`;

      // Prepare video data to be sent to the server
      const videoData = {
        courseId: existingCourse.id,
        title: videoTitle,
        bunnyVideoId: bunnyVideoData.guid,
        embedUrl,
      };

      // Call the uploadVideo function to send data to the server
      const response = await uploadVideo(videoData);
      if (response) {
        // Add the video to the course context
        addVideoToCourse(existingCourse.id, {
          title: videoTitle,
          embedUrl,
          bunnyVideoId: bunnyVideoData.guid,
        });

        alert("Video uploaded successfully!");
        setloading(false);
        setVideoTitle("");
        setVideoFile(null);
      } else {
        alert("Failed to upload video. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video. Please try again.");
    }finally {
      setloading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <CourseCard existingCourse={existingCourse} />

        {/* Upload Form */}
        <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Upload New Video
          </h3>
          <form onSubmit={handleUploadVideo} className="space-y-6">
            {/* Video Title */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Video Title
              </label>
              <input
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Introduction to Basics"
                required
              />
            </div>

            {/* Video File */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Upload Video File
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                className="w-full text-gray-700 dark:text-gray-300"
                required
              />
              {videoFile && (
                <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                  Selected file: {videoFile.name}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md transition"
            >
              {loading ? "Uploading..." : "Upload Video"}
            </button>
            {error && <span className="text-red-500 ml-2">{error}</span>}
          </form>
        </section>

        {/* Uploaded Videos */}
        {existingCourse.videos?.length > 0 && (
          <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Uploaded Videos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {existingCourse.videos.map((video) => (
                <VideoCard key={video.bunnyVideoId} video={video} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
