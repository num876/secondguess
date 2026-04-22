import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { 
      siteId, 
      sessionId, 
      visitorId, 
      eventType, 
      eventData, 
      url, 
      timestamp 
    } = payload;

    if (!siteId || !sessionId) {
      return NextResponse.json({ error: "Missing siteId or sessionId" }, { status: 400 });
    }

    if (!adminDb) {
      console.error("Tracking failed: adminDb is null");
      return NextResponse.json({ error: "Storage service unavailable" }, { status: 503 });
    }

    // 1. Verify site exists
    const siteDoc = await adminDb.collection("sites").doc(siteId).get();
    if (!siteDoc.exists) {
      return NextResponse.json({ error: "Invalid siteId" }, { status: 404 });
    }

    // 2. Log event
    const eventRef = adminDb
        .collection("sites")
        .doc(siteId)
        .collection("sessions")
        .doc(sessionId)
        .collection("session_events");
    
    await eventRef.add({
      siteId,
      eventType,
      eventData,
      url,
      timestamp,
      visitorId
    });

    // 2b. Log to flat collection for easier analysis (bypass collectionGroup index issues)
    await adminDb
      .collection("sites")
      .doc(siteId)
      .collection("all_events")
      .add({
        eventType,
        eventData,
        url,
        timestamp,
        visitorId
      });

    // 3. Update Live Session
    const liveSessionRef = adminDb.collection("sessions").doc(siteId).collection("live").doc(sessionId);
    
    // Determine signals (e.g., rage_click, exit_intent)
    let signal = null;
    if (eventType === 'rage_click') signal = 'rage click';
    if (eventType === 'exit_intent') signal = 'exit intent';
    if (eventType === 'form_abandon') signal = 'form drop';
    if (url && (url.includes('success') || url.includes('thank-you'))) signal = 'converted';

    const liveDoc = await liveSessionRef.get();
    let signals = liveDoc.exists ? liveDoc.data()?.signals || [] : [];
    
    if (signal && !signals.includes(signal)) {
        signals.push(signal);
    }

    await liveSessionRef.set({
      visitorId,
      currentUrl: url,
      lastSeen: timestamp,
      signals,
      sessionStart: liveDoc.exists ? liveDoc.data()?.sessionStart : timestamp
    }, { merge: true });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Tracking Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
