import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course from "@/models/course.model";
import { uploadThumbnailToBunny } from "@/lib/bunny";
import { verifyTokenFromCookies } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    //  Verify admin access

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
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const category =
      (formData.get("category") as string)?.trim() || "Uncategorized";

    if (!title || !description || !price || !category) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // ✅ Handle thumbnail upload
    const thumbnailFile = formData.get("thumbnail") as File | null;

    let thumbnailUrl: string | null = null;

    if (thumbnailFile) {
      const arrayBuffer = await thumbnailFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const fileName = `thumbnails/-${Date.now()}-${thumbnailFile.name}`;

      thumbnailUrl = await uploadThumbnailToBunny(fileName, buffer);
      console.log("Thumbnail uploaded to Bunny Storage:", thumbnailUrl);
    } else {
      return NextResponse.json(
        { success: false, message: "Thumbnail image is required." },
        { status: 400 }
      );
    }

    // ✅ Create the course with basic info only
    const courseDoc = await Course.create({
      title,
      description,
      price,
      category,
      thumbnail: thumbnailUrl,
      videos: [],
    });

    return NextResponse.json({
      success: true,
      message: "Course created successfully!",
      course: {
        title,
        description,
        price,
        category,
        thumbnail: thumbnailUrl,
        id: courseDoc._id.toString(),
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Upload failed!" },
      { status: 500 }
    );
  }
}
