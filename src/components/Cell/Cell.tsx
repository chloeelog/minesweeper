import { CellMeta, CellStatus, Cell as CellType, Coordinate } from "@types";
import * as S from "./Cell.style";
import { MouseEvent } from "react";

type CellProps = {
  cell: CellType;
  onClick: (coord: Coordinate) => void;
  onRightClick: (coord: Coordinate) => void;
};

export const Cell = ({ cell, onClick, onRightClick }: CellProps) => {
  const { x, y, status } = cell;
  const displayValue = getDisplayedValue(cell);
  const isRevealed = status === CellStatus.REVEALED;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event.button);
    onClick({ x, y });
  };

  const handleRightClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onRightClick({ x, y });
  };

  return (
    <S.Cell
      onClick={handleClick}
      onContextMenu={handleRightClick}
      $isRevealed={isRevealed}
    >
      {displayValue}
    </S.Cell>
  );
};

function getDisplayedValue(cell: CellType) {
  const { value, status } = cell;

  if (status === CellStatus.HIDDEN) {
    return "";
  }

  if (status === CellStatus.FLAGGED) {
    return "🚩";
  }

  if (value === CellMeta.EMPTY) {
    return "";
  }

  if (value === CellMeta.MINE) {
    return "💣";
  }

  return value;
}
