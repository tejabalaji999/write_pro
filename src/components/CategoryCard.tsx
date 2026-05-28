interface Props {
  title: string;
  emoji: string;
  score: number;
  feedback: string;
  borderColor: string;
  bgColor: string;
  scoreColor: string;
  delay?: number;
}

export function CategoryCard({ title, emoji, score, feedback, borderColor, bgColor, scoreColor, delay = 0 }: Props) {
  return (
    <div
      className={`rounded-2xl border-4 ${borderColor} ${bgColor} p-4 flex flex-col gap-2 animate-[slideUp_0.5s_ease-out_both]`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="font-extrabold text-gray-700 text-sm">
          {emoji} {title}
        </span>
        <span className={`font-extrabold text-sm px-2 py-0.5 rounded-full ${scoreColor}`}>
          {score}/100
        </span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{feedback}</p>
    </div>
  );
}
