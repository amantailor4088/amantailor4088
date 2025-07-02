import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course from "@/models/course.model";
import { verifyTokenFromCookies } from "@/lib/jwt";
import { deleteBunnyThumbnail, deleteBunnyVideo } from "@/lib/bunny";

export async function DELETE(
  req: NextRequest,
  context: { params: { courseId: string } }
) {
  const courseId = context.params.courseId;

  try {
    await connectDB();

    const user = await verifyTokenFromCookies();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admins only." },
        { status: 403 }
      );
    }

    if (!courseId) {
      return NextResponse.json(
        { success: false, message: "Course ID is required." },
        { status: 400 }
      );
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return NextResponse.json(
        { success: false, message: "Course not found." },
        { status: 404 }
      );
    }

    // ✅ Delete Bunny videos
    for (const video of deletedCourse.videos) {
      if (video.bunnyVideoId) {
        try {
          await deleteBunnyVideo(video.bunnyVideoId);
          console.log("Deleted Bunny video:", video.bunnyVideoId);
        } catch (error) {
          console.error(
            `Failed to delete Bunny video ${video.bunnyVideoId}:`,
            error
          );
        }
      }
    }

    // ✅ Delete thumbnail if exists
   if (deletedCourse.thumbnail) {
  const urlObj = new URL(deletedCourse.thumbnail);
  const relativePath = urlObj.pathname.slice(1);

  const lastSlash = relativePath.lastIndexOf("/");
  const filePath = lastSlash !== -1 ? relativePath.substring(0, lastSlash) : "";
  const fileName = lastSlash !== -1 ? relativePath.substring(lastSlash + 1) : relativePath;
  await deleteBunnyThumbnail(filePath, fileName);
  console.log("Deleted Bunny thumbnail.", deletedCourse.thumbnail);
}


    return NextResponse.json({
      success: true,
      message: "Course deleted successfully.",
      deletedCourse: {
        id: deletedCourse._id,
        title: deletedCourse.title,
        thumbnail: deletedCourse.thumbnail,
      },
    });
  } catch (err) {
    console.error("Error deleting course:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
