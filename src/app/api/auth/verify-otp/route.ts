import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

const MAX_ATTEMPTS = 5;

export async function POST(req: NextRequest) {
  try {
    const { userId, otp } = await req.json();

    if (!userId || !otp) {
      return NextResponse.json({ error: "userId and otp are required" }, { status: 400 });
    }

    if (!adminDb) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const otpRef = adminDb.collection("otp_verifications").doc(userId);
    const otpDoc = await otpRef.get();

    if (!otpDoc.exists) {
      return NextResponse.json({ error: "No verification code found. Please request a new one." }, { status: 404 });
    }

    const data = otpDoc.data()!;

    // Check expiry
    if (Date.now() > data.expiresAt) {
      await otpRef.delete();
      return NextResponse.json({ error: "Code expired. Please request a new one.", expired: true }, { status: 400 });
    }

    // Check attempt limit
    if (data.attempts >= MAX_ATTEMPTS) {
      await otpRef.delete();
      return NextResponse.json({ error: "Too many attempts. Please request a new code.", expired: true }, { status: 429 });
    }

    // Check code
    if (data.otp !== otp.trim()) {
      await otpRef.update({ attempts: data.attempts + 1 });
      const remaining = MAX_ATTEMPTS - (data.attempts + 1);
      return NextResponse.json({
        error: `Incorrect code. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`,
      }, { status: 400 });
    }

    // ✅ Code is correct — mark user as verified
    await adminDb.collection("users").doc(userId).set(
      { emailVerified: true, verifiedAt: new Date().toISOString() },
      { merge: true }
    );

    // Clean up OTP record
    await otpRef.delete();

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Verify OTP error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
