export const LEVEL = {
  BEGINNER: {
    value: "BEGINNER",
    label: "Beginner🌱",
    row: 8,
    col: 8,
    mineCount: 10,
  },
  INTERMEDIATE: {
    value: "INTERMEDIATE",
    label: "Intermediate🍿",
    row: 16,
    col: 16,
    mineCount: 40,
  },
  EXPERT: {
    value: "EXPERT",
    label: "Expert🔥",
    row: 16,
    col: 32,
    mineCount: 99,
  },
  CUSTOM: {
    value: "CUSTOM",
    label: "Custom🧩",
    row: -1,
    col: -1,
    mineCount: -1,
  },
} as const;
