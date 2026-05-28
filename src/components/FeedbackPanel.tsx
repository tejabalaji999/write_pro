"use client";

import { FeedbackResult, GradeGroup } from "@/lib/types";
import { ScoreMeter } from "./ScoreMeter";
import { CategoryCard } from "./CategoryCard";
import { SampleSentences } from "./SampleSentences";

interface Props {
  feedback: FeedbackResult;
  onReset: () => void;
  imageCategory: string;
  grade: GradeGroup;
}

const CATEGORY_STYLES = {
  grammar: { borderColor: "border-blue-300", bgColor: "bg-blue-50", scoreColor: "bg-blue-100 text-blue-700" },
  vocabulary: { borderColor: "border-purple-300", bgColor: "bg-purple-50", scoreColor: "bg-purple-100 text-purple-700" },
  sentenceStructure: { borderColor: "border-orange-300", bgColor: "bg-orange-50", scoreColor: "bg-orange-100 text-orange-700" },
  creativity: { borderColor: "border-pink-300", bgColor: "bg-pink-50", scoreColor: "bg-pink-100 text-pink-700" },
};

export function FeedbackPanel({ feedback, onReset, imageCategory, grade }: Props) {
  const { overallScore, overallMessage, categories, improvements, starWord } = feedback;

  return (
    <div className="flex flex-col gap-5 animate-[fadeIn_0.5s_ease-in]">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-xl border-4 border-yellow-300 p-6 flex flex-col items-center gap-3">
        <h2 className="text-2xl font-extrabold text-gray-800">Your Writing Report 📊</h2>
        <ScoreMeter score={overallScore} />
        <p className="text-center text-gray-600 font-medium text-sm max-w-xs">{overallMessage}</p>
        {starWord && (
          <div className="bg-yellow-100 border-2 border-yellow-300 rounded-full px-4 py-1.5">
            <span className="text-yellow-700 font-extrabold text-sm">⭐ Star Word: &ldquo;{starWord}&rdquo;</span>
          </div>
        )}
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(Object.entries(categories) as [keyof typeof CATEGORY_STYLES, (typeof categories)[keyof typeof categories]][]).map(
          ([key, val], i) => (
            <CategoryCard
              key={key}
              title={key === "sentenceStructure" ? "Sentence Structure" : key.charAt(0).toUpperCase() + key.slice(1)}
              emoji={val.emoji}
              score={val.score}
              feedback={val.feedback}
              {...CATEGORY_STYLES[key]}
              delay={i * 100}
            />
          )
        )}
      </div>

      {/* Improvements */}
      <div className="bg-white rounded-3xl shadow-xl border-4 border-green-200 p-5">
        <h3 className="font-extrabold text-green-700 text-base mb-3">💡 How to Make It Even Better!</h3>
        <ul className="flex flex-col gap-2">
          {improvements.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-green-500 font-bold mt-0.5">→</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sample Sentences */}
      <SampleSentences imageCategory={imageCategory} grade={grade} />

      {/* Try Again */}
      <button
        onClick={onReset}
        className="w-full py-4 rounded-full text-lg font-extrabold text-white bg-gradient-to-r from-green-500 to-teal-500 shadow-lg transition-all hover:scale-105 active:scale-95"
      >
        🔄 Try Again with a New Image!
      </button>
    </div>
  );
}
