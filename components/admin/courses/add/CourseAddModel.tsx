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
  const [category, setCategory] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [videos, setVideos] = useState<VideoInput[]>([{ title: "", url: "" }]);

  useEffect(() => {
    if (mode === "edit" && course) {
      setTitle(course.title);
      setDescription(course.description);
      setPrice(course.price.toString());
      setCategory(course.category || "");
      setVideos(
        course.videos.length > 0 ? course.videos : [{ title: "", url: "" }]
      );
      setDurationDays(""); // you could pre-fill this if needed
    } else if (mode === "add") {
      setTitle("");
      setDescription("");
      setPrice("");
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

  const addVideoField = () =>
    setVideos([...videos, { title: "", url: "" }]);

  const removeVideoField = (index: number) =>
    setVideos(videos.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const preparedVideos = videos.filter(
      (v) => v.title.trim() && v.url.trim()
    );

    try {
      if (mode === "add") {
        await addCourse({
          title,
          description,
          price,
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
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg w-full max-w-xl p-6 relative"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {mode === "edit" ? "Edit Course" : "Add New Course"}
        </h2>

        {(addError || updateError) && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {addError || updateError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input w-full"
            required
          />

          <textarea
            placeholder="Course Description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input w-full"
            required
          />

          <input
            type="number"
            placeholder="Course Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input w-full"
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input w-full"
            required
          >
            <option value="">Select Category</option>
            <option value="Stitching Basics">Stitching Basics</option>
            <option value="Advanced Stitching">Advanced Stitching</option>
            <option value="Embroidery">Embroidery</option>
          </select>

          <input
            type="number"
            placeholder="Expiry Duration (days)"
            value={durationDays}
            onChange={(e) => setDurationDays(e.target.value)}
            className="input w-full"
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Course Videos
            </label>
            {videos.map((video, index) => (
              <div key={index} className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Video Title"
                  value={video.title}
                  onChange={(e) =>
                    handleVideoChange(index, "title", e.target.value)
                  }
                  className="input w-full"
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
                    className="input flex-1"
                    required
                  />
                  {videos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVideoField(index)}
                      className="text-red-600"
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

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition"
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
          className="absolute top-3 right-4 text-xl text-gray-500 dark:text-gray-200"
        >
          <IoClose />
        </button>
      </motion.div>
    </div>
  );
}
