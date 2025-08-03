import { verifyTokenFromCookies } from "@/lib/jwt";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET(request: Request) {
  try {
    await connectDB(); 

    const userData = await verifyTokenFromCookies(); // if this function is synchronous

    if (!userData) {
      return NextResponse.json(
        { success: false, message: "Unauthorized User" },
        { status: 401 }
      );
    }

    const user = await User.findById(userData.userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
     console.log('user',user)
     
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Refresh user error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
