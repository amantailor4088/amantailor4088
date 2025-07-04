import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course from "@/models/course.model";
import { verifyTokenFromCookies } from "@/lib/jwt";
import { deleteBunnyVideo, deleteBunnyThumbnail } from "@/lib/bunny";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<any> }
) {
  const {courseId} = await context.params;

  try {
    await connectDB();

    const user = await verifyTokenFromCookies();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return NextResponse.json({ success: false, message: "Course not found" }, { status: 404 });
    }

    for (const video of deletedCourse.videos) {
      if (video.bunnyVideoId) {
        await deleteBunnyVideo(video.bunnyVideoId);
      }
    }

    if (deletedCourse.thumbnail) {
      const urlObj = new URL(deletedCourse.thumbnail);
      const relativePath = urlObj.pathname.slice(1);
      const lastSlash = relativePath.lastIndexOf("/");
      const filePath = lastSlash !== -1 ? relativePath.substring(0, lastSlash) : "";
      const fileName = lastSlash !== -1 ? relativePath.substring(lastSlash + 1) : relativePath;

      await deleteBunnyThumbnail(filePath, fileName);
    }

    return NextResponse.json({
      success: true,
      message: "Course deleted successfully",
      deletedCourse: {
        id: deletedCourse._id,
        title: deletedCourse.title,
        thumbnail: deletedCourse.thumbnail,
      },
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
