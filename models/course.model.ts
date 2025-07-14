import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: null },          // NEW
    category: { type: String, required: true },
    expiryDate: { type: Date, default: null },
    isRecommended: { type: Boolean, default: false },        // NEW
    videos: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.Course ||
  mongoose.model("Course", courseSchema);
