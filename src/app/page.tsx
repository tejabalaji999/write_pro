"use client";

import { useWritePro } from "@/hooks/useWritePro";
import { ImageCard } from "@/components/ImageCard";
import { WritingArea } from "@/components/WritingArea";
import { FeedbackPanel } from "@/components/FeedbackPanel";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { GradeSelector } from "@/components/GradeSelector";
import { NameEntry } from "@/components/NameEntry";
import { AttemptHistory } from "@/components/AttemptHistory";
import { ProviderToggle } from "@/components/ProviderToggle";

export default function Home() {
  const {
    phase, name, grade, image, text, setText, feedback, error, logs, provider, setProvider,
    submitName, selectGrade, shuffleImage, submitWriting, reset, clearLogs,
  } = useWritePro();

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-100 via-pink-50 to-yellow-50 py-8 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            ✍️ WritePro
          </h1>
          {name ? (
            <p className="text-gray-500 font-medium">Hi, <span className="font-extrabold text-purple-600">{name}</span>! Let&apos;s write something awesome!</p>
          ) : (
            <p className="text-gray-500 font-medium">Your fun writing adventure starts here!</p>
          )}
          {phase !== "name" && (
            <ProviderToggle provider={provider} onChange={setProvider} />
          )}
        </div>

        {/* Name entry */}
        {phase === "name" && <NameEntry onSubmit={submitName} />}

        {/* Grade selection */}
        {phase === "grade" && <GradeSelector onSelect={selectGrade} />}

        {/* Image — shown once grade is selected */}
        {phase !== "name" && phase !== "grade" && image && (
          <ImageCard image={image} onShuffle={shuffleImage} showShuffle={phase === "writing"} />
        )}

        {/* Writing phase */}
        {phase === "writing" && grade && (
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
              grade={grade}
            />
          </>
        )}

        {phase === "loading" && <LoadingSpinner />}

        {phase === "feedback" && feedback && grade && (
          <FeedbackPanel
            feedback={feedback}
            onReset={reset}
            imageCategory={image?.category ?? "general"}
            grade={grade}
            provider={provider}
          />
        )}

        {/* Attempt history */}
        {phase !== "name" && (
          <AttemptHistory logs={logs} onClear={clearLogs} />
        )}

      </div>
    </main>
  );
}
