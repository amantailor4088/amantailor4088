// /models/course.model.ts

import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    bunnyVideoId: { type: String, required: true },
    embedUrl: { type: String, required: true },
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    slug: { type: String, required: true , unique: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    videos: { type: [videoSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Course ||
  mongoose.model("Course", courseSchema);
