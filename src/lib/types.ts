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
