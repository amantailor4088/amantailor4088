"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface Props {
  isOpen: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddCourseModal({ isOpen, setShowModal }: Props) {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !thumbnail) return;
    setShowModal(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg w-full max-w-md p-6 relative"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Add New Course</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course Title */}
          <input
            type="text"
            placeholder="Course Title"
            required
            className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Thumbnail Upload */}
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-600 dark:text-gray-300 file:bg-purple-600 file:text-white file:rounded-md file:px-4 file:py-2 file:border-none file:mr-4"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition"
            disabled={false}
          >
            {/* {loading ? "Creating..." : "Create Draft Course"} */} Loading Goes here
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
