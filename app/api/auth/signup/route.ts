import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import validator from "validator";
import User from "@/models/user.model";
import { connectDB } from "@/lib/db";
import { sendMail } from "@/lib/mail"; 
import { rateLimit } from "@/lib/ratelimit"; 

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!rateLimit(ip, 5, 15 * 60 * 1000)) {
      return NextResponse.json(
        { success: false, message: "Too many attempts. Try again later." },
        { status: 429 }
      );
    }

    const data = await req.json();

    const rawName = typeof data.name === "string" ? data.name.trim() : "";
    const rawEmail = typeof data.email === "string" ? data.email.trim() : "";
    const rawPassword = typeof data.password === "string" ? data.password : "";
    const rawPhone = typeof data.phone === "string" ? data.phone.trim() : "";

    const errors: { field: string; message: string }[] = [];

    if (!rawName || rawName.length < 2) {
      errors.push({ field: "name", message: "Name must be at least 2 characters." });
    }

    if (!rawEmail || !validator.isEmail(rawEmail)) {
      errors.push({ field: "email", message: "Invalid email format." });
    }

    if (!rawPassword || rawPassword.length < 6) {
      errors.push({ field: "password", message: "Password must be at least 6 characters." });
    }

   if (rawPhone && !validator.isMobilePhone(rawPhone)) {
      errors.push({ field: "phone", message: "Invalid phone number format." });
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    const sanitizedEmail = validator.normalizeEmail(rawEmail);
    const sanitizedName = validator.escape(rawName);
    const sanitizedPhone = rawPhone;

    if (!sanitizedEmail) {
      return NextResponse.json({ success: false, message: "Failed to normalize email." }, { status: 400 });
    }

    const existingUser = await User.findOne({
        $or: [{ email: sanitizedEmail }, { phone: sanitizedPhone }]
    });

    if (existingUser) {
        if (existingUser.email === sanitizedEmail) {
            return NextResponse.json({ success: false, message: "Email already registered." }, { status: 409 });
        }
        if (sanitizedPhone && existingUser.phone === sanitizedPhone) {
            return NextResponse.json({ success: false, message: "Phone number already registered." }, { status: 409 });
        }
    }

    const hashedPassword = await bcrypt.hash(rawPassword, 12);

    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await User.create({
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      password: hashedPassword,
      role: "user",
      isVerified: false,
      otp: hashedOtp,
      otpExpiresAt,
      coursesPurchased: [],
    });

    await sendMail({
      to: sanitizedEmail,
      subject: "Verify Your Email - Aman Tailor",
      html: `<p>Your verification code is <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
    });

    return NextResponse.json(
      { success: true, message: "Signup successful. Check email for OTP." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
