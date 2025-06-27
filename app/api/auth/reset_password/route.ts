import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import { connectDB } from "@/lib/db";
import { verifyTokenFromCookies } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { password } = await req.json();

    if (!password && password.length < 6) {
       return NextResponse.json({ success: false, error: { field: "password", message: "Password must be valid 6 digit Password." } }, { status: 422 });
    }

    const payload = await verifyTokenFromCookies();
    if (!payload || !payload.userId) {
      return NextResponse.json({ success: false, message: "Invalid or expired token." }, { status: 401 });
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    }

    if (!user.sessionToken || user.sessionToken !== payload.sessionToken) {
      const response = NextResponse.json(
        { success: false, message: "Session mismatch. Please log in again." },
        { status: 403 }
      );

      response.cookies.set("jwtToken", "", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });

      return response;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    return NextResponse.json({ success: true, message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
