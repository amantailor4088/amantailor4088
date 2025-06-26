import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import { sendMail } from "@/lib/mail";
import { rateLimit } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!rateLimit(ip, 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { success: false, message: "Too many attempts. Please try again later." },
        { status: 429 }
      );
    }

    const { email } = await req.json();
    const rawEmail = typeof email === "string" ? email.trim() : "";

    if (!rawEmail || !validator.isEmail(rawEmail)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 422 }
      );
    }

    const sanitizedEmail = validator.normalizeEmail(rawEmail);
    if (!sanitizedEmail) {
      return NextResponse.json(
        { success: false, message: "Failed to normalize email." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: sanitizedEmail });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "No account found" },
        { status: 404 }
      );
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.isVerified = false;
    user.otp = hashedOtp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    await sendMail({
      to: sanitizedEmail,
      subject: "Reset Your Password - Aman Tailor",
      html: `<p>Your OTP for password reset is <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
    });

    return NextResponse.json(
      {
        success: true,
        message: "OTP sent to your email for password reset.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
