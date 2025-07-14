import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course from "@/models/course.model";
import { verifyTokenFromCookies } from "@/lib/jwt";

export async function PATCH(req: NextRequest) {
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

    const body = await req.json();

    const { id, title, description, price, category, durationDays, videos } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Course ID is required." },
        { status: 400 }
      );
    }

    const course = await Course.findById(id);

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found." },
        { status: 404 }
      );
    }

    //  Update fields
    course.title = title || course.title;
    course.description = description || course.description;
    course.price = price !== undefined ? price : course.price;
    course.category = category || course.category;
    course.videos = videos || course.videos;

    // optionally handle expiry
    if (durationDays !== undefined) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + Number(durationDays));
      course.expiryDate = expiryDate;
    }

    await course.save();

    return NextResponse.json({
      success: true,
      message: "Course updated successfully.",
      course: {
        id: course._id.toString(),
        title: course.title,
        description: course.description,
        price: course.price,
        category: course.category,
        videos: course.videos,
        expiryDate: course.expiryDate,
      },
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Course update failed!" },
      { status: 500 }
    );
  }
}
