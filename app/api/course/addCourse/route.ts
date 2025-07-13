import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course from "@/models/course.model";
import { verifyTokenFromCookies } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // ✅ Verify admin access
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

    // ✅ Get JSON body
    const body = await req.json();

    const { title, description, price, category, videos } = body;

    if (!title || !description || !price || !category) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // ✅ Create the course
    const courseDoc = await Course.create({
      title,
      description,
      price,
      category,
      videos: videos || [],
    });

    return NextResponse.json({
      success: true,
      message: "Course created successfully!",
      course: {
        id: courseDoc._id.toString(),
        title,
        description,
        price,
        category,
        videos: courseDoc.videos,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Course creation failed!" },
      { status: 500 }
    );
  }
}
