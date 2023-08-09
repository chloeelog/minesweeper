import { Cell } from ".";

export type FieldMeta = {
  row: number;
  col: number;
  mineCount: number;
};

export type FieldState = {
  flagCount: number;
  revealedCount: number;
};
export type Field = {
  meta: FieldMeta;
  status: FieldState;
  info: Array<Array<Cell>>;
};
