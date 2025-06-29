import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course from "@/models/course.model";
import { nanoid } from "nanoid";
import {
  createBunnyVideo,
  uploadBunnyVideo,
  uploadThumbnailToBunny,
} from "@/lib/bunny";

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
    const category =(formData.get("category") as string)?.trim() || "Uncategorized";
    
    const slugbase = slugify(title);
    const slug = `${slugbase}-${nanoid(6)}`;
    

    // ✅ Handle thumbnail upload
    const thumbnailFile = formData.get("thumbnail") as File | null;

    let thumbnailUrl: string | null = null;

    if (thumbnailFile) {
      const arrayBuffer = await thumbnailFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Create a filename, e.g. using the slug:
      const fileName = `thumbnails/${slug}-${Date.now()}-${thumbnailFile.name}`;

      // Upload to Bunny Storage
      thumbnailUrl = await uploadThumbnailToBunny(fileName, buffer);
      console.log("Thumbnail uploaded to Bunny Storage:", thumbnailUrl);
      
    } else {
      return NextResponse.json(
        { success: false, message: "Thumbnail image is required." },
        { status: 400 }
      );
    }

    // ✅ Upload videos as before
    const videosJson = formData.get("videos") as string;
    const videosArray = videosJson ? JSON.parse(videosJson) : [];

    const videosData = [];

    for (let i = 0; i < videosArray.length; i++) {
      const videoTitle = videosArray[i].title;
      const fieldName = `videos[${i}][file]`;

      const file = formData.get(fieldName) as File | null;

      if (!file) continue;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const bunnyVideoData = await createBunnyVideo(videoTitle);
      await uploadBunnyVideo(bunnyVideoData.guid, buffer);

      const embedUrl = `https://video.bunnycdn.com/embed/${bunnyVideoData.guid}`;

      videosData.push({
        title: videoTitle,
        bunnyVideoId: bunnyVideoData.guid,
        embedUrl,
      });
    }

    // ✅ Create course with thumbnailUrl
    const courseDoc = await Course.create({
      title,
      description,
      price,
      category,
      slug,
      thumbnail:thumbnailUrl, 
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
