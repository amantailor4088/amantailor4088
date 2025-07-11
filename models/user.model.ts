import mongoose, { Schema, Document, Types } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isVerified: boolean;
  otp: string | null;
  otpExpiresAt: Date | null;
  sessionToken: string | null;
  coursesPurchased: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
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
      enum: ["admin", "user"],
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
      type: [Schema.Types.ObjectId],
      ref: "Course",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model<UserDocument>("User", UserSchema);
