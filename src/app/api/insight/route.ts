import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { siteId } = await req.json();

    if (!siteId) {
      return NextResponse.json({ error: "Missing siteId" }, { status: 400 });
    }

    // 1. Fetch last 500 events
    // This is a simplified aggregation logic for the demo
    const eventsSnapshot = await adminDb
      .collectionGroup("events")
      .where("siteId", "==", siteId)
      .orderBy("timestamp", "desc")
      .limit(500)
      .get();

    const events = eventsSnapshot.docs.map(doc => doc.data());

    // 2. Simple Aggregation
    const stats = {
      pageViews: events.filter(e => e.eventType === 'page_view').length,
      rageClicks: events.filter(e => e.eventType === 'rage_click').length,
      formAbandons: events.filter(e => e.eventType === 'form_abandon').length,
      exitIntents: events.filter(e => e.eventType === 'exit_intent').length,
      avgScroll: 0,
      topRagePages: {} as Record<string, number>,
      topAbandonFields: {} as Record<string, number>,
    };

    events.forEach(e => {
        if (e.eventType === 'rage_click' && e.url) {
            stats.topRagePages[e.url] = (stats.topRagePages[e.url] || 0) + 1;
        }
        if (e.eventType === 'form_abandon' && e.eventData?.fields) {
            e.eventData.fields.forEach((f: string) => {
                stats.topAbandonFields[f] = (stats.topAbandonFields[f] || 0) + 1;
            });
        }
    });

    // 3. Call OpenAI
    const prompt = `
    You are a Conversion Rate Optimization (CRO) expert. 
    Analyze these website session stats and provide 3 specific actionable insights about where and why customers are dropping off.
    
    Stats:
    - Total events analyzed: ${events.length}
    - Rage clicks identified: ${stats.rageClicks} (Pages: ${JSON.stringify(stats.topRagePages)})
    - Form abandonments: ${stats.formAbandons} (Fields: ${JSON.stringify(stats.topAbandonFields)})
    - Exit intent triggers: ${stats.exitIntents}
    
    Output format: JSON array of 3 objects, each with 'heading' and 'body'.
    Focus on being concise and professional.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a professional session intelligence analyst." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content || "{}";
    const insights = JSON.parse(content);

    return NextResponse.json({ 
        insights: insights.insights || insights.items || insights, 
        rawStats: stats 
    });

  } catch (error: any) {
    console.error("Insight API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
