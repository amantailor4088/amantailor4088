// app/api/course/getCourses/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course from "@/models/course.model";
import { verifyTokenFromCookies } from "@/lib/jwt";

type Video = {
  title: string;
  embedUrl: string;
  bunnyVideoId: string;
};

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
      thumbnail: c.thumbnail,
      videos: c.videos.map((v: Video) => ({
        title: v.title,
        embedUrl: v.embedUrl,
        bunnyVideoId: v.bunnyVideoId,
      })),
    })),
  });
}
