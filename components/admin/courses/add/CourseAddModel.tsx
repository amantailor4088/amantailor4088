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
  const [thumbnail, setThumbnail] = useState<File | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!thumbnail) return alert("Thumbnail required!");

    try {
      const course = await addCourse({
        title,
        description,
        price,
        category,
        thumbnail,
      });
      setShowModal(false);
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setThumbnail(null);
      
      console.log("Course created:", course);
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

          {/* Thumbnail Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-600 dark:text-gray-300 file:bg-purple-600 file:text-white file:rounded-md file:px-4 file:py-2 file:border-none file:mr-4"
            required
          />
          {thumbnail && (
            <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
              Selected file: {thumbnail.name}
            </p>
          )}

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
