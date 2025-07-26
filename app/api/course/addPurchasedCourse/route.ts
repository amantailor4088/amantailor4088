import { NextRequest, NextResponse } from "next/server";
import mongoose, { ObjectId } from "mongoose";
import User from "@/models/user.model";
import Course from "@/models/course.model";
import { connectDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { userId, courseId } = await request.json();

    console.log("Received data:", { userId, courseId });
    
    if (!userId || !courseId) {
      return NextResponse.json(
        { message: "Missing userId or courseId" },
        { status: 400 }
      );
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const alreadyPurchased = user.coursesPurchased.some(
      (c:ObjectId) => c.toString() === courseId
    );

    if (alreadyPurchased) {
      return NextResponse.json(
        { message: "Course already purchased." },
        { status: 200 }
      );
    }

    user.coursesPurchased.push(new mongoose.Types.ObjectId(courseId));
    await user.save();

    return NextResponse.json(
      { message: "Course added to user successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
