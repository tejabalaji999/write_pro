"use client";

import { useWritePro } from "@/hooks/useWritePro";
import { ImageCard } from "@/components/ImageCard";
import { WritingArea } from "@/components/WritingArea";
import { FeedbackPanel } from "@/components/FeedbackPanel";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function Home() {
  const { phase, image, text, setText, feedback, error, shuffleImage, submitWriting, reset } = useWritePro();

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-100 via-pink-50 to-yellow-50 py-8 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            ✍️ WritePro
          </h1>
          <p className="text-gray-500 font-medium mt-1">Your fun writing adventure starts here!</p>
        </div>

        {/* Image — only rendered after client mount to avoid hydration mismatch */}
        {image && <ImageCard image={image} onShuffle={shuffleImage} showShuffle={phase === "writing"} />}

        {/* Phase-based content */}
        {phase === "writing" && (
          <>
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-red-600 font-medium text-sm text-center">
                ⚠️ {error}
              </div>
            )}
            <WritingArea
              text={text}
              onChange={setText}
              onSubmit={submitWriting}
              disabled={false}
            />
          </>
        )}

        {phase === "loading" && <LoadingSpinner />}

        {phase === "feedback" && feedback && (
          <FeedbackPanel feedback={feedback} onReset={reset} />
        )}
      </div>
    </main>
  );
}
