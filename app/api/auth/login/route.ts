import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import validator from "validator";
import User from "@/models/user.model";
import { connectDB } from "@/lib/db";
import { rateLimit } from "@/lib/ratelimit";
import { sendMail } from "@/lib/mail";
import { generateToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const ip = req.headers.get("x-forwarded-for") || "unknown";
        if (!rateLimit(ip, 5, 15 * 60 * 1000)) {
            console.log("limit reached");

            return NextResponse.json(
                { success: false, message: "Too many login attempts. Try again later." },
                { status: 429 }
            );
        }

        const data = await req.json();
        const rawEmail = typeof data.email === "string" ? data.email.trim() : "";
        const rawPassword = typeof data.password === "string" ? data.password : "";

        const errors: { field: string; message: string }[] = [];

        if (!rawEmail || !validator.isEmail(rawEmail)) {
            errors.push({ field: "email", message: "Invalid email." });
        }
        if (!rawPassword || rawPassword.length < 6) {
            errors.push({ field: "password", message: "Invalid password." });
        }

        if (errors.length > 0) {
            return NextResponse.json({ success: false, errors }, { status: 422 });
        }

        const email = validator.normalizeEmail(rawEmail);
        if (!email) {
            return NextResponse.json({ success: false, message: "Email normalization failed." }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials." },
                { status: 401 }
            );
        }

        const isPasswordCorrect = await bcrypt.compare(rawPassword, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials." },
                { status: 401 }
            );
        }

        if (!user.isVerified) {
            const otp = crypto.randomInt(100000, 999999).toString();
            const hashedOtp = await bcrypt.hash(otp, 10);
            const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

            user.otp = hashedOtp;
            user.otpExpiresAt = otpExpiresAt;
            await user.save();

            await sendMail({
                to: email,
                subject: "Verify Your Email - Aman Tailor",
                html: `<p>Your new OTP is <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
            });

            return NextResponse.json(
                {
                    success: false,
                    status: "unverified",
                    message: "Email not verified. We’ve sent a new OTP to your inbox.",
                    requiresVerification: true,
                    email: user.email,
                },
                { status: 403 }
            );

        }

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

        const userData = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
            coursesPurchased: user.coursesPurchased,
        };

        return new NextResponse(
            JSON.stringify({ success: true, message: "Login successful", user: userData }),
            {
                status: 200,
            }
        );
    } catch (err) {
        console.error("Login Error:", err);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
