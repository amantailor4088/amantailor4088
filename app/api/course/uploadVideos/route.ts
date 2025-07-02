// /app/api/course/uploadVideo/route.ts (or .js)

import { NextRequest, NextResponse } from "next/server";
import Course from "@/models/course.model";
import { connectDB } from "@/lib/db";
import { verifyTokenFromCookies } from "@/lib/jwt";
export async function POST(req: NextRequest) {
  await connectDB();

  const user = await verifyTokenFromCookies();
  
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden. Admin access only." },
        { status: 403 }
      );
    }
  
  try {
    const { courseId, title, bunnyVideoId,embedUrl } = await req.json();

    const course = await Course.findById(courseId);
    if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

    // Add the video to the course
    course.videos.push({ title, bunnyVideoId,embedUrl});
    await course.save();

    return NextResponse.json({ message: "Video added", course });
  } catch (error) {
    console.error("Video save error:", error);
    return NextResponse.json({ error: "Failed to save video" }, { status: 500 });
  }
}
