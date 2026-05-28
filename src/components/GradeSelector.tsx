import { GradeGroup } from "@/lib/types";
import { GRADE_GROUPS } from "@/lib/grades";

interface Props {
  onSelect: (grade: GradeGroup) => void;
}

export function GradeSelector({ onSelect }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border-4 border-purple-200 p-6 flex flex-col gap-5">
      <div className="text-center">
        <p className="text-3xl mb-2">👋</p>
        <h2 className="text-2xl font-extrabold text-gray-800">What grade are you in?</h2>
        <p className="text-gray-400 text-sm font-medium mt-1">We&apos;ll make the feedback just right for you!</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {GRADE_GROUPS.map((g) => (
          <button
            key={g.id}
            onClick={() => onSelect(g.id)}
            className={`bg-gradient-to-br ${g.gradient} text-white rounded-2xl py-5 px-4 flex flex-col items-center gap-1 shadow-lg transition-all hover:scale-105 active:scale-95`}
          >
            <span className="text-3xl">{g.emoji}</span>
            <span className="font-extrabold text-base">{g.label}</span>
            <span className="text-white/80 text-xs font-medium">{g.ageLabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
