import { MouseEvent } from "react";
import { useSelector } from "react-redux";

import { GameState, RootState } from "@store";
import { CellMeta, CellStatus, Cell as CellType } from "@types";

import * as S from "./Cell.style";

type CellProps = {
  cell: CellType;
  onClick: (cell: CellType) => void;
  onRightClick: (cell: CellType) => void;
};

export const Cell = ({ cell, onClick, onRightClick }: CellProps) => {
  const { gameState } = useSelector((state: RootState) => state.gameSlice);

  const displayValue = getDisplayedValue(cell, gameState);

  const { status } = cell;
  const isRevealed = status === CellStatus.REVEALED;

  const handleClick = () => {
    onClick(cell);
  };

  const handleRightClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onRightClick(cell);
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

function getDisplayedValue(cell: CellType, gameState: GameState) {
  const { value, status } = cell;

  if (status === CellStatus.HIDDEN) {
    return gameState === "playing" ? "" : value === CellMeta.MINE ? "💣" : "";
  }

  if (status === CellStatus.FLAGGED) {
    return gameState === "playing"
      ? "🚩"
      : value === CellMeta.MINE
      ? "🚩"
      : "❌";
  }

  if (status === CellStatus.EXPLODED) {
    return "💥";
  }

  if (value === CellMeta.EMPTY) {
    return "";
  }

  if (value === CellMeta.MINE) {
    return "💣";
  }

  return value;
}
