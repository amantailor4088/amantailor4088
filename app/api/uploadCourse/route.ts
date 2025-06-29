import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course from "@/models/course.model";
import { createBunnyVideo, uploadBunnyVideo } from "@/lib/bunny";

function slugify(text: string) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const category =
      (formData.get("category") as string)?.trim() || "Uncategorized";

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Title is required!" },
        { status: 400 }
      );
    }

    if (!price || isNaN(price)) {
      return NextResponse.json(
        { success: false, message: "Valid price is required!" },
        { status: 400 }
      );
    }

    const slug = slugify(title);

    const videosJson = formData.get("videos") as string;
    const videosArray = videosJson ? JSON.parse(videosJson) : [];
    console.log("Videos array:", videosArray);
    const videosData = [];

    for (let i = 0; i < videosArray.length; i++) {
      const videoTitle = videosArray[i].title;
      const fieldName = `videos[${i}][file]`;

      const file = formData.get(fieldName) as File | null;

      if (!file) continue;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      console.log(`Uploading video: ${videoTitle}`); 
      const bunnyVideoData = await createBunnyVideo(videoTitle);
      console.log("Bunny video created:", bunnyVideoData);
      await uploadBunnyVideo(bunnyVideoData.guid, buffer);

      const embedUrl = `https://video.bunnycdn.com/embed/${bunnyVideoData.guid}`;

      videosData.push({
        title: videoTitle,
        bunnyVideoId: bunnyVideoData.guid,
        embedUrl,
      });
    }

    const courseDoc = await Course.create({
      title,
      description,
      price,
      category,
      slug,
      videos: videosData,
    });

    return NextResponse.json({
      success: true,
      message: "Course uploaded successfully!",
      course: courseDoc,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Upload failed!" },
      { status: 500 }
    );
  }
}
