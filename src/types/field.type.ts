import { Cell } from ".";

export type Field = {
  meta: { row: number; col: number; mine: number };
  info: Array<Array<Cell>>;
};
