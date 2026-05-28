"use client";

import { GradeGroup } from "@/lib/types";
import { getHintSentences } from "@/lib/grades";

interface Props {
  text: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  grade: GradeGroup;
}

function renderHint(sentence: string) {
  const parts = sentence.split(/(\[[^\]]+\])/g);
  return parts.map((part, i) =>
    part.startsWith("[") ? (
      <em key={i} className="text-yellow-700 not-italic font-bold">{part}</em>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function WritingArea({ text, onChange, onSubmit, disabled, grade }: Props) {
  const charCount = text.length;
  const ready = charCount >= 30;
  const [hint1, hint2] = getHintSentences(grade);

  return (
    <div className="bg-white rounded-3xl shadow-xl border-4 border-purple-200 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-purple-700">Your Writing ✏️</h2>
        <span className={`text-sm font-bold px-3 py-1 rounded-full ${ready ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
          {charCount} chars
        </span>
      </div>

      {/* Hint card */}
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-3 flex flex-col gap-1">
        <p className="text-yellow-700 font-extrabold text-xs">💡 Need a starter idea?</p>
        <p className="text-gray-600 text-sm leading-relaxed">{renderHint(hint1)}</p>
        <p className="text-gray-600 text-sm leading-relaxed">{renderHint(hint2)}</p>
        <p className="text-yellow-500 text-xs font-medium mt-0.5">Don&apos;t copy — just get inspired! ✨</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tell me what you see! Use your imagination... What colors, shapes, animals, or people are there? How does it make you feel?"
        className="w-full min-h-32 p-3 rounded-2xl border-2 border-purple-100 focus:border-purple-400 focus:outline-none resize-none text-gray-700 text-base leading-relaxed font-medium placeholder:text-gray-400"
        disabled={disabled}
      />
      {!ready && (
        <p className="text-xs text-gray-400 font-medium">
          💡 Try to write at least 2–3 sentences! (need {Math.max(0, 30 - charCount)} more characters)
        </p>
      )}
      <button
        onClick={onSubmit}
        disabled={!ready || disabled}
        className="w-full py-4 rounded-full text-lg font-extrabold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        🔍 Check My Writing!
      </button>
    </div>
  );
}
