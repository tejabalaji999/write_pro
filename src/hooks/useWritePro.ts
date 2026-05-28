"use client";

import { useState, useCallback } from "react";
import { ImageConfig, FeedbackResult } from "@/lib/types";
import { getRandomImageUrl } from "@/lib/images";

export type Phase = "writing" | "loading" | "feedback";

export function useWritePro() {
  const [phase, setPhase] = useState<Phase>("writing");
  const [image, setImage] = useState<ImageConfig>(() => getRandomImageUrl());
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        body: JSON.stringify({ imageCategory: image.category, text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setFeedback(data);
      setPhase("feedback");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again!");
      setPhase("writing");
    }
  }, [image.category, text]);

  const reset = useCallback(() => {
    setImage(getRandomImageUrl());
    setText("");
    setFeedback(null);
    setError(null);
    setPhase("writing");
  }, []);

  return { phase, image, text, setText, feedback, error, shuffleImage, submitWriting, reset };
}
