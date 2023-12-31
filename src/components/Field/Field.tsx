import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash-es";

import { Cell as CellType, CellMeta, CellStatus } from "@types";
import { RootState, clearGame, overGame, startGame, updateField } from "@store";

import { Cell } from "@components/Cell";

import * as S from "./Field.style";

export const Field = () => {
  const dispatch = useDispatch();

  const { gameState } = useSelector((state: RootState) => state.gameSlice);

  const initialField = useSelector(
    (state: RootState) => state.fieldSlice.field
  );

  const field = cloneDeep(initialField);

  const { row, col, mineCount } = field.meta;

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
      setTimeout(() => alert("지뢰를 밟았어요!"), 0);
    } else {
      if (field.info[x][y].status === CellStatus.FLAGGED) {
        field.status.flagCount -= 1;
      }
      field.info[x][y] = { ...field.info[x][y], status: CellStatus.REVEALED };
      field.status.revealedCount += 1;
    }

    if (value === CellMeta.EMPTY) {
      handleEmptyCellClick(cell);
    }

    dispatch(updateField({ ...field }));

    const { flagCount, revealedCount } = field.status;
    if (flagCount === mineCount && revealedCount === row * col - mineCount) {
      dispatch(clearGame());
      setTimeout(() => alert("지뢰를 모두 찾았어요!"), 0);
    }
  };

  const handleCellRightClick = (cell: CellType) => {
    if (gameState === "over" || gameState === "clear") {
      return;
    }

    if (gameState === "ready") {
      const now = Date.now();
      dispatch(startGame(now));
    }

    const { flagCount, revealedCount } = field.status;

    const { x, y, status } = cell;

    if (status === CellStatus.REVEALED || status === CellStatus.EXPLODED) {
      return;
    }

    if (status === CellStatus.FLAGGED) {
      field.info[x][y].status = CellStatus.HIDDEN;
      field.status.flagCount -= 1;
    } else {
      if (flagCount >= mineCount) {
        alert("더 이상 깃발을 꽂을 수 없어요!");
        return;
      }

      console.log("flagged", field.status.flagCount);
      field.info[x][y].status = CellStatus.FLAGGED;
      field.status.flagCount += 1;
    }

    dispatch(updateField({ ...field }));

    if (flagCount === mineCount && revealedCount === row * col - mineCount) {
      dispatch(clearGame());
      setTimeout(() => alert("지뢰를 모두 찾았어요!"), 0);
    }
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
      field.status.revealedCount += 1;

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
