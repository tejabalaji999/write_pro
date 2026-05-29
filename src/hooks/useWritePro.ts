"use client";

import { useState, useCallback, useEffect } from "react";
import { ImageConfig, FeedbackResult, GradeGroup, AttemptLog, AIProvider } from "@/lib/types";
import { getRandomImageUrl } from "@/lib/images";

export type Phase = "name" | "grade" | "writing" | "loading" | "feedback";

const STORAGE_KEY = "writepro_logs";

function loadLogs(): AttemptLog[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveLogs(logs: AttemptLog[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function useWritePro() {
  const [phase, setPhase] = useState<Phase>("name");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<GradeGroup | null>(null);
  const [image, setImage] = useState<ImageConfig | null>(null);
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<AttemptLog[]>([]);
  const [provider, setProvider] = useState<AIProvider>("gemini");

  useEffect(() => {
    setImage(getRandomImageUrl());
    setLogs(loadLogs());
  }, []);

  const submitName = useCallback((n: string) => {
    setName(n);
    setPhase("grade");
  }, []);

  const selectGrade = useCallback((g: GradeGroup) => {
    setGrade(g);
    setPhase("writing");
  }, []);

  const shuffleImage = useCallback(() => {
    setImage(getRandomImageUrl());
    setText("");
    setError(null);
  }, []);

  const submitWriting = useCallback(async () => {
    setPhase("loading");
    setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageCategory: image?.category, text, grade, provider }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setFeedback(data);
      setPhase("feedback");

      // Save to log
      const entry: AttemptLog = {
        id: Date.now().toString(),
        name,
        grade: grade!,
        imageCategory: image?.category ?? "general",
        score: data.overallScore,
        starWord: data.starWord ?? "",
        timestamp: Date.now(),
      };
      setLogs((prev) => {
        const updated = [...prev, entry];
        saveLogs(updated);
        return updated;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again!");
      setPhase("writing");
    }
  }, [image?.category, text, grade, name, provider]);

  const reset = useCallback(() => {
    setImage(getRandomImageUrl());
    setText("");
    setFeedback(null);
    setError(null);
    setGrade(null);
    setPhase("grade"); // keep name, just pick new grade
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    phase, name, grade, image, text, setText, feedback, error, logs, provider, setProvider,
    submitName, selectGrade, shuffleImage, submitWriting, reset, clearLogs,
  };
}
