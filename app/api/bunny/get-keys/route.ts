// /app/api/bunny/get-keys/route.ts

import { NextResponse } from "next/server";
import { verifyTokenFromCookies } from "@/lib/jwt";

export async function GET() {
  try {
    const user = await verifyTokenFromCookies();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden. Admin access only." },
        { status: 403 }
      );
    }

    const bunnyKeys = {
      BUNNY_API_KEY: process.env.BUNNY_VIDEO_API_KEY!,
      LIBRARY_ID: process.env.BUNNY_VIDEO_LIBRARY_ID!,
    };

    return NextResponse.json({
      success: true,
      bunnyKeys,
    });
  } catch (error) {
    console.error("Bunny get-keys route error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
