"use client";

import { useState } from "react";

interface Props {
  onSubmit: (name: string) => void;
}

export function NameEntry({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const trimmed = name.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (trimmed) onSubmit(trimmed);
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border-4 border-pink-200 p-8 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-5xl mb-3">🌟</p>
        <h2 className="text-3xl font-extrabold text-gray-800">Welcome to WritePro!</h2>
        <p className="text-gray-400 font-medium mt-2">What&apos;s your name, superstar writer?</p>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your name here..."
          maxLength={30}
          autoFocus
          className="w-full text-center text-xl font-bold px-4 py-4 rounded-2xl border-4 border-purple-200 focus:border-purple-400 focus:outline-none text-gray-700 placeholder:text-gray-300"
        />
        <button
          type="submit"
          disabled={!trimmed}
          className="w-full py-4 rounded-full text-lg font-extrabold text-white bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Let&apos;s Go! 🚀
        </button>
      </form>
    </div>
  );
}
