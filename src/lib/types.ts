export type GradeGroup = "1-2" | "3-4" | "5-6" | "7-8";

export interface GradeGroupConfig {
  id: GradeGroup;
  label: string;
  ageLabel: string;
  emoji: string;
  gradient: string;
}

export interface ImageConfig {
  src: string;
  category: string;
  emoji: string;
  alt: string;
}

export interface CategoryFeedback {
  score: number;
  feedback: string;
  emoji: string;
}

export interface FeedbackResult {
  overallScore: number;
  overallMessage: string;
  categories: {
    grammar: CategoryFeedback;
    vocabulary: CategoryFeedback;
    sentenceStructure: CategoryFeedback;
    creativity: CategoryFeedback;
  };
  improvements: string[];
  starWord: string;
}
