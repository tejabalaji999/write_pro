import { GradeGroup, GradeGroupConfig } from "./types";

export const GRADE_GROUPS: GradeGroupConfig[] = [
  { id: "1-2", label: "Grades 1–2", ageLabel: "Ages 6–8",  emoji: "🌱", gradient: "from-green-400 to-emerald-400" },
  { id: "3-4", label: "Grades 3–4", ageLabel: "Ages 8–10", emoji: "🌟", gradient: "from-blue-400 to-cyan-400" },
  { id: "5-6", label: "Grades 5–6", ageLabel: "Ages 10–12",emoji: "🚀", gradient: "from-purple-400 to-violet-400" },
  { id: "7-8", label: "Grades 7–8", ageLabel: "Ages 12–14",emoji: "🎯", gradient: "from-orange-400 to-pink-400" },
];

export function getPromptContext(grade: GradeGroup): string {
  const contexts: Record<GradeGroup, string> = {
    "1-2": "The student is in Grades 1–2 (age 6–8). Expect short simple sentences of 5–10 words, basic sight words, and frequent spelling errors. Celebrate any attempt at description. Score very generously. Tips should suggest one tiny step like 'try adding a color word'.",
    "3-4": "The student is in Grades 3–4 (age 8–10). Expect 1–3 sentences with basic punctuation and growing vocabulary. Encourage adjectives, 'because' clauses, and sequence words like 'first' and 'then'. Use language a 9-year-old easily understands.",
    "5-6": "The student is in Grades 5–6 (age 10–12). Expect a short paragraph with descriptive language. Look for varied sentence lengths and some figurative language. Suggest metaphors or sensory details as stretch goals. Use language an 11-year-old understands.",
    "7-8": "The student is in Grades 7–8 (age 12–14). Expect a structured paragraph with a topic sentence, supporting details, and a conclusion. Evaluate voice, word choice precision, and coherent flow. Suggest one advanced technique like personification or a rhetorical question.",
  };
  return contexts[grade];
}

export function getHintSentences(grade: GradeGroup): [string, string] {
  const hints: Record<GradeGroup, [string, string]> = {
    "1-2": [
      "I see a [color] [thing] in the picture.",
      "It makes me feel [happy/excited/calm] because it looks [fun/big/pretty]!",
    ],
    "3-4": [
      "In the picture, I can see [something] that looks really [adjective], and it reminds me of [a place or thing you know].",
      "The colors are [color], which makes the whole scene feel [mood or feeling].",
    ],
    "5-6": [
      "The first thing that catches my eye is [a detail], standing out against the [background].",
      "Looking closely, I can almost imagine [a sound, smell, or feeling], which makes the scene feel very [adjective].",
    ],
    "7-8": [
      "What strikes me most about this image is [specific detail], which creates a sense of [an abstract idea] that draws the viewer in.",
      "The contrast between [element A] and [element B] tells a story about [a theme], as if the scene is inviting us to wonder.",
    ],
  };
  return hints[grade];
}
