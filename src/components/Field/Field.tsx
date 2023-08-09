import { CellMeta, CellMetaValue, Field as FieldType } from "@types";
import * as S from "./Field.style";
import { Cell } from "@components/Cell";

const BEGINNER = {
  ROW: 8,
  COL: 8,
} as const;

const initializeField = (row: number, col: number): FieldType => {
  const info = Array.from({ length: row }, (_, rowIdx) =>
    Array.from({ length: col }, (_, colIdx) => ({
      x: rowIdx,
      y: colIdx,
      value: CellMeta.EMPTY,
      isRevealed: false,
    }))
  );
  return { meta: { row, col, mine: 0 }, info };
};

const initializeMines = (field: FieldType, count: number): FieldType => {
  const cells = field.info.flat();
  const mines = cells
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  const info = field.info.map((row) =>
    row.map((cell) => {
      if (mines.includes(cell)) {
        return {
          ...cell,
          value: CellMeta.MINE,
        };
      }
      return cell;
    })
  );

  return { meta: { ...field.meta, mine: count }, info };
};

const getAdjacentCellInfo = (field: FieldType): FieldType => {
  const { row: rowCnt, col: colCnt } = field.meta;
  const { info } = field;

  function getInfo(row: number, col: number) {
    if (info[row][col].value === CellMeta.MINE) {
      return;
    }

    const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
    const dc = [0, 1, 1, 1, 0, -1, -1, -1];

    let mineCount = 0;
    for (let i = 0; i < 8; i++) {
      const nr = row + dr[i];
      const nc = col + dc[i];

      if (nr < 0 || nr >= rowCnt || nc < 0 || nc >= colCnt) {
        continue;
      }

      if (info[nr][nc].value === CellMeta.MINE) {
        mineCount++;
      }
    }

    info[row][col].value = mineCount as CellMetaValue;
  }

  for (let row = 0; row < rowCnt; row++) {
    for (let col = 0; col < colCnt; col++) {
      getInfo(row, col);
    }
  }

  return field;
};

const emptyField = initializeField(BEGINNER.ROW, BEGINNER.COL);
const mineField = initializeMines(emptyField, 10);
const info = getAdjacentCellInfo(mineField).info.flat();

export const Field = () => {
  const { ROW: row, COL: col } = BEGINNER;
  return (
    <S.Field $row={row} $col={col}>
      {info.map((cell) => {
        const { x, y } = cell;
        return <Cell key={`${x}-${y}`} cell={cell} />;
      })}
    </S.Field>
  );
};
