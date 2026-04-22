import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const { email, userId } = await req.json();

    if (!email || !userId) {
      return NextResponse.json({ error: "Email and userId are required" }, { status: 400 });
    }

    if (!adminDb) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Store OTP in Firestore
    await adminDb.collection("otp_verifications").doc(userId).set({
      otp,
      email,
      expiresAt,
      attempts: 0,
      createdAt: new Date().toISOString(),
    });

    // Send email via Resend
    if (!process.env.RESEND_API_KEY) {
      // Dev fallback: log the OTP
      console.log(`[DEV] OTP for ${email}: ${otp}`);
      return NextResponse.json({ success: true, devOtp: otp });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Forensiq <no-reply@forensiq.io>",
        to: [email],
        subject: `${otp} — Your Forensiq Verification Code`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body style="background: #020617; margin: 0; padding: 0; font-family: 'Inter', sans-serif;">
            <div style="max-width: 480px; margin: 40px auto; padding: 20px;">
              
              <!-- Logo -->
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="color: #10b981; font-size: 24px; font-weight: 900; letter-spacing: -0.05em; text-transform: uppercase; margin: 0;">FORENSIQ</h1>
              </div>

              <!-- Card -->
              <div style="background: #0f172a; border: 1px solid rgba(255,255,255,0.05); border-radius: 24px; padding: 40px; text-align: center;">
                
                <p style="color: #64748b; font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 16px 0;">
                  Verification Code
                </p>

                <!-- OTP Box -->
                <div style="background: #020617; border: 1px solid rgba(16,185,129,0.2); border-radius: 16px; padding: 24px; margin: 0 0 32px 0; display: inline-block;">
                  <span style="font-size: 48px; font-weight: 900; letter-spacing: 0.15em; color: #10b981; font-family: monospace;">
                    ${otp}
                  </span>
                </div>

                <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
                  Enter this code in the Forensiq app to verify your email address. This code expires in <strong style="color: #f1f5f9;">5 minutes</strong>.
                </p>

                <p style="color: #475569; font-size: 12px; margin: 0;">
                  If you didn't sign up for Forensiq, you can safely ignore this email.
                </p>
              </div>

              <p style="color: #1e293b; font-size: 11px; text-align: center; margin: 24px 0 0 0;">
                © ${new Date().getFullYear()} Forensiq. All rights reserved.
              </p>
            </div>
          </body>
          </html>
        `,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend failed:", errText);
      return NextResponse.json({ error: "Failed to send verification email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Send OTP error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
