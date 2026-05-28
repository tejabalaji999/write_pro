"use client";

import { useState, useCallback, useEffect } from "react";
import { ImageConfig, FeedbackResult, GradeGroup } from "@/lib/types";
import { getRandomImageUrl } from "@/lib/images";

export type Phase = "grade" | "writing" | "loading" | "feedback";

export function useWritePro() {
  const [phase, setPhase] = useState<Phase>("grade");
  const [grade, setGrade] = useState<GradeGroup | null>(null);
  const [image, setImage] = useState<ImageConfig | null>(null);
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setImage(getRandomImageUrl());
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
        body: JSON.stringify({ imageCategory: image?.category, text, grade }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setFeedback(data);
      setPhase("feedback");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again!");
      setPhase("writing");
    }
  }, [image?.category, text, grade]);

  const reset = useCallback(() => {
    setImage(getRandomImageUrl());
    setText("");
    setFeedback(null);
    setError(null);
    setGrade(null);
    setPhase("grade");
  }, []);

  return { phase, grade, image, text, setText, feedback, error, selectGrade, shuffleImage, submitWriting, reset };
}
