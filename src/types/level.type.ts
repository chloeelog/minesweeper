import { LEVEL } from "@constants";

export type LevelType = typeof LEVEL;
export type LevelKey = keyof LevelType;
export type LevelValue = LevelType[LevelKey];
