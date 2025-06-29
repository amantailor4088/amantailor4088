"use client";

import { useState } from "react";
import { useUploadCourse } from "@/hooks/courses/useUploadCourse";
import { validateCourseForm } from "@/lib/validateFormData";
import { useCourseContext } from "@/context/course/CourseContext";

export default function AddCourses() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [videos, setVideos] = useState<{ title: string; file: File | null }[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { addCourse } = useCourseContext();

  const handleAddVideo = () => {
    setVideos([...videos, { title: "", file: null }]);
  };

  const handleRemoveVideo = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleVideoChange = (
    index: number,
    field: "title" | "file",
    value: any
  ) => {
    const updated = [...videos];
    updated[index][field] = value;
    setVideos(updated);
  };

  const { uploadCourse, loading, error } = useUploadCourse();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateCourseForm({
      title,
      description,
      price,
      category,
      thumbnail,
      videos,
    });
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    formData.append(
      "videos",
      JSON.stringify(videos.map((v) => ({ title: v.title })))
    );
    videos.forEach((video, i) => {
      if (video.file) {
        formData.append(`videos[${i}][file]`, video.file);
      }
    });

    try {
      const data = await uploadCourse(formData);
      addCourse(data.course);
      console.log("Upload success:", data);
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setThumbnail(null);
      setVideos([]);
      alert("Course uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Add New Course
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Enter details below to create your stitching course.
          </p>
          {validationErrors.length > 0 && (
            <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
              <h3 className="font-semibold">Validation Errors:</h3>
              <ul className="list-disc pl-5">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Course Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Stitching Basics"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe the course..."
              ></textarea>
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. 499"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Category</option>
                <option value="Stitching Basics">Stitching Basics</option>
                <option value="Advanced Stitching">Advanced Stitching</option>
                <option value="Embroidery">Embroidery</option>
              </select>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Thumbnail Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                className="text-gray-700 dark:text-gray-300"
              />
              {thumbnail && (
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                  Selected file: {thumbnail.name}
                </p>
              )}
            </div>

            {/* Videos Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Course Videos
                </h3>
                <button
                  type="button"
                  onClick={handleAddVideo}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-3 py-2 rounded-md transition"
                >
                  + Add Video
                </button>
              </div>

              {videos.map((video, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-600 rounded-md p-4 bg-gray-50 dark:bg-gray-700"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Video Title */}
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                        Video Title
                      </label>
                      <input
                        type="text"
                        value={video.title}
                        onChange={(e) =>
                          handleVideoChange(index, "title", e.target.value)
                        }
                        className="w-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g. Introduction"
                      />
                    </div>

                    {/* Video File */}
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                        Video File
                      </label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) =>
                          handleVideoChange(
                            index,
                            "file",
                            e.target.files?.[0] || null
                          )
                        }
                        className="text-gray-700 dark:text-gray-300"
                      />
                      {video.file && (
                        <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                          {video.file.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveVideo(index)}
                    className="mt-3 inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Remove Video
                  </button>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
            >
              {loading ? "Uploading..." : "Upload Course"}
            </button>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </form>
        </section>
      </div>
    </main>
  );
}
