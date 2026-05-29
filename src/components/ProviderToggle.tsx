"use client";

import { AIProvider } from "@/lib/types";

interface Props {
  provider: AIProvider;
  onChange: (p: AIProvider) => void;
}

export function ProviderToggle({ provider, onChange }: Props) {
  return (
    <div className="flex items-center justify-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-gray-200 w-fit mx-auto">
      <span className="text-xs text-gray-400 font-semibold">AI:</span>
      <button
        onClick={() => onChange("gemini")}
        className={`flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full transition-all ${
          provider === "gemini"
            ? "bg-blue-500 text-white shadow-sm"
            : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <span>✦</span> Gemini
      </button>
      <button
        onClick={() => onChange("chatgpt")}
        className={`flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full transition-all ${
          provider === "chatgpt"
            ? "bg-green-500 text-white shadow-sm"
            : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <span>⬡</span> ChatGPT
      </button>
    </div>
  );
}
