import mongoose, { Schema, Document, Types } from "mongoose";

interface CourseProgress {
  [lessonId: string]: number; // e.g. "lesson-1": 75
}

interface PurchasedCourse {
  course: Types.ObjectId;
  courseExpiresAt: Date;
  progress: CourseProgress;
}

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "coadmin" | "user";
  isVerified: boolean;
  otp: string | null;
  otpExpiresAt: Date | null;
  sessionToken: string | null; // New: for enforcing single session
  coursesPurchased: PurchasedCourse[];
}

const CourseProgressSchema = new Schema<CourseProgress>(
  {},
  { _id: false, strict: false }
);

const PurchasedCourseSchema = new Schema<PurchasedCourse>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    courseExpiresAt: {
      type: Date,
      required: true,
    },
    progress: {
      type: CourseProgressSchema,
      default: {},
    },
  },
  { _id: false }
);

const UserSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  role: {
    type: String,
    enum: ["admin", "coadmin", "user"],
    default: "user",
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  otp: {
    type: String,
    default: null,
  },

  otpExpiresAt: {
    type: Date,
    default: null,
  },

  sessionToken: {
    type: String,
    default: null,
  },

  coursesPurchased: {
    type: [PurchasedCourseSchema],
    default: [],
  },
});

export default mongoose.models.User ||
  mongoose.model<UserDocument>("User", UserSchema);
