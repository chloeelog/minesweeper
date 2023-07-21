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

export const CellStatus = {
  HIDDEN: 0,
  REVEALED: 1,
  FLAGGED: 2,
} as const;

export type CellStatusKey = keyof typeof CellStatus;
export type CellStatusValue = (typeof CellStatus)[CellStatusKey];

export type Coordinate = {
  x: number;
  y: number;
};

export type Cell = {
  x: Coordinate["x"];
  y: Coordinate["y"];
  value: CellMetaValue;
  status: CellStatusValue;
};
