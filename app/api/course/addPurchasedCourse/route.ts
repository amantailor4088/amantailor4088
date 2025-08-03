import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import crypto from "crypto";
import User from "@/models/user.model";
import Course from "@/models/course.model";
import { connectDB } from "@/lib/db";

// Store this securely (not hard-coded)
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const rawBody = await request.text();
    const razorpaySignature = request.headers.get("x-razorpay-signature");

    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json(
        { message: "Invalid signature. Unauthorized request." },
        { status: 401 }
      );
    }

    const webhookData = JSON.parse(rawBody);
    const eventType = webhookData?.event;
    if (eventType !== "payment.captured") {
      return NextResponse.json({ message: "Event not handled" }, { status: 400 });
    }

    const paymentEntity = webhookData?.payload?.payment?.entity;
    if (!paymentEntity || paymentEntity.status !== "captured") {
      return NextResponse.json({ message: "Payment not captured" }, { status: 400 });
    }

    const { email, order_id: orderId } = paymentEntity;

    if (!email || !orderId) {
      return NextResponse.json({ message: "Missing email or order_id" }, { status: 400 });
    }

    const course = await Course.findOne({ razorpayOrderId: orderId });
    if (!course) {
      return NextResponse.json({ message: "Course not found for given order ID" }, { status: 404 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const alreadyPurchased = user.coursesPurchased.some(
      (c: mongoose.Types.ObjectId) => c.toString() === course._id.toString()
    );
    if (alreadyPurchased) {
      return NextResponse.json({ message: "Course already purchased" }, { status: 200 });
    }

    user.coursesPurchased.push(course._id);
    await user.save();

    return NextResponse.json(
      { message: "Course access granted via verified webhook", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
  }
}
