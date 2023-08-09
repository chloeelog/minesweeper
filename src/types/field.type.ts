import { Cell } from ".";

export type FieldMeta = { row: number; col: number; mineCount: number };
export type Field = {
  meta: FieldMeta;
  info: Array<Array<Cell>>;
};
