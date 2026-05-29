import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import { AIProvider } from "./types";

export async function callAI(provider: AIProvider, prompt: string): Promise<string> {
  if (provider === "chatgpt") {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const res = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1024,
    });
    return res.choices[0].message.content ?? "";
  } else {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  }
}
