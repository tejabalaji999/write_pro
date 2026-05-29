"use client";

import { useState } from "react";
import { GradeGroup, AIProvider } from "@/lib/types";

interface Props {
  imageCategory: string;
  grade: GradeGroup;
  provider: AIProvider;
}

export function SampleSentences({ imageCategory, grade, provider }: Props) {
  const [sentences, setSentences] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shown, setShown] = useState(false);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/sample-sentences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageCategory, grade, provider }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      setSentences(data.sentences);
      setShown(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border-4 border-blue-200 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-blue-700 text-base">📝 See Sample Sentences</h3>
          <p className="text-gray-400 text-xs font-medium mt-0.5">
            Grade-level examples about <span className="font-bold text-gray-500">{imageCategory}</span> — for inspiration only!
          </p>
        </div>
        {!shown && (
          <button
            onClick={generate}
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-extrabold text-sm px-4 py-2 rounded-full shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 whitespace-nowrap"
          >
            {loading ? "✨ Generating..." : "✨ Generate!"}
          </button>
        )}
        {shown && (
          <button
            onClick={generate}
            disabled={loading}
            className="text-blue-400 text-xs font-bold hover:text-blue-600 transition-colors disabled:opacity-50"
          >
            {loading ? "..." : "🔄 New ones"}
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm font-medium">⚠️ {error}</p>
      )}

      {shown && sentences.length > 0 && (
        <ul className="flex flex-col gap-2">
          {sentences.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 text-sm text-gray-700 leading-relaxed animate-[slideUp_0.4s_ease-out_both]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="text-blue-400 font-extrabold mt-0.5">{i + 1}.</span>
              <span>{s}</span>
            </li>
          ))}
          <p className="text-center text-yellow-600 text-xs font-bold mt-1">
            ✨ Use these as inspiration — write your own version!
          </p>
        </ul>
      )}
    </div>
  );
}
