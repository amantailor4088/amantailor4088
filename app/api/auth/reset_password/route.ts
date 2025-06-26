// app/api/auth/reset-password/route.ts

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import validator from "validator";
import User from "@/models/user.model";
import { connectDB } from "@/lib/db";
import { verifyTokenFromCookies } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { password } = await req.json();

    const errors: { field: string; message: string }[] = [];

    if (!password) {
      errors.push({ field: "password", message: "Password must be valid." });
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    const payload = await verifyTokenFromCookies();
    if (!payload || !payload.userId) {
      return NextResponse.json({ success: false, message: "Invalid or expired token." }, { status: 401 });
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
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
