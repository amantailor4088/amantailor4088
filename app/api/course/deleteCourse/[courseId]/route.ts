import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course from "@/models/course.model";
import { verifyTokenFromCookies } from "@/lib/jwt";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<any> }
) {
  const { courseId } = await context.params;

  try {
    await connectDB();

    const user = await verifyTokenFromCookies();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Course deleted successfully",
      deletedCourse: {
        id: deletedCourse._id,
        title: deletedCourse.title,
      },
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
