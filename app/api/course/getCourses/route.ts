// app/api/course/getCourses/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course from "@/models/course.model";

export async function GET() {
  await connectDB();

  const courses = await Course.find();

  return NextResponse.json({
    success: true,
    data: courses.map((c) => ({
      id: c._id.toString(),
      title: c.title,
      description: c.description,
      price: c.price,
      discountPrice: c.discountPrice || null,
      category: c.category,
      expiryDate: c.expiryDate ? c.expiryDate.toISOString() : null,
      isRecommended: c.isRecommended || false,
      videos: c.videos,
    })),
  });
}
