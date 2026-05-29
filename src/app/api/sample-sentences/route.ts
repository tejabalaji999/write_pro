import { NextRequest, NextResponse } from "next/server";
import { GradeGroup, AIProvider } from "@/lib/types";
import { getPromptContext } from "@/lib/grades";
import { callAI } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { imageCategory, grade, provider } = await req.json();
    const effectiveGrade: GradeGroup = grade ?? "3-4";
    const effectiveProvider: AIProvider = provider ?? "gemini";

    const prompt = `You are a friendly writing coach for kids.
${getPromptContext(effectiveGrade)}
A student is learning to write about images from the category: "${imageCategory}".

Generate 4 sample sentences that describe a typical ${imageCategory} scene. These are EXAMPLES to help the student understand what good writing looks like at their grade level — not sentences they should copy word for word.

Respond ONLY with a valid JSON array of 4 strings. No markdown, no explanation. Example format:
["Sentence one.", "Sentence two.", "Sentence three.", "Sentence four."]

Rules:
- Each sentence must match the grade level context above.
- Make them vivid, descriptive, and inspiring.
- Use vocabulary appropriate for the grade level.
- Vary sentence structure across the 4 examples.`;

    const raw = await callAI(effectiveProvider, prompt);
    const cleaned = raw.trim().replace(/^```json\n?/, "").replace(/\n?```$/, "");
    const sentences: string[] = JSON.parse(cleaned);

    return NextResponse.json({ sentences });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Sample sentences error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
