import { verifyTokenFromCookies } from "@/lib/jwt";
import User from "@/models/user.model";
import Course from "@/models/course.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await verifyTokenFromCookies();

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized or forbidden" },
        { status: 401 }
      );
    }

    const users = await User.find();

    const data = await Promise.all(
      users.map(async (u) => {
        const courses = await Course.find({ _id: { $in: u.coursesPurchased } }).select("title");
        return {
          name: u.name,
          email: u.email,
          phone: u.phone,
          courses: courses.map((c) => c.title),
        };
      })
    );

     console.log(data)
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
