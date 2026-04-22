import { NextResponse } from "next/server";
import { encrypt } from "@/lib/encryption";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { siteId, provider, config } = await req.json();

    if (!siteId || !provider || !config) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Basic Validation per provider
    if (provider === 'shopify' && !config.shopUrl?.includes('myshopify.com')) {
      return NextResponse.json({ error: "Invalid Shopify Shop URL" }, { status: 400 });
    }
    if (provider === 'stripe' && !config.secretKey?.startsWith('sk_')) {
      return NextResponse.json({ error: "Invalid Stripe Secret Key" }, { status: 400 });
    }
    if (provider === 'slack' && !config.webhookUrl?.startsWith('https://hooks.slack.com')) {
      return NextResponse.json({ error: "Invalid Slack Webhook URL" }, { status: 400 });
    }
    if (provider === 'webflow' && !config.apiToken?.startsWith('wf_')) {
      return NextResponse.json({ error: "Invalid Webflow API Token" }, { status: 400 });
    }

    // Encrypt sensitive config fields
    const encryptedConfig: Record<string, string> = {};
    for (const [key, value] of Object.entries(config)) {
      if (typeof value === 'string') {
        // We encrypt everything in the config for maximum security
        encryptedConfig[key] = encrypt(value);
      }
    }

    // Save to Firestore
    const integrationRef = doc(db, "sites", siteId, "integrations", provider);
    await setDoc(integrationRef, {
      provider,
      status: 'connected',
      config: encryptedConfig,
      connectedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Integration Connect API Error:", err);
    return NextResponse.json({ error: err.message || "Interal Server Error" }, { status: 500 });
  }
}
