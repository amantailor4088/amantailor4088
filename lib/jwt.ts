// lib/jwt.ts
import jwt, { SignOptions, JwtPayload as DefaultJwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export interface CustomJwtPayload extends DefaultJwtPayload {
  userId: string;
  email: string;
  role: "admin" | "coadmin" | "user";
  sessionToken: string
}

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export function generateToken(payload: CustomJwtPayload) {
  const options: SignOptions = {
    expiresIn: "7d",
  };

  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
}


export async function verifyTokenFromCookies(): Promise<CustomJwtPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwtToken")?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
    return decoded;
    
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
