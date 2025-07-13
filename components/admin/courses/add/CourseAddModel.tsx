"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useAddCourse } from "@/hooks/courses/useAddCourse";

interface Props {
  isOpen: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddCourseModal({ isOpen, setShowModal }: Props) {
  const router = useRouter();
  const { addCourse, loading, error } = useAddCourse();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [videos, setVideos] = useState<string[]>([""]);

  const handleVideoChange = (index: number, value: string) => {
    const updatedVideos = [...videos];
    updatedVideos[index] = value;
    setVideos(updatedVideos);
  };

  const addVideoField = () => setVideos([...videos, ""]);
  const removeVideoField = (index: number) => {
    const updatedVideos = [...videos];
    updatedVideos.splice(index, 1);
    setVideos(updatedVideos);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const course = await addCourse({
        title,
        description,
        price,
        category,
        videos: videos.filter((link) => link.trim() !== ""),
      });

      setShowModal(false);
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setVideos([""]);

      console.log("Course created:", course);
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg w-full max-w-xl p-6 relative"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Add New Course
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          {/* Description */}
          <textarea
            placeholder="Course Description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          ></textarea>

          {/* Price */}
          <input
            type="number"
            placeholder="Course Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Stitching Basics">Stitching Basics</option>
            <option value="Advanced Stitching">Advanced Stitching</option>
            <option value="Embroidery">Embroidery</option>
          </select>

          {/* YouTube Video Links */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              YouTube Video Links
            </label>
            {videos.map((link, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="url"
                  value={link}
                  onChange={(e) => handleVideoChange(index, e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="flex-1 px-4 py-2 rounded-md bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                {videos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVideoField(index)}
                    className="px-3 text-red-600"
                    title="Remove"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addVideoField}
              className="text-sm text-purple-600 hover:underline"
            >
              + Add another video
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Course"}
          </button>
        </form>

        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-4 text-xl text-gray-500 dark:text-gray-200"
        >
          <IoClose />
        </button>
      </motion.div>
    </div>
  );
}
