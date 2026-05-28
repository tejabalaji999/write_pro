import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { GradeGroup } from "@/lib/types";
import { getPromptContext } from "@/lib/grades";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function buildPrompt(imageCategory: string, text: string, grade: GradeGroup): string {
  return `You are a friendly and encouraging writing coach for kids.
${getPromptContext(grade)}
A student has written a description of an image from the category: "${imageCategory}".

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
  "starWord": "<Pick the single most impressive word the student used and celebrate it>"
}

Rules:
- Never say anything negative or discouraging.
- Always lead with what they did RIGHT before suggesting improvements.
- Keep each feedback string under 60 words.
- Adjust all scores and feedback to match the grade level context above.
- Scores should be honest but generous for the grade level.`;
}

export async function POST(req: NextRequest) {
  try {
    const { imageCategory, text, grade } = await req.json();

    if (!text || text.trim().length < 10) {
      return NextResponse.json({ error: "Please write a bit more!" }, { status: 400 });
    }

    const effectiveGrade: GradeGroup = grade ?? "3-4";
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(buildPrompt(imageCategory || "general", text, effectiveGrade));
    const raw = result.response.text().trim().replace(/^```json\n?/, "").replace(/\n?```$/, "");
    const feedback = JSON.parse(raw);

    return NextResponse.json(feedback);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Analyze error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
