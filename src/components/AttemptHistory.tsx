"use client";

import { useState } from "react";
import { AttemptLog } from "@/lib/types";

interface Props {
  logs: AttemptLog[];
  onClear: () => void;
}

function scoreColor(score: number) {
  if (score >= 80) return "bg-green-100 text-green-700";
  if (score >= 60) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-600";
}

function timeAgo(ts: number) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function AttemptHistory({ logs, onClear }: Props) {
  const [open, setOpen] = useState(false);

  if (logs.length === 0) return null;

  const best = Math.max(...logs.map((l) => l.score));
  const avg = Math.round(logs.reduce((s, l) => s + l.score, 0) / logs.length);

  return (
    <div className="bg-white rounded-3xl shadow-xl border-4 border-indigo-200 overflow-hidden">
      {/* Header — always visible */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-indigo-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">📋</span>
          <div className="text-left">
            <p className="font-extrabold text-indigo-700 text-sm">My Attempt History</p>
            <p className="text-gray-400 text-xs font-medium">
              {logs.length} attempt{logs.length !== 1 ? "s" : ""} · Best: {best} · Avg: {avg}
            </p>
          </div>
        </div>
        <span className="text-gray-400 text-lg">{open ? "▲" : "▼"}</span>
      </button>

      {/* Log list */}
      {open && (
        <div className="border-t-2 border-indigo-100">
          <div className="max-h-72 overflow-y-auto flex flex-col divide-y divide-indigo-50">
            {[...logs].reverse().map((log, i) => (
              <div key={log.id} className="flex items-center gap-3 px-5 py-3 animate-[fadeIn_0.3s_ease-in]">
                <span className="text-gray-300 text-xs font-bold w-5">{logs.length - i}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-gray-700 text-sm truncate">
                    {log.name}
                    <span className="text-gray-400 font-medium text-xs ml-1">· Gr. {log.grade}</span>
                  </p>
                  <p className="text-gray-400 text-xs">
                    {log.imageCategory} · ⭐ &ldquo;{log.starWord}&rdquo; · {timeAgo(log.timestamp)}
                  </p>
                </div>
                <span className={`font-extrabold text-sm px-2.5 py-1 rounded-full shrink-0 ${scoreColor(log.score)}`}>
                  {log.score}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-indigo-100 px-5 py-3 flex justify-end">
            <button
              onClick={onClear}
              className="text-xs text-red-400 font-bold hover:text-red-600 transition-colors"
            >
              🗑️ Clear history
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
