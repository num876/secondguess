import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { siteId } = await req.json();

    if (!siteId) {
      return NextResponse.json({ error: "Missing siteId" }, { status: 400 });
    }

    if (!adminDb) {
      return NextResponse.json({ 
        error: "Database connection failed. Please check your FIREBASE_ADMIN_SERVICE_ACCOUNT environment variable." 
      }, { status: 500 });
    }

    // 1. Fetch Site Metadata
    const siteDoc = await adminDb.collection("sites").doc(siteId).get();
    const siteData = siteDoc.exists ? siteDoc.data() : { name: "Unknown Site", domain: "" };

    // 2. Fetch events (Using flat collection to bypass index requirements)
    let eventsSnapshot;
    try {
      eventsSnapshot = await adminDb
        .collection("sites")
        .doc(siteId)
        .collection("all_events")
        .limit(500)
        .get();
    } catch (dbError: any) {
      console.error("Firestore Query Error:", dbError);
      if (dbError.stack) console.error(dbError.stack);
      
      const message = dbError.message || "";
      const isIndexError = message.includes("index") || message.includes("FAILED_PRECONDITION");

      return NextResponse.json({ 
        error: isIndexError 
          ? "This query requires a Firestore index. Please check your terminal for the auto-generated creation link."
          : `Database query failed: ${message}` 
      }, { status: 500 });
    }

    // Sort in memory to avoid index requirements
    const events = eventsSnapshot.docs
      .map(doc => doc.data())
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
      .slice(0, 500);

    // 3. Demo Mode / Fallback if no data
    if (events.length < 5) {
      return NextResponse.json({
        insights: [
          {
            heading: "Cold Start Detected",
            body: `We're waiting for more data from ${siteData?.name || 'your site'}. Once you have ~50 sessions, our AI will begin forensic analysis. For now, ensure your tracker is in the <head> tag.`
          },
          {
            heading: "UX Best Practice",
            body: "Based on your domain type, we recommend checking your mobile 'Add to Cart' visibility. 70% of friction in this industry happens on small screens."
          },
          {
            heading: "Setup Verification",
            body: "Your site ID is active. Try visiting your site in an incognito window to generate your first live tracking event."
          }
        ],
        isDemo: true
      });
    }

    // 4. Aggregate Real Data
    const stats = {
      pageViews: events.filter(e => e.eventType === 'page_view').length,
      rageClicks: events.filter(e => e.eventType === 'rage_click').length,
      formAbandons: events.filter(e => e.eventType === 'form_abandon').length,
      exitIntents: events.filter(e => e.eventType === 'exit_intent').length,
      topRagePages: {} as Record<string, number>,
      topAbandonFields: {} as Record<string, number>,
    };

    events.forEach(e => {
        if (e.eventType === 'rage_click' && e.url) {
            try {
                const path = new URL(e.url).pathname;
                stats.topRagePages[path] = (stats.topRagePages[path] || 0) + 1;
            } catch (err) {
                stats.topRagePages[e.url] = (stats.topRagePages[e.url] || 0) + 1;
            }
        }
        if (e.eventType === 'form_abandon' && e.eventData?.fields) {
            e.eventData.fields.forEach((f: string) => {
                stats.topAbandonFields[f] = (stats.topAbandonFields[f] || 0) + 1;
            });
        }
    });

    // 5. OpenAI Analysis
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_openai_api_key") {
       // Fallback if no API key
       return NextResponse.json({
         insights: [
           { heading: "AI Engine Offline", body: "Please configure your OPENAI_API_KEY to enable live behavioral analysis." },
           { heading: "Heuristic: Rage Clicking", body: `We detected ${stats.rageClicks} rage clicks on ${Object.keys(stats.topRagePages)[0] || 'your site'}. This usually indicates broken buttons or slow response times.` },
           { heading: "Heuristic: Form Friction", body: `Users are dropping off at ${Object.keys(stats.topAbandonFields)[0] || 'input fields'}. Review your validation logic.` }
         ]
       });
    }

    const prompt = `
    You are a Forensic Conversion Rate Optimization (CRO) expert at SecondGuess. 
    Analyze behavior for site: ${siteData?.name || 'Unknown'} (${siteData?.domain || ''})
    
    Stats (Last 500 events):
    - Rage clicks: ${stats.rageClicks} 
    - Exit intent triggers: ${stats.exitIntents}
    - Form drop-offs: ${stats.formAbandons}
    
    Detailed Behavioral Logs:
    - Top Rage-Click Pages: ${JSON.stringify(stats.topRagePages)}
    - Problematic Form Fields: ${JSON.stringify(stats.topAbandonFields)}
    
    Identify 3 specific, high-impact "Friction Points".
    Requirements:
    1. Be hyper-specific. Use the site's name and actual paths/fields.
    2. Use a "Forensic" tone. Phrases like "Momentum leakage", "Validation wall", "Cognitive load".
    3. Suggest one technical fix for each point.
    
    Format: 
    {
      "insights": [
        { "heading": "Title", "body": "Analysis + Fix" }
      ]
    }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are a professional session intelligence analyst. Return valid JSON only." 
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const parsed = JSON.parse(response.choices[0].message.content || '{"insights": []}');
    return NextResponse.json({ 
        insights: (parsed.insights || []).slice(0, 3),
        rawStats: stats 
    });

  } catch (error: any) {
    console.error("Insight API error:", error);
    return NextResponse.json({ error: "Intelligence engine timeout or configuration error." }, { status: 500 });
  }
}
