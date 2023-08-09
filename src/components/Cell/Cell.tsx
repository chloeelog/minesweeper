import { CellMeta, Cell as CellType } from "@types";
import * as S from "./Cell.style";

type CellProps = {
  cell: CellType;
};

export const Cell = ({ cell }: CellProps) => {
  const { value, isRevealed } = cell;
  const displayValue =
    value === CellMeta.MINE ? "💣" : value === CellMeta.EMPTY ? "" : value;
  return <S.Cell $isRevealed={isRevealed}>{displayValue}</S.Cell>;
};
