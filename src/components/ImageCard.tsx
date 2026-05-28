"use client";

import { ImageConfig } from "@/lib/types";

interface Props {
  image: ImageConfig;
  onShuffle: () => void;
  showShuffle: boolean;
}

export function ImageCard({ image, onShuffle, showShuffle }: Props) {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-64 md:h-80 object-cover"
      />
      <div className="absolute top-3 left-3">
        <span className="bg-white/90 backdrop-blur-sm text-gray-800 font-bold text-sm px-3 py-1.5 rounded-full shadow-md">
          {image.emoji} {image.category}
        </span>
      </div>
      {showShuffle && (
        <button
          onClick={onShuffle}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 font-bold text-sm px-3 py-1.5 rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
        >
          🎲 New Image
        </button>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent p-4">
        <p className="text-white font-semibold text-sm drop-shadow">
          ✍️ Look carefully and describe what you see!
        </p>
      </div>
    </div>
  );
}
