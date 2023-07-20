const BEGINNER = {
  ROW: 8,
  COL: 8,
} as const;

// 인접한 지뢰의 개수, -1인 경우 지뢰
const CellMeta = {
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

type CellMetaKey = keyof typeof CellMeta;
type CellMetaValue = (typeof CellMeta)[CellMetaKey];

type Cell = {
  x: number;
  y: number;
  value: CellMetaValue;
  isRevealed: boolean;
};

type Field = {
  meta: { row: number; col: number; mine: number };
  info: Array<Array<Cell>>;
};

const initializeField = (row: number, col: number): Field => {
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

const initializeMines = (field: Field, count: number): Field => {
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

const getAdjacentCellInfo = (field: Field): Field => {
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
const field = getAdjacentCellInfo(mineField).info;

export const Field = () => {
  return (
    <div>
      {field.map((row, rowIdx) => (
        <div key={"row" + rowIdx}>
          {row.map((cell, colIdx) => (
            <span key={"cell" + rowIdx + colIdx} style={{ padding: "8px" }}>
              {cell.value}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
