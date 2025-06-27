import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import validator from "validator";
import User from "@/models/user.model";
import { connectDB } from "@/lib/db";
import { rateLimit } from "@/lib/ratelimit";
import { generateToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import crypto from "crypto";

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

        const { email, otp } = await req.json();

        // Validate
        if (
            typeof email !== "string" ||
            !validator.isEmail(email.trim()) ||
            typeof otp !== "string" ||
            otp.trim().length !== 6 ||
            !/^\d{6}$/.test(otp.trim())
        ) {
            return NextResponse.json(
                { success: false, message: "Invalid input." },
                { status: 422 }
            );
        }

        const sanitizedEmail = validator.normalizeEmail(email.trim());
        const cleanOtp = validator.escape(otp.trim());

        if (!sanitizedEmail) {
            return NextResponse.json(
                { success: false, message: "Failed to normalize email." },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email: sanitizedEmail });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found." },
                { status: 404 }
            );
        }

        if (user.isVerified) {
            return NextResponse.json(
                { success: true, message: "Already verified." },
                { status: 200 }
            );
        }

        if (!user.otp || !user.otpExpiresAt) {
            return NextResponse.json(
                { success: false, message: "OTP not generated. Please login again." },
                { status: 400 }
            );
        }

        const isExpired = new Date() > new Date(user.otpExpiresAt);
        if (isExpired) {
            return NextResponse.json(
                { success: false, message: "OTP has expired." },
                { status: 410 }
            );
        }

        const isOtpValid = await bcrypt.compare(cleanOtp, user.otp);
        if (!isOtpValid) {
            return NextResponse.json(
                { success: false, message: "Incorrect OTP." },
                { status: 401 }
            );
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;

        const sessionToken = crypto.randomBytes(32).toString("hex");
        user.sessionToken = sessionToken;
        await user.save();

        const token = generateToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            sessionToken
        });

        (await cookies()).set('jwtToken', token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });

        return NextResponse.json(
            {
                success: true,
                message: "Email verified and login successful.",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("OTP Verification Error:", err);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
