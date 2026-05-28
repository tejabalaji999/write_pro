"use client";

import { useEffect, useState } from "react";

interface Props {
  score: number;
}

export function ScoreMeter({ score }: Props) {
  const [displayed, setDisplayed] = useState(0);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayed / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setDisplayed(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const color = displayed >= 70 ? "#10B981" : displayed >= 40 ? "#F59E0B" : "#EF4444";

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="12" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dashoffset 1s ease-out, stroke 0.5s ease" }}
        />
        <text x="70" y="70" textAnchor="middle" dominantBaseline="central" fontSize="32" fontWeight="800" fill={color}>
          {displayed}
        </text>
        <text x="70" y="95" textAnchor="middle" fontSize="11" fontWeight="600" fill="#9CA3AF">
          out of 100
        </text>
      </svg>
      <p className="font-extrabold text-lg text-gray-700">
        {displayed >= 80 ? "⭐ Amazing!" : displayed >= 60 ? "👍 Great!" : "💪 Keep Going!"}
      </p>
    </div>
  );
}
