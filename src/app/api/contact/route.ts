import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Store the message in Firestore
    if (!adminDb) {
      throw new Error("Firebase Admin not initialised — check FIREBASE_ADMIN_SERVICE_ACCOUNT env var.");
    }
    await adminDb.collection("contact_submissions").add({
      name,
      email,
      subject: subject || "General Inquiry",
      message,
      createdAt: new Date().toISOString(),
      status: "new",
    });

    // If Resend API key is available, also send an email notification
    if (process.env.RESEND_API_KEY) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Forensiq <no-reply@forensiq.io>",
            to: ["support@forensiq.io"],
            subject: `[Forensiq Contact] ${subject} — from ${name}`,
            html: `
              <h2>New Contact Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <hr />
              <p>${message.replace(/\n/g, "<br/>")}</p>
            `,
          }),
        });

        if (!res.ok) {
          console.warn("Resend email failed:", await res.text());
        }
      } catch (emailErr) {
        console.error("Email send error:", emailErr);
        // Don't fail the request — message is already stored in Firestore
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to submit message." }, { status: 500 });
  }
}
