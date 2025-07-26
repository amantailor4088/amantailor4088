"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useAddCourse } from "@/hooks/courses/useAddCourse";
import { useUpdateCourse } from "@/hooks/courses/useUpdateCourse";
import { UpdateCoursePayload } from "@/hooks/courses/useUpdateCourse";

export type ExistingCourseType = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPrice: number;
  isRecommended: boolean;
  category?: string;
  expiryDate?: string | null;
  videos: {
    title: string;
    url: string;
  }[];
};

interface Props {
  isOpen: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  mode: "add" | "edit";
  course?: ExistingCourseType;
}

interface VideoInput {
  title: string;
  url: string;
}

export default function CourseModal({
  isOpen,
  setShowModal,
  mode,
  course,
}: Props) {
  const router = useRouter();
  const { addCourse, loading: adding, error: addError } = useAddCourse();
  const {
    updateCourse,
    loading: updating,
    error: updateError,
  } = useUpdateCourse();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [isRecommended, setIsRecommended] = useState(false);
  const [category, setCategory] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [videos, setVideos] = useState<VideoInput[]>([{ title: "", url: "" }]);

  useEffect(() => {
    if (mode === "edit" && course) {
      setTitle(course.title);
      setDescription(course.description);
      setPrice(course.price.toString());
      setDiscountPrice(course.discountPrice.toString());
      setIsRecommended(course.isRecommended);
      setCategory(course.category || "");
      setVideos(
        course.videos.length > 0 ? course.videos : [{ title: "", url: "" }]
      );
      setDurationDays(""); // optionally pre-fill if needed
    } else if (mode === "add") {
      setTitle("");
      setDescription("");
      setPrice("");
      setDiscountPrice("");
      setIsRecommended(false);
      setCategory("");
      setDurationDays("");
      setVideos([{ title: "", url: "" }]);
    }
  }, [mode, course]);

  const handleVideoChange = (
    index: number,
    field: keyof VideoInput,
    value: string
  ) => {
    const updated = [...videos];
    updated[index][field] = value;
    setVideos(updated);
  };

  const addVideoField = () => setVideos([...videos, { title: "", url: "" }]);

  const removeVideoField = (index: number) =>
    setVideos(videos.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const preparedVideos = videos.filter((v) => v.title.trim() && v.url.trim());

    try {
      if (mode === "add") {
        await addCourse({
          title,
          description,
          price,
          discountPrice,
          isRecommended,
          category,
          durationDays: durationDays ? Number(durationDays) : undefined,
          videos: preparedVideos,
        });
      } else if (mode === "edit") {
        if (!course?.id) {
          console.error("No course ID provided for update.");
          return;
        }

        const payload: UpdateCoursePayload = {
          id: course.id,
          title,
          description,
          price: Number(price),
          discountPrice: Number(discountPrice),
          isRecommended,
          category,
          durationDays: durationDays ? Number(durationDays) : undefined,
          videos: preparedVideos,
        };

        await updateCourse(payload);
      }

      setShowModal(false);
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-start sm:items-center overflow-auto p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-neutral-900 rounded-2xl overflow-y-auto max-h-screen shadow-2xl w-full max-w-xl p-8 relative border border-gray-200 dark:border-neutral-700"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white text-center">
          {mode === "edit" ? "Edit Course" : "Add New Course"}
        </h2>

        {(addError || updateError) && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-5 text-sm border border-red-200">
            {addError || updateError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Course Title
            </label>
            <input
              type="text"
              placeholder="e.g. Basic Stitching"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 dark:border-neutral-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-neutral-800 dark:text-white"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              placeholder="Briefly describe the course..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 dark:border-neutral-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-neutral-800 dark:text-white"
              required
            />
          </div>

          {/* Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 499"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 dark:border-neutral-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-neutral-800 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Discount Price (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 299"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="w-full border border-gray-300 dark:border-neutral-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-neutral-800 dark:text-white"
              />
            </div>
          </div>

          {/* Recommended Checkbox */}
          <label className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 mt-2">
            <input
              type="checkbox"
              checked={isRecommended}
              onChange={(e) => setIsRecommended(e.target.checked)}
              className="rounded border-gray-300 dark:border-neutral-600 text-purple-600 focus:ring-purple-500"
            />
            Mark as Recommended
          </label>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 dark:border-neutral-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-neutral-800 dark:text-white"
              required
            >
              
              <option value="">Select Category</option>
              <option value="">Basic To Advance Course</option>
              <option value="Advanced Stitching">Advanced Stitching Course</option>
              <option value="Advanced Stitching">Worksops</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Expiry Duration (days)
            </label>
            <input
              type="number"
              placeholder="e.g. 30"
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              className="w-full border border-gray-300 dark:border-neutral-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-neutral-800 dark:text-white"
            />
          </div>

          {/* Videos */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Course Videos
            </label>
            {videos.map((video, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-neutral-700 p-3 rounded-md bg-gray-50 dark:bg-neutral-800"
              >
                <input
                  type="text"
                  placeholder="Video Title"
                  value={video.title}
                  onChange={(e) =>
                    handleVideoChange(index, "title", e.target.value)
                  }
                  className="w-full mb-2 border border-gray-300 dark:border-neutral-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-neutral-700 dark:text-white"
                  required
                />
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={video.url}
                    onChange={(e) =>
                      handleVideoChange(index, "url", e.target.value)
                    }
                    className="flex-1 border border-gray-300 dark:border-neutral-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-neutral-700 dark:text-white"
                    required
                  />
                  {videos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVideoField(index)}
                      className="text-red-600 hover:text-red-800 text-lg"
                    >
                      ✕
                    </button>
                  )}
                </div>
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 rounded-md shadow-lg transition duration-200 ease-in-out mb-20"
            disabled={adding || updating}
          >
            {adding || updating
              ? mode === "edit"
                ? "Updating..."
                : "Creating..."
              : mode === "edit"
              ? "Update Course"
              : "Create Course"}
          </button>
        </form>

        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition"
        >
          <IoClose size={24} />
        </button>
      </motion.div>
    </div>
  );
}
