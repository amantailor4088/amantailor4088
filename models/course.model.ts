import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    videos: { type: [String], default: [] }, // Only YouTube links
  },
  { timestamps: true }
);

export default mongoose.models.Course ||
  mongoose.model("Course", courseSchema);
