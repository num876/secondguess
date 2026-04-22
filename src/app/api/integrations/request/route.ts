import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { integration, userId } = body;

    if (!integration || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await adminDb.collection("integration_requests").add({
      integration,
      userId,
      createdAt: new Date().toISOString(),
      status: "pending",
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Integration request error:", err);
    return NextResponse.json({ error: "Failed to submit request." }, { status: 500 });
  }
}
