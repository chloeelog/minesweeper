export type LevelType = Record<LevelKey, Level>;
export type LevelKey = "BEGINNER" | "INTERMEDIATE" | "EXPERT" | "CUSTOM";
export type Level = {
  value: LevelKey;
  label: string;
  row: number;
  col: number;
  mineCount: number;
};
