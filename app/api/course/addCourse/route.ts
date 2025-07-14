import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course from "@/models/course.model";
import { verifyTokenFromCookies } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
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

    // ✅ Get JSON body
    const body = await req.json();

    const {title,description,price,category,durationDays,videos,} = body;

    if (!title || !description || !price || !category) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    //  Validate videos if provided
    if (videos && !Array.isArray(videos)) {
      return NextResponse.json(
        { success: false, message: "Invalid videos format." },
        { status: 400 }
      );
    }

    let expiryDate;
    if (durationDays) {
      expiryDate = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);
    }

    const courseDoc = await Course.create({
      title,
      description,
      price,
      category,
      expiryDate,
      videos: videos || [],
    });

    return NextResponse.json({
      success: true,
      message: "Course created successfully!",
      course: {
        id: courseDoc._id.toString(),
        title: courseDoc.title,
        description: courseDoc.description,
        price: courseDoc.price,
        category: courseDoc.category,
        expiryDate: courseDoc.expiryDate,
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
