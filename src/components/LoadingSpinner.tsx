"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Reading your words... 📖",
  "Looking for great sentences... 🔍",
  "Counting your amazing words... ✨",
  "Almost done... 🎉",
];

export function LoadingSpinner() {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((i) => (i + 1) % MESSAGES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-8 border-purple-200" />
        <div className="absolute inset-0 rounded-full border-8 border-purple-500 border-t-transparent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-4xl animate-bounce">
          ✏️
        </div>
      </div>
      <p className="text-purple-700 font-extrabold text-xl text-center animate-pulse">
        {MESSAGES[msgIdx]}
      </p>
      <p className="text-gray-400 text-sm font-medium">Our writing coach is reviewing your work!</p>
    </div>
  );
}
