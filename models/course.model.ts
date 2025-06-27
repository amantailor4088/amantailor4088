// models/Course.ts
import mongoose, { Schema, model, models } from "mongoose";

// Asset Schema: supports videos, images, documents, etc.
const AssetSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  type: {
    type: String,
    enum: ["video", "image", "document", "audio", "other"],
    required: true,
  },
  format: { type: String, required: true }, // e.g. mp4, pdf, jpg
  order: { type: Number, default: 0 },
  duration: { type: Number }, // Optional: only for video/audio in seconds
}, { _id: false });

// Module Schema: structured learning blocks
const ModuleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, default: 0 },
  assets: [AssetSchema],
}, { _id: false });

// Main Course Schema
const CourseSchema = new Schema({
  title: { type: String, required: true },
  thumbnail: { type: String },
  introVideo: { type: String },
  shortDescription: { type: String },
  fullDescription: { type: String },
  roadmap: { type: String },
  price: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  modules: [ModuleSchema],
  enrolledCount: { type: Number, default: 0 }
}, {
  timestamps: true,
});

export default models.Course || model("Course", CourseSchema);
