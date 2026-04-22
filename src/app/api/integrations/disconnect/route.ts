import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { siteId, provider } = await req.json();

    if (!siteId || !provider) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Delete from Firestore
    const integrationRef = doc(db, "sites", siteId, "integrations", provider);
    await deleteDoc(integrationRef);

    // Note: In a real production app, you would also:
    // 1. Fetch the config to get credentials
    // 2. Call the provider's API to revoke tokens or delete webhooks
    // 3. Log the activity

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Integration Disconnect API Error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
