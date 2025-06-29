import { connectDB } from "@/lib/db";
import Course from "@/models/course.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    
    await connectDB();

    
    const courses = await Course.find({}).sort({ createdAt: -1 });

    if (!courses || courses.length === 0) {
      return NextResponse.json(
        { success: false, message: "No courses found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}