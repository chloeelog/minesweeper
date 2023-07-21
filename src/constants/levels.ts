export const LEVELS = {
  BEGINNER: {
    value: "BEGINNER",
    label: "Beginner🌱",
    row: 8,
    col: 8,
    mines: 10,
  },
  INTERMEDIATE: {
    value: "INTERMEDIATE",
    label: "Intermediate🍿",
    row: 16,
    col: 16,
    mines: 40,
  },
  EXPERT: {
    value: "EXPERT",
    label: "Expert🔥",
    row: 16,
    col: 32,
    mines: 99,
  },
  CUSTOM: {
    value: "CUSTOM",
    label: "Custom🧩",
    row: -1,
    col: -1,
    mines: -1,
  },
} as const;
