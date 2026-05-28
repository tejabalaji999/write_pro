import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

function buildPrompt(imageCategory: string, text: string): string {
  return `You are a friendly and encouraging writing coach for children aged 7–12.
A child has written a description of an image from the category: "${imageCategory}".

Their writing:
"""
${text}
"""

Analyze the writing and respond ONLY with a valid JSON object — no markdown, no explanation outside the JSON. Use this exact structure:

{
  "overallScore": <integer 0-100>,
  "overallMessage": "<One warm, encouraging sentence about their writing overall>",
  "categories": {
    "grammar": {
      "score": <integer 0-100>,
      "feedback": "<2 sentences: what they did well, one gentle tip. Kid-friendly language.>",
      "emoji": "✏️"
    },
    "vocabulary": {
      "score": <integer 0-100>,
      "feedback": "<2 sentences. Praise interesting word choices. Suggest one new word they could try.>",
      "emoji": "📚"
    },
    "sentenceStructure": {
      "score": <integer 0-100>,
      "feedback": "<2 sentences about sentence variety and length. Use simple terms.>",
      "emoji": "🔗"
    },
    "creativity": {
      "score": <integer 0-100>,
      "feedback": "<2 sentences celebrating imaginative details. Suggest one creative addition.>",
      "emoji": "🌟"
    }
  },
  "improvements": [
    "<Specific, actionable tip #1 written as encouragement, not criticism>",
    "<Specific, actionable tip #2>",
    "<Specific, actionable tip #3>"
  ],
  "starWord": "<Pick the single most impressive word the child used and celebrate it>"
}

Rules:
- Never say anything negative or discouraging.
- Always lead with what they did RIGHT before suggesting improvements.
- Use simple vocabulary a 9-year-old can understand.
- Keep each feedback string under 60 words.
- Scores should be honest but generous — a short but grammatically correct sentence deserves at least 60.`;
}

export async function POST(req: NextRequest) {
  try {
    const { imageCategory, text } = await req.json();

    if (!text || text.trim().length < 10) {
      return NextResponse.json({ error: "Please write a bit more!" }, { status: 400 });
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{ role: "user", content: buildPrompt(imageCategory || "general", text) }],
    });

    const raw = (message.content[0] as { type: "text"; text: string }).text;
    const result = JSON.parse(raw);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Analyze error:", err);
    return NextResponse.json(
      { error: "Oops! We had trouble reading your writing. Please try again!" },
      { status: 500 }
    );
  }
}
