import { ImageConfig } from "./types";

const CATEGORIES = [
  { label: "Animals", slug: "animals", emoji: "🐾" },
  { label: "Nature", slug: "nature", emoji: "🌿" },
  { label: "City", slug: "city", emoji: "🏙️" },
  { label: "Food", slug: "food-drink", emoji: "🍎" },
  { label: "Space", slug: "space", emoji: "🚀" },
  { label: "Ocean", slug: "ocean", emoji: "🌊" },
];

export function getRandomImageUrl(): ImageConfig {
  const cat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  return {
    src: `https://source.unsplash.com/random/900x500?${cat.slug}&sig=${Date.now()}`,
    category: cat.label,
    emoji: cat.emoji,
    alt: `A ${cat.label.toLowerCase()} scene for writing practice`,
  };
}
