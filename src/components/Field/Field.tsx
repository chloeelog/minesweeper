import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash-es";

import { Cell as CellType, CellMeta, CellStatus } from "@types";
import { RootState, overGame, startGame, updateField } from "@store";

import { Cell } from "@components/Cell";

import * as S from "./Field.style";

export const Field = () => {
  const dispatch = useDispatch();

  const { gameState } = useSelector((state: RootState) => state.gameSlice);

  const initialField = useSelector(
    (state: RootState) => state.fieldSlice.field
  );

  const { row, col } = initialField.meta;
  const field = cloneDeep(initialField);
  const { mineCount, flagCount } = field.meta;
  const info = field.info.flat();

  const handleCellClick = (cell: CellType) => {
    if (gameState === "over" || gameState === "clear") {
      return;
    }

    if (gameState === "ready") {
      const now = Date.now();
      dispatch(startGame(now));
    }

    const { x, y, value } = cell;

    if (value === CellMeta.MINE) {
      field.info[x][y] = { ...field.info[x][y], status: CellStatus.EXPLODED };
      dispatch(overGame());
    } else {
      field.info[x][y] = { ...field.info[x][y], status: CellStatus.REVEALED };
    }

    if (value === CellMeta.EMPTY) {
      handleEmptyCellClick(cell);
    }

    dispatch(updateField({ ...field }));
  };

  const handleCellRightClick = (cell: CellType) => {
    if (gameState === "over" || gameState === "clear") {
      return;
    }

    if (gameState === "ready") {
      const now = Date.now();
      dispatch(startGame(now));
    }

    if (flagCount >= mineCount) {
      alert("더 이상 깃발을 꽂을 수 없어요!");
      return;
    }

    const { x, y, status } = cell;

    if (status === CellStatus.REVEALED || status === CellStatus.EXPLODED) {
      return;
    }

    if (status === CellStatus.FLAGGED) {
      field.info[x][y].status = CellStatus.HIDDEN;
      field.meta.flagCount -= 1;
    } else {
      field.info[x][y].status = CellStatus.FLAGGED;
      field.meta.flagCount += 1;
    }

    dispatch(updateField({ ...field }));
  };

  const handleEmptyCellClick = (cell: CellType) => {
    const { row: rowCnt, col: colCnt } = field.meta;
    const { x: row, y: col } = cell;

    const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
    const dc = [0, 1, 1, 1, 0, -1, -1, -1];

    for (let i = 0; i < 8; i++) {
      const nr = row + dr[i];
      const nc = col + dc[i];

      if (nr < 0 || nr >= rowCnt || nc < 0 || nc >= colCnt) {
        continue;
      }

      const newCell = field.info[nr][nc];

      if (newCell.status === CellStatus.REVEALED) {
        continue;
      }
      newCell.status = CellStatus.REVEALED;

      if (newCell.value === CellMeta.EMPTY) {
        handleEmptyCellClick(newCell);
      }
    }
  };

  return (
    <S.Field $row={row} $col={col}>
      {info.map((cell) => {
        const { x, y } = cell;
        return (
          <Cell
            key={`${x}-${y}`}
            cell={cell}
            onClick={handleCellClick}
            onRightClick={handleCellRightClick}
          />
        );
      })}
    </S.Field>
  );
};
