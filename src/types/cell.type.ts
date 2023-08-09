// 인접한 지뢰의 개수, -1인 경우 지뢰
export const CellMeta = {
  MINE: -1,
  EMPTY: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
} as const;

export type CellMetaKey = keyof typeof CellMeta;
export type CellMetaValue = (typeof CellMeta)[CellMetaKey];

export type Cell = {
  x: number;
  y: number;
  value: CellMetaValue;
  isRevealed: boolean;
};
